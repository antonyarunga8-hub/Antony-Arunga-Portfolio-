#!/bin/bash

# Navigate to the backend directory
cd "/Applications/XAMPP/xamppfiles/htdocs/Antony arunga's portfolio 2026/backend"

# Activate virtual environment
source venv/bin/activate

# Install/upgrade dependencies
pip install --upgrade pip
pip install -r requirements.txt

# Initialize the database (create tables)
python -c "from app import app, db; 
with app.app_context():
    db.create_all()
    print('Database tables created successfully!')"

echo "Setup complete! Your backend is ready."
echo "To start the server, run: python app.py"
