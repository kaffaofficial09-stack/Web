import os
import re

project_dir = r"C:\Users\krisn\.gemini\antigravity\scratch\kaffah-education"
html_files = [f for f in os.listdir(project_dir) if f.endswith('.html')]

# Regex to find the logo text (flexible for with/without comment)
logo_pattern = re.compile(r'<a href="/" class="logo">\s*Kewirus(?:<!--.*?-->)?\s*<span style="color: var\(--primary-dark\)">Education</span>\s*</a>', re.DOTALL)

# Replacement logo tag
new_logo = r'''<a href="/" class="logo">
          <img src="/logo.jpg" alt="Kaffah Education Partner" style="height: 50px;">
        </a>'''

# Fix for index.html CSS error
css_error_pattern = re.compile(r'text-center; text-align: center;')
css_fix = 'text-align: center;'

for file in html_files:
    file_path = os.path.join(project_dir, file)
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace Logo
    new_content = logo_pattern.sub(new_logo, content)
    
    # Fix CSS error (specifically in index.html, but safe to run on all)
    new_content = css_error_pattern.sub(css_fix, new_content)
    
    # Footer Logo replace (it is simple text in footer)
    # <div class="footer-logo">Kaffah Education Partner</div>
    # Let's keep the footer logo as text or maybe add the image? White text is better on dark bg.
    # The logo has a white background, so it might look boxy on dark footer.
    # Let's keep footer as text for now, or just leave it. The user asked to "implement logo on website", usually header is key.
    
    if content != new_content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {file}")
    else:
        print(f"No changes for {file}")
