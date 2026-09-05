'use client';

import { useEffect, useRef } from 'react';

/**
 * Section reveal-on-scroll, ported from the prototype's IntersectionObserver
 * (same rootMargin and threshold). Falls back to fully visible when the
 * observer is unavailable or the user prefers reduced motion.
 */
export default function Reveal({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !('IntersectionObserver' in window)) {
      el.dataset.shown = 'true';
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          (entry.target as HTMLElement).dataset.shown = 'true';
          io.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.08 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`lc-reveal ${className}`}>
      {children}
    </div>
  );
}
