import Image from 'next/image';
import Link from 'next/link';
import { routes } from '../../lib/site';

const FOOTER_LINK = 'text-invert-ink/72 transition-colors hover:text-white';

/** Single-row footer used by Writing, Blog Post, and the legal pages. */
export default function CompactFooter({
  links = [
    { label: 'Home', href: routes.home },
    { label: 'Privacy', href: routes.privacy },
    { label: 'Terms', href: routes.terms },
  ],
}: {
  links?: { label: string; href: string }[];
}) {
  return (
    <footer className="bg-invert-bg text-invert-ink">
      <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-5 px-[26px] py-[34px]">
        <div className="flex items-center gap-[10px]">
          <Image
            src="/logo.png"
            alt=""
            width={24}
            height={24}
            className="block h-6 w-6 rounded-md"
          />
          <span className="text-[14.5px] text-invert-ink/80">
            Crafting modern software where clarity meets precision.
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-5 text-[14px]">
          {links.map((link) => (
            <Link key={link.label} href={link.href} className={FOOTER_LINK}>
              {link.label}
            </Link>
          ))}
          <span className="font-mono text-[11px] tracking-[0.08em] text-invert-ink/66">
            © 2026 Lumicrafte
          </span>
        </div>
      </div>
    </footer>
  );
}
