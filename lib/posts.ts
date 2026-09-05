import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { renderMarkdown } from './markdown';
import type { Post, PostMeta } from './post-types';

/** Server-only: this module touches the filesystem at build time. Never import
 *  it from a client component — pass the results down as props instead. */

const POSTS_DIR = path.join(process.cwd(), 'content/posts');
const WORDS_PER_MINUTE = 200;

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

export type { PostMeta, Post } from './post-types';

function formatDate(date: Date) {
  return `${String(date.getUTCDate()).padStart(2, '0')} ${MONTHS[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
}

function toDate(value: unknown, file: string): Date {
  const date = value instanceof Date ? value : new Date(String(value));
  if (Number.isNaN(date.getTime())) {
    throw new Error(`${file}: "date" is missing or unparseable. Use date: 2026-09-05`);
  }
  return date;
}

function require_(value: unknown, field: string, file: string): string {
  const text = typeof value === 'string' ? value.trim() : '';
  if (!text) throw new Error(`${file}: frontmatter field "${field}" is required.`);
  return text;
}

function readingMinutes(body: string, override: unknown) {
  if (typeof override === 'number' && override > 0) return Math.round(override);
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

function parseFile(fileName: string): { meta: PostMeta; body: string } | null {
  const file = path.join(POSTS_DIR, fileName);
  const { data, content } = matter(fs.readFileSync(file, 'utf8'));
  const slug = fileName.replace(/\.mdx?$/, '');

  if (data.draft === true) return null;

  const date = toDate(data.date, fileName);
  // Post-dated entries stay unpublished until a build happens after that date.
  if (date.getTime() > Date.now()) return null;

  const tags = Array.isArray(data.tags) ? data.tags.map((tag: unknown) => String(tag)) : [];

  return {
    body: content,
    meta: {
      slug,
      title: require_(data.title, 'title', fileName),
      dek: require_(data.dek, 'dek', fileName),
      category: require_(data.category, 'category', fileName).toUpperCase(),
      date: date.toISOString(),
      dateLabel: formatDate(date),
      tags,
      featured: data.featured === true,
      cover: typeof data.cover === 'string' && data.cover.trim() ? data.cover.trim() : null,
      readingMinutes: readingMinutes(content, data.readingTime),
    },
  };
}

function loadAll(): { meta: PostMeta; body: string }[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((name) => /\.mdx?$/.test(name))
    .map(parseFile)
    .filter((entry): entry is { meta: PostMeta; body: string } => entry !== null)
    .sort((a, b) => b.meta.date.localeCompare(a.meta.date));
}

export function getAllPosts(): PostMeta[] {
  return loadAll().map((entry) => entry.meta);
}

/** The hero card: whichever post is flagged, else the most recent. */
export function getFeaturedPost(): PostMeta | null {
  const posts = getAllPosts();
  return posts.find((post) => post.featured) ?? posts[0] ?? null;
}

/** The grid below the hero excludes whatever the hero is showing. */
export function getListedPosts(): PostMeta[] {
  const featured = getFeaturedPost();
  return getAllPosts().filter((post) => post.slug !== featured?.slug);
}

/** Filter chips are derived from the posts on disk, so a new category needs
 *  no code change. */
export function getCategories(): string[] {
  const seen = new Set(getListedPosts().map((post) => post.category));
  return ['ALL', ...Array.from(seen).sort()];
}

export function getPostSlugs(): string[] {
  return getAllPosts().map((post) => post.slug);
}

export async function getPost(slug: string): Promise<Post | null> {
  const entry = loadAll().find((item) => item.meta.slug === slug);
  if (!entry) return null;
  return { ...entry.meta, html: await renderMarkdown(entry.body) };
}

/** Same category first, newest, never the post you are reading. */
export function getRelatedPosts(slug: string, limit = 3): PostMeta[] {
  const posts = getAllPosts();
  const current = posts.find((post) => post.slug === slug);
  const others = posts.filter((post) => post.slug !== slug);
  const sameCategory = others.filter((post) => post.category === current?.category);
  const rest = others.filter((post) => post.category !== current?.category);
  return [...sameCategory, ...rest].slice(0, limit);
}
