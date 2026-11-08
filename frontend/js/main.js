// Main JavaScript for Antony Arunga's Portfolio

// Dynamic API Configuration (Auto-detects Localhost vs Render Cloud Backend)
const API_BASE_URL = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? 'http://localhost:5000/api'
    : 'https://my-portfolio-2026-1.onrender.com/api';

// Track page visit on load in real-time
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
        // Fail silently on public pages - don't disrupt visitor experience
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
            title: 'GrowAI SaaS Platform',
            description: 'AI-driven social media growth and content creation engine powered by OpenAI GPT-4o, Stripe subscriptions, Next.js, and cross-platform Flutter client.',
            technologies: ['Next.js 14', 'Flutter', 'TypeScript', 'OpenAI GPT-4o', 'Stripe'],
            link: 'https://github.com/antonyarunga8-hub/growai-saas',
            icon: 'fa-brain'
        },
        {
            title: 'SecurePay Fintech',
            description: 'High-security multi-currency fintech platform with Safaricom Daraja M-Pesa STK push, utility bill payments, and biometric Flutter mobile app.',
            technologies: ['Flutter', 'Node.js', 'Firebase', 'Daraja M-Pesa API', 'Web Crypto'],
            link: 'https://github.com/antonyarunga8-hub/securepay-fintech',
            icon: 'fa-shield-alt'
        },
        {
            title: 'Global Education Platform',
            description: 'Comprehensive platform connecting students with global internship pathways, masterclasses, and employer partnerships with real-time Firestore sync.',
            technologies: ['HTML5', 'Tailwind CSS', 'JavaScript', 'Firebase Firestore'],
            link: 'https://github.com/antonyarunga8-hub/global-education-platform',
            icon: 'fa-graduation-cap'
        },
        {
            title: 'Cheers Hotel POS App',
            description: 'Dual-platform POS sales recording system replacing manual receipt books with synchronized till and mobile ordering writing to Firestore with ESC/POS thermal printing.',
            technologies: ['Flutter', 'Dart', 'Firebase Firestore', 'ESC/POS Driver'],
            link: 'https://github.com/antonyarunga8-hub/Cheers-hotel-Sales-Records-app',
            icon: 'fa-cash-register'
        },
        {
            title: 'AI4SMES Africa Platform',
            description: 'Pan-African AI business operating system empowering African SMEs with digital automation tools, customer service bots, and WhatsApp OS simulator.',
            technologies: ['React 18', 'Vite', 'Tailwind CSS', 'Python', 'Recharts'],
            link: 'https://github.com/antonyarunga8-hub/AI4SMES',
            icon: 'fa-robot'
        },
        {
            title: 'Wild Safari Tours Platform',
            description: 'Premium safari tour booking web platform with package management, customer reviews, and serverless Firebase booking management.',
            technologies: ['JavaScript', 'HTML5', 'CSS3', 'Firebase Cloud Functions'],
            link: 'https://github.com/antonyarunga8-hub/Safari-tour-company-',
            icon: 'fa-compass'
        }
    ];
    
    container.innerHTML = sampleProjects.map((project, index) => `
        <div class="project-card bg-white rounded-xl shadow-lg p-6 fade-in" style="animation-delay: ${index * 0.1}s">
            <div class="mb-4 h-48 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 rounded-lg flex items-center justify-center">
                <i class="fas ${project.icon} text-white text-6xl"></i>
            </div>
            <h3 class="text-2xl font-bold mb-3 text-gray-800">${project.title}</h3>
            <p class="text-gray-600 mb-4 line-clamp-3">${project.description}</p>
            <div class="flex flex-wrap gap-2 mb-6">
                ${project.technologies.map(tech => 
                    `<span class="project-badge">${tech}</span>`
                ).join('')}
            </div>
            <a href="${project.link}" target="_blank" class="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold transition group">
                <i class="fab fa-github mr-2"></i>View Code 
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
    
    // Check for saved theme preference or default to dark mode
    const currentTheme = localStorage.getItem('theme') || 'dark';
    
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