// Advanced Animations for ChartMaster AI

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeScrollAnimations();
    initializeParallaxEffects();
    initializeCounterAnimations();
    initializeFloatingElements();
    initializeMorphingEffects();
    
    console.log('Advanced animations initialized');
});

// Scroll-based animations with Intersection Observer
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    // Create multiple observers for different animation types
    const fadeInObserver = new IntersectionObserver(handleFadeInAnimation, observerOptions);
    const slideUpObserver = new IntersectionObserver(handleSlideUpAnimation, observerOptions);
    const scaleInObserver = new IntersectionObserver(handleScaleInAnimation, observerOptions);
    const staggerObserver = new IntersectionObserver(handleStaggerAnimation, observerOptions);
    
    // Observe elements for fade-in animation
    document.querySelectorAll('.feature-card, .pricing-card, .demo-feature').forEach(el => {
        fadeInObserver.observe(el);
    });
    
    // Observe elements for slide-up animation
    document.querySelectorAll('.section-header, .hero-content').forEach(el => {
        slideUpObserver.observe(el);
    });
    
    // Observe elements for scale-in animation
    document.querySelectorAll('.demo-window, .glass-card').forEach(el => {
        scaleInObserver.observe(el);
    });
    
    // Observe elements for stagger animation
    document.querySelectorAll('.features-grid, .pricing-grid').forEach(el => {
        staggerObserver.observe(el);
    });
}

// Handle fade-in animations
function handleFadeInAnimation(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(30px)';
            entry.target.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);
            
            observer.unobserve(entry.target);
        }
    });
}

// Handle slide-up animations
function handleSlideUpAnimation(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(50px)';
            entry.target.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 150);
            
            observer.unobserve(entry.target);
        }
    });
}

// Handle scale-in animations
function handleScaleInAnimation(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'scale(0.8)';
            entry.target.style.transition = 'opacity 0.5s ease-out, transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'scale(1)';
            }, 200);
            
            observer.unobserve(entry.target);
        }
    });
}

// Handle stagger animations
function handleStaggerAnimation(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const children = entry.target.children;
            Array.from(children).forEach((child, index) => {
                child.style.opacity = '0';
                child.style.transform = 'translateY(30px)';
                child.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
                
                setTimeout(() => {
                    child.style.opacity = '1';
                    child.style.transform = 'translateY(0)';
                }, index * 100);
            });
            
            observer.unobserve(entry.target);
        }
    });
}

// Parallax effects for hero section
function initializeParallaxEffects() {
    const heroSection = document.querySelector('.hero-section');
    const floatingElements = document.querySelectorAll('.float-element');
    const heroMesh = document.querySelector('.hero-mesh');
    
    if (!heroSection) return;
    
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        const meshRate = scrolled * -0.3;
        
        // Move floating elements
        floatingElements.forEach((element, index) => {
            const speed = 0.2 + (index * 0.1);
            element.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
        });
        
        // Move hero mesh
        if (heroMesh) {
            heroMesh.style.transform = `translateY(${meshRate}px)`;
        }
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

// Counter animations for statistics
function initializeCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number');
    
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
    const text = element.textContent;
    const hasPercent = text.includes('%');
    const hasPlus = text.includes('+');
    const hasLess = text.includes('<');
    const hasTime = text.includes('s');
    
    let targetValue = 0;
    let suffix = '';
    
    if (hasPercent) {
        targetValue = parseFloat(text.replace('%', ''));
        suffix = '%';
    } else if (hasPlus) {
        targetValue = parseInt(text.replace(/[^0-9]/g, ''));
        suffix = 'k+';
    } else if (hasLess) {
        targetValue = parseInt(text.replace(/[^0-9]/g, ''));
        suffix = 's';
    } else {
        targetValue = parseInt(text.replace(/[^0-9]/g, '')) || 0;
    }
    
    if (targetValue === 0) return;
    
    let currentValue = 0;
    const increment = targetValue / 60; // 60 frames for smooth animation
    const duration = 2000; // 2 seconds
    const stepTime = duration / 60;
    
    const timer = setInterval(() => {
        currentValue += increment;
        
        if (currentValue >= targetValue) {
            currentValue = targetValue;
            clearInterval(timer);
        }
        
        if (hasLess) {
            element.textContent = `< ${Math.floor(currentValue)}${suffix}`;
        } else if (hasPlus) {
            element.textContent = `${Math.floor(currentValue / 1000)}${suffix}`;
        } else {
            element.textContent = `${Math.floor(currentValue)}${suffix}`;
        }
    }, stepTime);
}

// Floating elements animation
function initializeFloatingElements() {
    const floatingElements = document.querySelectorAll('.float-element');
    
    floatingElements.forEach((element, index) => {
        // Set initial random position
        const randomX = Math.random() * 100;
        const randomY = Math.random() * 100;
        
        element.style.left = `${randomX}%`;
        element.style.top = `${randomY}%`;
        
        // Add floating animation with different delays
        element.style.animationDelay = `${index * 2}s`;
        element.style.animationDuration = `${15 + index * 3}s`;
    });
}

// Morphing effects for interactive elements
function initializeMorphingEffects() {
    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.hero-cta, .nav-cta, .plan-cta, .cta-button');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add morphing effects to cards
    const cards = document.querySelectorAll('.feature-card, .pricing-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) rotateX(5deg)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0deg)';
            this.style.boxShadow = '';
        });
    });
}

// Advanced loading animations
function createLoadingAnimation(container) {
    const loadingHTML = `
        <div class="advanced-loader">
            <div class="loader-brain">
                <div class="brain-core">🧠</div>
                <div class="brain-pulse"></div>
                <div class="brain-waves">
                    <div class="wave wave-1"></div>
                    <div class="wave wave-2"></div>
                    <div class="wave wave-3"></div>
                </div>
            </div>
            <div class="loader-text">
                <h3>AI Analysis in Progress</h3>
                <p class="loading-step">Initializing neural networks...</p>
            </div>
            <div class="loader-progress">
                <div class="progress-bar">
                    <div class="progress-fill"></div>
                </div>
                <div class="progress-percentage">0%</div>
            </div>
        </div>
    `;
    
    container.innerHTML = loadingHTML;
    
    // Animate progress
    const progressFill = container.querySelector('.progress-fill');
    const progressPercentage = container.querySelector('.progress-percentage');
    const loadingStep = container.querySelector('.loading-step');
    
    const steps = [
        'Initializing neural networks...',
        'Loading AI models...',
        'Analyzing chart patterns...',
        'Processing market data...',
        'Generating insights...',
        'Finalizing results...'
    ];
    
    let progress = 0;
    let stepIndex = 0;
    
    const progressInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) progress = 100;
        
        progressFill.style.width = `${progress}%`;
        progressPercentage.textContent = `${Math.floor(progress)}%`;
        
        // Update step text
        if (stepIndex < steps.length - 1 && progress > (stepIndex + 1) * 16.67) {
            stepIndex++;
            loadingStep.textContent = steps[stepIndex];
        }
        
        if (progress >= 100) {
            clearInterval(progressInterval);
        }
    }, 200);
    
    return progressInterval;
}

// Particle system for background effects
function createParticleSystem() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-system';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
    `;
    
    document.body.appendChild(particleContainer);
    
    // Create particles
    for (let i = 0; i < 20; i++) {
        createParticle(particleContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const size = Math.random() * 4 + 2;
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const duration = Math.random() * 20 + 10;
    
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: radial-gradient(circle, rgba(0, 122, 255, 0.3) 0%, transparent 70%);
        border-radius: 50%;
        left: ${x}px;
        top: ${y}px;
        animation: particleFloat ${duration}s linear infinite;
    `;
    
    container.appendChild(particle);
    
    // Remove and recreate particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.remove();
            createParticle(container);
        }
    }, duration * 1000);
}

// Smooth scroll with easing
function smoothScrollTo(target, duration = 1000) {
    const targetElement = document.querySelector(target);
    if (!targetElement) return;
    
    const targetPosition = targetElement.offsetTop - 80; // Account for fixed header
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutQuart(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    
    function easeInOutQuart(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t * t + b;
        t -= 2;
        return -c / 2 * (t * t * t * t - 2) + b;
    }
    
    requestAnimationFrame(animation);
}

// Add CSS for advanced animations
const animationStyles = `
    @keyframes particleFloat {
        0% {
            transform: translateY(100vh) translateX(0px) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) translateX(100px) rotate(360deg);
            opacity: 0;
        }
    }
    
    .advanced-loader {
        text-align: center;
        padding: 2rem;
    }
    
    .loader-brain {
        position: relative;
        width: 120px;
        height: 120px;
        margin: 0 auto 2rem;
    }
    
    .brain-core {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 3rem;
        z-index: 3;
        animation: pulse 2s ease-in-out infinite;
    }
    
    .brain-pulse {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 80px;
        height: 80px;
        background: radial-gradient(circle, rgba(0, 122, 255, 0.2) 0%, transparent 70%);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        animation: brainPulse 2s ease-in-out infinite;
    }
    
    @keyframes brainPulse {
        0%, 100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.7;
        }
        50% {
            transform: translate(-50%, -50%) scale(1.2);
            opacity: 0.3;
        }
    }
    
    .brain-waves {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    
    .wave {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100%;
        height: 100%;
        border: 2px solid;
        border-radius: 50%;
        transform: translate(-50%, -50%);
        animation: waveExpand 3s infinite;
        opacity: 0.6;
    }
    
    .wave-1 {
        border-color: var(--primary-blue);
        animation-delay: 0s;
    }
    
    .wave-2 {
        border-color: var(--primary-purple);
        animation-delay: 1s;
    }
    
    .wave-3 {
        border-color: var(--primary-pink);
        animation-delay: 2s;
    }
    
    @keyframes waveExpand {
        0% {
            transform: translate(-50%, -50%) scale(0.8);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) scale(1.5);
            opacity: 0;
        }
    }
    
    .loader-text h3 {
        margin-bottom: 0.5rem;
        color: var(--gray-900);
    }
    
    .loading-step {
        color: var(--gray-600);
        margin-bottom: 2rem;
        font-weight: 500;
    }
    
    .loader-progress {
        max-width: 300px;
        margin: 0 auto;
    }
    
    .progress-bar {
        width: 100%;
        height: 8px;
        background: var(--gray-200);
        border-radius: 4px;
        overflow: hidden;
        margin-bottom: 0.5rem;
    }
    
    .progress-fill {
        height: 100%;
        background: var(--gradient-primary);
        border-radius: 4px;
        width: 0%;
        transition: width 0.3s ease;
    }
    
    .progress-percentage {
        font-weight: 600;
        color: var(--primary-blue);
    }
    
    /* Smooth transitions for all interactive elements */
    * {
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    /* Reduce motion for users who prefer it */
    @media (prefers-reduced-motion: reduce) {
        *,
        *::before,
        *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    }
`;

// Add animation styles to document
const animationStyleSheet = document.createElement('style');
animationStyleSheet.textContent = animationStyles;
document.head.appendChild(animationStyleSheet);

// Initialize particle system on load
document.addEventListener('DOMContentLoaded', function() {
    // Only create particles on desktop to avoid performance issues
    if (window.innerWidth > 1024) {
        setTimeout(createParticleSystem, 1000);
    }
});

// Export functions for use in other scripts
window.ChartMasterAnimations = {
    smoothScrollTo,
    createLoadingAnimation,
    createParticleSystem
};