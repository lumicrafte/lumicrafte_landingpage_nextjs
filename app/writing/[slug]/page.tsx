import type { Metadata } from 'next';
import Link from 'next/link';
import PageHeader from '../../components/PageHeader';
import CompactFooter from '../../components/CompactFooter';
import NewsletterForm from '../../components/NewsletterForm';
import ReadingProgress from '../../components/ReadingProgress';
import { featuredPost, relatedPosts } from '../../../content/posts';
import { contactEmail, routes, social } from '../../../lib/site';

const PARA = 'mt-[26px] mb-0 text-[17.5px] leading-[1.78] text-ink/82';
const H2 = 'mt-[52px] mb-0 text-[clamp(24px,3vw,32px)] leading-[1.16] font-semibold tracking-[-0.035em]';
const PILL = 'rounded-full border border-ink/16 px-[11px] py-[5px]';

const budgetsSnippet = `export const budgets = {
  tap_feedback:   16,   // ms — one frame, always local
  optimistic_ui:  100,  // ms — before any network result
  list_render:    250,  // ms — first meaningful rows
  route_change:   400,  // ms — including data
} as const;`;

const bullets = [
  'A spinner shown for work that finished in 80ms, held open by an artificial minimum duration.',
  'Three sequential requests that could have been one, because each was added by a different person in a different week.',
  'A transition tuned on a fast machine, where 400ms reads as smooth rather than slow.',
  'State that only exists on the server, so every optimistic update waits for a round trip it does not need.',
];

export function generateStaticParams() {
  return [{ slug: featuredPost.slug }];
}

export const metadata: Metadata = {
  title: featuredPost.title,
  description: featuredPost.dek,
};

export default function Page() {
  return (
    <>
      <PageHeader links={[{ label: 'Writing', href: routes.writing }]}>
        <ReadingProgress />
      </PageHeader>

      <article>
        <div className="lc-grid-bg border-b border-ink/10">
          <div className="mx-auto max-w-[820px] px-[26px] pt-16 pb-[52px]">
            <Link
              href={routes.writing}
              className="font-mono text-[11px] tracking-[0.16em] text-ink/66 hover:text-accent"
            >
              ← WRITING
            </Link>
            <div className="mt-[22px] flex flex-wrap gap-[10px] font-mono text-[10px] tracking-[0.16em] text-ink/66">
              <span className={`${PILL} bg-paper`}>ENGINEERING NOTES</span>
              <span className={`${PILL} bg-paper`}>INTERFACE CRAFT</span>
            </div>
            <h1 className="mt-[22px] mb-0 text-[clamp(32px,5.4vw,60px)] leading-[1.02] font-bold tracking-[-0.045em] text-balance">
              {featuredPost.title}
            </h1>
            <p className="mt-5 mb-0 max-w-[56ch] text-[19px] leading-[1.62] text-ink/70">
              Perceived speed is a design decision before it is an engineering one. Notes on
              where latency actually comes from in the interfaces we build, and what we do about
              it.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-[18px] border-t border-ink/13 pt-6">
              <div className="lc-spectrum h-10 w-10 shrink-0 rounded-full" />
              <div className="min-w-0">
                <div className="text-[14.5px] font-semibold tracking-[-0.02em]">Lumicrafte</div>
                <div className="mt-[3px] font-mono text-[11px] tracking-[0.1em] text-ink/66">
                  05 SEP 2026 · 7 MIN READ
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-[820px] px-[26px] pt-14 pb-6">
          <p className="m-0 text-[17.5px] leading-[1.78] text-ink/82">
            Every product we have worked on has had a moment where it stopped feeling good to
            use, and nobody could say exactly when. The screens were the same. The features were
            the same. What changed was the time between an action and its consequence.
          </p>
          <p className={PARA}>
            Latency is easy to measure and hard to feel. A profiler reports numbers; a person
            reports that the app is heavy. The gap between those two statements is where most of
            the interesting work happens, and it is not usually where teams look first.
          </p>

          <h2 className={H2}>Where the time goes</h2>
          <p className="mt-[18px] mb-0 text-[17.5px] leading-[1.78] text-ink/82">
            In practice, the delay a person notices is rarely one slow request. It is an
            accumulation of small, individually defensible decisions.
          </p>
          <ul className="mt-[22px] flex list-none flex-col gap-3 p-0">
            {bullets.map((bullet) => (
              <li
                key={bullet.slice(0, 24)}
                className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-[14px] text-[16.5px] leading-[1.7] text-ink/80"
              >
                <span className="mt-[10px] h-[7px] w-[7px] rounded-[2px] bg-accent" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>

          <figure className="mt-11 mb-0">
            <div className="lc-hatch grid aspect-[16/9] place-items-center rounded-[10px] border border-ink/14 p-5">
              <span className="text-center font-mono text-[10.5px] tracking-[0.18em] text-ink/62">
                FIGURE — TIMELINE DIAGRAM / SCREENSHOT
              </span>
            </div>
            <figcaption className="mt-3 font-mono text-[11px] tracking-[0.1em] text-ink/66">
              FIG. 1 — Waterfall of a single tap, before and after consolidation.
            </figcaption>
          </figure>

          <blockquote className="mt-12 mb-0 border-l-2 border-accent py-1 pl-[26px]">
            <p className="m-0 text-[clamp(20px,2.4vw,25px)] leading-[1.42] font-medium tracking-[-0.025em] text-ink">
              Users do not experience your architecture. They experience the wait between intent
              and confirmation.
            </p>
          </blockquote>

          <h2 className={H2}>Budgets, not benchmarks</h2>
          <p className="mt-[18px] mb-0 text-[17.5px] leading-[1.78] text-ink/82">
            Benchmarks tell you what the code did once. A budget tells you what the product is
            allowed to do every time. We set them per interaction rather than per page, because
            that is the unit a person actually feels.
          </p>

          <div className="mt-7 overflow-hidden rounded-[10px] border border-ink/16 bg-code-bg">
            <div className="flex items-center justify-between border-b border-invert-ink/12 px-4 py-[10px] font-mono text-[10.5px] tracking-[0.16em] text-invert-ink/66">
              <span>BUDGETS.TS</span>
              <span>TYPESCRIPT</span>
            </div>
            <pre className="m-0 overflow-x-auto px-[18px] py-5 font-mono text-[13.5px] leading-[1.75] text-code-ink">
              <code>{budgetsSnippet}</code>
            </pre>
          </div>

          <p className={PARA}>
            Once the numbers are written down, the conversation changes. A feature that breaks
            the budget is not rejected; it is scoped differently, or it earns an explicit
            exception with a reason attached. Both outcomes are better than discovering the cost
            after release.
          </p>

          <h2 className={H2}>What we do first</h2>
          <p className="mt-[18px] mb-0 text-[17.5px] leading-[1.78] text-ink/82">
            Before optimising anything, we make the interface honest: acknowledge every input
            within a frame, show real progress rather than indefinite motion, and never hide a
            fast result behind a slow animation. Most of the perceived improvement arrives here,
            before a single query is rewritten.
          </p>
          <p className={PARA}>
            The rest is ordinary engineering discipline: fewer round trips, work moved off the
            critical path, caches with a clear invalidation story, and measurement on the devices
            people actually own. None of it is novel. It is simply done, and kept done.
          </p>

          <div className="mt-[52px] flex flex-wrap gap-[10px] border-t border-ink/13 pt-[26px] font-mono text-[10px] tracking-[0.16em] text-ink/66">
            {['PERFORMANCE', 'UX', 'ENGINEERING'].map((tag) => (
              <span key={tag} className={PILL}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </article>

      <section aria-label="About the author" className="mx-auto max-w-[820px] px-[26px] pt-3">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] items-start gap-[26px] rounded-xl border border-ink/14 bg-raised px-[26px] py-7">
          <div className="flex min-w-0 items-center gap-4">
            <div className="lc-spectrum h-[52px] w-[52px] shrink-0 rounded-full" />
            <div className="min-w-0">
              <div className="font-mono text-[10px] tracking-[0.18em] text-ink/66">WRITTEN BY</div>
              <div className="mt-[6px] text-[18px] font-semibold tracking-[-0.025em]">
                Lumicrafte
              </div>
            </div>
          </div>
          <div className="min-w-0">
            <p className="m-0 text-[15.5px] leading-[1.68] text-ink/74">
              We build software products and custom software, and write about the decisions
              behind them. Notes on engineering, interface craft, and what shipping teaches us.
            </p>
            <div className="mt-4 flex flex-wrap gap-[18px] text-[14px]">
              <a href={social.github} className="border-b border-ink/20 pb-[2px] text-ink/72 hover:text-accent">
                GitHub
              </a>
              <a href={social.linkedin} className="border-b border-ink/20 pb-[2px] text-ink/72 hover:text-accent">
                LinkedIn
              </a>
              <a
                href={`mailto:${contactEmail}`}
                className="border-b border-ink/20 pb-[2px] text-ink/72 hover:text-accent"
              >
                Email
              </a>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Newsletter" className="mx-auto max-w-[820px] px-[26px] pt-[22px]">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] items-center gap-[26px] rounded-xl bg-invert-bg px-7 py-8 text-invert-ink">
          <div className="min-w-0">
            <h2 className="m-0 text-[clamp(22px,2.8vw,28px)] leading-[1.14] font-bold tracking-[-0.035em]">
              New writing, occasionally.
            </h2>
            <p className="mt-3 mb-0 max-w-[44ch] text-[15px] leading-[1.62] text-invert-ink/75">
              One email when we publish something worth reading. No schedule, no marketing,
              unsubscribe in a click.
            </p>
          </div>
          <NewsletterForm />
        </div>
      </section>

      <section aria-label="Related posts" className="mx-auto max-w-[1280px] px-[26px] pt-[76px] pb-[84px]">
        <div className="flex flex-wrap items-baseline justify-between gap-5 border-t border-ink/13 pt-[34px]">
          <h2 className="m-0 text-[clamp(24px,3.2vw,36px)] leading-[1.1] font-bold tracking-[-0.04em]">
            Related reading
          </h2>
          <Link
            href={routes.writing}
            className="font-mono text-[11px] tracking-[0.16em] text-ink/66 hover:text-accent"
          >
            ALL WRITING →
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-5">
          {relatedPosts.map((post) => (
            <Link
              key={post.title}
              href={`${routes.writing}/${post.slug}`}
              className="flex flex-col gap-3 rounded-xl border border-ink/14 bg-raised px-[22px] pt-6 pb-[26px] transition-[transform,box-shadow] duration-[220ms] hover:-translate-y-[3px] hover:shadow-[0_18px_40px_rgba(var(--ink-rgb),0.09)]"
            >
              <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.16em] text-ink/66">
                <span>{post.category}</span>
                <span>{post.read}</span>
              </div>
              <h3 className="m-0 text-[20px] leading-[1.22] font-semibold tracking-[-0.03em]">
                {post.title}
              </h3>
              <p className="m-0 text-[14.5px] leading-[1.62] text-ink/70">{post.dek}</p>
            </Link>
          ))}
        </div>
      </section>

      <CompactFooter />
    </>
  );
}
