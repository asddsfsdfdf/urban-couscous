// Main JavaScript for ChartMaster AI Landing Page with Professional Animations

// Global variables
let isYearlyPricing = false;
let demoScansUsed = 0;
const maxDemoScans = 2;
let heroAnimationInterval;
let particleSystem;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeHeroDemo();
    initializePricingToggle();
    initializeScrollEffects();
    initializeDemoFunctionality();
    initializeParticleSystem();
    initializeCounterAnimations();
    
    console.log('ChartMaster AI initialized successfully');
});

// Navigation functionality
function initializeNavigation() {
    const nav = document.querySelector('.nav-glass');
    
    // Scroll effect for navigation
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(255, 255, 255, 0.95)';
            nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            nav.style.background = 'rgba(255, 255, 255, 0.8)';
            nav.style.boxShadow = 'none';
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Mobile menu toggle
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const toggle = document.querySelector('.mobile-menu-toggle');
    
    navLinks.classList.toggle('mobile-active');
    toggle.classList.toggle('active');
}

// Hero demo functionality with professional animations
function initializeHeroDemo() {
    const heroDemo = document.getElementById('heroDemo');
    
    const demoStates = [
        {
            type: 'upload',
            content: `
                <div class="hero-upload-state">
                    <div class="upload-animation">
                        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                            <polyline points="17 8 12 3 7 8"/>
                            <line x1="12" y1="3" x2="12" y2="15"/>
                        </svg>
                        <div class="upload-rings">
                            <div class="ring ring-1"></div>
                            <div class="ring ring-2"></div>
                            <div class="ring ring-3"></div>
                        </div>
                    </div>
                    <h3>Drop Chart Here</h3>
                    <p>AI analysis in seconds</p>
                </div>
            `
        },
        {
            type: 'analyzing',
            content: `
                <div class="hero-analyzing-state">
                    <div class="ai-brain-animation">
                        <div class="brain-core">🧠</div>
                        <div class="neural-network">
                            <div class="neuron neuron-1"></div>
                            <div class="neuron neuron-2"></div>
                            <div class="neuron neuron-3"></div>
                            <div class="neuron neuron-4"></div>
                            <div class="connection connection-1"></div>
                            <div class="connection connection-2"></div>
                            <div class="connection connection-3"></div>
                        </div>
                    </div>
                    <h3>AI Analyzing...</h3>
                    <div class="analysis-progress">
                        <div class="progress-bar">
                            <div class="progress-fill"></div>
                        </div>
                        <p class="progress-text">Detecting patterns...</p>
                    </div>
                </div>
            `
        },
        {
            type: 'results',
            content: `
                <div class="hero-results-state">
                    <div class="sentiment-display bullish">
                        <div class="sentiment-icon">📈</div>
                        <div class="sentiment-info">
                            <div class="sentiment-text">BULLISH</div>
                            <div class="confidence-score">87% Confidence</div>
                        </div>
                    </div>
                    <div class="key-insights">
                        <div class="insight-item">
                            <span class="insight-label">Pattern:</span>
                            <span class="insight-value">Ascending Triangle</span>
                        </div>
                        <div class="insight-item">
                            <span class="insight-label">Target:</span>
                            <span class="insight-value">$68,500</span>
                        </div>
                    </div>
                </div>
            `
        }
    ];
    
    let currentState = 0;
    
    function updateHeroDemo() {
        heroDemo.innerHTML = demoStates[currentState].content;
        currentState = (currentState + 1) % demoStates.length;
    }
    
    // Initial state
    updateHeroDemo();
    
    // Cycle through states
    heroAnimationInterval = setInterval(updateHeroDemo, 4000);
    
    // Add CSS for hero demo animations
    addHeroDemoStyles();
}

// Add CSS styles for hero demo
function addHeroDemoStyles() {
    const styles = `
        <style>
            .hero-upload-state, .hero-analyzing-state, .hero-results-state {
                text-align: center;
                animation: fadeInUp 0.6s ease-out;
            }
            
            @keyframes fadeInUp {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            
            .upload-animation {
                position: relative;
                margin-bottom: 24px;
            }
            
            .upload-rings {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }
            
            .ring {
                position: absolute;
                border: 2px solid;
                border-radius: 50%;
                animation: ringPulse 2s ease-out infinite;
            }
            
            .ring-1 {
                width: 80px;
                height: 80px;
                border-color: #FF6B6B;
                animation-delay: 0s;
            }
            
            .ring-2 {
                width: 100px;
                height: 100px;
                border-color: #4ECDC4;
                animation-delay: 0.5s;
            }
            
            .ring-3 {
                width: 120px;
                height: 120px;
                border-color: #A8E6CF;
                animation-delay: 1s;
            }
            
            @keyframes ringPulse {
                0% { transform: translate(-50%, -50%) scale(0.8); opacity: 1; }
                100% { transform: translate(-50%, -50%) scale(1.5); opacity: 0; }
            }
            
            .ai-brain-animation {
                position: relative;
                width: 120px;
                height: 120px;
                margin: 0 auto 24px;
            }
            
            .brain-core {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                font-size: 3rem;
                z-index: 3;
                animation: brainPulse 2s ease-in-out infinite;
            }
            
            @keyframes brainPulse {
                0%, 100% { transform: translate(-50%, -50%) scale(1); }
                50% { transform: translate(-50%, -50%) scale(1.1); }
            }
            
            .neural-network {
                position: absolute;
                width: 100%;
                height: 100%;
            }
            
            .neuron {
                position: absolute;
                width: 8px;
                height: 8px;
                background: #4ECDC4;
                border-radius: 50%;
                animation: neuronPulse 1.5s ease-in-out infinite;
            }
            
            .neuron-1 { top: 20%; left: 20%; animation-delay: 0s; }
            .neuron-2 { top: 20%; right: 20%; animation-delay: 0.3s; }
            .neuron-3 { bottom: 20%; left: 20%; animation-delay: 0.6s; }
            .neuron-4 { bottom: 20%; right: 20%; animation-delay: 0.9s; }
            
            @keyframes neuronPulse {
                0%, 100% { opacity: 0.3; transform: scale(1); }
                50% { opacity: 1; transform: scale(1.5); }
            }
            
            .connection {
                position: absolute;
                height: 2px;
                background: linear-gradient(90deg, #4ECDC4, #A8E6CF);
                animation: connectionFlow 2s ease-in-out infinite;
            }
            
            .connection-1 {
                top: 25%;
                left: 25%;
                width: 50%;
                transform: rotate(0deg);
            }
            
            .connection-2 {
                top: 50%;
                left: 25%;
                width: 50%;
                transform: rotate(90deg);
            }
            
            .connection-3 {
                bottom: 25%;
                left: 25%;
                width: 50%;
                transform: rotate(45deg);
            }
            
            @keyframes connectionFlow {
                0%, 100% { opacity: 0.3; }
                50% { opacity: 1; }
            }
            
            .analysis-progress {
                margin-top: 16px;
            }
            
            .progress-bar {
                width: 200px;
                height: 4px;
                background: rgba(255, 255, 255, 0.2);
                border-radius: 2px;
                overflow: hidden;
                margin: 0 auto 8px;
            }
            
            .progress-fill {
                height: 100%;
                background: linear-gradient(90deg, #4ECDC4, #A8E6CF);
                border-radius: 2px;
                animation: progressFlow 3s ease-in-out infinite;
            }
            
            @keyframes progressFlow {
                0% { width: 0%; }
                50% { width: 70%; }
                100% { width: 100%; }
            }
            
            .progress-text {
                font-size: 14px;
                color: #666;
                margin: 0;
            }
            
            .sentiment-display {
                display: flex;
                align-items: center;
                gap: 16px;
                padding: 16px;
                background: rgba(16, 185, 129, 0.1);
                border: 1px solid rgba(16, 185, 129, 0.2);
                border-radius: 12px;
                margin-bottom: 16px;
            }
            
            .sentiment-icon {
                font-size: 2rem;
            }
            
            .sentiment-text {
                font-size: 1.25rem;
                font-weight: 700;
                color: #10B981;
            }
            
            .confidence-score {
                font-size: 0.875rem;
                color: #666;
            }
            
            .key-insights {
                display: flex;
                flex-direction: column;
                gap: 8px;
            }
            
            .insight-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 8px 12px;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 8px;
            }
            
            .insight-label {
                font-weight: 500;
                color: #666;
            }
            
            .insight-value {
                font-weight: 600;
                color: #333;
            }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', styles);
}

// Pricing toggle functionality
function initializePricingToggle() {
    const toggle = document.querySelector('.toggle-switch');
    const priceAmounts = document.querySelectorAll('.price-amount');
    
    if (toggle) {
        toggle.addEventListener('click', togglePricing);
    }
}

function togglePricing() {
    const toggle = document.querySelector('.toggle-switch');
    const priceAmounts = document.querySelectorAll('.price-amount');
    
    isYearlyPricing = !isYearlyPricing;
    toggle.classList.toggle('active');
    
    priceAmounts.forEach(amount => {
        const monthly = amount.getAttribute('data-monthly');
        const yearly = amount.getAttribute('data-yearly');
        
        if (monthly && yearly) {
            amount.textContent = isYearlyPricing ? `$${yearly}` : `$${monthly}`;
        }
    });
}

// Advanced scroll effects and animations
function initializeScrollEffects() {
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fadeIn');
                
                // Special animations for specific elements
                if (entry.target.classList.contains('feature-card')) {
                    animateFeatureCard(entry.target);
                } else if (entry.target.classList.contains('pricing-card')) {
                    animatePricingCard(entry.target);
                } else if (entry.target.classList.contains('demo-feature')) {
                    animateDemoFeature(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const elementsToAnimate = document.querySelectorAll(
        '.feature-card, .pricing-card, .demo-feature, .trust-item, .section-badge'
    );
    
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
    
    // Parallax effect for floating elements
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const floatingElements = document.querySelectorAll('.float-element');
        
        floatingElements.forEach((element, index) => {
            const speed = 0.1 + (index * 0.05);
            element.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.05}deg)`;
        });
    });
}

// Feature card animation
function animateFeatureCard(card) {
    const icon = card.querySelector('.feature-icon');
    if (icon) {
        setTimeout(() => {
            icon.style.transform = 'scale(1.1) rotate(5deg)';
            setTimeout(() => {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }, 300);
        }, 200);
    }
}

// Pricing card animation
function animatePricingCard(card) {
    const priceAmount = card.querySelector('.price-amount');
    if (priceAmount) {
        priceAmount.style.transform = 'scale(1.1)';
        setTimeout(() => {
            priceAmount.style.transform = 'scale(1)';
        }, 300);
    }
}

// Demo feature animation
function animateDemoFeature(feature) {
    const icon = feature.querySelector('.demo-feature-icon');
    if (icon) {
        setTimeout(() => {
            icon.style.transform = 'scale(1.2) rotate(10deg)';
            setTimeout(() => {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }, 400);
        }, 100);
    }
}

// Counter animations
function initializeCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number[data-target]');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Animate individual counter
function animateCounter(element) {
    const target = parseFloat(element.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        if (target === 98.5) {
            element.textContent = current.toFixed(1);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Particle system initialization
function initializeParticleSystem() {
    const particleContainer = document.getElementById('particleSystem');
    if (!particleContainer) return;
    
    particleSystem = {
        particles: [],
        container: particleContainer,
        colors: ['#FF6B6B', '#4ECDC4', '#A8E6CF', '#FFD93D', '#FD79A8']
    };
    
    // Create particles
    for (let i = 0; i < 15; i++) {
        createParticle();
    }
    
    // Animate particles
    animateParticles();
}

function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const size = Math.random() * 4 + 2;
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const color = particleSystem.colors[Math.floor(Math.random() * particleSystem.colors.length)];
    
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: 50%;
        left: ${x}px;
        top: ${y}px;
        opacity: 0.6;
        pointer-events: none;
    `;
    
    particleSystem.container.appendChild(particle);
    particleSystem.particles.push({
        element: particle,
        x: x,
        y: y,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        life: Math.random() * 200 + 100
    });
}

function animateParticles() {
    particleSystem.particles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life--;
        
        // Wrap around screen
        if (particle.x < 0) particle.x = window.innerWidth;
        if (particle.x > window.innerWidth) particle.x = 0;
        if (particle.y < 0) particle.y = window.innerHeight;
        if (particle.y > window.innerHeight) particle.y = 0;
        
        particle.element.style.left = particle.x + 'px';
        particle.element.style.top = particle.y + 'px';
        
        // Remove dead particles
        if (particle.life <= 0) {
            particle.element.remove();
            particleSystem.particles.splice(index, 1);
            createParticle(); // Create new particle
        }
    });
    
    requestAnimationFrame(animateParticles);
}

// Demo functionality
function initializeDemoFunctionality() {
    updateDemoCounter();
    
    // Add drag and drop support
    const uploadZone = document.querySelector('.upload-zone');
    if (uploadZone) {
        setupDragAndDrop(uploadZone);
    }
}

// Drag and drop functionality
function setupDragAndDrop(uploadZone) {
    uploadZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadZone.style.borderColor = '#4ECDC4';
        uploadZone.style.background = 'rgba(78, 205, 196, 0.05)';
        uploadZone.style.transform = 'scale(1.02)';
    });
    
    uploadZone.addEventListener('dragleave', () => {
        uploadZone.style.borderColor = '';
        uploadZone.style.background = '';
        uploadZone.style.transform = '';
    });
    
    uploadZone.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadZone.style.borderColor = '';
        uploadZone.style.background = '';
        uploadZone.style.transform = '';
        
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            handleDemoChartUpload({ target: { files: [file] } });
        }
    });
}

// Handle demo chart upload
function handleDemoChartUpload(event) {
    const file = event.target.files[0];
    if (!file || !file.type.startsWith('image/')) {
        showNotification('Please upload a valid image file', 'error');
        return;
    }
    
    if (demoScansUsed >= maxDemoScans) {
        showUpgradeModal();
        return;
    }
    
    // Show loading state
    showDemoLoading();
    
    // Simulate analysis
    setTimeout(() => {
        showDemoResults();
        demoScansUsed++;
        updateDemoCounter();
    }, 3000);
}

// Show demo loading state
function showDemoLoading() {
    const demoInterface = document.getElementById('demoInterface');
    const loadingMessages = [
        'Analyzing chart patterns...',
        'Detecting support and resistance...',
        'Calculating market sentiment...',
        'Identifying trading opportunities...',
        'Generating recommendations...'
    ];
    
    demoInterface.innerHTML = `
        <div class="demo-loading">
            <div class="loading-animation">
                <div class="loading-spinner"></div>
                <div class="loading-brain">🧠</div>
            </div>
            <h3>AI Analyzing Chart...</h3>
            <p id="loadingMessage">${loadingMessages[0]}</p>
            <div class="progress-bar">
                <div class="progress-fill" id="progressFill"></div>
            </div>
        </div>
    `;
    
    // Animate loading messages
    let messageIndex = 0;
    const messageInterval = setInterval(() => {
        messageIndex = (messageIndex + 1) % loadingMessages.length;
        const messageEl = document.getElementById('loadingMessage');
        if (messageEl) {
            messageEl.textContent = loadingMessages[messageIndex];
        }
    }, 600);
    
    // Stop message animation after 3 seconds
    setTimeout(() => {
        clearInterval(messageInterval);
    }, 3000);
}

// Show demo results
function showDemoResults() {
    const demoInterface = document.getElementById('demoInterface');
    
    demoInterface.innerHTML = `
        <div class="demo-results">
            <div class="results-header">
                <div class="sentiment-badge bullish">
                    <span class="sentiment-icon">📈</span>
                    <span class="sentiment-text">BULLISH</span>
                    <span class="confidence">87%</span>
                </div>
                <button class="new-analysis-btn" onclick="resetDemo()">New Analysis</button>
            </div>
            
            <div class="results-content">
                <div class="result-item">
                    <span class="result-label">Pattern Detected:</span>
                    <span class="result-value">Ascending Triangle</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Support Level:</span>
                    <span class="result-value">$64,200</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Target Price:</span>
                    <span class="result-value">$68,500</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Risk/Reward:</span>
                    <span class="result-value">1:3.2</span>
                </div>
            </div>
            
            <div class="results-actions">
                <button class="result-action primary" onclick="showUpgradeModal()">Get Full Analysis</button>
                <button class="result-action secondary" onclick="showUpgradeModal()">Export PDF</button>
            </div>
        </div>
    `;
}

// Reset demo to initial state
function resetDemo() {
    const demoInterface = document.getElementById('demoInterface');
    
    demoInterface.innerHTML = `
        <div class="upload-zone glass-morphism" onclick="document.getElementById('demoChartInput').click()">
            <input type="file" id="demoChartInput" accept="image/*" style="display: none;" onchange="handleDemoChartUpload(event)">
            <div class="upload-content">
                <div class="upload-icon-large">
                    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                        <polyline points="17 8 12 3 7 8"/>
                        <line x1="12" y1="3" x2="12" y2="15"/>
                    </svg>
                    <div class="upload-pulse"></div>
                </div>
                <h3>Drop Chart Here</h3>
                <p>or click to browse</p>
                <div class="supported-formats">
                    <span class="format-badge">PNG</span>
                    <span class="format-badge">JPG</span>
                    <span class="format-badge">TradingView</span>
                </div>
            </div>
        </div>
    `;
    
    // Re-setup drag and drop
    const uploadZone = demoInterface.querySelector('.upload-zone');
    if (uploadZone) {
        setupDragAndDrop(uploadZone);
    }
}

// Update demo counter
function updateDemoCounter() {
    const counter = document.getElementById('demoScansRemaining');
    if (counter) {
        const remaining = maxDemoScans - demoScansUsed;
        counter.textContent = remaining;
        
        if (remaining === 0) {
            counter.parentElement.style.color = '#FF6B6B';
            counter.parentElement.innerHTML = '<div class="counter-icon">🔥</div><span style="color: #FF6B6B;">0</span> scans remaining - <a href="/register" style="color: #4ECDC4;">Upgrade now</a>';
        }
    }
}

// Show upgrade modal
function showUpgradeModal() {
    const modal = document.createElement('div');
    modal.className = 'upgrade-modal';
    modal.innerHTML = `
        <div class="modal-overlay" onclick="closeUpgradeModal()"></div>
        <div class="modal-content glass-morphism">
            <button class="modal-close" onclick="closeUpgradeModal()">×</button>
            <div class="modal-icon">🚀</div>
            <h2>Unlock Full Analysis Power</h2>
            <p>You've used your free demo scans. Upgrade to get unlimited AI-powered chart analysis.</p>
            
            <div class="upgrade-features">
                <div class="upgrade-feature">
                    <span class="feature-icon">✓</span>
                    <span>Unlimited chart analysis</span>
                </div>
                <div class="upgrade-feature">
                    <span class="feature-icon">✓</span>
                    <span>12+ analysis styles</span>
                </div>
                <div class="upgrade-feature">
                    <span class="feature-icon">✓</span>
                    <span>Advanced AI models</span>
                </div>
                <div class="upgrade-feature">
                    <span class="feature-icon">✓</span>
                    <span>PDF exports & API access</span>
                </div>
            </div>
            
            <div class="upgrade-actions">
                <a href="/register" class="upgrade-btn primary">Start Free Trial</a>
                <button class="upgrade-btn secondary" onclick="closeUpgradeModal()">Maybe Later</button>
            </div>
            
            <div class="upgrade-note">
                <span>✓ 7-day free trial • No credit card required</span>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Animate in
    setTimeout(() => {
        modal.style.opacity = '1';
        modal.querySelector('.modal-content').style.transform = 'scale(1)';
    }, 10);
}

// Close upgrade modal
function closeUpgradeModal() {
    const modal = document.querySelector('.upgrade-modal');
    if (modal) {
        modal.style.opacity = '0';
        modal.querySelector('.modal-content').style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = '';
        }, 300);
    }
}

// Scroll to demo section
function scrollToDemo() {
    const demoSection = document.getElementById('demo');
    if (demoSection) {
        demoSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">×</button>
    `;
    
    // Add notification styles if not already present
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                background: var(--glass-bg);
                backdrop-filter: var(--glass-backdrop);
                border: 1px solid var(--glass-border);
                padding: var(--spacing-lg);
                border-radius: var(--radius-xl);
                box-shadow: var(--shadow-xl);
                z-index: 10000;
                display: flex;
                align-items: center;
                gap: var(--spacing-md);
                max-width: 400px;
                animation: slideInRight 0.3s ease-out;
            }
            
            .notification.error {
                border-color: #FF6B6B;
                background: rgba(255, 107, 107, 0.1);
            }
            
            .notification button {
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: var(--gray-500);
                padding: 0;
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(styles);
    }
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Handle URL parameters for plan selection
function handleURLParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    const plan = urlParams.get('plan');
    
    if (plan) {
        localStorage.setItem('selectedPlan', plan);
        
        // Scroll to pricing section
        const pricingSection = document.getElementById('pricing');
        if (pricingSection) {
            setTimeout(() => {
                pricingSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 500);
        }
    }
}

// Initialize URL parameter handling
document.addEventListener('DOMContentLoaded', handleURLParameters);

// Add CSS for upgrade modal and other components
const upgradeModalStyles = `
    .upgrade-modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(10px);
    }
    
    .modal-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        cursor: pointer;
    }
    
    .modal-content {
        position: relative;
        max-width: 500px;
        width: 90%;
        padding: var(--spacing-2xl);
        text-align: center;
        transform: scale(0.9);
        transition: transform 0.3s ease;
    }
    
    .modal-close {
        position: absolute;
        top: var(--spacing-lg);
        right: var(--spacing-lg);
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: var(--gray-500);
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: background 0.2s ease;
    }
    
    .modal-close:hover {
        background: var(--gray-100);
    }
    
    .modal-icon {
        font-size: 4rem;
        margin-bottom: var(--spacing-lg);
    }
    
    .modal-content h2 {
        margin-bottom: var(--spacing-md);
        color: var(--gray-900);
    }
    
    .modal-content p {
        margin-bottom: var(--spacing-xl);
        color: var(--gray-600);
    }
    
    .upgrade-features {
        text-align: left;
        margin-bottom: var(--spacing-xl);
    }
    
    .upgrade-feature {
        display: flex;
        align-items: center;
        gap: var(--spacing-md);
        margin-bottom: var(--spacing-md);
    }
    
    .upgrade-feature .feature-icon {
        color: var(--rainbow-green);
        font-weight: bold;
    }
    
    .upgrade-actions {
        display: flex;
        gap: var(--spacing-md);
        margin-bottom: var(--spacing-lg);
    }
    
    .upgrade-btn {
        flex: 1;
        padding: var(--spacing-lg);
        border-radius: var(--radius-full);
        font-weight: var(--font-weight-semibold);
        text-decoration: none;
        border: none;
        cursor: pointer;
        transition: all var(--transition-normal);
    }
    
    .upgrade-btn.primary {
        background: var(--gradient-primary);
        color: white;
    }
    
    .upgrade-btn.primary:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow-lg);
    }
    
    .upgrade-btn.secondary {
        background: var(--glass-bg);
        color: var(--gray-700);
        border: 1px solid var(--glass-border);
    }
    
    .upgrade-btn.secondary:hover {
        background: var(--glass-bg-strong);
    }
    
    .upgrade-note {
        color: var(--gray-600);
        font-size: 0.875rem;
    }
    
    .demo-loading {
        text-align: center;
        animation: fadeIn 0.5s ease-out;
    }
    
    .loading-animation {
        position: relative;
        width: 100px;
        height: 100px;
        margin: 0 auto var(--spacing-xl);
    }
    
    .loading-spinner {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: 3px solid var(--gray-200);
        border-top-color: var(--rainbow-blue);
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    
    .loading-brain {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 2.5rem;
        animation: pulse 2s ease-in-out infinite;
    }
    
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
    
    .demo-results {
        animation: slideUp 0.5s ease-out;
    }
    
    @keyframes slideUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .results-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: var(--spacing-xl);
    }
    
    .sentiment-badge {
        display: flex;
        align-items: center;
        gap: var(--spacing-md);
        background: rgba(16, 185, 129, 0.1);
        border: 1px solid rgba(16, 185, 129, 0.2);
        padding: var(--spacing-md) var(--spacing-lg);
        border-radius: var(--radius-xl);
    }
    
    .sentiment-badge.bullish {
        background: rgba(16, 185, 129, 0.1);
        border-color: rgba(16, 185, 129, 0.2);
    }
    
    .sentiment-badge .sentiment-icon {
        font-size: 1.5rem;
    }
    
    .sentiment-badge .sentiment-text {
        font-weight: var(--font-weight-bold);
        color: var(--rainbow-green);
    }
    
    .sentiment-badge .confidence {
        font-weight: var(--font-weight-semibold);
        color: var(--gray-700);
    }
    
    .new-analysis-btn {
        background: var(--glass-bg);
        border: 1px solid var(--glass-border);
        padding: var(--spacing-sm) var(--spacing-lg);
        border-radius: var(--radius-lg);
        font-weight: var(--font-weight-medium);
        color: var(--gray-700);
        cursor: pointer;
        transition: all var(--transition-fast);
    }
    
    .new-analysis-btn:hover {
        background: var(--glass-bg-strong);
    }
    
    .results-content {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-md);
        margin-bottom: var(--spacing-xl);
    }
    
    .result-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--spacing-md);
        background: rgba(255, 255, 255, 0.7);
        border-radius: var(--radius-lg);
    }
    
    .result-label {
        font-weight: var(--font-weight-medium);
        color: var(--gray-600);
    }
    
    .result-value {
        font-weight: var(--font-weight-semibold);
        color: var(--gray-900);
    }
    
    .results-actions {
        display: flex;
        gap: var(--spacing-md);
    }
    
    .result-action {
        flex: 1;
        padding: var(--spacing-md) var(--spacing-lg);
        border-radius: var(--radius-lg);
        font-weight: var(--font-weight-semibold);
        cursor: pointer;
        transition: all var(--transition-normal);
        border: none;
    }
    
    .result-action.primary {
        background: var(--gradient-primary);
        color: white;
    }
    
    .result-action.primary:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow-lg);
    }
    
    .result-action.secondary {
        background: var(--glass-bg);
        color: var(--gray-700);
        border: 1px solid var(--glass-border);
    }
    
    .result-action.secondary:hover {
        background: var(--glass-bg-strong);
    }
`;

// Add styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = upgradeModalStyles;
document.head.appendChild(styleSheet);