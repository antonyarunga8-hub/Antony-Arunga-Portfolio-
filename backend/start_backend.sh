#!/bin/bash

# Navigate to backend directory
cd "/Applications/XAMPP/xamppfiles/htdocs/Antony arunga's portfolio 2026/backend"

# Activate virtual environment
source venv/bin/activate

# Install/upgrade dependencies
echo "Installing dependencies..."
pip install -r requirements.txt

# Initialize the database
echo "Initializing database..."
python init_db.py

# Start the Flask server
echo "Starting Flask server..."
python app.py
