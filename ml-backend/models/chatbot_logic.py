import re
import json
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
from typing import Dict, Any, Optional
import logging

logger = logging.getLogger(__name__)

class ChatbotLogic:
    def __init__(self, sales_model=None, data_processor=None):
        self.sales_model = sales_model
        self.data_processor = data_processor
        self.data = data_processor.data if data_processor else pd.DataFrame()

    def extract_product_name(self, message: str) -> Optional[str]:
        """Try to extract a known product name from the user message"""
        for name in self.data['product_name'].dropna().unique():
            if name.lower() in message.lower():
                return name
        return None

    def extract_product_id(self, message: str) -> Optional[str]:
        """Extract product ID from message (e.g., P001, A123)"""
        match = re.search(r'\b[A-Z]\d{3,}\b', message.upper())
        return match.group(0) if match else None

    def detect_intent(self, message: str) -> str:
        """Detect user intent from message"""
        message_lower = message.lower()
        if any(keyword in message_lower for keyword in ['stock', 'inventory', 'increase', 'decrease', 'should i']):
            return 'stock_recommendation'
        if any(keyword in message_lower for keyword in ['predict', 'forecast', 'future', 'expect']):
            return 'sales_prediction'
        if any(keyword in message_lower for keyword in ['analyze', 'analysis', 'performance', 'how is']):
            return 'product_analysis'
        return 'general_inquiry'

    def process_message(self, message: str) -> str:
        """Main method to process user message and return response"""
        try:
            product_id = self.extract_product_id(message)
            product_name = self.extract_product_name(message)
            logger.info(f"Extracted product ID: {product_id}")
            logger.info(f"Extracted product name: {product_name}")

            # Try resolving product name to ID if ID is missing
            if not product_id and product_name:
                match = self.data[self.data['product_name'].str.lower() == product_name.lower()]
                if not match.empty:
                    product_id = match['product_id'].iloc[0]
                    logger.info(f"Inferred product ID from name: {product_id}")

            if not product_id:
                return self._generic_help_response()

            if not self._has_product_data(product_id):
                return f"❌ I couldn't find sales data for product **{product_id}**. Please check the product ID or name or upload sales data containing this product."

            intent = self.detect_intent(message)
            logger.info(f"Detected intent: {intent}")

            if intent == 'stock_recommendation':
                return self._handle_stock_recommendation(product_id)
            elif intent == 'sales_prediction':
                return self._handle_sales_prediction(product_id)
            elif intent == 'product_analysis':
                return self._handle_product_analysis(product_id)
            else:
                return self._handle_general_product_query(product_id)

        except Exception as e:
            logger.error(f"Error processing message: {e}")
            return f"❌ I encountered an error while processing your request. Please try again."

    def _has_product_data(self, product_id: str) -> bool:
        if not self.data_processor:
            return False
        try:
            product_data = self.data_processor.get_product_data(product_id)
            return product_data is not None and len(product_data) > 0
        except:
            return False

    def _get_product_analysis(self, product_id: str) -> Dict[str, Any]:
        try:
            if not self.data_processor:
                return {'error': 'Data processor not available'}

            product_data = self.data_processor.get_product_data(product_id)
            if product_data is None or len(product_data) == 0:
                return {'error': f'No data for product {product_id}'}

            recent_data = product_data.tail(7)
            total_sales = product_data['sales'].sum()
            avg_daily_sales = product_data['sales'].mean()
            recent_avg_sales = recent_data['sales'].mean()

            if len(product_data) >= 2:
                recent_trend = recent_data['sales'].tail(3).mean()
                older_trend = product_data['sales'].tail(10).head(3).mean()
                trend = 'increasing' if recent_trend > older_trend * 1.1 else 'decreasing' if recent_trend < older_trend * 0.9 else 'stable'
            else:
                trend = 'stable'

            current_stock = product_data['stock_level'].iloc[-1] if 'stock_level' in product_data.columns else 0

            if self.sales_model:
                try:
                    prediction = self.sales_model.predict_sales(product_id, days_ahead=7)
                except:
                    prediction = {'predicted_sales': avg_daily_sales * 7, 'confidence': 0.7}
            else:
                prediction = {'predicted_sales': avg_daily_sales * 7, 'confidence': 0.7}

            return {
                'product_id': product_id,
                'total_sales': total_sales,
                'avg_daily_sales': avg_daily_sales,
                'recent_avg_sales': recent_avg_sales,
                'current_stock': current_stock,
                'trend': trend,
                'prediction': prediction,
                'data_points': len(product_data)
            }

        except Exception as e:
            logger.error(f"Error analyzing product {product_id}: {e}")
            return {'error': str(e)}

    def _handle_stock_recommendation(self, product_id: str) -> str:
        analysis = self._get_product_analysis(product_id)
        if 'error' in analysis:
            return f"❌ {analysis['error']}"

        avg_daily_sales = analysis['avg_daily_sales']
        current_stock = analysis['current_stock']
        trend = analysis['trend']
        predicted_sales = analysis['prediction']['predicted_sales']

        days_of_inventory = current_stock / avg_daily_sales if avg_daily_sales > 0 else float('inf')
        safety_stock = avg_daily_sales * 3
        recommended_stock = predicted_sales + safety_stock

        response = f"📊 **Stock Recommendation for {product_id}:**\n\n"

        if current_stock < recommended_stock * 0.8:
            urgency = "🔴 HIGH" if days_of_inventory < 5 else "🟡 MEDIUM"
            response += f"**RECOMMENDATION: INCREASE STOCK** (Urgency: {urgency})\n\n"
        elif current_stock > recommended_stock * 1.5:
            response += f"**RECOMMENDATION: REDUCE STOCK** 📉\n\n"
        else:
            response += f"**RECOMMENDATION: MAINTAIN CURRENT STOCK** ✅\n\n"

        response += (
            f"• Current stock: {current_stock:.0f} units\n"
            f"• Days of inventory: {days_of_inventory:.1f} days\n"
            f"• Recommended stock: {recommended_stock:.0f} units\n"
            f"• Average daily sales: {avg_daily_sales:.1f} units\n"
            f"• Predicted next 7 days: {predicted_sales:.0f} units\n"
        )

        trend_emojis = {'increasing': '📈', 'decreasing': '📉', 'stable': '📊'}
        response += f"\n{trend_emojis.get(trend, '📊')} **Sales Trend**: {trend.title()}"
        return response

    def _handle_sales_prediction(self, product_id: str) -> str:
        analysis = self._get_product_analysis(product_id)
        if 'error' in analysis:
            return f"❌ {analysis['error']}"

        prediction = analysis['prediction']
        avg_daily_sales = analysis['avg_daily_sales']
        trend = analysis['trend']

        response = f"📈 **Sales Prediction for {product_id}:**\n\n"
        response += f"• **Next 7 days**: {prediction['predicted_sales']:.0f} units\n"
        response += f"• **Daily average**: {prediction['predicted_sales']/7:.1f} units/day\n"
        response += f"• **Confidence**: {prediction['confidence']:.0%}\n"
        response += f"• **Historical daily average**: {avg_daily_sales:.1f} units\n"
        response += f"• **Current trend**: {trend.title()}\n"

        return response

    def _handle_product_analysis(self, product_id: str) -> str:
        analysis = self._get_product_analysis(product_id)
        if 'error' in analysis:
            return f"❌ {analysis['error']}"

        response = f"📊 **Product Analysis for {product_id}:**\n\n"
        response += f"• **Total sales**: {analysis['total_sales']:.0f} units\n"
        response += f"• **Average daily sales**: {analysis['avg_daily_sales']:.1f} units\n"
        response += f"• **Recent performance**: {analysis['recent_avg_sales']:.1f} units/day\n"
        response += f"• **Current stock**: {analysis['current_stock']:.0f} units\n"
        response += f"• **Sales trend**: {analysis['trend'].title()}\n"
        response += f"• **Data points**: {analysis['data_points']} days\n"
        return response

    def _handle_general_product_query(self, product_id: str) -> str:
        return f"💡 **I can help you with product {product_id}!**\n\n" \
               f"Ask me about:\n" \
               f"• 📦 Stock recommendations\n" \
               f"• 📈 Sales predictions\n" \
               f"• 📊 Product analysis\n\n"

    def _generic_help_response(self) -> str:
        return "🤖 **Sales Intelligence Assistant**\n\n" \
               "I can help you with inventory and sales decisions!\n\n" \
               "**To get started:**\n" \
               "• Mention a product ID (like P101, A123, etc.) or product name\n" \
               "• Ask about stock, predictions, or analysis\n\n" \
               "Examples:\n" \
               "• 'Should I increase stock for Men’s Sports Shoes?'\n" \
               "• 'Predict sales for LED Bulb'\n"

# Factory function
def create_chatbot(sales_model=None, data_processor=None):
    return ChatbotLogic(sales_model, data_processor)
