import { existsSync } from 'node:fs';
import { join } from 'node:path';
import Image from 'next/image';
import { screens, type ScreenKey } from './site';

const DIR = join(process.cwd(), 'public', 'enso', 'screens');

/** Phone-shaped frame around a real app screenshot.
 *
 *  Server component: checks public/enso/screens at build time, so a missing
 *  screenshot renders a labelled placeholder rather than a broken image.
 *  Renders the dark and light captures together and lets CSS (data-theme) pick
 *  one, because the site's theme is a toggle, not a media query. Both are
 *  lazy unless `priority`; the hidden one is not fetched while display:none.
 *
 *  `children` is drawn over the screenshot, for annotations. */
export default function Phone({
  screen,
  className = '',
  priority = false,
  children,
}: {
  screen: ScreenKey;
  className?: string;
  priority?: boolean;
  children?: React.ReactNode;
}) {
  const { alt, light } = screens[screen];
  const variants = [
    { theme: 'dark', file: `${screen}-dark.webp` },
    ...(light ? [{ theme: 'light', file: `${screen}-light.webp` }] : []),
  ].filter((v) => existsSync(join(DIR, v.file)));

  return (
    <div
      className={`relative aspect-[1179/2556] overflow-hidden rounded-[38px] border border-(--e-frame) bg-(--e-surface) phone-shadow ${className}`}
    >
      {variants.length === 0 ? (
        <div
          role="img"
          aria-label={alt}
          className="grid h-full w-full place-items-center p-6 text-center text-[12px] font-semibold tracking-[0.06em] text-(--e-muted) uppercase"
        >
          Screenshot
          <br />
          {screen}
        </div>
      ) : (
        variants.map((v) => (
          <Image
            key={v.file}
            src={`/enso/screens/${v.file}`}
            alt={alt}
            width={780}
            height={1691}
            priority={priority}
            sizes="(min-width: 1024px) 300px, 70vw"
            // With no light capture the dark one serves both themes.
            className={`block h-full w-full object-cover ${
              light ? `shot-${v.theme}` : ''
            }`}
          />
        ))
      )}
      {children}
    </div>
  );
}
