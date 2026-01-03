"use strict";
// ============================================================
// @solar/pricing - Price Engine
// Phase 5: Orchestrator for Stage A & B
// ============================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceEngine = void 0;
const aggregator_js_1 = require("./aggregator.js");
const predict_js_1 = require("./ml/predict.js");
const features_js_1 = require("./ml/features.js");
const coefficients_js_1 = require("./coefficients.js");
/**
 * Default engine options
 */
const DEFAULT_OPTIONS = {
    useML: false, // ML disabled by default until trained
    cacheEnabled: true,
    cacheTTLHours: 24,
    searchRadiusM: 500,
};
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
class PriceEngine {
    options;
    aggregator;
    mlPredictor = null;
    constructor(options = {}, coefficients = coefficients_js_1.BERLIN_ALEX_COEFFICIENTS) {
        this.options = { ...DEFAULT_OPTIONS, ...options };
        this.aggregator = new aggregator_js_1.PriceAggregator(coefficients, this.options.searchRadiusM);
        // Initialize ML predictor if enabled
        if (this.options.useML) {
            try {
                this.mlPredictor = new predict_js_1.MLPredictor();
            }
            catch (error) {
                console.warn('ML predictor not available:', error);
                this.mlPredictor = null;
            }
        }
    }
    /**
     * Estimate price for a single house
     */
    async estimate(input) {
        // Stage A: Always run aggregation first
        const aggregated = await this.aggregator.estimate(input);
        // Stage B: Try ML if enabled and available
        if (this.options.useML && this.mlPredictor) {
            try {
                const mlResult = await this.estimateWithML(input, aggregated);
                if (mlResult) {
                    return mlResult;
                }
            }
            catch (error) {
                console.warn('ML estimation failed, using aggregation:', error);
            }
        }
        // Return aggregation result
        return {
            priceSqm: aggregated.priceSqm,
            priceTotal: aggregated.priceTotal,
            method: aggregated.method,
            confidence: aggregated.confidence,
            details: aggregated.details,
        };
    }
    /**
     * Estimate prices for multiple houses
     */
    async estimateBulk(inputs) {
        // Process in parallel with concurrency limit
        const BATCH_SIZE = 10;
        const results = [];
        for (let i = 0; i < inputs.length; i += BATCH_SIZE) {
            const batch = inputs.slice(i, i + BATCH_SIZE);
            const batchResults = await Promise.all(batch.map((input) => this.estimate(input)));
            results.push(...batchResults);
        }
        return results;
    }
    /**
     * ML estimation (Stage B)
     */
    async estimateWithML(input, aggregated) {
        if (!this.mlPredictor)
            return null;
        // Extract features
        const features = (0, features_js_1.extractFeatures)({
            areaSqm: input.areaSqm,
            buildingType: input.buildingType,
            buildingLevels: input.buildingLevels,
            centroid: input.centroid,
        }, aggregated);
        // Get ML prediction
        const mlPriceSqm = this.mlPredictor.predict(features);
        const mlConfidence = this.mlPredictor.getConfidence(features);
        // Sanity check: ML price should be within reasonable range
        const ratio = mlPriceSqm / aggregated.priceSqm;
        if (ratio < 0.5 || ratio > 2.0) {
            console.warn('ML prediction out of range, falling back to aggregation');
            return null;
        }
        const priceTotal = input.areaSqm !== null
            ? Math.round(mlPriceSqm * input.areaSqm)
            : null;
        return {
            priceSqm: mlPriceSqm,
            priceTotal,
            method: 'ml',
            confidence: mlConfidence,
            details: {
                ...aggregated.details,
                mlFeatures: features,
                aggregatedPriceSqm: aggregated.priceSqm,
            },
        };
    }
    /**
     * Get current configuration
     */
    getOptions() {
        return { ...this.options };
    }
    /**
     * Check if ML is available
     */
    isMLAvailable() {
        return this.mlPredictor !== null;
    }
}
exports.PriceEngine = PriceEngine;
//# sourceMappingURL=engine.js.map