import type { Metadata } from 'next';
import Link from 'next/link';
import PageHeader from './components/PageHeader';
import CompactFooter from './components/CompactFooter';
import { routes } from '../lib/site';

export const metadata: Metadata = {
  title: 'Page not found',
  description: 'That page does not exist.',
};

/**
 * Serves both cases: a route that was never generated (the host falls back to
 * 404.html on a static export) and an explicit notFound() during rendering.
 */
export default function NotFound() {
  return (
    <>
      <PageHeader links={[{ label: 'Writing', href: routes.writing }]} backToSite />

      <section className="lc-grid-bg border-b border-ink/10">
        <div className="mx-auto max-w-[1280px] px-[26px] pt-[88px] pb-[76px]">
          <div className="inline-flex items-center gap-[9px] rounded-full border border-ink/14 bg-paper px-[13px] py-[6px]">
            <span className="lc-spectrum h-2 w-2 rounded-full" />
            <span className="font-mono text-[10.5px] tracking-[0.2em]">ERROR 404</span>
          </div>

          <h1 className="mt-[22px] mb-0 max-w-[16ch] text-[clamp(36px,6vw,72px)] leading-[0.98] font-bold tracking-[-0.045em] text-balance">
            This page doesn’t exist.
          </h1>

          <p className="mt-[22px] mb-0 max-w-[52ch] text-[17px] leading-[1.66] text-ink/70">
            The link may be out of date, or the page may never have existed.
          </p>

          <div className="mt-8 flex flex-wrap gap-[11px]">
            <Link
              href={routes.home}
              className="rounded-[7px] bg-ink px-6 py-[14px] text-[14.5px] font-medium text-paper transition-[transform,background-color] duration-200 hover:-translate-y-[2px] hover:bg-accent hover:text-white"
            >
              Back to home
            </Link>
            <Link
              href={routes.writing}
              className="rounded-[7px] border border-ink/18 bg-paper px-6 py-[14px] text-[14.5px] font-medium transition-colors duration-200 hover:border-ink"
            >
              Browse writing
            </Link>
          </div>
        </div>
      </section>

      <CompactFooter />
    </>
  );
}
