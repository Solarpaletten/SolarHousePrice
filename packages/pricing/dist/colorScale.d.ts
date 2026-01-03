/**
 * Price range for Berlin (€/m²)
 */
export declare const PRICE_RANGE: {
    min: number;
    max: number;
    average: number;
};
/**
 * Color palette for price visualization
 * Cold (blue) → Warm (red)
 * Designed to work with satellite map overlay
 */
export declare const PRICE_COLORS: {
    veryLow: string;
    low: string;
    average: string;
    high: string;
    veryHigh: string;
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
export declare function getPriceColor(priceSqm: number): string;
/**
 * Get RGB values for a price (for Mapbox expressions)
 *
 * @param priceSqm - Price in €/m²
 * @returns [r, g, b] array
 */
export declare function getPriceColorRGB(priceSqm: number): [number, number, number];
/**
 * Get color with opacity for a price
 *
 * @param priceSqm - Price in €/m²
 * @param opacity - Opacity 0-1
 * @returns rgba string
 */
export declare function getPriceColorRGBA(priceSqm: number, opacity: number): string;
/**
 * Generate Mapbox fill-color expression for price-based coloring
 *
 * @returns Mapbox expression for fill-color property
 */
export declare function getMapboxPriceExpression(): unknown[];
/**
 * Get price category label
 *
 * @param priceSqm - Price in €/m²
 * @returns Category label
 */
export declare function getPriceCategory(priceSqm: number): 'budget' | 'affordable' | 'average' | 'premium' | 'luxury';
/**
 * Get confidence color
 *
 * @param confidence - Confidence score 0-1
 * @returns Tailwind color class
 */
export declare function getConfidenceColor(confidence: number): string;
/**
 * Format price for display
 *
 * @param price - Price in €
 * @returns Formatted string
 */
export declare function formatPrice(price: number): string;
/**
 * Format price per sqm for display
 *
 * @param priceSqm - Price in €/m²
 * @returns Formatted string
 */
export declare function formatPriceSqm(priceSqm: number): string;
//# sourceMappingURL=colorScale.d.ts.map