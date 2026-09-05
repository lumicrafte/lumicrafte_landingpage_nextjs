import env from './env';

/** Route map for the links the design expressed as `*.dc.html` filenames. */
export const routes = {
  home: '/',
  writing: '/writing',
  privacy: '/privacy-policy',
  terms: '/terms',
} as const;

export const featuredPostSlug = 'the-cost-of-a-hundred-milliseconds';

export const contactEmail = 'hello@lumicrafte.com';

/** The design ships these as href="#". Fill them in when the accounts exist. */
export const social = {
  github: '#',
  linkedin: '#',
} as const;

/** Every "Start a Project" CTA points at the inquiry form. */
export const projectFormUrl = env.googleFormUrl;

export const primaryNav = [
  { label: 'About', href: '/#story' },
  { label: 'Services', href: '/#services' },
  { label: 'Products', href: '/#products' },
  { label: 'Work', href: '/#work' },
  { label: 'Writing', href: routes.writing },
  { label: 'Contact', href: '/#contact' },
];
