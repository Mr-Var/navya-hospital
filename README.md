# Navya Hospital Website

A multispecialty hospital website (Next.js + SQLite/Prisma) with a built-in admin
panel so non-technical staff can edit content — departments, doctors, health
packages, testimonials, FAQs, page text, and site-wide settings — without
touching code.

## Running it locally

```bash
npm install      # first time only
npm run dev
```

Open http://localhost:3000 for the public site.

## Editing content (admin panel)

Open http://localhost:3000/admin — you'll be redirected to a login page.

The admin password is set in `.env` as `ADMIN_PASSWORD` (currently
`navya-admin-2026` — change this before putting the site online).

From the admin dashboard you can manage:
- **Site Settings** — hospital name, hero text, phone numbers, address, stats
- **Departments** — name, description, wait time, bed availability
- **Doctors** — bio, department, availability
- **Health Packages**, **Testimonials**, **FAQs**
- **Pages** — free-text pages (About, Facilities, Insurance & Billing)
- **Inquiries** — appointment/callback/ambulance requests submitted from the site

Changes save instantly and appear on the live site right away — no deploy or
code change needed.

## Database

Content is stored in SQLite at `prisma/dev.db` (ignored by git). To reset or
reseed sample data:

```bash
npx prisma migrate reset   # wipes the db and reapplies migrations
npm run db:seed            # reloads starter content
```

## Before going live

- Change `ADMIN_PASSWORD` and `SESSION_SECRET` in `.env` to strong, private values.
- Pick a host (Vercel is a natural fit). SQLite's local file won't persist on
  most serverless hosts — swap the Prisma `datasource` to a hosted Postgres
  (e.g. Vercel Postgres/Neon) by changing `provider` and `DATABASE_URL` in
  `prisma/schema.prisma` and `.env`, then run `npx prisma migrate deploy`.
