from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

def format_datetime(val):
    if val is None:
        return datetime.utcnow().isoformat()
    if isinstance(val, str):
        return val
    try:
        return val.isoformat()
    except Exception:
        return str(val)

class Project(db.Model):
    __tablename__ = 'projects'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    technologies = db.Column(db.String(200), nullable=False)  # Comma-separated
    link = db.Column(db.String(200))
    image_url = db.Column(db.String(200))
    status = db.Column(db.String(20), default='completed')  # completed or in_progress
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        tech_list = []
        if self.technologies:
            tech_list = [t.strip() for t in self.technologies.split(',') if t.strip()]
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'technologies': tech_list,
            'link': self.link or '',
            'image_url': self.image_url or '',
            'status': self.status or 'completed',
            'created_at': format_datetime(self.created_at)
        }

class Contact(db.Model):
    __tablename__ = 'contacts'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    message = db.Column(db.Text, nullable=False)
    is_read = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'message': self.message,
            'is_read': bool(self.is_read),
            'created_at': format_datetime(self.created_at)
        }

class Analytics(db.Model):
    __tablename__ = 'analytics'
    
    id = db.Column(db.Integer, primary_key=True)
    page = db.Column(db.String(100), nullable=False)  # home, about, projects, contact
    ip_address = db.Column(db.String(50))
    user_agent = db.Column(db.String(200))
    referrer = db.Column(db.String(200))
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'page': self.page,
            'ip_address': self.ip_address,
            'user_agent': self.user_agent,
            'referrer': self.referrer,
            'timestamp': format_datetime(self.timestamp)
        }
