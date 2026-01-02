export declare const SQFT_PER_SQM = 10.7639;
export declare const SQM_PER_SQFT = 0.092903;
export declare function sqmToSqft(sqm: number): number;
export declare function sqftToSqm(sqft: number): number;
export declare function formatCurrency(value: number, currency: 'EUR' | 'USD' | 'CHF', locale?: string): string;
export declare function formatArea(value: number, unit: 'sqm' | 'sqft', locale?: string): string;
export declare function formatPricePerUnit(value: number, currency: 'EUR' | 'USD' | 'CHF', areaUnit: 'sqm' | 'sqft', locale?: string): string;
export declare function getCurrencySymbol(currency: 'EUR' | 'USD' | 'CHF'): string;
export declare function getAreaUnitLabel(unit: 'sqm' | 'sqft'): string;
/**
 * Format price Swiss-style with apostrophes
 * Example: 7800 → "7'800"
 */
export declare function formatSwissNumber(value: number): string;
/**
 * Format Swiss price per m²
 * Example: 7800 → "CHF 7'800/m²"
 */
export declare function formatSwissPriceSqm(value: number): string;
