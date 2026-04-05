// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('active');
        menuToggle.innerHTML = isOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        menuToggle.setAttribute('aria-expanded', isOpen);
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        if (menuToggle) {
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });
});

// Highlight active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinksList = document.querySelectorAll('.nav-links a');

function updateActiveLink() {
    let fromTop = window.scrollY + 100;
    sections.forEach(section => {
        if (section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop) {
            const id = section.getAttribute('id');
            navLinksList.forEach(link => {
                const href = link.getAttribute('href');
                link.classList.toggle('active', href === `#${id}`);
            });
        }
    });
}

window.addEventListener('scroll', updateActiveLink);
document.addEventListener('DOMContentLoaded', updateActiveLink);

// Set current year in footer
const yearSpan = document.getElementById('currentYear');
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nameInput = contactForm.querySelector('input[type="text"]');
        const name = nameInput ? nameInput.value : 'there';
        
        // Google-inspired toast notification style
        const toast = document.createElement('div');
        toast.textContent = `✨ Thanks ${name}! Your message is on its way. I'll reply soon. ✨`;
        toast.style.position = 'fixed';
        toast.style.bottom = '20px';
        toast.style.left = '50%';
        toast.style.transform = 'translateX(-50%)';
        toast.style.backgroundColor = '#202124';
        toast.style.color = 'white';
        toast.style.padding = '12px 24px';
        toast.style.borderRadius = '40px';
        toast.style.fontSize = '0.875rem';
        toast.style.fontWeight = '500';
        toast.style.zIndex = '9999';
        toast.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        toast.style.fontFamily = "'Inter', sans-serif";
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
        
        contactForm.reset();
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '#home') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        const targetElement = document.querySelector(href);
        if (targetElement) {
            e.preventDefault();
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar shadow effect on scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        navbar.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
    } else {
        navbar.style.boxShadow = '0 1px 2px 0 rgba(60, 64, 67, 0.3)';
    }
});

// Intersection Observer for fade-up animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -30px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Animate sections on scroll
document.querySelectorAll('.skill-cat, .project-card, .about-text, .contact-info, .contact-form').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Hero initial animations
document.addEventListener('DOMContentLoaded', () => {
    const heroElements = document.querySelectorAll('.greeting, .name, .title, .description, .cta-buttons, .social-links, .google-badge');
    heroElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(15px)';
        setTimeout(() => {
            el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    // Add ripple effect to buttons (Google-inspired)
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.backgroundColor = 'rgba(255,255,255,0.4)';
            ripple.style.pointerEvents = 'none';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.5s linear';
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${e.clientX - rect.left - size/2}px`;
            ripple.style.top = `${e.clientY - rect.top - size/2}px`;
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 500);
        });
    });
});

// Add ripple animation keyframes dynamically
const styleSheet = document.createElement("style");
styleSheet.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(styleSheet);

// Console greeting
console.log("%c🚀 Nalinkumar Manikandan | Google Colors Portfolio", "color: #4285F4; font-size: 16px; font-weight: bold;");
console.log("%cJava • Spring Boot • Angular • SQL • MongoDB", "color: #34A853; font-size: 12px;");
