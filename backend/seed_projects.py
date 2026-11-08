import sqlite3
import os

db_path = os.path.join(os.path.dirname(__file__), 'instance', 'portfolio.db')
conn = sqlite3.connect(db_path)
c = conn.cursor()

# Ensure table exists
c.execute('''
CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    technologies VARCHAR(200) NOT NULL,
    link VARCHAR(200),
    image_url VARCHAR(200),
    status VARCHAR(20) DEFAULT 'completed',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
''')

# Clear existing projects to avoid duplicate seeds
c.execute('DELETE FROM projects')

projects_data = [
    (
        "Global Education Platform",
        "Comprehensive web platform connecting students with global internship opportunities, workshops, and masterclasses with pathway management and educator collaboration.",
        "HTML5,CSS3,JavaScript,Firebase Firestore,Tailwind CSS",
        "https://github.com/antonyarunga8-hub/global-education-platform",
        "assets/images/Global Education Platform 1 Home.jpg",
        "completed"
    ),
    (
        "Modern Cafe Commerce Platform",
        "Full-stack e-commerce shopping web application built with React, Vite, and Material-UI. Features product catalog, cart, order management, and admin dashboard.",
        "React,TypeScript,Vite,Material-UI,Tailwind CSS",
        "https://github.com/antonyarunga8-hub/apseshopping-react",
        "assets/images/Modern Cafe Commerce Platform1 Home.jpg",
        "completed"
    ),
    (
        "GrowAI SaaS Platform",
        "AI-powered SaaS growth platform and cross-platform Flutter application for creators featuring viral captions, OpenAI GPT-4o, Prisma, and Stripe billing.",
        "Next.js 14,TypeScript,Flutter,OpenAI GPT-4o,Stripe,PostgreSQL",
        "https://github.com/antonyarunga8-hub/growai-saas",
        "",
        "completed"
    ),
    (
        "SecurePay Fintech Platform",
        "AI-driven cybersecurity fintech platform and mobile Flutter wallet featuring Safaricom Daraja M-Pesa STK push, utility bill payments, and biometric authentication.",
        "Flutter,Dart,Node.js,Firebase,Daraja M-Pesa API",
        "https://github.com/antonyarunga8-hub/securepay-fintech",
        "",
        "completed"
    ),
    (
        "AI4SMES Africa Platform",
        "Pan-African AI business operating system empowering African SMEs with digital automation tools, multilingual assistant, and WhatsApp Business OS simulator.",
        "React 18,Vite,Tailwind CSS,Python,PyTorch",
        "https://github.com/antonyarunga8-hub/AI4SMES",
        "",
        "completed"
    ),
    (
        "Cheers Hotel Sales Records (POS)",
        "Dual-platform POS sales records app built for Cheers Hotel replacing manual receipt books with synchronized desktop till and mobile phone ordering with ESC/POS thermal printing.",
        "Flutter,Dart,Firebase Firestore,ESC/POS Driver",
        "https://github.com/antonyarunga8-hub/Cheers-hotel-Sales-Records-app",
        "",
        "completed"
    ),
    (
        "StudoCorp Transit Platform",
        "Student transit tracking platform for Kenyan high schools enabling real-time bus tracking, automated parent transit notifications, and school administrator dashboards.",
        "HTML5,CSS3,JavaScript,Netlify",
        "https://github.com/antonyarunga8-hub/studocorp",
        "",
        "completed"
    ),
    (
        "Kaisha Ubbaga Foundation",
        "Official non-profit foundation web platform supporting ethical leadership and community empowerment in Vihiga County with M-Pesa donation processing and admin portal.",
        "PHP 8,MySQL,M-Pesa API,JavaScript,HTML5",
        "https://github.com/antonyarunga8-hub/Kaisha-Ubbaga-Foundation-",
        "assets/images/Kaisha Ubbaga Foundation1 Home.jpg",
        "completed"
    ),
    (
        "Wild Safari Tours Booking Platform",
        "Modern safari tour booking and reservation platform with tour package management, customer reviews, photo gallery, and serverless Firebase booking management.",
        "HTML5,CSS3,JavaScript,Firebase Cloud Functions",
        "https://github.com/antonyarunga8-hub/Safari-tour-company-",
        "assets/images/Safari Tour Company Platform.jpg",
        "completed"
    ),
    (
        "Cross-Platform Mobile Learning App",
        "Cross-platform student mobile learning application built with Flutter featuring interactive lessons, progress tracking, and student assessments.",
        "Flutter,Dart,Firebase,REST API",
        "https://github.com/antonyarunga8-hub/mobile-learning-app",
        "",
        "completed"
    ),
    (
        "Kolman Grains Retail Platform",
        "Corporate website and catalog for Kolman Grains Engineering Ltd covering grain storage, automated monitoring, and drying solutions across Africa.",
        "HTML5,CSS3,JavaScript,Netlify",
        "https://github.com/antonyarunga8-hub/kolman-grains",
        "",
        "completed"
    ),
    (
        "TWC Digital Signatures",
        "Digital corporate email signature generator and document management tool allowing users to capture, verify, and export digital signatures.",
        "JavaScript,HTML5,CSS3,Canvas API",
        "https://github.com/antonyarunga8-hub/twc-signatures",
        "",
        "completed"
    ),
    (
        "Personal Portfolio Website",
        "Modern developer portfolio website with dynamic project loading, contact form with backend validation, cosmic space theme, and admin command center.",
        "Python,Flask,JavaScript,Tailwind CSS,Netlify",
        "https://github.com/antonyarunga8-hub/Antony-Arunga-Portfolio-",
        "assets/images/Personal Portfolio Website 1Home.jpg",
        "completed"
    )
]

c.executemany('''
INSERT INTO projects (title, description, technologies, link, image_url, status)
VALUES (?, ?, ?, ?, ?, ?)
''', projects_data)

conn.commit()
print(f"Successfully seeded {len(projects_data)} projects into {db_path}!")
conn.close()
