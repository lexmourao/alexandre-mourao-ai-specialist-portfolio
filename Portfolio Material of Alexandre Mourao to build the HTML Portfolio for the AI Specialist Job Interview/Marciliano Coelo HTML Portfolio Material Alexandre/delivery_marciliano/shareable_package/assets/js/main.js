/* ========================================
   MAIN JAVASCRIPT - MARCILLIANO BRAND
   ======================================== */

// ===== GLOBAL VARIABLES =====
let currentSection = 'hero';
let sidebarOpen = false;

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupSmoothScrolling();
    setupSidebarNavigation();
    setupScrollSpy();
    setupMobileMenu();
    setupFormHandlers();
    setupAnimations();
    setupCharts();
}

// ===== SMOOTH SCROLLING =====
function setupSmoothScrolling() {
    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===== SIDEBAR NAVIGATION =====
function setupSidebarNavigation() {
    const sidebar = document.getElementById('sidebar');
    const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
    
    if (!sidebar) return;
    
    // Handle sidebar link clicks
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            sidebarLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Update current section
            const targetId = this.getAttribute('href').substring(1);
            currentSection = targetId;
            
            // Scroll to section
            scrollToSection(targetId);
            
            // Close mobile sidebar if open
            if (window.innerWidth <= 768) {
                closeMobileSidebar();
            }
        });
    });
}

// ===== SCROLL SPY =====
function setupScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
    
    window.addEventListener('scroll', function() {
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                // Update active nav link
                sidebarLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
                
                // Update current section
                currentSection = sectionId;
            }
        });
    });
}

// ===== MOBILE MENU =====
function setupMobileMenu() {
    // Create mobile menu toggle button
    const navbar = document.querySelector('.navbar');
    if (navbar && window.innerWidth <= 768) {
        const toggleButton = document.createElement('button');
        toggleButton.className = 'sidebar-toggle';
        toggleButton.innerHTML = '☰';
        toggleButton.addEventListener('click', toggleMobileSidebar);
        navbar.appendChild(toggleButton);
        
        // Create sidebar overlay
        const overlay = document.createElement('div');
        overlay.className = 'sidebar-overlay';
        overlay.addEventListener('click', closeMobileSidebar);
        document.body.appendChild(overlay);
    }
}

function toggleMobileSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    
    if (sidebar) {
        sidebar.classList.toggle('open');
        sidebarOpen = !sidebarOpen;
        
        if (overlay) {
            overlay.classList.toggle('active');
        }
        
        // Prevent body scroll when sidebar is open
        if (sidebarOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
}

function closeMobileSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    
    if (sidebar) {
        sidebar.classList.remove('open');
        sidebarOpen = false;
        
        if (overlay) {
            overlay.classList.remove('active');
        }
        
        document.body.style.overflow = '';
    }
}

// ===== FORM HANDLERS =====
function setupFormHandlers() {
    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    // Course purchase forms
    document.querySelectorAll('[onclick*="comprarCurso"]').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const cursoId = this.getAttribute('onclick').match(/\d+/)[0];
            handleCoursePurchase(cursoId);
        });
    });
    
    // Package purchase
    document.querySelectorAll('[onclick*="comprarPacote"]').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            handlePackagePurchase();
        });
    });
}

function handleContactForm(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Simulate form submission
    showNotification('Mensagem enviada com sucesso! Entraremos em contato em até 24 horas.', 'success');
    
    // Reset form
    e.target.reset();
}

function handleCoursePurchase(cursoId) {
    const cursos = {
        1: { nome: 'Fundamentos do Psicocoaching Energia 220', preco: 'R$ 49,99' },
        2: { nome: 'Psicocoaching Energia 220 na Prática', preco: 'R$ 197' },
        3: { nome: 'Psicocoaching Energia 220 para Executivos', preco: 'R$ 497' },
        4: { nome: 'Certificação Psicocoaching Energia 220', preco: 'R$ 997' }
    };
    
    const curso = cursos[cursoId];
    if (curso) {
        showNotification(`Redirecionando para compra do curso: ${curso.nome} - ${curso.preco}`, 'info');
        // Here you would redirect to payment platform
        setTimeout(() => {
            window.location.href = `#checkout?curso=${cursoId}`;
        }, 2000);
    }
}

function handlePackagePurchase() {
    showNotification('Redirecionando para compra do Pacote Completo - R$ 997 (Economia de R$ 744)', 'info');
    // Here you would redirect to payment platform
    setTimeout(() => {
        window.location.href = '#checkout?pacote=completo';
    }, 2000);
}

// ===== ANIMATIONS =====
function setupAnimations() {
    // Initialize AOS if available
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }
    
    // Custom animations
    setupScrollAnimations();
    setupHoverEffects();
}

function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeInUp');
            }
        });
    }, observerOptions);
    
    // Observe all cards and sections
    document.querySelectorAll('.card, .section').forEach(el => {
        observer.observe(el);
    });
}

function setupHoverEffects() {
    // Card hover effects
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Button hover effects
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// ===== CHARTS =====
function setupCharts() {
    // Revenue chart
    const revenueChart = document.getElementById('revenueChart');
    if (revenueChart && typeof Chart !== 'undefined') {
        const ctx = revenueChart.getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Mês 1', 'Mês 2', 'Mês 3', 'Mês 6', 'Mês 9', 'Mês 12'],
                datasets: [{
                    label: 'Receita Mensal (R$)',
                    data: [27000, 35000, 45000, 55000, 65000, 75000],
                    borderColor: '#1E3A8A',
                    backgroundColor: 'rgba(30, 58, 138, 0.1)',
                    tension: 0.4,
                    fill: true,
                    pointBackgroundColor: '#1E3A8A',
                    pointBorderColor: '#FFFFFF',
                    pointBorderWidth: 2,
                    pointRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Projeção de Receita - Cenário Realista',
                        font: {
                            size: 16,
                            weight: 'bold'
                        }
                    },
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return 'R$ ' + value.toLocaleString();
                            },
                            font: {
                                size: 12
                            }
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    },
                    x: {
                        ticks: {
                            font: {
                                size: 12
                            }
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    }
                }
            }
        });
    }
}

// ===== UTILITY FUNCTIONS =====
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#1E3A8A'};
        color: white;
        padding: 1rem;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 9999;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

function exportToPDF() {
    // Simple print function for now
    window.print();
}

// ===== GLOBAL FUNCTIONS (for HTML onclick) =====
window.scrollToSection = scrollToSection;
window.comprarCurso = handleCoursePurchase;
window.comprarPacote = handlePackagePurchase;
window.exportToPDF = exportToPDF;
window.showContactForm = function() {
    scrollToSection('contato');
};

// ===== RESPONSIVE HANDLERS =====
window.addEventListener('resize', function() {
    // Close mobile sidebar on resize to desktop
    if (window.innerWidth > 768 && sidebarOpen) {
        closeMobileSidebar();
    }
    
    // Reinitialize mobile menu if needed
    if (window.innerWidth <= 768) {
        setupMobileMenu();
    }
});

// ===== PERFORMANCE OPTIMIZATIONS =====
// Debounce scroll events
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

// Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(function() {
    // Scroll spy logic here
}, 100));

// ===== ACCESSIBILITY IMPROVEMENTS =====
document.addEventListener('keydown', function(e) {
    // Close mobile sidebar with Escape key
    if (e.key === 'Escape' && sidebarOpen) {
        closeMobileSidebar();
    }
    
    // Handle Enter key on buttons
    if (e.key === 'Enter' && e.target.classList.contains('btn')) {
        e.target.click();
    }
});

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // You could send this to an error tracking service
});

// ===== ANALYTICS (if needed) =====
function trackEvent(category, action, label) {
    // Google Analytics or other tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: category,
            event_label: label
        });
    }
}

// Track course interest
document.querySelectorAll('[onclick*="comprarCurso"]').forEach(button => {
    button.addEventListener('click', function() {
        const cursoId = this.getAttribute('onclick').match(/\d+/)[0];
        trackEvent('Course', 'Interest', `Curso ${cursoId}`);
    });
});
