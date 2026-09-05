'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import CtaButton from './CtaButton';
import { primaryNav } from '../../lib/site';

const NAV_LINK =
  'text-ink/62 transition-colors hover:text-ink';

/** Landing-page header: full nav above 880px, disclosure menu below it. */
export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-paper/90 backdrop-blur-[12px]">
      <div className="mx-auto flex max-w-[1280px] items-center gap-[30px] px-[26px] py-3">
        <Link href="/#top" className="flex shrink-0 items-center gap-[10px]">
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

        {/* Desktop */}
        <nav
          aria-label="Primary"
          className="ml-auto hidden gap-6 text-[13.5px] font-medium tracking-[-0.01em] min-[881px]:flex"
        >
          {primaryNav.map((item) => (
            <Link key={item.label} href={item.href} className={NAV_LINK}>
              {item.label}
            </Link>
          ))}
        </nav>
        <ThemeToggle className="hidden min-[881px]:block" />
        <CtaButton className="hidden shrink-0 rounded-md bg-ink px-4 py-[9px] text-[13.5px] font-medium text-paper transition-colors duration-200 hover:bg-accent hover:text-white min-[881px]:block" />

        {/* Mobile */}
        <ThemeToggle className="ml-auto min-[881px]:hidden" />
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          className="grid h-[46px] w-[46px] cursor-pointer place-items-center gap-[5px] rounded-lg border border-ink/16 bg-transparent p-0 text-ink min-[881px]:hidden"
        >
          <span className="block h-[1.5px] w-[17px] bg-ink" />
          <span className="block h-[1.5px] w-[17px] bg-ink" />
        </button>
      </div>

      {menuOpen && (
        <nav
          aria-label="Primary"
          className="flex flex-col gap-[2px] border-t border-ink/10 bg-paper px-[26px] pt-[14px] pb-[22px] min-[881px]:hidden"
        >
          {primaryNav.map((item, index) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className={`px-1 py-[13px] text-[17px] font-medium ${
                index < primaryNav.length - 1 ? 'border-b border-ink/7' : ''
              }`}
            >
              {item.label}
            </Link>
          ))}
          <CtaButton className="mt-[14px] rounded-lg bg-ink px-[18px] py-[15px] text-center text-[15px] font-medium text-paper" />
        </nav>
      )}
    </header>
  );
}
