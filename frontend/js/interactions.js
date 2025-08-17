// Enhanced Interactions for ChartMaster AI

// Demo scan tracking with device fingerprinting
const DEMO_STORAGE_KEY = 'chartmaster_demo_scans';
const MAX_FREE_SCANS = 2;

// Check if running on localhost
function isLocalhost() {
    return window.location.hostname === 'localhost' || 
           window.location.hostname === '127.0.0.1' ||
           window.location.hostname === '';
}

// Get device fingerprint for demo tracking
function getDeviceFingerprint() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx.textBaseline = 'top';
    ctx.font = '14px Arial';
    ctx.fillText('chartmaster-fingerprint', 2, 2);
    const canvasData = canvas.toDataURL();
    
    const fingerprint = {
        userAgent: navigator.userAgent,
        language: navigator.language,
        screenResolution: `${screen.width}x${screen.height}`,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        canvas: canvasData,
        platform: navigator.platform
    };
    
    // Create a simple hash from the fingerprint
    const fp = JSON.stringify(fingerprint);
    let hash = 0;
    for (let i = 0; i < fp.length; i++) {
        const char = fp.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return Math.abs(hash).toString(36);
}

// Get or create demo scan data
function getDemoScanData() {
    const stored = localStorage.getItem(DEMO_STORAGE_KEY);
    if (stored) {
        return JSON.parse(stored);
    }
    
    const newData = {
        deviceId: getDeviceFingerprint(),
        scansUsed: 0,
        firstScan: null,
        lastScan: null,
        ipAddress: null
    };
    
    localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(newData));
    return newData;
}

// Update scan count
function updateScanCount() {
    if (isLocalhost()) {
        return getDemoScanData();
    }
    
    const data = getDemoScanData();
    data.scansUsed += 1;
    data.lastScan = new Date().toISOString();
    if (!data.firstScan) {
        data.firstScan = data.lastScan;
    }
    localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(data));
    return data;
}

// Check if user can scan
function canUserScan() {
    if (isLocalhost()) {
        return true;
    }
    
    const data = getDemoScanData();
    return data.scansUsed < MAX_FREE_SCANS;
}

// Get remaining scans
function getRemainingScans() {
    if (isLocalhost()) {
        return MAX_FREE_SCANS;
    }
    
    const data = getDemoScanData();
    return Math.max(0, MAX_FREE_SCANS - data.scansUsed);
}

// Advanced Chart Analysis Demo
const LOADING_MESSAGES = [
    "Initializing AI models...",
    "Analyzing chart patterns...",
    "Detecting support and resistance levels...",
    "Calculating market sentiment...",
    "Identifying trend lines...",
    "Evaluating volume patterns...",
    "Processing technical indicators...",
    "Generating trading recommendations...",
    "Finalizing analysis..."
];

let loadingMessageIndex = 0;
let loadingInterval;
let currentChartData = null;

// Enhanced chart upload handler
function handleAdvancedChartUpload(event) {
    const file = event.target.files[0];
    if (!file || !file.type.startsWith('image/')) {
        showAdvancedNotification('Please upload a valid image file (PNG, JPG, GIF)', 'error');
        return;
    }
    
    if (!canUserScan()) {
        showUpgradeModal();
        return;
    }
    
    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
        showAdvancedNotification('File size too large. Please upload an image under 10MB.', 'error');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        currentChartData = e.target.result;
        startAdvancedAnalysis();
    };
    reader.readAsDataURL(file);
}

// Start advanced analysis process
function startAdvancedAnalysis() {
    if (!currentChartData) return;
    
    // Show loading state
    showAdvancedLoading();
    
    // Start loading messages
    loadingMessageIndex = 0;
    updateLoadingMessage();
    loadingInterval = setInterval(updateLoadingMessage, 800);
    
    // Simulate realistic analysis time (3-5 seconds)
    const analysisTime = 3000 + Math.random() * 2000;
    
    setTimeout(() => {
        clearInterval(loadingInterval);
        
        // Generate realistic analysis results
        const analysisResult = generateAnalysisResult();
        showAdvancedResults(analysisResult);
        
        // Update scan count
        updateScanCount();
        updateAdvancedDemoCounter();
        
    }, analysisTime);
}

// Generate realistic analysis results
function generateAnalysisResult() {
    const patterns = [
        'Ascending Triangle', 'Descending Triangle', 'Head and Shoulders',
        'Double Top', 'Double Bottom', 'Cup and Handle', 'Flag Pattern',
        'Pennant', 'Wedge', 'Channel', 'Support/Resistance Break'
    ];
    
    const sentiments = ['bullish', 'bearish', 'neutral'];
    const sentiment = sentiments[Math.floor(Math.random() * sentiments.length)];
    
    const confidence = 75 + Math.floor(Math.random() * 20); // 75-95%
    
    const pattern = patterns[Math.floor(Math.random() * patterns.length)];
    
    // Generate price levels based on sentiment
    const basePrice = 45000 + Math.floor(Math.random() * 20000);
    const support = basePrice - Math.floor(Math.random() * 2000);
    const resistance = basePrice + Math.floor(Math.random() * 3000);
    
    return {
        sentiment,
        confidence,
        pattern,
        support: `$${support.toLocaleString()}`,
        resistance: `$${resistance.toLocaleString()}`,
        target: sentiment === 'bullish' ? `$${resistance + 1000}` : `$${support - 1000}`,
        riskReward: `1:${(2 + Math.random() * 2).toFixed(1)}`,
        timeframe: ['1H', '4H', '1D', '1W'][Math.floor(Math.random() * 4)],
        volume: ['High', 'Medium', 'Low'][Math.floor(Math.random() * 3)],
        recommendation: generateRecommendation(sentiment, confidence)
    };
}

// Generate trading recommendation
function generateRecommendation(sentiment, confidence) {
    const recommendations = {
        bullish: [
            'Consider long position on breakout above resistance',
            'Strong upward momentum detected - potential buy opportunity',
            'Bullish pattern confirmed - wait for pullback entry'
        ],
        bearish: [
            'Consider short position on breakdown below support',
            'Bearish divergence detected - potential sell opportunity',
            'Downward pressure building - wait for confirmation'
        ],
        neutral: [
            'Market consolidation - wait for clear direction',
            'Range-bound trading - consider support/resistance levels',
            'Mixed signals - exercise caution and wait for confirmation'
        ]
    };
    
    const sentimentRecs = recommendations[sentiment];
    return sentimentRecs[Math.floor(Math.random() * sentimentRecs.length)];
}

// Show advanced loading state
function showAdvancedLoading() {
    const demoInterface = document.getElementById('demoInterface');
    if (!demoInterface) return;
    
    demoInterface.innerHTML = `
        <div class="advanced-loading">
            <div class="loading-header">
                <h3>AI Analysis in Progress</h3>
                <div class="loading-stats">
                    <span class="stat">🧠 GPT-4 Vision</span>
                    <span class="stat">⚡ Real-time</span>
                </div>
            </div>
            
            <div class="loading-visual">
                <div class="ai-brain-container">
                    <div class="brain-waves">
                        <div class="wave wave-1"></div>
                        <div class="wave wave-2"></div>
                        <div class="wave wave-3"></div>
                    </div>
                    <div class="brain-icon">🧠</div>
                </div>
            </div>
            
            <div class="loading-progress">
                <div class="progress-text">
                    <span id="loadingMessage">${LOADING_MESSAGES[0]}</span>
                </div>
                <div class="progress-bar-advanced">
                    <div class="progress-fill-advanced" id="progressFillAdvanced"></div>
                </div>
                <div class="progress-percentage" id="progressPercentage">0%</div>
            </div>
            
            <div class="loading-features">
                <div class="feature-item">
                    <div class="feature-icon">📊</div>
                    <span>Pattern Recognition</span>
                </div>
                <div class="feature-item">
                    <div class="feature-icon">📈</div>
                    <span>Trend Analysis</span>
                </div>
                <div class="feature-item">
                    <div class="feature-icon">🎯</div>
                    <span>Price Targets</span>
                </div>
            </div>
        </div>
    `;
    
    // Animate progress bar
    animateProgressBar();
}

// Animate progress bar
function animateProgressBar() {
    const progressFill = document.getElementById('progressFillAdvanced');
    const progressPercentage = document.getElementById('progressPercentage');
    
    if (!progressFill || !progressPercentage) return;
    
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) progress = 100;
        
        progressFill.style.width = `${progress}%`;
        progressPercentage.textContent = `${Math.floor(progress)}%`;
        
        if (progress >= 100) {
            clearInterval(progressInterval);
        }
    }, 200);
}

// Update loading message
function updateLoadingMessage() {
    const messageEl = document.getElementById('loadingMessage');
    if (messageEl && loadingMessageIndex < LOADING_MESSAGES.length) {
        messageEl.textContent = LOADING_MESSAGES[loadingMessageIndex];
        loadingMessageIndex++;
    }
}

// Show advanced results
function showAdvancedResults(result) {
    const demoInterface = document.getElementById('demoInterface');
    if (!demoInterface) return;
    
    const sentimentClass = result.sentiment;
    const sentimentIcon = result.sentiment === 'bullish' ? '📈' : 
                         result.sentiment === 'bearish' ? '📉' : '➡️';
    const sentimentColor = result.sentiment === 'bullish' ? 'var(--primary-blue)' : 
                          result.sentiment === 'bearish' ? '#EF4444' : '#F59E0B';
    
    demoInterface.innerHTML = `
        <div class="advanced-results">
            <div class="results-header">
                <div class="sentiment-display ${sentimentClass}">
                    <div class="sentiment-icon">${sentimentIcon}</div>
                    <div class="sentiment-info">
                        <div class="sentiment-label">${result.sentiment.toUpperCase()}</div>
                        <div class="confidence-score">${result.confidence}% Confidence</div>
                    </div>
                </div>
                <button class="new-analysis-btn" onclick="resetAdvancedDemo()">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
                        <path d="M21 3v5h-5"/>
                        <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
                        <path d="M3 21v-5h5"/>
                    </svg>
                    New Analysis
                </button>
            </div>
            
            <div class="analysis-grid">
                <div class="analysis-card">
                    <h4>📊 Pattern Analysis</h4>
                    <div class="analysis-content">
                        <div class="metric">
                            <span class="metric-label">Detected Pattern:</span>
                            <span class="metric-value">${result.pattern}</span>
                        </div>
                        <div class="metric">
                            <span class="metric-label">Timeframe:</span>
                            <span class="metric-value">${result.timeframe}</span>
                        </div>
                        <div class="metric">
                            <span class="metric-label">Volume:</span>
                            <span class="metric-value">${result.volume}</span>
                        </div>
                    </div>
                </div>
                
                <div class="analysis-card">
                    <h4>🎯 Price Levels</h4>
                    <div class="analysis-content">
                        <div class="metric">
                            <span class="metric-label">Support:</span>
                            <span class="metric-value support">${result.support}</span>
                        </div>
                        <div class="metric">
                            <span class="metric-label">Resistance:</span>
                            <span class="metric-value resistance">${result.resistance}</span>
                        </div>
                        <div class="metric">
                            <span class="metric-label">Target:</span>
                            <span class="metric-value target">${result.target}</span>
                        </div>
                    </div>
                </div>
                
                <div class="analysis-card full-width">
                    <h4>💡 Trading Recommendation</h4>
                    <div class="recommendation-content">
                        <p>${result.recommendation}</p>
                        <div class="risk-reward">
                            <span class="rr-label">Risk/Reward Ratio:</span>
                            <span class="rr-value">${result.riskReward}</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="results-actions">
                <button class="action-btn primary" onclick="showUpgradeModal()">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    Get Full Professional Analysis
                </button>
                <button class="action-btn secondary" onclick="showUpgradeModal()">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                        <polyline points="14 2 14 8 20 8"/>
                        <line x1="16" y1="13" x2="8" y2="13"/>
                        <line x1="16" y1="17" x2="8" y2="17"/>
                        <polyline points="10 9 9 9 8 9"/>
                    </svg>
                    Export PDF Report
                </button>
            </div>
        </div>
    `;
}

// Reset advanced demo
function resetAdvancedDemo() {
    const demoInterface = document.getElementById('demoInterface');
    if (!demoInterface) return;
    
    demoInterface.innerHTML = `
        <div class="upload-zone" onclick="document.getElementById('demoChartInput').click()">
            <input type="file" id="demoChartInput" accept="image/*" style="display: none;" onchange="handleAdvancedChartUpload(event)">
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
        setupAdvancedDragAndDrop(uploadZone);
    }
    
    currentChartData = null;
}

// Setup advanced drag and drop
function setupAdvancedDragAndDrop(uploadZone) {
    uploadZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadZone.classList.add('drag-over');
    });
    
    uploadZone.addEventListener('dragleave', () => {
        uploadZone.classList.remove('drag-over');
    });
    
    uploadZone.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadZone.classList.remove('drag-over');
        
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            handleAdvancedChartUpload({ target: { files: [file] } });
        }
    });
}

// Update advanced demo counter
function updateAdvancedDemoCounter() {
    const counter = document.getElementById('demoScansRemaining');
    if (counter) {
        const remaining = getRemainingScans();
        counter.textContent = remaining;
        
        if (remaining === 0) {
            counter.parentElement.innerHTML = '<span style="color: #EF4444;">0 scans remaining</span>';
        }
    }
}

// Show advanced notification
function showAdvancedNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `advanced-notification ${type}`;
    
    const icon = type === 'error' ? '⚠️' : type === 'success' ? '✅' : 'ℹ️';
    
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${icon}</span>
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Initialize advanced interactions
document.addEventListener('DOMContentLoaded', function() {
    // Update demo counter on page load
    updateAdvancedDemoCounter();
    
    // Setup initial drag and drop if demo interface exists
    const demoInterface = document.getElementById('demoInterface');
    if (demoInterface) {
        const uploadZone = demoInterface.querySelector('.upload-zone');
        if (uploadZone) {
            setupAdvancedDragAndDrop(uploadZone);
        }
    }
    
    // Show localhost indicator in console
    if (isLocalhost()) {
        console.log('🔧 ChartMaster AI - Development Mode: Unlimited demo scans enabled');
    }
    
    // Fetch IP address for additional tracking (optional)
    if (!isLocalhost()) {
        fetch('https://api.ipify.org?format=json')
            .then(response => response.json())
            .then(data => {
                const scanData = getDemoScanData();
                scanData.ipAddress = data.ip;
                localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(scanData));
            })
            .catch(() => {
                // Ignore IP fetch errors
            });
    }
});

// Add advanced styles
const advancedStyles = `
    .advanced-loading {
        text-align: center;
        padding: var(--spacing-2xl);
        animation: fadeIn 0.5s ease-out;
    }
    
    .loading-header {
        margin-bottom: var(--spacing-xl);
    }
    
    .loading-header h3 {
        font-size: 1.5rem;
        margin-bottom: var(--spacing-md);
        color: var(--gray-900);
    }
    
    .loading-stats {
        display: flex;
        justify-content: center;
        gap: var(--spacing-lg);
    }
    
    .loading-stats .stat {
        background: var(--glass-bg);
        backdrop-filter: var(--glass-backdrop);
        border: 1px solid var(--glass-border);
        padding: var(--spacing-sm) var(--spacing-md);
        border-radius: var(--radius-lg);
        font-size: 0.875rem;
        font-weight: var(--font-weight-medium);
    }
    
    .ai-brain-container {
        position: relative;
        width: 120px;
        height: 120px;
        margin: 0 auto var(--spacing-xl);
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
        border: 2px solid var(--primary-blue);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        animation: brainWave 2s infinite;
        opacity: 0.7;
    }
    
    .wave-2 {
        animation-delay: 0.5s;
        border-color: var(--primary-purple);
    }
    
    .wave-3 {
        animation-delay: 1s;
        border-color: var(--primary-pink);
    }
    
    @keyframes brainWave {
        0% {
            transform: translate(-50%, -50%) scale(0.8);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) scale(1.5);
            opacity: 0;
        }
    }
    
    .brain-icon {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 3rem;
        z-index: 2;
        animation: pulse 2s ease-in-out infinite;
    }
    
    .loading-progress {
        margin-bottom: var(--spacing-xl);
    }
    
    .progress-text {
        margin-bottom: var(--spacing-md);
        font-weight: var(--font-weight-medium);
        color: var(--gray-700);
    }
    
    .progress-bar-advanced {
        width: 100%;
        max-width: 400px;
        height: 8px;
        background: var(--gray-200);
        border-radius: 4px;
        overflow: hidden;
        margin: 0 auto var(--spacing-sm);
    }
    
    .progress-fill-advanced {
        height: 100%;
        background: var(--primary-gradient);
        border-radius: 4px;
        width: 0%;
        transition: width 0.3s ease;
    }
    
    .progress-percentage {
        font-weight: var(--font-weight-semibold);
        color: var(--primary-blue);
    }
    
    .loading-features {
        display: flex;
        justify-content: center;
        gap: var(--spacing-xl);
        flex-wrap: wrap;
    }
    
    .loading-features .feature-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--spacing-sm);
        opacity: 0.6;
        animation: featurePulse 3s ease-in-out infinite;
    }
    
    .loading-features .feature-item:nth-child(2) {
        animation-delay: 1s;
    }
    
    .loading-features .feature-item:nth-child(3) {
        animation-delay: 2s;
    }
    
    @keyframes featurePulse {
        0%, 100% { opacity: 0.6; }
        50% { opacity: 1; }
    }
    
    .loading-features .feature-icon {
        font-size: 1.5rem;
    }
    
    .advanced-results {
        animation: slideUp 0.5s ease-out;
    }
    
    .sentiment-display {
        display: flex;
        align-items: center;
        gap: var(--spacing-lg);
        padding: var(--spacing-lg);
        border-radius: var(--radius-xl);
        background: var(--glass-bg);
        backdrop-filter: var(--glass-backdrop);
        border: 1px solid var(--glass-border);
    }
    
    .sentiment-display.bullish {
        background: rgba(59, 130, 246, 0.1);
        border-color: rgba(59, 130, 246, 0.2);
    }
    
    .sentiment-display.bearish {
        background: rgba(239, 68, 68, 0.1);
        border-color: rgba(239, 68, 68, 0.2);
    }
    
    .sentiment-display.neutral {
        background: rgba(245, 158, 11, 0.1);
        border-color: rgba(245, 158, 11, 0.2);
    }
    
    .sentiment-icon {
        font-size: 2.5rem;
    }
    
    .sentiment-label {
        font-size: 1.25rem;
        font-weight: var(--font-weight-bold);
        margin-bottom: var(--spacing-xs);
    }
    
    .sentiment-display.bullish .sentiment-label {
        color: var(--primary-blue);
    }
    
    .sentiment-display.bearish .sentiment-label {
        color: #EF4444;
    }
    
    .sentiment-display.neutral .sentiment-label {
        color: #F59E0B;
    }
    
    .confidence-score {
        font-size: 1rem;
        color: var(--gray-600);
        font-weight: var(--font-weight-medium);
    }
    
    .analysis-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--spacing-lg);
        margin: var(--spacing-xl) 0;
    }
    
    .analysis-card {
        background: var(--glass-bg);
        backdrop-filter: var(--glass-backdrop);
        border: 1px solid var(--glass-border);
        border-radius: var(--radius-xl);
        padding: var(--spacing-lg);
    }
    
    .analysis-card.full-width {
        grid-column: 1 / -1;
    }
    
    .analysis-card h4 {
        font-size: 1.125rem;
        margin-bottom: var(--spacing-md);
        color: var(--gray-900);
    }
    
    .metric {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: var(--spacing-md);
        padding-bottom: var(--spacing-sm);
        border-bottom: 1px solid var(--gray-200);
    }
    
    .metric:last-child {
        margin-bottom: 0;
        border-bottom: none;
    }
    
    .metric-label {
        font-weight: var(--font-weight-medium);
        color: var(--gray-600);
    }
    
    .metric-value {
        font-weight: var(--font-weight-semibold);
        color: var(--gray-900);
    }
    
    .metric-value.support {
        color: var(--primary-blue);
    }
    
    .metric-value.resistance {
        color: #EF4444;
    }
    
    .metric-value.target {
        color: var(--primary-pink);
    }
    
    .recommendation-content p {
        margin-bottom: var(--spacing-md);
        line-height: 1.6;
    }
    
    .risk-reward {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--spacing-md);
        background: rgba(59, 130, 246, 0.1);
        border-radius: var(--radius-lg);
    }
    
    .rr-label {
        font-weight: var(--font-weight-medium);
        color: var(--gray-700);
    }
    
    .rr-value {
        font-weight: var(--font-weight-bold);
        color: var(--primary-blue);
        font-size: 1.125rem;
    }
    
    .results-actions {
        display: flex;
        gap: var(--spacing-md);
        margin-top: var(--spacing-xl);
    }
    
    .action-btn {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: var(--spacing-sm);
        padding: var(--spacing-lg);
        border-radius: var(--radius-xl);
        font-weight: var(--font-weight-semibold);
        cursor: pointer;
        transition: all var(--transition-normal);
        border: none;
        text-decoration: none;
    }
    
    .action-btn.primary {
        background: var(--primary-gradient);
        color: white;
        box-shadow: var(--shadow-md);
    }
    
    .action-btn.primary:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow-xl);
        background: var(--primary-gradient-hover);
    }
    
    .action-btn.secondary {
        background: var(--glass-bg);
        backdrop-filter: var(--glass-backdrop);
        border: 1px solid var(--glass-border);
        color: var(--gray-700);
    }
    
    .action-btn.secondary:hover {
        background: var(--glass-bg-strong);
        transform: translateY(-1px);
    }
    
    .upload-zone.drag-over {
        border-color: var(--primary-blue);
        background: rgba(59, 130, 246, 0.05);
        transform: scale(1.02);
    }
    
    .advanced-notification {
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 10000;
        transform: translateX(100%);
        opacity: 0;
        transition: all 0.3s ease;
    }
    
    .advanced-notification.show {
        transform: translateX(0);
        opacity: 1;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: var(--spacing-md);
        background: var(--glass-bg);
        backdrop-filter: var(--glass-backdrop);
        border: 1px solid var(--glass-border);
        padding: var(--spacing-lg);
        border-radius: var(--radius-xl);
        box-shadow: var(--shadow-xl);
        max-width: 400px;
    }
    
    .advanced-notification.error .notification-content {
        border-color: #EF4444;
        background: rgba(239, 68, 68, 0.1);
    }
    
    .notification-icon {
        font-size: 1.25rem;
        flex-shrink: 0;
    }
    
    .notification-message {
        flex: 1;
        font-weight: var(--font-weight-medium);
    }
    
    .notification-close {
        background: none;
        border: none;
        font-size: 1.25rem;
        cursor: pointer;
        color: var(--gray-500);
        padding: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: background 0.2s ease;
    }
    
    .notification-close:hover {
        background: var(--gray-100);
    }
    
    @media (max-width: 768px) {
        .analysis-grid {
            grid-template-columns: 1fr;
        }
        
        .results-actions {
            flex-direction: column;
        }
        
        .loading-features {
            gap: var(--spacing-lg);
        }
        
        .advanced-notification {
            right: 10px;
            left: 10px;
            transform: translateY(-100%);
        }
        
        .advanced-notification.show {
            transform: translateY(0);
        }
    }
`;

// Add advanced styles to document
const advancedStyleSheet = document.createElement('style');
advancedStyleSheet.textContent = advancedStyles;
document.head.appendChild(advancedStyleSheet);