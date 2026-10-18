/** Everything the Enso page says that is a fact about the app, in one place.
 *
 *  Mirrors the Flutter app: store ids from lib/config/app_links.dart, limits
 *  from lib/config/free_limits.dart, prices from docs/09-IAP-Setup.md. If one
 *  of those changes there, change it here — the page must not drift from what
 *  the store and the app actually do.
 */

export const APP_STORE_ID = '6816860990';
export const APP_STORE_URL = `https://apps.apple.com/app/id${APP_STORE_ID}`;

/** Flip to true once the Play listing is live; it reveals the Play CTA. */
export const PLAY_LIVE = false;
export const PLAY_URL = 'https://play.google.com/store/apps/details?id=com.lumicrafte.enso';

export const SUPPORT_EMAIL = 'support@lumicrafte.com';

export const PAGE_URL = 'https://lumicrafte.com/enso';

export const TITLE = 'Enso — Private Budget & Expense Tracker for iPhone';
export const DESCRIPTION =
  'A budget and expense tracker that never asks for your bank login. Every transaction stays on your iPhone, with payday budgets and plain-language insights.';

/** App screenshots, in public/enso/screens/<name>-dark.webp and
 *  <name>-light.webp (780px wide). The page shows whichever matches the visitor's
 *  theme. `light: false` means only a dark capture exists, so it shows in both.
 *  A missing file renders a labelled placeholder instead of a broken image. */
export const screens = {
  home: { alt: 'Enso home screen showing total balance, a spending sparkline, the monthly budget and account tiles', light: true },
  budget: { alt: 'Budget screen with a dial showing the amount left to spend this cycle', light: true },
  insights: { alt: 'Insights screen with a balance trend and plain-sentence observations about your spending', light: true },
  payday: { alt: 'New budget screen with cycle start day chips and a roll-over toggle', light: true },
  keypad: { alt: 'Add expense screen with a purpose-built amount keypad', light: true },
  split: { alt: 'An expense split into items with a breakdown that must add up to the total', light: true },
  recap: { alt: 'Month recap with money in, money out, savings rate and a hide-amounts-when-sharing switch', light: false },
} as const;

export type ScreenKey = keyof typeof screens;

/** iOS widget gallery captures, cropped to the widget. Light only: that is how
 *  the system gallery renders them. */
export const widgets = [
  { file: 'widget-safe-large.webp', w: 960, h: 1008, name: 'Safe to Spend', size: 'Large', pro: true, alt: 'Large Safe to Spend widget: daily limit, pace against last cycle, category progress and an Add expense button' },
  { file: 'widget-safe-medium.webp', w: 980, h: 490, name: 'Safe to Spend', size: 'Medium', pro: true, alt: 'Medium Safe to Spend widget showing what you can spend per day and days left' },
  { file: 'widget-safe-small.webp', w: 640, h: 640, name: 'Safe to Spend', size: 'Small', pro: true, alt: 'Small Safe to Spend widget showing the daily limit and days left' },
  { file: 'widget-quick-add.webp', w: 640, h: 640, name: 'Quick Add', size: 'Small', pro: false, alt: 'Small Quick Add widget with an Add expense button' },
] as const;
