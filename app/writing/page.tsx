import type { Metadata } from 'next';
import PageHeader from '../components/PageHeader';
import CompactFooter from '../components/CompactFooter';
import NewsletterForm from '../components/NewsletterForm';
import WritingIndex from '../components/WritingIndex';
import { getCategories, getFeaturedPost, getListedPosts } from '../../lib/posts';

export const metadata: Metadata = {
  title: 'Writing',
  description:
    'Engineering notes, essays on interface craft, product updates, and case studies from Lumicrafte.',
};

export default function Page() {
  return (
    <>
      <PageHeader
        links={[
          { label: 'Services', href: '/#services' },
          { label: 'Work', href: '/#work' },
        ]}
      />

      <WritingIndex
        featured={getFeaturedPost()}
        posts={getListedPosts()}
        categories={getCategories()}
      />

      <section aria-label="Newsletter" className="mx-auto max-w-[1280px] px-[26px] pb-[84px]">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] items-center gap-[30px] rounded-[14px] bg-invert-bg px-8 py-10 text-invert-ink">
          <div className="min-w-0">
            <h2 className="m-0 text-[clamp(24px,3vw,32px)] leading-[1.1] font-bold tracking-[-0.04em]">
              New writing, occasionally.
            </h2>
            <p className="mt-[14px] mb-0 max-w-[46ch] text-[15.5px] leading-[1.64] text-invert-ink/75">
              One email when we publish something worth reading. No schedule, no marketing,
              unsubscribe in a click.
            </p>
          </div>
          <NewsletterForm />
        </div>
      </section>

      <CompactFooter />
    </>
  );
}
