---
title: The cost of a hundred milliseconds
dek: Perceived speed is a design decision before it is an engineering one. Notes on where latency actually comes from in the interfaces we build.
category: ENGINEERING NOTES
date: 2026-06-17
tags: [PERFORMANCE, UX, ENGINEERING]
---

Every product we have worked on has had a moment where it stopped feeling good to
use, and nobody could say exactly when. The screens were the same. The features
were the same. What changed was the time between an action and its consequence.

Latency is easy to measure and hard to feel. A profiler reports numbers; a person
reports that the app is heavy. The gap between those two statements is where most
of the interesting work happens, and it is not usually where teams look first.

## Where the time goes

In practice, the delay a person notices is rarely one slow request. It is an
accumulation of small, individually defensible decisions.

- A spinner shown for work that finished in 80ms, held open by an artificial minimum duration.
- Three sequential requests that could have been one, because each was added by a different person in a different week.
- A transition tuned on a fast machine, where 400ms reads as smooth rather than slow.
- State that only exists on the server, so every optimistic update waits for a round trip it does not need.

> Users do not experience your architecture. They experience the wait between
> intent and confirmation.

## Budgets, not benchmarks

Benchmarks tell you what the code did once. A budget tells you what the product is
allowed to do every time. We set them per interaction rather than per page, because
that is the unit a person actually feels.

```ts title="budgets.ts"
export const budgets = {
  tap_feedback:   16,   // ms — one frame, always local
  optimistic_ui:  100,  // ms — before any network result
  list_render:    250,  // ms — first meaningful rows
  route_change:   400,  // ms — including data
} as const;
```

Once the numbers are written down, the conversation changes. A feature that breaks
the budget is not rejected; it is scoped differently, or it earns an explicit
exception with a reason attached. Both outcomes are better than discovering the
cost after release.

## What we do first

Before optimising anything, we make the interface honest: acknowledge every input
within a frame, show real progress rather than indefinite motion, and never hide a
fast result behind a slow animation. Most of the perceived improvement arrives
here, before a single query is rewritten.

The rest is ordinary engineering discipline: fewer round trips, work moved off the
critical path, caches with a clear invalidation story, and measurement on the
devices people actually own. None of it is novel. It is simply done, and kept done.
