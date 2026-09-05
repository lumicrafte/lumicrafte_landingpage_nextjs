'use client';

import { useCallback, useEffect, useSyncExternalStore } from 'react';

type Theme = 'light' | 'dark';

function storedTheme(): Theme | null {
  try {
    const value = localStorage.getItem('lc-theme');
    return value === 'dark' || value === 'light' ? value : null;
  } catch {
    return null;
  }
}

/** The <html data-theme> attribute is the source of truth — it is set by the
 *  bootstrap script in layout.tsx before first paint, so React subscribes to it
 *  rather than owning a duplicate copy of the state. */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  });
  return () => observer.disconnect();
}

function getSnapshot(): Theme {
  return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute('data-theme', theme);
}

export default function ThemeToggle({ className = '' }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, () => 'light' as Theme);

  // Follow the OS while the visitor has not made an explicit choice.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (event: MediaQueryListEvent) => {
      if (storedTheme()) return;
      applyTheme(event.matches ? 'dark' : 'light');
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const toggle = useCallback(() => {
    const next: Theme = getSnapshot() === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    try {
      localStorage.setItem('lc-theme', next);
    } catch {
      /* private mode — the choice just will not persist */
    }
  }, []);

  const label = theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme';

  return (
    <button
      type="button"
      onClick={toggle}
      role="switch"
      aria-checked={theme === 'dark'}
      aria-label={label}
      className={`relative h-[28px] w-[54px] shrink-0 cursor-pointer rounded-full border border-ink/18 bg-ink/7 p-0 transition-[background-color,border-color] duration-[220ms] hover:border-ink/42 hover:bg-ink/11 ${className}`}
    >
      <span
        aria-hidden="true"
        className="lc-knob absolute top-[2px] left-[2px] grid h-[22px] w-[22px] place-items-center rounded-full bg-ink shadow-[0_1px_3px_rgba(0,0,0,0.22)] transition-transform duration-[280ms] ease-[cubic-bezier(.2,.8,.2,1)]"
      >
        <svg
          viewBox="0 0 24 24"
          width="13"
          height="13"
          fill="none"
          stroke="var(--paper)"
          strokeWidth="2.2"
          strokeLinecap="round"
          className="lc-icon-sun absolute transition-opacity duration-200"
        >
          <circle cx="12" cy="12" r="4.2" />
          <path d="M12 2.6v2.1M12 19.3v2.1M2.6 12h2.1M19.3 12h2.1M5.5 5.5l1.5 1.5M17 17l1.5 1.5M18.5 5.5L17 7M7 17l-1.5 1.5" />
        </svg>
        <svg
          viewBox="0 0 24 24"
          width="13"
          height="13"
          fill="none"
          stroke="var(--paper)"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lc-icon-moon absolute transition-opacity duration-200"
        >
          <path d="M20.4 14.6A8.6 8.6 0 1 1 9.4 3.6a7 7 0 0 0 11 11z" />
        </svg>
      </span>
    </button>
  );
}
