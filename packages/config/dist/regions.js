// ============================================================
// REGION CONFIGURATION - FLORIDA ONLY
// SolarHousePrice USA Edition
// ============================================================
// ============================================================
// FLORIDA REGIONS ONLY
// ============================================================
export const REGIONS = {
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
export function getRegion(id) {
    return REGIONS[id] || REGIONS[DEFAULT_REGION];
}
export function getRegionList() {
    return Object.values(REGIONS);
}
export function getRegionsByCountry(country) {
    return Object.values(REGIONS).filter(r => r.country === country);
}
export function isUSRegion(regionId) {
    // All regions are US in this version
    return true;
}
export function getOSMQuery(regionId, limit = 500) {
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
