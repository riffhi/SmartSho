import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
import joblib
import logging
from datetime import datetime, timedelta
import warnings
warnings.filterwarnings('ignore')

logger = logging.getLogger(__name__)

class EnhancedSalesPredictionModel:
    """Enhanced sales prediction model with inventory analysis capabilities"""
    
    def __init__(self):
        self.model = None
        self.scaler = StandardScaler()
        self.label_encoders = {}
        self.feature_columns = []
        self.is_trained = False
        self.model_metrics = {}
        
    def _prepare_features(self, data):
        """Prepare features for model training"""
        df = data.copy()
        
        # Convert date column
        if 'date' in df.columns:
            df['date'] = pd.to_datetime(df['date'])
            df = df.sort_values('date')
        
        # Create time-based features
        if 'date' in df.columns:
            df['year'] = df['date'].dt.year
            df['month'] = df['date'].dt.month
            df['day'] = df['date'].dt.day
            df['day_of_week'] = df['date'].dt.dayofweek
            df['quarter'] = df['date'].dt.quarter
            df['is_weekend'] = df['day_of_week'].isin([5, 6]).astype(int)
        
        # Handle categorical variables
        categorical_cols = df.select_dtypes(include=['object']).columns
        categorical_cols = [col for col in categorical_cols if col not in ['date']]
        
        for col in categorical_cols:
            if col not in self.label_encoders:
                self.label_encoders[col] = LabelEncoder()
                df[col] = self.label_encoders[col].fit_transform(df[col].astype(str))
            else:
                df[col] = self.label_encoders[col].transform(df[col].astype(str))
        
        # Create lag features
        if 'quantity_sold' in df.columns and 'product_id' in df.columns:
            df['lag_1_sales'] = df.groupby('product_id')['quantity_sold'].shift(1)
            df['lag_7_sales'] = df.groupby('product_id')['quantity_sold'].shift(7)
            df['rolling_7_mean'] = df.groupby('product_id')['quantity_sold'].rolling(window=7).mean().reset_index(0, drop=True)
            df['rolling_30_mean'] = df.groupby('product_id')['quantity_sold'].rolling(window=30).mean().reset_index(0, drop=True)
        
        # Create price-based features if price column exists
        if 'price' in df.columns:
            df['revenue'] = df['quantity_sold'] * df['price']
            df['price_per_unit'] = df['price']
        
        # Fill missing values
        df = df.fillna(method='ffill').fillna(method='bfill').fillna(0)
        
        return df
    
    def train_model(self, data):
        """Train the prediction model"""
        try:
            logger.info("Starting model training...")
            
            # Prepare features
            df = self._prepare_features(data)
            
            # Define target variable
            target = 'quantity_sold'
            if target not in df.columns:
                raise ValueError(f"Target column '{target}' not found in data")
            
            # Select feature columns
            exclude_cols = ['date', target, 'product_name'] if 'product_name' in df.columns else ['date', target]
            feature_cols = [col for col in df.columns if col not in exclude_cols]
            
            X = df[feature_cols]
            y = df[target]
            
            # Store feature columns
            self.feature_columns = feature_cols
            
            # Split data
            X_train, X_test, y_train, y_test = train_test_split(
                X, y, test_size=0.2, random_state=42, shuffle=False
            )
            
            # Scale features
            X_train_scaled = self.scaler.fit_transform(X_train)
            X_test_scaled = self.scaler.transform(X_test)
            
            # Train Random Forest model
            self.model = RandomForestRegressor(
                n_estimators=100,
                max_depth=10,
                min_samples_split=5,
                min_samples_leaf=2,
                random_state=42,
                n_jobs=-1
            )
            
            self.model.fit(X_train_scaled, y_train)
            
            # Evaluate model
            y_pred = self.model.predict(X_test_scaled)
            
            # Calculate metrics
            self.model_metrics = {
                'mae': mean_absolute_error(y_test, y_pred),
                'mse': mean_squared_error(y_test, y_pred),
                'rmse': np.sqrt(mean_squared_error(y_test, y_pred)),
                'r2': r2_score(y_test, y_pred),
                'mape': np.mean(np.abs((y_test - y_pred) / y_test)) * 100
            }
            
            # Cross-validation
            cv_scores = cross_val_score(self.model, X_train_scaled, y_train, cv=5, scoring='neg_mean_absolute_error')
            self.model_metrics['cv_mae'] = -cv_scores.mean()
            self.model_metrics['cv_std'] = cv_scores.std()
            
            self.is_trained = True
            logger.info(f"Model trained successfully. R² score: {self.model_metrics['r2']:.4f}")
            
            return self.model_metrics
            
        except Exception as e:
            logger.error(f"Error training model: {str(e)}")
            raise
    
    def predict_monthly_sales(self, data, months_ahead=1):
        """Predict monthly sales for all products"""
        if not self.is_trained:
            raise ValueError("Model not trained. Please train the model first.")
        
        try:
            df = self._prepare_features(data)
            
            # Get latest data for each product
            latest_data = df.groupby('product_id').tail(1) if 'product_id' in df.columns else df.tail(1)
            
            predictions = []
            
            for _, row in latest_data.iterrows():
                # Create features for prediction
                features = row[self.feature_columns].values.reshape(1, -1)
                features_scaled = self.scaler.transform(features)
                
                # Make prediction
                pred = self.model.predict(features_scaled)[0]
                
                # Calculate inventory status
                historical_avg = df[df['product_id'] == row['product_id']]['quantity_sold'].mean() if 'product_id' in df.columns else df['quantity_sold'].mean()
                
                inventory_status = self._determine_inventory_status(pred, historical_avg)
                
                prediction_info = {
                    'product_id': row.get('product_id', 'Unknown'),
                    'product_name': row.get('product_name', 'Unknown'),
                    'predicted_sales': float(pred),
                    'historical_average': float(historical_avg),
                    'inventory_status': inventory_status,
                    'recommendation': self._get_recommendation(inventory_status, pred, historical_avg),
                    'confidence': self._calculate_confidence(features_scaled)
                }
                
                predictions.append(prediction_info)
            
            return predictions
            
        except Exception as e:
            logger.error(f"Error making predictions: {str(e)}")
            raise
    
    def _determine_inventory_status(self, predicted_sales, historical_avg):
        """Determine inventory status based on predictions"""
        if predicted_sales > historical_avg * 1.5:
            return "high_demand"
        elif predicted_sales < historical_avg * 0.5:
            return "low_demand"
        elif predicted_sales < historical_avg * 0.3:
            return "overstock"
        else:
            return "normal"
    
    def _get_recommendation(self, status, predicted_sales, historical_avg):
        """Get inventory recommendation"""
        recommendations = {
            "high_demand": f"Increase inventory. Predicted sales ({predicted_sales:.1f}) exceed historical average ({historical_avg:.1f}). Consider restocking.",
            "low_demand": f"Reduce inventory. Predicted sales ({predicted_sales:.1f}) are below historical average ({historical_avg:.1f}). Monitor closely.",
            "overstock": f"Significant overstock risk. Predicted sales ({predicted_sales:.1f}) are much lower than historical average ({historical_avg:.1f}). Consider promotions.",
            "normal": f"Maintain current inventory levels. Predicted sales ({predicted_sales:.1f}) are within normal range."
        }
        return recommendations.get(status, "No specific recommendation")
    
    def _calculate_confidence(self, features):
        """Calculate prediction confidence"""
        # Simple confidence based on model variance
        if hasattr(self.model, 'estimators_'):
            predictions = np.array([tree.predict(features)[0] for tree in self.model.estimators_])
            confidence = 1 - (np.std(predictions) / np.mean(predictions))
            return max(0, min(1, confidence))
        return 0.8  # Default confidence
    
    def get_feature_importance(self):
        """Get feature importance from the trained model"""
        if not self.is_trained:
            raise ValueError("Model not trained")
        
        if hasattr(self.model, 'feature_importances_'):
            importance_df = pd.DataFrame({
                'feature': self.feature_columns,
                'importance': self.model.feature_importances_
            }).sort_values('importance', ascending=False)
            
            return importance_df.to_dict('records')
        
        return []
    
    def save_model(self, filepath):
        """Save the trained model"""
        if not self.is_trained:
            raise ValueError("Model not trained")
        
        model_data = {
            'model': self.model,
            'scaler': self.scaler,
            'label_encoders': self.label_encoders,
            'feature_columns': self.feature_columns,
            'model_metrics': self.model_metrics
        }
        
        joblib.dump(model_data, filepath)
        logger.info(f"Model saved to {filepath}")
    
    def load_model(self, filepath):
        """Load a trained model"""
        model_data = joblib.load(filepath)
        
        self.model = model_data['model']
        self.scaler = model_data['scaler']
        self.label_encoders = model_data['label_encoders']
        self.feature_columns = model_data['feature_columns']
        self.model_metrics = model_data['model_metrics']
        self.is_trained = True
        
        logger.info(f"Model loaded from {filepath}")
    
    def get_model_info(self):
        """Get model information"""
        if not self.is_trained:
            return {"status": "not_trained"}
        
        return {
            "status": "trained",
            "metrics": self.model_metrics,
            "feature_count": len(self.feature_columns),
            "features": self.feature_columns
        }