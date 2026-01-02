// ============================================================
// OSM DATA TYPES FOR IMPORT
// ============================================================

/**
 * GeoJSON Geometry types
 */
export interface GeoJSONPoint {
  type: 'Point';
  coordinates: [number, number]; // [lng, lat]
}

export interface GeoJSONPolygon {
  type: 'Polygon';
  coordinates: number[][][];
}

export interface GeoJSONMultiPolygon {
  type: 'MultiPolygon';
  coordinates: number[][][][];
}

export type GeoJSONGeometry = GeoJSONPoint | GeoJSONPolygon | GeoJSONMultiPolygon;

/**
 * OSM Building tags
 */
export interface OSMBuildingTags {
  building?: string;
  'building:levels'?: string;
  'addr:street'?: string;
  'addr:housenumber'?: string;
  'addr:city'?: string;
  'addr:postcode'?: string;
  name?: string;
  [key: string]: string | undefined;
}

/**
 * OSM Feature from Overpass API
 */
export interface OSMFeature {
  type: 'Feature';
  id: string;
  properties: OSMBuildingTags & {
    '@id'?: string;
    id?: number | string;
  };
  geometry: GeoJSONGeometry;
}

/**
 * Overpass API GeoJSON response
 */
export interface OverpassGeoJSONResponse {
  type: 'FeatureCollection';
  features: OSMFeature[];
}

/**
 * Bounding box [minLng, minLat, maxLng, maxLat]
 */
export type BBox = [number, number, number, number];

/**
 * Import options
 */
export interface OSMImportOptions {
  bbox: BBox;
  limit?: number;
  skipExisting?: boolean;
  verbose?: boolean;
}

/**
 * Import result
 */
export interface OSMImportResult {
  total: number;
  imported: number;
  skipped: number;
  errors: number;
  duration: number;
}

/**
 * Parsed house data ready for DB insert
 */
export interface ParsedHouse {
  osmId: bigint;
  geometry: string; // WKT format
  buildingType: string | null;
  buildingLevels: number | null;
  addressStreet: string | null;
  addressNumber: string | null;
  addressCity: string | null;
  addressPostcode: string | null;
}

/**
 * Predefined city bounding boxes
 */
export const CITY_BBOX: Record<string, BBox> = {
  // Berlin Mitte (small area for MVP)
  'berlin-mitte': [13.38, 52.51, 13.43, 52.53],
  
  // Berlin Alexanderplatz area
  'berlin-alex': [13.40, 52.515, 13.425, 52.525],
  
  // Hamburg HafenCity
  'hamburg-hafencity': [9.98, 53.535, 10.02, 53.55],
  
  // Munich center
  'munich-center': [11.56, 48.13, 11.59, 48.145],
};
