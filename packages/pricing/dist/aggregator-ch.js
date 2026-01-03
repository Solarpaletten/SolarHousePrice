"use strict";
// ============================================================
// SWITZERLAND PRICE AGGREGATOR
// Stage A: Rule-based estimation for Valais
// Units: CHF/m²
// ============================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.CH_LEGEND_ITEMS = exports.CH_PRICE_RANGES = exports.CHPriceAggregator = void 0;
exports.getCHPriceColor = getCHPriceColor;
const coefficients_ch_1 = require("./coefficients-ch");
// ============================================================
// AGGREGATOR CLASS
// ============================================================
class CHPriceAggregator {
    defaultCoefficients = {
        base: 7500,
        buildingType: { 'residential': 1.0 },
        levels: { base: 1.0, perExtraLevel: 0.015, maxBonus: 0.12 },
        proximity: { mountainViewBonus: 0.05, trainStationBonus: 0.04, industrialPenalty: -0.08 },
    };
    /**
     * Estimate price for a Swiss property
     */
    estimate(input) {
        const coef = (0, coefficients_ch_1.getCHCoefficients)(input.regionId) || this.defaultCoefficients;
        // Start with base price
        let price = coef.base;
        // Building type multiplier
        const typeMultiplier = this.getTypeMultiplier(coef, input.buildingType);
        price *= typeMultiplier;
        // Level adjustment
        const levelAdjustment = this.getLevelAdjustment(coef, input.buildingLevels);
        price *= levelAdjustment;
        // Proximity adjustment
        const proximityAdjustment = this.getProximityAdjustment(coef, input);
        price *= proximityAdjustment;
        // Round to nearest 10 CHF
        const priceSqm = Math.round(price / 10) * 10;
        // Calculate total if area provided
        const totalPrice = input.areaSqm ? Math.round(priceSqm * input.areaSqm) : null;
        return {
            priceSqm,
            totalPrice,
            currency: 'CHF',
            unit: 'm²',
            confidence: this.calculateConfidence(input),
            method: 'aggregated',
            breakdown: {
                base: coef.base,
                typeMultiplier,
                levelAdjustment,
                proximityAdjustment,
            },
        };
    }
    // ============================================================
    // MULTIPLIER CALCULATIONS
    // ============================================================
    getTypeMultiplier(coef, buildingType) {
        if (!buildingType)
            return 1.0;
        const normalized = buildingType.toLowerCase().replace(/[^a-z]/g, '');
        return coef.buildingType[normalized] || coef.buildingType['residential'] || 1.0;
    }
    getLevelAdjustment(coef, levels) {
        if (!levels || levels <= 2)
            return coef.levels.base;
        // +perExtraLevel per floor above 2, capped at maxBonus
        const extraLevels = levels - 2;
        const bonus = Math.min(extraLevels * coef.levels.perExtraLevel, coef.levels.maxBonus);
        return coef.levels.base + bonus;
    }
    getProximityAdjustment(coef, input) {
        let adjustment = 1.0;
        if (input.hasMountainView) {
            adjustment += coef.proximity.mountainViewBonus;
        }
        if (input.nearTrainStation) {
            adjustment += coef.proximity.trainStationBonus;
        }
        if (input.nearIndustrial) {
            adjustment += coef.proximity.industrialPenalty; // negative value
        }
        return Math.max(0.7, Math.min(1.3, adjustment)); // Cap between 0.7 and 1.3
    }
    // ============================================================
    // CONFIDENCE CALCULATION
    // ============================================================
    calculateConfidence(input) {
        let confidence = 0.55; // Base confidence
        if (input.buildingType)
            confidence += 0.10;
        if (input.areaSqm)
            confidence += 0.10;
        if (input.buildingLevels)
            confidence += 0.05;
        if (input.hasMountainView !== undefined)
            confidence += 0.05;
        if (input.nearTrainStation !== undefined)
            confidence += 0.05;
        return Math.min(0.90, confidence);
    }
}
exports.CHPriceAggregator = CHPriceAggregator;
// ============================================================
// COLOR SCALE FOR SWITZERLAND (CHF/m²)
// ============================================================
exports.CH_PRICE_RANGES = {
    budget: 6000, // < 6'000 CHF/m² (blue)
    average: 8000, // 6'000-8'000 (green)
    aboveAvg: 10000, // 8'000-10'000 (yellow)
    premium: 12000, // 10'000-12'000 (orange)
    luxury: 12000, // > 12'000 (red)
};
function getCHPriceColor(priceSqm) {
    if (priceSqm < exports.CH_PRICE_RANGES.budget)
        return '#3b82f6'; // blue
    if (priceSqm < exports.CH_PRICE_RANGES.average)
        return '#22c55e'; // green
    if (priceSqm < exports.CH_PRICE_RANGES.aboveAvg)
        return '#eab308'; // yellow
    if (priceSqm < exports.CH_PRICE_RANGES.premium)
        return '#f97316'; // orange
    return '#ef4444'; // red
}
exports.CH_LEGEND_ITEMS = [
    { color: '#3b82f6', label: "< CHF 6'000/m²", category: 'Budget' },
    { color: '#22c55e', label: "CHF 6'000-8'000", category: 'Average' },
    { color: '#eab308', label: "CHF 8'000-10'000", category: 'Above avg' },
    { color: '#f97316', label: "CHF 10'000-12'000", category: 'Premium' },
    { color: '#ef4444', label: "> CHF 12'000/m²", category: 'Luxury' },
];
//# sourceMappingURL=aggregator-ch.js.map