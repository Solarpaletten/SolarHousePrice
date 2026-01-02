"use strict";
// ============================================================
// @solar/pricing - Main Exports
// Phase 5: Price Estimation Package
// ============================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUSACoefficients = exports.USA_COEFFICIENTS = exports.USA_LEGEND_ITEMS = exports.getUSAPriceColor = exports.USAPriceAggregator = exports.getFeatureNames = exports.extractFeatures = exports.MLPredictor = exports.formatPriceSqm = exports.formatPrice = exports.getConfidenceColor = exports.getPriceCategory = exports.getMapboxPriceExpression = exports.getPriceColorRGBA = exports.getPriceColorRGB = exports.getPriceColor = exports.PRICE_COLORS = exports.PRICE_RANGE = exports.PriceEngine = exports.PriceAggregator = exports.getAvailableDistricts = exports.getCoefficients = exports.COEFFICIENTS_UPDATED = exports.COEFFICIENTS_SOURCE = exports.COEFFICIENTS_VERSION = exports.DEFAULT_COEFFICIENTS = exports.BERLIN_MITTE_COEFFICIENTS = exports.BERLIN_ALEX_COEFFICIENTS = void 0;
// Coefficients
var coefficients_js_1 = require("./coefficients.js");
Object.defineProperty(exports, "BERLIN_ALEX_COEFFICIENTS", { enumerable: true, get: function () { return coefficients_js_1.BERLIN_ALEX_COEFFICIENTS; } });
Object.defineProperty(exports, "BERLIN_MITTE_COEFFICIENTS", { enumerable: true, get: function () { return coefficients_js_1.BERLIN_MITTE_COEFFICIENTS; } });
Object.defineProperty(exports, "DEFAULT_COEFFICIENTS", { enumerable: true, get: function () { return coefficients_js_1.DEFAULT_COEFFICIENTS; } });
Object.defineProperty(exports, "COEFFICIENTS_VERSION", { enumerable: true, get: function () { return coefficients_js_1.COEFFICIENTS_VERSION; } });
Object.defineProperty(exports, "COEFFICIENTS_SOURCE", { enumerable: true, get: function () { return coefficients_js_1.COEFFICIENTS_SOURCE; } });
Object.defineProperty(exports, "COEFFICIENTS_UPDATED", { enumerable: true, get: function () { return coefficients_js_1.COEFFICIENTS_UPDATED; } });
Object.defineProperty(exports, "getCoefficients", { enumerable: true, get: function () { return coefficients_js_1.getCoefficients; } });
Object.defineProperty(exports, "getAvailableDistricts", { enumerable: true, get: function () { return coefficients_js_1.getAvailableDistricts; } });
// Aggregator (Stage A)
var aggregator_js_1 = require("./aggregator.js");
Object.defineProperty(exports, "PriceAggregator", { enumerable: true, get: function () { return aggregator_js_1.PriceAggregator; } });
// Engine (Orchestrator)
var engine_js_1 = require("./engine.js");
Object.defineProperty(exports, "PriceEngine", { enumerable: true, get: function () { return engine_js_1.PriceEngine; } });
// Color Scale (UI)
var colorScale_js_1 = require("./colorScale.js");
Object.defineProperty(exports, "PRICE_RANGE", { enumerable: true, get: function () { return colorScale_js_1.PRICE_RANGE; } });
Object.defineProperty(exports, "PRICE_COLORS", { enumerable: true, get: function () { return colorScale_js_1.PRICE_COLORS; } });
Object.defineProperty(exports, "getPriceColor", { enumerable: true, get: function () { return colorScale_js_1.getPriceColor; } });
Object.defineProperty(exports, "getPriceColorRGB", { enumerable: true, get: function () { return colorScale_js_1.getPriceColorRGB; } });
Object.defineProperty(exports, "getPriceColorRGBA", { enumerable: true, get: function () { return colorScale_js_1.getPriceColorRGBA; } });
Object.defineProperty(exports, "getMapboxPriceExpression", { enumerable: true, get: function () { return colorScale_js_1.getMapboxPriceExpression; } });
Object.defineProperty(exports, "getPriceCategory", { enumerable: true, get: function () { return colorScale_js_1.getPriceCategory; } });
Object.defineProperty(exports, "getConfidenceColor", { enumerable: true, get: function () { return colorScale_js_1.getConfidenceColor; } });
Object.defineProperty(exports, "formatPrice", { enumerable: true, get: function () { return colorScale_js_1.formatPrice; } });
Object.defineProperty(exports, "formatPriceSqm", { enumerable: true, get: function () { return colorScale_js_1.formatPriceSqm; } });
// ML (Stage B)
var predict_js_1 = require("./ml/predict.js");
Object.defineProperty(exports, "MLPredictor", { enumerable: true, get: function () { return predict_js_1.MLPredictor; } });
var features_js_1 = require("./ml/features.js");
Object.defineProperty(exports, "extractFeatures", { enumerable: true, get: function () { return features_js_1.extractFeatures; } });
Object.defineProperty(exports, "getFeatureNames", { enumerable: true, get: function () { return features_js_1.getFeatureNames; } });
// USA Pricing
var aggregator_usa_1 = require("./aggregator-usa");
Object.defineProperty(exports, "USAPriceAggregator", { enumerable: true, get: function () { return aggregator_usa_1.USAPriceAggregator; } });
Object.defineProperty(exports, "getUSAPriceColor", { enumerable: true, get: function () { return aggregator_usa_1.getUSAPriceColor; } });
Object.defineProperty(exports, "USA_LEGEND_ITEMS", { enumerable: true, get: function () { return aggregator_usa_1.USA_LEGEND_ITEMS; } });
var coefficients_usa_1 = require("./coefficients-usa");
Object.defineProperty(exports, "USA_COEFFICIENTS", { enumerable: true, get: function () { return coefficients_usa_1.USA_COEFFICIENTS; } });
Object.defineProperty(exports, "getUSACoefficients", { enumerable: true, get: function () { return coefficients_usa_1.getUSACoefficients; } });
//# sourceMappingURL=index.js.map