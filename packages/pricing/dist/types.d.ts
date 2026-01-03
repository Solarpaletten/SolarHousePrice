/**
 * District coefficients for price calculation
 */
export interface DistrictCoefficients {
    district: string;
    basePriceSqm: number;
    buildingType: {
        residential: number;
        apartments: number;
        commercial: number;
        office: number;
        industrial: number;
        default: number;
    };
    levels: {
        base: number;
        perExtraLevel: number;
        maxBonus: number;
    };
    proximity: {
        centerPoint: [number, number];
        perKmFromCenter: number;
        waterBonus: number;
        parkBonus: number;
    };
}
/**
 * Input for price aggregator
 */
export interface AggregatorInput {
    houseId: string;
    areaSqm: number | null;
    buildingType: string;
    buildingLevels: number | null;
    centroid: [number, number];
}
/**
 * Factor applied during calculation
 */
export interface AppliedFactor {
    name: string;
    value: number;
    applied: number;
}
/**
 * Output from price aggregator
 */
export interface AggregatorOutput {
    priceSqm: number;
    priceTotal: number | null;
    method: 'aggregated' | 'fallback';
    confidence: number;
    details: {
        basePriceSqm: number;
        factors: AppliedFactor[];
        nearbyListings: number;
        listingsMedian: number | null;
    };
}
/**
 * Input for PriceEngine
 */
export interface EstimateInput {
    houseId: string;
    areaSqm: number | null;
    buildingType: string;
    buildingLevels: number | null;
    centroid: [number, number];
}
/**
 * Output from PriceEngine
 */
export interface EstimateOutput {
    priceSqm: number;
    priceTotal: number | null;
    method: 'aggregated' | 'ml' | 'fallback';
    confidence: number;
    details: Record<string, unknown>;
}
/**
 * ML Features for prediction
 */
export interface MLFeatures {
    area_sqm: number;
    building_levels: number;
    type_residential: number;
    type_apartments: number;
    type_commercial: number;
    type_office: number;
    type_industrial: number;
    centroid_lat: number;
    centroid_lng: number;
    distance_to_center_km: number;
    distance_to_water_m: number;
    distance_to_park_m: number;
    aggregated_price_sqm: number;
    nearby_listings_count: number;
    listings_median_sqm: number;
    listings_std_sqm: number;
}
/**
 * Cached price estimate from database
 */
export interface CachedEstimate {
    id: string;
    houseId: string;
    priceSqm: number;
    priceTotal: number | null;
    method: string;
    confidence: number;
    details: Record<string, unknown>;
    calculatedAt: Date;
    expiresAt: Date;
}
/**
 * Price Engine configuration options
 */
export interface PriceEngineOptions {
    useML: boolean;
    cacheEnabled: boolean;
    cacheTTLHours: number;
    searchRadiusM: number;
}
/**
 * Building types supported by the system
 */
export type BuildingType = 'residential' | 'apartments' | 'commercial' | 'office' | 'industrial';
/**
 * Price estimation method
 */
export type EstimationMethod = 'aggregated' | 'ml' | 'fallback';
//# sourceMappingURL=types.d.ts.map