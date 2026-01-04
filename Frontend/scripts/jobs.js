// Jobs JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Sample job data
    const jobs = [
        {
            id: 1,
            title: "Senior Frontend Engineer",
            company: "TechFlow",
            logo: "TF",
            type: "full-time",
            location: "Remote",
            salary: "$140,000 - $180,000",
            equity: "0.1% - 0.5%",
            posted: "2 days ago",
            skills: ["React", "TypeScript", "Next.js", "GraphQL"],
            badge: "Featured"
        },
        {
            id: 2,
            title: "Product Designer",
            company: "CloudScale",
            logo: "CS",
            type: "full-time",
            location: "San Francisco, CA",
            salary: "$130,000 - $160,000",
            equity: "0.05% - 0.2%",
            posted: "1 week ago",
            skills: ["Figma", "UI/UX", "Prototyping", "User Research"],
            badge: "Hot"
        },
        {
            id: 3,
            title: "DevOps Engineer",
            company: "DataMind",
            logo: "DM",
            type: "full-time",
            location: "Remote",
            salary: "$150,000 - $190,000",
            equity: "0.08% - 0.3%",
            posted: "3 days ago",
            skills: ["AWS", "Kubernetes", "Terraform", "Docker"],
            badge: null
        },
        {
            id: 4,
            title: "Growth Marketing Manager",
            company: "SwiftLabs",
            logo: "SL",
            type: "full-time",
            location: "New York, NY",
            salary: "$120,000 - $150,000",
            equity: "0.05% - 0.15%",
            posted: "5 days ago",
            skills: ["SEO", "Content", "Analytics", "PPC"],
            badge: "New"
        },
        {
            id: 5,
            title: "Backend Engineer (Node.js)",
            company: "NexaSoft",
            logo: "NS",
            type: "contract",
            location: "Remote",
            salary: "$80 - $120/hr",
            equity: null,
            posted: "1 day ago",
            skills: ["Node.js", "MongoDB", "Redis", "Microservices"],
            badge: "Remote"
        },
        {
            id: 6,
            title: "Data Scientist",
            company: "QuantumLeap",
            logo: "QL",
            type: "full-time",
            location: "Boston, MA",
            salary: "$145,000 - $175,000",
            equity: "0.1% - 0.4%",
            posted: "4 days ago",
            skills: ["Python", "Machine Learning", "SQL", "TensorFlow"],
            badge: null
        },
        {
            id: 7,
            title: "Mobile Developer (React Native)",
            company: "TechFlow",
            logo: "TF",
            type: "full-time",
            location: "Remote",
            salary: "$130,000 - $160,000",
            equity: "0.08% - 0.25%",
            posted: "1 week ago",
            skills: ["React Native", "iOS", "Android", "JavaScript"],
            badge: "Remote"
        },
        {
            id: 8,
            title: "Customer Success Manager",
            company: "CloudScale",
            logo: "CS",
            type: "full-time",
            location: "Austin, TX",
            salary: "$90,000 - $120,000",
            equity: "0.02% - 0.1%",
            posted: "2 weeks ago",
            skills: ["CRM", "Onboarding", "Support", "SaaS"],
            badge: null
        }
    ];
    
    // Render Jobs
    function renderJobs(jobsToRender = jobs) {
        const jobsGrid = document.getElementById('jobsGrid');
        if (!jobsGrid) return;
        
        jobsGrid.innerHTML = jobsToRender.map(job => `
            <div class="job-card" data-job-id="${job.id}">
                <div class="job-header">
                    <div class="job-company">
                        <div class="company-logo">${job.logo}</div>
                        <div class="company-info">
                            <h3>${job.company}</h3>
                            <p>${job.location} • ${job.type}</p>
                        </div>
                    </div>
                    ${job.badge ? `<div class="job-badge">${job.badge}</div>` : ''}
                </div>
                
                <h2 class="job-title">${job.title}</h2>
                
                <div class="job-meta">
                    <div class="meta-item">
                        <i class="fas fa-money-bill-wave"></i>
                        <span>${job.salary}</span>
                    </div>
                    ${job.equity ? `
                    <div class="meta-item">
                        <i class="fas fa-chart-line"></i>
                        <span>${job.equity} equity</span>
                    </div>
                    ` : ''}
                    <div class="meta-item">
                        <i class="fas fa-clock"></i>
                        <span>${job.posted}</span>
                    </div>
                </div>
                
                <div class="job-skills">
                    ${job.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                </div>
                
                <div class="job-actions">
                    <div class="job-salary">${job.salary}</div>
                    <button class="apply-btn" data-job-id="${job.id}">
                        Apply Now
                    </button>
                </div>
            </div>
        `).join('');
        
        // Add event listeners to apply buttons
        document.querySelectorAll('.apply-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const jobId = parseInt(this.getAttribute('data-job-id'));
                applyToJob(jobId);
            });
        });
        
        // Add click event to job cards
        document.querySelectorAll('.job-card').forEach(card => {
            card.addEventListener('click', function(e) {
                if (!e.target.closest('.apply-btn')) {
                    const jobId = parseInt(this.getAttribute('data-job-id'));
                    viewJobDetails(jobId);
                }
            });
        });
    }
    
    // Apply to Job
    function applyToJob(jobId) {
        const job = jobs.find(j => j.id === jobId);
        if (!job) return;
        
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        
        if (!isLoggedIn) {
            showToast('info', 'Login Required', 'Please log in to apply for this job');
            
            // Open auth modal
            const authModal = document.getElementById('authModal');
            if (authModal) {
                authModal.classList.add('active');
            }
            return;
        }
        
        const userName = localStorage.getItem('userName') || 'User';
        
        // Show loading
        const applyBtn = document.querySelector(`.apply-btn[data-job-id="${jobId}"]`);
        const originalText = applyBtn.textContent;
        applyBtn.innerHTML = '<div class="btn-loading"></div>';
        applyBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Save application to localStorage (for demo)
            const applications = JSON.parse(localStorage.getItem('jobApplications') || '[]');
            applications.push({
                jobId,
                jobTitle: job.title,
                company: job.company,
                appliedAt: new Date().toISOString()
            });
            localStorage.setItem('jobApplications', JSON.stringify(applications));
            
            showToast('success', 'Application Submitted!', 
                `You applied for ${job.title} at ${job.company}`);
            
            // Reset button
            applyBtn.textContent = 'Applied ✓';
            applyBtn.style.backgroundColor = '#10b981';
            applyBtn.disabled = true;
            
            // Re-enable after 5 seconds for demo
            setTimeout(() => {
                applyBtn.textContent = originalText;
                applyBtn.style.backgroundColor = '';
                applyBtn.disabled = false;
            }, 5000);
        }, 1500);
    }
    
    // View Job Details
    function viewJobDetails(jobId) {
        const job = jobs.find(j => j.id === jobId);
        if (!job) return;
        
        // Create modal for job details
        const modal = document.createElement('div');
        modal.className = 'modal job-modal active';
        modal.innerHTML = `
            <div class="modal-content job-modal-content">
                <button class="modal-close job-modal-close">&times;</button>
                
                <div class="job-modal-header">
                    <div class="job-modal-company">
                        <div class="company-logo-lg">${job.logo}</div>
                        <div>
                            <h2>${job.title}</h2>
                            <p>${job.company} • ${job.location} • ${job.type}</p>
                        </div>
                    </div>
                    
                    <div class="job-modal-actions">
                        <button class="btn-secondary save-job" data-job-id="${job.id}">
                            <i class="far fa-heart"></i> Save
                        </button>
                        <button class="btn-primary apply-now" data-job-id="${job.id}">
                            Apply Now
                        </button>
                    </div>
                </div>
                
                <div class="job-modal-body">
                    <div class="job-details-grid">
                        <div class="job-detail">
                            <h4>Salary Range</h4>
                            <p>${job.salary}</p>
                        </div>
                        <div class="job-detail">
                            <h4>Equity</h4>
                            <p>${job.equity || 'Not specified'}</p>
                        </div>
                        <div class="job-detail">
                            <h4>Experience Level</h4>
                            <p>Senior Level</p>
                        </div>
                        <div class="job-detail">
                            <h4>Posted</h4>
                            <p>${job.posted}</p>
                        </div>
                    </div>
                    
                    <div class="job-description">
                        <h3>Job Description</h3>
                        <p>We're looking for a talented ${job.title} to join our growing team. In this role, you'll work on challenging problems and build products that impact millions of users.</p>
                        
                        <h4>Responsibilities</h4>
                        <ul>
                            <li>Design, build, and maintain efficient, reusable, and reliable code</li>
                            <li>Collaborate with cross-functional teams to define, design, and ship new features</li>
                            <li>Identify and correct bottlenecks and fix bugs</li>
                            <li>Help maintain code quality, organization, and automatization</li>
                            <li>Mentor junior engineers and participate in code reviews</li>
                        </ul>
                        
                        <h4>Requirements</h4>
                        <ul>
                            ${job.skills.map(skill => `<li>${skill} experience</li>`).join('')}
                            <li>5+ years of relevant experience</li>
                            <li>Strong problem-solving skills</li>
                            <li>Excellent communication and collaboration skills</li>
                        </ul>
                        
                        <h4>Benefits</h4>
                        <ul>
                            <li>Competitive salary and equity package</li>
                            <li>Health, dental, and vision insurance</li>
                            <li>Unlimited vacation policy</li>
                            <li>Remote work flexibility</li>
                            <li>Learning and development budget</li>
                        </ul>
                    </div>
                    
                    <div class="job-skills-section">
                        <h4>Required Skills</h4>
                        <div class="skills-list">
                            ${job.skills.map(skill => `<span class="skill-tag-lg">${skill}</span>`).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        
        // Add event listeners
        modal.querySelector('.job-modal-close').addEventListener('click', closeJobModal);
        modal.querySelector('.apply-now').addEventListener('click', () => applyToJob(jobId));
        modal.querySelector('.save-job').addEventListener('click', function() {
            saveJob(jobId, this);
        });
        
        // Close modal when clicking outside
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeJobModal();
            }
        });
        
        // Close with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && document.querySelector('.job-modal.active')) {
                closeJobModal();
            }
        });
        
        // Add styles for job modal
        if (!document.querySelector('#job-modal-styles')) {
            const style = document.createElement('style');
            style.id = 'job-modal-styles';
            style.textContent = `
                .job-modal-content {
                    max-width: 800px;
                    max-height: 90vh;
                    overflow-y: auto;
                }
                
                .job-modal-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    padding: 30px;
                    border-bottom: 1px solid #e5e7eb;
                }
                
                .job-modal-company {
                    display: flex;
                    gap: 20px;
                    align-items: center;
                }
                
                .job-modal-company h2 {
                    font-size: 28px;
                    font-weight: 800;
                    margin-bottom: 5px;
                    color: #1a1a1a;
                }
                
                .job-modal-company p {
                    color: #6b7280;
                }
                
                .job-modal-actions {
                    display: flex;
                    gap: 15px;
                }
                
                .job-modal-body {
                    padding: 30px;
                }
                
                .job-details-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 20px;
                    background: #f8fafc;
                    padding: 25px;
                    border-radius: 12px;
                    margin-bottom: 30px;
                }
                
                .job-detail h4 {
                    font-size: 14px;
                    color: #6b7280;
                    margin-bottom: 8px;
                    font-weight: 600;
                }
                
                .job-detail p {
                    font-size: 18px;
                    font-weight: 700;
                    color: #1a1a1a;
                }
                
                .job-description h3 {
                    font-size: 24px;
                    font-weight: 700;
                    margin-bottom: 20px;
                    color: #1a1a1a;
                }
                
                .job-description h4 {
                    font-size: 18px;
                    font-weight: 600;
                    margin: 25px 0 15px;
                    color: #374151;
                }
                
                .job-description p, .job-description li {
                    color: #4b5563;
                    line-height: 1.6;
                    margin-bottom: 10px;
                }
                
                .job-description ul {
                    padding-left: 20px;
                    margin-bottom: 20px;
                }
                
                .job-skills-section {
                    margin-top: 40px;
                    padding-top: 30px;
                    border-top: 1px solid #e5e7eb;
                }
                
                .skills-list {
                    display: flex;
                    gap: 10px;
                    flex-wrap: wrap;
                    margin-top: 15px;
                }
                
                .skill-tag-lg {
                    background: rgba(37, 99, 235, 0.1);
                    color: #2563eb;
                    padding: 10px 20px;
                    border-radius: 20px;
                    font-weight: 600;
                }
                
                @media (max-width: 768px) {
                    .job-modal-header {
                        flex-direction: column;
                        gap: 20px;
                    }
                    
                    .job-modal-company {
                        flex-direction: column;
                        text-align: center;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    function closeJobModal() {
        const modal = document.querySelector('.job-modal');
        if (modal) {
            modal.style.animation = 'fadeOut 0.3s ease forwards';
            setTimeout(() => {
                modal.remove();
                document.body.style.overflow = '';
            }, 300);
        }
    }
    
    function saveJob(jobId, button) {
        const job = jobs.find(j => j.id === jobId);
        if (!job) return;
        
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        
        if (!isLoggedIn) {
            showToast('info', 'Login Required', 'Please log in to save jobs');
            return;
        }
        
        // Toggle save state
        const icon = button.querySelector('i');
        const isSaved = icon.classList.contains('fas');
        
        if (isSaved) {
            icon.classList.replace('fas', 'far');
            button.innerHTML = '<i class="far fa-heart"></i> Save';
            showToast('info', 'Job Unsaved', `Removed ${job.title} from saved jobs`);
        } else {
            icon.classList.replace('far', 'fas');
            button.innerHTML = '<i class="fas fa-heart"></i> Saved';
            showToast('success', 'Job Saved!', `Saved ${job.title} to your favorites`);
        }
    }
    
    // Filter Jobs
    function filterJobs(filters) {
        let filteredJobs = [...jobs];
        
        if (filters.type && filters.type !== 'all') {
            filteredJobs = filteredJobs.filter(job => job.type === filters.type);
        }
        
        if (filters.location) {
            filteredJobs = filteredJobs.filter(job => 
                job.location.toLowerCase().includes(filters.location.toLowerCase()));
        }
        
        if (filters.skills && filters.skills.length > 0) {
            filteredJobs = filteredJobs.filter(job =>
                filters.skills.some(skill => 
                    job.skills.some(jobSkill => 
                        jobSkill.toLowerCase().includes(skill.toLowerCase())
                    )
                )
            );
        }
        
        renderJobs(filteredJobs);
    }
    
    // Initialize
    renderJobs();
    
    // Toast function (shared with main.js)
    function showToast(type, title, message, duration = 5000) {
        if (typeof window.showToast === 'function') {
            window.showToast(type, title, message, duration);
        } else {
            console.log(`[${type.toUpperCase()}] ${title}: ${message}`);
        }
    }
    
    // Add fadeOut animation if not present
    if (!document.querySelector('#fadeOut-animation')) {
        const style = document.createElement('style');
        style.id = 'fadeOut-animation';
        style.textContent = `
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
});