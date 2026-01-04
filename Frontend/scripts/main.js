// Main Application JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.querySelector('i').classList.toggle('fa-bars');
            this.querySelector('i').classList.toggle('fa-times');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
            navMenu.classList.remove('active');
            if (navToggle.querySelector('i').classList.contains('fa-times')) {
                navToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
            }
        }
    });
    
    // Modal Functionality
    const authModal = document.getElementById('authModal');
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const modalClose = document.getElementById('modalClose');
    const postJobBtn = document.getElementById('postJobBtn');
    
    // Open Auth Modal
    function openAuthModal(tab = 'login') {
        authModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Switch to specified tab
        setTimeout(() => {
            const tabBtn = document.querySelector(`.auth-tab[data-tab="${tab}"]`);
            if (tabBtn) tabBtn.click();
        }, 100);
    }
    
    // Close Auth Modal
    function closeAuthModal() {
        authModal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Event Listeners
    if (loginBtn) {
        loginBtn.addEventListener('click', () => openAuthModal('login'));
    }
    
    if (signupBtn) {
        signupBtn.addEventListener('click', () => openAuthModal('signup'));
    }
    
    if (modalClose) {
        modalClose.addEventListener('click', closeAuthModal);
    }
    
    if (postJobBtn) {
        postJobBtn.addEventListener('click', () => openAuthModal('signup'));
    }
    
    // Close modal when clicking outside
    authModal.addEventListener('click', function(event) {
        if (event.target === authModal) {
            closeAuthModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && authModal.classList.contains('active')) {
            closeAuthModal();
        }
    });
    
    // Auth Tabs Functionality
    const authTabs = document.querySelectorAll('.auth-tab');
    
    authTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            
            // Update active tab
            authTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding form
            document.querySelectorAll('.auth-form').forEach(form => {
                form.classList.remove('active');
            });
            document.getElementById(`${tabName}Form`).classList.add('active');
        });
    });
    
    // User Type Selection
    const userTypes = document.querySelectorAll('.user-type');
    
    userTypes.forEach(type => {
        type.addEventListener('click', function() {
            userTypes.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Password Toggle
    const passwordToggles = document.querySelectorAll('.password-toggle');
    
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.replace('fa-eye', 'fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.replace('fa-eye-slash', 'fa-eye');
            }
        });
    });
    
    // Form Validation
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function validatePassword(password) {
        return password.length >= 8;
    }
    
    // Toast Notification System
    function showToast(type, title, message, duration = 5000) {
        const toastContainer = document.querySelector('.toast-container') || createToastContainer();
        
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icon = type === 'success' ? 'fa-check-circle' : 
                    type === 'error' ? 'fa-exclamation-circle' : 
                    'fa-info-circle';
        
        toast.innerHTML = `
            <div class="toast-icon">
                <i class="fas ${icon}"></i>
            </div>
            <div class="toast-content">
                <h4>${title}</h4>
                <p>${message}</p>
            </div>
            <button class="toast-close">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        toastContainer.appendChild(toast);
        
        // Auto remove after duration
        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.3s ease forwards';
            setTimeout(() => toast.remove(), 300);
        }, duration);
        
        // Close button
        const closeBtn = toast.querySelector('.toast-close');
        closeBtn.addEventListener('click', () => {
            toast.style.animation = 'slideOutRight 0.3s ease forwards';
            setTimeout(() => toast.remove(), 300);
        });
    }
    
    // Make showToast globally available
    window.showToast = showToast;
    
    function createToastContainer() {
        const container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
        return container;
    }
    
    // Add CSS for toast animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideOutRight {
            from {
                opacity: 1;
                transform: translateX(0);
            }
            to {
                opacity: 0;
                transform: translateX(100%);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Demo data for companies
    const companies = [
        {
            name: "TechFlow",
            jobs: 24,
            color: "#2563eb",
            initials: "TF"
        },
        {
            name: "CloudScale",
            jobs: 18,
            color: "#7c3aed",
            initials: "CS"
        },
        {
            name: "DataMind",
            jobs: 32,
            color: "#059669",
            initials: "DM"
        },
        {
            name: "SwiftLabs",
            jobs: 15,
            color: "#dc2626",
            initials: "SL"
        },
        {
            name: "NexaSoft",
            jobs: 27,
            color: "#ea580c",
            initials: "NS"
        },
        {
            name: "QuantumLeap",
            jobs: 21,
            color: "#4f46e5",
            initials: "QL"
        }
    ];
    
    // Render Companies
    function renderCompanies() {
        const companiesGrid = document.getElementById('companiesGrid');
        if (!companiesGrid) return;
        
        companiesGrid.innerHTML = companies.map(company => `
            <div class="company-card">
                <div class="company-logo-lg" style="background: linear-gradient(135deg, ${company.color}20, ${company.color}40); color: ${company.color}">
                    ${company.initials}
                </div>
                <h3>${company.name}</h3>
                <p>Hiring actively</p>
                <div class="company-jobs">${company.jobs} jobs</div>
            </div>
        `).join('');
    }
    
    // Initialize
    renderCompanies();
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                navMenu.classList.remove('active');
                if (navToggle.querySelector('i').classList.contains('fa-times')) {
                    navToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
                }
            }
        });
    });
    
    // Search functionality
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const jobInput = document.querySelector('.search-input:first-child').value;
            const locationInput = document.querySelector('.search-input:last-child').value;
            
            if (jobInput || locationInput) {
                showToast('info', 'Searching Jobs', 
                    `Finding ${jobInput || 'all'} jobs ${locationInput ? 'in ' + locationInput : 'everywhere'}`);
                
                // Simulate API call
                setTimeout(() => {
                    showToast('success', 'Jobs Found', 
                        `Found 245 jobs matching your criteria`);
                }, 1500);
            }
        });
    }
    
    // Tag click functionality
    document.querySelectorAll('.tag').forEach(tag => {
        tag.addEventListener('click', function() {
            const tagText = this.textContent;
            const searchInput = document.querySelector('.search-input:first-child');
            searchInput.value = tagText;
            searchInput.focus();
        });
    });
});