/** The ensō: a circle that is also the budget dial. Dark track, green arc over
 *  62% of it — the same construction as the app icon and BudgetRing.
 *
 *  `animate` draws the arc once on load (the hero); otherwise it fills when it
 *  scrolls into view, driven by a parent `data-shown` from <Reveal>. Both are
 *  disabled under prefers-reduced-motion in enso.css. */
export default function EnsoMark({
  size = 32,
  animate = false,
  className = '',
}: {
  size?: number;
  animate?: boolean;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <circle cx="50" cy="50" r="38" stroke="var(--e-track)" strokeWidth="11" />
      <circle
        cx="50"
        cy="50"
        r="38"
        stroke="var(--e-accent)"
        strokeWidth="11"
        strokeLinecap="round"
        pathLength={1}
        transform="rotate(-90 50 50)"
        className={animate ? 'enso-arc' : 'dial-arc'}
      />
    </svg>
  );
}
