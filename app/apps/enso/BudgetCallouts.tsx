'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';

/** A highlight box, in % of the screenshot (left, top, width, height). */
type Box = [number, number, number, number];

type Callout = {
  title: string;
  body: string;
  pro: boolean;
  /** Boxes that stay the same in both captures. */
  boxes: Box[];
  /** Boxes that sit in a different place per capture (the ghost marker moves
   *  with the data, so the dark and light shots differ). */
  dark?: Box[];
  light?: Box[];
};

// Measured against the 1179×2556 captures. The dial, the legend line and the
// per-day pill are in the same place in both themes; the marker is not.
const CALLOUTS: Callout[] = [
  {
    title: 'Left to spend',
    body: 'The dial shows what you can still spend this cycle, and how much of the budget is used so far.',
    pro: false,
    boxes: [[23.6, 24.4, 52.4, 24.2]],
  },
  {
    title: 'Ahead, or behind?',
    body: 'The small marker on the dial is where you were at this same point last cycle. Compare it with where you are now — not with last cycle’s total.',
    pro: true,
    boxes: [
      [35.2, 39.5, 29.3, 2.1],
      [20.4, 49.85, 58.7, 2.15],
    ],
    dark: [[23.3, 35.75, 8.7, 3.5]],
    light: [[24.2, 31.8, 8.7, 3]],
  },
  {
    title: 'Safe to spend per day',
    body: 'Days left in the cycle, and the most you can spend each day and still land inside your budget.',
    pro: true,
    boxes: [[27.6, 53, 44.7, 4.25]],
  },
  {
    title: 'A ring for every category',
    body: 'Set a limit per category. Each one fills on its own, so you can see which one is running hot.',
    pro: true,
    boxes: [[5.1, 59.5, 89.7, 21.9]],
  },
];

/** Breathing room between the highlight and the content it points at. */
const PAD = 7;

/** How long each point stays highlighted while auto-playing. Keep in step with
 *  the callout-timer duration in enso.css. */
const STEP_MS = 4000;

const boxStyle = ([l, t, w, h]: Box): React.CSSProperties => ({
  left: `calc(${l}% - ${PAD}px)`,
  top: `calc(${t}% - ${PAD}px)`,
  width: `calc(${w}% + ${PAD * 2}px)`,
  height: `calc(${h}% + ${PAD * 2}px)`,
});

const REDUCED = '(prefers-reduced-motion: reduce)';

function subscribeReduced(onChange: () => void) {
  const mq = window.matchMedia(REDUCED);
  mq.addEventListener('change', onChange);
  return () => mq.removeEventListener('change', onChange);
}

/** The Budget screenshot with a highlight over whichever part the active point
 *  describes. `children` is the screenshot itself (a server component, so it
 *  is passed in rather than imported).
 *
 *  Discoverability, in order of what a visitor notices:
 *   1. It plays by itself — the highlight steps through the points, each one
 *      with a timer bar — so the link between list and screenshot is shown,
 *      not explained.
 *   2. Chevrons and a one-line hint say the rows are controls.
 *  The first hover, tap or keypress stops the auto-play for good: from then on
 *  the visitor drives. Auto-play never runs under prefers-reduced-motion, and
 *  pauses while the section is off-screen.
 *
 *  Without JavaScript it is static: the first point is highlighted and every
 *  point is still readable. */
export default function BudgetCallouts({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const [interacted, setInteracted] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  // The server snapshot is "reduced", so the first render never auto-plays and
  // matches the server HTML; it flips on the client for everyone else.
  const reduced = useSyncExternalStore(
    subscribeReduced,
    () => window.matchMedia(REDUCED).matches,
    () => true,
  );

  useEffect(() => {
    const el = root.current;
    if (!el || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.5,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Step on a timer, not on the bar's animationend, so advancing never depends
  // on an animation event firing. The bar is keyed on the same inputs, so it
  // restarts in sync whenever this timer does.
  const playing = !reduced && !interacted && inView;
  useEffect(() => {
    if (!playing) return;
    const id = window.setTimeout(() => setActive((a) => (a + 1) % CALLOUTS.length), STEP_MS);
    return () => window.clearTimeout(id);
  }, [playing, active]);

  const take = (i: number) => {
    setInteracted(true);
    setActive(i);
  };

  const current = CALLOUTS[active];

  return (
    <div ref={root} className="grid items-center gap-10 md:grid-cols-[auto_1fr] md:gap-16">
      <div className="relative mx-auto w-[min(72vw,300px)] md:mx-0">
        {children}

        {/* Highlights sit over the screenshot, inside the phone frame. */}
        <div className="pointer-events-none absolute inset-[1px]" aria-hidden="true">
          {current.boxes.map((box, i) => (
            <span key={`${active}-b-${i}`} className="hotspot" style={boxStyle(box)} />
          ))}
          {current.dark?.map((box, i) => (
            <span key={`${active}-d-${i}`} className="hotspot shot-dark" style={boxStyle(box)} />
          ))}
          {current.light?.map((box, i) => (
            <span key={`${active}-l-${i}`} className="hotspot shot-light" style={boxStyle(box)} />
          ))}
        </div>
      </div>

      <div>
        <p
          className={`mb-3 flex items-center gap-2 text-[13.5px] font-semibold text-(--e-muted) transition-opacity duration-500 ${
            interacted ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M9 11V5a2 2 0 1 1 4 0v5m0 0V8a2 2 0 1 1 4 0v4m0 0a2 2 0 1 1 4 0v3a7 7 0 0 1-7 7h-2a7 7 0 0 1-5.6-2.8L4 15a2 2 0 1 1 3.2-2.4L9 15" />
          </svg>
          Hover or tap a point to see it on the screen
        </p>

        <ul className="flex flex-col gap-3" role="list">
          {CALLOUTS.map((c, i) => {
            const on = i === active;
            return (
              <li key={c.title}>
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() => take(i)}
                  onMouseEnter={() => take(i)}
                  onFocus={() => take(i)}
                  className={`group relative flex w-full cursor-pointer items-start gap-4 overflow-hidden rounded-[18px] border p-4 pr-12 text-left transition-colors ${
                    on
                      ? 'border-(--e-tint-line) bg-(--e-tint-soft)'
                      : 'border-(--e-line) bg-(--e-surface) hover:border-(--e-tint-line)'
                  }`}
                >
                  <span
                    className={`display grid h-8 w-8 shrink-0 place-items-center rounded-full text-[15px] font-bold ${
                      on ? 'bg-(--e-accent) text-(--e-accent-ink)' : 'bg-(--e-tint) text-(--e-accent)'
                    }`}
                  >
                    {i + 1}
                  </span>
                  <span>
                    <span className="display flex items-center gap-2 text-[18px] font-bold">
                      {c.title}
                      {c.pro && (
                        <span className="rounded-full bg-(--e-tint) px-2 py-[2px] text-[10.5px] font-bold tracking-[0.08em] text-(--e-accent) uppercase">
                          Pro
                        </span>
                      )}
                    </span>
                    <span className="mt-1 block text-[15px] leading-[1.55] text-(--e-text-2)">{c.body}</span>
                  </span>

                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className={`absolute top-1/2 right-4 -translate-y-1/2 transition-transform group-hover:translate-x-1 ${
                      on ? 'text-(--e-accent)' : 'text-(--e-muted)'
                    }`}
                  >
                    <path d="m9 6 6 6-6 6" />
                  </svg>

                  {/* Timer bar: purely visual; the step itself is the timeout above. */}
                  {on && playing && (
                    <span
                      key={`${active}-${inView}`}
                      aria-hidden="true"
                      className="callout-timer absolute inset-x-0 bottom-0 h-[3px] origin-left bg-(--e-accent)"
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
