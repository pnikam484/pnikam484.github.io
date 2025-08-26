// Pravin Nikam Portfolio - JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Smooth scrolling for navigation links - Fixed implementation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbarHeight = 60;
                const offsetTop = targetSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navbarHeight = 60;

    function updateActiveNavLink() {
        let current = '';
        const scrollPosition = window.pageYOffset + navbarHeight + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = sectionId;
            }
        });

        // If at very top, highlight first section
        if (window.pageYOffset < 200) {
            current = 'hero';
        }

        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkTarget = link.getAttribute('href').substring(1);
            if (linkTarget === current) {
                link.classList.add('active');
            }
        });
    }

    // Enhanced notification system - Fixed implementation
    function showNotification(message, type = 'success') {
        // Remove existing notification
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        
        const iconMap = {
            success: '✅',
            error: '❌',
            warning: '⚠️', 
            info: 'ℹ️'
        };
        
        const colorMap = {
            success: '#10B981',
            error: '#EF4444',
            warning: '#F59E0B', 
            info: '#3B82F6'
        };

        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">${iconMap[type] || iconMap.success}</span>
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

        // Comprehensive inline styles to ensure visibility
        notification.style.cssText = `
            position: fixed !important;
            top: 80px !important;
            right: 20px !important;
            background: ${colorMap[type] || colorMap.success} !important;
            color: white !important;
            padding: 16px 20px !important;
            border-radius: 8px !important;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25) !important;
            z-index: 10000 !important;
            transform: translateX(400px) !important;
            transition: transform 0.4s cubic-bezier(0.4, 0.0, 0.2, 1) !important;
            max-width: 400px !important;
            min-width: 300px !important;
            font-family: var(--font-family-base) !important;
            font-size: 14px !important;
            border: 2px solid rgba(255, 255, 255, 0.3) !important;
        `;

        const content = notification.querySelector('.notification-content');
        content.style.cssText = `
            display: flex !important;
            align-items: center !important;
            gap: 12px !important;
        `;

        const icon = notification.querySelector('.notification-icon');
        icon.style.cssText = `
            font-size: 18px !important;
            flex-shrink: 0 !important;
        `;

        const message_el = notification.querySelector('.notification-message');
        message_el.style.cssText = `
            flex: 1 !important;
            line-height: 1.4 !important;
        `;

        const closeButton = notification.querySelector('.notification-close');
        closeButton.style.cssText = `
            background: none !important;
            border: none !important;
            color: white !important;
            font-size: 20px !important;
            cursor: pointer !important;
            padding: 0 !important;
            width: 24px !important;
            height: 24px !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            border-radius: 50% !important;
            transition: background-color 0.2s !important;
            margin-left: auto !important;
            flex-shrink: 0 !important;
        `;

        // Add hover effect to close button
        closeButton.addEventListener('mouseenter', () => {
            closeButton.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
        });
        
        closeButton.addEventListener('mouseleave', () => {
            closeButton.style.backgroundColor = 'transparent';
        });

        // Add to DOM
        document.body.appendChild(notification);

        // Force reflow and animate in
        notification.offsetHeight; // Trigger reflow
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0) !important';
        }, 50);

        // Close functionality
        function closeNotification() {
            if (notification && notification.parentNode) {
                notification.style.transform = 'translateX(400px) !important';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.remove();
                    }
                }, 400);
            }
        }

        closeButton.addEventListener('click', closeNotification);

        // Auto remove after 6 seconds
        setTimeout(closeNotification, 6000);
        
        console.log('Notification shown:', message, type);
    }

    // Email validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Contact form handling - Enhanced with better feedback
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            console.log('Form submitted!'); // Debug log
            
            // Get form data
            const nameField = document.getElementById('name');
            const emailField = document.getElementById('email');
            const subjectField = document.getElementById('subject');
            const messageField = document.getElementById('message');
            
            if (!nameField || !emailField || !subjectField || !messageField) {
                console.error('Form fields not found');
                return;
            }
            
            const formData = {
                name: nameField.value.trim(),
                email: emailField.value.trim(),
                subject: subjectField.value.trim(),
                message: messageField.value.trim()
            };

            console.log('Form data:', formData); // Debug log

            // Basic validation
            if (!formData.name || !formData.email || !formData.subject || !formData.message) {
                showNotification('Please fill in all fields.', 'error');
                return;
            }

            if (!isValidEmail(formData.email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }

            // Show loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            if (!submitButton) {
                console.error('Submit button not found');
                return;
            }
            
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            submitButton.style.opacity = '0.7';

            console.log('Starting submission simulation...'); // Debug log

            // Simulate form submission with guaranteed success notification
            setTimeout(() => {
                console.log('Showing success notification...'); // Debug log
                
                // Show success message
                showNotification('Thank you for your message, ' + formData.name + '! I will get back to you soon.', 'success');
                
                // Reset form
                contactForm.reset();
                
                // Restore button
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                submitButton.style.opacity = '1';
                
                console.log('Form submission completed!'); // Debug log
            }, 1200);
        });
    } else {
        console.error('Contact form not found');
    }

    // Navbar background on scroll
    function updateNavbarBackground() {
        const navbar = document.getElementById('navbar');
        if (!navbar) return;
        
        if (window.pageYOffset > 50) {
            navbar.style.background = 'rgba(252, 252, 249, 0.98)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(252, 252, 249, 0.95)';
            navbar.style.boxShadow = 'none';
            navbar.style.backdropFilter = 'blur(10px)';
        }
    }

    // Handle dark mode navbar
    function handleDarkModeNavbar() {
        const navbar = document.getElementById('navbar');
        if (!navbar) return;
        
        const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        const isManualDark = document.documentElement.getAttribute('data-color-scheme') === 'dark';
        
        if (isDarkMode || isManualDark) {
            if (window.pageYOffset > 50) {
                navbar.style.background = 'rgba(31, 33, 33, 0.98)';
            } else {
                navbar.style.background = 'rgba(31, 33, 33, 0.95)';
            }
        }
    }

    // Skill bar animations
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        skillBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible && !bar.classList.contains('animated')) {
                const width = bar.getAttribute('data-width');
                if (width) {
                    setTimeout(() => {
                        bar.style.width = width + '%';
                    }, 300);
                    bar.classList.add('animated');
                }
            }
        });
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animations
    const animatedElements = document.querySelectorAll('.competency-card, .timeline-item, .project-card, .education-item, .cert-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });

    // Scroll event listeners
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        // Throttle scroll events for better performance
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        
        scrollTimeout = setTimeout(() => {
            updateActiveNavLink();
            updateNavbarBackground();
            handleDarkModeNavbar();
            animateSkillBars();
        }, 10);
    });

    // Initial calls
    updateActiveNavLink();
    updateNavbarBackground();
    handleDarkModeNavbar();

    // Typewriter effect for hero title
    function typewriterEffect() {
        const heroTitle = document.querySelector('.hero-title');
        if (!heroTitle) return;
        
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.borderRight = '2px solid var(--color-primary)';
        
        let i = 0;
        const timer = setInterval(() => {
            heroTitle.textContent += text.charAt(i);
            i++;
            if (i > text.length - 1) {
                clearInterval(timer);
                // Remove cursor after typing is complete
                setTimeout(() => {
                    heroTitle.style.borderRight = 'none';
                }, 500);
            }
        }, 80);
    }

    // Smooth reveal of hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        heroContent.style.transition = 'all 0.8s ease-out';
        
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 300);

        // Start typewriter effect after hero content is visible
        setTimeout(typewriterEffect, 800);
    }

    // Add hover effects to timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        item.style.transition = 'transform 0.3s ease-out';
        
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });

    // Subtle parallax effect for hero section
    let ticking = false;
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const heroContent = document.querySelector('.hero-content');
        
        if (hero && heroContent && scrolled < hero.offsetHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.2}px)`;
        }
        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });

    // Initialize skill bar animations on load
    setTimeout(() => {
        animateSkillBars();
    }, 1000);

    // Add click effect to soft skills
    const softSkills = document.querySelectorAll('.soft-skill');
    softSkills.forEach(skill => {
        skill.style.transition = 'transform 0.15s ease-out';
        skill.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });

    // Dynamic copyright year
    const currentYear = new Date().getFullYear();
    const footerText = document.querySelector('.footer-content p');
    if (footerText) {
        footerText.textContent = `© ${currentYear} Pravin Nikam. All rights reserved.`;
    }

    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close mobile menu on escape
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
            
            // Close notification on escape
            const notification = document.querySelector('.notification');
            if (notification) {
                notification.style.transform = 'translateX(400px)';
                setTimeout(() => {
                    if (notification.parentNode) notification.remove();
                }, 400);
            }
        }
    });

    // Test notification function for debugging
    window.testNotification = function() {
        showNotification('This is a test notification!', 'success');
    };

    console.log('✅ Pravin Nikam Portfolio loaded successfully!');
    console.log('Contact form element:', contactForm ? 'Found' : 'Not found');
    console.log('Debug: You can test notifications with testNotification() in console');
});