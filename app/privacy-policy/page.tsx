import type { Metadata } from 'next';
import PrivacyPolicy from '../components/PrivacyPolicy';

export const metadata: Metadata = {
  title: 'Privacy Policy - Lumicrafte',
  description: 'Privacy Policy for Lumicrafte - Learn how we protect your data.',
};

export default function Page() {
  return <PrivacyPolicy />;
}
