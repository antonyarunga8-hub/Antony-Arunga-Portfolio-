from flask import Blueprint, request, jsonify, send_from_directory, current_app, Response
from models import db, Project, Contact, Analytics
from datetime import datetime, timedelta
from sqlalchemy import func
from functools import wraps
import os
import hmac
import hashlib
import time
import csv
import io

api_bp = Blueprint('api', __name__)

# --- Admin Authentication Helpers ---

def generate_admin_token(username):
    """Generate a tamper-proof signed session token valid for 7 days"""
    expires_at = int(time.time()) + (86400 * 7)
    payload = f"{username}:{expires_at}"
    secret = current_app.config.get('ADMIN_SESSION_SECRET', 'arunga-secure-admin-secret-2026').encode('utf-8')
    sig = hmac.new(secret, payload.encode('utf-8'), hashlib.sha256).hexdigest()
    return f"{payload}:{sig}"

def verify_admin_token(token):
    """Verify if the token is valid, unexpired, and matches admin username"""
    if not token:
        return False
    parts = token.split(':')
    if len(parts) != 3:
        return False
    username, expires_at_str, sig = parts
    try:
        expires_at = int(expires_at_str)
        if time.time() > expires_at:
            return False
        expected_user = current_app.config.get('ADMIN_USERNAME', 'antony')
        if username.strip().lower() != expected_user.strip().lower():
            return False
        payload = f"{username}:{expires_at}"
        secret = current_app.config.get('ADMIN_SESSION_SECRET', 'arunga-secure-admin-secret-2026').encode('utf-8')
        expected_sig = hmac.new(secret, payload.encode('utf-8'), hashlib.sha256).hexdigest()
        return hmac.compare_digest(sig, expected_sig)
    except Exception:
        return False

def admin_required(f):
    """Decorator to strictly require admin authentication"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        auth_header = request.headers.get('Authorization', '')
        token = ''
        if auth_header.startswith('Bearer '):
            token = auth_header.split(' ', 1)[1].strip()
        elif 'token' in request.args:
            token = request.args.get('token', '').strip()
            
        if not verify_admin_token(token):
            return jsonify({'error': 'Unauthorized: Admin access strictly restricted'}), 401
        return f(*args, **kwargs)
    return decorated_function

# --- Admin Auth Endpoints ---

@api_bp.route('/admin/login', methods=['POST'])
def admin_login():
    """Authenticate admin and provide session token"""
    try:
        data = request.get_json() or {}
        username = data.get('username', '').strip()
        password = data.get('password', '')

        expected_user = current_app.config.get('ADMIN_USERNAME', 'antony').strip()
        expected_pw = current_app.config.get('ADMIN_PASSWORD', 'arunga2026!')

        if username.lower() == expected_user.lower() and password == expected_pw:
            token = generate_admin_token(expected_user)
            return jsonify({
                'success': True,
                'message': 'Admin authenticated successfully',
                'token': token,
                'user': expected_user
            }), 200
        else:
            return jsonify({'error': 'Invalid administrator credentials'}), 401
    except Exception as e:
        return jsonify({'error': 'Authentication request failed'}), 500

@api_bp.route('/admin/verify', methods=['GET'])
def admin_verify():
    """Check if current admin session is valid"""
    auth_header = request.headers.get('Authorization', '')
    token = auth_header.split(' ', 1)[1].strip() if auth_header.startswith('Bearer ') else request.args.get('token', '')
    if verify_admin_token(token):
        return jsonify({'valid': True, 'user': current_app.config.get('ADMIN_USERNAME', 'antony')}), 200
    return jsonify({'valid': False}), 401

# --- Projects Endpoints ---

@api_bp.route('/projects', methods=['GET'])
def get_projects():
    """Get all projects"""
    try:
        projects = Project.query.order_by(Project.created_at.desc()).all()
        return jsonify([project.to_dict() for project in projects]), 200
    except Exception:
        return jsonify({'error': 'Failed to retrieve projects'}), 500

@api_bp.route('/projects/<int:project_id>', methods=['GET'])
def get_project(project_id):
    """Get a specific project by ID"""
    try:
        project = Project.query.get_or_404(project_id)
        return jsonify(project.to_dict()), 200
    except Exception:
        return jsonify({'error': 'Project not found'}), 404

@api_bp.route('/projects', methods=['POST'])
@admin_required
def create_project():
    """Create a new project (Admin Only)"""
    try:
        data = request.get_json() or {}
        if not data.get('title') or not data.get('description'):
            return jsonify({'error': 'Title and description are required'}), 400
        
        technologies = ','.join(data.get('technologies', [])) if isinstance(data.get('technologies'), list) else data.get('technologies', '')
        
        project = Project(
            title=data['title'],
            description=data['description'],
            technologies=technologies,
            link=data.get('link', ''),
            image_url=data.get('image_url', ''),
            status=data.get('status', 'completed')
        )
        
        db.session.add(project)
        db.session.commit()
        return jsonify(project.to_dict()), 201
    except Exception:
        db.session.rollback()
        return jsonify({'error': 'Failed to create project'}), 500

# --- Contact Form Endpoints ---

@api_bp.route('/contact', methods=['POST'])
def submit_contact():
    """Handle contact form submissions from visitors with real-time recording"""
    try:
        data = request.get_json() or {}
        name = data.get('name', '').strip()
        email = data.get('email', '').strip()
        message = data.get('message', '').strip()

        if not name or not email or not message:
            return jsonify({'error': 'Name, email, and message are required'}), 400

        if len(name) < 2 or len(message) < 2 or '@' not in email:
            return jsonify({'error': 'Please provide valid contact information'}), 400

        contact = Contact(
            name=name,
            email=email,
            message=message,
            is_read=False
        )
        
        db.session.add(contact)
        db.session.commit()
        
        # Log event for real-time tracking
        current_app.logger.info(f"New contact form submission from {name} <{email}>")
        
        return jsonify({
            'message': 'Contact form submitted successfully',
            'data': contact.to_dict()
        }), 201
    except Exception as e:
        db.session.rollback()
        current_app.logger.error(f"Contact submit error: {e}")
        return jsonify({'error': 'Failed to submit contact message. Please try again or email directly.'}), 500

@api_bp.route('/contacts', methods=['GET'])
@admin_required
def get_contacts():
    """Get all contact submissions (Strictly Admin Only)"""
    try:
        contacts = Contact.query.order_by(Contact.created_at.desc()).all()
        return jsonify([contact.to_dict() for contact in contacts]), 200
    except Exception:
        return jsonify({'error': 'Failed to retrieve contacts'}), 500

@api_bp.route('/contacts/<int:contact_id>/toggle-read', methods=['PATCH', 'POST'])
@admin_required
def toggle_contact_read(contact_id):
    """Mark contact as read / unread (Admin Only)"""
    try:
        contact = Contact.query.get_or_404(contact_id)
        contact.is_read = not bool(contact.is_read)
        db.session.commit()
        return jsonify({'success': True, 'contact': contact.to_dict()}), 200
    except Exception:
        db.session.rollback()
        return jsonify({'error': 'Failed to update contact'}), 500

@api_bp.route('/contacts/<int:contact_id>', methods=['DELETE'])
@admin_required
def delete_contact(contact_id):
    """Delete a contact message (Admin Only)"""
    try:
        contact = Contact.query.get_or_404(contact_id)
        db.session.delete(contact)
        db.session.commit()
        return jsonify({'success': True, 'message': 'Message deleted successfully'}), 200
    except Exception:
        db.session.rollback()
        return jsonify({'error': 'Failed to delete message'}), 500

@api_bp.route('/contacts/export', methods=['GET'])
@admin_required
def export_contacts():
    """Export all contact messages to CSV (Admin Only)"""
    try:
        contacts = Contact.query.order_by(Contact.created_at.desc()).all()
        si = io.StringIO()
        cw = csv.writer(si)
        cw.writerow(['ID', 'Name', 'Email', 'Message', 'Is Read', 'Date (UTC)'])
        for c in contacts:
            cw.writerow([c.id, c.name, c.email, c.message, 'Yes' if c.is_read else 'No', c.created_at.strftime('%Y-%m-%d %H:%M:%S')])
        
        output = si.getvalue()
        return Response(
            output,
            mimetype="text/csv",
            headers={"Content-disposition": "attachment; filename=portfolio_contacts_export.csv"}
        )
    except Exception:
        return jsonify({'error': 'Failed to export CSV'}), 500

# --- Analytics Endpoints ---

@api_bp.route('/analytics/track', methods=['POST'])
def track_visit():
    """Track a page visit in real-time"""
    try:
        data = request.get_json() or {}
        page = data.get('page', '').strip()
        if not page:
            return jsonify({'error': 'Page name is required'}), 400
        
        # Get real client IP (handles proxy / CDN headers)
        forwarded_for = request.headers.get('X-Forwarded-For')
        if forwarded_for:
            ip_address = forwarded_for.split(',')[0].strip()
        else:
            ip_address = request.remote_addr or 'unknown'
            
        analytics = Analytics(
            page=page,
            ip_address=ip_address,
            user_agent=request.headers.get('User-Agent', '')[:200],
            referrer=data.get('referrer', '')[:200]
        )
        
        db.session.add(analytics)
        db.session.commit()
        
        return jsonify({'message': 'Visit tracked successfully'}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to record visit'}), 500

@api_bp.route('/analytics/stats', methods=['GET'])
def get_analytics_stats():
    """Get aggregated analytics summary statistics"""
    try:
        total_visits = Analytics.query.count()
        
        # Visits by page
        visits_by_page = db.session.query(
            Analytics.page,
            func.count(Analytics.id).label('count')
        ).group_by(Analytics.page).all()
        
        # Visits today
        today_start = datetime.utcnow().replace(hour=0, minute=0, second=0, microsecond=0)
        today_visits = Analytics.query.filter(Analytics.timestamp >= today_start).count()

        # Active in last 15 minutes
        fifteen_mins_ago = datetime.utcnow() - timedelta(minutes=15)
        active_recent = Analytics.query.filter(Analytics.timestamp >= fifteen_mins_ago).count()
        
        # Unread contacts count
        unread_contacts = Contact.query.filter_by(is_read=False).count()
        total_contacts = Contact.query.count()

        return jsonify({
            'total_visits': total_visits,
            'today_visits': today_visits,
            'active_recent': active_recent,
            'unread_contacts': unread_contacts,
            'total_contacts': total_contacts,
            'visits_by_page': [{'page': page, 'count': count} for page, count in visits_by_page]
        }), 200
    except Exception:
        return jsonify({'error': 'Failed to calculate statistics'}), 500

@api_bp.route('/analytics/visits', methods=['GET'])
@admin_required
def get_all_visits():
    """Get detailed visit logs (Strictly Admin Only)"""
    try:
        limit = request.args.get('limit', 150, type=int)
        visits = Analytics.query.order_by(Analytics.timestamp.desc()).limit(limit).all()
        return jsonify([visit.to_dict() for visit in visits]), 200
    except Exception:
        return jsonify({'error': 'Failed to retrieve visits'}), 500

@api_bp.route('/analytics/live', methods=['GET'])
@admin_required
def get_live_stream():
    """Real-time data feed for live admin dashboard polling"""
    try:
        since_visit_id = request.args.get('since_visit_id', 0, type=int)
        since_contact_id = request.args.get('since_contact_id', 0, type=int)

        # Get new visits since last check
        new_visits = Analytics.query.filter(Analytics.id > since_visit_id).order_by(Analytics.timestamp.desc()).limit(50).all()
        
        # Get new contacts since last check
        new_contacts = Contact.query.filter(Contact.id > since_contact_id).order_by(Contact.created_at.desc()).limit(20).all()

        # Totals
        total_visits = Analytics.query.count()
        today_start = datetime.utcnow().replace(hour=0, minute=0, second=0, microsecond=0)
        today_visits = Analytics.query.filter(Analytics.timestamp >= today_start).count()
        fifteen_mins_ago = datetime.utcnow() - timedelta(minutes=15)
        active_recent = Analytics.query.filter(Analytics.timestamp >= fifteen_mins_ago).count()
        unread_contacts = Contact.query.filter_by(is_read=False).count()
        total_contacts = Contact.query.count()

        return jsonify({
            'new_visits': [v.to_dict() for v in new_visits],
            'new_contacts': [c.to_dict() for c in new_contacts],
            'stats': {
                'total_visits': total_visits,
                'today_visits': today_visits,
                'active_recent': active_recent,
                'unread_contacts': unread_contacts,
                'total_contacts': total_contacts,
                'timestamp': datetime.utcnow().isoformat()
            }
        }), 200
    except Exception:
        return jsonify({'error': 'Failed to retrieve live stream'}), 500

# --- Health Check ---

@api_bp.route('/health', methods=['GET'])
def health_check():
    """API health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'database': 'connected',
        'timestamp': datetime.utcnow().isoformat()
    }), 200
