#!/bin/bash

# Portfolio Backend Startup Script
# This script starts the Flask backend server

echo "🚀 Starting Portfolio Backend Server..."
echo ""

# Check if we're in the right directory
if [ ! -f "app.py" ]; then
    echo "❌ Error: app.py not found!"
    echo "Please run this script from the backend directory."
    exit 1
fi

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv venv
    echo "✅ Virtual environment created!"
    echo ""
fi

# Activate virtual environment
echo "🔧 Activating virtual environment..."
source venv/bin/activate

# Check if requirements are installed
if [ ! -f "venv/bin/flask" ]; then
    echo "📥 Installing dependencies..."
    pip install -r requirements.txt
    echo "✅ Dependencies installed!"
    echo ""
fi

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "⚠️  Warning: .env file not found!"
    echo "Creating .env from .env.example..."
    cp .env.example .env
    echo "✅ .env file created!"
    echo "📝 Please edit .env with your MySQL credentials before continuing."
    echo ""
    read -p "Press Enter to continue once you've configured .env..."
fi

# Clear screen and show startup
clear
echo "=================================================="
echo "  Antony Arunga's Portfolio - Backend Server"
echo "=================================================="
echo ""
echo "🌐 Server will start on: http://localhost:5000"
echo "📊 Analytics tracking: ENABLED"
echo "📧 Contact form: ENABLED"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""
echo "=================================================="
echo ""

# Start Flask server
python app.py
