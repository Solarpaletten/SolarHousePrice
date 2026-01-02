# Changelog

All notable changes to SolarHousePrice.

## [0.1.0] - 2026-01-02

### 🎉 Initial Release

First public release with core functionality.

### Added

#### Phase 0: Architecture
- Monorepo structure with pnpm workspaces
- TypeScript configuration
- Documentation framework

#### Phase 1: Database Foundation
- PostgreSQL + PostGIS setup
- Prisma ORM integration
- Houses and Listings schema
- Spatial indexes for geo queries

#### Phase 2: Map Integration
- Mapbox GL JS integration
- Building polygon rendering
- Click-to-select interaction
- Bounding box data loading

#### Phase 3A: Listing Portal
- 3-step property submission form
- Address, Details, Contact steps
- Zod validation
- API endpoint for listings

#### Phase 3B: OSM Import
- Overpass API integration
- Building footprint extraction
- CLI tool (`pnpm osm:import`)
- 500+ buildings imported for Berlin

#### Phase 4A: Premium 3D Satellite
- Satellite map style (Mercedes Me look)
- 3D building extrusion
- Color coding by building type
- Smooth camera transitions
- Hover/click highlighting

### Technical Details

- **Frontend**: Next.js 14 with App Router
- **Database**: PostgreSQL 16 + PostGIS 3.4
- **ORM**: Prisma 5
- **Maps**: Mapbox GL JS 3.0
- **Package Manager**: pnpm 8
- **Deployment**: Vercel + Digital Ocean

### Known Limitations

- Demo price estimates (not real market data)
- Limited to Berlin Alexanderplatz area
- No user authentication
- No multipolygon building support
- No API caching

---

## [Unreleased]

### Planned

- Phase 5: Enhanced price algorithm
- Phase 6: User authentication
- Phase 7: Payment integration
- Phase 8: Expanded coverage

---

## Version History

| Version | Date | Highlights |
|---------|------|------------|
| 0.1.0 | 2026-01-02 | Initial release with 3D satellite view |

---

*Maintained by Solar Team*
