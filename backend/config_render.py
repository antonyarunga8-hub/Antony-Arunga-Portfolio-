import os
from datetime import timedelta

class Config:
    # Flask configuration
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-secret-key-change-in-production'
    
    # Database configuration with Render/Neon fix
    database_url = os.environ.get('DATABASE_URL') or 'sqlite:///database.db'
    
    # Fix for Render PostgreSQL URLs (postgres:// -> postgresql://)
    if database_url.startswith('postgres://'):
        database_url = database_url.replace('postgres://', 'postgresql://', 1)
    
    SQLALCHEMY_DATABASE_URI = database_url
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ENGINE_OPTIONS = {
        'pool_recycle': 300,
        'pool_pre_ping': True,
    }
    
    # CORS configuration - Add your frontend domains
    CORS_ORIGINS = [
        'http://localhost:3000',
        'http://localhost:5500',
        'http://127.0.0.1:5500',
        os.environ.get('FRONTEND_URL', '*'),  # Add your production frontend URL in Render env vars
    ]
    
    # Session configuration
    PERMANENT_SESSION_LIFETIME = timedelta(days=7)
