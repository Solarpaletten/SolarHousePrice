export interface USAPriceInput {
    regionId: string;
    sqft?: number | null;
    propertyType?: string;
    buildingLevels?: number | null;
    zipCode?: string;
    distanceToWaterMiles?: number;
    waterfrontType?: string;
    centroid?: [number, number];
}
export interface USAPriceEstimate {
    pricePerSqft: number;
    totalPrice: number | null;
    currency: 'USD';
    unit: 'sqft';
    confidence: number;
    method: 'aggregated' | 'fallback';
    breakdown: {
        base: number;
        typeMultiplier: number;
        waterfrontMultiplier: number;
        zipMultiplier: number;
        proximityAdjustment: number;
        levelAdjustment: number;
    };
}
export declare class USAPriceAggregator {
    private defaultCoefficients;
    /**
     * Estimate price for a US property
     */
    estimate(input: USAPriceInput): USAPriceEstimate;
    private getTypeMultiplier;
    private getWaterfrontMultiplier;
    private getZipMultiplier;
    private getProximityAdjustment;
    private getLevelAdjustment;
    private calculateConfidence;
}
export declare const USA_PRICE_RANGES: {
    budget: number;
    average: number;
    aboveAvg: number;
    premium: number;
    luxury: number;
};
export declare function getUSAPriceColor(pricePerSqft: number): string;
export declare const USA_LEGEND_ITEMS: {
    color: string;
    label: string;
    category: string;
}[];
//# sourceMappingURL=aggregator-usa.d.ts.map