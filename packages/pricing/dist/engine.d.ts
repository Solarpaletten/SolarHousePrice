import type { EstimateInput, EstimateOutput, PriceEngineOptions, DistrictCoefficients } from './types.js';
/**
 * Price Engine - Main orchestrator
 *
 * Combines:
 * - Stage A: Aggregation (rule-based)
 * - Stage B: ML prediction (when enabled)
 *
 * Automatically falls back to simpler methods
 * if more sophisticated ones fail.
 */
export declare class PriceEngine {
    private options;
    private aggregator;
    private mlPredictor;
    constructor(options?: Partial<PriceEngineOptions>, coefficients?: DistrictCoefficients);
    /**
     * Estimate price for a single house
     */
    estimate(input: EstimateInput): Promise<EstimateOutput>;
    /**
     * Estimate prices for multiple houses
     */
    estimateBulk(inputs: EstimateInput[]): Promise<EstimateOutput[]>;
    /**
     * ML estimation (Stage B)
     */
    private estimateWithML;
    /**
     * Get current configuration
     */
    getOptions(): PriceEngineOptions;
    /**
     * Check if ML is available
     */
    isMLAvailable(): boolean;
}
//# sourceMappingURL=engine.d.ts.map