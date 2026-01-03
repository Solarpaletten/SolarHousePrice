"use strict";
// ============================================================
// SWITZERLAND (VALAIS) PRICING COEFFICIENTS
// Units: CHF/m²
// ============================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.CH_COEFFICIENTS = exports.SION_COEFFICIENTS = exports.MARTIGNY_COEFFICIENTS = exports.MONTHEY_COEFFICIENTS = void 0;
exports.getCHCoefficients = getCHCoefficients;
// ============================================================
// MONTHEY COEFFICIENTS (Valais)
// ============================================================
exports.MONTHEY_COEFFICIENTS = {
    // Base price: CHF 7'800/m² for Monthey area
    base: 7800,
    // Building types
    buildingType: {
        'residential': 1.0,
        'house': 1.0,
        'apartments': 1.08,
        'mixed': 1.05,
        'commercial': 1.15,
        'office': 1.12,
        'retail': 1.10,
        'yes': 1.0, // OSM default
    },
    // Floor levels
    levels: {
        base: 1.0,
        perExtraLevel: 0.015, // +1.5% per floor above 2
        maxBonus: 0.12, // max +12%
    },
    // Location proximity
    proximity: {
        mountainViewBonus: 0.06, // +6% for mountain view
        trainStationBonus: 0.04, // +4% near station
        industrialPenalty: -0.10, // -10% near industrial
    },
};
// ============================================================
// MARTIGNY COEFFICIENTS
// ============================================================
exports.MARTIGNY_COEFFICIENTS = {
    base: 7200, // Slightly lower than Monthey
    buildingType: {
        'residential': 1.0,
        'house': 1.0,
        'apartments': 1.06,
        'mixed': 1.04,
        'commercial': 1.12,
        'office': 1.10,
        'retail': 1.08,
        'yes': 1.0,
    },
    levels: {
        base: 1.0,
        perExtraLevel: 0.012,
        maxBonus: 0.10,
    },
    proximity: {
        mountainViewBonus: 0.05,
        trainStationBonus: 0.05, // Higher - main train hub
        industrialPenalty: -0.08,
    },
};
// ============================================================
// SION COEFFICIENTS (Valais Capital)
// ============================================================
exports.SION_COEFFICIENTS = {
    base: 8500, // Higher - capital city
    buildingType: {
        'residential': 1.0,
        'house': 1.02,
        'apartments': 1.10,
        'mixed': 1.06,
        'commercial': 1.18,
        'office': 1.15,
        'retail': 1.12,
        'yes': 1.0,
    },
    levels: {
        base: 1.0,
        perExtraLevel: 0.018,
        maxBonus: 0.15,
    },
    proximity: {
        mountainViewBonus: 0.08,
        trainStationBonus: 0.06,
        industrialPenalty: -0.12,
    },
};
// ============================================================
// COEFFICIENT REGISTRY
// ============================================================
exports.CH_COEFFICIENTS = {
    'ch-monthey': exports.MONTHEY_COEFFICIENTS,
    'ch-martigny': exports.MARTIGNY_COEFFICIENTS,
    'ch-sion': exports.SION_COEFFICIENTS,
};
function getCHCoefficients(regionId) {
    return exports.CH_COEFFICIENTS[regionId] || null;
}
//# sourceMappingURL=coefficients-ch.js.map