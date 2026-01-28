from app import app, db
from models import Project, ContactMessage
from datetime import datetime

def seed_database():
    with app.app_context():
        # Clear existing data
        Project.query.delete()
        ContactMessage.query.delete()
        
        # Add real projects in the specified order
        projects = [
            # 1. Excelerate - Global Education Platform (COMPLETED)
            Project(
                title='Excelerate - Global Education Platform',
                description='A comprehensive educational platform connecting students with global internship opportunities, workshops, and masterclasses. Features include student registration, employer partnerships, educator collaboration, and a complete pathway management system. Built with modern web technologies for optimal user experience.',
                technologies='HTML5, CSS3, JavaScript, Responsive Design, UI/UX Design',
                image_url='assets/images/Global Education Platform 1 Home.jpg',
                link='https://github.com/antonyarunga8-hub/excelerate',
                status='completed',
                created_at=datetime.utcnow()
            ),
            
            # 2. Modern Cafe Commerce Platform (COMPLETED)
            Project(
                title='Modern Cafe Commerce Platform',
                description='Full-stack e-commerce platform for modern cafes with React and TypeScript. Features include product catalog, shopping cart, order management, payment integration, and admin dashboard. Implements Material-UI and Radix UI components with responsive masonry layouts and smooth animations.',
                technologies='React, TypeScript, Vite, Tailwind CSS, Material-UI, Radix UI, React Router',
                image_url='assets/images/Modern Cafe Commerce Platform1 Home.jpg',
                link='https://github.com/antonyarunga8-hub/modern-cafe-platform',
                status='completed',
                created_at=datetime.utcnow()
            ),
            
            # 3. Kaisha Ubbaga Foundation Website (COMPLETED)
            Project(
                title='Kaisha Ubbaga Foundation Website',
                description='Professional website for a political organization focused on community development and civic engagement. Features include news section, event management, volunteer registration, donation system, and interactive community forums. Built with focus on accessibility and mobile responsiveness.',
                technologies='HTML5, CSS3, JavaScript, PHP, MySQL, Responsive Design',
                image_url='assets/images/Kaisha Ubbaga Foundation1 Home.jpg',
                link='https://github.com/antonyarunga8-hub/kaisha-foundation',
                status='completed',
                created_at=datetime.utcnow()
            ),
            
            # 4. Personal Portfolio Website (COMPLETED)
            Project(
                title='Personal Portfolio Website',
                description='Personal portfolio website showcasing projects, skills, and professional experience. Features include dynamic project loading, contact form with backend integration, animated UI components, and SEO optimization. Built with Flask backend and modern frontend technologies.',
                technologies='Python, Flask, SQLAlchemy, HTML5, CSS3, JavaScript, Tailwind CSS, MySQL',
                image_url='assets/images/Personal Portfolio Website 1Home.jpg',
                link='https://github.com/antonyarunga8-hub/portfolio-2026',
                status='completed',
                created_at=datetime.utcnow()
            ),
            
            # 5. Safari Tour Company Platform (COMPLETED)
            Project(
                title='Safari Tour Company Platform',
                description='Comprehensive booking and management platform for safari tour operations. Features include tour package management, online booking system, customer reviews, photo gallery, and real-time availability tracking. Designed to enhance customer experience and streamline tour operations.',
                technologies='HTML5, CSS3, JavaScript, PHP, MySQL, Payment Integration',
                image_url='assets/images/Safari Tour Company Platform.jpg',
                link='https://github.com/antonyarunga8-hub/safari-tours',
                status='completed',
                created_at=datetime.utcnow()
            ),
            
            # 6. Weather Dashboard Application (IN PROGRESS)
            Project(
                title='Weather Dashboard Application',
                description='Interactive weather application providing real-time weather data, forecasts, and weather maps using OpenWeather API. Features include location-based weather, hourly and 7-day forecasts, weather alerts, and favorite locations. Built with vanilla JavaScript and modern CSS.',
                technologies='JavaScript, HTML5, CSS3, OpenWeather API, Local Storage',
                image_url='assets/images/placeholder-weather.jpg',
                link='https://github.com/antonyarunga8-hub/weather-dashboard',
                status='in_progress',
                created_at=datetime.utcnow()
            ),
            
            # 7. Task Management System (IN PROGRESS)
            Project(
                title='Task Management System',
                description='Collaborative task management application for teams and individuals. Features include task creation, assignment, priority levels, deadline tracking, progress monitoring, and team collaboration tools. Built with focus on productivity and user experience.',
                technologies='React, Node.js, Express, MongoDB, Socket.io',
                image_url='assets/images/placeholder-task.jpg',
                link='https://github.com/antonyarunga8-hub/task-management',
                status='in_progress',
                created_at=datetime.utcnow()
            )
        ]
        
        # Add all projects to database
        for project in projects:
            db.session.add(project)
        
        db.session.commit()
        print("✅ Database seeded successfully with 7 projects!")
        print("\nProjects added:")
        for i, project in enumerate(projects, 1):
            status_icon = "✅" if project.status == 'completed' else "🚧"
            print(f"  {i}. {status_icon} {project.title} ({project.status.upper()})")

if __name__ == '__main__':
    seed_database()
