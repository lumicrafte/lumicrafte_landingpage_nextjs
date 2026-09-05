import PageHeader from './PageHeader';
import CompactFooter from './CompactFooter';
import { contactEmail } from '../../lib/site';

export type LegalSection = {
  id: string;
  title: string;
  paras: string[];
  items?: string[];
};

export type LegalPageProps = {
  title: string;
  intro: string;
  effective: string;
  updated: string;
  sections: LegalSection[];
  contactHeading: string;
  contactBody: string;
  headerLinks: { label: string; href: string }[];
  footerLinks: { label: string; href: string }[];
};

/** Shared shell for Privacy Policy and Terms of Service — identical in the
 *  design apart from copy and the cross-link between the two. */
export default function LegalPage({
  title,
  intro,
  effective,
  updated,
  sections,
  contactHeading,
  contactBody,
  headerLinks,
  footerLinks,
}: LegalPageProps) {
  return (
    <>
      <PageHeader links={headerLinks} backToSite />

      <section className="lc-grid-bg border-b border-ink/10">
        <div className="mx-auto max-w-[1280px] px-[26px] pt-[72px] pb-14">
          <div className="inline-flex items-center gap-[9px] rounded-full border border-ink/14 bg-paper px-[13px] py-[6px]">
            <span className="lc-spectrum h-2 w-2 rounded-full" />
            <span className="font-mono text-[10.5px] tracking-[0.2em]">LEGAL</span>
          </div>
          <h1 className="mt-[22px] mb-0 max-w-[16ch] text-[clamp(36px,6vw,72px)] leading-[0.98] font-bold tracking-[-0.045em]">
            {title}
          </h1>
          <div className="mt-[26px] flex flex-wrap gap-[26px] font-mono text-[11px] tracking-[0.14em] text-ink/66">
            <span>EFFECTIVE {effective}</span>
            <span>LAST UPDATED {updated}</span>
          </div>
          <p className="mt-7 mb-0 max-w-[62ch] text-[17px] leading-[1.68] text-ink/70">{intro}</p>
        </div>
      </section>

      <div className="mx-auto grid max-w-[1280px] grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] items-start gap-14 px-[26px] pt-14 pb-20">
        <nav
          aria-label="On this page"
          className="sticky top-24 flex max-w-[280px] flex-col gap-[2px]"
        >
          <div className="pb-3 font-mono text-[10px] tracking-[0.18em] text-ink/66">CONTENTS</div>
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="border-l border-ink/14 py-2 pl-3 text-[14px] text-ink/68 transition-[border-color,color] duration-[180ms] hover:border-accent hover:text-ink"
            >
              {section.title}
            </a>
          ))}
        </nav>

        <main className="col-span-2 min-w-0">
          {sections.map((section, index) => (
            <section
              key={section.id}
              id={section.id}
              className="mb-10 scroll-mt-24 border-b border-ink/12 pb-10"
            >
              <div className="font-mono text-[10.5px] tracking-[0.18em] text-ink/66">
                {String(index + 1).padStart(2, '0')}
              </div>
              <h2 className="mt-3 mb-0 text-[clamp(22px,2.6vw,29px)] leading-[1.15] font-semibold tracking-[-0.03em]">
                {section.title}
              </h2>
              {section.paras.map((para) => (
                <p
                  key={para.slice(0, 32)}
                  className="mt-4 mb-0 max-w-[68ch] text-[16px] leading-[1.72] text-ink/74"
                >
                  {para}
                </p>
              ))}
              {section.items && section.items.length > 0 && (
                <ul className="mt-[18px] flex max-w-[68ch] list-none flex-col gap-[10px] p-0">
                  {section.items.map((item) => (
                    <li
                      key={item.slice(0, 32)}
                      className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-3 text-[15.5px] leading-[1.66] text-ink/74"
                    >
                      <span className="mt-[9px] h-[7px] w-[7px] rounded-[2px] bg-accent" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          <div className="rounded-xl border border-ink/14 bg-raised px-7 py-[30px]">
            <h2 className="m-0 text-[22px] font-semibold tracking-[-0.03em]">{contactHeading}</h2>
            <p className="mt-3 mb-0 max-w-[56ch] text-[15.5px] leading-[1.68] text-ink/72">
              {contactBody}
            </p>
            <a
              href={`mailto:${contactEmail}`}
              className="mt-5 inline-block rounded-[7px] bg-ink px-[22px] py-[13px] text-[14.5px] font-medium text-paper transition-colors duration-200 hover:bg-accent hover:text-white"
            >
              {contactEmail}
            </a>
          </div>
        </main>
      </div>

      <CompactFooter links={footerLinks} />
    </>
  );
}
