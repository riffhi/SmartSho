import pandas as pd
import numpy as np
from datetime import datetime
import logging
from typing import Dict, Any

logger = logging.getLogger(__name__)

class DataValidator:
    """Data validation utilities for sales data"""
    
    def __init__(self):
        self.min_records = 30
        self.required_columns = ['quantity_sold']
        self.optional_columns = ['date', 'product_id', 'product_name', 'price', 'category']
    
    def validate_sales_data(self, df: pd.DataFrame) -> Dict[str, Any]:
        """Comprehensive validation of sales data"""
        validation_result = {
            'valid': True,
            'errors': [],
            'warnings': [],
            'summary': {}
        }
        
        try:
            # Basic structure validation
            self._validate_structure(df, validation_result)
            
            # Column validation
            self._validate_columns(df, validation_result)
            
            # Data quality validation
            self._validate_data_quality(df, validation_result)
            
            # Business logic validation
            self._validate_business_logic(df, validation_result)
            
            # Set overall validity
            validation_result['valid'] = len(validation_result['errors']) == 0
            
            # Add summary
            validation_result['summary'] = self._generate_summary(df)
            
            logger.info(f"Validation completed. Valid: {validation_result['valid']}")
            
        except Exception as e:
            validation_result['valid'] = False
            validation_result['errors'].append(f"Validation error: {str(e)}")
            logger.error(f"Validation error: {str(e)}")
        
        return validation_result
    
    def _validate_structure(self, df: pd.DataFrame, result: Dict[str, Any]):
        if df.empty:
            result['errors'].append("Uploaded file is empty.")
            return
        if len(df) < self.min_records:
            result['warnings'].append(f"Only {len(df)} records found. At least {self.min_records} recommended.")
        empty_cols = df.columns[df.isnull().all()].tolist()
        if empty_cols:
            result['warnings'].append(f"Completely empty columns: {empty_cols}")
    
    def _validate_columns(self, df: pd.DataFrame, result: Dict[str, Any]):
        for col in self.required_columns:
            if col not in df.columns:
                result['errors'].append(f"Missing required column: {col}")
        for col in df.columns:
            if col not in self.required_columns + self.optional_columns:
                result['warnings'].append(f"Unexpected column: {col}")
    
    def _validate_data_quality(self, df: pd.DataFrame, result: Dict[str, Any]):
        if 'quantity_sold' in df.columns and (df['quantity_sold'] < 0).any():
            result['errors'].append("Negative quantity_sold values found.")
        if 'price' in df.columns and (df['price'] < 0).any():
            result['warnings'].append("Negative price values found.")
    
    def _validate_business_logic(self, df: pd.DataFrame, result: Dict[str, Any]):
        if 'date' in df.columns:
            try:
                df['date'] = pd.to_datetime(df['date'], errors='coerce')
                if df['date'].isnull().any():
                    result['warnings'].append("Some dates could not be parsed.")
                future_dates = df['date'] > datetime.now()
                if future_dates.any():
                    result['warnings'].append(f"{future_dates.sum()} records have future dates.")
            except Exception as e:
                result['warnings'].append(f"Date parsing failed: {e}")
    
    def _generate_summary(self, df: pd.DataFrame) -> Dict[str, Any]:
        summary = {
            'total_records': len(df),
            'products': df['product_id'].nunique() if 'product_id' in df.columns else 'N/A',
            'categories': df['category'].nunique() if 'category' in df.columns else 'N/A',
            'date_range': f"{df['date'].min().date()} to {df['date'].max().date()}" if 'date' in df.columns else 'N/A'
        }
        return summary
