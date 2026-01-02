// ============================================================
// UNIT CONVERSIONS & FORMATTING
// ============================================================

// Conversion constants
export const SQFT_PER_SQM = 10.7639;
export const SQM_PER_SQFT = 0.092903;

// ============================================================
// AREA CONVERSIONS
// ============================================================

export function sqmToSqft(sqm: number): number {
  return Math.round(sqm * SQFT_PER_SQM);
}

export function sqftToSqm(sqft: number): number {
  return Math.round(sqft * SQM_PER_SQFT);
}

export function convertArea(
  value: number,
  from: 'sqm' | 'sqft',
  to: 'sqm' | 'sqft'
): number {
  if (from === to) return value;
  return from === 'sqm' ? sqmToSqft(value) : sqftToSqm(value);
}

// ============================================================
// PRICE CONVERSIONS
// ============================================================

/**
 * Convert price per sqm to price per sqft
 * Example: €6000/m² → $557/sqft (approx, just unit conversion)
 */
export function pricePerSqmToSqft(pricePerSqm: number): number {
  return Math.round(pricePerSqm / SQFT_PER_SQM);
}

export function pricePerSqftToSqm(pricePerSqft: number): number {
  return Math.round(pricePerSqft * SQFT_PER_SQM);
}

// ============================================================
// FORMATTING
// ============================================================

export function formatCurrency(
  value: number,
  currency: 'EUR' | 'USD',
  locale: string = 'en-US'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatArea(
  value: number,
  unit: 'sqm' | 'sqft',
  locale: string = 'en-US'
): string {
  const formatted = new Intl.NumberFormat(locale, {
    maximumFractionDigits: 0,
  }).format(value);
  
  const unitLabel = unit === 'sqm' ? 'm²' : 'sqft';
  return `${formatted} ${unitLabel}`;
}

export function formatPricePerUnit(
  value: number,
  currency: 'EUR' | 'USD',
  areaUnit: 'sqm' | 'sqft',
  locale: string = 'en-US'
): string {
  const priceFormatted = formatCurrency(value, currency, locale);
  const unitLabel = areaUnit === 'sqm' ? 'm²' : 'sqft';
  return `${priceFormatted}/${unitLabel}`;
}

// ============================================================
// DISPLAY HELPERS
// ============================================================

export function getCurrencySymbol(currency: 'EUR' | 'USD'): string {
  return currency === 'EUR' ? '€' : '$';
}

export function getAreaUnitLabel(unit: 'sqm' | 'sqft'): string {
  return unit === 'sqm' ? 'm²' : 'sqft';
}
