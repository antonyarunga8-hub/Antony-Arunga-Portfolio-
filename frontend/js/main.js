// Main JavaScript for Antony Arunga's Portfolio

// API Configuration
const API_BASE_URL = 'https://my-portfolio-2026-1.onrender.com/api';

// Track page visit on load
function trackPageVisit() {
    const pageName = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
    const referrer = document.referrer || 'direct';
    
    fetch(`${API_BASE_URL}/analytics/track`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            page: pageName,
            referrer: referrer
        })
    }).catch(error => {
        console.log('Analytics tracking failed:', error);
        // Fail silently - don't impact user experience
    });
}

// Animated Counter
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
}

// Initialize counters on scroll
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    if (counters.length === 0) return;
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => observer.observe(counter));
}

// Load projects dynamically
async function loadProjects() {
    const container = document.getElementById('projects-container');
    const loadingIndicator = document.getElementById('loading-indicator');
    const backendNote = document.getElementById('backend-note');
    const emptyState = document.getElementById('empty-state');
    
    if (!container) return;

    // Show loading indicator
    if (loadingIndicator) {
        loadingIndicator.classList.remove('hidden');
    }

    try {
        const response = await fetch(`${API_BASE_URL}/projects`);
        
        if (!response.ok) {
            throw new Error('Backend not available');
        }
        
        const projects = await response.json();

        // Hide loading indicator
        if (loadingIndicator) {
            loadingIndicator.classList.add('hidden');
        }

        if (projects.length === 0) {
            // Show empty state
            if (emptyState) {
                emptyState.classList.remove('hidden');
            }
            return;
        }

        // Render projects from backend
        container.innerHTML = projects.map((project, index) => `
            <div class="project-card bg-white rounded-xl shadow-lg p-6 fade-in" style="animation-delay: ${index * 0.1}s">
                ${project.image_url ? `
                    <img src="${project.image_url}" alt="${project.title}" class="rounded-lg mb-4">
                ` : `
                    <div class="mb-4 h-48 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                        <i class="fas fa-laptop-code text-white text-6xl"></i>
                    </div>
                `}
                <h3 class="text-2xl font-bold mb-3 text-gray-800">${project.title}</h3>
                <p class="text-gray-600 mb-4 line-clamp-3">${project.description}</p>
                <div class="flex flex-wrap gap-2 mb-6">
                    ${project.technologies.map(tech => 
                        `<span class="project-badge">${tech}</span>`
                    ).join('')}
                </div>
                <a href="${project.link}" target="_blank" 
                   class="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold transition group">
                    View Project 
                    <i class="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
                </a>
            </div>
        `).join('');

    } catch (error) {
        console.error('Error loading projects:', error);
        
        // Hide loading indicator
        if (loadingIndicator) {
            loadingIndicator.classList.add('hidden');
        }
        
        // Show backend note
        if (backendNote) {
            backendNote.classList.remove('hidden');
        }
        
        // Display sample projects as fallback
        displaySampleProjects(container);
    }
}

// Display sample projects as fallback
function displaySampleProjects(container) {
    const sampleProjects = [
        {
            title: 'E-Commerce Platform',
            description: 'A full-stack e-commerce platform with user authentication, product management, shopping cart, and payment integration. Features include real-time inventory updates, order tracking, and admin dashboard.',
            technologies: ['Python', 'Flask', 'MySQL', 'JavaScript', 'Tailwind CSS'],
            link: '#',
            icon: 'fa-shopping-cart'
        },
        {
            title: 'Task Management App',
            description: 'A responsive task management application with drag-and-drop functionality, real-time updates, and collaborative features. Supports team workspaces, priority levels, and deadline tracking.',
            technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Socket.io'],
            link: '#',
            icon: 'fa-tasks'
        },
        {
            title: 'Weather Dashboard',
            description: 'An interactive weather dashboard that displays current conditions, forecasts, and weather maps using external APIs. Includes location-based weather, hourly and weekly forecasts.',
            technologies: ['JavaScript', 'HTML5', 'CSS3', 'OpenWeather API'],
            link: '#',
            icon: 'fa-cloud-sun'
        },
        {
            title: 'Portfolio Website',
            description: 'A personal portfolio website showcasing projects, skills, and contact information with a modern, responsive design. Built with performance and SEO in mind.',
            technologies: ['HTML5', 'CSS3', 'JavaScript', 'Tailwind CSS', 'Python', 'Flask'],
            link: '#',
            icon: 'fa-briefcase'
        },
        {
            title: 'Blog Platform',
            description: 'A content management system for blogging with markdown support, categories, tags, and comment functionality. Features include rich text editor, image uploads, and social sharing.',
            technologies: ['Python', 'Flask', 'PostgreSQL', 'Jinja2', 'Bootstrap'],
            link: '#',
            icon: 'fa-blog'
        },
        {
            title: 'Real-Time Chat Application',
            description: 'A real-time messaging application with private and group chat capabilities, file sharing, and user presence indicators. Supports emoji reactions, message threading, and video calls.',
            technologies: ['Node.js', 'Socket.io', 'Express', 'MongoDB', 'React'],
            link: '#',
            icon: 'fa-comments'
        }
    ];
    
    container.innerHTML = sampleProjects.map((project, index) => `
        <div class="project-card bg-white rounded-xl shadow-lg p-6 fade-in" style="animation-delay: ${index * 0.1}s">
            <div class="mb-4 h-48 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                <i class="fas ${project.icon} text-white text-6xl"></i>
            </div>
            <h3 class="text-2xl font-bold mb-3 text-gray-800">${project.title}</h3>
            <p class="text-gray-600 mb-4">${project.description}</p>
            <div class="flex flex-wrap gap-2 mb-6">
                ${project.technologies.map(tech => 
                    `<span class="project-badge">${tech}</span>`
                ).join('')}
            </div>
            <a href="${project.link}" class="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold transition group">
                View Project 
                <i class="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
            </a>
        </div>
    `).join('');
}

// Handle contact form submission
async function handleContactForm(e) {
    e.preventDefault();
    
    const submitButton = e.target.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;
    
    // Disable button and show loading
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    const messageDiv = document.getElementById('form-message');

    try {
        const response = await fetch(`${API_BASE_URL}/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (response.ok) {
            messageDiv.innerHTML = `
                <div class="message-success fade-in">
                    <div class="flex items-center">
                        <i class="fas fa-check-circle text-2xl mr-3"></i>
                        <div>
                            <h4 class="font-bold">Message Sent Successfully!</h4>
                            <p>Thank you for reaching out. I'll get back to you soon.</p>
                        </div>
                    </div>
                </div>
            `;
            document.getElementById('contact-form').reset();
        } else {
            throw new Error(result.error || 'Failed to send message');
        }
    } catch (error) {
        console.error('Error:', error);
        messageDiv.innerHTML = `
            <div class="message-error fade-in">
                <div class="flex items-center">
                    <i class="fas fa-exclamation-circle text-2xl mr-3"></i>
                    <div>
                        <h4 class="font-bold">Oops! Something went wrong</h4>
                        <p>Please make sure the backend server is running or try again later.</p>
                        <p class="text-sm mt-2">You can also reach me at: antonyarunga8@gmail.com</p>
                    </div>
                </div>
            </div>
        `;
    } finally {
        // Re-enable button
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonText;
        
        // Clear message after 8 seconds
        setTimeout(() => {
            messageDiv.innerHTML = '';
        }, 8000);
    }
}

// Smooth scroll for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Animate elements on scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements with animation classes
    document.querySelectorAll('.stat-card, .tech-card, .skill-item, .experience-card').forEach(el => {
        observer.observe(el);
    });
}

// Animate progress bars on the about page
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    if (progressBars.length === 0) return;
    
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const targetWidth = progressBar.style.width;
                progressBar.style.width = '0%';
                
                setTimeout(() => {
                    progressBar.style.width = targetWidth;
                }, 100);
                
                observer.unobserve(progressBar);
            }
        });
    }, observerOptions);

    progressBars.forEach(bar => observer.observe(bar));
}

// Back to Top Button
function initBackToTop() {
    // Create back to top button
    const backToTop = document.createElement('div');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTop.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTop);
    
    // Show/hide based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });
    
    // Scroll to top on click
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Add active state to navigation
function updateActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage) {
            link.classList.add('active-link');
        }
    });
}

// Dark Mode Toggle
function initDarkMode() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    
    if (!themeToggle || !themeIcon) {
        console.log('Theme toggle elements not found');
        return;
    }
    
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Apply theme on load
    if (currentTheme === 'dark') {
        document.documentElement.classList.add('dark-mode');
        document.body.classList.add('dark-mode');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        document.documentElement.classList.remove('dark-mode');
        document.body.classList.remove('dark-mode');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
    
    // Toggle theme on click
    themeToggle.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark-mode');
        document.body.classList.toggle('dark-mode');
        
        // Update icon and save preference
        if (document.body.classList.contains('dark-mode')) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Track page visit
    trackPageVisit();
    
    // Initialize dark mode
    initDarkMode();
    // Load projects if on projects page
    loadProjects();

    // Handle contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }

    // Initialize features
    initSmoothScroll();
    initScrollAnimations();
    animateProgressBars();
    initCounters();
    initBackToTop();
    updateActiveNav();

    // Add fade-in animation to main content
    const main = document.querySelector('main');
    if (main) {
        setTimeout(() => {
            main.classList.add('fade-in');
        }, 100);
    }
    
    // Console message for developers
    console.log('%c👋 Hello, Developer!', 'color: #667eea; font-size: 24px; font-weight: bold;');
    console.log('%cInterested in the code? Check it out on GitHub!', 'color: #666; font-size: 14px;');
    console.log('%chttps://github.com/antonyarunga8-hub', 'color: #2563eb; font-size: 14px;');
});

// Add window resize listener for responsive features
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Handle any resize-specific updates here
    }, 250);
});

// Performance optimization: Lazy load images
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}