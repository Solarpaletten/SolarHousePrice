"use strict";
// ============================================================
// USA PRICE AGGREGATOR
// Stage A: Rule-based estimation for Florida
// Units: $/sqft
// ============================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.USA_LEGEND_ITEMS = exports.USA_PRICE_RANGES = exports.USAPriceAggregator = void 0;
exports.getUSAPriceColor = getUSAPriceColor;
const coefficients_usa_1 = require("./coefficients-usa");
// ============================================================
// AGGREGATOR CLASS
// ============================================================
class USAPriceAggregator {
    defaultCoefficients = {
        base: 300,
        propertyType: { 'residential': 1.0 },
        waterfront: { 'none': 1.0 },
        beachProximityPerMile: -0.015,
    };
    /**
     * Estimate price for a US property
     */
    estimate(input) {
        const coef = (0, coefficients_usa_1.getUSACoefficients)(input.regionId) || this.defaultCoefficients;
        // Start with base price
        let price = coef.base;
        // Property type multiplier
        const typeMultiplier = this.getTypeMultiplier(coef, input.propertyType);
        price *= typeMultiplier;
        // Waterfront multiplier
        const waterfrontMultiplier = this.getWaterfrontMultiplier(coef, input.waterfrontType);
        price *= waterfrontMultiplier;
        // Zip code multiplier
        const zipMultiplier = this.getZipMultiplier(coef, input.zipCode);
        price *= zipMultiplier;
        // Beach proximity adjustment
        const proximityAdjustment = this.getProximityAdjustment(coef, input.distanceToWaterMiles);
        price *= proximityAdjustment;
        // Building levels adjustment (+1% per floor above 2)
        const levelAdjustment = this.getLevelAdjustment(input.buildingLevels);
        price *= levelAdjustment;
        // Round to nearest dollar
        const pricePerSqft = Math.round(price);
        // Calculate total if sqft provided
        const totalPrice = input.sqft ? Math.round(pricePerSqft * input.sqft) : null;
        return {
            pricePerSqft,
            totalPrice,
            currency: 'USD',
            unit: 'sqft',
            confidence: this.calculateConfidence(input),
            method: 'aggregated',
            breakdown: {
                base: coef.base,
                typeMultiplier,
                waterfrontMultiplier,
                zipMultiplier,
                proximityAdjustment,
                levelAdjustment,
            },
        };
    }
    // ============================================================
    // MULTIPLIER CALCULATIONS
    // ============================================================
    getTypeMultiplier(coef, propertyType) {
        if (!propertyType)
            return 1.0;
        const normalized = propertyType.toLowerCase().replace(/[^a-z_]/g, '_');
        return coef.propertyType[normalized] || coef.propertyType['residential'] || 1.0;
    }
    getWaterfrontMultiplier(coef, waterfrontType) {
        if (!waterfrontType)
            return 1.0;
        const normalized = waterfrontType.toLowerCase();
        return coef.waterfront[normalized] || 1.0;
    }
    getZipMultiplier(coef, zipCode) {
        if (!zipCode || !coef.zipCodes)
            return 1.0;
        // Extract 5-digit zip
        const zip5 = zipCode.substring(0, 5);
        return coef.zipCodes[zip5] || 1.0;
    }
    getProximityAdjustment(coef, distanceMiles) {
        if (distanceMiles === undefined || distanceMiles === null)
            return 1.0;
        // Apply per-mile adjustment, capped at 30% reduction
        const adjustment = 1 + (coef.beachProximityPerMile * distanceMiles);
        return Math.max(0.70, Math.min(1.0, adjustment));
    }
    getLevelAdjustment(levels) {
        if (!levels || levels <= 2)
            return 1.0;
        // +1% per floor above 2, max +10%
        const bonus = Math.min((levels - 2) * 0.01, 0.10);
        return 1 + bonus;
    }
    // ============================================================
    // CONFIDENCE CALCULATION
    // ============================================================
    calculateConfidence(input) {
        let confidence = 0.50; // Base confidence
        if (input.propertyType)
            confidence += 0.10;
        if (input.sqft)
            confidence += 0.10;
        if (input.zipCode)
            confidence += 0.15;
        if (input.waterfrontType && input.waterfrontType !== 'none')
            confidence += 0.10;
        if (input.distanceToWaterMiles !== undefined)
            confidence += 0.05;
        return Math.min(0.95, confidence);
    }
}
exports.USAPriceAggregator = USAPriceAggregator;
// ============================================================
// COLOR SCALE FOR USA ($/sqft)
// ============================================================
exports.USA_PRICE_RANGES = {
    budget: 200, // < $200/sqft (blue)
    average: 300, // $200-300 (green)
    aboveAvg: 400, // $300-400 (yellow)
    premium: 550, // $400-550 (orange)
    luxury: 550, // > $550 (red)
};
function getUSAPriceColor(pricePerSqft) {
    if (pricePerSqft < exports.USA_PRICE_RANGES.budget)
        return '#3b82f6'; // blue
    if (pricePerSqft < exports.USA_PRICE_RANGES.average)
        return '#22c55e'; // green
    if (pricePerSqft < exports.USA_PRICE_RANGES.aboveAvg)
        return '#eab308'; // yellow
    if (pricePerSqft < exports.USA_PRICE_RANGES.premium)
        return '#f97316'; // orange
    return '#ef4444'; // red
}
exports.USA_LEGEND_ITEMS = [
    { color: '#3b82f6', label: '< $200/sqft', category: 'Budget' },
    { color: '#22c55e', label: '$200-300', category: 'Average' },
    { color: '#eab308', label: '$300-400', category: 'Above avg' },
    { color: '#f97316', label: '$400-550', category: 'Premium' },
    { color: '#ef4444', label: '> $550/sqft', category: 'Luxury' },
];
//# sourceMappingURL=aggregator-usa.js.map