---
# Required
title: Your post title
dek: One or two sentences. Shows on the index card and under the article headline.
category: ENGINEERING NOTES
date: 2026-09-05

# Optional
tags: [PERFORMANCE, UX]      # pills at the foot of the article
featured: false              # true puts it in the big hero card on /writing
draft: true                  # true keeps it out of the build entirely
cover: /images/writing/x.png # index card + article hero; falls back to the hatch pattern
readingTime: 7               # overrides the word-count estimate
---

The filename is the slug, so this file would publish at `/writing/_template`
— except `draft: true` keeps it out of the build. Delete that line to publish.

## Headings use ##

Body copy, **bold**, _italic_, [links](https://lumicrafte.com), and `inline code`
all render in the article styles.

- Bulleted lists get the square accent marker
- Numbered lists work too

> Block quotes render as the large pull quote with the accent bar.

Fenced code gets syntax highlighting. Add `title="filename"` for the header bar:

```ts title="example.ts"
export const example = { highlighted: true } as const;
```

Images become captioned figures — the alt text is the caption:

![FIG. 1 — Caption text appears beneath the image.](/images/writing/example.png)
