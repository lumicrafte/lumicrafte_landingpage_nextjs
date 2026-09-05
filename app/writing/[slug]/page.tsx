import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageHeader from '../../components/PageHeader';
import CompactFooter from '../../components/CompactFooter';
import NewsletterForm from '../../components/NewsletterForm';
import ReadingProgress from '../../components/ReadingProgress';
import { getPost, getPostSlugs, getRelatedPosts } from '../../../lib/posts';
import { contactEmail, routes, social } from '../../../lib/site';

const PILL = 'rounded-full border border-ink/16 px-[11px] py-[5px]';

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.dek,
    openGraph: {
      title: post.title,
      description: post.dek,
      type: 'article',
      publishedTime: post.date,
      ...(post.cover ? { images: [{ url: post.cover }] } : {}),
    },
  };
}

export default async function Page({ params }: Params) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const related = getRelatedPosts(slug);

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
              <span className={`${PILL} bg-paper`}>{post.category}</span>
              {post.tags.map((tag) => (
                <span key={tag} className={`${PILL} bg-paper`}>
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="mt-[22px] mb-0 text-[clamp(32px,5.4vw,60px)] leading-[1.02] font-bold tracking-[-0.045em] text-balance">
              {post.title}
            </h1>
            <p className="mt-5 mb-0 max-w-[56ch] text-[19px] leading-[1.62] text-ink/70">
              {post.dek}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-[18px] border-t border-ink/13 pt-6">
              <div className="lc-spectrum h-10 w-10 shrink-0 rounded-full" />
              <div className="min-w-0">
                <div className="text-[14.5px] font-semibold tracking-[-0.02em]">Lumicrafte</div>
                <div className="mt-[3px] font-mono text-[11px] tracking-[0.1em] text-ink/66">
                  {post.dateLabel} · {post.readingMinutes} MIN READ
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-[820px] px-[26px] pt-14 pb-6">
          {/* Post bodies are repo-authored markdown, never visitor input. */}
          <div className="lc-prose" dangerouslySetInnerHTML={{ __html: post.html }} />

          {post.tags.length > 0 && (
            <div className="mt-[52px] flex flex-wrap gap-[10px] border-t border-ink/13 pt-[26px] font-mono text-[10px] tracking-[0.16em] text-ink/66">
              {post.tags.map((tag) => (
                <span key={tag} className={PILL}>
                  {tag}
                </span>
              ))}
            </div>
          )}
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

      {related.length > 0 && (
        <section
          aria-label="Related posts"
          className="mx-auto max-w-[1280px] px-[26px] pt-[76px] pb-[84px]"
        >
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
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`${routes.writing}/${item.slug}`}
                className="flex flex-col gap-3 rounded-xl border border-ink/14 bg-raised px-[22px] pt-6 pb-[26px] transition-[transform,box-shadow] duration-[220ms] hover:-translate-y-[3px] hover:shadow-[0_18px_40px_rgba(var(--ink-rgb),0.09)]"
              >
                <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.16em] text-ink/66">
                  <span>{item.category}</span>
                  <span>{item.readingMinutes} MIN</span>
                </div>
                <h3 className="m-0 text-[20px] leading-[1.22] font-semibold tracking-[-0.03em]">
                  {item.title}
                </h3>
                <p className="m-0 text-[14.5px] leading-[1.62] text-ink/70">{item.dek}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <CompactFooter />
    </>
  );
}
