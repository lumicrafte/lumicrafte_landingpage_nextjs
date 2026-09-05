# Lumicrafte Landing Page

Marketing site for Lumicrafte — software products, custom software, and design
services. Implements the "blueprint" direction handed off from Claude Design.

## Tech Stack

- **Next.js 15** (App Router) with **React 19** and TypeScript
- **Static export** (`output: 'export'`) — no server runtime
- **Tailwind CSS v4**, configured CSS-first in [`app/globals.css`](app/globals.css)
- **next/font** self-hosting Archivo and JetBrains Mono

## Getting Started

```bash
npm install
npm run dev
```

## Scripts

- `npm run dev` — development server
- `npm run build` — production build; writes the static site to `out/`
- `npm run start` — serve the production build
- `npm run lint` — ESLint
- `npm run typecheck` — TypeScript, no emit

## Environment Variables

Copy `.env.example` to `.env`:

```
NEXT_PUBLIC_GOOGLE_FORM_URL=https://forms.google.com/your-form-id
NEXT_PUBLIC_NEWSLETTER_ENDPOINT=
```

`NEXT_PUBLIC_GOOGLE_FORM_URL` backs every "Start a Project" CTA. It falls back to
a placeholder, so set it before building or the CTAs point nowhere useful —
static export bakes the value in at build time.

`NEXT_PUBLIC_NEWSLETTER_ENDPOINT` is optional. When set, the newsletter form
POSTs `{"email": "..."}` to it. When unset, the form tells visitors that signups
are not connected rather than claiming a subscription that did not happen.

## Routes

| Route | Source |
| --- | --- |
| `/` | [`app/components/Home.tsx`](app/components/Home.tsx) |
| `/writing` | [`app/components/WritingIndex.tsx`](app/components/WritingIndex.tsx) |
| `/writing/[slug]` | [`app/writing/[slug]/page.tsx`](app/writing/%5Bslug%5D/page.tsx) |
| `/privacy-policy` | [`content/privacy.ts`](content/privacy.ts) via `LegalPage` |
| `/terms` | [`content/terms.ts`](content/terms.ts) via `LegalPage` |

## Theming

Design tokens are CSS custom properties on `:root`, overridden under
`:root[data-theme="dark"]`, and exposed to Tailwind through `@theme inline` so
utilities such as `bg-paper` and `text-ink/70` re-resolve when the theme flips.

A small blocking script in [`app/layout.tsx`](app/layout.tsx) sets `data-theme`
before first paint from `localStorage` (key `lc-theme`), falling back to
`prefers-color-scheme`. This is required because the static export has no server
to negotiate the theme. `ThemeToggle` subscribes to that attribute via
`useSyncExternalStore` instead of holding a duplicate copy of the state.

## License

Private
