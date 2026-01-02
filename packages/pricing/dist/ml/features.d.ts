import type { MLFeatures, AggregatorOutput } from '../types.js';
/**
 * House data for feature extraction
 */
export interface HouseData {
    areaSqm: number | null;
    buildingType: string;
    buildingLevels: number | null;
    centroid: [number, number];
}
/**
 * Extract ML features from house data and aggregated estimate
 *
 * @param house - House data
 * @param aggregated - Aggregated estimate from Stage A
 * @returns ML features object
 */
export declare function extractFeatures(house: HouseData, aggregated: AggregatorOutput): MLFeatures;
/**
 * Normalize features for ML model
 * Applies z-score normalization based on training statistics
 *
 * @param features - Raw features
 * @returns Normalized features
 */
export declare function normalizeFeatures(features: MLFeatures): MLFeatures;
/**
 * Get feature names in order expected by model
 */
export declare function getFeatureNames(): string[];
//# sourceMappingURL=features.d.ts.map