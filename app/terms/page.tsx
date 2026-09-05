import type { Metadata } from 'next';
import LegalPage from '../components/LegalPage';
import { termsSections } from '../../content/terms';
import { routes } from '../../lib/site';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'The terms governing use of lumicrafte.com and the basis on which Lumicrafte discusses and carries out work.',
};

export default function Page() {
  return (
    <LegalPage
      title="Terms of Service"
      intro="These terms govern the use of lumicrafte.com and set out the basis on which we discuss and carry out work. Client engagements are also covered by a separate signed agreement, which takes precedence where the two differ."
      effective="01 JANUARY 2026"
      updated="05 SEPTEMBER 2026"
      sections={termsSections}
      contactHeading="Questions about these terms"
      contactBody="If anything here is unclear, ask before you engage us. We would rather answer the question than rely on the small print."
      headerLinks={[{ label: 'Privacy', href: routes.privacy }]}
      footerLinks={[
        { label: 'Home', href: routes.home },
        { label: 'Privacy', href: routes.privacy },
      ]}
    />
  );
}
