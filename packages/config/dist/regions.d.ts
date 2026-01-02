export type Currency = 'EUR' | 'USD' | 'CHF';
export type AreaUnit = 'sqm' | 'sqft';
export type PriceUnit = 'eur_per_sqm' | 'usd_per_sqft' | 'chf_per_sqm';
export interface RegionConfig {
    id: string;
    label: string;
    country: string;
    canton?: string;
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
export declare const DEFAULT_REGION = "ch-monthey";
export declare function getRegion(id: string): RegionConfig;
export declare function getRegionList(): RegionConfig[];
export declare function getRegionsByCountry(country: string): RegionConfig[];
export declare function isCHRegion(regionId: string): boolean;
export declare function getOSMQuery(regionId: string, limit?: number): string;
