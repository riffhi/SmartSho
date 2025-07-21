from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import pandas as pd
import numpy as np
import os
import json
from datetime import datetime, timedelta
import logging
from werkzeug.utils import secure_filename

# Import custom modules
from models.sales_model import EnhancedSalesPredictionModel
from models.chatbot_logic import create_chatbot
from utils.data_processor import DataProcessor
from utils.validators import DataValidator

from config import Config

# Initialize Flask app
app = Flask(__name__)
app.config.from_object(Config)
CORS(app)

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Ensure directories exist
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
os.makedirs(app.config['MODEL_FOLDER'], exist_ok=True)

# Global variables
prediction_model = None
chatbot = None
current_data = None
processor = DataProcessor()

# Load saved model and data if available
def initialize_saved_model_and_data():
    global prediction_model, current_data, chatbot

    model_path = os.path.join(app.config['MODEL_FOLDER'], 'sales_model.pkl')
    data_path = os.path.join(app.config['UPLOAD_FOLDER'], 'sample_data.csv')

    if os.path.exists(model_path) and os.path.exists(data_path):
        try:
            current_data = processor.load_and_process_csv(data_path)
            prediction_model = EnhancedSalesPredictionModel()
            prediction_model.load_model(model_path)
            chatbot = create_chatbot(prediction_model, processor)
            logger.info("✅ Loaded saved model and data on startup.")
        except Exception as e:
            logger.warning(f"⚠️ Failed to load saved model or data: {e}")

initialize_saved_model_and_data()

@app.route('/')
def index():
    return send_from_directory('../frontend', 'index.html')

@app.route('/static/<path:filename>')
def serve_static(filename):
    return send_from_directory('../frontend/static', filename)

@app.route('/api/upload-csv', methods=['POST'])
def upload_csv():
    global prediction_model, chatbot, current_data

    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file provided'}), 400

        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400

        if not file.filename.lower().endswith('.csv'):
            return jsonify({'error': 'Please upload a CSV file'}), 400

        # Save as latest_data.csv for reloading
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], 'latest_data.csv')
        file.save(filepath)

        # Process and validate
        data = processor.load_and_process_csv(filepath)
        validator = DataValidator()
        validation_result = validator.validate_sales_data(data)

        if not validation_result['valid']:
            return jsonify({'error': 'Data validation failed', 'details': validation_result['errors']}), 400

        current_data = data

        # Train model
        prediction_model = EnhancedSalesPredictionModel()
        training_result = prediction_model.train_model(data)

        # Save model
        model_path = os.path.join(app.config['MODEL_FOLDER'], 'sales_model.pkl')
        prediction_model.save_model(model_path)

        # Init chatbot
        chatbot = create_chatbot(prediction_model, processor)

        logger.info(f"✅ Model trained with {len(data)} records")

        return jsonify({
            'message': 'Data uploaded and model trained successfully',
            'data_info': {
                'total_records': len(data),
                'date_range': f"{data['date'].min()} to {data['date'].max()}",
                'unique_products': data['product_id'].nunique() if 'product_id' in data.columns else 'N/A',
                'total_sales': float(data['quantity_sold'].sum()) if 'quantity_sold' in data.columns else 'N/A'
            },
            'model_performance': training_result
        })

    except Exception as e:
        logger.error(f"Error in upload_csv: {str(e)}")
        return jsonify({'error': f'Upload failed: {str(e)}'}), 500

@app.route('/api/chatbot', methods=['POST'])
def chatbot_endpoint():
    try:
        data = request.get_json()
        if not data or 'message' not in data:
            return jsonify({'error': 'Message is required'}), 400

        message = data['message'].strip()
        if not message:
            return jsonify({'error': 'Message cannot be empty'}), 400

        if not chatbot:
            return jsonify({
                'response': 'I need sales data to provide insights. Please upload a CSV file first.',
                'timestamp': datetime.now().isoformat()
            })

        response = chatbot.process_message(message)

        logger.info(f"User message: {message}")
        logger.info(f"Bot response: {response[:100]}...")

        return jsonify({
            'response': response,
            'timestamp': datetime.now().isoformat()
        })

    except Exception as e:
        logger.error(f"Error in chatbot endpoint: {e}")
        return jsonify({
            'error': 'An error occurred while processing your request',
            'timestamp': datetime.now().isoformat()
        }), 500

@app.route('/api/predict-monthly', methods=['POST'])
def predict_monthly():
    global prediction_model, current_data

    try:
        if prediction_model is None:
            return jsonify({'error': 'No model trained. Please upload data first.'}), 400

        request_data = request.get_json()
        months_ahead = request_data.get('months_ahead', 1)

        predictions = prediction_model.predict_monthly_sales(current_data, months_ahead)

        return jsonify({
            'predictions': predictions,
            'months_ahead': months_ahead,
            'generated_at': datetime.now().isoformat()
        })

    except Exception as e:
        logger.error(f"Error in predict_monthly: {str(e)}")
        return jsonify({'error': f'Prediction failed: {str(e)}'}), 500

@app.route('/api/model-status', methods=['GET'])
def model_status():
    global prediction_model, current_data

    status = {
        'model_trained': prediction_model is not None,
        'data_loaded': current_data is not None,
        'chatbot_ready': chatbot is not None
    }

    if current_data is not None:
        status['data_info'] = {
            'total_records': len(current_data),
            'date_range': f"{current_data['date'].min()} to {current_data['date'].max()}",
            'columns': list(current_data.columns)
        }

    return jsonify(status)

@app.route('/api/inventory-analysis', methods=['GET'])
def inventory_analysis():
    global chatbot

    try:
        if chatbot is None:
            return jsonify({'error': 'Chatbot not initialized. Please upload data first.'}), 400

        analysis = chatbot.get_inventory_analysis()

        return jsonify({
            'analysis': analysis,
            'generated_at': datetime.now().isoformat()
        })

    except Exception as e:
        logger.error(f"Error in inventory_analysis: {str(e)}")
        return jsonify({'error': f'Analysis failed: {str(e)}'}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat(),
        'version': '1.0.0'
    })

@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Endpoint not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    logger.info("🚀 Starting Sales Prediction Chatbot server...")
    # Changed port from 5000 to 5002 to avoid conflict
    app.run(debug=True, host='0.0.0.0', port=5002)