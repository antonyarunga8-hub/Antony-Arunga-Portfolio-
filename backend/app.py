"""
Flask Application for Portfolio with MongoDB Atlas
"""
from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
from bson import ObjectId
from datetime import datetime
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# MongoDB Configuration
MONGODB_URI = os.getenv('MONGODB_URI')
DATABASE_NAME = os.getenv('DATABASE_NAME', 'Portfolio_db')

# Initialize MongoDB client
try:
    client = MongoClient(MONGODB_URI)
    db = client[DATABASE_NAME]
    client.server_info()
    print("✅ Connected to MongoDB Atlas successfully!")
    print(f"✅ Using database: {DATABASE_NAME}")
except Exception as e:
    print(f"❌ Error connecting to MongoDB: {e}")

# Collections
projects_collection = db['Projects']
contacts_collection = db['Contacts']
analytics_collection = db['Analytics']

def serialize_doc(doc):
    if doc and '_id' in doc:
        doc['_id'] = str(doc['_id'])
    return doc

@app.route('/api/health', methods=['GET'])
def health_check():
    try:
        client.server_info()
        return jsonify({
            'status': 'healthy',
            'database': 'connected',
            'timestamp': datetime.utcnow().isoformat()
        }), 200
    except Exception as e:
        return jsonify({
            'status': 'unhealthy',
            'database': 'disconnected',
            'error': str(e)
        }), 500

@app.route('/api/projects', methods=['GET'])
def get_projects():
    try:
        projects = list(projects_collection.find().sort('created_at', -1))
        for project in projects:
            serialize_doc(project)
        return jsonify(projects), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/projects/<project_id>', methods=['GET'])
def get_project(project_id):
    try:
        project = projects_collection.find_one({'_id': ObjectId(project_id)})
        if project:
            serialize_doc(project)
            return jsonify(project), 200
        return jsonify({'error': 'Project not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/projects', methods=['POST'])
def create_project():
    try:
        data = request.get_json()
        if not data.get('title') or not data.get('description'):
            return jsonify({'error': 'Title and description are required'}), 400
        
        project = {
            'title': data['title'],
            'description': data['description'],
            'technologies': data.get('technologies', []),
            'link': data.get('link', ''),
            'image_url': data.get('image_url', ''),
            'status': data.get('status', 'completed'),
            'created_at': datetime.utcnow()
        }
        
        result = projects_collection.insert_one(project)
        project['_id'] = str(result.inserted_id)
        return jsonify(project), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/contact', methods=['POST'])
def submit_contact():
    try:
        data = request.get_json()
        if not all(k in data for k in ['name', 'email', 'message']):
            return jsonify({'error': 'Name, email, and message are required'}), 400
        
        contact = {
            'name': data['name'],
            'email': data['email'],
            'message': data['message'],
            'created_at': datetime.utcnow()
        }
        
        result = contacts_collection.insert_one(contact)
        contact['_id'] = str(result.inserted_id)
        return jsonify({'message': 'Contact form submitted successfully', 'data': contact}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/contacts', methods=['GET'])
def get_contacts():
    try:
        contacts = list(contacts_collection.find().sort('created_at', -1))
        for contact in contacts:
            serialize_doc(contact)
        return jsonify(contacts), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/analytics/track', methods=['POST'])
def track_visit():
    try:
        data = request.get_json()
        if not data.get('page'):
            return jsonify({'error': 'Page name is required'}), 400
        
        analytics = {
            'page': data['page'],
            'ip_address': request.remote_addr,
            'user_agent': request.headers.get('User-Agent', '')[:200],
            'referrer': data.get('referrer', '')[:200],
            'timestamp': datetime.utcnow()
        }
        
        analytics_collection.insert_one(analytics)
        return jsonify({'message': 'Visit tracked successfully'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/analytics/stats', methods=['GET'])
def get_analytics_stats():
    try:
        total_visits = analytics_collection.count_documents({})
        pipeline = [
            {'$group': {'_id': '$page', 'count': {'$sum': 1}}},
            {'$sort': {'count': -1}}
        ]
        visits_by_page = list(analytics_collection.aggregate(pipeline))
        visits_by_page_formatted = [{'page': item['_id'], 'count': item['count']} for item in visits_by_page]
        most_popular = visits_by_page[0] if visits_by_page else {'_id': None, 'count': 0}
        
        return jsonify({
            'total_visits': total_visits,
            'visits_by_page': visits_by_page_formatted,
            'most_popular_page': {'page': most_popular['_id'], 'count': most_popular['count']}
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
