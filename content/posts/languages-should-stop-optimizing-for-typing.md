---
title: "Maybe programming languages should stop optimizing for typing"
dek: "AI has made writing code cheap. That changes what we should ask from programming languages: less focus on reducing keystrokes, more focus on making intent explicit and machine-checkable."
category: ENGINEERING NOTES
date: 2026-07-11
tags: [AI, PROGRAMMING LANGUAGES, COMPILERS, TYPE SYSTEMS, SOFTWARE ENGINEERING]
featured: true
---

A lot of programming language design is about making code pleasant for humans to write.

Shorter syntax.

Less boilerplate.

Convenient abstractions.

Things that let us express the same idea with fewer lines.

That made a lot of sense when a human had to write every line.

AI changes the equation.

An AI coding agent does not really care if a solution takes 30 lines or 300. It can write the 300 lines surprisingly quickly.

So perhaps we should rethink what we optimize for.

The interesting question is no longer only:

**How easy is this language for a human to write?**

It is also:

**How much can the language and compiler tell a machine about what this code means?**

## AI does not need code to be short

We have spent a long time treating verbosity as a problem.

If something can be expressed in 10 lines instead of 50, that is usually considered better.

For humans, it often is.

We have limited attention. Reading and writing code takes time. Boilerplate gets in the way. A language that lets us express an idea directly is usually more pleasant to use.

But an AI has a very different relationship with code.

Generating another 100 lines is cheap.

Reading and understanding those 100 lines is a different problem.

This means there is an opportunity to make a different trade-off.

We can afford to make the program more explicit if that explicitness gives us useful semantic information.

Instead of asking:

**How can we say this with fewer lines?**

we can sometimes ask:

**What information can we make impossible to miss?**

## Give the AI more context, not shorter code

An AI agent has to reconstruct a mental model of the program it is changing.

It reads source files.

It looks at types.

It searches documentation.

It reads tests.

It looks at usages.

It runs the compiler.

It tries to infer rules that may never have been explicitly written anywhere.

This is a strange situation.

We are asking the AI to understand a program by looking at its representation, while the compiler is sitting underneath it with a much richer understanding of that same program.

The compiler already knows things that are difficult to recover from source text alone.

It knows types.

It knows which values can be absent.

It knows ownership and lifetimes.

It knows control flow.

It knows which operations mutate state.

It knows which functions can perform certain effects.

It knows which states are valid.

It knows which invariants have been violated.

It knows why a particular piece of code is invalid.

But most AI coding tools get very little of that information directly.

They mostly get source code and compiler errors.

That feels like a missed opportunity.

## Make intent part of the program

Suppose an API requires authentication before a particular operation can be performed.

We could document it:

```text
Call this method only after authentication.
```

We could add a test.

We could rely on developers remembering the rule.

Or we could make the state part of the API itself:

```text
Client<Authenticated>
```

Now the compiler knows something that a comment does not.

The important part is not the syntax.

It is that the rule has become part of the program.

The same idea can apply to many things.

A value can be validated or unvalidated.

A resource can be owned, borrowed, or released.

A connection can be disconnected, connecting, or connected.

A value can be present or absent.

A function can have particular effects.

An operation can require a particular state and produce another one.

These are all things we normally explain through documentation, naming conventions, tests, or runtime checks.

Some of them can instead become part of the language's semantics.

And once the compiler understands them, they become available to everything that can talk to the compiler.

## The compiler already has the knowledge

This is the part I find most interesting.

We often talk about giving AI more context.

Give it more files.

Give it the README.

Give it the issue history.

Give it the tests.

Give it the git history.

All of these can help.

But perhaps the most valuable context is not more text.

It is **structured knowledge about the program**.

Imagine that instead of only asking the compiler:

```text
Does this compile?
```

an AI agent could ask:

```text
What is the semantic type of this expression?

What states can this value be in?

What does this function require?

What does it guarantee?

Which values does it borrow?

Which values does it own?

What can this operation mutate?

Which effects can this function perform?

Why is this operation invalid here?

Which invariants does this code depend on?

What would become invalid if I changed this type?
```

The compiler already has answers to many of these questions.

We just don't normally expose them as an interface for AI.

Today, the compiler is mostly a gatekeeper.

It says:

```text
error: type mismatch
```

The agent then has to figure out what that actually means in the context of the program.

A compiler with an AI-facing semantic interface could do much more.

It could explain the constraint that was violated.

It could expose the relevant types and states.

It could show the relationships between values.

It could provide the information an agent needs before it makes another change.

The compiler becomes part of the AI's context.

## The language should make more things knowable

This changes how I think about language design.

If AI is going to produce a large amount of our code, reducing the number of characters humans have to type becomes somewhat less important.

We can spend some of that budget on meaning.

A type should not only tell us that something is a `Connection`.

It could tell us that it is a connected connection.

A value should not merely be a `String` if the program cares whether that string has already been validated.

A function should not only describe its input and output if what it does to the outside world is also important.

An API should not merely expose methods if those methods are only valid in particular states.

The more of these properties the language can express, the more the compiler can understand.

And the more the compiler understands, the more it can tell both the developer and the AI.

This creates an interesting feedback loop:

**More expressive language → richer compiler model → better AI context → safer code generation.**

## Code can become its own documentation

There is another benefit.

Documentation drifts.

The code changes.

The comment doesn't.

The API changes.

The README doesn't.

Eventually the documentation describes a system that no longer exists.

This is particularly dangerous for rules that are important but difficult for the compiler to see.

"Call this after authentication."

"This value has already been validated."

"Don't use this object after closing it."

"This function performs network I/O."

"These two operations must happen in this order."

If the language can express these rules, we can move them from documentation into the program.

Now the compiler can enforce them.

That gives us something ordinary documentation cannot provide:

**the information cannot silently become false.**

A comment can become wrong.

A type constraint cannot simply become wrong while the program continues compiling.

And this is useful for AI for exactly the same reason.

The AI does not have to decide whether a comment is still trustworthy.

The compiler can provide the current truth.

## The compiler could become a semantic service

This suggests a different role for the compiler.

Not just a tool that turns source code into machine code.

Not just a type checker.

Not just something that tells us whether the program builds.

The compiler could become a semantic service for the entire development environment.

The editor uses its model.

Static analysis uses it.

Refactoring tools use it.

The debugger uses it.

AI agents use it.

Humans use it.

Instead of every tool independently trying to understand the source code, they can consume the compiler's understanding of the program.

This could be particularly valuable for AI because language models are very good at reasoning over information, but they are not automatically given the semantic information that the compiler has already established.

Why make the AI rediscover something that the compiler has already proven?

## This could change the AI coding loop

The current loop is roughly:

1. Read some code.
2. Guess what needs to change.
3. Generate code.
4. Run the compiler.
5. Read the error.
6. Guess again.
7. Repeat.

There is nothing fundamentally wrong with this.

But it treats the compiler as a final authority rather than a source of knowledge.

A richer loop could look more like:

1. Ask the compiler about the relevant part of the program.
2. Understand its types, states, constraints, and effects.
3. Generate a change that fits those constraints.
4. Ask the compiler what semantic guarantees changed.
5. Run tests and other checks.
6. Present the human with the remaining uncertainty.

The AI still generates the code.

The compiler provides the ground truth.

That division of responsibility feels much more natural.

## Maybe verbosity is not the enemy

I don't think this means programming languages should become unnecessarily verbose.

Human ergonomics still matter.

We still have to read the code.

We still have to debug it.

We still have to teach it.

But perhaps we should stop assuming that every additional piece of information in the program is noise.

Sometimes verbosity is carrying meaning.

There is a difference between:

```text
50 lines of boilerplate
```

and:

```text
50 lines that make ownership, state, effects,
constraints, and intent explicit
```

The first is just friction.

The second may be useful information.

AI changes the cost of producing both.

That means we can afford to optimize more heavily for the second.

The human can get abstractions, navigation, folding, generated views, and good tooling.

The compiler gets a rich semantic model.

The AI gets structured context.

And the source remains a precise description of what the programmer actually intended.

## The new optimization target

For decades, one of the goals of language design has been:

**Make it easier for humans to express ideas in code.**

I don't think we should abandon that.

But there is another goal worth adding:

**Make it easier for machines to understand what humans mean.**

Those are not necessarily the same thing.

A very concise language can hide important information.

A slightly more explicit language can expose it.

And in an AI-assisted development environment, that difference matters.

The best programming language for the AI era may not be the one that lets us write the fewest characters.

It may be the one that gives the compiler the clearest possible understanding of what those characters mean.

Then the compiler can give that understanding back to the AI.

> If AI makes code cheap, we should make meaning expensive to lose.

Maybe the next generation of programming languages should not primarily optimize for writing less code.

Maybe they should optimize for **making intent explicit, making invariants enforceable, and making the compiler's understanding available to both humans and machines.**
