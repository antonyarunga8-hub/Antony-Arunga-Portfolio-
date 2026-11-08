import os
from flask import Flask, send_from_directory
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
            "methods": ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
            "allow_headers": ["Content-Type", "Authorization"],
            "supports_credentials": True
        }
    })
    
    # Register blueprints
    app.register_blueprint(api_bp, url_prefix='/api')
    
    # Root & Health Endpoints
    @app.route('/')
    def index():
        return {
            'message': 'Portfolio Backend API — arungastudio',
            'version': '2.0',
            'status': 'running',
            'endpoints': {
                'projects': '/api/projects',
                'contact': '/api/contact',
                'health': '/health',
                'analytics': '/api/analytics/stats',
                'admin': '/admin'
            }
        }

    @app.route('/health')
    def health():
        return {'status': 'healthy', 'database': 'connected'}, 200

    @app.route('/admin')
    @app.route('/admin.html')
    def admin():
        frontend_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'frontend'))
        return send_from_directory(frontend_dir, 'admin.html')
    
    # Create database tables
    with app.app_context():
        db.create_all()
    
    return app

app = create_app()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
