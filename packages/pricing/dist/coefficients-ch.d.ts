export interface CHCoefficients {
    base: number;
    buildingType: Record<string, number>;
    levels: {
        base: number;
        perExtraLevel: number;
        maxBonus: number;
    };
    proximity: {
        mountainViewBonus: number;
        trainStationBonus: number;
        industrialPenalty: number;
    };
}
export declare const MONTHEY_COEFFICIENTS: CHCoefficients;
export declare const MARTIGNY_COEFFICIENTS: CHCoefficients;
export declare const SION_COEFFICIENTS: CHCoefficients;
export declare const CH_COEFFICIENTS: Record<string, CHCoefficients>;
export declare function getCHCoefficients(regionId: string): CHCoefficients | null;
//# sourceMappingURL=coefficients-ch.d.ts.map