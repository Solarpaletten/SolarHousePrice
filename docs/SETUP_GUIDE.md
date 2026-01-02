# Setup Guide

## Prerequisites

### Required Software

| Tool | Version | Purpose |
|------|---------|---------|
| Node.js | 20 LTS | Runtime |
| pnpm | 8+ | Package manager |
| PostgreSQL | 15+ | Database |
| PostGIS | 3.3+ | Spatial extension |

### Accounts Needed

| Service | Purpose | Required for |
|---------|---------|--------------|
| Mapbox | Map tiles & GL JS | map-core |

## Technology Stack

### Frontend

- **Next.js 14** — React framework with App Router
- **React 18** — UI library
- **TypeScript** — Type safety
- **Mapbox GL JS** — Map rendering

### Backend

- **Next.js Route Handlers** — API endpoints
- **PostgreSQL** — Primary database
- **PostGIS** — Geospatial queries

### Monorepo

- **pnpm workspaces** — Package management
- **Turborepo** — Build orchestration (optional)

## Project Structure

```
/solar-monorepo
│
├── /apps
│   ├── /map-core           # Main map application
│   │   ├── /app            # Next.js App Router
│   │   ├── /components     # React components
│   │   └── /lib            # Utilities
│   │
│   └── /listing-portal     # Listing submission site
│       ├── /app
│       ├── /components
│       └── /lib
│
├── /packages
│   ├── /db                 # Database layer
│   ├── /geo                # Geospatial utilities
│   ├── /pricing            # Price calculations
│   └── /ui                 # Shared components
│
├── /docs                   # Documentation
│
├── pnpm-workspace.yaml     # Workspace config
├── package.json            # Root package
└── README.md
```

## Local Setup Steps

### 1. Clone Repository

```bash
git clone <repository-url>
cd solar-monorepo
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Database Setup

```bash
# Create database
createdb solar_dev

# Enable PostGIS
psql solar_dev -c "CREATE EXTENSION postgis;"
```

### 4. Environment Variables

Create `.env.local` in each app:

**apps/map-core/.env.local**
```
DATABASE_URL=postgresql://localhost:5432/solar_dev
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token
```

**apps/listing-portal/.env.local**
```
DATABASE_URL=postgresql://localhost:5432/solar_dev
```

### 5. Run Development Servers

```bash
# From root - run all apps
pnpm dev

# Or run specific app
pnpm --filter map-core dev
pnpm --filter listing-portal dev
```

### 6. Access Applications

| App | URL |
|-----|-----|
| map-core | http://localhost:3000 |
| listing-portal | http://localhost:3001 |

## Database Migrations

```bash
# Generate Prisma Client
pnpm db:generate

# Run migrations (development)
pnpm db:migrate:dev

# Run migrations (production)
pnpm db:migrate:deploy

# Open Prisma Studio
pnpm db:studio
```

## Common Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start all apps in dev mode |
| `pnpm build` | Build all packages and apps |
| `pnpm lint` | Run linting |
| `pnpm test` | Run tests |
| `pnpm clean` | Remove build artifacts |

## Troubleshooting

### PostGIS not found

```bash
# macOS
brew install postgis

# Ubuntu
sudo apt install postgis postgresql-15-postgis-3
```

### Port already in use

```bash
# Find process
lsof -i :3000

# Kill process
kill -9 <PID>
```

### pnpm workspace issues

```bash
# Clear and reinstall
rm -rf node_modules
rm pnpm-lock.yaml
pnpm install
```

## Notes

- No deployment instructions in MVP phase
- Production setup documented separately
- CI/CD configuration pending
