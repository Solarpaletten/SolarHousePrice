export interface USACoefficients {
    base: number;
    propertyType: Record<string, number>;
    waterfront: Record<string, number>;
    beachProximityPerMile: number;
    zipCodes?: Record<string, number>;
}
export declare const SARASOTA_COEFFICIENTS: USACoefficients;
export declare const TAMPA_COEFFICIENTS: USACoefficients;
export declare const USA_COEFFICIENTS: Record<string, USACoefficients>;
export declare function getUSACoefficients(regionId: string): USACoefficients | null;
//# sourceMappingURL=coefficients-usa.d.ts.map