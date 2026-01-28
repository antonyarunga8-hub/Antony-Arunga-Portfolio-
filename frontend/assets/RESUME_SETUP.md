# Resume Setup Instructions

## Adding Your Resume to the Portfolio

Your portfolio has a "Download Resume" button that links to your resume PDF. Follow these steps to add your resume:

### Step 1: Prepare Your Resume
- Create or update your resume in PDF format
- Name it: `Antony_Arunga_Resume_2026.pdf`
- Keep the file size under 5MB for fast downloads

### Step 2: Add Resume to Portfolio
Place your resume PDF file here:
```
/Applications/XAMPP/xamppfiles/htdocs/Antony arunga's portfolio 2026/frontend/assets/
```

The file should be:
```
frontend/assets/Antony_Arunga_Resume_2026.pdf
```

### Step 3: Verify the Button Works
1. Open your portfolio: `http://localhost/Antony arunga's portfolio 2026/frontend/index.html`
2. Click the "Download Resume" button
3. Your resume should download

### Current Setup
- ✅ Download button is active on the homepage
- ✅ Button styled and positioned correctly
- ⏳ **You need to add your actual resume PDF file**

### Alternative Resume Names
If you want to use a different filename, update these locations in `index.html`:
```html
<a href="assets/YOUR_RESUME_NAME.pdf" download class="btn-outline">
```

## Tips for Resume PDF
- Use a professional format
- Include: Contact info, experience, education, skills
- Make it ATS-friendly (Applicant Tracking System)
- Keep it 1-2 pages maximum
- Use clear section headings
- List your Moringa School and Institute of Software Technologies education
- Include your internships at Nobel Learning PBC and Excelerate

## Example Resume Sections
1. **Header**: Name, title, contact info
2. **Summary**: Brief professional summary
3. **Experience**: Nobel Learning PBC, Excelerate internships
4. **Education**: Moringa School, Institute of Software Technologies
5. **Skills**: Python, JavaScript, HTML5, CSS3, React, Node.js, PyTorch, MySQL, etc.
6. **Certifications**: Moringa AI Certificate
7. **Projects**: Link to your portfolio for details
