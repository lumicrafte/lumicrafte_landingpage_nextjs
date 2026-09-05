import type { Metadata } from 'next';
import { Archivo, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-archivo',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains',
  display: 'swap',
});

const DESCRIPTION =
  'Lumicrafte builds modern software products and custom digital solutions where thoughtful design, precise engineering, and exceptional user experience come together.';

export const metadata: Metadata = {
  metadataBase: new URL('https://lumicrafte.com'),
  title: {
    default: 'Lumicrafte — Software crafted with precision',
    template: '%s — Lumicrafte',
  },
  description: DESCRIPTION,
  openGraph: {
    title: 'Lumicrafte — Software crafted with precision',
    description: DESCRIPTION,
    type: 'website',
    url: 'https://lumicrafte.com',
    siteName: 'Lumicrafte',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Lumicrafte — Software crafted with precision',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lumicrafte — Software crafted with precision',
    description: DESCRIPTION,
    images: ['/og-image.png'],
  },
};

// Runs before first paint so the correct palette is in place on load. The site
// is a static export, so there is no server-side theme negotiation available.
const themeBootstrap = `(function(){try{var s=localStorage.getItem("lc-theme");var t=(s==="dark"||s==="light")?s:(window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");document.documentElement.setAttribute("data-theme",t)}catch(e){document.documentElement.setAttribute("data-theme","light")}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${archivo.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
