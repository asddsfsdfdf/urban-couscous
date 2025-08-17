// Advanced Animations for ChartMaster AI with Professional Effects

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeScrollAnimations();
    initializeParallaxEffects();
    initializeCounterAnimations();
    initializeFloatingElements();
    initializeMorphingEffects();
    initializeAdvancedParticles();
    initializeGlowEffects();
    
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
    const glowObserver = new IntersectionObserver(handleGlowAnimation, observerOptions);
    
    // Observe elements for fade-in animation
    document.querySelectorAll('.feature-card, .pricing-card, .demo-feature').forEach(el => {
        fadeInObserver.observe(el);
    });
    
    // Observe elements for slide-up animation
    document.querySelectorAll('.section-header, .hero-content').forEach(el => {
        slideUpObserver.observe(el);
    });
    
    // Observe elements for scale-in animation
    document.querySelectorAll('.demo-window, .glass-morphism').forEach(el => {
        scaleInObserver.observe(el);
    });
    
    // Observe elements for stagger animation
    document.querySelectorAll('.features-grid, .pricing-grid').forEach(el => {
        staggerObserver.observe(el);
    });
    
    // Observe elements for glow animation
    document.querySelectorAll('.hero-cta, .nav-cta, .plan-cta').forEach(el => {
        glowObserver.observe(el);
    });
}

// Handle fade-in animations with rainbow effects
function handleFadeInAnimation(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(30px)';
            entry.target.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add rainbow glow effect
                if (entry.target.classList.contains('feature-card')) {
                    addRainbowGlow(entry.target);
                }
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
            entry.target.style.transition = 'opacity 1s cubic-bezier(0.4, 0, 0.2, 1), transform 1s cubic-bezier(0.4, 0, 0.2, 1)';
            
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 150);
            
            observer.unobserve(entry.target);
        }
    });
}

// Handle scale-in animations with bounce effect
function handleScaleInAnimation(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'scale(0.8)';
            entry.target.style.transition = 'opacity 0.6s ease-out, transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'scale(1)';
            }, 200);
            
            observer.unobserve(entry.target);
        }
    });
}

// Handle stagger animations with rainbow colors
function handleStaggerAnimation(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const children = entry.target.children;
            const rainbowColors = ['#FF6B6B', '#4ECDC4', '#A8E6CF', '#FFD93D', '#FD79A8'];
            
            Array.from(children).forEach((child, index) => {
                child.style.opacity = '0';
                child.style.transform = 'translateY(30px) scale(0.9)';
                child.style.transition = 'opacity 0.8s ease-out, transform 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                
                setTimeout(() => {
                    child.style.opacity = '1';
                    child.style.transform = 'translateY(0) scale(1)';
                    
                    // Add subtle rainbow border glow
                    const color = rainbowColors[index % rainbowColors.length];
                    child.style.boxShadow = `0 0 20px ${color}20`;
                }, index * 150);
            });
            
            observer.unobserve(entry.target);
        }
    });
}

// Handle glow animations
function handleGlowAnimation(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            addPulsatingGlow(entry.target);
            observer.unobserve(entry.target);
        }
    });
}

// Add rainbow glow effect
function addRainbowGlow(element) {
    const glowElement = document.createElement('div');
    glowElement.className = 'rainbow-glow';
    glowElement.style.cssText = `
        position: absolute;
        top: -2px;
        left: -2px;
        right: -2px;
        bottom: -2px;
        background: linear-gradient(45deg, #FF6B6B, #4ECDC4, #A8E6CF, #FFD93D, #FD79A8);
        border-radius: inherit;
        z-index: -1;
        opacity: 0;
        filter: blur(8px);
        animation: rainbowGlow 3s ease-in-out infinite;
        pointer-events: none;
    `;
    
    element.style.position = 'relative';
    element.appendChild(glowElement);
    
    setTimeout(() => {
        glowElement.style.opacity = '0.3';
    }, 500);
}

// Add pulsating glow effect
function addPulsatingGlow(element) {
    element.style.position = 'relative';
    element.style.overflow = 'visible';
    
    const glow = document.createElement('div');
    glow.className = 'pulsating-glow';
    glow.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: inherit;
        border-radius: inherit;
        z-index: -1;
        filter: blur(10px);
        animation: pulsatingGlow 2s ease-in-out infinite;
        pointer-events: none;
    `;
    
    element.appendChild(glow);
}

// Parallax effects for hero section with rainbow elements
function initializeParallaxEffects() {
    const heroSection = document.querySelector('.hero-section');
    const floatingElements = document.querySelectorAll('.float-element');
    const heroMesh = document.querySelector('.hero-mesh');
    
    if (!heroSection) return;
    
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        const meshRate = scrolled * -0.2;
        
        // Move floating elements with different speeds and rotations
        floatingElements.forEach((element, index) => {
            const speed = 0.1 + (index * 0.05);
            const rotation = scrolled * (0.05 + index * 0.02);
            element.style.transform = `translateY(${scrolled * speed}px) rotate(${rotation}deg)`;
        });
        
        // Move hero mesh
        if (heroMesh) {
            heroMesh.style.transform = `translateY(${meshRate}px) rotate(${scrolled * 0.02}deg)`;
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

// Counter animations with rainbow effects
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

// Animate individual counter with rainbow effect
function animateCounter(element) {
    const target = parseFloat(element.getAttribute('data-target'));
    const duration = 2500;
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = target * easeOutQuart;
        
        // Update display
        if (target === 98.5) {
            element.textContent = current.toFixed(1);
        } else {
            element.textContent = Math.floor(current);
        }
        
        // Add rainbow glow during animation
        const glowIntensity = Math.sin(progress * Math.PI);
        element.style.textShadow = `0 0 ${glowIntensity * 20}px rgba(78, 205, 196, 0.8)`;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            // Final glow effect
            element.style.textShadow = '0 0 10px rgba(78, 205, 196, 0.5)';
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Floating elements animation with rainbow trails
function initializeFloatingElements() {
    const floatingElements = document.querySelectorAll('.float-element');
    const rainbowColors = ['#FF6B6B', '#4ECDC4', '#A8E6CF', '#FFD93D', '#FD79A8'];
    
    floatingElements.forEach((element, index) => {
        // Set initial random position
        const randomX = Math.random() * 100;
        const randomY = Math.random() * 100;
        
        element.style.left = `${randomX}%`;
        element.style.top = `${randomY}%`;
        
        // Add rainbow color
        const color = rainbowColors[index % rainbowColors.length];
        element.style.background = `radial-gradient(circle, ${color}40, transparent)`;
        element.style.border = `1px solid ${color}60`;
        
        // Add floating animation with different delays
        element.style.animationDelay = `${index * 2}s`;
        element.style.animationDuration = `${15 + index * 3}s`;
        
        // Add trail effect
        addTrailEffect(element, color);
    });
}

// Add trail effect to floating elements
function addTrailEffect(element, color) {
    const trail = document.createElement('div');
    trail.className = 'element-trail';
    trail.style.cssText = `
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: radial-gradient(circle, ${color}20, transparent);
        animation: trailFade 2s ease-out infinite;
        pointer-events: none;
    `;
    
    element.appendChild(trail);
}

// Morphing effects for interactive elements
function initializeMorphingEffects() {
    // Add hover effects to buttons with rainbow morphing
    const buttons = document.querySelectorAll('.hero-cta, .nav-cta, .plan-cta, .cta-button');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
            this.style.boxShadow = '0 10px 30px rgba(78, 205, 196, 0.3)';
            
            // Add rainbow border animation
            if (!this.querySelector('.rainbow-border')) {
                addRainbowBorder(this);
            }
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
    });
    
    // Add morphing effects to cards
    const cards = document.querySelectorAll('.feature-card, .pricing-card, .glass-morphism');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) rotateX(5deg) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
            
            // Add subtle rainbow glow
            const randomColor = ['#FF6B6B', '#4ECDC4', '#A8E6CF', '#FFD93D', '#FD79A8'][Math.floor(Math.random() * 5)];
            this.style.borderColor = `${randomColor}40`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0deg) scale(1)';
            this.style.boxShadow = '';
            this.style.borderColor = '';
        });
    });
}

// Add rainbow border effect
function addRainbowBorder(element) {
    const border = document.createElement('div');
    border.className = 'rainbow-border';
    border.style.cssText = `
        position: absolute;
        top: -2px;
        left: -2px;
        right: -2px;
        bottom: -2px;
        background: linear-gradient(45deg, #FF6B6B, #4ECDC4, #A8E6CF, #FFD93D, #FD79A8);
        border-radius: inherit;
        z-index: -1;
        opacity: 0;
        animation: rainbowBorderRotate 2s linear infinite;
        pointer-events: none;
    `;
    
    element.style.position = 'relative';
    element.appendChild(border);
    
    setTimeout(() => {
        border.style.opacity = '0.7';
    }, 100);
    
    // Remove after hover
    setTimeout(() => {
        if (border.parentNode) {
            border.remove();
        }
    }, 3000);
}

// Advanced particle system with rainbow particles
function initializeAdvancedParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'advanced-particle-system';
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
    
    const rainbowColors = ['#FF6B6B', '#4ECDC4', '#A8E6CF', '#FFD93D', '#FD79A8'];
    
    // Create rainbow particles
    for (let i = 0; i < 25; i++) {
        createAdvancedParticle(particleContainer, rainbowColors);
    }
}

function createAdvancedParticle(container, colors) {
    const particle = document.createElement('div');
    particle.className = 'advanced-particle';
    
    const size = Math.random() * 6 + 2;
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const duration = Math.random() * 30 + 20;
    const delay = Math.random() * 10;
    
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: radial-gradient(circle, ${color}, ${color}80);
        border-radius: 50%;
        left: ${x}px;
        top: ${y}px;
        animation: advancedParticleFloat ${duration}s linear infinite;
        animation-delay: ${delay}s;
        opacity: 0.6;
        filter: blur(0.5px);
    `;
    
    container.appendChild(particle);
    
    // Remove and recreate particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.remove();
            createAdvancedParticle(container, colors);
        }
    }, (duration + delay) * 1000);
}

// Initialize glow effects
function initializeGlowEffects() {
    // Add ambient glow to sections
    const sections = document.querySelectorAll('.glass-section');
    
    sections.forEach((section, index) => {
        const colors = ['#FF6B6B', '#4ECDC4', '#A8E6CF', '#FFD93D', '#FD79A8'];
        const color = colors[index % colors.length];
        
        section.style.position = 'relative';
        
        const glow = document.createElement('div');
        glow.className = 'section-glow';
        glow.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(circle at 50% 50%, ${color}05 0%, transparent 70%);
            pointer-events: none;
            z-index: -1;
            animation: sectionGlow 8s ease-in-out infinite;
        `;
        
        section.appendChild(glow);
    });
}

// Advanced loading animations
function createAdvancedLoadingAnimation(container) {
    const loadingHTML = `
        <div class="advanced-loader">
            <div class="loader-brain">
                <div class="brain-core">🧠</div>
                <div class="brain-pulse"></div>
                <div class="brain-waves">
                    <div class="wave wave-1"></div>
                    <div class="wave wave-2"></div>
                    <div class="wave wave-3"></div>
                    <div class="wave wave-4"></div>
                    <div class="wave wave-5"></div>
                </div>
                <div class="neural-connections">
                    <div class="connection connection-1"></div>
                    <div class="connection connection-2"></div>
                    <div class="connection connection-3"></div>
                    <div class="connection connection-4"></div>
                </div>
            </div>
            <div class="loader-text">
                <h3>Advanced AI Processing</h3>
                <p class="loading-step">Initializing neural networks...</p>
            </div>
            <div class="loader-progress">
                <div class="progress-bar">
                    <div class="progress-fill"></div>
                    <div class="progress-glow"></div>
                </div>
                <div class="progress-percentage">0%</div>
            </div>
        </div>
    `;
    
    container.innerHTML = loadingHTML;
    
    // Animate progress with rainbow colors
    const progressFill = container.querySelector('.progress-fill');
    const progressPercentage = container.querySelector('.progress-percentage');
    const loadingStep = container.querySelector('.loading-step');
    
    const steps = [
        'Initializing neural networks...',
        'Loading AI models...',
        'Analyzing chart patterns...',
        'Processing market data...',
        'Applying rainbow algorithms...',
        'Generating insights...',
        'Finalizing results...'
    ];
    
    let progress = 0;
    let stepIndex = 0;
    const colors = ['#FF6B6B', '#4ECDC4', '#A8E6CF', '#FFD93D', '#FD79A8'];
    
    const progressInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) progress = 100;
        
        progressFill.style.width = `${progress}%`;
        progressFill.style.background = `linear-gradient(90deg, ${colors[stepIndex % colors.length]}, ${colors[(stepIndex + 1) % colors.length]})`;
        progressPercentage.textContent = `${Math.floor(progress)}%`;
        
        // Update step text
        if (stepIndex < steps.length - 1 && progress > (stepIndex + 1) * 14.3) {
            stepIndex++;
            loadingStep.textContent = steps[stepIndex];
        }
        
        if (progress >= 100) {
            clearInterval(progressInterval);
        }
    }, 200);
    
    return progressInterval;
}

// Smooth scroll with rainbow trail effect
function smoothScrollTo(target, duration = 1000) {
    const targetElement = document.querySelector(target);
    if (!targetElement) return;
    
    const targetPosition = targetElement.offsetTop - 80;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    // Create scroll trail
    const trail = document.createElement('div');
    trail.className = 'scroll-trail';
    trail.style.cssText = `
        position: fixed;
        right: 20px;
        top: 50%;
        width: 4px;
        height: 100px;
        background: linear-gradient(to bottom, #FF6B6B, #4ECDC4, #A8E6CF);
        border-radius: 2px;
        z-index: 1000;
        opacity: 0.8;
        animation: scrollTrail 1s ease-out;
        pointer-events: none;
    `;
    
    document.body.appendChild(trail);
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutQuart(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
        else trail.remove();
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
const advancedAnimationStyles = `
    @keyframes rainbowGlow {
        0%, 100% { opacity: 0.3; filter: blur(8px) hue-rotate(0deg); }
        50% { opacity: 0.6; filter: blur(12px) hue-rotate(180deg); }
    }
    
    @keyframes pulsatingGlow {
        0%, 100% { opacity: 0.2; transform: scale(1); }
        50% { opacity: 0.4; transform: scale(1.05); }
    }
    
    @keyframes rainbowBorderRotate {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
    
    @keyframes advancedParticleFloat {
        0% {
            transform: translateY(100vh) translateX(0px) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 0.6;
        }
        90% {
            opacity: 0.6;
        }
        100% {
            transform: translateY(-100px) translateX(100px) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes trailFade {
        0% { opacity: 0.3; transform: scale(1); }
        50% { opacity: 0.1; transform: scale(1.2); }
        100% { opacity: 0; transform: scale(1.5); }
    }
    
    @keyframes sectionGlow {
        0%, 100% { opacity: 0.3; }
        50% { opacity: 0.6; }
    }
    
    @keyframes scrollTrail {
        0% { opacity: 0; transform: translateX(20px); }
        50% { opacity: 0.8; transform: translateX(0); }
        100% { opacity: 0; transform: translateX(-20px); }
    }
    
    .advanced-loader {
        text-align: center;
        padding: 2rem;
    }
    
    .loader-brain {
        position: relative;
        width: 150px;
        height: 150px;
        margin: 0 auto 2rem;
    }
    
    .brain-core {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 3.5rem;
        z-index: 5;
        animation: brainCorePulse 2s ease-in-out infinite;
    }
    
    @keyframes brainCorePulse {
        0%, 100% { transform: translate(-50%, -50%) scale(1); }
        50% { transform: translate(-50%, -50%) scale(1.1); }
    }
    
    .brain-pulse {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100px;
        height: 100px;
        background: radial-gradient(circle, rgba(78, 205, 196, 0.3) 0%, transparent 70%);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        animation: brainPulseExpand 2s ease-in-out infinite;
    }
    
    @keyframes brainPulseExpand {
        0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.7; }
        50% { transform: translate(-50%, -50%) scale(1.3); opacity: 0.3; }
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
        border: 2px solid;
        border-radius: 50%;
        transform: translate(-50%, -50%);
        animation: waveExpansion 4s infinite;
        opacity: 0.6;
    }
    
    .wave-1 {
        width: 80px;
        height: 80px;
        border-color: #FF6B6B;
        animation-delay: 0s;
    }
    
    .wave-2 {
        width: 100px;
        height: 100px;
        border-color: #4ECDC4;
        animation-delay: 0.8s;
    }
    
    .wave-3 {
        width: 120px;
        height: 120px;
        border-color: #A8E6CF;
        animation-delay: 1.6s;
    }
    
    .wave-4 {
        width: 140px;
        height: 140px;
        border-color: #FFD93D;
        animation-delay: 2.4s;
    }
    
    .wave-5 {
        width: 160px;
        height: 160px;
        border-color: #FD79A8;
        animation-delay: 3.2s;
    }
    
    @keyframes waveExpansion {
        0% { transform: translate(-50%, -50%) scale(0.5); opacity: 1; }
        100% { transform: translate(-50%, -50%) scale(1.5); opacity: 0; }
    }
    
    .neural-connections {
        position: absolute;
        width: 100%;
        height: 100%;
    }
    
    .connection {
        position: absolute;
        height: 2px;
        background: linear-gradient(90deg, #4ECDC4, #A8E6CF);
        animation: connectionPulse 2s ease-in-out infinite;
    }
    
    .connection-1 {
        top: 30%;
        left: 20%;
        width: 60%;
        transform: rotate(45deg);
        animation-delay: 0s;
    }
    
    .connection-2 {
        top: 50%;
        left: 15%;
        width: 70%;
        transform: rotate(-45deg);
        animation-delay: 0.5s;
    }
    
    .connection-3 {
        top: 70%;
        left: 25%;
        width: 50%;
        transform: rotate(0deg);
        animation-delay: 1s;
    }
    
    .connection-4 {
        top: 40%;
        left: 30%;
        width: 40%;
        transform: rotate(90deg);
        animation-delay: 1.5s;
    }
    
    @keyframes connectionPulse {
        0%, 100% { opacity: 0.3; }
        50% { opacity: 1; }
    }
    
    .loader-text h3 {
        margin-bottom: 0.5rem;
        color: var(--gray-900);
        background: linear-gradient(45deg, #FF6B6B, #4ECDC4, #A8E6CF);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }
    
    .loading-step {
        color: var(--gray-600);
        margin-bottom: 2rem;
        font-weight: 500;
    }
    
    .loader-progress {
        max-width: 400px;
        margin: 0 auto;
    }
    
    .progress-bar {
        position: relative;
        width: 100%;
        height: 8px;
        background: var(--gray-200);
        border-radius: 4px;
        overflow: hidden;
        margin-bottom: 0.5rem;
    }
    
    .progress-fill {
        height: 100%;
        background: linear-gradient(90deg, #FF6B6B, #4ECDC4);
        border-radius: 4px;
        width: 0%;
        transition: width 0.3s ease;
    }
    
    .progress-glow {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 30px;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent);
        animation: progressGlowMove 2s ease-in-out infinite;
    }
    
    @keyframes progressGlowMove {
        0% { left: -30px; }
        100% { left: 100%; }
    }
    
    .progress-percentage {
        font-weight: 600;
        background: linear-gradient(45deg, #4ECDC4, #A8E6CF);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
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
const advancedAnimationStyleSheet = document.createElement('style');
advancedAnimationStyleSheet.textContent = advancedAnimationStyles;
document.head.appendChild(advancedAnimationStyleSheet);

// Initialize particle system on load (only on desktop for performance)
document.addEventListener('DOMContentLoaded', function() {
    if (window.innerWidth > 1024) {
        setTimeout(initializeAdvancedParticles, 1000);
    }
});

// Export functions for use in other scripts
window.ChartMasterAnimations = {
    smoothScrollTo,
    createAdvancedLoadingAnimation,
    initializeAdvancedParticles,
    addRainbowGlow,
    addPulsatingGlow
};