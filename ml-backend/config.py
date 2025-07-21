import os
from datetime import timedelta

class Config:
    """Application configuration"""
    
    # Flask settings
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'your-secret-key-here'
    DEBUG = os.environ.get('DEBUG', 'True').lower() == 'true'
    
    # File upload settings
    UPLOAD_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'data', 'uploads')
    MODEL_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'data', 'models')
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16MB max file size
    
    # Allowed file extensions
    ALLOWED_EXTENSIONS = {'csv'}
    
    # Model settings
    MODEL_RETRAIN_INTERVAL = timedelta(days=7)  # Retrain model weekly
    PREDICTION_HORIZON = 12  # months
    
    # Chatbot settings
    CHATBOT_CONFIDENCE_THRESHOLD = 0.7
    MAX_RESPONSE_LENGTH = 500
    
    # Data validation settings
    MIN_DATA_POINTS = 30  # Minimum records required for training
    REQUIRED_COLUMNS = ['date', 'quantity_sold']
    
    # Inventory thresholds
    OVERSTOCK_THRESHOLD = 2.0  # 2x average monthly sales
    UNDERSTOCK_THRESHOLD = 0.5  # 0.5x average monthly sales
    LOW_VELOCITY_THRESHOLD = 0.1  # Items selling less than 10% of average
    
    # API settings
    API_RATE_LIMIT = 100  # requests per minute
    API_TIMEOUT = 30  # seconds
    
    @staticmethod
    def init_app(app):
        """Initialize application with config"""
        pass

class DevelopmentConfig(Config):
    """Development configuration"""
    DEBUG = True
    
class ProductionConfig(Config):
    """Production configuration"""
    DEBUG = False
    
class TestingConfig(Config):
    """Testing configuration"""
    TESTING = True
    DEBUG = True

# Configuration mapping
config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'testing': TestingConfig,
    'default': DevelopmentConfig
}