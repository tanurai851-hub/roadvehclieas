"""
Machine Learning Pipeline for Road Vehicle Analytical System
Complete ML pipeline with training, evaluation, and prediction capabilities
"""

import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.metrics import (
    accuracy_score, precision_score, recall_score, f1_score,
    mean_absolute_error, mean_squared_error, r2_score,
    confusion_matrix, classification_report
)
from sklearn.linear_model import LogisticRegression, LinearRegression
from sklearn.tree import DecisionTreeClassifier, DecisionTreeRegressor
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
from sklearn.neighbors import KNeighborsClassifier
from sklearn.naive_bayes import GaussianNB
from sklearn.svm import SVC
from sklearn.cluster import KMeans, DBSCAN, AgglomerativeClustering
import xgboost as xgb
import joblib
import os
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class VehicleMLPipeline:
    """
    Complete ML pipeline for vehicle data analysis
    Handles classification, regression, and clustering tasks
    """
    
    def __init__(self):
        self.label_encoders = {}
        self.scaler = StandardScaler()
        self.classification_models = {}
        self.regression_models = {}
        self.clustering_models = {}
        self.classification_results = {}
        self.regression_results = {}
        self.feature_importance = {}
        
    def generate_sample_data(self, n_samples=1000):
        """Generate synthetic vehicle dataset for demonstration"""
        np.random.seed(42)
        
        vehicle_types = ['Sedan', 'SUV', 'Hatchback', 'Truck', 'Motorcycle', 'Bus']
        fuel_types = ['Petrol', 'Diesel', 'Electric', 'Hybrid', 'CNG']
        road_conditions = ['Highway', 'City', 'Rural']
        traffic_density = ['Low', 'Medium', 'High', 'Very High']
        weather = ['Clear', 'Rainy', 'Foggy', 'Snowy']
        
        data = {
            'vehicleType': np.random.choice(vehicle_types, n_samples),
            'vehicleAge': np.random.randint(0, 15, n_samples),
            'fuelType': np.random.choice(fuel_types, n_samples, p=[0.40, 0.30, 0.12, 0.10, 0.08]),
            'engineCapacity': np.random.uniform(0.5, 4.5, n_samples).round(1),
            'mileage': np.random.randint(1000, 350000, n_samples),
            'speed': np.random.randint(20, 140, n_samples),
            'roadCondition': np.random.choice(road_conditions, n_samples),
            'driverAge': np.random.randint(18, 70, n_samples),
            'trafficDensity': np.random.choice(traffic_density, n_samples),
            'weatherCondition': np.random.choice(weather, n_samples, p=[0.5, 0.25, 0.15, 0.10]),
            'accidentHistory': np.random.poisson(0.3, n_samples),
            'serviceFrequency': np.random.randint(0, 6, n_samples),
        }
        
        df = pd.DataFrame(data)
        
        # Generate target variables
        # Maintenance Cost (regression target)
        df['maintenanceCost'] = (
            5000 + df['vehicleAge'] * 3000 + 
            df['mileage'] * 0.08 + 
            df['accidentHistory'] * 5000 +
            np.random.normal(0, 5000, n_samples)
        ).round(2)
        
        # Fuel Consumption (regression target)
        df['fuelConsumption'] = np.where(
            df['fuelType'] == 'Electric', 0,
            np.where(df['fuelType'] == 'Hybrid',
                     5 + df['engineCapacity'] * 0.5 + np.random.normal(0, 0.5, n_samples),
                     7 + df['engineCapacity'] * 1.2 + np.random.normal(0, 0.8, n_samples))
        ).round(1)
        
        # Accident Risk (classification target)
        risk_score = (
            df['vehicleAge'] * 0.08 +
            df['mileage'] / 100000 * 0.12 +
            df['accidentHistory'] * 0.15 +
            df['speed'] * 0.005 +
            np.random.normal(0, 0.1, n_samples)
        )
        df['riskLevel'] = pd.cut(risk_score, 
                                 bins=[-np.inf, 0.3, 0.6, 0.8, np.inf],
                                 labels=['Low', 'Medium', 'High', 'Very High'])
        
        # Vehicle Condition (classification target)
        condition_score = (
            100 - df['vehicleAge'] * 5 -
            df['mileage'] / 100000 * 10 -
            df['accidentHistory'] * 15 +
            df['serviceFrequency'] * 5 +
            np.random.normal(0, 5, n_samples)
        )
        df['condition'] = pd.cut(condition_score,
                                 bins=[-np.inf, 20, 40, 60, 80, np.inf],
                                 labels=['Critical', 'Poor', 'Average', 'Good', 'Excellent'])
        
        return df
    
    def preprocess_data(self, df, target_col, task='classification'):
        """Preprocess data for ML tasks"""
        # Separate features and target
        X = df.drop(columns=[target_col])
        y = df[target_col]
        
        # Identify categorical columns
        cat_cols = X.select_dtypes(include=['object', 'category']).columns
        
        # Encode categorical features
        for col in cat_cols:
            if col not in self.label_encoders:
                self.label_encoders[col] = LabelEncoder()
            X[col] = self.label_encoders[col].fit_transform(X[col].astype(str))
        
        # Encode target if needed
        if task == 'classification':
            target_encoder = LabelEncoder()
            y = target_encoder.fit_transform(y)
            self.target_encoder = target_encoder
        else:
            target_encoder = LabelEncoder()
            y = target_encoder.fit_transform(y)
            self.target_encoder = target_encoder
        
        return X, y
    
    def train_classification_models(self, X_train, y_train, X_test, y_test):
        """Train all classification models"""
        logger.info("Training classification models...")
        
        classifiers = {
            'Logistic Regression': LogisticRegression(max_iter=1000, random_state=42),
            'Decision Tree': DecisionTreeClassifier(random_state=42),
            'Random Forest': RandomForestClassifier(n_estimators=100, random_state=42),
            'KNN': KNeighborsClassifier(n_neighbors=5),
            'Naive Bayes': GaussianNB(),
            'SVM': SVC(kernel='rbf', probability=True, random_state=42),
            'XGBoost': xgb.XGBClassifier(n_estimators=100, learning_rate=0.1, random_state=42)
        }
        
        results = {}
        for name, model in classifiers.items():
            logger.info(f"Training {name}...")
            model.fit(X_train, y_train)
            y_pred = model.predict(X_test)
            
            results[name] = {
                'accuracy': float(accuracy_score(y_test, y_pred)),
                'precision': float(precision_score(y_test, y_pred, average='weighted', zero_division=0)),
                'recall': float(recall_score(y_test, y_pred, average='weighted', zero_division=0)),
                'f1Score': float(f1_score(y_test, y_pred, average='weighted', zero_division=0)),
                'model': model
            }
            self.classification_models[name] = model
            
            logger.info(f"{name} - Accuracy: {results[name]['accuracy']:.4f}")
        
        self.classification_results = results
        return results
    
    def train_regression_models(self, X_train, y_train, X_test, y_test):
        """Train all regression models"""
        logger.info("Training regression models...")
        
        regressors = {
            'Linear Regression': LinearRegression(),
            'Random Forest Regressor': RandomForestRegressor(n_estimators=100, random_state=42),
            'Decision Tree Regressor': DecisionTreeRegressor(random_state=42),
            'XGBoost Regressor': xgb.XGBRegressor(n_estimators=100, learning_rate=0.1, random_state=42)
        }
        
        results = {}
        for name, model in regressors.items():
            logger.info(f"Training {name}...")
            model.fit(X_train, y_train)
            y_pred = model.predict(X_test)
            
            results[name] = {
                'mae': float(mean_absolute_error(y_test, y_pred)),
                'mse': float(mean_squared_error(y_test, y_pred)),
                'rmse': float(np.sqrt(mean_squared_error(y_test, y_pred))),
                'r2Score': float(r2_score(y_test, y_pred)),
                'model': model
            }
            self.regression_models[name] = model
            
            logger.info(f"{name} - R² Score: {results[name]['r2Score']:.4f}")
        
        self.regression_results = results
        return results
    
    def perform_clustering(self, X, n_clusters=4):
        """Perform clustering on vehicle data"""
        logger.info("Performing clustering...")
        
        # K-Means
        kmeans = KMeans(n_clusters=n_clusters, random_state=42, n_init=10)
        kmeans_labels = kmeans.fit_predict(X)
        
        # DBSCAN
        dbscan = DBSCAN(eps=0.5, min_samples=5)
        dbscan_labels = dbscan.fit_predict(X)
        
        # Hierarchical Clustering
        hierarchical = AgglomerativeClustering(n_clusters=n_clusters)
        hierarchical_labels = hierarchical.fit_predict(X)
        
        self.clustering_models = {
            'kmeans': kmeans,
            'dbscan': dbscan,
            'hierarchical': hierarchical
        }
        
        return {
            'kmeans': {
                'labels': kmeans_labels.tolist(),
                'cluster_centers': kmeans.cluster_centers_.tolist(),
                'inertia': float(kmeans.inertia_)
            },
            'dbscan': {
                'labels': dbscan_labels.tolist(),
                'n_clusters': len(set(dbscan_labels)) - (1 if -1 in dbscan_labels else 0),
                'n_noise': list(dbscan_labels).count(-1)
            },
            'hierarchical': {
                'labels': hierarchical_labels.tolist(),
                'n_clusters': n_clusters
            }
        }
    
    def get_feature_importance(self, model, feature_names):
        """Extract feature importance from tree-based models"""
        if hasattr(model, 'feature_importances_'):
            importance = model.feature_importances_
            return dict(sorted(zip(feature_names, importance), key=lambda x: x[1], reverse=True))
        return None
    
    def run_pipeline(self, df=None, n_samples=500):
        """Run the complete ML pipeline"""
        if df is None:
            logger.info("Generating sample data...")
            df = self.generate_sample_data(n_samples)
        
        logger.info(f"Dataset shape: {df.shape}")
        logger.info(f"Columns: {df.columns.tolist()}")
        
        results = {}
        
        # --- Classification: Predict Accident Risk ---
        logger.info("\n=== Classification: Accident Risk Prediction ===")
        X_cls, y_cls = self.preprocess_data(df, 'riskLevel', 'classification')
        X_train, X_test, y_train, y_test = train_test_split(
            X_cls, y_cls, test_size=0.2, random_state=42
        )
        X_train_scaled = self.scaler.fit_transform(X_train)
        X_test_scaled = self.scaler.transform(X_test)
        
        cls_results = self.train_classification_models(X_train_scaled, y_train, X_test_scaled, y_test)
        results['classification'] = {
            name: {k: v for k, v in metrics.items() if k != 'model'}
            for name, metrics in cls_results.items()
        }
        
        # Feature importance from best model
        best_cls_name = max(cls_results, key=lambda x: cls_results[x]['accuracy'])
        best_cls_model = cls_results[best_cls_name]['model']
        importance = self.get_feature_importance(best_cls_model, X_cls.columns)
        if importance:
            self.feature_importance['classification'] = importance
            results['feature_importance'] = importance
        
        # --- Regression: Predict Maintenance Cost ---
        logger.info("\n=== Regression: Maintenance Cost Prediction ===")
        X_reg, y_reg = self.preprocess_data(df, 'maintenanceCost', 'regression')
        X_train_r, X_test_r, y_train_r, y_test_r = train_test_split(
            X_reg, y_reg, test_size=0.2, random_state=42
        )
        X_train_r_scaled = self.scaler.fit_transform(X_train_r)
        X_test_r_scaled = self.scaler.transform(X_test_r)
        
        reg_results = self.train_regression_models(X_train_r_scaled, y_train_r, X_test_r_scaled, y_test_r)
        results['regression'] = {
            name: {k: v for k, v in metrics.items() if k != 'model'}
            for name, metrics in reg_results.items()
        }
        
        # --- Clustering ---
        logger.info("\n=== Clustering: Vehicle Segmentation ===")
        # Use all features for clustering
        X_all = df.select_dtypes(include=[np.number]).drop(columns=['maintenanceCost', 'fuelConsumption'])
        X_all_scaled = self.scaler.fit_transform(X_all)
        clustering_results = self.perform_clustering(X_all_scaled)
        results['clustering'] = clustering_results
        
        # Best model identification
        best_classifier = max(cls_results.items(), key=lambda x: x[1]['accuracy'])
        best_regressor = max(reg_results.items(), key=lambda x: x[1]['r2Score'])
        
        results['summary'] = {
            'best_classifier': {
                'name': best_classifier[0],
                'accuracy': best_classifier[1]['accuracy']
            },
            'best_regressor': {
                'name': best_regressor[0],
                'r2_score': best_regressor[1]['r2Score']
            },
            'total_models_trained': len(cls_results) + len(reg_results) + 3,
            'dataset_size': len(df)
        }
        
        logger.info(f"\n=== Pipeline Complete ===")
        logger.info(f"Best Classifier: {best_classifier[0]} ({best_classifier[1]['accuracy']:.2%})")
        logger.info(f"Best Regressor: {best_regressor[0]} (R²: {best_regressor[1]['r2Score']:.4f})")
        
        return results
    
    def save_models(self, path='models/'):
        """Save trained models to disk"""
        os.makedirs(path, exist_ok=True)
        
        for name, model in self.classification_models.items():
            joblib.dump(model, f"{path}cls_{name.replace(' ', '_').lower()}.joblib")
        
        for name, model in self.regression_models.items():
            joblib.dump(model, f"{path}reg_{name.replace(' ', '_').lower()}.joblib")
        
        for name, model in self.clustering_models.items():
            joblib.dump(model, f"{path}cluster_{name}.joblib")
        
        joblib.dump(self.scaler, f"{path}scaler.joblib")
        joblib.dump(self.label_encoders, f"{path}label_encoders.joblib")
        
        logger.info(f"Models saved to {path}")


if __name__ == "__main__":
    # Run the pipeline
    pipeline = VehicleMLPipeline()
    results = pipeline.run_pipeline(n_samples=1000)
    
    print("\n" + "="*60)
    print("ML PIPELINE RESULTS")
    print("="*60)
    
    print("\n--- Classification Results ---")
    for name, metrics in results['classification'].items():
        print(f"{name:25s} | Acc: {metrics['accuracy']:.4f} | Prec: {metrics['precision']:.4f} | Rec: {metrics['recall']:.4f} | F1: {metrics['f1Score']:.4f}")
    
    print("\n--- Regression Results ---")
    for name, metrics in results['regression'].items():
        print(f"{name:25s} | MAE: {metrics['mae']:.2f} | MSE: {metrics['mse']:.2f} | RMSE: {metrics['rmse']:.2f} | R²: {metrics['r2Score']:.4f}")
    
    print("\n--- Clustering Results ---")
    print(f"K-Means: {results['clustering']['kmeans']['inertia']:.2f} inertia")
    print(f"DBSCAN: {results['clustering']['dbscan']['n_clusters']} clusters, {results['clustering']['dbscan']['n_noise']} noise points")
    
    print("\n--- Summary ---")
    print(f"Best Classifier: {results['summary']['best_classifier']['name']} ({results['summary']['best_classifier']['accuracy']:.2%})")
    print(f"Best Regressor: {results['summary']['best_regressor']['name']} (R²: {results['summary']['best_regressor']['r2_score']:.4f})")
    print(f"Total Models Trained: {results['summary']['total_models_trained']}")
    
    # Save models
    pipeline.save_models()
