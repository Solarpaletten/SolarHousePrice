"use strict";
// ============================================================
// @solar/pricing - ML Feature Extraction
// Phase 5: Stage B - Feature Engineering
// ============================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractFeatures = extractFeatures;
exports.normalizeFeatures = normalizeFeatures;
exports.getFeatureNames = getFeatureNames;
const coefficients_js_1 = require("../coefficients.js");
/**
 * Extract ML features from house data and aggregated estimate
 *
 * @param house - House data
 * @param aggregated - Aggregated estimate from Stage A
 * @returns ML features object
 */
function extractFeatures(house, aggregated) {
    const buildingType = house.buildingType.toLowerCase();
    const [lng, lat] = house.centroid;
    // One-hot encode building type
    const typeFeatures = {
        type_residential: buildingType === 'residential' ? 1 : 0,
        type_apartments: buildingType === 'apartments' ? 1 : 0,
        type_commercial: buildingType === 'commercial' ? 1 : 0,
        type_office: buildingType === 'office' ? 1 : 0,
        type_industrial: buildingType === 'industrial' ? 1 : 0,
    };
    // Calculate distances
    const distanceToCenter = calculateDistanceToCenter(house.centroid);
    const distanceToWater = estimateDistanceToWater(house.centroid);
    const distanceToPark = estimateDistanceToPark(house.centroid);
    return {
        // Basic features
        area_sqm: house.areaSqm ?? 100, // default if unknown
        building_levels: house.buildingLevels ?? 4, // default
        // One-hot encoded type
        ...typeFeatures,
        // Geolocation
        centroid_lat: lat,
        centroid_lng: lng,
        distance_to_center_km: distanceToCenter,
        distance_to_water_m: distanceToWater,
        distance_to_park_m: distanceToPark,
        // Aggregated data (from Stage A)
        aggregated_price_sqm: aggregated.priceSqm,
        nearby_listings_count: aggregated.details.nearbyListings,
        listings_median_sqm: aggregated.details.listingsMedian ?? 0,
        listings_std_sqm: 0, // TODO: calculate std in aggregator
    };
}
/**
 * Calculate distance to district center (Alexanderplatz)
 *
 * @param centroid - [lng, lat]
 * @returns Distance in km
 */
function calculateDistanceToCenter(centroid) {
    const [lng, lat] = centroid;
    const [centerLng, centerLat] = coefficients_js_1.BERLIN_ALEX_COEFFICIENTS.proximity.centerPoint;
    // Approximate conversion at Berlin latitude
    // 1° lng ≈ 85 km, 1° lat ≈ 111 km
    const dLng = (lng - centerLng) * 85;
    const dLat = (lat - centerLat) * 111;
    return Math.sqrt(dLng * dLng + dLat * dLat);
}
/**
 * Estimate distance to nearest water body
 * TODO: Replace with actual GIS query when water layer available
 *
 * @param centroid - [lng, lat]
 * @returns Estimated distance in meters
 */
function estimateDistanceToWater(centroid) {
    const [lng, lat] = centroid;
    // Spree River approximate coordinates near Alexanderplatz
    const spreePoints = [
        [13.4030, 52.5130], // Museum Island
        [13.4180, 52.5140], // Near Rotes Rathaus
        [13.4350, 52.5080], // East
    ];
    // Find minimum distance to Spree
    let minDistance = Infinity;
    for (const [riverLng, riverLat] of spreePoints) {
        const dLng = (lng - riverLng) * 85000; // meters
        const dLat = (lat - riverLat) * 111000; // meters
        const distance = Math.sqrt(dLng * dLng + dLat * dLat);
        minDistance = Math.min(minDistance, distance);
    }
    return Math.round(minDistance);
}
/**
 * Estimate distance to nearest park
 * TODO: Replace with actual GIS query when park layer available
 *
 * @param centroid - [lng, lat]
 * @returns Estimated distance in meters
 */
function estimateDistanceToPark(centroid) {
    const [lng, lat] = centroid;
    // Parks near Alexanderplatz
    const parkPoints = [
        [13.4170, 52.5250], // Volkspark Friedrichshain
        [13.3980, 52.5200], // James-Simon-Park
        [13.4050, 52.5080], // Köllnischer Park
    ];
    let minDistance = Infinity;
    for (const [parkLng, parkLat] of parkPoints) {
        const dLng = (lng - parkLng) * 85000;
        const dLat = (lat - parkLat) * 111000;
        const distance = Math.sqrt(dLng * dLng + dLat * dLat);
        minDistance = Math.min(minDistance, distance);
    }
    return Math.round(minDistance);
}
/**
 * Normalize features for ML model
 * Applies z-score normalization based on training statistics
 *
 * @param features - Raw features
 * @returns Normalized features
 */
function normalizeFeatures(features) {
    // Training statistics (would come from training phase)
    const stats = {
        area_sqm: { mean: 100, std: 50 },
        building_levels: { mean: 5, std: 2 },
        distance_to_center_km: { mean: 1.5, std: 1.0 },
        aggregated_price_sqm: { mean: 6500, std: 1500 },
    };
    return {
        ...features,
        area_sqm: (features.area_sqm - stats.area_sqm.mean) / stats.area_sqm.std,
        building_levels: (features.building_levels - stats.building_levels.mean) /
            stats.building_levels.std,
        distance_to_center_km: (features.distance_to_center_km - stats.distance_to_center_km.mean) /
            stats.distance_to_center_km.std,
        aggregated_price_sqm: (features.aggregated_price_sqm - stats.aggregated_price_sqm.mean) /
            stats.aggregated_price_sqm.std,
    };
}
/**
 * Get feature names in order expected by model
 */
function getFeatureNames() {
    return [
        'area_sqm',
        'building_levels',
        'type_residential',
        'type_apartments',
        'type_commercial',
        'type_office',
        'type_industrial',
        'centroid_lat',
        'centroid_lng',
        'distance_to_center_km',
        'aggregated_price_sqm',
        'nearby_listings_count',
    ];
}
//# sourceMappingURL=features.js.map