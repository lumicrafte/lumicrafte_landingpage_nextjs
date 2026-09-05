'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { PostMeta } from '../../lib/post-types';
import { routes } from '../../lib/site';

const MONO = 'font-mono tracking-[0.16em] text-ink/66';

/** Cover art when the post supplies one, the design's hatch pattern when not. */
function Cover({
  post,
  label,
  className,
  sizes,
}: {
  post: PostMeta;
  label: string;
  className: string;
  sizes: string;
}) {
  if (post.cover) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image src={post.cover} alt="" fill sizes={sizes} className="object-cover" />
      </div>
    );
  }
  return (
    <div className={`lc-hatch grid place-items-center ${className}`}>
      <span className={`${MONO} text-center text-[10px]`}>{label}</span>
    </div>
  );
}

export default function WritingIndex({
  featured,
  posts,
  categories,
}: {
  featured: PostMeta | null;
  posts: PostMeta[];
  categories: string[];
}) {
  const [active, setActive] = useState<string>('ALL');

  const visible = active === 'ALL' ? posts : posts.filter((post) => post.category === active);

  return (
    <>
      <section className="lc-grid-bg border-b border-ink/10">
        <div className="mx-auto max-w-[1280px] px-[26px] pt-[68px] pb-12">
          <div className="inline-flex items-center gap-[9px] rounded-full border border-ink/14 bg-paper px-[13px] py-[6px]">
            <span className="lc-spectrum h-2 w-2 rounded-full" />
            <span className="font-mono text-[10.5px] tracking-[0.2em]">WRITING</span>
          </div>
          <h1 className="mt-[22px] mb-0 max-w-[18ch] text-[clamp(36px,6vw,72px)] leading-[0.98] font-bold tracking-[-0.045em]">
            Notes from the workshop.
          </h1>
          <p className="mt-[22px] mb-0 max-w-[60ch] text-[17.5px] leading-[1.66] text-ink/70">
            Engineering notes, essays on interface craft, product updates, and case studies.
            Written when we have something specific to say.
          </p>
        </div>
      </section>

      {categories.length > 1 && (
        <div className="sticky top-[57px] z-40 border-b border-ink/10 bg-paper/94 backdrop-blur-[10px]">
          <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-5 px-[26px] py-[14px]">
            <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const selected = active === category;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActive(category)}
                    aria-pressed={selected}
                    className={`cursor-pointer rounded-full border px-[13px] py-2 font-mono text-[10px] tracking-[0.16em] transition-[background-color,border-color,color] duration-[180ms] ${
                      selected
                        ? 'border-ink bg-ink text-paper'
                        : 'border-ink/16 bg-paper text-ink/72'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
            <div className="font-mono text-[10.5px] tracking-[0.16em] text-ink/66">
              {visible.length} {visible.length === 1 ? 'POST' : 'POSTS'}
            </div>
          </div>
        </div>
      )}

      {featured && (
        <section aria-label="Featured post" className="border-b border-ink/10 bg-raised">
          <div className="mx-auto max-w-[1280px] px-[26px] py-[52px]">
            <Link
              href={`${routes.writing}/${featured.slug}`}
              className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] items-center gap-[34px] overflow-hidden rounded-[14px] border border-ink/14 bg-paper transition-[transform,box-shadow] duration-[220ms] hover:-translate-y-[3px] hover:shadow-[0_22px_48px_rgba(var(--ink-rgb),0.1)]"
            >
              <Cover
                post={featured}
                label="FEATURED — COVER IMAGE"
                className="aspect-[4/3] border-r border-ink/10 p-[22px]"
                sizes="(max-width: 880px) 100vw, 50vw"
              />
              <div className="min-w-0 px-8 py-[34px]">
                <div className={`${MONO} flex flex-wrap gap-[14px] text-[10px]`}>
                  <span>FEATURED</span>
                  <span>{featured.category}</span>
                  <span>{featured.readingMinutes} MIN READ</span>
                </div>
                <h2 className="mt-[18px] mb-0 text-[clamp(26px,3.4vw,40px)] leading-[1.06] font-bold tracking-[-0.04em] text-balance">
                  {featured.title}
                </h2>
                <p className="mt-4 mb-0 max-w-[52ch] text-[16.5px] leading-[1.66] text-ink/72">
                  {featured.dek}
                </p>
                <span className="mt-6 inline-block font-mono text-[11px] tracking-[0.16em] text-accent">
                  READ THE POST →
                </span>
              </div>
            </Link>
          </div>
        </section>
      )}

      <section aria-label="All posts" className="mx-auto max-w-[1280px] px-[26px] pt-14 pb-[72px]">
        {visible.length > 0 ? (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-[22px]">
            {visible.map((post) => (
              <Link
                key={post.slug}
                href={`${routes.writing}/${post.slug}`}
                className="flex flex-col overflow-hidden rounded-xl border border-ink/14 bg-raised transition-[transform,box-shadow] duration-[220ms] hover:-translate-y-[3px] hover:shadow-[0_18px_40px_rgba(var(--ink-rgb),0.09)]"
              >
                <Cover
                  post={post}
                  label="COVER IMAGE"
                  className="aspect-[16/10] border-b border-ink/12 p-[18px]"
                  sizes="(max-width: 880px) 100vw, 33vw"
                />
                <div className="flex min-w-0 flex-col gap-[11px] px-5 pt-[22px] pb-6">
                  <div className={`${MONO} flex justify-between gap-3 text-[10px]`}>
                    <span>{post.category}</span>
                    <span>{post.readingMinutes} MIN</span>
                  </div>
                  <h3 className="m-0 text-[20px] leading-[1.2] font-semibold tracking-[-0.03em]">
                    {post.title}
                  </h3>
                  <p className="m-0 text-[14.5px] leading-[1.62] text-ink/70">{post.dek}</p>
                  <div className={`${MONO} mt-1 text-[10px] tracking-[0.14em]`}>
                    {post.dateLabel}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-ink/14 px-[26px] py-11 text-center">
            <p className="m-0 text-[16px] leading-[1.6] text-ink/72">
              Nothing published in this category yet.
            </p>
          </div>
        )}
      </section>
    </>
  );
}
