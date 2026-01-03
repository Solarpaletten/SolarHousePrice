// ============================================================
// REGION CONFIGURATION - SWITZERLAND ONLY
// SolarHousePrice CH Edition
// ============================================================
// ============================================================
// SWITZERLAND REGIONS
// ============================================================
export const REGIONS = {
    'ch-monthey': {
        id: 'ch-monthey',
        label: 'Monthey',
        country: 'CH',
        canton: 'Valais',
        city: 'Monthey',
        flag: '🇨🇭',
        // Monthey center
        center: [6.954, 46.255],
        bbox: [6.90, 46.22, 7.00, 46.29],
        zoomDefault: 14,
        zoomMin: 12,
        zoomMax: 18,
        currency: 'CHF',
        areaUnit: 'sqm',
        priceUnit: 'chf_per_sqm',
        locale: 'de-CH',
        dataSources: ['OSM'],
    },
    'ch-martigny': {
        id: 'ch-martigny',
        label: 'Martigny',
        country: 'CH',
        canton: 'Valais',
        city: 'Martigny',
        flag: '🇨🇭',
        // Martigny center
        center: [7.072, 46.102],
        bbox: [7.04, 46.08, 7.10, 46.12],
        zoomDefault: 14,
        zoomMin: 12,
        zoomMax: 18,
        currency: 'CHF',
        areaUnit: 'sqm',
        priceUnit: 'chf_per_sqm',
        locale: 'de-CH',
        dataSources: ['OSM'],
    },
    'ch-sion': {
        id: 'ch-sion',
        label: 'Sion',
        country: 'CH',
        canton: 'Valais',
        city: 'Sion',
        flag: '🇨🇭',
        // Sion center (capital of Valais)
        center: [7.360, 46.233],
        bbox: [7.32, 46.21, 7.40, 46.26],
        zoomDefault: 14,
        zoomMin: 12,
        zoomMax: 18,
        currency: 'CHF',
        areaUnit: 'sqm',
        priceUnit: 'chf_per_sqm',
        locale: 'de-CH',
        dataSources: ['OSM'],
    },
};
// ============================================================
// MONTHEY IS DEFAULT
// ============================================================
export const DEFAULT_REGION = 'ch-monthey';
export function getRegion(id) {
    return REGIONS[id] || REGIONS[DEFAULT_REGION];
}
export function getRegionList() {
    return Object.values(REGIONS);
}
export function getRegionsByCountry(country) {
    return Object.values(REGIONS).filter(r => r.country === country);
}
export function isCHRegion(regionId) {
    const region = getRegion(regionId);
    return region.country === 'CH';
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
