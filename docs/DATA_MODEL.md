# Data Model

## Database

PostgreSQL 15+ with PostGIS extension.

## Tables

### houses

Primary table storing building information from OSM.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| osm_id | BIGINT | Original OSM ID |
| geometry | GEOMETRY(POLYGON, 4326) | Building footprint |
| centroid | GEOMETRY(POINT, 4326) | Calculated center point |
| address_street | VARCHAR(255) | Street name |
| address_number | VARCHAR(50) | House number |
| address_city | VARCHAR(100) | City name |
| address_postcode | VARCHAR(20) | Postal code |
| building_type | VARCHAR(50) | residential, commercial, etc. |
| building_levels | SMALLINT | Number of floors |
| area_sqm | DECIMAL(10,2) | Calculated footprint area |
| created_at | TIMESTAMPTZ | Record creation time |
| updated_at | TIMESTAMPTZ | Last update time |

Indexes:
- `idx_houses_geometry` — GIST index on geometry
- `idx_houses_centroid` — GIST index on centroid
- `idx_houses_city` — B-tree on address_city

### price_estimates

Calculated price estimates per building.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| house_id | UUID | FK → houses.id |
| rent_min | DECIMAL(10,2) | Minimum rent estimate (EUR/month) |
| rent_max | DECIMAL(10,2) | Maximum rent estimate (EUR/month) |
| sale_min | DECIMAL(12,2) | Minimum sale price (EUR) |
| sale_max | DECIMAL(12,2) | Maximum sale price (EUR) |
| confidence | DECIMAL(3,2) | Estimate confidence 0.00-1.00 |
| calculated_at | TIMESTAMPTZ | When estimate was generated |
| factors | JSONB | Calculation inputs for transparency |

Indexes:
- `idx_estimates_house` — B-tree on house_id
- `idx_estimates_calculated` — B-tree on calculated_at

Constraints:
- `fk_house` — FOREIGN KEY (house_id) REFERENCES houses(id)

### light_listings

User-submitted property listings (simple flow).

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| house_id | UUID | FK → houses.id (nullable) |
| listing_type | VARCHAR(20) | 'rent' or 'sale' |
| price | DECIMAL(12,2) | Asked price |
| contact_email | VARCHAR(255) | Contact email |
| contact_phone | VARCHAR(50) | Contact phone (optional) |
| description | TEXT | Free text description |
| is_active | BOOLEAN | Listing visibility |
| created_at | TIMESTAMPTZ | Submission time |
| expires_at | TIMESTAMPTZ | Auto-expiration date |

Indexes:
- `idx_listings_house` — B-tree on house_id
- `idx_listings_active` — B-tree on is_active
- `idx_listings_type` — B-tree on listing_type

Constraints:
- `fk_house` — FOREIGN KEY (house_id) REFERENCES houses(id)

## Relationships

```
houses (1) ──────< (N) price_estimates
   │
   └──────────────< (N) light_listings
```

One house can have:
- Multiple price estimates (historical)
- Multiple listings (different owners/times)

## PostGIS Functions Used

- `ST_Contains(geometry, point)` — check point in polygon
- `ST_Intersects(geometry, box)` — find buildings in viewport
- `ST_Area(geometry::geography)` — calculate real area in sqm
- `ST_Centroid(geometry)` — find polygon center
- `ST_AsGeoJSON(geometry)` — export for Mapbox

## Data Sources

### OSM Import

Buildings imported from OpenStreetMap via:
- Overpass API (initial load)
- OSM PBF files (bulk import)

Tags mapped:
- `building=*` → building_type
- `building:levels=*` → building_levels
- `addr:street`, `addr:housenumber`, etc. → address fields

### Price Data (Future)

- Public statistics (Mietspiegel)
- Aggregated listing data
- Manual calibration
