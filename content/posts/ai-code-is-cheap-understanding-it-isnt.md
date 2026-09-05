---
title: "AI code is cheap. Understanding it isn't."
dek: AI made producing code dramatically cheaper. The harder problem now is knowing which code deserves to stay.
category: ENGINEERING NOTES
date: 2026-05-27
tags: [AI, ENGINEERING, SOFTWARE]
featured: false
---

AI has changed the economics of writing software.

A developer can now describe a feature, get a working implementation, change it three times, and throw the whole thing away before lunch. Code generation is no longer the expensive part of many tasks.

The interesting cost moved somewhere else.

It moved into understanding.

Generated code can be correct and still be difficult to reason about. It can pass the tests, follow the existing style, and use perfectly reasonable libraries while quietly making the system harder to change.

That distinction matters more as AI becomes part of normal development rather than something we occasionally use.

## The first version is almost free

There used to be a natural limit to how much code we were willing to write.

If implementing something took two days, we thought about whether it was worth doing.

When implementation takes twenty minutes, that constraint disappears.

This is useful, but it also changes how software grows.

We can now afford to create more abstractions, more experiments, more wrappers, more helpers, and more code that nobody would have written if the cost of producing it had been higher.

The result can look productive while increasing the amount of software we need to understand.

> When code becomes cheap to produce, attention becomes the scarce resource.

## Correct is not the same as understood

Consider a small API client.

An AI can easily produce something like this:

```ts title="client.ts"
export async function getUser(id: string) {
  const response = await fetch(`/api/users/${id}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch user: ${response.status}`);
  }

  return response.json();
}
```

There is nothing obviously wrong with it.

But a real system immediately raises other questions.

Does this need authentication?

Should the response be cached?

What happens when the request is cancelled?

Is the returned value validated?

Can this function be called during server rendering?

What does a `404` mean to the caller?

Who owns retries?

Those questions are not really code-generation problems.

They are understanding problems.

## This changes what good engineering looks like

I don't think the answer is to use less AI.

The useful part is almost the opposite: use it aggressively for the parts where generation is cheap, but become much stricter about what enters the permanent codebase.

That means reviewing boundaries more carefully.

Not every generated helper needs a design discussion. But anything that affects state, data ownership, concurrency, persistence, or public APIs deserves one.

The code itself may have taken thirty seconds.

The decision to keep it might deserve thirty minutes.

## The new bottleneck

Software engineering has always involved writing code, but writing code was never the whole job.

AI makes that harder to ignore.

The valuable skill is increasingly being able to look at a large amount of generated code and quickly answer:

**What is this doing, why is it doing it this way, and what will break if we change it?**

The better AI gets at producing code, the more important those questions become.
