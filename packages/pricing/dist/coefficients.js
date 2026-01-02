"use strict";
// ============================================================
// @solar/pricing - District Coefficients
// Phase 5: Price Estimation
// ============================================================
// Версионируемые коэффициенты для расчёта цен недвижимости
// Источник: Research + ImmobilienScout24 Q4 2025
// ============================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.COEFFICIENTS_UPDATED = exports.COEFFICIENTS_SOURCE = exports.COEFFICIENTS_VERSION = exports.DEFAULT_COEFFICIENTS = exports.BERLIN_MITTE_COEFFICIENTS = exports.BERLIN_ALEX_COEFFICIENTS = void 0;
exports.getCoefficients = getCoefficients;
exports.getAvailableDistricts = getAvailableDistricts;
/**
 * Berlin Alexanderplatz District Coefficients
 * Based on Q4 2025 market research
 */
exports.BERLIN_ALEX_COEFFICIENTS = {
    district: 'berlin-alexanderplatz',
    basePriceSqm: 6500, // € средняя цена за м² в районе
    buildingType: {
        residential: 1.0, // базовый множитель
        apartments: 1.05, // +5% для многоквартирных
        commercial: 1.2, // +20% для коммерческих
        office: 1.15, // +15% для офисных
        industrial: 0.7, // -30% для промышленных
        default: 1.0, // fallback
    },
    levels: {
        base: 1.0, // 1-3 этажа - без бонуса
        perExtraLevel: 0.02, // +2% за каждый этаж выше 3
        maxBonus: 0.15, // максимум +15% (до ~10 этажей)
    },
    proximity: {
        centerPoint: [13.4125, 52.5219], // Alexanderplatz [lng, lat]
        perKmFromCenter: -0.03, // -3% за км от центра
        waterBonus: 0.08, // +8% у воды (Spree, < 100m)
        parkBonus: 0.05, // +5% у парка (< 200m)
    },
};
/**
 * Berlin Mitte District Coefficients
 * Premium area pricing
 */
exports.BERLIN_MITTE_COEFFICIENTS = {
    district: 'berlin-mitte',
    basePriceSqm: 7200, // выше чем Alexanderplatz
    buildingType: {
        residential: 1.0,
        apartments: 1.08, // +8% - более premium
        commercial: 1.25,
        office: 1.2,
        industrial: 0.65,
        default: 1.0,
    },
    levels: {
        base: 1.0,
        perExtraLevel: 0.025, // +2.5% за этаж
        maxBonus: 0.2, // до +20%
    },
    proximity: {
        centerPoint: [13.3889, 52.5186], // Brandenburger Tor
        perKmFromCenter: -0.04, // -4% за км
        waterBonus: 0.1, // +10% у воды
        parkBonus: 0.06, // +6% у парка (Tiergarten)
    },
};
/**
 * Коэффициенты по умолчанию (Berlin average)
 */
exports.DEFAULT_COEFFICIENTS = {
    district: 'berlin-default',
    basePriceSqm: 5500,
    buildingType: {
        residential: 1.0,
        apartments: 1.03,
        commercial: 1.15,
        office: 1.1,
        industrial: 0.75,
        default: 1.0,
    },
    levels: {
        base: 1.0,
        perExtraLevel: 0.015,
        maxBonus: 0.12,
    },
    proximity: {
        centerPoint: [13.405, 52.52], // Berlin center
        perKmFromCenter: -0.02,
        waterBonus: 0.05,
        parkBonus: 0.03,
    },
};
// ============================================================
// VERSION CONTROL
// ============================================================
/**
 * Версия текущих коэффициентов
 * Формат: YYYY-MM-DD-vN
 */
exports.COEFFICIENTS_VERSION = '2026-01-02-v1';
/**
 * Источник данных для коэффициентов
 */
exports.COEFFICIENTS_SOURCE = 'research-immoscout-q4-2025';
/**
 * Дата последнего обновления
 */
exports.COEFFICIENTS_UPDATED = new Date('2026-01-02');
// ============================================================
// HELPER FUNCTIONS
// ============================================================
/**
 * Get coefficients by district name
 */
function getCoefficients(district) {
    const normalized = district.toLowerCase().replace(/\s+/g, '-');
    switch (normalized) {
        case 'berlin-alexanderplatz':
        case 'berlin-alex':
        case 'alexanderplatz':
            return exports.BERLIN_ALEX_COEFFICIENTS;
        case 'berlin-mitte':
        case 'mitte':
            return exports.BERLIN_MITTE_COEFFICIENTS;
        default:
            return exports.DEFAULT_COEFFICIENTS;
    }
}
/**
 * Get all available districts
 */
function getAvailableDistricts() {
    return [
        'berlin-alexanderplatz',
        'berlin-mitte',
        'berlin-default',
    ];
}
//# sourceMappingURL=coefficients.js.map