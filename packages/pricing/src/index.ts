// ============================================================
// @solar/pricing - Main Exports
// Phase 5: Price Estimation Package
// ============================================================

// Types
export type {
  DistrictCoefficients,
  AggregatorInput,
  AggregatorOutput,
  AppliedFactor,
  EstimateInput,
  EstimateOutput,
  MLFeatures,
  CachedEstimate,
  PriceEngineOptions,
  BuildingType,
  EstimationMethod,
} from './types.js';

// Coefficients
export {
  BERLIN_ALEX_COEFFICIENTS,
  BERLIN_MITTE_COEFFICIENTS,
  DEFAULT_COEFFICIENTS,
  COEFFICIENTS_VERSION,
  COEFFICIENTS_SOURCE,
  COEFFICIENTS_UPDATED,
  getCoefficients,
  getAvailableDistricts,
} from './coefficients.js';

// Aggregator (Stage A)
export { PriceAggregator } from './aggregator.js';

// Engine (Orchestrator)
export { PriceEngine } from './engine.js';

// Color Scale (UI)
export {
  PRICE_RANGE,
  PRICE_COLORS,
  getPriceColor,
  getPriceColorRGB,
  getPriceColorRGBA,
  getMapboxPriceExpression,
  getPriceCategory,
  getConfidenceColor,
  formatPrice,
  formatPriceSqm,
} from './colorScale.js';

// ML (Stage B)
export { MLPredictor } from './ml/predict.js';
export { extractFeatures, getFeatureNames } from './ml/features.js';

// USA Pricing
export { USAPriceAggregator, getUSAPriceColor, USA_LEGEND_ITEMS } from './aggregator-usa';
export { USA_COEFFICIENTS, getUSACoefficients } from './coefficients-usa';
