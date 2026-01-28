from flask import Blueprint, request, jsonify, send_from_directory
from models import db, Project, Contact, Analytics
from datetime import datetime, timedelta
from sqlalchemy import func
import os

api_bp = Blueprint('api', __name__)

@api_bp.route('/projects', methods=['GET'])
def get_projects():
    """Get all projects"""
    try:
        projects = Project.query.order_by(Project.created_at.desc()).all()
        return jsonify([project.to_dict() for project in projects]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@api_bp.route('/projects/<int:project_id>', methods=['GET'])
def get_project(project_id):
    """Get a specific project by ID"""
    try:
        project = Project.query.get_or_404(project_id)
        return jsonify(project.to_dict()), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 404

@api_bp.route('/projects', methods=['POST'])
def create_project():
    """Create a new project"""
    try:
        data = request.get_json()
        
        if not data.get('title') or not data.get('description'):
            return jsonify({'error': 'Title and description are required'}), 400
        
        # Convert technologies array to comma-separated string
        technologies = ','.join(data.get('technologies', []))
        
        project = Project(
            title=data['title'],
            description=data['description'],
            technologies=technologies,
            link=data.get('link', ''),
            image_url=data.get('image_url', '')
        )
        
        db.session.add(project)
        db.session.commit()
        
        return jsonify(project.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@api_bp.route('/contact', methods=['POST'])
def submit_contact():
    """Handle contact form submissions"""
    try:
        data = request.get_json()
        
        if not all(k in data for k in ['name', 'email', 'message']):
            return jsonify({'error': 'Name, email, and message are required'}), 400
        
        contact = Contact(
            name=data['name'],
            email=data['email'],
            message=data['message']
        )
        
        db.session.add(contact)
        db.session.commit()
        
        return jsonify({
            'message': 'Contact form submitted successfully',
            'data': contact.to_dict()
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@api_bp.route('/contacts', methods=['GET'])
def get_contacts():
    """Get all contact submissions (admin use)"""
    try:
        contacts = Contact.query.order_by(Contact.created_at.desc()).all()
        return jsonify([contact.to_dict() for contact in contacts]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@api_bp.route('/health', methods=['GET'])
def health_check():
    """API health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.utcnow().isoformat()
    }), 200

# Analytics Endpoints

@api_bp.route('/analytics/track', methods=['POST'])
def track_visit():
    """Track a page visit"""
    try:
        data = request.get_json()
        
        if not data.get('page'):
            return jsonify({'error': 'Page name is required'}), 400
        
        analytics = Analytics(
            page=data['page'],
            ip_address=request.remote_addr,
            user_agent=request.headers.get('User-Agent', '')[:200],
            referrer=data.get('referrer', '')[:200]
        )
        
        db.session.add(analytics)
        db.session.commit()
        
        return jsonify({'message': 'Visit tracked successfully'}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@api_bp.route('/analytics/stats', methods=['GET'])
def get_analytics_stats():
    """Get analytics statistics"""
    try:
        # Total visits
        total_visits = Analytics.query.count()
        
        # Visits by page
        visits_by_page = db.session.query(
            Analytics.page,
            func.count(Analytics.id).label('count')
        ).group_by(Analytics.page).all()
        
        # Recent visits (last 30 days)
        thirty_days_ago = datetime.utcnow() - timedelta(days=30)
        recent_visits = Analytics.query.filter(
            Analytics.timestamp >= thirty_days_ago
        ).count()
        
        # Visits today
        today_start = datetime.utcnow().replace(hour=0, minute=0, second=0, microsecond=0)
        today_visits = Analytics.query.filter(
            Analytics.timestamp >= today_start
        ).count()
        
        # Most popular page
        popular_page = db.session.query(
            Analytics.page,
            func.count(Analytics.id).label('count')
        ).group_by(Analytics.page).order_by(func.count(Analytics.id).desc()).first()
        
        return jsonify({
            'total_visits': total_visits,
            'visits_by_page': [{'page': page, 'count': count} for page, count in visits_by_page],
            'recent_visits': recent_visits,
            'today_visits': today_visits,
            'most_popular_page': {
                'page': popular_page[0] if popular_page else None,
                'count': popular_page[1] if popular_page else 0
            }
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@api_bp.route('/analytics/visits', methods=['GET'])
def get_all_visits():
    """Get all analytics visits (admin use)"""
    try:
        limit = request.args.get('limit', 100, type=int)
        visits = Analytics.query.order_by(Analytics.timestamp.desc()).limit(limit).all()
        return jsonify([visit.to_dict() for visit in visits]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Serve Analytics Dashboard
@api_bp.route('/analytics_dashboard.html', methods=['GET'])
def analytics_dashboard():
    """Serve the analytics dashboard HTML page"""
    try:
        # Get the directory where this routes.py file is located
        current_dir = os.path.dirname(os.path.abspath(__file__))
        return send_from_directory(current_dir, 'analytics_dashboard.html')
    except Exception as e:
        return jsonify({'error': str(e)}), 404
