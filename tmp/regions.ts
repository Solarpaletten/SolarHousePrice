// ============================================================
// REGION CONFIGURATION - FLORIDA ONLY
// SolarHousePrice USA Edition
// ============================================================

export type Currency = 'EUR' | 'USD';
export type AreaUnit = 'sqm' | 'sqft';
export type PriceUnit = 'eur_per_sqm' | 'usd_per_sqft';

export interface RegionConfig {
  id: string;
  label: string;
  country: string;
  state?: string;
  city: string;
  flag: string;
  
  // Map settings
  center: [number, number];  // [lng, lat]
  bbox: [number, number, number, number];  // [minLng, minLat, maxLng, maxLat]
  zoomDefault: number;
  zoomMin: number;
  zoomMax: number;
  
  // Pricing
  currency: Currency;
  areaUnit: AreaUnit;
  priceUnit: PriceUnit;
  locale: string;
  
  // Data sources
  dataSources: string[];
}

// ============================================================
// FLORIDA REGIONS ONLY
// ============================================================

export const REGIONS: Record<string, RegionConfig> = {
  'us-fl-sarasota': {
    id: 'us-fl-sarasota',
    label: 'Sarasota',
    country: 'US',
    state: 'FL',
    city: 'Sarasota',
    flag: '🇺🇸',
    
    // Downtown Sarasota + Siesta Key area
    center: [-82.5307, 27.3364],
    bbox: [-82.60, 27.25, -82.45, 27.40],
    zoomDefault: 14,
    zoomMin: 11,
    zoomMax: 18,
    
    currency: 'USD',
    areaUnit: 'sqft',
    priceUnit: 'usd_per_sqft',
    locale: 'en-US',
    
    dataSources: ['OSM'],
  },
  
  'us-fl-tampa': {
    id: 'us-fl-tampa',
    label: 'Tampa',
    country: 'US',
    state: 'FL',
    city: 'Tampa',
    flag: '🇺🇸',
    
    // Downtown Tampa + Hyde Park
    center: [-82.4572, 27.9506],
    bbox: [-82.55, 27.90, -82.40, 28.05],
    zoomDefault: 14,
    zoomMin: 11,
    zoomMax: 18,
    
    currency: 'USD',
    areaUnit: 'sqft',
    priceUnit: 'usd_per_sqft',
    locale: 'en-US',
    
    dataSources: ['OSM'],
  },
};

// ============================================================
// SARASOTA IS DEFAULT
// ============================================================

export const DEFAULT_REGION = 'us-fl-sarasota';

export function getRegion(id: string): RegionConfig {
  return REGIONS[id] || REGIONS[DEFAULT_REGION];
}

export function getRegionList(): RegionConfig[] {
  return Object.values(REGIONS);
}

export function getRegionsByCountry(country: string): RegionConfig[] {
  return Object.values(REGIONS).filter(r => r.country === country);
}

export function isUSRegion(regionId: string): boolean {
  // All regions are US in this version
  return true;
}

export function getOSMQuery(regionId: string, limit: number = 500): string {
  const region = getRegion(regionId);
  const [minLng, minLat, maxLng, maxLat] = region.bbox;
  
  return `
    [out:json][timeout:60];
    (
      way["building"](${minLat},${minLng},${maxLat},${maxLng});
    );
    out body ${limit};
    >;
    out skel qt;
  `.trim();
}
