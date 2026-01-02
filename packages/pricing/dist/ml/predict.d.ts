import type { MLFeatures } from '../types.js';
/**
 * Tree node structure from exported model
 */
interface TreeNode {
    feature: number[];
    threshold: number[];
    children_left: number[];
    children_right: number[];
    value: number[];
}
/**
 * Exported GBM model structure
 */
interface GBMModel {
    type: 'gradient_boosting';
    n_estimators: number;
    feature_names: string[];
    trees: TreeNode[];
    initial_prediction: number;
    learning_rate: number;
}
/**
 * ML Predictor - Stage B
 *
 * Performs inference using exported Gradient Boosting model.
 * Model weights are loaded from JSON file (exported from Python).
 */
export declare class MLPredictor {
    private model;
    private featureNames;
    constructor(modelData?: GBMModel);
    /**
     * Load model from JSON file
     */
    private loadModel;
    /**
     * Predict price per square meter
     *
     * @param features - ML features (as object)
     * @returns Predicted price in €/m²
     */
    predict(features: MLFeatures): number;
    /**
     * Get confidence score for prediction
     *
     * @param features - ML features
     * @returns Confidence score 0-1
     */
    getConfidence(features: MLFeatures): number;
    /**
     * Convert features object to vector in correct order
     */
    private featuresToVector;
    /**
     * Traverse decision tree to get leaf value
     */
    private traverseTree;
    /**
     * Get model metadata
     */
    getModelInfo(): {
        estimators: number;
        features: string[];
    };
    /**
     * Check if model is loaded
     */
    isReady(): boolean;
}
export {};
//# sourceMappingURL=predict.d.ts.map