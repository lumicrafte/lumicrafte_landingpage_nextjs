import type { Metadata } from 'next';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import localFont from 'next/font/local';
import ThemeToggle from '../../components/ThemeToggle';
import Image from 'next/image';
import BudgetCallouts from './BudgetCallouts';
import Reveal from '../../components/Reveal';
import CompactFooter from '../../components/CompactFooter';
import EnsoMark from './EnsoMark';
import Phone from './Phone';
import './enso.css';
import {
  APP_STORE_URL,
  APP_STORE_ID,
  DESCRIPTION,
  PAGE_URL,
  PLAY_LIVE,
  PLAY_URL,
  SUPPORT_EMAIL,
  TITLE,
  widgets,
  type ScreenKey,
} from './site';

const spaceGrotesk = localFont({
  src: [
    { path: './fonts/SpaceGrotesk-Medium.ttf', weight: '500' },
    { path: './fonts/SpaceGrotesk-SemiBold.ttf', weight: '600' },
    { path: './fonts/SpaceGrotesk-Bold.ttf', weight: '700' },
  ],
  variable: '--font-space-grotesk',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
});

const manrope = localFont({
  src: [
    { path: './fonts/Manrope-Regular.ttf', weight: '400' },
    { path: './fonts/Manrope-Medium.ttf', weight: '500' },
    { path: './fonts/Manrope-SemiBold.ttf', weight: '600' },
    { path: './fonts/Manrope-Bold.ttf', weight: '700' },
  ],
  variable: '--font-manrope',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
});

const hasOgImage = existsSync(join(process.cwd(), 'public', 'enso', 'og.png'));
const ogImages = hasOgImage
  ? [{ url: '/enso/og.png', width: 1200, height: 630, alt: 'Enso — No bank login. Ever.' }]
  : undefined;

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  // Lets Safari on iPhone offer the app inline.
  other: { 'apple-itunes-app': `app-id=${APP_STORE_ID}` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: PAGE_URL,
    siteName: 'Lumicrafte',
    type: 'website',
    ...(ogImages && { images: ogImages }),
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    ...(ogImages && { images: ['/enso/og.png'] }),
  },
};

// No aggregateRating: the app has no ratings yet, and the page does not invent
// any. Prices are the tier-1 store prices (docs/09-IAP-Setup.md).
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MobileApplication',
  name: 'Enso',
  description: DESCRIPTION,
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'iOS',
  url: PAGE_URL,
  downloadUrl: APP_STORE_URL,
  publisher: { '@type': 'Organization', name: 'Lumicrafte', url: 'https://lumicrafte.com' },
  offers: [
    { '@type': 'Offer', name: 'Enso Free', price: '0', priceCurrency: 'USD' },
    { '@type': 'Offer', name: 'Enso Pro — Annual', price: '19.99', priceCurrency: 'USD' },
    { '@type': 'Offer', name: 'Enso Pro — Monthly', price: '4.99', priceCurrency: 'USD' },
    { '@type': 'Offer', name: 'Enso Pro — Lifetime', price: '49.99', priceCurrency: 'USD' },
  ],
};

const NAV = [
  { label: 'Features', href: '#features' },
  { label: 'Privacy', href: '#privacy' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
];

const SECTION = 'px-[22px] py-[88px] sm:py-[112px]';
const WRAP = 'mx-auto max-w-[1120px]';
const H2 = 'display text-[clamp(30px,4.6vw,46px)] font-bold leading-[1.05]';
const LEAD = 'mt-4 max-w-[560px] text-[16.5px] leading-[1.6] text-(--e-text-2)';

/** Apple's official "Download on the App Store" badge (white on dark, black on
 *  light). Used unmodified, as the badge guidelines require, so it is sized by height only. */
function StoreCta({ className = '' }: { className?: string }) {
  return (
    <a
      href={APP_STORE_URL}
      aria-label="Download Enso on the App Store"
      className={`inline-block transition-[transform,filter] hover:brightness-110 active:scale-[0.98] ${className}`}
    >
      {/* eslint-disable @next/next/no-img-element */}
      <img
        src="/enso/app-store-badge-white.svg"
        alt="Download on the App Store"
        width={150}
        height={50}
        className="badge-dark block h-[50px] w-auto"
      />
      <img
        src="/enso/app-store-badge-black.svg"
        alt="Download on the App Store"
        width={150}
        height={50}
        className="badge-light block h-[50px] w-auto"
      />
      {/* eslint-enable @next/next/no-img-element */}
    </a>
  );
}

type WidgetItem = (typeof widgets)[number];

/** One widget capture with its size and tier. */
function WidgetFigure({ widget: wd }: { widget: WidgetItem }) {
  return (
    <figure className="m-0">
      <div className="overflow-hidden rounded-[26px] border border-(--e-frame) bg-[#F4F4F5] phone-shadow">
        <Image
          src={`/enso/screens/${wd.file}`}
          alt={wd.alt}
          width={wd.w}
          height={wd.h}
          sizes="(min-width: 768px) 520px, 90vw"
          className="block h-auto w-full"
        />
      </div>
      <figcaption className="mt-3 flex flex-wrap items-center gap-2 text-[14px] font-semibold text-(--e-text-2)">
        {wd.name} · {wd.size}
        <span
          className={`rounded-full px-2 py-[2px] text-[10.5px] font-bold tracking-[0.08em] uppercase ${
            wd.pro ? 'bg-(--e-tint) text-(--e-accent)' : 'bg-(--e-line) text-(--e-muted)'
          }`}
        >
          {wd.pro ? 'Pro' : 'Free'}
        </span>
      </figcaption>
    </figure>
  );
}

function Feature({
  eyebrow,
  title,
  body,
  screen,
  visual,
  flip = false,
  children,
}: {
  eyebrow: string;
  title: string;
  body: string;
  /** A real app screenshot, or `visual` for a block with no screen to show. */
  screen?: ScreenKey;
  visual?: React.ReactNode;
  flip?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <Reveal>
      <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
        <div className={flip ? 'md:order-2' : ''}>
          <div className="eyebrow">{eyebrow}</div>
          <h3 className="display mt-3 text-[clamp(26px,3.6vw,38px)] font-bold leading-[1.08]">{title}</h3>
          <p className={LEAD}>{body}</p>
          {children}
        </div>
        <div className={`flex justify-center ${flip ? 'md:order-1' : ''}`}>
          {visual ?? (screen && <Phone screen={screen} className="w-[min(72vw,280px)]" />)}
        </div>
      </div>
    </Reveal>
  );
}

/** App lock has no screenshot yet, so it gets a drawn visual rather than a
 *  placeholder: the ensō ring with a padlock, and the three ways to unlock. */
function LockVisual() {
  return (
    <div className="hero-card relative flex aspect-square w-[min(72vw,320px)] flex-col items-center justify-center gap-7 rounded-[38px] phone-shadow">
      <div className="relative grid place-items-center">
        <EnsoMark size={150} />
        <svg
          width="46"
          height="46"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--e-accent)"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="absolute"
        >
          <rect x="5" y="11" width="14" height="9" rx="2.5" />
          <path d="M8 11V8a4 4 0 0 1 8 0v3" />
        </svg>
      </div>
      <ul className="flex flex-wrap justify-center gap-2" role="list" aria-label="Unlock with">
        {['PIN', 'Face ID', 'Touch ID'].map((m) => (
          <li
            key={m}
            className="rounded-full border border-(--e-tint-line) bg-(--e-tint-soft) px-3 py-[5px] text-[12.5px] font-bold text-(--e-text-2)"
          >
            {m}
          </li>
        ))}
      </ul>
    </div>
  );
}

const PRO_TAG = (
  <span className="ml-2 rounded-full bg-(--e-tint) px-2 py-[2px] align-middle text-[10.5px] font-bold tracking-[0.08em] text-(--e-accent) uppercase">
    Pro
  </span>
);

const COMPARE: { label: string; free: string; pro: string }[] = [
  { label: 'Transactions', free: 'Unlimited, forever', pro: 'Unlimited' },
  { label: 'Ads', free: 'None, ever', pro: 'None, ever' },
  { label: 'Accounts', free: '2', pro: 'Unlimited' },
  { label: 'Custom categories', free: '5', pro: 'Unlimited' },
  { label: 'Budgets', free: '1, monthly', pro: 'Unlimited, with payday reset and rollover' },
  { label: 'Pace and safe-to-spend per day', free: '—', pro: 'Included' },
  { label: 'Insights range', free: 'This week, this month', pro: 'Full year or any custom range' },
  { label: 'Receipts', free: '3', pro: 'Unlimited' },
  { label: 'Split transactions', free: '—', pro: 'Included' },
  { label: 'Widgets', free: 'Quick Add', pro: 'Quick Add + Safe to Spend' },
  { label: 'CSV export', free: 'Available', pro: 'Full history and custom range' },
];

const FAQ: { q: string; a: string }[] = [
  {
    q: 'Why do I have to enter transactions myself?',
    a: 'Thirty seconds a day is the point — it’s the noticing that changes spending. It’s also why Enso works with cash, which bank-linked apps can’t see.',
  },
  {
    q: 'Is my data really private?',
    a: 'There’s no account and no server. Nothing to breach, because nothing is sent. You can also lock Enso with a PIN, Face ID or Touch ID.',
  },
  {
    q: 'Do I have to pay?',
    a: 'No. Free is unlimited transactions, forever, with no ads. Pro adds depth: more accounts and budgets, payday cycles, pace, and longer insights.',
  },
  {
    q: 'I don’t want another subscription.',
    a: 'Then don’t. Lifetime is a single payment, once.',
  },
  {
    q: 'What happens when the 14 days end?',
    a: 'You move to Free. Nothing is deleted or hidden — everything you created stays visible, editable and exportable.',
  },
  {
    q: 'Does it work in my country?',
    a: 'Yes. There’s no bank integration to be unavailable where you live, and you can pick any currency.',
  },
  {
    q: 'Can I get my data out?',
    a: 'Yes. Export to CSV any time. Your data is never held hostage.',
  },
];

export default function Page() {
  return (
    <div className={`enso ${spaceGrotesk.variable} ${manrope.variable}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-(--e-line) bg-(--e-header) backdrop-blur-[14px]">
        <div className="mx-auto flex max-w-[1120px] items-center gap-6 px-[22px] py-3">
          <a href="#top" className="flex items-center gap-[10px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/enso/icon.png" alt="" width={32} height={32} className="block h-8 w-8 rounded-[9px]" />
            <span className="display text-[18px] font-bold tracking-[-0.02em]">Enso</span>
          </a>
          <nav aria-label="Primary" className="ml-auto hidden gap-7 text-[14px] font-semibold text-(--e-muted) md:flex">
            {NAV.map((item) => (
              <a key={item.href} href={item.href} className="transition-colors hover:text-(--e-text)">
                {item.label}
              </a>
            ))}
          </nav>
          <ThemeToggle className="max-md:ml-auto md:ml-0" />
          <a
            href={APP_STORE_URL}
            className="inline-flex min-h-11 items-center rounded-full bg-(--e-accent) px-5 text-[14px] font-bold text-(--e-accent-ink) transition-[filter] hover:brightness-110"
          >
            <span className="max-sm:hidden">Download Enso Now</span>
            <span className="sm:hidden">Get Enso</span>
          </a>
        </div>
      </header>

      <main id="top">
        {/* Hero */}
        <section className="hero-glow overflow-hidden px-[22px] pt-[56px] pb-[72px] sm:pt-[88px] sm:pb-[104px]">
          <div className="mx-auto grid max-w-[1120px] items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
            <div>
              <div className="eyebrow flex items-center gap-2">
                <EnsoMark size={16} animate />
                Private by construction
              </div>
              <h1 className="display mt-5 text-[clamp(40px,7vw,68px)] font-bold leading-[1.02]">
                Budgeting that never asks for your bank login.
              </h1>
              <p className="mt-6 max-w-[520px] text-[17.5px] leading-[1.6] text-(--e-text-2)">
                Every transaction stays on your iPhone. No account, no cloud — and still budgets that start on
                payday and insights that tell you what changed.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                <StoreCta />
                <a href="#features" className="text-[15px] font-bold text-(--e-text-2) underline decoration-(--e-line) underline-offset-4 transition-colors hover:text-(--e-text)">
                  See how Enso works
                </a>
              </div>
              {PLAY_LIVE && (
                <a href={PLAY_URL} className="mt-4 inline-block text-[14px] font-semibold text-(--e-muted) underline underline-offset-4">
                  Also on Google Play
                </a>
              )}
              <p className="mt-6 text-[13.5px] font-semibold text-(--e-muted)">
                Free forever · No ads · 14 days of Pro, no card
              </p>
            </div>

            <div className="relative mx-auto h-[500px] w-full max-w-[460px] sm:h-[560px]">
              <div className="float-b absolute right-0 bottom-0 w-[54%]">
                <Phone screen="budget" priority />
              </div>
              <div className="float-a absolute top-0 left-0 w-[58%]">
                <Phone screen="home" priority />
              </div>
            </div>
          </div>
        </section>

        {/* Privacy */}
        <section id="privacy" className={`${SECTION} border-y border-(--e-line) bg-(--e-surface)`}>
          <div className={WRAP}>
            <Reveal>
              <div className="eyebrow">Privacy</div>
              <h2 className={`${H2} mt-3 max-w-[760px]`}>There’s nothing to breach, because nothing is sent.</h2>
              <p className={LEAD}>
                Most budgeting apps start by asking for your bank login, then keep your financial life on their
                servers. Enso has no servers to keep it on.
              </p>
            </Reveal>
            <Reveal>
              <div className="mt-12 grid gap-4 md:grid-cols-3">
                {[
                  ['No account, no server', 'No sign-up, no login. Your ledger lives on your device and nowhere else.'],
                  ['Locked when you want it', 'Lock Enso with a PIN, Face ID or Touch ID. With the lock on, the Safe to Spend widget hides every amount.'],
                  ['Yours to take', 'Export to CSV any time. Your data is never held hostage.'],
                ].map(([t, b]) => (
                  <div key={t} className="rounded-[20px] border border-(--e-line) bg-(--e-bg) p-6">
                    <h3 className="display text-[19px] font-bold">{t}</h3>
                    <p className="mt-3 text-[15px] leading-[1.6] text-(--e-text-2)">{b}</p>
                  </div>
                ))}
              </div>
              <p className="mt-8 max-w-[680px] text-[15.5px] leading-[1.65] text-(--e-text-2)">
                <strong className="font-bold text-(--e-text)">The trade-off, plainly:</strong> with no bank
                linking, you enter transactions yourself — about thirty seconds a day. It’s also why Enso sees
                your cash, which bank-linked apps can’t, and why it works the same in every country.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Features */}
        <section id="features" className={SECTION}>
          <div className={`${WRAP} flex flex-col gap-[96px] sm:gap-[120px]`}>
            <Reveal>
              <div className="eyebrow">What it does</div>
              <h2 className={`${H2} mt-3 max-w-[720px]`}>Know where you stand. Know what’s left.</h2>
            </Reveal>

            <Feature
              eyebrow="Payday budgets"
              title="Your month starts on payday."
              body="Reset your budget on any day from the 1st to the 28th. Unspent money rolls into the next cycle — your budget follows how you’re actually paid."
              screen="payday"
            >
              <p className="mt-4 text-[13.5px] font-semibold text-(--e-muted)">Payday reset and rollover are in Pro.</p>
            </Feature>

            <Reveal>
              <div className="eyebrow">Your budget</div>
              <h2 className={`${H2} mt-3 max-w-[720px]`}>Know what’s left, not just what’s gone.</h2>
              <p className={LEAD}>
                One screen answers three questions: what can I still spend, am I ahead of last cycle, and what is
                safe today.
              </p>
              <div className="mt-12">
                <BudgetCallouts>
                  <Phone screen="budget" />
                </BudgetCallouts>
              </div>
            </Reveal>

            <Feature
              eyebrow="Insights"
              title="It tells you what changed."
              body="Plain sentences, not just charts. The app talks, so you don’t need to read a pie chart."
              screen="insights"
              flip
            >
              <ul className="mt-6 flex flex-col gap-3">
                {[
                  'Where you’ll finish the month at your current pace',
                  'How this month compares with last',
                  'Your biggest single expense, and its share of the total',
                  'What’s recurring, and what’s discretionary',
                ].map((line) => (
                  <li
                    key={line}
                    className="rounded-[14px] border border-(--e-line) bg-(--e-surface) px-4 py-3 text-[14.5px] leading-[1.5] text-(--e-text-2)"
                  >
                    {line}
                  </li>
                ))}
              </ul>
            </Feature>

            <Feature
              eyebrow="Monthly recap"
              title="Your month, in one card."
              body="When the month closes, Enso sums it up: money in, money out, your savings rate and your biggest category. Share it as a card — and hide the amounts, so only the percentages show."
              screen="recap"
            />

            <Feature
              eyebrow="App lock"
              title="Locked to you, and nobody else."
              body="Lock Enso with a PIN, Face ID or Touch ID. Your ledger lives only on your iPhone, under iOS Data Protection — encrypted on disk with a key tied to your passcode. With the lock on, the Safe to Spend widget hides every amount."
              flip
              visual={<LockVisual />}
            />
          </div>
        </section>

        {/* Widgets */}
        <section className={`${SECTION} border-y border-(--e-line) bg-(--e-surface)`}>
          <div className={WRAP}>
            <Reveal>
              <div className="eyebrow">Home Screen</div>
              <h2 className={`${H2} mt-3 max-w-[720px]`}>Your budget, one glance away.</h2>
              <p className={LEAD}>
                <strong className="font-bold text-(--e-text)">Quick Add</strong> opens the keypad in one tap,
                on the account you used last. <strong className="font-bold text-(--e-text)">Safe to Spend</strong>{' '}
                shows what you can spend today without opening the app — in three sizes.
              </p>
            </Reveal>
            <Reveal>
              <div className="mt-12 grid items-start gap-x-5 gap-y-8 md:grid-cols-[1.05fr_1fr]">
                <WidgetFigure widget={widgets[0]} />
                <div className="flex flex-col gap-8">
                  <WidgetFigure widget={widgets[1]} />
                  <div className="grid grid-cols-2 gap-5">
                    <WidgetFigure widget={widgets[2]} />
                    <WidgetFigure widget={widgets[3]} />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Daily loop */}
        <section className={SECTION}>
          <div className={WRAP}>
            <Reveal>
              <div className="eyebrow">The daily loop</div>
              <h2 className={`${H2} mt-3 max-w-[720px]`}>Logged in ten seconds.</h2>
              <p className={LEAD}>
                A keypad built for amounts — no system keyboard, no forms to fight.
              </p>
            </Reveal>
            <Reveal>
              <div className="mx-auto mt-14 grid max-w-[640px] gap-12 sm:grid-cols-2">
                {(
                  [
                    ['keypad', 'Log it fast', 'Income, expenses and transfers between your own accounts. Quick mode for speed, Detailed mode when it matters.'],
                    ['split', 'One receipt, every category', 'Split a shop across Food and Household and attach the receipt. It has to add up.'],
                  ] as [ScreenKey, string, string][]
                ).map(([screen, t, b]) => (
                  <div key={screen} className="flex flex-col items-center text-center">
                    <Phone screen={screen} className="w-[min(60vw,220px)]" />
                    <h3 className="display mt-7 text-[20px] font-bold">{t}</h3>
                    <p className="mt-2 max-w-[300px] text-[15px] leading-[1.6] text-(--e-text-2)">{b}</p>
                  </div>
                ))}
              </div>
              <p className="mx-auto mt-14 max-w-[640px] text-center text-[15px] leading-[1.65] text-(--e-muted)">
                Bank, Wallet, Cash or Other — cash is first-class. Balances are computed from your transactions,
                never stored, so they can’t drift out of sync.
              </p>
            </Reveal>
          </div>
        </section>

        {/* How it works */}
        <section className={`${SECTION} border-y border-(--e-line) bg-(--e-surface)`}>
          <div className={WRAP}>
            <Reveal>
              <div className="eyebrow">How it works</div>
              <h2 className={`${H2} mt-3`}>Three steps. No sign-up.</h2>
              <ol className="mt-12 grid gap-4 md:grid-cols-3">
                {[
                  ['Add your accounts', 'A bank, a wallet, cash. Start with today’s balance.'],
                  ['Log as you spend', 'Ten seconds with the keypad, or one tap from your Home Screen.'],
                  ['Set your budget', 'Pick the day your month starts. Enso tells you what’s left and what changed.'],
                ].map(([t, b], i) => (
                  <li key={t} className="rounded-[20px] border border-(--e-line) bg-(--e-bg) p-6">
                    <span className="display text-[34px] font-bold text-(--e-accent)">{i + 1}</span>
                    <h3 className="display mt-3 text-[19px] font-bold">{t}</h3>
                    <p className="mt-2 text-[15px] leading-[1.6] text-(--e-text-2)">{b}</p>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className={SECTION}>
          <div className={WRAP}>
            <Reveal>
              <div className="eyebrow">Pricing</div>
              <h2 className={`${H2} mt-3 max-w-[720px]`}>Free is unlimited. Pro goes deeper.</h2>
              <p className={LEAD}>
                Entry is never capped or counted. Every new install gets 14 days of Pro — no card, no sign-up.
              </p>
            </Reveal>

            <Reveal>
              <div className="mt-12 grid gap-4 md:grid-cols-3">
                {[
                  { name: 'Monthly', price: '$4.99', note: 'per month', featured: false },
                  { name: 'Annual', price: '$19.99', note: 'per year · $1.67 a month', featured: true },
                  { name: 'Lifetime', price: '$49.99', note: 'one payment, once', featured: false },
                ].map((p) => (
                  <div
                    key={p.name}
                    className={`rounded-[22px] p-6 ${
                      p.featured ? 'hero-card' : 'border border-(--e-line) bg-(--e-surface)'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="display text-[19px] font-bold">{p.name}</h3>
                      {p.featured && (
                        <span className="rounded-full bg-(--e-accent) px-2.5 py-[3px] text-[10.5px] font-bold tracking-[0.08em] text-(--e-accent-ink) uppercase">
                          Best value
                        </span>
                      )}
                    </div>
                    <div className="display mt-5 text-[40px] font-bold">{p.price}</div>
                    <div className="mt-1 text-[14px] text-(--e-muted)">{p.note}</div>
                  </div>
                ))}
              </div>
              <p className="mt-5 max-w-[720px] text-[14px] leading-[1.6] text-(--e-muted)">
                Prices shown are US store prices; your App Store shows the price for your region. Subscriptions
                renew automatically and are managed in your Apple Account. Lifetime is a one-time purchase, not a
                subscription.
              </p>
              <div className="mt-6 rounded-[18px] border border-(--e-tint-line) bg-(--e-tint-soft) p-5 text-[15.5px] leading-[1.6]">
                <strong className="font-bold">If Pro lapses, nothing is deleted or hidden.</strong>{' '}
                <span className="text-(--e-text-2)">
                  Everything you created stays visible, editable and exportable.
                </span>
              </div>
            </Reveal>

            <Reveal>
              <div className="mt-14 overflow-hidden rounded-[20px] border border-(--e-line) bg-(--e-surface)">
                <div role="table" aria-label="Free versus Pro" className="w-full text-[14.5px]">
                  <div role="row" className="grid grid-cols-[1.1fr_1fr_1.3fr] gap-3 border-b border-(--e-line) px-5 py-4 text-[12px] font-bold tracking-[0.06em] text-(--e-muted) uppercase max-sm:grid-cols-[1fr_1fr]">
                    <span role="columnheader" className="max-sm:hidden">Feature</span>
                    <span role="columnheader">Free</span>
                    <span role="columnheader" className="text-(--e-accent)">Pro</span>
                  </div>
                  {COMPARE.map((r) => (
                    <div
                      key={r.label}
                      role="row"
                      className="grid grid-cols-[1.1fr_1fr_1.3fr] gap-x-3 gap-y-1 border-b border-(--e-line) px-5 py-4 last:border-b-0 max-sm:grid-cols-[1fr_1fr]"
                    >
                      <span role="rowheader" className="font-bold max-sm:col-span-2">{r.label}</span>
                      <span role="cell" className="text-(--e-text-2)">{r.free}</span>
                      <span role="cell" className="text-(--e-text-2)">{r.pro}</span>
                    </div>
                  ))}
                </div>
              </div>
              <p className="mt-4 text-[14px] text-(--e-muted)">
                Payday reset, rollover, pace and safe-to-spend are Pro features.{PRO_TAG}
              </p>
            </Reveal>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className={`${SECTION} border-t border-(--e-line) bg-(--e-surface)`}>
          <div className="mx-auto max-w-[760px]">
            <Reveal>
              <div className="eyebrow">FAQ</div>
              <h2 className={`${H2} mt-3`}>Questions, answered straight.</h2>
              <div className="mt-10 divide-y divide-(--e-line) border-y border-(--e-line)">
                {FAQ.map((item) => (
                  <details key={item.q} className="group py-1">
                    <summary className="flex min-h-14 cursor-pointer items-center justify-between gap-4 py-3 text-[17px] font-bold">
                      {item.q}
                      <span aria-hidden="true" className="faq-plus shrink-0 text-[24px] leading-none text-(--e-accent) transition-transform">
                        +
                      </span>
                    </summary>
                    <p className="pb-5 text-[15.5px] leading-[1.65] text-(--e-text-2)">{item.a}</p>
                  </details>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Final CTA */}
        <section className="hero-glow px-[22px] py-[96px] text-center sm:py-[128px]">
          <Reveal>
            <div className="mx-auto flex max-w-[640px] flex-col items-center">
              <EnsoMark size={96} />
              <h2 className={`${H2} mt-8`}>Your money. Your phone. Nobody else’s.</h2>
              <p className="mt-4 text-[16.5px] leading-[1.6] text-(--e-text-2)">
                Download Enso now. It’s free forever, with no ads and 14 days of Pro to try it properly.
              </p>
              <StoreCta className="mt-8" />
              <p className="mt-6 text-[14px] text-(--e-muted)">
                Questions?{' '}
                <a href={`mailto:${SUPPORT_EMAIL}`} className="underline underline-offset-4">
                  {SUPPORT_EMAIL}
                </a>
              </p>
            </div>
          </Reveal>
        </section>
      </main>

      <CompactFooter
        links={[
          { label: 'Lumicrafte', href: '/' },
          { label: 'Privacy', href: '/privacy-policy' },
          { label: 'Terms', href: '/terms' },
          { label: 'Support', href: `mailto:${SUPPORT_EMAIL}` },
        ]}
      />
    </div>
  );
}
