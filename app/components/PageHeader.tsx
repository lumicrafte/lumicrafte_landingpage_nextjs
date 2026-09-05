import Image from 'next/image';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import CtaButton from './CtaButton';
import { routes } from '../../lib/site';

type NavLink = { label: string; href: string };

/** Condensed header used by Writing, Blog Post, and the legal pages. */
export default function PageHeader({
  links = [],
  backToSite = false,
  children,
}: {
  links?: NavLink[];
  backToSite?: boolean;
  children?: React.ReactNode;
}) {
  const ctaClass =
    'rounded-md bg-ink px-4 py-[9px] font-medium text-paper transition-colors duration-200 hover:bg-accent hover:text-white';

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-paper/90 backdrop-blur-[12px]">
      <div className="mx-auto flex max-w-[1280px] items-center gap-[26px] px-[26px] py-3">
        <Link href={routes.home} className="flex shrink-0 items-center gap-[10px]">
          <Image
            src="/logo.png"
            alt="Lumicrafte logo"
            width={32}
            height={32}
            priority
            className="block h-8 w-8 rounded-lg"
          />
          <span className="text-[17px] font-semibold tracking-[-0.025em]">Lumicrafte</span>
        </Link>

        <div className="ml-auto flex flex-wrap items-center gap-[22px] text-[13.5px] font-medium">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-ink/62 transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
          <ThemeToggle />
          {backToSite ? (
            <Link href={routes.home} className={ctaClass}>
              Back to site
            </Link>
          ) : (
            <CtaButton className={ctaClass} />
          )}
        </div>
      </div>
      {children}
    </header>
  );
}
