// ============================================================
// OSM DATA TYPES FOR IMPORT
// ============================================================

export interface GeoJSONPoint {
  type: 'Point';
  coordinates: [number, number];
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

export interface OSMFeature {
  type: 'Feature';
  id: string;
  properties: OSMBuildingTags & {
    '@id'?: string;
    id?: number | string;
  };
  geometry: GeoJSONGeometry;
}

export interface OverpassGeoJSONResponse {
  type: 'FeatureCollection';
  features: OSMFeature[];
}

export type BBox = [number, number, number, number];

export interface OSMImportOptions {
  bbox: BBox;
  limit?: number;
  skipExisting?: boolean;
  verbose?: boolean;
}

export interface OSMImportResult {
  total: number;
  imported: number;
  skipped: number;
  errors: number;
  duration: number;
}

export interface ParsedHouse {
  osmId: bigint;
  geometry: string;
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
  // ==================== GERMANY ====================
  'berlin-mitte': [13.38, 52.51, 13.43, 52.53],
  'berlin-alex': [13.40, 52.515, 13.425, 52.525],
  'hamburg-hafencity': [9.98, 53.535, 10.02, 53.55],
  'munich-center': [11.56, 48.13, 11.59, 48.145],
  
  // ==================== FLORIDA ====================
  // Sarasota - Downtown + waterfront
  'sarasota': [-82.56, 27.30, -82.50, 27.36],
  'sarasota-downtown': [-82.545, 27.325, -82.525, 27.345],
  'sarasota-full': [-82.60, 27.25, -82.45, 27.40],
  
  // Tampa - Downtown + Hyde Park
  'tampa': [-82.48, 27.93, -82.44, 27.97],
  'tampa-downtown': [-82.465, 27.945, -82.450, 27.955],
  'tampa-full': [-82.55, 27.90, -82.40, 28.05],
};
