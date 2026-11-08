# Antony Arunga's Portfolio 2026

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub Profile](https://img.shields.io/badge/GitHub-antonyarunga8--hub-181717?style=flat&logo=github)](https://github.com/antonyarunga8-hub)
[![Live Portfolio](https://img.shields.io/badge/Live--Demo-myportfolio--202--6.netlify.app-blue?style=flat&logo=netlify)](https://myportfolio-202-6.netlify.app/)
[![Python](https://img.shields.io/badge/Python-3.8+-3776AB?style=flat&logo=python&logoColor=white)](https://www.python.org/)
[![Flask](https://img.shields.io/badge/Flask-3.0-000000?style=flat&logo=flask&logoColor=white)](https://flask.palletsprojects.com/)

A modern, full-stack portfolio website showcasing projects, skills, certificates, and contact information. Built with Flask backend and vanilla JavaScript frontend.

---

### 🌐 Quick Navigation
- 🏠 **[Live Web App](https://myportfolio-202-6.netlify.app/)**
- 📂 **[GitHub Repositories](https://github.com/antonyarunga8-hub?tab=repositories)**
- 👨‍💻 **[Developer Profile](https://github.com/antonyarunga8-hub)**
- 📜 **[MIT License](LICENSE)**

---

## 🖼️ Application Navigation & Visual Showcase

### 📱 Portfolio App Navigation Pages

<table width="100%">
  <tr>
    <td width="50%" align="center">
      <b>1. Home Page (`index.html`)</b><br><br>
      <img src="frontend/assets/images/Personal%20Portfolio%20Website%201Home.jpg" alt="Home Page" width="100%">
      <br><sub>Hero banner, bio profile, statistics counter & tech stack</sub>
    </td>
    <td width="50%" align="center">
      <b>2. About Page (`about.html`)</b><br><br>
      <img src="frontend/assets/images/Personal%20Portfolio%20Website%202About.jpg" alt="About Page" width="100%">
      <br><sub>Experience timeline, AI/ML background & skills radar</sub>
    </td>
  </tr>
  <tr>
    <td width="50%" align="center">
      <b>3. Projects Page (`projects.html`)</b><br><br>
      <img src="frontend/assets/images/Personal%20Portfolio%20Website%203%20Projects.jpg" alt="Projects Page" width="100%">
      <br><sub>Dynamic project grid, tech filter tags & gallery modal</sub>
    </td>
    <td width="50%" align="center">
      <b>4. Contact Page (`contact.html`)</b><br><br>
      <img src="frontend/assets/images/Personal%20Portfolio%20Website%204%20Contact.jpg" alt="Contact Page" width="100%">
      <br><sub>Interactive contact form, backend validation & social links</sub>
    </td>
  </tr>
</table>

---

### 🚀 Featured Application Projects Gallery

<table width="100%">
  <tr>
    <td width="50%" align="center">
      <b>🎓 Global Education Platform (Home)</b><br><br>
      <img src="frontend/assets/images/Global%20Education%20Platform%201%20Home.jpg" alt="Global Education Platform Home" width="100%">
    </td>
    <td width="50%" align="center">
      <b>🎓 Global Education Platform (About)</b><br><br>
      <img src="frontend/assets/images/Global%20Education%20Platform%202%20About%20us.jpg" alt="Global Education Platform About" width="100%">
    </td>
  </tr>
  <tr>
    <td width="50%" align="center">
      <b>🦁 Safari Tour Booking Platform</b><br><br>
      <img src="frontend/assets/images/Safari%20Tour%20Company%20Platform.jpg" alt="Safari Tour Company" width="100%">
    </td>
    <td width="50%" align="center">
      <b>☕ Modern Cafe Commerce Platform</b><br><br>
      <img src="frontend/assets/images/Modern%20Cafe%20Commerce%20Platform1%20Home.jpg" alt="Modern Cafe Commerce" width="100%">
    </td>
  </tr>
  <tr>
    <td width="50%" align="center">
      <b>🏛️ Kaisha Ubbaga Foundation (Home)</b><br><br>
      <img src="frontend/assets/images/Kaisha%20Ubbaga%20Foundation1%20Home.jpg" alt="Kaisha Ubbaga Foundation Home" width="100%">
    </td>
    <td width="50%" align="center">
      <b>🏛️ Kaisha Ubbaga Foundation (Dashboard)</b><br><br>
      <img src="frontend/assets/images/Kaisha%20Ubbaga%20Foundation%203%20Dashboard.jpg" alt="Kaisha Ubbaga Foundation Dashboard" width="100%">
    </td>
  </tr>
</table>

---

## 🚀 Features

- **Responsive Design**: Mobile-first design using Tailwind CSS
- **Dynamic Project Loading**: Projects loaded from database via REST API
- **Contact Form**: Functional contact form with backend validation
- **Modern UI**: Clean, professional interface with smooth animations
- **RESTful API**: Well-structured backend API for data management
- **Database Integration**: SQLAlchemy ORM with support for SQLite, PostgreSQL, and MySQL

## 📁 Project Structure

```
Antony arunga's portfolio 2026/
├── frontend/
│   ├── index.html          # Home page
│   ├── about.html          # About page with skills
│   ├── projects.html       # Projects showcase
│   ├── contact.html        # Contact form
│   ├── css/
│   │   └── style.css       # Custom styles
│   ├── js/
│   │   └── main.js         # Frontend logic and API calls
│   └── assets/
│       └── images/         # Image assets
├── backend/
│   ├── app.py              # Flask application entry point
│   ├── config.py           # Configuration settings
│   ├── models.py           # Database models
│   ├── routes.py           # API routes
│   ├── seed.py             # Database seeding script
│   └── requirements.txt    # Python dependencies
├── README.md
└── TECH_STACK.md
```

## 🛠️ Tech Stack

**Frontend:**
- HTML5
- CSS3 (with Tailwind CSS)
- Vanilla JavaScript (ES6+)

**Backend:**
- Python 3.8+
- Flask 3.0
- SQLAlchemy
- Flask-CORS

**Database:**
- SQLite (default)
- PostgreSQL (production recommended)
- MySQL (supported)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Python 3.8 or higher
- pip (Python package manager)
- Git (optional, for version control)

## 🔧 Installation & Setup

### 1. Clone or Download the Repository

```bash
# If using Git
git clone <repository-url>
cd "Antony arunga's portfolio 2026"
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create a virtual environment (recommended)
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create environment file (optional)
cp .env.example .env
# Edit .env file with your configurations
```

### 3. Initialize Database

```bash
# Still in the backend directory
# The database will be created automatically when you run the app
# But you can seed it with sample data:
python seed.py
```

### 4. Run the Backend Server

```bash
# Make sure you're in the backend directory
python app.py
```

The backend server will start at `http://localhost:5000`

### 5. Frontend Setup

```bash
# Open a new terminal
# Navigate to the frontend directory
cd frontend

# Open index.html in your browser
# Option 1: Direct file access
# Simply double-click index.html

# Option 2: Use a local server (recommended)
# If you have Python installed:
python -m http.server 8000
# Then visit http://localhost:8000

# Or use any other local server like Live Server (VS Code extension)
```

## 🎯 Usage

### Accessing the Portfolio

1. **Frontend**: Open `http://localhost:8000` (or your local server address)
2. **Backend API**: Available at `http://localhost:5000/api`

### Available Pages

- **Home** (`index.html`): Landing page with introduction
- **About** (`about.html`): About section with skills showcase
- **Projects** (`projects.html`): Dynamic project portfolio
- **Contact** (`contact.html`): Contact form

### API Endpoints

- `GET /api/projects` - Get all projects
- `GET /api/projects/<id>` - Get specific project
- `POST /api/projects` - Create new project
- `POST /api/contact` - Submit contact form
- `GET /api/contacts` - Get all contact submissions
- `GET /api/health` - Health check endpoint

## 🔐 Environment Variables

Create a `.env` file in the `backend` directory:

```env
SECRET_KEY=your-secret-key-here
FLASK_ENV=development
DATABASE_URL=sqlite:///database.db
```

## 📊 Database Schema

### Projects Table
- `id`: Integer (Primary Key)
- `title`: String(100)
- `description`: Text
- `technologies`: String(200) - Comma-separated
- `link`: String(200)
- `image_url`: String(200)
- `created_at`: DateTime

### Contacts Table
- `id`: Integer (Primary Key)
- `name`: String(100)
- `email`: String(120)
- `message`: Text
- `created_at`: DateTime

## 🚀 Deployment

### Backend Deployment (Heroku/Railway/Render)

1. Set environment variables on your hosting platform
2. Use PostgreSQL for production database
3. Update CORS settings for your frontend domain

### Frontend Deployment (Netlify/Vercel/GitHub Pages)

1. Update `API_BASE_URL` in `main.js` to your backend URL
2. Build and deploy static files

## 🎨 Customization

### Adding Your Own Projects

Option 1: Use the seed script
```python
# Edit backend/seed.py with your project data
python seed.py
```

Option 2: Use the API
```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Your Project",
    "description": "Project description",
    "technologies": ["Tech1", "Tech2"],
    "link": "https://github.com/yourproject"
  }'
```

### Styling

- Edit `frontend/css/style.css` for custom styles
- Tailwind classes can be added directly in HTML files
- Update color scheme in both CSS and HTML

## 🐛 Troubleshooting

**CORS Issues:**
- Ensure Flask-CORS is installed
- Check CORS configuration in `config.py`

**Database Connection:**
- Verify DATABASE_URL in `.env`
- Ensure database file has write permissions

**API Not Loading:**
- Confirm backend is running on port 5000
- Check browser console for errors
- Verify API_BASE_URL in `main.js`

## 📝 License

This project is licensed under the [MIT License](LICENSE) — feel free to use and adapt this project for your own portfolio!

## 👤 Author

**Antony Arunga**

## 🙏 Acknowledgments

- Tailwind CSS for the styling framework
- Flask for the backend framework
- All open-source contributors

---

**Need Help?** Check the issues section or contact via the portfolio contact form.
