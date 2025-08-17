// Main JavaScript for ChartMaster AI Landing Page

// Global variables
let isYearlyPricing = false;
let demoScansUsed = 0;
const maxDemoScans = 2;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeHeroUpload();
    initializePricingToggle();
    initializeScrollEffects();
    initializeDemoFunctionality();
    
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

// Hero upload functionality
function initializeHeroUpload() {
    const heroUploadArea = document.getElementById('heroUploadArea');
    if (heroUploadArea) {
        setupHeroDragAndDrop(heroUploadArea);
    }
}

// Setup drag and drop for hero upload
function setupHeroDragAndDrop(uploadArea) {
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('drag-over');
    });
    
    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('drag-over');
    });
    
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('drag-over');
        
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            handleHeroChartUpload({ target: { files: [file] } });
        }
    });
}

// Handle hero chart upload
function handleHeroChartUpload(event) {
    const file = event.target.files[0];
    if (!file || !file.type.startsWith('image/')) {
        showNotification('Please upload a valid image file', 'error');
        return;
    }
    
    // Hide upload area and show loading
    const heroUploadArea = document.getElementById('heroUploadArea');
    const heroAnalysisResults = document.getElementById('heroAnalysisResults');
    
    heroUploadArea.style.display = 'none';
    
    // Show loading state
    heroAnalysisResults.innerHTML = `
        <div style="text-align: center; padding: 40px;">
            <div class="loading-spinner-container">
                <div class="ai-brain-icon">🧠</div>
                <div class="loading-spinner"></div>
            </div>
            <h3 class="loading-title">Analyzing Your Chart...</h3>
            <p class="loading-message">Our AI is processing your chart patterns...</p>
        </div>
    `;
    heroAnalysisResults.style.display = 'block';
    
    // Simulate analysis (3 seconds)
    setTimeout(() => {
        showHeroAnalysisResults();
    }, 3000);
}

// Show hero analysis results
function showHeroAnalysisResults() {
    const heroAnalysisResults = document.getElementById('heroAnalysisResults');
    
    heroAnalysisResults.innerHTML = `
        <div class="analysis-header-hero">
            <div class="sentiment-display-hero">
                <div class="sentiment-icon-hero">📈</div>
                <div>
                    <div class="sentiment-text-hero">BULLISH</div>
                    <div class="confidence-hero">89% Confidence</div>
                </div>
            </div>
            <button class="new-analysis-btn-hero" onclick="resetHeroAnalysis()">New Analysis</button>
        </div>
        
        <div class="analysis-grid-hero">
            <div class="analysis-card-hero">
                <h4>📊 Pattern Analysis</h4>
                <div class="metric-hero">
                    <span class="metric-label-hero">Pattern:</span>
                    <span class="metric-value-hero">Ascending Triangle</span>
                </div>
                <div class="metric-hero">
                    <span class="metric-label-hero">Timeframe:</span>
                    <span class="metric-value-hero">4H</span>
                </div>
            </div>
            
            <div class="analysis-card-hero">
                <h4>🎯 Price Levels</h4>
                <div class="metric-hero">
                    <span class="metric-label-hero">Support:</span>
                    <span class="metric-value-hero support">$64,200</span>
                </div>
                <div class="metric-hero">
                    <span class="metric-label-hero">Target:</span>
                    <span class="metric-value-hero target">$68,500</span>
                </div>
            </div>
        </div>
        
        <div class="hero-results-actions">
            <a href="/register" class="hero-action-btn primary">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                Get Full Professional Analysis
            </a>
            <a href="/register" class="hero-action-btn secondary">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                </svg>
                Export PDF Report
            </a>
        </div>
    `;
}

// Reset hero analysis
function resetHeroAnalysis() {
    const heroUploadArea = document.getElementById('heroUploadArea');
    const heroAnalysisResults = document.getElementById('heroAnalysisResults');
    const heroChartInput = document.getElementById('heroChartInput');
    
    heroAnalysisResults.style.display = 'none';
    heroUploadArea.style.display = 'block';
    heroChartInput.value = '';
}

// Pricing toggle functionality
function initializePricingToggle() {
    const toggle = document.querySelector('.toggle-switch');
    
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

// Scroll effects and animations
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
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const elementsToAnimate = document.querySelectorAll(
        '.feature-card, .pricing-card, .demo-feature, .trust-item'
    );
    
    elementsToAnimate.forEach(element => {
        observer.observe(element);
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
        uploadZone.style.borderColor = 'var(--primary-blue)';
        uploadZone.style.background = 'rgba(59, 130, 246, 0.05)';
    });
    
    uploadZone.addEventListener('dragleave', () => {
        uploadZone.style.borderColor = 'var(--gray-300)';
        uploadZone.style.background = 'rgba(255, 255, 255, 0.5)';
    });
    
    uploadZone.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadZone.style.borderColor = 'var(--gray-300)';
        uploadZone.style.background = 'rgba(255, 255, 255, 0.5)';
        
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
            <h3>Analyzing Chart...</h3>
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
        <div class="upload-zone" onclick="document.getElementById('demoChartInput').click()">
            <input type="file" id="demoChartInput" accept="image/*" style="display: none;" onchange="handleDemoChartUpload(event)">
            <div class="upload-content">
                <div class="upload-icon-large">📊</div>
                <h3>Drop Chart Here</h3>
                <p>or click to browse</p>
                <div class="supported-formats">
                    <span>PNG</span>
                    <span>JPG</span>
                    <span>TradingView</span>
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
            counter.parentElement.style.color = 'var(--primary-red)';
            counter.parentElement.innerHTML = '<span style="color: #EF4444;">0</span> scans remaining - <a href="/register" style="color: var(--primary-blue);">Upgrade now</a>';
        }
    }
}

// Show upgrade modal
function showUpgradeModal() {
    const modal = document.createElement('div');
    modal.className = 'upgrade-modal';
    modal.innerHTML = `
        <div class="modal-overlay" onclick="closeUpgradeModal()"></div>
        <div class="modal-content glass-card">
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
                border-color: #EF4444;
                background: rgba(239, 68, 68, 0.1);
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

// Add CSS for upgrade modal
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
    }
    
    .modal-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(10px);
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
        color: var(--primary-blue);
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
        border-radius: var(--radius-xl);
        font-weight: var(--font-weight-semibold);
        text-decoration: none;
        border: none;
        cursor: pointer;
        transition: all var(--transition-normal);
    }
    
    .upgrade-btn.primary {
        background: var(--primary-gradient);
        color: white;
    }
    
    .upgrade-btn.primary:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow-lg);
        background: var(--primary-gradient-hover);
    }
    
    .upgrade-btn.secondary {
        background: var(--gray-100);
        color: var(--gray-700);
    }
    
    .upgrade-btn.secondary:hover {
        background: var(--gray-200);
    }
    
    .upgrade-note {
        color: var(--gray-600);
        font-size: 0.875rem;
    }
`;

// Add styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = upgradeModalStyles;
document.head.appendChild(styleSheet);