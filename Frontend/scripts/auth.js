// Authentication JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Form elements
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const authModal = document.getElementById('authModal');
    
    // Demo user database (in production, this would be an API call)
    const demoUsers = [
        {
            email: 'demo@careerconnect.com',
            password: 'demo123',
            name: 'Demo User',
            type: 'seeker'
        },
        {
            email: 'recruiter@careerconnect.com',
            password: 'demo123',
            name: 'Demo Recruiter',
            type: 'recruiter'
        }
    ];
    
    // Login Form Submission
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('loginEmail').value.trim();
            const password = document.getElementById('loginPassword').value;
            const rememberMe = document.getElementById('loginForm').querySelector('input[type="checkbox"]')?.checked;
            
            // Validation
            if (!email || !password) {
                showToast('error', 'Validation Error', 'Please fill in all required fields');
                return;
            }
            
            if (!validateEmail(email)) {
                showToast('error', 'Invalid Email', 'Please enter a valid email address');
                return;
            }
            
            // Simulate API call with loading state
            const submitBtn = this.querySelector('.btn-auth');
            const originalText = submitBtn.textContent;
            submitBtn.innerHTML = '<div class="btn-loading"></div>';
            submitBtn.disabled = true;
            
            // Simulate network delay
            setTimeout(() => {
                // Check credentials against demo users
                const user = demoUsers.find(u => u.email === email && u.password === password);
                
                if (user) {
                    // Successful login
                    showToast('success', 'Welcome Back!', `Logged in as ${user.name}`);
                    
                    // Store user session
                    if (rememberMe) {
                        localStorage.setItem('userEmail', email);
                    }
                    
                    localStorage.setItem('isLoggedIn', 'true');
                    localStorage.setItem('userName', user.name);
                    localStorage.setItem('userType', user.type);
                    
                    // Close modal and update UI
                    setTimeout(() => {
                        authModal.classList.remove('active');
                        updateUIForLoggedInUser(user);
                    }, 1000);
                } else {
                    // Invalid credentials
                    showToast('error', 'Login Failed', 'Invalid email or password');
                }
                
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
    
    // Signup Form Submission
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('signupName').value.trim();
            const email = document.getElementById('signupEmail').value.trim();
            const password = document.getElementById('signupPassword').value;
            const userType = document.querySelector('.user-type.active')?.getAttribute('data-type') || 'seeker';
            const termsAccepted = this.querySelector('input[type="checkbox"]').checked;
            
            // Validation
            if (!name || !email || !password) {
                showToast('error', 'Validation Error', 'Please fill in all required fields');
                return;
            }
            
            if (!validateEmail(email)) {
                showToast('error', 'Invalid Email', 'Please enter a valid email address');
                return;
            }
            
            if (!validatePassword(password)) {
                showToast('error', 'Weak Password', 'Password must be at least 8 characters long');
                return;
            }
            
            if (!termsAccepted) {
                showToast('error', 'Terms Required', 'You must accept the terms and conditions');
                return;
            }
            
            // Check if user already exists
            const userExists = demoUsers.some(u => u.email === email);
            if (userExists) {
                showToast('error', 'Account Exists', 'An account with this email already exists');
                return;
            }
            
            // Simulate API call with loading state
            const submitBtn = this.querySelector('.btn-auth');
            const originalText = submitBtn.textContent;
            submitBtn.innerHTML = '<div class="btn-loading"></div>';
            submitBtn.disabled = true;
            
            // Simulate network delay
            setTimeout(() => {
                // Create new user (in production, this would be an API call)
                const newUser = {
                    email,
                    password,
                    name,
                    type: userType
                };
                
                // Demo: Add to local "database"
                demoUsers.push(newUser);
                
                // Successful signup
                showToast('success', 'Account Created!', `Welcome to CareerConnect, ${name}!`);
                
                // Store user session
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userName', name);
                localStorage.setItem('userEmail', email);
                localStorage.setItem('userType', userType);
                
                // Close modal and update UI
                setTimeout(() => {
                    authModal.classList.remove('active');
                    updateUIForLoggedInUser(newUser);
                    
                    // Show onboarding message
                    setTimeout(() => {
                        showToast('info', 'Complete Your Profile', 
                            'Add skills and experience to get better job matches');
                    }, 1000);
                }, 1500);
                
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
    
    // Social Login Buttons
    document.querySelectorAll('.social-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const platform = this.classList.contains('google') ? 'Google' : 'LinkedIn';
            
            showToast('info', `${platform} Login`, `Redirecting to ${platform} authentication...`);
            
            // Simulate OAuth flow
            setTimeout(() => {
                // For demo purposes, auto-login with a demo user
                const demoUser = demoUsers[0];
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userName', demoUser.name);
                localStorage.setItem('userEmail', demoUser.email);
                localStorage.setItem('userType', demoUser.type);
                
                showToast('success', 'Login Successful', `Logged in with ${platform} as ${demoUser.name}`);
                
                // Close modal and update UI
                setTimeout(() => {
                    authModal.classList.remove('active');
                    updateUIForLoggedInUser(demoUser);
                }, 1000);
            }, 2000);
        });
    });
    
    // Forgot Password
    const forgotPasswordLink = document.querySelector('.forgot-password');
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            const email = prompt('Enter your email address to reset password:', 'user@example.com');
            
            if (email && validateEmail(email)) {
                showToast('info', 'Reset Email Sent', 
                    'Check your inbox for password reset instructions');
                
                // Simulate API call
                setTimeout(() => {
                    showToast('success', 'Email Sent', 
                        'Password reset instructions sent to your email');
                }, 1000);
            } else if (email) {
                showToast('error', 'Invalid Email', 'Please enter a valid email address');
            }
        });
    }
    
    // Helper Functions
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function validatePassword(password) {
        return password.length >= 8;
    }
    
    function updateUIForLoggedInUser(user) {
        // Update navigation
        const navActions = document.querySelector('.nav-actions');
        if (navActions) {
            const userName = user.name.split(' ')[0]; // Get first name
            const userType = user.type === 'recruiter' ? 'Recruiter' : 'Job Seeker';
            
            navActions.innerHTML = `
                <div class="user-dropdown">
                    <button class="user-profile">
                        <div class="avatar">
                            ${userName.charAt(0).toUpperCase()}
                        </div>
                        <span>Hi, ${userName}</span>
                        <i class="fas fa-chevron-down"></i>
                    </button>
                    <div class="dropdown-menu">
                        <div class="dropdown-header">
                            <div class="avatar">${userName.charAt(0).toUpperCase()}</div>
                            <div>
                                <h4>${user.name}</h4>
                                <p>${userType}</p>
                            </div>
                        </div>
                        <div class="dropdown-divider"></div>
                        ${user.type === 'recruiter' ? 
                            '<a href="#"><i class="fas fa-briefcase"></i> Post a Job</a>' : 
                            '<a href="#"><i class="fas fa-user"></i> My Profile</a>'}
                        <a href="#"><i class="fas fa-heart"></i> Saved Jobs</a>
                        <a href="#"><i class="fas fa-cog"></i> Settings</a>
                        <div class="dropdown-divider"></div>
                        <a href="#" id="logoutBtn"><i class="fas fa-sign-out-alt"></i> Log Out</a>
                    </div>
                </div>
            `;
            
            // Add dropdown functionality
            const userProfile = document.querySelector('.user-profile');
            const dropdownMenu = document.querySelector('.dropdown-menu');
            
            userProfile.addEventListener('click', function(e) {
                e.stopPropagation();
                dropdownMenu.classList.toggle('show');
            });
            
            // Close dropdown when clicking outside
            document.addEventListener('click', function() {
                dropdownMenu.classList.remove('show');
            });
            
            // Logout functionality
            document.getElementById('logoutBtn')?.addEventListener('click', function(e) {
                e.preventDefault();
                logoutUser();
            });
        }
        
        // Update post job button for recruiters
        if (user.type === 'recruiter') {
            const postJobBtn = document.getElementById('postJobBtn');
            if (postJobBtn) {
                postJobBtn.innerHTML = '<i class="fas fa-plus-circle"></i> Post a Job';
                postJobBtn.addEventListener('click', function() {
                    showToast('info', 'Post a Job', 'Redirecting to job posting dashboard...');
                });
            }
        }
        
        // Show welcome message
        setTimeout(() => {
            showToast('success', 'Welcome!', 
                user.type === 'recruiter' ? 
                    'Start posting jobs and finding talent' : 
                    'Start exploring jobs that match your profile');
        }, 500);
    }
    
    function logoutUser() {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userType');
        
        // Reset navigation
        const navActions = document.querySelector('.nav-actions');
        if (navActions) {
            navActions.innerHTML = `
                <button class="btn btn-secondary" id="loginBtn">
                    <i class="fas fa-sign-in-alt"></i> Log In
                </button>
                <button class="btn btn-primary" id="signupBtn">
                    <i class="fas fa-user-plus"></i> Sign Up
                </button>
                <button class="btn-post-job" id="postJobBtn">
                    <i class="fas fa-plus-circle"></i> Post a Job
                </button>
            `;
            
            // Re-attach event listeners
            document.getElementById('loginBtn').addEventListener('click', () => 
                document.querySelector('.modal').classList.add('active'));
            document.getElementById('signupBtn').addEventListener('click', () => 
                document.querySelector('.modal').classList.add('active'));
        }
        
        showToast('info', 'Logged Out', 'You have been successfully logged out');
    }
    
    // Check if user is already logged in
    function checkLoginStatus() {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        
        if (isLoggedIn) {
            const userName = localStorage.getItem('userName');
            const userEmail = localStorage.getItem('userEmail');
            const userType = localStorage.getItem('userType');
            
            if (userName && userEmail) {
                const user = {
                    name: userName,
                    email: userEmail,
                    type: userType || 'seeker'
                };
                updateUIForLoggedInUser(user);
            }
        }
    }
    
    // Initialize
    checkLoginStatus();
    
    // Toast function (shared with main.js)
    function showToast(type, title, message, duration = 5000) {
        // Check if toast function exists in main.js, if not create it
        if (typeof window.showToast === 'function') {
            window.showToast(type, title, message, duration);
        } else {
            // Fallback implementation
            console.log(`[${type.toUpperCase()}] ${title}: ${message}`);
            
            // Create simple alert for demo
            const alertDiv = document.createElement('div');
            alertDiv.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 15px 20px;
                background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
                color: white;
                border-radius: 10px;
                z-index: 3000;
                animation: slideInRight 0.3s ease;
            `;
            alertDiv.innerHTML = `<strong>${title}:</strong> ${message}`;
            document.body.appendChild(alertDiv);
            
            setTimeout(() => {
                alertDiv.style.animation = 'slideOutRight 0.3s ease forwards';
                setTimeout(() => alertDiv.remove(), 300);
            }, duration);
        }
    }
    
    // Add dropdown styles if not present
    if (!document.querySelector('#dropdown-styles')) {
        const style = document.createElement('style');
        style.id = 'dropdown-styles';
        style.textContent = `
            .user-dropdown {
                position: relative;
            }
            
            .user-profile {
                display: flex;
                align-items: center;
                gap: 10px;
                background: none;
                border: 1px solid #e5e7eb;
                border-radius: 8px;
                padding: 8px 15px;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .user-profile:hover {
                border-color: #2563eb;
            }
            
            .avatar {
                width: 32px;
                height: 32px;
                background: linear-gradient(135deg, #2563eb, #7c3aed);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-weight: 600;
                font-size: 14px;
            }
            
            .user-profile span {
                font-weight: 600;
                color: #374151;
            }
            
            .user-profile i {
                color: #9ca3af;
                font-size: 12px;
            }
            
            .dropdown-menu {
                position: absolute;
                top: 100%;
                right: 0;
                margin-top: 10px;
                background: white;
                border-radius: 12px;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
                min-width: 250px;
                display: none;
                z-index: 1000;
                border: 1px solid #e5e7eb;
            }
            
            .dropdown-menu.show {
                display: block;
                animation: fadeIn 0.3s ease;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(-10px); }
                to { opacity: 1; transform: translateY(0); }
            }
            
            .dropdown-header {
                display: flex;
                align-items: center;
                gap: 15px;
                padding: 20px;
            }
            
            .dropdown-header h4 {
                font-size: 16px;
                font-weight: 600;
                margin-bottom: 5px;
            }
            
            .dropdown-header p {
                font-size: 14px;
                color: #6b7280;
            }
            
            .dropdown-divider {
                height: 1px;
                background: #e5e7eb;
                margin: 10px 0;
            }
            
            .dropdown-menu a {
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 12px 20px;
                color: #374151;
                text-decoration: none;
                transition: all 0.3s ease;
            }
            
            .dropdown-menu a:hover {
                background: #f3f4f6;
                color: #2563eb;
            }
            
            .dropdown-menu a i {
                width: 20px;
                color: #9ca3af;
            }
        `;
        document.head.appendChild(style);
    }
});