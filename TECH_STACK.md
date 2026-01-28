# Technology Stack Documentation

## Overview

This portfolio is built using a modern, full-stack architecture with clear separation between frontend and backend concerns.

## Frontend Technologies

### Core Technologies

#### HTML5
- **Version**: HTML5
- **Purpose**: Semantic markup and structure
- **Key Features Used**:
  - Semantic elements (`<nav>`, `<main>`, `<section>`, `<footer>`)
  - Form elements with validation
  - Meta tags for SEO and responsive design

#### CSS3
- **Purpose**: Styling and layout
- **Key Features Used**:
  - Flexbox and Grid layouts
  - CSS animations and transitions
  - Custom properties (variables)
  - Media queries for responsive design

#### Tailwind CSS
- **Version**: 2.2.19 (CDN)
- **Purpose**: Utility-first CSS framework
- **Key Classes Used**:
  - Layout: `container`, `mx-auto`, `flex`, `grid`
  - Spacing: `p-4`, `mt-10`, `mb-8`, `space-x-6`
  - Typography: `text-2xl`, `font-bold`, `text-gray-600`
  - Colors: `bg-gray-800`, `text-white`, `hover:bg-blue-700`
  - Responsive: `md:grid-cols-2`, `lg:grid-cols-3`

#### JavaScript (ES6+)
- **Version**: Modern ES6+ features
- **Purpose**: Dynamic functionality and API integration
- **Key Features Used**:
  - Async/await for API calls
  - Fetch API for HTTP requests
  - Arrow functions
  - Template literals
  - Destructuring
  - Array methods (map, filter)
  - Event listeners
  - DOM manipulation

### Frontend Architecture

```
frontend/
├── HTML Pages
│   ├── index.html      → Home/Landing page
│   ├── about.html      → About and Skills
│   ├── projects.html   → Projects showcase
│   └── contact.html    → Contact form
├── Styles
│   └── css/style.css   → Custom CSS and animations
├── Scripts
│   └── js/main.js      → Frontend logic and API calls
└── Assets
    └── images/         → Image resources
```

### Key Frontend Features

1. **Responsive Design**
   - Mobile-first approach
   - Breakpoints: sm (640px), md (768px), lg (1024px)
   - Flexible grid layouts

2. **Dynamic Content Loading**
   - Projects fetched from backend API
   - Real-time form validation
   - Error handling and user feedback

3. **Animations**
   - Fade-in effects on page load
   - Hover transformations on project cards
   - Smooth scrolling

## Backend Technologies

### Core Technologies

#### Python
- **Version**: 3.8+
- **Purpose**: Backend programming language
- **Why Python**: 
  - Clean, readable syntax
  - Excellent ecosystem for web development
  - Strong community support

#### Flask
- **Version**: 3.0.0
- **Purpose**: Web framework
- **Why Flask**:
  - Lightweight and flexible
  - Easy to learn and use
  - Extensive extension ecosystem
- **Key Features Used**:
  - Routing and URL handling
  - Request/response handling
  - Blueprints for modular design
  - JSON serialization

#### Flask-SQLAlchemy
- **Version**: 3.1.1
- **Purpose**: ORM (Object-Relational Mapping)
- **Why SQLAlchemy**:
  - Database-agnostic
  - Pythonic query interface
  - Relationship management
- **Key Features Used**:
  - Model definitions
  - Query building
  - Automatic schema generation
  - Relationship mapping

#### Flask-CORS
- **Version**: 4.0.0
- **Purpose**: Cross-Origin Resource Sharing
- **Why CORS**:
  - Enables frontend-backend communication
  - Security management
  - Configurable origin policies

### Backend Architecture

```
backend/
├── app.py              → Application factory and entry point
├── config.py           → Configuration management
├── models.py           → Database models (Project, Contact)
├── routes.py           → API endpoints
├── seed.py             → Database seeding script
└── requirements.txt    → Python dependencies
```

### Database Options

#### SQLite (Default - Development)
- **Purpose**: Local development and testing
- **Pros**:
  - Zero configuration
  - File-based (portable)
  - Perfect for development
- **Cons**:
  - Not ideal for production
  - Limited concurrent access

#### PostgreSQL (Recommended - Production)
- **Purpose**: Production database
- **Pros**:
  - Robust and reliable
  - Advanced features
  - Excellent for production
  - Free and open-source
- **Configuration**:
  ```
  DATABASE_URL=postgresql://username:password@localhost/portfolio_db
  ```

#### MySQL (Supported - Alternative)
- **Purpose**: Alternative production database
- **Pros**:
  - Wide hosting support
  - Good performance
  - Popular and well-documented
- **Configuration**:
  ```
  DATABASE_URL=mysql://username:password@localhost/portfolio_db
  ```

## API Design

### RESTful Architecture

The backend follows REST principles:

1. **Resource-based URLs**
   - `/api/projects` - Project collection
   - `/api/projects/<id>` - Individual project
   - `/api/contact` - Contact submissions

2. **HTTP Methods**
   - `GET` - Retrieve data
   - `POST` - Create new data
   - `PUT/PATCH` - Update data (not implemented)
   - `DELETE` - Remove data (not implemented)

3. **Status Codes**
   - `200 OK` - Successful GET/PUT
   - `201 Created` - Successful POST
   - `400 Bad Request` - Invalid input
   - `404 Not Found` - Resource not found
   - `500 Internal Server Error` - Server error

### API Endpoints Documentation

#### GET /api/projects
```json
Response: [
  {
    "id": 1,
    "title": "Project Name",
    "description": "Description",
    "technologies": ["Tech1", "Tech2"],
    "link": "https://github.com/...",
    "image_url": "...",
    "created_at": "2026-01-10T12:00:00"
  }
]
```

#### POST /api/projects
```json
Request: {
  "title": "New Project",
  "description": "Description",
  "technologies": ["Tech1", "Tech2"],
  "link": "https://...",
  "image_url": "..."
}

Response: {
  "id": 2,
  "title": "New Project",
  ...
}
```

#### POST /api/contact
```json
Request: {
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello!"
}

Response: {
  "message": "Contact form submitted successfully",
  "data": {...}
}
```

## Development Tools

### Version Control
- **Git**: Source code management
- **GitHub**: Repository hosting

### Code Editor (Recommended)
- **VS Code** with extensions:
  - Python
  - Pylance
  - Prettier
  - Live Server

### Testing Tools
- **Postman**: API testing
- **Browser DevTools**: Frontend debugging
- **Python unittest**: Backend testing (to be implemented)

## Deployment Stack

### Backend Hosting Options
1. **Heroku**
   - Easy deployment
   - PostgreSQL add-on
   - Free tier available

2. **Railway**
   - Modern deployment
   - Automatic HTTPS
   - Database included

3. **Render**
   - Free tier
   - Auto-deploy from Git
   - Built-in PostgreSQL

### Frontend Hosting Options
1. **Netlify**
   - CDN distribution
   - Continuous deployment
   - Custom domains

2. **Vercel**
   - Fast deployment
   - Global CDN
   - Preview deployments

3. **GitHub Pages**
   - Free hosting
   - Custom domain support
   - Git-based deployment

## Security Considerations

1. **Environment Variables**
   - Secret keys in `.env` file
   - Never commit `.env` to Git

2. **CORS Configuration**
   - Whitelist specific origins
   - Disable in development only when needed

3. **Input Validation**
   - Server-side validation
   - SQL injection prevention (SQLAlchemy)
   - XSS protection

4. **HTTPS**
   - Use HTTPS in production
   - Secure cookies
   - HSTS headers

## Performance Optimizations

### Frontend
1. **Minimize HTTP Requests**
   - CDN for Tailwind CSS
   - Combine CSS/JS files

2. **Optimize Images**
   - Compress images
   - Use appropriate formats
   - Lazy loading

3. **Caching**
   - Browser caching
   - Service workers (future)

### Backend
1. **Database Optimization**
   - Indexes on frequently queried columns
   - Connection pooling
   - Query optimization

2. **Response Optimization**
   - JSON compression
   - Pagination for large datasets
   - Caching frequently accessed data

## Future Enhancements

### Planned Features
1. **Authentication System**
   - User registration/login
   - Admin dashboard
   - JWT tokens

2. **Advanced Features**
   - Blog functionality
   - Project filtering/search
   - Comments system

3. **Performance**
   - Redis caching
   - CDN integration
   - Image optimization

4. **Testing**
   - Unit tests
   - Integration tests
   - E2E tests

## Learning Resources

### Frontend
- [MDN Web Docs](https://developer.mozilla.org/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [JavaScript.info](https://javascript.info/)

### Backend
- [Flask Documentation](https://flask.palletsprojects.com/)
- [SQLAlchemy Documentation](https://docs.sqlalchemy.org/)
- [Python Official Docs](https://docs.python.org/3/)

### General
- [REST API Best Practices](https://restfulapi.net/)
- [Web Development MDN](https://developer.mozilla.org/en-US/docs/Web)

---

**Last Updated**: January 2026
**Maintained By**: Antony Arunga
