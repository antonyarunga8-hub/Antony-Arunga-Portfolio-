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
            
• <strong>Global Education Platform</strong> - Connecting students with internship opportunities
• <strong>Modern Cafe Commerce Platform</strong> - Full-stack e-commerce system
• <strong>Kaisha Ubbaga Foundation</strong> - Political organization website
• <strong>Personal Portfolio Website</strong> - This very site you're on!
• <strong>Safari Tour Company Platform</strong> - Booking system for safari tours

You can view all projects in detail on the <a href="projects.html" class="text-blue-500 hover:underline">Projects page</a>. Would you like to know more about any specific project?`;
        }

        // Skills
        if (lowerMessage.includes('skill') || lowerMessage.includes('technology') || lowerMessage.includes('tech stack')) {
            return `Antony has expertise in a wide range of technologies:

<strong>Programming Languages:</strong>
• Python (Advanced)
• JavaScript (Advanced)
• PHP (Intermediate)

<strong>Frameworks & Libraries:</strong>
• React, Flask, Node.js
• PyTorch for AI/ML

<strong>Other Skills:</strong>
• MySQL & Database Operations
• Responsive Web Design
• CSS3, Tailwind CSS
• Git & Version Control

Check out the <a href="about.html" class="text-blue-500 hover:underline">About page</a> for a complete breakdown of his skills!`;
        }

        // Experience
        if (lowerMessage.includes('experience') || lowerMessage.includes('work') || lowerMessage.includes('job')) {
            return `Antony is currently gaining valuable experience as:

<strong>Intern at Nobel Learning PBC</strong> (Dec 2025 - Present)
• Teamwork, Web Design, Software Development

<strong>Intern at Excelerate</strong> (Dec 2025 - Present)
• Flutter, Mobile App Development, Teamwork

He's also a graduate of Moringa School's AI program and holds certifications in Artificial Intelligence and Machine Learning. Visit the <a href="about.html" class="text-blue-500 hover:underline">About page</a> to learn more!`;
        }

        // Education
        if (lowerMessage.includes('education') || lowerMessage.includes('school') || lowerMessage.includes('study') || lowerMessage.includes('certificate')) {
            return `<strong>Education & Certifications:</strong>

🎓 <strong>Moringa School</strong> - Artificial Intelligence (2025-2026)
🎓 <strong>Institute Of Software Technologies</strong> - Computer Software Technology (2025-2026)

<strong>Recent Certification:</strong>
✅ AI Software Engineer - Moringa School (Dec 2025)

Antony is passionate about continuous learning and staying up-to-date with the latest technologies!`;
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
