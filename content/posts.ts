import { featuredPostSlug } from '../lib/site';

export type PostCard = {
  slug: string;
  category: string;
  read: string;
  date: string;
  title: string;
  dek: string;
};

export const categories = [
  'ALL',
  'ENGINEERING NOTES',
  'DESIGN ESSAY',
  'PRODUCT UPDATE',
  'CASE STUDY',
] as const;

export const featuredPost = {
  slug: featuredPostSlug,
  category: 'ENGINEERING NOTES',
  read: '7 MIN READ',
  date: '05 SEP 2026',
  title: 'The cost of a hundred milliseconds',
  dek: 'Perceived speed is a design decision before it is an engineering one. Notes on where latency actually comes from in the interfaces we build.',
};

/**
 * Index entries from the design. Only `featuredPostSlug` has an article body so
 * far, so every card points at it — replace each slug as the posts are written.
 */
export const posts: PostCard[] = [
  { slug: featuredPostSlug, category: 'DESIGN ESSAY', read: '6 MIN', date: '28 AUG 2026', title: 'Deciding what not to build', dek: 'Scope is a design tool. How we use it before writing any code.' },
  { slug: featuredPostSlug, category: 'PRODUCT UPDATE', read: '3 MIN', date: '21 AUG 2026', title: 'Changelog — August', dek: 'What shipped, what moved, and what we learned from it.' },
  { slug: featuredPostSlug, category: 'CASE STUDY', read: '11 MIN', date: '12 AUG 2026', title: 'Rebuilding a workflow nobody liked', dek: 'A long-running internal tool, taken apart and put back together.' },
  { slug: featuredPostSlug, category: 'ENGINEERING NOTES', read: '8 MIN', date: '30 JUL 2026', title: 'State that survives a refresh', dek: 'Where we keep client state, and the rules we follow to keep it predictable.' },
  { slug: featuredPostSlug, category: 'DESIGN ESSAY', read: '5 MIN', date: '18 JUL 2026', title: 'Empty states deserve a first draft', dek: 'The screen a user sees first is usually the one designed last.' },
  { slug: featuredPostSlug, category: 'ENGINEERING NOTES', read: '9 MIN', date: '04 JUL 2026', title: 'Migrations without a maintenance window', dek: 'Shipping schema changes to a live product, one reversible step at a time.' },
];

export const relatedPosts = posts.slice(0, 3);
