import type { DistrictCoefficients, AggregatorInput, AggregatorOutput } from './types.js';
/**
 * Price Aggregator - Stage A
 *
 * Calculates price estimates using:
 * 1. Nearby listings median (if available)
 * 2. District base price (fallback)
 * 3. Building type coefficient
 * 4. Floor level coefficient
 * 5. Proximity coefficient
 */
export declare class PriceAggregator {
    private coefficients;
    private searchRadiusM;
    constructor(coefficients?: DistrictCoefficients, searchRadiusM?: number);
    /**
     * Main estimation method
     */
    estimate(input: AggregatorInput): Promise<AggregatorOutput>;
    /**
     * Get price/sqm from nearby listings using PostGIS
     */
    private getNearbyListings;
    /**
     * Calculate median of values
     */
    private calculateMedian;
    /**
     * Get coefficient for building type
     */
    private getBuildingTypeFactor;
    /**
     * Get coefficient for building levels
     * Bonus for buildings > 3 floors
     */
    private getLevelsFactor;
    /**
     * Get coefficient for proximity to center
     */
    private getProximityFactor;
    /**
     * Calculate confidence score (0-1)
     */
    private calculateConfidence;
}
//# sourceMappingURL=aggregator.d.ts.map