/** Pure types — safe to import from client components. The filesystem work
 *  lives in lib/posts.ts, which must stay server-only. */
export type PostMeta = {
  slug: string;
  title: string;
  dek: string;
  category: string;
  date: string;
  dateLabel: string;
  tags: string[];
  featured: boolean;
  cover: string | null;
  readingMinutes: number;
};

export type Post = PostMeta & { html: string };
