export declare const SQFT_PER_SQM = 10.7639;
export declare const SQM_PER_SQFT = 0.092903;
export declare function sqmToSqft(sqm: number): number;
export declare function sqftToSqm(sqft: number): number;
export declare function convertArea(value: number, from: 'sqm' | 'sqft', to: 'sqm' | 'sqft'): number;
/**
 * Convert price per sqm to price per sqft
 * Example: €6000/m² → $557/sqft (approx, just unit conversion)
 */
export declare function pricePerSqmToSqft(pricePerSqm: number): number;
export declare function pricePerSqftToSqm(pricePerSqft: number): number;
export declare function formatCurrency(value: number, currency: 'EUR' | 'USD', locale?: string): string;
export declare function formatArea(value: number, unit: 'sqm' | 'sqft', locale?: string): string;
export declare function formatPricePerUnit(value: number, currency: 'EUR' | 'USD', areaUnit: 'sqm' | 'sqft', locale?: string): string;
export declare function getCurrencySymbol(currency: 'EUR' | 'USD'): string;
export declare function getAreaUnitLabel(unit: 'sqm' | 'sqft'): string;
