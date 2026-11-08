import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY', 'dev-secret-key-change-in-prod')
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL', 'sqlite:///portfolio.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    CORS_ORIGINS = os.environ.get('CORS_ORIGINS', '*').split(',')
    
    # Strictly Protected Admin Credentials
    ADMIN_USERNAME = os.environ.get('ADMIN_USERNAME', 'antony')
    ADMIN_PASSWORD = os.environ.get('ADMIN_PASSWORD', 'arunga2026!')
    ADMIN_SESSION_SECRET = os.environ.get('ADMIN_SESSION_SECRET', 'arunga-secure-admin-secret-2026')
