import type { DistrictCoefficients } from './types.js';
/**
 * Berlin Alexanderplatz District Coefficients
 * Based on Q4 2025 market research
 */
export declare const BERLIN_ALEX_COEFFICIENTS: DistrictCoefficients;
/**
 * Berlin Mitte District Coefficients
 * Premium area pricing
 */
export declare const BERLIN_MITTE_COEFFICIENTS: DistrictCoefficients;
/**
 * Коэффициенты по умолчанию (Berlin average)
 */
export declare const DEFAULT_COEFFICIENTS: DistrictCoefficients;
/**
 * Версия текущих коэффициентов
 * Формат: YYYY-MM-DD-vN
 */
export declare const COEFFICIENTS_VERSION = "2026-01-02-v1";
/**
 * Источник данных для коэффициентов
 */
export declare const COEFFICIENTS_SOURCE = "research-immoscout-q4-2025";
/**
 * Дата последнего обновления
 */
export declare const COEFFICIENTS_UPDATED: Date;
/**
 * Get coefficients by district name
 */
export declare function getCoefficients(district: string): DistrictCoefficients;
/**
 * Get all available districts
 */
export declare function getAvailableDistricts(): string[];
//# sourceMappingURL=coefficients.d.ts.map