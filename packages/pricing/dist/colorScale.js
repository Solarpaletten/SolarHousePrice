"use strict";
// ============================================================
// @solar/pricing - Color Scale
// Phase 5: UI Color Gradient for Price Visualization
// ============================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.PRICE_COLORS = exports.PRICE_RANGE = void 0;
exports.getPriceColor = getPriceColor;
exports.getPriceColorRGB = getPriceColorRGB;
exports.getPriceColorRGBA = getPriceColorRGBA;
exports.getMapboxPriceExpression = getMapboxPriceExpression;
exports.getPriceCategory = getPriceCategory;
exports.getConfidenceColor = getConfidenceColor;
exports.formatPrice = formatPrice;
exports.formatPriceSqm = formatPriceSqm;
/**
 * Price range for Berlin (€/m²)
 */
exports.PRICE_RANGE = {
    min: 4000, // budget
    max: 12000, // premium
    average: 6500, // district average
};
/**
 * Color palette for price visualization
 * Cold (blue) → Warm (red)
 * Designed to work with satellite map overlay
 */
exports.PRICE_COLORS = {
    veryLow: '#3b82f6', // blue - very cheap
    low: '#22c55e', // green - below average
    average: '#eab308', // yellow - average
    high: '#f97316', // orange - above average
    veryHigh: '#ef4444', // red - premium
};
/**
 * Get color for a given price per square meter
 *
 * @param priceSqm - Price in €/m²
 * @returns Hex color string
 *
 * @example
 * getPriceColor(4000)  // '#3b82f6' (blue)
 * getPriceColor(6500)  // '#eab308' (yellow)
 * getPriceColor(12000) // '#ef4444' (red)
 */
function getPriceColor(priceSqm) {
    const { min, max } = exports.PRICE_RANGE;
    // Normalize to 0-1 range
    const normalized = Math.max(0, Math.min(1, (priceSqm - min) / (max - min)));
    // Map to color array
    const colors = [
        exports.PRICE_COLORS.veryLow,
        exports.PRICE_COLORS.low,
        exports.PRICE_COLORS.average,
        exports.PRICE_COLORS.high,
        exports.PRICE_COLORS.veryHigh,
    ];
    const index = Math.floor(normalized * (colors.length - 1));
    return colors[Math.min(index, colors.length - 1)];
}
/**
 * Get RGB values for a price (for Mapbox expressions)
 *
 * @param priceSqm - Price in €/m²
 * @returns [r, g, b] array
 */
function getPriceColorRGB(priceSqm) {
    const hex = getPriceColor(priceSqm);
    return hexToRGB(hex);
}
/**
 * Get color with opacity for a price
 *
 * @param priceSqm - Price in €/m²
 * @param opacity - Opacity 0-1
 * @returns rgba string
 */
function getPriceColorRGBA(priceSqm, opacity) {
    const [r, g, b] = getPriceColorRGB(priceSqm);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}
/**
 * Generate Mapbox fill-color expression for price-based coloring
 *
 * @returns Mapbox expression for fill-color property
 */
function getMapboxPriceExpression() {
    return [
        'interpolate',
        ['linear'],
        ['get', 'price_sqm'],
        exports.PRICE_RANGE.min,
        exports.PRICE_COLORS.veryLow,
        5000,
        exports.PRICE_COLORS.low,
        exports.PRICE_RANGE.average,
        exports.PRICE_COLORS.average,
        9000,
        exports.PRICE_COLORS.high,
        exports.PRICE_RANGE.max,
        exports.PRICE_COLORS.veryHigh,
    ];
}
/**
 * Get price category label
 *
 * @param priceSqm - Price in €/m²
 * @returns Category label
 */
function getPriceCategory(priceSqm) {
    if (priceSqm < 4500)
        return 'budget';
    if (priceSqm < 5500)
        return 'affordable';
    if (priceSqm < 7500)
        return 'average';
    if (priceSqm < 10000)
        return 'premium';
    return 'luxury';
}
/**
 * Get confidence color
 *
 * @param confidence - Confidence score 0-1
 * @returns Tailwind color class
 */
function getConfidenceColor(confidence) {
    if (confidence >= 0.7)
        return 'text-green-400';
    if (confidence >= 0.5)
        return 'text-yellow-400';
    return 'text-red-400';
}
// ============================================================
// HELPER FUNCTIONS
// ============================================================
/**
 * Convert hex color to RGB array
 */
function hexToRGB(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) {
        return [128, 128, 128]; // gray fallback
    }
    return [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
    ];
}
/**
 * Format price for display
 *
 * @param price - Price in €
 * @returns Formatted string
 */
function formatPrice(price) {
    return new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR',
        maximumFractionDigits: 0,
    }).format(price);
}
/**
 * Format price per sqm for display
 *
 * @param priceSqm - Price in €/m²
 * @returns Formatted string
 */
function formatPriceSqm(priceSqm) {
    return `${formatPrice(priceSqm)}/m²`;
}
//# sourceMappingURL=colorScale.js.map