---
title: The database is often your real API
dek: We spend a lot of time designing HTTP APIs while quietly letting the database become the place where the real rules live.
category: ENGINEERING NOTES
date: 2026-08-18
tags: [DATABASES, ARCHITECTURE, ENGINEERING]
featured: false
---

A strange thing happens in many applications.

We carefully design the API.

We discuss resource names, request formats, status codes, pagination, and versioning.

Then the application reaches the database and the rules become much less explicit.

A table has a few nullable columns.

Some relationships are enforced by foreign keys.

Some are enforced by application code.

Some exist only because everyone on the team knows they should.

And eventually the database becomes the place where the application's real model is hiding.

## The schema tells a story

Consider an order.

At the API level we might say:

```json
{
  "status": "paid"
}
```

That looks simple.

But what does `paid` actually mean?

Can a paid order have no payment record?

Can it be cancelled?

Can it become pending again?

Can a refunded order be paid?

Can two payments belong to the same order?

The API response does not tell us much about these rules.

The database can.

```sql
CREATE TABLE payments (
  id          uuid PRIMARY KEY,
  order_id    uuid NOT NULL REFERENCES orders(id),
  amount      numeric NOT NULL,
  created_at  timestamptz NOT NULL
);
```

A foreign key already tells us something important.

A payment belongs to an order that exists.

A `NOT NULL` tells us something else.

An amount is required.

These constraints are not just implementation details.

They are part of the model.

## Application checks are not enough

It is tempting to write:

```ts
if (!order) {
  throw new Error("Order not found");
}

await db.payment.create({
  data: {
    orderId: order.id,
    amount,
  },
});
```

That may be perfectly reasonable.

But there is a difference between checking something in application code and making it impossible at the data layer.

The application check protects one code path.

A database constraint protects the data regardless of which code path produced it.

That matters when you have background jobs, migrations, scripts, admin tools, multiple services, or simply a future developer who did not know about the old assumption.

> The closer a rule is to the data it protects, the harder it is for the rule to disappear accidentally.

## This doesn't mean putting everything in SQL

There is an opposite mistake too.

Not every business rule belongs in the database.

Some rules are easier to understand and evolve in application code.

The useful question is not:

**"Should this logic be in the database?"**

It is:

**"What must always be true about this data?"**

If something must always be true, a database constraint is worth considering.

If it is a workflow decision that changes frequently, application code may be the better home.

## Schema design is product design

This is why database design deserves more attention than it sometimes gets.

A schema is not just storage.

It defines what the system can represent, what it cannot represent, and which mistakes the system refuses to accept.

The HTTP API is what clients see.

The database is often where the product's most important invariants actually live.

Designing one carefully while treating the other as an implementation detail is usually a mistake.
