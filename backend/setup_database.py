"""
Setup script to initialize Neon PostgreSQL database
Run this after updating .env with Neon connection string
"""
import sys
import os

# Add the current directory to path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from app import app, db

def setup_database():
    """Initialize database tables"""
    try:
        with app.app_context():
            print("Creating database tables...")
            db.create_all()
            print("✓ Database tables created successfully!")
            print("\nTables created:")
            print("  - projects")
            print("  - contacts")
            print("  - analytics")
            print("\nYour backend is now connected to Neon PostgreSQL!")
            print("\nTo start the server, run:")
            print("  python app.py")
            return True
    except Exception as e:
        print(f"✗ Error creating tables: {e}")
        print("\nTroubleshooting:")
        print("  1. Check your DATABASE_URL in .env file")
        print("  2. Ensure psycopg2-binary is installed: pip install psycopg2-binary")
        print("  3. Verify your Neon database is accessible")
        return False

if __name__ == '__main__':
    success = setup_database()
    sys.exit(0 if success else 1)
