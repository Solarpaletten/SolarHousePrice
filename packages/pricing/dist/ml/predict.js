"use strict";
// ============================================================
// @solar/pricing - ML Predictor
// Phase 5: Stage B - JavaScript Inference
// ============================================================
// Uses exported model weights from Python training
// Implements Gradient Boosting tree traversal in JS
// ============================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.MLPredictor = void 0;
const features_js_1 = require("./features.js");
/**
 * Default model (placeholder until training)
 * This will be replaced by model.json after training
 */
const DEFAULT_MODEL = {
    type: 'gradient_boosting',
    n_estimators: 1,
    feature_names: (0, features_js_1.getFeatureNames)(),
    trees: [
        {
            // Simple tree: if aggregated_price_sqm > 6500, predict slightly higher
            feature: [10, -2, -2], // index 10 = aggregated_price_sqm
            threshold: [6500, 0, 0],
            children_left: [1, -1, -1],
            children_right: [2, -1, -1],
            value: [0, -200, 200], // adjust by ±200
        },
    ],
    initial_prediction: 6500,
    learning_rate: 0.1,
};
/**
 * ML Predictor - Stage B
 *
 * Performs inference using exported Gradient Boosting model.
 * Model weights are loaded from JSON file (exported from Python).
 */
class MLPredictor {
    model;
    featureNames;
    constructor(modelData) {
        // Try to load model.json, fall back to default
        this.model = modelData ?? this.loadModel();
        this.featureNames = this.model.feature_names;
    }
    /**
     * Load model from JSON file
     */
    loadModel() {
        try {
            // In production, this would load from model.json
            // For now, use default placeholder model
            return DEFAULT_MODEL;
        }
        catch (error) {
            console.warn('Could not load ML model, using default:', error);
            return DEFAULT_MODEL;
        }
    }
    /**
     * Predict price per square meter
     *
     * @param features - ML features (as object)
     * @returns Predicted price in €/m²
     */
    predict(features) {
        // Convert features object to array in correct order
        const featureVector = this.featuresToVector(features);
        // Start with initial prediction (mean of training data)
        let prediction = this.model.initial_prediction;
        // Add predictions from each tree
        for (const tree of this.model.trees) {
            const treeValue = this.traverseTree(tree, featureVector);
            prediction += this.model.learning_rate * treeValue;
        }
        // Round to integer
        return Math.round(prediction);
    }
    /**
     * Get confidence score for prediction
     *
     * @param features - ML features
     * @returns Confidence score 0-1
     */
    getConfidence(features) {
        let confidence = 0.7; // ML base confidence
        // Boost confidence based on data quality
        if (features.nearby_listings_count >= 5) {
            confidence += 0.1;
        }
        if (features.area_sqm > 0) {
            confidence += 0.05;
        }
        if (features.aggregated_price_sqm > 0) {
            confidence += 0.1;
        }
        // Cap at 95%
        return Math.min(confidence, 0.95);
    }
    /**
     * Convert features object to vector in correct order
     */
    featuresToVector(features) {
        return this.featureNames.map((name) => {
            const value = features[name];
            if (typeof value !== 'number') {
                console.warn(`Missing or invalid feature: ${name}`);
                return 0;
            }
            return value;
        });
    }
    /**
     * Traverse decision tree to get leaf value
     */
    traverseTree(tree, features) {
        let nodeId = 0;
        // Traverse until we reach a leaf node
        while (tree.children_left[nodeId] !== -1) {
            const featureIdx = tree.feature[nodeId];
            const threshold = tree.threshold[nodeId];
            // Go left or right based on feature value
            if (features[featureIdx] <= threshold) {
                nodeId = tree.children_left[nodeId];
            }
            else {
                nodeId = tree.children_right[nodeId];
            }
        }
        // Return leaf value
        return tree.value[nodeId];
    }
    /**
     * Get model metadata
     */
    getModelInfo() {
        return {
            estimators: this.model.n_estimators,
            features: this.model.feature_names,
        };
    }
    /**
     * Check if model is loaded
     */
    isReady() {
        return this.model !== null && this.model.trees.length > 0;
    }
}
exports.MLPredictor = MLPredictor;
//# sourceMappingURL=predict.js.map