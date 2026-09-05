---
title: Maybe we have too many abstractions
dek: Software gets easier to change when the right boundaries exist. The problem is that we are very good at creating boundaries that nobody needed.
category: ENGINEERING NOTES
date: 2026-03-15
tags: [ARCHITECTURE, SOFTWARE DESIGN]
featured: false
---

Abstraction is usually presented as a solution.

Something is repeated, so we extract it.

Something is complicated, so we hide it.

Something might change, so we put a boundary around it.

All reasonable ideas.

But there is another side to abstraction that gets less attention.

Every abstraction creates something new that a future developer has to understand.

A simple function becomes a service.

The service gets an interface.

The interface gets an adapter.

The adapter gets a factory.

Eventually changing one thing means finding the right place among six layers that all exist for a reason that made sense at some point.

## The abstraction was not wrong

This is what makes the problem difficult.

Most bad abstractions were not obviously bad when they were created.

They solved a real problem.

Maybe there were two implementations.

Maybe the team expected a third one.

Maybe the architecture was copied from a much larger system.

The problem appeared later.

The reason for the abstraction disappeared, but the abstraction stayed.

## Code has a carrying cost

I think about abstractions a little differently now.

Instead of asking:

**"Can we abstract this?"**

I prefer:

**"What problem will this abstraction make easier?"**

If the answer is unclear, keeping the code simple is often the better choice.

Not because duplication is good.

Not because architecture is bad.

Just because every layer has a cost.

You pay that cost whenever you read the code, debug it, change it, or explain it to someone else.

## The hardest code to remove

The most dangerous abstractions are often the ones that look architectural.

They give the codebase a feeling of structure.

There is a clean separation between things.

Everything has an interface.

Everything is replaceable.

But sometimes nothing actually needs to be replaceable.

A database repository that only wraps one database call does not automatically make the application more flexible.

A service with one implementation does not automatically make the architecture better.

A generic framework for three lines of repeated code may simply turn three easy lines into a small system.

The abstraction is real.

The benefit is not.

> A boundary is useful when it gives us something. A boundary that only exists because boundaries are considered good architecture is just another thing to maintain.

Good architecture is not the amount of structure in the code.

It is how much unnecessary structure we managed not to build.
