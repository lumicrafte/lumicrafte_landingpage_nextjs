import Image from 'next/image';
import Link from 'next/link';
import { contactEmail, routes, social } from '../../lib/site';

const LINK = 'text-invert-ink/72 transition-colors hover:text-white';
const LABEL = 'font-mono text-[10px] tracking-[0.18em] text-invert-ink/66';

const siteLinks = [
  { label: 'Home', href: '/#top' },
  { label: 'About', href: '/#story' },
  { label: 'Services', href: '/#services' },
  { label: 'Products', href: '/#products' },
  { label: 'Approach', href: '/#approach' },
  { label: 'Work', href: '/#work' },
  { label: 'Writing', href: routes.writing },
  { label: 'Contact', href: '/#contact' },
];

/** Full four-column footer for the landing page. */
export default function SiteFooter() {
  return (
    <footer className="border-t border-invert-ink/12 bg-invert-bg text-invert-ink">
      <div className="mx-auto grid max-w-[1280px] grid-cols-[repeat(auto-fit,minmax(min(100%,190px),1fr))] items-start gap-9 px-[26px] pt-12 pb-5">
        <div className="col-span-2 min-w-0">
          <div className="flex items-center gap-[10px]">
            <Image
              src="/logo.png"
              alt=""
              width={26}
              height={26}
              className="block h-[26px] w-[26px] rounded-[7px]"
            />
            <span className="text-[16px] font-semibold tracking-[-0.025em]">Lumicrafte</span>
          </div>
          <p className="mt-[14px] max-w-[32ch] text-[14.5px] leading-[1.6] text-invert-ink/70">
            Crafting modern software where clarity meets precision.
          </p>
        </div>

        <nav aria-label="Footer navigation" className="flex flex-col gap-[10px] text-[14px]">
          <span className={LABEL}>SITE</span>
          {siteLinks.map((link) => (
            <Link key={link.label} href={link.href} className={LINK}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-[10px] text-[14px]">
          <span className={LABEL}>ELSEWHERE</span>
          <a href={social.github} className={LINK}>
            GitHub
          </a>
          <a href={social.linkedin} className={LINK}>
            LinkedIn
          </a>
          <a href={`mailto:${contactEmail}`} className={LINK}>
            {contactEmail}
          </a>
        </div>

        <div className="flex flex-col gap-[10px] text-[14px]">
          <span className={LABEL}>LEGAL</span>
          <Link href={routes.privacy} className={LINK}>
            Privacy Policy
          </Link>
          <Link href={routes.terms} className={LINK}>
            Terms
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-[1280px] border-t border-invert-ink/10 px-[26px] pt-5 pb-[34px] font-mono text-[11px] tracking-[0.08em] text-invert-ink/66">
        © 2026 Lumicrafte. All rights reserved.
      </div>
    </footer>
  );
}
