/* ========================================
   PORTFOLIO WEBSITE - JAVASCRIPT
   ======================================== */

// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    
    /* ========================================
       DARK MODE / LIGHT MODE TOGGLE
       ======================================== */
    const themeToggle = document.querySelector('.theme-toggle');
    const htmlElement = document.documentElement;
    
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'dark';
    htmlElement.setAttribute('data-theme', currentTheme);
    
    // Toggle theme when button is clicked
    themeToggle.addEventListener('click', function() {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        // Update theme
        htmlElement.setAttribute('data-theme', newTheme);
        
        // Save preference to localStorage
        localStorage.setItem('theme', newTheme);
        
        // Log theme change
        console.log(`Theme switched to: ${newTheme} mode`);
    });
    
    /* ========================================
       MOBILE MENU TOGGLE
       ======================================== */
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    // Toggle mobile menu when hamburger is clicked
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
    
    // Close mobile menu when a nav link is clicked
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
    
    /* ========================================
       SMOOTH SCROLLING FOR ALL ANCHOR LINKS
       ======================================== */
    const allLinks = document.querySelectorAll('a[href^="#"]');
    
    allLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            // Skip if it's just '#'
            if (targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Get navbar height for offset
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                
                // Calculate position to scroll to
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                // Smooth scroll to target
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    /* ========================================
       NAVBAR BACKGROUND ON SCROLL
       ======================================== */
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
    
    /* ========================================
       SCROLL REVEAL ANIMATION (OPTIONAL)
       Adds fade-in effect when elements come into view
       ======================================== */
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all project cards and skill categories
    const animatedElements = document.querySelectorAll('.project-card, .skill-category');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    /* ========================================
       ACTIVE NAV LINK HIGHLIGHTING
       Highlights the current section in navigation
       ======================================== */
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            // Check if section is in viewport
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        // Remove active class from all links
        navLinks.forEach(link => {
            link.classList.remove('active');
            
            // Add active class to current section link
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
    
    /* ========================================
       DOWNLOAD RESUME BUTTON
       Add console log or analytics tracking
       ======================================== */
    const resumeButton = document.querySelector('.btn-secondary');
    
    if (resumeButton) {
        resumeButton.addEventListener('click', function(e) {
            // You can add analytics tracking here
            console.log('Resume download initiated');
            
            // Note: Make sure to add your actual resume PDF to assets/resume.pdf
            // If file doesn't exist, you may want to show a message
        });
    }
    
    /* ========================================
       EXTERNAL LINKS - OPEN IN NEW TAB
       Ensures all external links open in new tabs
       ======================================== */
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    
    externalLinks.forEach(link => {
        // Add security attributes for external links
        link.setAttribute('rel', 'noopener noreferrer');
    });
    
    /* ========================================
       CONSOLE MESSAGE
       ======================================== */
    console.log('%c Portfolio Website Loaded Successfully! ', 
                'background: #6B9080; color: white; font-size: 16px; padding: 10px;');
    console.log('Built with ❤️ using vanilla HTML, CSS, and JavaScript');
    console.log(`Current theme: ${currentTheme} mode`);
    
});

/* ========================================
   UTILITY FUNCTIONS
   ======================================== */

/**
 * Debounce function to limit how often a function can fire
 * Useful for scroll and resize events
 */
function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}