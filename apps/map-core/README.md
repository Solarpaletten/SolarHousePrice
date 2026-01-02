# 🗺️ Map Core

Main application — interactive 3D map with real building data.

---

## Features

- 🛰️ Satellite view with 3D building extrusion
- 🏗️ 500+ real building footprints
- 💰 Price estimates on click
- 🖱️ Hover & click interactions
- 📱 Responsive design

---

## Quick Start

```bash
# From monorepo root
pnpm dev

# Or directly
cd apps/map-core
pnpm dev
```

Open http://localhost:3000

---

## Environment Variables

Create `.env` file:

```env
# Required
DATABASE_URL="postgresql://user:pass@host:port/database"
NEXT_PUBLIC_MAPBOX_TOKEN="pk.eyJ1..."

# Optional
PRISMA_LOG_QUERIES=true
```

### Getting Mapbox Token

1. Sign up at [mapbox.com](https://www.mapbox.com/)
2. Go to Account → Access Tokens
3. Create new token (default scopes)
4. Copy token starting with `pk.`

---

## Project Structure

```
apps/map-core/
├── app/
│   ├── page.tsx              # Main page
│   ├── layout.tsx            # Root layout
│   └── api/
│       ├── houses/
│       │   └── route.ts      # GET houses by bbox
│       └── house/
│           └── [id]/
│               └── route.ts  # GET single house
├── components/
│   └── map/
│       ├── MapView.tsx       # React map component
│       ├── useMapbox.ts      # Map logic hook
│       ├── layers.ts         # Mapbox layer config
│       ├── Popup.tsx         # Info popup
│       ├── types.ts          # TypeScript types
│       └── index.ts          # Exports
├── .env                      # Environment (gitignored)
├── .env.example              # Template
└── package.json
```

---

## API Routes

### GET /api/houses

Returns buildings within bounding box as GeoJSON.

**Query Parameters:**
- `bbox` — `west,south,east,north` (required)
- `limit` — max results (default: 1000)

**Example:**
```
GET /api/houses?bbox=13.40,52.515,13.42,52.525
```

**Response:**
```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": { "type": "Polygon", "coordinates": [...] },
      "properties": {
        "id": "uuid",
        "osmId": 12345,
        "address": { "street": "...", ... },
        "building": { "type": "residential", "levels": 4 }
      }
    }
  ]
}
```

### GET /api/house/[id]

Returns single house with price estimate.

**Example:**
```
GET /api/house/550e8400-e29b-41d4-a716-446655440000
```

**Response:**
```json
{
  "house": { ... },
  "estimate": {
    "rentMin": 800,
    "rentMax": 1200,
    "saleMin": 280000,
    "saleMax": 420000
  },
  "listings": []
}
```

---

## Map Configuration

### View Settings

| Setting | Value |
|---------|-------|
| Initial center | Berlin (13.405, 52.52) |
| Initial zoom | 15 |
| Min zoom for data | 14 |
| 3D threshold | 15 |

### Map Style

```typescript
style: 'mapbox://styles/mapbox/satellite-streets-v12'
```

### 3D Layer

Activates at zoom ≥ 15:
- Pitch: 55°
- Building height: `levels × 3m`
- Opacity: 0.35 (normal), 0.55 (hover)

---

## Dependencies

```json
{
  "dependencies": {
    "next": "14.2.0",
    "react": "18.2.0",
    "mapbox-gl": "^3.0.0",
    "@solar/db": "workspace:*",
    "@solar/geo": "workspace:*"
  }
}
```

---

## Development

```bash
# Start dev server
pnpm dev

# Build
pnpm build

# Type check
pnpm typecheck

# Lint
pnpm lint
```

---

## Deployment

### Vercel

1. Connect GitHub repo
2. Set root directory: `apps/map-core`
3. Framework: Next.js
4. Add environment variables
5. Deploy

### Environment on Vercel

| Variable | Required |
|----------|----------|
| `NEXT_PUBLIC_MAPBOX_TOKEN` | ✅ |
| `DATABASE_URL` | ✅ |

---

## Troubleshooting

### Map doesn't load
- Check `NEXT_PUBLIC_MAPBOX_TOKEN`
- Verify token in Mapbox dashboard
- Check browser console

### No buildings visible
- Zoom to level 14+
- Check API response in Network tab
- Verify database has data

### 3D not working
- Zoom to level 15+
- Check WebGL support
- Verify `houses3DLayer` is added

---

*Part of SolarHousePrice monorepo*
