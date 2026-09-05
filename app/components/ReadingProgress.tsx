'use client';

import { useEffect, useRef } from 'react';

/** Article scroll-progress bar, ported from the Blog Post prototype. */
export default function ReadingProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const pct = scrollable > 0 ? Math.min(100, Math.max(0, (window.scrollY / scrollable) * 100)) : 0;
      bar.style.width = `${pct.toFixed(2)}%`;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div aria-hidden="true" className="h-[2px] bg-ink/8">
      <div
        ref={barRef}
        className="h-[2px] w-0 bg-[linear-gradient(90deg,#4EC3F7,#7C5CF0_50%,#FFC233)]"
      />
    </div>
  );
}
