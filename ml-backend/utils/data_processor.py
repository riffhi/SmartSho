import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import logging
import re
from typing import Dict, Any, Optional

logger = logging.getLogger(__name__)

class DataProcessor:
    """Data processing utilities for sales data"""
    
    def __init__(self):
        self.column_mappings = {
            'date': ['date', 'Date', 'DATE', 'sales_date', 'transaction_date', 'order_date'],
            'product_id': ['product_id', 'Product_ID', 'PRODUCT_ID', 'sku', 'SKU', 'item_id', 'product_code'],
            'product_name': ['product_name', 'Product_Name', 'PRODUCT_NAME', 'item_name', 'product', 'name'],
            'quantity_sold': ['quantity_sold', 'Quantity_Sold', 'QUANTITY_SOLD', 'quantity', 'qty', 'units_sold', 'sales_quantity'],
            'price': ['price', 'Price', 'PRICE', 'unit_price', 'selling_price', 'cost'],
            'category': ['category', 'Category', 'CATEGORY', 'product_category', 'type', 'group']
        }
        self.data = None  # ✅ Initialize attribute to hold processed data

    def load_and_process_csv(self, filepath: str) -> pd.DataFrame:
        """Load and process CSV file"""
        try:
            encodings = ['utf-8', 'latin-1', 'cp1252']
            df = None
            
            for encoding in encodings:
                try:
                    df = pd.read_csv(filepath, encoding=encoding)
                    logger.info(f"Successfully loaded CSV with {encoding} encoding")
                    break
                except UnicodeDecodeError:
                    continue
            
            if df is None:
                raise ValueError("Could not read CSV file with any supported encoding")
            
            logger.info(f"Loaded CSV with {len(df)} rows and {len(df.columns)} columns")
            
            df = self._standardize_columns(df)
            df = self._clean_data(df)
            self._validate_required_columns(df)
            df = self._process_dates(df)
            df = self._process_numeric_columns(df)
            df = self._add_derived_features(df)

            self.data = df  # ✅ Store processed data for chatbot use
            logger.info(f"Data processing completed. Final shape: {df.shape}")
            return df

        except Exception as e:
            logger.error(f"Error processing CSV: {str(e)}")
            raise

    def _standardize_columns(self, df: pd.DataFrame) -> pd.DataFrame:
        df_copy = df.copy()
        column_mapping = {}

        for standard_name, variations in self.column_mappings.items():
            for col in df_copy.columns:
                if col in variations:
                    column_mapping[col] = standard_name
                    break

        df_copy = df_copy.rename(columns=column_mapping)
        df_copy.columns = [col.strip().lower().replace(' ', '_') for col in df_copy.columns]
        logger.info(f"Standardized columns: {list(df_copy.columns)}")
        return df_copy

    def _clean_data(self, df: pd.DataFrame) -> pd.DataFrame:
        df_copy = df.dropna(how='all').drop_duplicates()

        if 'product_id' in df_copy.columns:
            df_copy['product_id'] = df_copy['product_id'].fillna('UNKNOWN')
        if 'product_name' in df_copy.columns:
            df_copy['product_name'] = df_copy['product_name'].fillna('Unknown Product')

        for col in df_copy.select_dtypes(include=['object']).columns:
            if col != 'date':
                df_copy[col] = df_copy[col].astype(str).str.strip()
        return df_copy

    def _validate_required_columns(self, df: pd.DataFrame):
        required_columns = ['quantity_sold']
        missing = [col for col in required_columns if col not in df.columns]
        if missing:
            raise ValueError(f"Missing required columns: {missing}")

    def _process_dates(self, df: pd.DataFrame) -> pd.DataFrame:
        df_copy = df.copy()
        if 'date' in df_copy.columns:
            df_copy['date'] = pd.to_datetime(df_copy['date'], errors='coerce')
            invalid_dates = df_copy['date'].isna().sum()
            if invalid_dates > 0:
                logger.warning(f"Removed {invalid_dates} invalid dates")
                df_copy = df_copy.dropna(subset=['date'])
            df_copy = df_copy.sort_values('date')
            logger.info(f"Date range: {df_copy['date'].min()} to {df_copy['date'].max()}")
        return df_copy

    def _process_numeric_columns(self, df: pd.DataFrame) -> pd.DataFrame:
        df_copy = df.copy()
        numeric_columns = ['quantity_sold', 'price']

        for col in numeric_columns:
            if col in df_copy.columns:
                df_copy[col] = df_copy[col].astype(str).str.replace(r'[^\d.-]', '', regex=True)
                df_copy[col] = pd.to_numeric(df_copy[col], errors='coerce').fillna(0)
                if col == 'quantity_sold':
                    df_copy[col] = df_copy[col].abs()
                logger.info(f"{col} stats — Min: {df_copy[col].min()}, Max: {df_copy[col].max()}, Mean: {df_copy[col].mean():.2f}")
        return df_copy

    def _add_derived_features(self, df: pd.DataFrame) -> pd.DataFrame:
        df_copy = df.copy()

        if 'price' in df_copy.columns and 'quantity_sold' in df_copy.columns:
            df_copy['revenue'] = df_copy['quantity_sold'] * df_copy['price']

        if 'date' in df_copy.columns:
            df_copy['year'] = df_copy['date'].dt.year
            df_copy['month'] = df_copy['date'].dt.month
            df_copy['day'] = df_copy['date'].dt.day
            df_copy['day_of_week'] = df_copy['date'].dt.dayofweek
            df_copy['quarter'] = df_copy['date'].dt.quarter
            df_copy['is_weekend'] = df_copy['day_of_week'].isin([5, 6]).astype(int)

        if 'product_id' not in df_copy.columns and 'product_name' in df_copy.columns:
            df_copy['product_id'] = df_copy['product_name'].astype('category').cat.codes
        
        return df_copy

    def get_product_data(self, product_id: str) -> pd.DataFrame:
        """Retrieve filtered data for a given product ID"""
        if self.data is None:
            return pd.DataFrame()

        df_copy = self.data.copy()
        df_copy = df_copy[df_copy['product_id'].astype(str).str.upper() == product_id.upper()]

        if 'quantity_sold' in df_copy.columns:
            df_copy['sales'] = df_copy['quantity_sold']

        # Optional: add fake stock_level if not present
        if 'stock_level' not in df_copy.columns:
            df_copy['stock_level'] = 100  # mock default

        return df_copy
