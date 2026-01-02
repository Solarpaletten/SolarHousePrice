# Architecture

## Overview

Solar is a location-first real estate platform built as a monorepo with two main applications sharing common packages.

```
┌─────────────────────────────────────────────────────────┐
│                      CLIENTS                            │
│         Browser (Desktop / Mobile)                      │
└─────────────────┬───────────────────┬───────────────────┘
                  │                   │
                  ▼                   ▼
┌─────────────────────────┐ ┌─────────────────────────────┐
│       MAP-CORE          │ │      LISTING-PORTAL         │
│                         │ │                             │
│  • Interactive map      │ │  • Simple listing form      │
│  • Property search      │ │  • No auth required         │
│  • Price display        │ │  • Quick submission         │
│                         │ │                             │
│  Next.js + Mapbox       │ │  Next.js                    │
└───────────┬─────────────┘ └──────────────┬──────────────┘
            │                              │
            │         SHARED PACKAGES      │
            │    ┌─────────────────────┐   │
            ├───►│        /ui          │◄──┤
            │    └─────────────────────┘   │
            │    ┌─────────────────────┐   │
            ├───►│        /db          │◄──┤
            │    └─────────────────────┘   │
            │    ┌─────────────────────┐   │
            ├───►│       /geo          │   │
            │    └─────────────────────┘   │
            │    ┌─────────────────────┐   │
            └───►│      /pricing       │   │
                 └─────────────────────┘   │
                           │               │
                           ▼               │
            ┌─────────────────────────────────────────────┐
            │            PostgreSQL + PostGIS             │
            │                                             │
            │  houses | price_estimates | light_listings  │
            └─────────────────────────────────────────────┘
                           │
                           ▼
            ┌─────────────────────────────────────────────┐
            │           External Data Sources             │
            │                                             │
            │              OpenStreetMap                  │
            └─────────────────────────────────────────────┘
```

## Why Next.js 14

- App Router for modern React patterns
- Server Components for data fetching
- Route Handlers for API endpoints
- Built-in optimization (images, fonts)
- Excellent TypeScript support

## Why Mapbox GL JS

- High-performance WebGL rendering
- Native support for GeoJSON polygons
- Smooth interactions (zoom, pan, click)
- Customizable styling
- Good documentation

## Why Monorepo

- Shared code between apps (UI, DB, types)
- Single source of truth for schemas
- Easier refactoring across boundaries
- Unified tooling and CI/CD
- Clear dependency graph

## Component Boundaries

### map-core

Owner of: map rendering, search, property display

Does NOT: handle listing creation, payment, auth

### listing-portal

Owner of: listing form, submission flow

Does NOT: show map, display other listings, require login

### /packages/db

Owner of: all database interactions, schema migrations

Used by: both apps via Prisma Client

Tech: Prisma ORM (schema-first), PostgreSQL + PostGIS

### /packages/geo

Owner of: coordinate math, OSM parsing, PostGIS helpers

Used by: map-core (primary), db (queries)

### /packages/pricing

Owner of: price calculation algorithms

Used by: map-core (display), listing-portal (suggestions)

### /packages/ui

Owner of: buttons, inputs, cards, layouts

Used by: both apps

## API Strategy

All API routes implemented as Next.js Route Handlers:

```
/apps/map-core/app/api/
  /houses/route.ts       → GET houses in bounds
  /house/[id]/route.ts   → GET single house
  /estimate/route.ts     → GET price estimate

/apps/listing-portal/app/api/
  /submit/route.ts       → POST new listing
```

No separate backend service in MVP.

## Data Flow

1. User opens map-core
2. Map requests houses in viewport bounds
3. Route Handler queries PostGIS
4. GeoJSON returned to Mapbox
5. User clicks building → price estimate displayed

## Security Considerations (MVP)

- No authentication required
- Rate limiting on API routes
- Input validation on listing submission
- No sensitive data stored
