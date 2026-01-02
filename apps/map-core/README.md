# Map Core

Main map application — the heart of the platform.

## Tech Stack

- Next.js 14 (App Router)
- React 18
- TypeScript
- Mapbox GL JS

## Features (Phase 2)

- ✅ Interactive map (Mapbox)
- ✅ Building polygons from API
- ✅ Hover highlighting
- ✅ Click → popup with details
- ✅ Price estimate display (mock)

## Structure

```
/map-core
├── app/
│   ├── api/
│   │   ├── houses/route.ts      # GET houses in bbox
│   │   └── house/[id]/route.ts  # GET house details
│   ├── layout.tsx
│   └── page.tsx                 # Main map page
├── components/
│   └── map/
│       ├── MapView.tsx          # Map container
│       ├── useMapbox.ts         # Map logic hook
│       ├── Popup.tsx            # Info popup
│       ├── layers.ts            # Layer definitions
│       └── types.ts             # TypeScript types
├── .env.example
├── next.config.mjs
├── tsconfig.json
└── package.json
```

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/houses?bbox=w,s,e,n` | GET | Houses in viewport (GeoJSON) |
| `/api/house/[id]` | GET | House details + price estimate |

## Environment Variables

```bash
# Required
NEXT_PUBLIC_MAPBOX_TOKEN=pk.xxx
DATABASE_URL=postgresql://localhost:5432/solar_dev
```

## Running Locally

```bash
# From monorepo root
pnpm install
pnpm --filter @solar/map-core dev

# Open http://localhost:3000
```

## Map Behavior

1. Map loads centered on Berlin (hardcoded for MVP)
2. Zoom in to level 14+ to see buildings
3. Buildings load automatically on pan/zoom
4. Hover → building highlights
5. Click → popup with address + price estimate

## Status

✅ Phase 2 Complete — Map Integration
