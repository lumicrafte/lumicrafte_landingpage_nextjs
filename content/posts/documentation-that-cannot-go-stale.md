---
title: Documentation that cannot go stale
dek: Most documentation describes what code should do. Types can describe what code is allowed to do, and the compiler can keep that description honest.
category: ENGINEERING NOTES
date: 2026-04-07
tags: [TYPE SYSTEMS, API DESIGN, ENGINEERING]
featured: false
---

There is a particular kind of documentation that I like.

It is the kind you don't have to maintain.

Not because documentation is unimportant, but because anything that needs to be updated manually will eventually be slightly wrong.

Types give us another option.

Instead of writing:

> This function expects a connected connection.

we can make the API itself express that state.

```ts
function send(connection: Connection<Connected>, data: Data) {
  // ...
}
```

Now the compiler is part of the documentation.

If the API changes, the compiler tells us where the old assumption still exists.

## The problem with comments

Comments are useful when they explain intent.

They are much less useful when they describe something the compiler could already know.

Consider:

```ts
// Call this only after the connection has been established.
connection.send(data);
```

The comment can drift.

The code can change. Someone can call `send` earlier. The comment can remain there for another three years.

A type can make the same rule impossible to ignore.

```ts
connection.connect().send(data);
```

The important part is not the syntax.

It is that invalid states become harder to represent.

## This scales beyond connections

The same idea works for many things we normally explain in documentation.

A value can be:

* validated or unvalidated
* authenticated or unauthenticated
* loaded or loading
* connected or disconnected
* encoded or decoded
* owned or borrowed
* initialized or uninitialized

We often represent these states with comments, naming conventions, or runtime checks.

Sometimes that is enough.

Sometimes the state is important enough that it belongs in the type system.

## The useful part is the refactor

The real advantage becomes obvious during refactoring.

Imagine changing an API from:

```ts
function publish(message: Message): void
```

to something where publishing requires an authenticated client:

```ts
function publish(
  client: Client<Authenticated>,
  message: Message
): void
```

Now the compiler gives you a map of the places that need attention.

You don't need to search through comments.

You don't need to remember which callers were relying on an undocumented assumption.

The broken code points at itself.

> Good types don't just prevent bugs. They preserve decisions while the code changes around them.

## Documentation and types have different jobs

I don't think this means we should replace documentation with types.

Some things cannot or should not be encoded in a type system.

Why a decision was made is still useful documentation.

A complex business rule may need a paragraph.

An architectural trade-off may need a design document.

But when a rule can be expressed directly in the program, there is something powerful about making the compiler enforce it.

The best documentation is sometimes not a document at all.

Sometimes it is a constraint that makes the wrong thing impossible.
