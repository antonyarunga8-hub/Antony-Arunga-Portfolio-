from flask import Flask
from flask_cors import CORS
from config import Config
from models import db
from routes import api_bp

def create_app(config_class=Config):
    """Application factory pattern"""
    app = Flask(__name__)
    app.config.from_object(config_class)
    
    # Initialize extensions
    db.init_app(app)
    
    # Configure CORS with specific origins
    CORS(app, resources={
        r"/api/*": {
            "origins": app.config.get('CORS_ORIGINS', '*'),
            "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            "allow_headers": ["Content-Type", "Authorization"],
            "supports_credentials": True
        }
    })
    
    # Register blueprints
    app.register_blueprint(api_bp, url_prefix='/api')
    
    # Create database tables
    with app.app_context():
        db.create_all()
    
    return app

app = create_app()

@app.route('/')
def index():
    """Root endpoint"""
    return {
        'message': 'Portfolio Backend API',
        'version': '1.0',
        'status': 'running',
        'endpoints': {
            'projects': '/api/projects',
            'contact': '/api/contact',
            'health': '/api/health',
            'analytics': '/api/analytics/stats'
        }
    }

@app.route('/health')
def health():
    """Health check endpoint for Render"""
    return {'status': 'healthy', 'database': 'connected'}, 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
