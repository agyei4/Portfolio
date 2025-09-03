// Modern JavaScript for Agyei's Portfolio Website

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all features
    initSmoothScrolling();
    initNavbarEffects();
    initScrollAnimations();
    initTypingEffect();
    initParallaxEffects();
    initInteractiveCards();
    initFormEnhancements();
    initThemeToggle();
    initParticleBackground();
    initSkillProgressBars();
    initProjectModals();
    initScrollProgressBar();
    
    console.log('🎯 Portfolio website loaded successfully!');
});

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update active navigation after smooth scroll
                setTimeout(() => {
                    updateActiveNavigation();
                }, 100);
            }
        });
    });
}

// Navbar Effects and Background Change on Scroll
function initNavbarEffects() {
    const header = document.querySelector('.header');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
            header.style.background = '#ffffff';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            
            // Change nav link colors
            navLinks.forEach(link => {
                link.style.color = '#333';
            });
        } else {
            header.classList.remove('scrolled');
            header.style.background = 'transparent';
            header.style.boxShadow = 'none';
            
            // Restore nav link colors
            navLinks.forEach(link => {
                link.style.color = '#ffffff';
            });
        }
        
        // Update active navigation based on current section
        updateActiveNavigation();
    });
}

// Scroll Animations for Elements
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .skill-category, .education-item, .experience-item, .project-card, .blog-card');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Typing Effect for Hero Section
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-text h1:first-of-type');
    if (!heroTitle) return;
    
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    heroTitle.style.borderRight = '2px solid #0077ff';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        } else {
            // Remove cursor after typing is complete
            setTimeout(() => {
                heroTitle.style.borderRight = 'none';
            }, 1000);
        }
    };
    
    // Start typing effect after a delay
    setTimeout(typeWriter, 1000);
}

// Parallax Effects for Hero Section
function initParallaxEffects() {
    const hero = document.querySelector('.hero');
    const heroText = document.querySelector('.hero-text');
    const heroButtons = document.querySelector('.hero-buttons');
    const heroSocial = document.querySelector('.social-links');
    
    if (!hero || !heroText) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroHeight = hero.offsetHeight;
        
        // Only apply parallax effect while hero is visible
        if (scrolled < heroHeight) {
            // Move text elements up as user scrolls down
            const textRate = scrolled * 0.3;
            const buttonsRate = scrolled * 0.4;
            const socialRate = scrolled * 0.5;
            
            heroText.style.transform = `translateY(${textRate}px)`;
            if (heroButtons) heroButtons.style.transform = `translateY(${buttonsRate}px)`;
            if (heroSocial) heroSocial.style.transform = `translateY(${socialRate}px)`;
            
            // Fade out effect as content scrolls over
            const opacity = 1 - (scrolled / heroHeight) * 0.8;
            heroText.style.opacity = Math.max(opacity, 0.2);
            if (heroButtons) heroButtons.style.opacity = Math.max(opacity, 0.2);
            if (heroSocial) heroSocial.style.opacity = Math.max(opacity, 0.2);
        }
    });
}

// Interactive Card Hover Effects
function initInteractiveCards() {
    const cards = document.querySelectorAll('.service-card, .project-card, .blog-card, .skill-category');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });
    });
}

// Enhanced Form Interactions
function initFormEnhancements() {
    const form = document.querySelector('.form');
    const inputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    if (!form) return;
    
    // Add floating label effect
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });
    
    // Form submission with animation
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.textContent = 'Sending...';
        submitBtn.style.background = '#28a745';
        
        // Simulate form submission
        setTimeout(() => {
            submitBtn.textContent = 'Message Sent! ✓';
            submitBtn.style.background = '#28a745';
            
            // Reset form
            setTimeout(() => {
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.style.background = '#007bff';
            }, 2000);
        }, 1500);
    });
}

// Theme Toggle Functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.querySelector('.theme-toggle__icon');
    
    if (!themeToggle) return;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        
        // Add transition effect
        document.body.style.transition = 'all 0.3s ease';
    });
    
    function updateThemeIcon(theme) {
        themeIcon.textContent = theme === 'light' ? '☾' : '☀';
    }
}

// Animated Skill Progress Bars
function initSkillProgressBars() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach((skill, index) => {
        skill.style.opacity = '0';
        skill.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            skill.style.transition = 'all 0.6s ease';
            skill.style.opacity = '1';
            skill.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Project Modal System
function initProjectModals() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            const projectTitle = this.querySelector('h3').textContent;
            const projectDesc = this.querySelector('p').textContent;
            const projectTech = Array.from(this.querySelectorAll('.tech-tag')).map(tag => tag.textContent);
            
            showProjectModal(projectTitle, projectDesc, projectTech);
        });
    });
}

function showProjectModal(title, description, technologies) {
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'project-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>${title}</h2>
            <p>${description}</p>
            <div class="modal-tech">
                ${technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
            <div class="modal-actions">
                <button class="btn-primary">View Project</button>
                <button class="btn-secondary">View Code</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Show modal with animation
    setTimeout(() => modal.classList.add('show'), 10);
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
    });
    
    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
            setTimeout(() => modal.remove(), 300);
        }
    });
}

// Scroll Progress Bar
function initScrollProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Particle Background Effect
function initParticleBackground() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    // Create particles container
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    hero.appendChild(particlesContainer);
    
    // Generate particles
    for (let i = 0; i < 50; i++) {
        createParticle(particlesContainer);
    }
    
    function createParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random properties
        const size = Math.random() * 3 + 1;
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const duration = Math.random() * 20 + 10;
        
        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            animation-duration: ${duration}s;
        `;
        
        container.appendChild(particle);
        
        // Remove and recreate particle after animation
        setTimeout(() => {
            particle.remove();
            createParticle(container);
        }, duration * 1000);
    }
}

// Update Active Navigation Based on Current Section
function updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu .nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100; // Offset for header
        const sectionHeight = section.offsetHeight;
        const scrollPosition = window.scrollY;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    // Update navigation active state
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === currentSection) {
            link.classList.add('active');
        }
    });
    
    // Special case for home section when at top
    if (window.scrollY < 100) {
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        const homeLink = document.querySelector('[data-section="home"]');
        if (homeLink) homeLink.classList.add('active');
    }
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add CSS classes for animations
document.addEventListener('DOMContentLoaded', function() {
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s ease;
        }
        
        .animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .project-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .project-modal.show {
            opacity: 1;
        }
        
        .modal-content {
            background: white;
            padding: 2rem;
            border-radius: 15px;
            max-width: 500px;
            width: 90%;
            position: relative;
            transform: scale(0.7);
            transition: transform 0.3s ease;
        }
        
        .project-modal.show .modal-content {
            transform: scale(1);
        }
        
        .close-modal {
            position: absolute;
            top: 1rem;
            right: 1rem;
            font-size: 1.5rem;
            cursor: pointer;
            color: #666;
        }
        
        .modal-tech {
            margin: 1rem 0;
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
        }
        
        .modal-actions {
            display: flex;
            gap: 1rem;
            margin-top: 1.5rem;
        }
        
        .btn-primary, .btn-secondary {
            padding: 0.8rem 1.5rem;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s ease;
        }
        
        .btn-primary {
            background: #0077ff;
            color: white;
        }
        
        .btn-secondary {
            background: #f0f0f0;
            color: #333;
        }
        
        .btn-primary:hover, .btn-secondary:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }
        
        .scroll-progress {
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #0077ff, #00d4ff);
            z-index: 10001;
            transition: width 0.1s ease;
        }
        
        .particles {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            pointer-events: none;
        }
        
        .particle {
            position: absolute;
            background: rgba(255, 255, 255, 0.6);
            border-radius: 50%;
            animation: float linear infinite;
        }
        
        @keyframes float {
            0% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100px) rotate(360deg);
                opacity: 0;
            }
        }
        
        [data-theme="dark"] {
            --bg-primary: #1a1a1a;
            --text-primary: #ffffff;
            --card-bg: #2d2d2d;
            --border-color: #404040;
        }
        
        [data-theme="dark"] .header {
            background: #1a1a1a !important;
        }
        
        [data-theme="dark"] .nav-menu a {
            color: #ffffff !important;
        }
        
        [data-theme="dark"] .service-card,
        [data-theme="dark"] .skill-category,
        [data-theme="dark"] .education-item,
        [data-theme="dark"] .experience-item,
        [data-theme="dark"] .project-card,
        [data-theme="dark"] .blog-card {
            background: #2d2d2d;
            color: #ffffff;
        }
        
        [data-theme="dark"] .service-card h3,
        [data-theme="dark"] .skill-category h3,
        [data-theme="dark"] .education-content h3,
        [data-theme="dark"] .experience-content h3,
        [data-theme="dark"] .project-card h3,
        [data-theme="dark"] .blog-content h3 {
            color: #ffffff;
        }
        
        [data-theme="dark"] .service-card p,
        [data-theme="dark"] .skill-category p,
        [data-theme="dark"] .education-content p,
        [data-theme="dark"] .experience-content p,
        [data-theme="dark"] .project-card p,
        [data-theme="dark"] .blog-content p {
            color: #cccccc;
        }
    `;
    document.head.appendChild(style);
});
