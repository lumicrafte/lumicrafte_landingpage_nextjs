import type { Metadata } from 'next';
import LegalPage from '../components/LegalPage';
import { privacySections } from '../../content/privacy';
import { routes } from '../../lib/site';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'What information Lumicrafte collects when you visit lumicrafte.com or work with us, why we collect it, and what you can ask us to do with it.',
};

export default function Page() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro="This policy explains what information Lumicrafte collects when you visit lumicrafte.com or work with us, why we collect it, and what you can ask us to do with it."
      effective="01 JANUARY 2026"
      updated="05 SEPTEMBER 2026"
      sections={privacySections}
      contactHeading="Questions about your data"
      contactBody="Write to us and we will respond within 30 days. Include enough detail for us to locate your records."
      headerLinks={[{ label: 'Terms', href: routes.terms }]}
      footerLinks={[
        { label: 'Home', href: routes.home },
        { label: 'Terms', href: routes.terms },
      ]}
    />
  );
}
