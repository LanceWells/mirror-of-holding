---
name: Vercel Postgres + Prisma Next.js Starter
slug: postgres-prisma
description: Simple Next.js template that uses Vercel Postgres as the database and Prisma as the ORM.
framework: Next.js
useCase: Starter
css: Tailwind
database: Vercel Postgres
relatedTemplates:
  - postgres-starter
  - postgres-kysely
  - postgres-sveltekit
---

# Vercel Postgres + Prisma Next.js Starter

Simple Next.js template that uses [Vercel Postgres](https://vercel.com/postgres) as the database and [Prisma](https://prisma.io/) as the ORM.

## Demo

https://postgres-prisma.vercel.app/

## How to Use

You can choose from one of the following two methods to use this repository:

### One-Click Deploy

Execute [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with [pnpm](https://pnpm.io/installation) to bootstrap the example:

```bash
pnpm create next-app --example https://github.com/vercel/examples/tree/main/storage/postgres-prisma
```

Once that's done, copy the .env.example file in this directory to .env.local (which will be ignored by Git):

```bash
cp .env.example .env.local
```

Then open `.env.local` and set the environment variables to match the ones in your Vercel Storage Dashboard.

Next, run Next.js in development mode:

```bash
pnpm dev
```

Deploy it to the cloud with [Vercel](https://vercel.com/new?utm_source=github&utm_medium=readme&utm_campaign=vercel-examples) ([Documentation](https://nextjs.org/docs/deployment)).


### Bootstrap

```
npx vercel link
npx vercel env pull
```
