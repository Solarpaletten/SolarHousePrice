export type Currency = 'EUR' | 'USD';
export type AreaUnit = 'sqm' | 'sqft';
export type PriceUnit = 'eur_per_sqm' | 'usd_per_sqft';
export interface RegionConfig {
    id: string;
    label: string;
    country: string;
    state?: string;
    city: string;
    flag: string;
    center: [number, number];
    bbox: [number, number, number, number];
    zoomDefault: number;
    zoomMin: number;
    zoomMax: number;
    currency: Currency;
    areaUnit: AreaUnit;
    priceUnit: PriceUnit;
    locale: string;
    dataSources: string[];
}
export declare const REGIONS: Record<string, RegionConfig>;
export declare const DEFAULT_REGION = "us-fl-sarasota";
export declare function getRegion(id: string): RegionConfig;
export declare function getRegionList(): RegionConfig[];
export declare function getRegionsByCountry(country: string): RegionConfig[];
export declare function isUSRegion(regionId: string): boolean;
export declare function getOSMQuery(regionId: string, limit?: number): string;
