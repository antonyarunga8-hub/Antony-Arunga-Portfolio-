@echo off
REM Portfolio Backend Startup Script for Windows
REM This script starts the Flask backend server

echo.
echo ================================================
echo   Antony Arunga's Portfolio - Backend Server
echo ================================================
echo.

REM Check if we're in the right directory
if not exist "app.py" (
    echo ERROR: app.py not found!
    echo Please run this script from the backend directory.
    pause
    exit /b 1
)

REM Check if virtual environment exists
if not exist "venv\" (
    echo Creating virtual environment...
    python -m venv venv
    echo Virtual environment created!
    echo.
)

REM Activate virtual environment
echo Activating virtual environment...
call venv\Scripts\activate.bat

REM Check if requirements are installed
if not exist "venv\Scripts\flask.exe" (
    echo Installing dependencies...
    pip install -r requirements.txt
    echo Dependencies installed!
    echo.
)

REM Check if .env file exists
if not exist ".env" (
    echo Warning: .env file not found!
    echo Creating .env from .env.example...
    copy .env.example .env
    echo .env file created!
    echo Please edit .env with your MySQL credentials.
    echo.
    pause
)

REM Clear screen and show startup
cls
echo ==================================================
echo   Antony Arunga's Portfolio - Backend Server
echo ==================================================
echo.
echo Server will start on: http://localhost:5000
echo Analytics tracking: ENABLED
echo Contact form: ENABLED
echo.
echo Press Ctrl+C to stop the server
echo.
echo ==================================================
echo.

REM Start Flask server
python app.py

pause
