export interface CHPriceInput {
    regionId: string;
    areaSqm?: number | null;
    buildingType?: string;
    buildingLevels?: number | null;
    centroid?: [number, number];
    hasMountainView?: boolean;
    nearTrainStation?: boolean;
    nearIndustrial?: boolean;
}
export interface CHPriceEstimate {
    priceSqm: number;
    totalPrice: number | null;
    currency: 'CHF';
    unit: 'm²';
    confidence: number;
    method: 'aggregated' | 'fallback';
    breakdown: {
        base: number;
        typeMultiplier: number;
        levelAdjustment: number;
        proximityAdjustment: number;
    };
}
export declare class CHPriceAggregator {
    private defaultCoefficients;
    /**
     * Estimate price for a Swiss property
     */
    estimate(input: CHPriceInput): CHPriceEstimate;
    private getTypeMultiplier;
    private getLevelAdjustment;
    private getProximityAdjustment;
    private calculateConfidence;
}
export declare const CH_PRICE_RANGES: {
    budget: number;
    average: number;
    aboveAvg: number;
    premium: number;
    luxury: number;
};
export declare function getCHPriceColor(priceSqm: number): string;
export declare const CH_LEGEND_ITEMS: {
    color: string;
    label: string;
    category: string;
}[];
//# sourceMappingURL=aggregator-ch.d.ts.map