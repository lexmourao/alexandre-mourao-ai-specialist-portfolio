// AI Specialist Portfolio - JavaScript Functionality
// Author: Alexandre Mourão
// Purpose: Interactive features for the portfolio

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initThemeToggle();
    initSmoothScrolling();
    initGalleryInteractions();
    initMobileMenu();
    initScrollAnimations();
});

// Navigation functionality
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Add scroll effect to navbar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active navigation link
        updateActiveNavLink();
    });
    
    // Update active navigation link based on scroll position
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
}

// Theme toggle functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('.theme-icon');
    const body = document.body;
    
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        
        // Add animation effect
        themeToggle.style.transform = 'scale(0.95)';
        setTimeout(() => {
            themeToggle.style.transform = 'scale(1)';
        }, 150);
    });
    
    function updateThemeIcon(theme) {
        themeIcon.textContent = theme === 'light' ? '🌙' : '☀️';
    }
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navMenu = document.getElementById('nav-menu');
                const navToggle = document.getElementById('nav-toggle');
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });
}

// Gallery interactions
function initGalleryInteractions() {
    // Initialize transcript toggles
    const transcriptToggles = document.querySelectorAll('.transcript-toggle');
    
    transcriptToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const transcriptId = this.getAttribute('onclick').match(/'([^']+)'/)[1];
            const transcript = document.getElementById(transcriptId);
            
            if (transcript.classList.contains('show')) {
                transcript.classList.remove('show');
                this.textContent = 'Show Transcript';
            } else {
                transcript.classList.add('show');
                this.textContent = 'Hide Transcript';
            }
        });
    });
    
    // Add hover effects to gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Project links now use onclick="scrollToSection('gallery')" directly in HTML
    // No additional JavaScript needed for project link functionality
}

// Mobile menu functionality
function initMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        this.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.tool-card, .project-card, .gallery-item');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Project Modal Functions
function openProjectModal(projectId) {
    const modal = document.getElementById('projectModal');
    const content = document.getElementById('projectModalContent');
    
    let modalContent = '';
    
    if (projectId === 'marciliano') {
        modalContent = `
            <div class="project-modal-header">
                <h2>Marciliano Digital Product Strategy</h2>
            </div>
            <div class="project-modal-body">
                <div class="project-info-grid">
                    <div class="project-info-item">
                        <h4>📊 Market Analysis</h4>
                        <p>R$ 500M+ Brazilian e-learning market with 13.28% annual growth. Comprehensive competitor analysis and market positioning strategy.</p>
                    </div>
                    <div class="project-info-item">
                        <h4>💰 ROI Projections</h4>
                        <p>4,320% ROI projection with R$ 648K annual revenue potential from 9,000 follower base with 1-3% conversion rate.</p>
                    </div>
                    <div class="project-info-item">
                        <h4>🎯 Strategic Framework</h4>
                        <p>Complete product development strategy combining psychology rigor with coaching energy for Brazilian corporate market.</p>
                    </div>
                    <div class="project-info-item">
                        <h4>🛠️ AI Tools Used</h4>
                        <p>Whisper AI for video analysis, ChatGPT for strategy development, HTML/CSS for professional presentations.</p>
                    </div>
                </div>
                <div class="project-links">
                    <a href="presentations/marciliano-client.html" class="project-link-button primary" target="_blank" onclick="closeProjectModal(); console.log('Client button clicked')">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                            <polyline points="15,3 21,3 21,9"></polyline>
                            <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                        View Client Presentation
                    </a>
                    <a href="presentations/marciliano-stakeholder.html" class="project-link-button secondary" target="_blank" onclick="closeProjectModal(); console.log('Stakeholder button clicked')">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                            <polyline points="15,3 21,3 21,9"></polyline>
                            <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                        View Stakeholder Presentation
                    </a>
                </div>
            </div>
        `;
    } else if (projectId === 'marykay') {
        modalContent = `
            <div class="project-modal-header">
                <h2>Mary Kay AI Integration & Shark Business Strategy</h2>
            </div>
            <div class="project-modal-body">
                <div class="project-info-grid">
                    <div class="project-info-item">
                        <h4>📊 Market Exploration</h4>
                        <p>Comprehensive market analysis and business development strategy for Mary Kay's digital transformation with AI integration and hybrid business model.</p>
                    </div>
                    <div class="project-info-item">
                        <h4>🔄 Hybrid Business Model</h4>
                        <p>Innovative hybrid model combining traditional Mary Kay direct sales with AI-powered CRM and automation systems for 24/7 customer engagement.</p>
                    </div>
                    <div class="project-info-item">
                        <h4>💰 Revenue Projections</h4>
                        <p>Detailed financial projections showing 300% revenue increase potential with 450% ROI in 12 months through AI automation and lead generation.</p>
                    </div>
                    <div class="project-info-item">
                        <h4>⚖️ Compliance & Ethics</h4>
                        <p>Full ABEVD compliance and Mary Kay policy adherence ensuring ethical AI implementation and business practices with transparent operations.</p>
                    </div>
                </div>
                <div class="project-links">
                    <a href="presentations/marykay-strategy.html" class="project-link-button primary" target="_blank" onclick="closeProjectModal(); console.log('Mary Kay strategy button clicked')">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                            <polyline points="15,3 21,3 21,9"></polyline>
                            <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                        View Strategy Presentation
                    </a>
                </div>
            </div>
        `;
    }
    
    content.innerHTML = modalContent;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Add fade-in animation
    modal.style.opacity = '0';
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
}

function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    modal.style.opacity = '0';
    
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 300);
}

// Transcript Modal Functions
function openTranscriptModal() {
    const modal = document.getElementById('transcriptModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    modal.style.opacity = '0';
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
}

function closeTranscriptModal() {
    const modal = document.getElementById('transcriptModal');
    modal.style.opacity = '0';
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 300);
}

function switchLanguage(lang) {
    // Remove active class from all language badges and content
    document.querySelectorAll('.lang-badge').forEach(badge => {
        badge.classList.remove('active');
    });
    document.querySelectorAll('.transcript-lang').forEach(content => {
        content.classList.remove('active');
    });
    
    // Add active class to selected language
    document.querySelector(`[data-lang="${lang}"]`).classList.add('active');
    document.getElementById(`transcript-${lang}`).classList.add('active');
}

// Utility functions
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

// Scroll to section function
function scrollToSection(sectionId) {
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
        
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
        
        // Close mobile menu if open
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');
        if (navMenu && navToggle) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    }
}

// Scroll to video gallery function
function scrollToVideoGallery() {
    // Find the "Shark/OTW Content Creation" section specifically
    const videoSectionTitles = document.querySelectorAll('.video-section-title');
    let sharkSection = null;
    
    for (let title of videoSectionTitles) {
        if (title.textContent.includes('Shark/OTW Content Creation')) {
            sharkSection = title;
            break;
        }
    }
    
    if (sharkSection) {
        // Scroll to the Shark/OTW video section
        const offsetTop = sharkSection.offsetTop - 120; // Account for fixed navbar and some padding
        
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
        
        // Close mobile menu if open
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');
        if (navMenu && navToggle) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    } else {
        // Fallback: scroll to video gallery section if Shark section not found
        const videoHeaders = document.querySelectorAll('.gallery-category h3');
        let videoSection = null;
        
        for (let header of videoHeaders) {
            if (header.textContent.includes('AI-Generated Videos')) {
                videoSection = header;
                break;
            }
        }
        
        if (videoSection) {
            const offsetTop = videoSection.offsetTop - 100;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
}

// Scroll to Uma Dose De Nos video section function
function scrollToUmaDoseVideos() {
    // Find the "Uma Dose De Nos Web Series" section specifically
    const videoSectionTitles = document.querySelectorAll('.video-section-title');
    let umaDoseSection = null;
    
    for (let title of videoSectionTitles) {
        if (title.textContent.includes('Uma Dose De Nos Web Series')) {
            umaDoseSection = title;
            break;
        }
    }
    
    if (umaDoseSection) {
        // Scroll to the Uma Dose De Nos video section
        const offsetTop = umaDoseSection.offsetTop - 120; // Account for fixed navbar and some padding
        
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
        
        // Close mobile menu if open
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');
        if (navMenu && navToggle) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    } else {
        // Fallback: scroll to video gallery section if Uma Dose section not found
        const videoHeaders = document.querySelectorAll('.gallery-category h3');
        let videoSection = null;
        
        for (let header of videoHeaders) {
            if (header.textContent.includes('AI-Generated Videos')) {
                videoSection = header;
                break;
            }
        }
        
        if (videoSection) {
            const offsetTop = videoSection.offsetTop - 100;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
}

// Scroll to ARBO video section function
function scrollToArboVideos() {
    // Find the "ARBO Healthcare Platform" section specifically
    const videoSectionTitles = document.querySelectorAll('.video-section-title');
    let arboSection = null;
    
    for (let title of videoSectionTitles) {
        if (title.textContent.includes('ARBO Healthcare Platform')) {
            arboSection = title;
            break;
        }
    }
    
    if (arboSection) {
        // Scroll to the ARBO video section
        const offsetTop = arboSection.offsetTop - 120; // Account for fixed navbar and some padding
        
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
        
        // Close mobile menu if open
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');
        if (navMenu && navToggle) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    } else {
        // Fallback: scroll to video gallery section if ARBO section not found
        const videoHeaders = document.querySelectorAll('.gallery-category h3');
        let videoSection = null;
        
        for (let header of videoHeaders) {
            if (header.textContent.includes('AI-Generated Videos')) {
                videoSection = header;
                break;
            }
        }
        
        if (videoSection) {
            const offsetTop = videoSection.offsetTop - 100;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
}

// Scroll to ARBO avatars section function
function scrollToArboAvatars() {
    // Find the "ARBO Healthcare AI Avatars" section specifically
    const avatarSectionTitles = document.querySelectorAll('.avatar-section-title');
    let arboAvatarSection = null;
    
    for (let title of avatarSectionTitles) {
        if (title.textContent.includes('ARBO Healthcare AI Avatars')) {
            arboAvatarSection = title;
            break;
        }
    }
    
    if (arboAvatarSection) {
        // Scroll to the ARBO avatars section
        const offsetTop = arboAvatarSection.offsetTop - 120; // Account for fixed navbar and some padding
        
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
        
        // Close mobile menu if open
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');
        if (navMenu && navToggle) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    } else {
        // Fallback: scroll to gallery section if ARBO avatars section not found
        const gallerySection = document.getElementById('gallery');
        if (gallerySection) {
            const offsetTop = gallerySection.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
}

// Scroll to ARBO images section function
function scrollToArboImages() {
    // Find the "AI-Generated Images" section
    const imageHeaders = document.querySelectorAll('.gallery-category h3');
    let imageSection = null;
    
    for (let header of imageHeaders) {
        if (header.textContent.includes('AI-Generated Images')) {
            imageSection = header;
            break;
        }
    }
    
    if (imageSection) {
        // Scroll to the images section
        const offsetTop = imageSection.offsetTop - 120; // Account for fixed navbar and some padding
        
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
        
        // Close mobile menu if open
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');
        if (navMenu && navToggle) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    } else {
        // Fallback: scroll to gallery section if images section not found
        const gallerySection = document.getElementById('gallery');
        if (gallerySection) {
            const offsetTop = gallerySection.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
}

function scrollToMaryKayAvatars() {
    // Find the "AI-Generated Avatars" section
    const avatarHeaders = document.querySelectorAll('.gallery-category h3');
    let avatarSection = null;
    
    for (let header of avatarHeaders) {
        if (header.textContent.includes('AI-Generated Avatars')) {
            avatarSection = header;
            break;
        }
    }
    
    if (avatarSection) {
        // Scroll to the avatars section
        const offsetTop = avatarSection.offsetTop - 120; // Account for fixed navbar and some padding
        
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
        
        // Close mobile menu if open
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');
        if (navMenu && navToggle) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    } else {
        // Fallback: scroll to gallery section if avatars section not found
        const gallerySection = document.getElementById('gallery');
        if (gallerySection) {
            const offsetTop = gallerySection.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
}

// Audio error handling
function handleAudioError(audioElement) {
    console.warn('Audio failed to load:', audioElement.src);
    
    // Create a fallback message
    const fallbackDiv = document.createElement('div');
    fallbackDiv.className = 'audio-fallback';
    fallbackDiv.innerHTML = `
        <div class="audio-placeholder">
            <div class="placeholder-icon">🎵</div>
            <p>Audio Preview Available</p>
            <small>Click to download full audio file</small>
        </div>
    `;
    
    // Replace the audio element with fallback
    audioElement.parentNode.replaceChild(fallbackDiv, audioElement);
}

// Enhanced transcript toggle
function toggleTranscript(transcriptId) {
    const transcript = document.getElementById(transcriptId);
    const button = document.querySelector(`[onclick="toggleTranscript('${transcriptId}')"]`);
    
    if (transcript && button) {
        if (transcript.classList.contains('show')) {
            transcript.classList.remove('show');
            button.textContent = 'Show Transcript';
        } else {
            transcript.classList.add('show');
            button.textContent = 'Hide Transcript';
        }
    }
}

// Image lazy loading with error handling
function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            const placeholder = this.nextElementSibling;
            if (placeholder && placeholder.classList.contains('image-placeholder')) {
                placeholder.style.display = 'flex';
            }
        });
        
        img.addEventListener('load', function() {
            this.style.opacity = '0';
            this.style.transition = 'opacity 0.3s ease';
            setTimeout(() => {
                this.style.opacity = '1';
            }, 100);
        });
    });
}

// Image Modal Functions
function openImageModal(imageSrc, title) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    
    modalImage.src = imageSrc;
    modalTitle.textContent = title;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    
    // Add fade-in animation
    modal.style.opacity = '0';
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
}

function closeImageModal() {
    const modal = document.getElementById('imageModal');
    modal.style.opacity = '0';
    
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    }, 300);
}

// Close modals with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeImageModal();
        closeProjectModal();
        closeTranscriptModal();
    }
});

// Initialize enhanced functionality
document.addEventListener('DOMContentLoaded', function() {
    initLazyLoading();
    
    // Add loading states to all media
    const mediaElements = document.querySelectorAll('img, video, audio');
    mediaElements.forEach(element => {
        element.addEventListener('loadstart', function() {
            this.style.opacity = '0.7';
        });
        
        element.addEventListener('canplay', function() {
            this.style.opacity = '1';
        });
    });
    
    // Add click functionality to all gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        if (!item.onclick) {
            const img = item.querySelector('img');
            const title = item.querySelector('.gallery-overlay p')?.textContent || 'Image';
            
            if (img && img.src) {
                item.onclick = function() {
                    openImageModal(img.src, title);
                };
            }
        }
    });
});

// Performance optimization: Debounce scroll events
const debouncedScrollHandler = debounce(function() {
    // Scroll handling logic here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('Portfolio Error:', e.error);
    // In production, you might want to log errors to a service
});

// Service Worker registration (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment when you have a service worker file
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(error => console.log('SW registration failed'));
    });
}

// MyGPTs Modal Functions
function openMyGPTsModal() {
    document.getElementById('mygptsModal').style.display = 'block';
}

function closeMyGPTsModal() {
    document.getElementById('mygptsModal').style.display = 'none';
}

// Media Gallery Modal Functions
function openMediaGalleryModal() {
    document.getElementById('mediaGalleryModal').style.display = 'block';
}

function closeMediaGalleryModal() {
    document.getElementById('mediaGalleryModal').style.display = 'none';
}

// Gallery Section Navigation Functions
function scrollToGallerySection(section) {
    // First scroll to the gallery section
    scrollToSection('gallery');
    
    // Then scroll to the specific subsection after a short delay
    setTimeout(() => {
        const galleryCategories = document.querySelectorAll('.gallery-category');
        let targetIndex = -1;
        
        switch(section) {
            case 'images':
                targetIndex = 0; // AI-Generated Images
                break;
            case 'avatars':
                targetIndex = 1; // AI-Generated Avatars
                break;
            case 'videos':
                targetIndex = 2; // AI-Generated Videos
                break;
            case 'text':
                targetIndex = 3; // AI-Generated Text Content & Documentation
                break;
            case 'audio':
                targetIndex = 4; // AI-Generated Audio
                break;
            case 'development':
                targetIndex = 5; // Development Process Documentation
                break;
        }
        
        if (targetIndex >= 0 && galleryCategories[targetIndex]) {
            galleryCategories[targetIndex].scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        }
    }, 300);
}
