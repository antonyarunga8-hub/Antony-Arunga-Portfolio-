#!/usr/bin/env python3
"""
Portfolio Backend Deployment Diagnostics
Run this to check if everything is configured correctly for Render deployment
"""

import os
import sys

def check_file_exists(filepath, description):
    """Check if a file exists"""
    exists = os.path.exists(filepath)
    status = "✅" if exists else "❌"
    print(f"{status} {description}: {filepath}")
    return exists

def check_content_in_file(filepath, search_string, description):
    """Check if specific content exists in file"""
    try:
        with open(filepath, 'r') as f:
            content = f.read()
            found = search_string in content
            status = "✅" if found else "❌"
            print(f"{status} {description}")
            return found
    except FileNotFoundError:
        print(f"❌ File not found: {filepath}")
        return False

def main():
    print("=" * 60)
    print("🔍 PORTFOLIO BACKEND DEPLOYMENT DIAGNOSTICS")
    print("=" * 60)
    print()
    
    # Check critical files
    print("📁 CHECKING CRITICAL FILES...")
    print("-" * 60)
    check_file_exists('app.py', 'Flask application')
    check_file_exists('config.py', 'Configuration file')
    check_file_exists('requirements.txt', 'Dependencies file')
    check_file_exists('models.py', 'Database models')
    check_file_exists('routes.py', 'API routes')
    check_file_exists('render.yaml', 'Render configuration')
    print()
    
    # Check requirements.txt
    print("📦 CHECKING DEPENDENCIES...")
    print("-" * 60)
    check_content_in_file('requirements.txt', 'Flask', 'Flask included')
    check_content_in_file('requirements.txt', 'gunicorn', 'Gunicorn included (REQUIRED for Render)')
    check_content_in_file('requirements.txt', 'psycopg2-binary', 'PostgreSQL driver included')
    check_content_in_file('requirements.txt', 'Flask-CORS', 'CORS support included')
    print()
    
    # Check config.py
    print("⚙️  CHECKING CONFIGURATION...")
    print("-" * 60)
    check_content_in_file('config.py', "replace('postgres://', 'postgresql://'", 
                         'Database URL fix for Render')
    check_content_in_file('config.py', 'CORS_ORIGINS', 'CORS origins configured')
    check_content_in_file('config.py', 'pool_pre_ping', 'Database connection pooling')
    print()
    
    # Check app.py
    print("🚀 CHECKING APPLICATION...")
    print("-" * 60)
    check_content_in_file('app.py', 'CORS(app', 'CORS initialized')
    check_content_in_file('app.py', '/health', 'Health check endpoint')
    check_content_in_file('app.py', 'create_app', 'Application factory pattern')
    print()
    
    # Check environment variables
    print("🔐 CHECKING ENVIRONMENT SETUP...")
    print("-" * 60)
    
    # Read .env.production if exists
    if os.path.exists('.env.production'):
        with open('.env.production', 'r') as f:
            env_content = f.read()
            
        if 'DATABASE_URL' in env_content:
            print("✅ DATABASE_URL template in .env.production")
            if 'YOUR_PASSWORD' in env_content:
                print("⚠️  Remember to replace YOUR_PASSWORD with actual password in Render")
        else:
            print("❌ DATABASE_URL not in .env.production")
            
        if 'SECRET_KEY' in env_content:
            print("✅ SECRET_KEY template in .env.production")
        else:
            print("❌ SECRET_KEY not in .env.production")
    else:
        print("⚠️  No .env.production file (Render will use env vars from dashboard)")
    print()
    
    # Check for common issues
    print("🔍 CHECKING FOR COMMON ISSUES...")
    print("-" * 60)
    
    # Check if SQLite is being used
    if check_content_in_file('config.py', 'sqlite', 'SQLite fallback exists'):
        print("⚠️  Make sure to set DATABASE_URL in Render to use PostgreSQL")
    
    # Check for hardcoded localhost
    hardcoded_localhost = False
    for file in ['app.py', 'routes.py', 'config.py']:
        if os.path.exists(file):
            with open(file, 'r') as f:
                if 'localhost:' in f.read():
                    print(f"⚠️  Found 'localhost' in {file} - verify it's not in production code")
                    hardcoded_localhost = True
    
    if not hardcoded_localhost:
        print("✅ No hardcoded localhost URLs found")
    
    print()
    
    # Summary
    print("=" * 60)
    print("📊 SUMMARY")
    print("=" * 60)
    print()
    print("To deploy to Render:")
    print("1. Push your code to GitHub")
    print("2. Create PostgreSQL database (Neon or Render)")
    print("3. Create Web Service in Render")
    print("4. Set environment variables in Render dashboard:")
    print("   - DATABASE_URL (from Neon/Render PostgreSQL)")
    print("   - SECRET_KEY (generate in Render)")
    print("   - FLASK_ENV=production")
    print("   - FRONTEND_URL (your frontend domain)")
    print("5. Deploy!")
    print()
    print("📖 See RENDER_DEPLOYMENT.md for detailed instructions")
    print()

if __name__ == '__main__':
    main()
