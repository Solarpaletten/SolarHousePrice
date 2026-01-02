# Solar Real Estate Platform

Location-first real estate platform for Germany.

## Project Structure

```
/apps
  /map-core         → Main map application (Next.js)
  /listing-portal   → Light listing submission site
/packages
  /db               → Database schemas and queries
  /geo              → Geospatial utilities
  /pricing          → Price estimation logic
  /ui               → Shared UI components
/docs
  ARCHITECTURE.md   → System architecture
  DATA_MODEL.md     → Database schema
  MVP_SCOPE.md      → MVP boundaries
  SETUP_GUIDE.md    → Local setup instructions
```

## Tech Stack

- Next.js 14 (App Router)
- Mapbox GL JS
- PostgreSQL + PostGIS
- OpenStreetMap data

## Status

🟡 Phase 0 — Documentation & Architecture Lock

git commit -m "fix: add packageManager for Vercel"
