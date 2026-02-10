import './style.css';

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            // Change icon if needed
            const isOpen = navMenu.classList.contains('open');
            mobileToggle.innerHTML = isOpen ? '✕' : '☰';
        });
    }

    // Highlighting active link
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        // Simple check for now, can be improved for production
        if (link.getAttribute('href') === currentPath ||
            (currentPath === '/' && link.getAttribute('href') === '/index.html') ||
            (currentPath === '/index.html' && link.getAttribute('href') === '/')) {
            link.classList.add('active');
        }
    });
});
