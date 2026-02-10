"""
Initialize the database with tables and seed data
"""
from app import create_app
from models import db, Project, Contact, Analytics

def init_db():
    """Initialize database tables"""
    app = create_app()
    
    with app.app_context():
        # Drop all tables (be careful in production!)
        print("Dropping all tables...")
        db.drop_all()
        
        # Create all tables
        print("Creating all tables...")
        db.create_all()
        
        print("Database initialized successfully!")
        print(f"Tables created: {db.metadata.tables.keys()}")

if __name__ == '__main__':
    init_db()
