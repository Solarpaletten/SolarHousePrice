# Listing Portal

Lightweight property listing submission site.

## Purpose

Allow anyone to list a property for rent or sale in under 60 seconds, without registration or payment.

## Tech Stack

- Next.js 14 (App Router)
- React 18
- TypeScript
- CSS Modules
- Prisma (via @solar/db)

## Features

- ✅ 3-step form (Address → Type → Details)
- ✅ No registration required
- ✅ Instant publish
- ✅ Listings visible on map-core

## UX Flow

1. **Step 1 — Address**: Enter property location
2. **Step 2 — Type**: Choose Rent or Sale
3. **Step 3 — Details**: Price, email, phone, description
4. **Success**: Confirmation + link to map

## Structure

```
/listing-portal
├── app/
│   ├── api/
│   │   └── listing/route.ts    # POST /api/listing
│   ├── layout.tsx
│   └── page.tsx                # Main form page
├── components/
│   ├── ListingForm.tsx         # Form component
│   ├── ListingForm.module.css  # Styles
│   ├── types.ts                # TypeScript types
│   └── index.ts                # Exports
├── .env.example
├── next.config.mjs
├── tsconfig.json
└── package.json
```

## API

### POST /api/listing

Create a new listing.

**Request:**
```json
{
  "house_id": "uuid | null",
  "listing_type": "rent | sale",
  "price": 1200,
  "contact_email": "user@mail.com",
  "contact_phone": "+49...",
  "description": "optional"
}
```

**Response:**
```json
{ "status": "ok" }
```

**Validation:**
- `contact_email` — required, valid format
- `price` — required, > 0
- `listing_type` — must be "rent" or "sale"

## Environment Variables

```bash
DATABASE_URL=postgresql://localhost:5432/solar_dev
```

## Running Locally

```bash
# From monorepo root
pnpm install
pnpm --filter @solar/listing-portal dev

# Open http://localhost:3001
```

## Status

✅ Phase 3A Complete — Listing Portal MVP
