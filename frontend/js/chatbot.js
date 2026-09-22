// Ynot AI Chatbot
class YnotChatbot {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.isTyping = false;
        this.init();
    }

    init() {
        this.createChatbotHTML();
        this.attachEventListeners();
        this.addWelcomeMessage();
    }

    createChatbotHTML() {
        const chatbotHTML = `
            <!-- Chatbot Toggle Button -->
            <button id="chatbot-toggle" class="chatbot-toggle" aria-label="Open Ynot AI Assistant">
                <i class="fas fa-robot"></i>
                <span class="chatbot-badge">Ynot</span>
            </button>

            <!-- Chatbot Container -->
            <div id="chatbot-container" class="chatbot-container">
                <!-- Chatbot Header -->
                <div class="chatbot-header">
                    <div class="flex items-center gap-3">
                        <div class="chatbot-avatar">
                            <i class="fas fa-robot"></i>
                        </div>
                        <div>
                            <h3 class="chatbot-title">Ynot AI</h3>
                            <p class="chatbot-subtitle">
                                <span class="status-dot"></span>
                                Always here to help
                            </p>
                        </div>
                    </div>
                    <button id="chatbot-close" class="chatbot-close-btn" aria-label="Close chat">
                        <i class="fas fa-times"></i>
                    </button>
                </div>

                <!-- Chatbot Messages -->
                <div id="chatbot-messages" class="chatbot-messages">
                    <!-- Messages will be added here dynamically -->
                </div>

                <!-- Quick Actions -->
                <div id="quick-actions" class="quick-actions">
                    <button class="quick-action-btn" data-message="Tell me about Antony's projects">
                        <i class="fas fa-folder-open"></i> Projects
                    </button>
                    <button class="quick-action-btn" data-message="What are Antony's skills?">
                        <i class="fas fa-code"></i> Skills
                    </button>
                    <button class="quick-action-btn" data-message="How can I contact Antony?">
                        <i class="fas fa-envelope"></i> Contact
                    </button>
                    <button class="quick-action-btn" data-message="Tell me about Antony's experience">
                        <i class="fas fa-briefcase"></i> Experience
                    </button>
                </div>

                <!-- Chatbot Input -->
                <div class="chatbot-input-container">
                    <input 
                        type="text" 
                        id="chatbot-input" 
                        class="chatbot-input" 
                        placeholder="Ask me anything about Antony..."
                        autocomplete="off"
                    >
                    <button id="chatbot-send" class="chatbot-send-btn" aria-label="Send message">
                        <i class="fas fa-paper-plane"></i>
                    </button>
                </div>

                <!-- Powered By -->
                <div class="chatbot-footer">
                    <span class="text-xs text-gray-500">Powered by Ynot AI</span>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', chatbotHTML);
    }

    attachEventListeners() {
        // Toggle chatbot
        const toggleBtn = document.getElementById('chatbot-toggle');
        const closeBtn = document.getElementById('chatbot-close');
        
        toggleBtn.addEventListener('click', () => this.toggleChat());
        closeBtn.addEventListener('click', () => this.toggleChat());

        // Send message
        const sendBtn = document.getElementById('chatbot-send');
        const input = document.getElementById('chatbot-input');

        sendBtn.addEventListener('click', () => this.sendMessage());
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });

        // Quick actions
        const quickActionBtns = document.querySelectorAll('.quick-action-btn');
        quickActionBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const message = e.currentTarget.dataset.message;
                this.sendMessage(message);
            });
        });
    }

    toggleChat() {
        this.isOpen = !this.isOpen;
        const container = document.getElementById('chatbot-container');
        const toggle = document.getElementById('chatbot-toggle');

        if (this.isOpen) {
            container.classList.add('open');
            toggle.classList.add('hidden');
            document.getElementById('chatbot-input').focus();
        } else {
            container.classList.remove('open');
            toggle.classList.remove('hidden');
        }
    }

    addWelcomeMessage() {
        const welcomeMessage = `Hi! 👋 I'm Ynot, Antony's AI assistant. I can help you learn more about his projects, skills, and experience. What would you like to know?`;
        this.addMessage(welcomeMessage, 'bot');
    }

    sendMessage(predefinedMessage = null) {
        const input = document.getElementById('chatbot-input');
        const message = predefinedMessage || input.value.trim();

        if (!message) return;

        // Add user message
        this.addMessage(message, 'user');
        input.value = '';

        // Hide quick actions after first message
        document.getElementById('quick-actions').style.display = 'none';

        // Show typing indicator
        this.showTypingIndicator();

        // Simulate AI response
        setTimeout(() => {
            this.hideTypingIndicator();
            const response = this.generateResponse(message);
            this.addMessage(response, 'bot');
        }, 1000 + Math.random() * 1000);
    }

    addMessage(text, sender) {
        const messagesContainer = document.getElementById('chatbot-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `chatbot-message ${sender}-message fade-in`;

        if (sender === 'bot') {
            messageDiv.innerHTML = `
                <div class="message-avatar">
                    <i class="fas fa-robot"></i>
                </div>
                <div class="message-content">
                    <div class="message-bubble">${text}</div>
                    <span class="message-time">${this.getCurrentTime()}</span>
                </div>
            `;
        } else {
            messageDiv.innerHTML = `
                <div class="message-content">
                    <div class="message-bubble">${text}</div>
                    <span class="message-time">${this.getCurrentTime()}</span>
                </div>
            `;
        }

        messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
    }

    showTypingIndicator() {
        const messagesContainer = document.getElementById('chatbot-messages');
        const typingDiv = document.createElement('div');
        typingDiv.id = 'typing-indicator';
        typingDiv.className = 'chatbot-message bot-message fade-in';
        typingDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <div class="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        messagesContainer.appendChild(typingDiv);
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) {
            indicator.remove();
        }
    }

    generateResponse(message) {
        const lowerMessage = message.toLowerCase();

        // Projects
        if (lowerMessage.includes('project')) {
            return `Antony has worked on several impressive projects including:
            
• <strong>ArungaStudio Web Platform</strong> - Official MERN stack digital home & Global Learning Pathways
• <strong>Grow AI</strong> - AI-powered growth intelligence and workflow automation platform
• <strong>Arunga Bar & Cheers Hotel Sales Records (POS)</strong> - Flutter & Firebase POS solutions
• <strong>Global Education Platform</strong> - Connecting students with internship opportunities
• <strong>Modern Cafe Commerce Platform</strong> - Full-stack e-commerce system
• <strong>Personal Portfolio Website</strong> - Dynamic space-themed portfolio & AI chatbot
• <strong>Safari Tour Company Platform</strong> - Booking system for safari tours

You can view all projects in detail on the <a href="projects.html" class="text-blue-500 hover:underline">Projects page</a>. Would you like to know more about any specific project?`;
        }

        // Skills
        if (lowerMessage.includes('skill') || lowerMessage.includes('technology') || lowerMessage.includes('tech stack') || lowerMessage.includes('tool') || lowerMessage.includes('marketing')) {
            return `Antony possesses a comprehensive, multi-disciplinary tech, data, automation, and marketing stack:

<strong>Programming & Frameworks:</strong>
• Python (FastAPI, Django, Flask, PyTorch)
• JavaScript & TypeScript, React, Vue.js, Node.js, Express
• Flutter & Dart, PHP, HTML5/CSS3, Tailwind CSS

<strong>AI, ML & Data Operations:</strong>
• Data Annotation & Labeling, Multimodal Dataset QA (CloudFactory)
• Applied Machine Learning & AI Search Optimization (FlyRank AI)
• Prompt Engineering & Generative Model Evaluation (iMerit)
• Audio Transcription & Speech Data Validation (CrowdGen)
• Claude Code, Openclaw Agents, n8n Automation

<strong>Databases & Cloud:</strong>
• PostgreSQL, MySQL, SQL & NoSQL (Firebase, MongoDB)
• Drizzle ORM, Prisma ORM, Zod Validation, Docker, CI/CD, REST APIs

<strong>Digital Marketing & Strategy:</strong>
• SEO/SEM, Google Analytics, Google Ads, GHL CRM
• Graphic Design (Canva & Adobe Suite), Project Management

Check out the <a href="about.html" class="text-blue-500 hover:underline">About page</a> for a complete breakdown of his skills!`;
        }

        // Experience
        if (lowerMessage.includes('experience') || lowerMessage.includes('work') || lowerMessage.includes('job') || lowerMessage.includes('career')) {
            return `Antony has a diverse professional background across AI/ML engineering, data operations, and full-stack software development:

• 🏢 <strong>Founder & Lead Software Engineer @ arungastudio</strong>
  Leading end-to-end custom web, mobile, and AI software engineering projects for clients.

• 📊 <strong>Data Specialist @ CloudFactory</strong> (Sep 2026 - Present)
  Contractor supporting high-precision AI/ML data annotation, labeling, and quality pipelines.

• 🤖 <strong>Machine Learning Engineering Intern @ FlyRank AI</strong> (Jun 2026 - Present)
  Focusing on applied ML, AI search optimization, and practical AI capstone implementations.

• 🎓 <strong>Student Recruiter @ Open University of Kenya</strong> (Apr 2026 - Present)
  Appointed by the DVC Academic Affairs to guide prospective students into OUK programs.

• 🧠 <strong>AI Software Engineer @ iMerit Scholars</strong> (Mar 2026 - Present, Freelance)
  Evaluating AI image and video models for prompt adherence, visual quality, and benchmark datasets.

• 🎙️ <strong>Artificial Intelligence Engineer @ CrowdGen</strong> (Jan 2026 - Present, Freelance)
  Speech data annotation, audio transcription, and multilingual NLP validation.

• 🌐 <strong>AI Engineer & Full Stack Web App Developer @ Freelancer.com</strong> (Dec 2025 - Present, Freelance)
  Custom web apps (Python, PHP, JS, SQL), AI quality evaluation, API integrations & 100% project accept rate.

• ⭐ <strong>Digital Strategy Associate (Star Performer) @ Excelerate</strong> (Dec 2025 - June 2026)
  Cross-functional digital strategy, presentations, and Flutter UI development for Saint Louis University.

• 💻 <strong>Web Developer Intern @ Nobel Learning PBC</strong> (Dec 2025 - June 2026)
  Frontend/backend web development with JavaScript, React, PHP, and Python.

Visit the <a href="about.html" class="text-blue-500 hover:underline">About page</a> to explore his complete professional timeline!`;
        }

        // Education & Certifications
        if (lowerMessage.includes('education') || lowerMessage.includes('school') || lowerMessage.includes('study') || lowerMessage.includes('certificate') || lowerMessage.includes('credential')) {
            return `<strong>Education & Professional Certifications:</strong>

🎓 <strong>Academic Education:</strong>
• Moringa School - Artificial Intelligence Program (2025-2026)
• Institute Of Software Technologies - Computer Software Technology (2025-2026)

🏆 <strong>Featured Professional Credentials:</strong>
• <strong>AI Readiness for the Workforce of Tomorrow</strong> - Breedj Academy (Sep 2026)
• <strong>Remote Work Ready</strong> - Breedj Academy (Sep 2026)
• <strong>Autonomous Talent Playbook</strong> - Breedj Academy (Sep 2026)
• <strong>From Static Resumes to Trust Portfolios</strong> - Breedj Academy (Sep 2026)
• <strong>Job-Searching Strategy & Networking in Remote Work</strong> - Breedj Academy (Sep 2026)
• <strong>Digital Strategy Associate (⭐ Star Performer)</strong> - Excelerate · Saint Louis University (Jan 2026)
• <strong>AI Software Engineer</strong> - Moringa School (Dec 2025)
• <strong>Jobberman Soft Skills Training</strong> - Mastercard Foundation (Nov 2025)
• <strong>Soft Skills for Career Success</strong> - BrighterMonday Kenya (Nov 2025)

Visit the <a href="about.html" class="text-blue-500 hover:underline">About page</a> to inspect verified certificate badges and PDF downloads!`;
        }

        // Contact
        if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('reach') || lowerMessage.includes('hire')) {
            return `You can reach Antony through multiple channels:

📧 <strong>Email:</strong> <a href="mailto:antonyarunga8@gmail.com" class="text-blue-500 hover:underline">antonyarunga8@gmail.com</a>
📍 <strong>Location:</strong> Nairobi, Kenya
⏰ <strong>Availability:</strong> Mon-Sat 8am to 5:30 pm

<strong>Social Media:</strong>
• <a href="https://github.com/antonyarunga8-hub" target="_blank" class="text-blue-500 hover:underline">GitHub</a>
• <a href="https://www.linkedin.com/in/antony-arunga-b1935138a/" target="_blank" class="text-blue-500 hover:underline">LinkedIn</a>
• <a href="https://x.com/ArungaAnto79652" target="_blank" class="text-blue-500 hover:underline">Twitter</a>

Or visit the <a href="contact.html" class="text-blue-500 hover:underline">Contact page</a> to send a direct message!`;
        }

        // About/Introduction
        if (lowerMessage.includes('who') || lowerMessage.includes('about') || lowerMessage.includes('introduce')) {
            return `Antony Arunga is a <strong>Full Stack Developer</strong> and <strong>AI Enthusiast</strong> from Nairobi, Kenya.

He's passionate about:
• Building beautiful, functional web applications
• Exploring AI and Machine Learning technologies
• Solving real-world problems through code
• Humanitarian work and community service

Currently, he's interning at Nobel Learning PBC and Excelerate, while pursuing certifications in Artificial Intelligence. He has completed several impressive projects across e-commerce, education, and political platforms.

Want to know more? Check out the <a href="about.html" class="text-blue-500 hover:underline">About page</a>!`;
        }

        // Resume/CV
        if (lowerMessage.includes('resume') || lowerMessage.includes('cv') || lowerMessage.includes('download')) {
            return `You can download Antony's resume here:

📄 <a href="assets/Antony_Arunga_Resume_2026.pdf" download class="text-blue-500 hover:underline font-semibold">Download Resume (PDF)</a>

The resume includes detailed information about his skills, experience, projects, and education.`;
        }

        // AI/Machine Learning specific
        if (lowerMessage.includes('ai') || lowerMessage.includes('machine learning') || lowerMessage.includes('pytorch')) {
            return `Antony has a strong interest in AI and Machine Learning!

<strong>AI Expertise:</strong>
• Recently completed AI Software Engineer certification at Moringa School
• Proficient in PyTorch for deep learning
• Learning about Neural Networks and LLMs
• Applying AI concepts to real-world projects

He's currently expanding his knowledge in AI/ML and looking for opportunities to apply these skills in innovative projects.`;
        }

        // Availability
        if (lowerMessage.includes('available') || lowerMessage.includes('time') || lowerMessage.includes('hours')) {
            return `Antony is available:

⏰ <strong>Monday to Saturday</strong>
🕐 <strong>8:00 AM to 5:30 PM</strong> (EAT - East Africa Time)

He typically responds to messages within 24 hours. Feel free to reach out via the <a href="contact.html" class="text-blue-500 hover:underline">Contact page</a>!`;
        }

        // Greetings
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
            return `Hello! 👋 Great to chat with you! I'm Ynot, Antony's AI assistant. 

I can help you learn about:
• His projects and portfolio
• Technical skills and expertise
• Work experience and education
• How to get in touch with him

What would you like to know?`;
        }

        // Thanks
        if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
            return `You're very welcome! 😊 If you have any other questions about Antony's work, skills, or how to get in touch, feel free to ask. I'm here to help!`;
        }

        // Default response
        return `That's an interesting question! While I can provide information about Antony's projects, skills, experience, and contact details, I might not have specific information about "${message}".

Here's what I can help you with:
• <strong>Projects</strong> - View his portfolio work
• <strong>Skills</strong> - Learn about his technical expertise
• <strong>Experience</strong> - Discover his work history
• <strong>Contact</strong> - Get in touch with Antony
• <strong>Education</strong> - Learn about his certifications

What would you like to know more about?`;
    }

    scrollToBottom() {
        const messagesContainer = document.getElementById('chatbot-messages');
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    getCurrentTime() {
        const now = new Date();
        return now.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
        });
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const chatbot = new YnotChatbot();
});
