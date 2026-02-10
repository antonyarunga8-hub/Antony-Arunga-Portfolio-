# Portfolio Backend Setup Guide

## Quick Start

### 1. Open Terminal
Open Terminal and navigate to your backend directory:
```bash
cd "/Applications/XAMPP/xamppfiles/htdocs/Antony arunga's portfolio 2026/backend"
```

### 2. Activate Virtual Environment
```bash
source venv/bin/activate
```

### 3. Install Dependencies (if needed)
```bash
pip install -r requirements.txt
```

### 4. Initialize Database Tables in Neon
```bash
python init_db.py
```

This will create the following tables in your Neon database:
- `projects` - Store your portfolio projects
- `contacts` - Store contact form submissions
- `analytics` - Track page visits

### 5. Start the Backend Server
```bash
python app.py
```

Your backend will be running at: http://localhost:5000

## Testing the Backend

### Test the API is running:
Open your browser and visit:
- http://localhost:5000 - Should show API info
- http://localhost:5000/api/health - Should show health status

### Test the Contact Form:
1. Open your frontend: `http://localhost/Antony arunga's portfolio 2026/frontend/contact.html`
2. Fill out the contact form
3. Submit it
4. You should see a success message!

### View Submitted Contacts:
Visit: http://localhost:5000/api/contacts

## Database Configuration

Your `.env` file is now configured with:
- **Database**: Neon PostgreSQL (myportfolio_db)
- **Connection**: Secure SSL connection
- **Region**: AWS US East 1 (N. Virginia)

## Available API Endpoints

### Projects
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create a new project
- `GET /api/projects/<id>` - Get specific project

### Contacts
- `POST /api/contact` - Submit contact form
- `GET /api/contacts` - View all submissions (admin)

### Analytics
- `POST /api/analytics/track` - Track page visit
- `GET /api/analytics/stats` - Get analytics statistics

### Health
- `GET /api/health` - Check API health

## Troubleshooting

### Backend won't start?
1. Make sure virtual environment is activated
2. Check if port 5000 is available
3. Verify DATABASE_URL in .env file

### Contact form not working?
1. Make sure backend is running on port 5000
2. Check browser console for errors
3. Verify CORS is enabled (already configured)

### Database connection issues?
1. Verify Neon database is active in console
2. Check connection string in .env
3. Make sure you ran `python init_db.py`

## What's Next?

1. **Add Projects**: Create a route or admin panel to add your projects
2. **Test Contact Form**: Submit a test message from your frontend
3. **View Analytics**: Visit the analytics endpoint to see page visits
4. **Deploy**: When ready, you can deploy the backend to a hosting service

## Important Files

- `.env` - Environment configuration (DATABASE_URL, SECRET_KEY)
- `models.py` - Database models (Project, Contact, Analytics)
- `routes.py` - API endpoints
- `app.py` - Flask application
- `init_db.py` - Database initialization script

## Success!

Your portfolio backend is now connected to Neon PostgreSQL and ready to collect contact form submissions! 🎉
