import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Lumicrafte - Crafting Digital Experiences with Light & Precision',
  description: 'At Lumicrafte, we bring ideas to light through stunning UI/UX and useful mobile solutions.',
  openGraph: {
    title: 'Lumicrafte - Crafting Digital Experiences',
    description: 'At Lumicrafte, we bring ideas to light through stunning UI/UX and useful mobile solutions.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
