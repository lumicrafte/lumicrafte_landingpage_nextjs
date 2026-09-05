import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import { visit } from 'unist-util-visit';
import { bundledLanguages, createHighlighter, type Highlighter } from 'shiki';

/** The code panel is dark in both themes (--code-bg is dark even in light
 *  mode), so a single dark Shiki theme is correct — no per-theme swapping. */
const SHIKI_THEME = 'github-dark';

const PRELOADED_LANGS = [
  'ts', 'tsx', 'js', 'jsx', 'json', 'html', 'css', 'bash', 'sh',
  'md', 'yaml', 'toml', 'sql', 'python', 'diff',
  'rust', 'go', 'java', 'kotlin', 'swift', 'c', 'cpp', 'csharp',
  'ruby', 'php', 'xml', 'graphql', 'dockerfile',
];

let highlighterPromise: Promise<Highlighter> | null = null;

function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: [SHIKI_THEME],
      langs: PRELOADED_LANGS,
    });
  }
  return highlighterPromise;
}

/** The design labels the panel with the full language name, not the fence alias. */
const LANGUAGE_LABELS: Record<string, string> = {
  ts: 'TYPESCRIPT',
  tsx: 'TYPESCRIPT',
  js: 'JAVASCRIPT',
  jsx: 'JAVASCRIPT',
  py: 'PYTHON',
  python: 'PYTHON',
  sh: 'SHELL',
  bash: 'SHELL',
  md: 'MARKDOWN',
  yml: 'YAML',
  yaml: 'YAML',
  diff: 'DIFF',
  cpp: 'C++',
  csharp: 'C#',
  go: 'GO',
  rs: 'RUST',
  graphql: 'GRAPHQL',
  dockerfile: 'DOCKERFILE',
  text: '',
};

function languageLabel(lang: string) {
  return LANGUAGE_LABELS[lang] ?? lang.toUpperCase();
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Carries ```lang title="file.ts" through to the hast <code> element. */
function remarkCodeMeta() {
  return (tree: object) => {
    visit(tree as never, 'code', (node: Record<string, unknown>) => {
      const meta = typeof node.meta === 'string' ? node.meta : '';
      const title = /title="([^"]+)"/.exec(meta)?.[1];
      const data = (node.data ?? {}) as Record<string, unknown>;
      const hProperties = (data.hProperties ?? {}) as Record<string, unknown>;
      hProperties['data-lang'] = typeof node.lang === 'string' ? node.lang : '';
      if (title) hProperties['data-title'] = title;
      data.hProperties = hProperties;
      node.data = data;
    });
  };
}

type HastNode = {
  type: string;
  tagName?: string;
  value?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
};

/** Replaces each <pre><code> with the design's bordered panel: a header bar
 *  carrying filename and language, wrapping Shiki-highlighted code. */
function rehypeCodePanel(highlighter: Highlighter) {
  return (tree: object) => {
    const loaded = new Set(highlighter.getLoadedLanguages());

    visit(
      tree as never,
      'element',
      (node: HastNode, index: number | undefined, parent: HastNode | undefined) => {
        if (node.tagName !== 'pre' || !parent || index === undefined) return;

        const code = node.children?.find(
          (child) => child.type === 'element' && child.tagName === 'code'
        );
        if (!code) return;

        const source = (code.children ?? [])
          .filter((child) => child.type === 'text')
          .map((child) => child.value ?? '')
          .join('');

        const requested = String(code.properties?.['data-lang'] ?? '').toLowerCase();
        const lang = requested && loaded.has(requested) ? requested : 'text';
        const title = code.properties?.['data-title'];

        const highlighted = highlighter.codeToHtml(source.replace(/\n$/, ''), {
          lang,
          theme: SHIKI_THEME,
        });

        // Skip the bar entirely when there is nothing to put in it — an empty
        // header strip reads as a rendering glitch.
        const label = languageLabel(requested);
        const bar =
          title || label
            ? `<div class="lc-code-head"><span>${
                title ? escapeHtml(String(title)).toUpperCase() : ''
              }</span><span>${escapeHtml(label)}</span></div>`
            : '';

        parent.children![index] = {
          type: 'raw',
          value: `<div class="lc-code">${bar}${highlighted}</div>`,
        };
      }
    );
  };
}

/** A paragraph holding nothing but an image becomes a captioned <figure>,
 *  matching the article design's FIG. treatment. */
function rehypeFigures() {
  return (tree: object) => {
    visit(
      tree as never,
      'element',
      (node: HastNode, index: number | undefined, parent: HastNode | undefined) => {
        if (node.tagName === 'img') {
          node.properties = { ...node.properties, loading: 'lazy', decoding: 'async' };
          return;
        }
        if (node.tagName !== 'p' || !parent || index === undefined) return;

        const meaningful = (node.children ?? []).filter(
          (child) => !(child.type === 'text' && !(child.value ?? '').trim())
        );
        if (meaningful.length !== 1) return;

        const image = meaningful[0];
        if (image.type !== 'element' || image.tagName !== 'img') return;

        const caption = String(image.properties?.alt ?? '').trim();
        image.properties = { ...image.properties, loading: 'lazy', decoding: 'async' };

        parent.children![index] = {
          type: 'element',
          tagName: 'figure',
          properties: {},
          children: [
            image,
            ...(caption
              ? [
                  {
                    type: 'element',
                    tagName: 'figcaption',
                    properties: {},
                    children: [{ type: 'text', value: caption }],
                  } as HastNode,
                ]
              : []),
          ],
        };
      }
    );
  };
}

/** Markdown body -> HTML string, styled by the .lc-prose rules in globals.css.
 *  Input is repo-authored content, never visitor input. */
export async function renderMarkdown(markdown: string): Promise<string> {
  const highlighter = await getHighlighter();

  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkCodeMeta)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeFigures)
    .use(rehypeCodePanel, highlighter)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(markdown);

  return String(file);
}

/** Languages a post may use in a fence and still get highlighting. */
export function supportedLanguages() {
  return PRELOADED_LANGS.filter((lang) => lang in bundledLanguages);
}
