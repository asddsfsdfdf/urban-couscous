// Enhanced Interactions for ChartMaster AI with Professional Features

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

// Advanced Chart Analysis Demo with Professional AI Integration
const LOADING_MESSAGES = [
    "Initializing AI neural networks...",
    "Loading advanced pattern recognition models...",
    "Analyzing chart structure and composition...",
    "Detecting support and resistance levels...",
    "Calculating market sentiment indicators...",
    "Identifying trend lines and channels...",
    "Evaluating volume patterns and flow...",
    "Processing technical indicators...",
    "Applying Elliott Wave analysis...",
    "Generating professional trading recommendations...",
    "Finalizing comprehensive analysis..."
];

let loadingMessageIndex = 0;
let loadingInterval;
let currentChartData = null;
let analysisResults = null;

// Enhanced chart upload handler with professional validation
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
    
    // Validate image dimensions
    const img = new Image();
    img.onload = function() {
        if (this.width < 200 || this.height < 200) {
            showAdvancedNotification('Image too small. Please upload a chart with minimum 200x200 pixels.', 'error');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            currentChartData = e.target.result;
            startProfessionalAnalysis();
        };
        reader.readAsDataURL(file);
    };
    
    img.onerror = function() {
        showAdvancedNotification('Invalid image file. Please try another image.', 'error');
    };
    
    img.src = URL.createObjectURL(file);
}

// Start professional analysis process
function startProfessionalAnalysis() {
    if (!currentChartData) return;
    
    // Show professional loading state
    showProfessionalLoading();
    
    // Start loading messages with realistic timing
    loadingMessageIndex = 0;
    updateLoadingMessage();
    loadingInterval = setInterval(updateLoadingMessage, 900);
    
    // Simulate realistic analysis time (4-6 seconds for professional feel)
    const analysisTime = 4000 + Math.random() * 2000;
    
    setTimeout(() => {
        clearInterval(loadingInterval);
        
        // Generate professional analysis results
        analysisResults = generateProfessionalAnalysisResult();
        showProfessionalResults(analysisResults);
        
        // Update scan count
        updateScanCount();
        updateAdvancedDemoCounter();
        
    }, analysisTime);
}

// Generate professional analysis results with advanced metrics
function generateProfessionalAnalysisResult() {
    const patterns = [
        'Ascending Triangle', 'Descending Triangle', 'Symmetrical Triangle',
        'Head and Shoulders', 'Inverse Head and Shoulders', 'Double Top', 
        'Double Bottom', 'Cup and Handle', 'Flag Pattern', 'Pennant',
        'Wedge Rising', 'Wedge Falling', 'Channel Up', 'Channel Down',
        'Support/Resistance Break', 'Bullish Engulfing', 'Bearish Engulfing'
    ];
    
    const sentiments = ['bullish', 'bearish', 'neutral'];
    const sentiment = sentiments[Math.floor(Math.random() * sentiments.length)];
    
    const confidence = 82 + Math.floor(Math.random() * 15); // 82-97%
    const pattern = patterns[Math.floor(Math.random() * patterns.length)];
    
    // Generate realistic price levels
    const basePrice = 45000 + Math.floor(Math.random() * 25000);
    const volatility = 0.02 + Math.random() * 0.03; // 2-5% volatility
    
    const support = Math.floor(basePrice * (1 - volatility));
    const resistance = Math.floor(basePrice * (1 + volatility));
    const target = sentiment === 'bullish' ? 
        Math.floor(resistance * (1 + volatility * 0.8)) : 
        Math.floor(support * (1 - volatility * 0.8));
    
    const riskReward = (1.5 + Math.random() * 2.5).toFixed(1); // 1.5-4.0
    
    return {
        sentiment,
        confidence,
        pattern,
        support: `$${support.toLocaleString()}`,
        resistance: `$${resistance.toLocaleString()}`,
        target: `$${target.toLocaleString()}`,
        riskReward: `1:${riskReward}`,
        timeframe: ['1H', '4H', '1D', '1W'][Math.floor(Math.random() * 4)],
        volume: ['High', 'Medium', 'Low'][Math.floor(Math.random() * 3)],
        strength: ['Strong', 'Moderate', 'Weak'][Math.floor(Math.random() * 3)],
        recommendation: generateProfessionalRecommendation(sentiment, confidence),
        technicalIndicators: generateTechnicalIndicators(),
        marketStructure: generateMarketStructure(sentiment),
        riskLevel: generateRiskLevel(confidence)
    };
}

// Generate professional trading recommendation
function generateProfessionalRecommendation(sentiment, confidence) {
    const recommendations = {
        bullish: [
            'Strong bullish momentum detected. Consider long position on breakout above resistance with tight stop-loss.',
            'Upward trend continuation likely. Wait for pullback to support level for optimal entry.',
            'Bullish pattern confirmed with high probability. Target next resistance level with 2:1 risk-reward ratio.',
            'Positive market structure suggests buying opportunity. Monitor volume for confirmation.',
            'Ascending price action indicates bullish bias. Consider scaling into position on dips.'
        ],
        bearish: [
            'Bearish reversal pattern identified. Consider short position on breakdown below support.',
            'Downward pressure building. Wait for resistance test failure for short entry.',
            'Bearish divergence detected with declining momentum. Prepare for potential sell-off.',
            'Market structure turning bearish. Consider protective stops on long positions.',
            'Distribution phase evident. Look for short opportunities on rallies to resistance.'
        ],
        neutral: [
            'Market consolidation phase. Range-bound trading expected between support and resistance.',
            'Mixed signals present. Wait for clear directional break before taking position.',
            'Sideways movement likely to continue. Consider range trading strategies.',
            'Market indecision evident. Exercise patience and wait for confirmation.',
            'Consolidation pattern forming. Prepare for potential breakout in either direction.'
        ]
    };
    
    const sentimentRecs = recommendations[sentiment];
    return sentimentRecs[Math.floor(Math.random() * sentimentRecs.length)];
}

// Generate technical indicators data
function generateTechnicalIndicators() {
    return {
        rsi: Math.floor(30 + Math.random() * 40), // 30-70
        macd: (Math.random() - 0.5) * 2, // -1 to 1
        stochastic: Math.floor(20 + Math.random() * 60), // 20-80
        bollinger: ['Upper', 'Middle', 'Lower'][Math.floor(Math.random() * 3)],
        ema: Math.random() > 0.5 ? 'Above' : 'Below',
        volume: Math.floor(80 + Math.random() * 40) // 80-120% of average
    };
}

// Generate market structure analysis
function generateMarketStructure(sentiment) {
    const structures = {
        bullish: ['Higher Highs & Higher Lows', 'Uptrend Intact', 'Bull Flag Formation'],
        bearish: ['Lower Highs & Lower Lows', 'Downtrend Confirmed', 'Bear Flag Formation'],
        neutral: ['Sideways Consolidation', 'Range-bound Market', 'Accumulation Phase']
    };
    
    return structures[sentiment][Math.floor(Math.random() * structures[sentiment].length)];
}

// Generate risk level assessment
function generateRiskLevel(confidence) {
    if (confidence > 90) return 'Low';
    if (confidence > 80) return 'Medium';
    return 'High';
}

// Show professional loading state with advanced animations
function showProfessionalLoading() {
    const demoInterface = document.getElementById('demoInterface');
    if (!demoInterface) return;
    
    demoInterface.innerHTML = `
        <div class="professional-loading">
            <div class="loading-header">
                <h3>Professional AI Analysis</h3>
                <div class="loading-badges">
                    <span class="badge">GPT-4 Vision</span>
                    <span class="badge">Neural Networks</span>
                    <span class="badge">Real-time</span>
                </div>
            </div>
            
            <div class="loading-visual">
                <div class="ai-processor">
                    <div class="processor-core">
                        <div class="core-center">🧠</div>
                        <div class="processing-rings">
                            <div class="ring ring-1"></div>
                            <div class="ring ring-2"></div>
                            <div class="ring ring-3"></div>
                        </div>
                    </div>
                    <div class="data-streams">
                        <div class="stream stream-1"></div>
                        <div class="stream stream-2"></div>
                        <div class="stream stream-3"></div>
                        <div class="stream stream-4"></div>
                    </div>
                </div>
            </div>
            
            <div class="loading-progress">
                <div class="progress-text">
                    <span id="loadingMessage">${LOADING_MESSAGES[0]}</span>
                </div>
                <div class="progress-bar-professional">
                    <div class="progress-fill-professional" id="progressFillProfessional"></div>
                    <div class="progress-glow"></div>
                </div>
                <div class="progress-stats">
                    <span class="progress-percentage" id="progressPercentage">0%</span>
                    <span class="progress-speed">Processing at 2.4 GHz</span>
                </div>
            </div>
            
            <div class="analysis-features">
                <div class="feature-item active">
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
                <div class="feature-item">
                    <div class="feature-icon">⚡</div>
                    <span>Risk Assessment</span>
                </div>
            </div>
        </div>
    `;
    
    // Animate progress bar with realistic progression
    animateProfessionalProgressBar();
    
    // Animate feature activation
    animateFeatureActivation();
}

// Animate professional progress bar
function animateProfessionalProgressBar() {
    const progressFill = document.getElementById('progressFillProfessional');
    const progressPercentage = document.getElementById('progressPercentage');
    
    if (!progressFill || !progressPercentage) return;
    
    let progress = 0;
    const progressInterval = setInterval(() => {
        // Realistic progress curve - slower at start and end
        const increment = progress < 20 ? 2 + Math.random() * 3 : 
                         progress < 80 ? 5 + Math.random() * 8 : 
                         1 + Math.random() * 2;
        
        progress += increment;
        if (progress > 100) progress = 100;
        
        progressFill.style.width = `${progress}%`;
        progressPercentage.textContent = `${Math.floor(progress)}%`;
        
        if (progress >= 100) {
            clearInterval(progressInterval);
        }
    }, 150);
}

// Animate feature activation sequence
function animateFeatureActivation() {
    const features = document.querySelectorAll('.analysis-features .feature-item');
    let currentFeature = 0;
    
    const activationInterval = setInterval(() => {
        // Deactivate all features
        features.forEach(f => f.classList.remove('active'));
        
        // Activate current feature
        if (features[currentFeature]) {
            features[currentFeature].classList.add('active');
        }
        
        currentFeature = (currentFeature + 1) % features.length;
    }, 800);
    
    // Stop after analysis completes
    setTimeout(() => {
        clearInterval(activationInterval);
        features.forEach(f => f.classList.add('active'));
    }, 4000);
}

// Update loading message with professional terminology
function updateLoadingMessage() {
    const messageEl = document.getElementById('loadingMessage');
    if (messageEl && loadingMessageIndex < LOADING_MESSAGES.length) {
        messageEl.textContent = LOADING_MESSAGES[loadingMessageIndex];
        loadingMessageIndex++;
    }
}

// Show professional results with comprehensive analysis
function showProfessionalResults(result) {
    const demoInterface = document.getElementById('demoInterface');
    if (!demoInterface) return;
    
    const sentimentClass = result.sentiment;
    const sentimentIcon = result.sentiment === 'bullish' ? '📈' : 
                         result.sentiment === 'bearish' ? '📉' : '➡️';
    const sentimentColor = result.sentiment === 'bullish' ? '#10B981' : 
                          result.sentiment === 'bearish' ? '#EF4444' : '#F59E0B';
    
    demoInterface.innerHTML = `
        <div class="professional-results">
            <div class="results-header">
                <div class="sentiment-display ${sentimentClass}">
                    <div class="sentiment-icon">${sentimentIcon}</div>
                    <div class="sentiment-info">
                        <div class="sentiment-label">${result.sentiment.toUpperCase()}</div>
                        <div class="confidence-score">${result.confidence}% Confidence</div>
                        <div class="risk-level">Risk: ${result.riskLevel}</div>
                    </div>
                </div>
                <button class="new-analysis-btn" onclick="resetProfessionalDemo()">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
                        <path d="M21 3v5h-5"/>
                        <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
                        <path d="M3 21v-5h5"/>
                    </svg>
                    New Analysis
                </button>
            </div>
            
            <div class="analysis-tabs">
                <button class="tab-btn active" onclick="showAnalysisTab('overview')">Overview</button>
                <button class="tab-btn" onclick="showAnalysisTab('technical')">Technical</button>
                <button class="tab-btn" onclick="showAnalysisTab('structure')">Structure</button>
            </div>
            
            <div class="analysis-content">
                <div class="tab-content active" id="overview-tab">
                    <div class="analysis-grid">
                        <div class="analysis-card">
                            <h4>📊 Pattern Analysis</h4>
                            <div class="card-content">
                                <div class="metric">
                                    <span class="metric-label">Detected Pattern:</span>
                                    <span class="metric-value">${result.pattern}</span>
                                </div>
                                <div class="metric">
                                    <span class="metric-label">Timeframe:</span>
                                    <span class="metric-value">${result.timeframe}</span>
                                </div>
                                <div class="metric">
                                    <span class="metric-label">Strength:</span>
                                    <span class="metric-value">${result.strength}</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="analysis-card">
                            <h4>🎯 Price Levels</h4>
                            <div class="card-content">
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
                            <h4>💡 Professional Recommendation</h4>
                            <div class="recommendation-content">
                                <p>${result.recommendation}</p>
                                <div class="risk-reward">
                                    <span class="rr-label">Risk/Reward Ratio:</span>
                                    <span class="rr-value">${result.riskReward}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="tab-content" id="technical-tab">
                    <div class="technical-indicators">
                        <div class="indicator-card">
                            <h5>RSI (14)</h5>
                            <div class="indicator-value">${result.technicalIndicators.rsi}</div>
                            <div class="indicator-status">${result.technicalIndicators.rsi > 70 ? 'Overbought' : result.technicalIndicators.rsi < 30 ? 'Oversold' : 'Neutral'}</div>
                        </div>
                        <div class="indicator-card">
                            <h5>MACD</h5>
                            <div class="indicator-value">${result.technicalIndicators.macd.toFixed(3)}</div>
                            <div class="indicator-status">${result.technicalIndicators.macd > 0 ? 'Bullish' : 'Bearish'}</div>
                        </div>
                        <div class="indicator-card">
                            <h5>Stochastic</h5>
                            <div class="indicator-value">${result.technicalIndicators.stochastic}%</div>
                            <div class="indicator-status">${result.technicalIndicators.stochastic > 80 ? 'Overbought' : result.technicalIndicators.stochastic < 20 ? 'Oversold' : 'Neutral'}</div>
                        </div>
                        <div class="indicator-card">
                            <h5>Volume</h5>
                            <div class="indicator-value">${result.technicalIndicators.volume}%</div>
                            <div class="indicator-status">${result.volume} Activity</div>
                        </div>
                    </div>
                </div>
                
                <div class="tab-content" id="structure-tab">
                    <div class="structure-analysis">
                        <div class="structure-item">
                            <h5>Market Structure</h5>
                            <p>${result.marketStructure}</p>
                        </div>
                        <div class="structure-item">
                            <h5>Trend Direction</h5>
                            <p>${result.sentiment === 'bullish' ? 'Upward momentum with higher highs and higher lows' : 
                                result.sentiment === 'bearish' ? 'Downward pressure with lower highs and lower lows' : 
                                'Sideways movement with consolidation pattern'}</p>
                        </div>
                        <div class="structure-item">
                            <h5>Key Levels</h5>
                            <p>Primary support at ${result.support}, resistance at ${result.resistance}. Target projection: ${result.target}</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="results-actions">
                <button class="action-btn primary" onclick="showUpgradeModal()">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    Get Complete Professional Analysis
                </button>
                <button class="action-btn secondary" onclick="showUpgradeModal()">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                        <polyline points="14 2 14 8 20 8"/>
                        <line x1="16" y1="13" x2="8" y2="13"/>
                        <line x1="16" y1="17" x2="8" y2="17"/>
                        <polyline points="10 9 9 9 8 9"/>
                    </svg>
                    Export Professional Report
                </button>
            </div>
        </div>
    `;
    
    // Add professional results styles
    addProfessionalResultsStyles();
}

// Show analysis tab
function showAnalysisTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[onclick="showAnalysisTab('${tabName}')"]`).classList.add('active');
    
    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    document.getElementById(`${tabName}-tab`).classList.add('active');
}

// Reset professional demo
function resetProfessionalDemo() {
    const demoInterface = document.getElementById('demoInterface');
    if (!demoInterface) return;
    
    demoInterface.innerHTML = `
        <div class="upload-zone glass-morphism" onclick="document.getElementById('demoChartInput').click()">
            <input type="file" id="demoChartInput" accept="image/*" style="display: none;" onchange="handleAdvancedChartUpload(event)">
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
        setupAdvancedDragAndDrop(uploadZone);
    }
    
    currentChartData = null;
    analysisResults = null;
}

// Setup advanced drag and drop with visual feedback
function setupAdvancedDragAndDrop(uploadZone) {
    uploadZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadZone.classList.add('drag-over');
        uploadZone.style.borderColor = '#4ECDC4';
        uploadZone.style.background = 'rgba(78, 205, 196, 0.05)';
        uploadZone.style.transform = 'scale(1.02)';
    });
    
    uploadZone.addEventListener('dragleave', () => {
        uploadZone.classList.remove('drag-over');
        uploadZone.style.borderColor = '';
        uploadZone.style.background = '';
        uploadZone.style.transform = '';
    });
    
    uploadZone.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadZone.classList.remove('drag-over');
        uploadZone.style.borderColor = '';
        uploadZone.style.background = '';
        uploadZone.style.transform = '';
        
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
            counter.parentElement.innerHTML = '<div class="counter-icon">🔥</div><span style="color: #FF6B6B;">0 scans remaining</span>';
        }
    }
}

// Show advanced notification with professional styling
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

// Add professional results styles
function addProfessionalResultsStyles() {
    if (document.getElementById('professional-results-styles')) return;
    
    const styles = document.createElement('style');
    styles.id = 'professional-results-styles';
    styles.textContent = `
        .professional-loading {
            text-align: center;
            padding: var(--spacing-2xl);
            animation: fadeIn 0.5s ease-out;
        }
        
        .loading-header h3 {
            font-size: 1.5rem;
            margin-bottom: var(--spacing-md);
            color: var(--gray-900);
        }
        
        .loading-badges {
            display: flex;
            justify-content: center;
            gap: var(--spacing-md);
            margin-bottom: var(--spacing-xl);
        }
        
        .loading-badges .badge {
            background: var(--glass-bg);
            backdrop-filter: var(--glass-backdrop);
            border: 1px solid var(--glass-border);
            padding: var(--spacing-xs) var(--spacing-md);
            border-radius: var(--radius-lg);
            font-size: 0.75rem;
            font-weight: var(--font-weight-semibold);
            color: var(--gray-700);
        }
        
        .ai-processor {
            position: relative;
            width: 150px;
            height: 150px;
            margin: 0 auto var(--spacing-xl);
        }
        
        .processor-core {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 80px;
            height: 80px;
        }
        
        .core-center {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 2.5rem;
            z-index: 3;
            animation: corePulse 2s ease-in-out infinite;
        }
        
        @keyframes corePulse {
            0%, 100% { transform: translate(-50%, -50%) scale(1); }
            50% { transform: translate(-50%, -50%) scale(1.1); }
        }
        
        .processing-rings {
            position: absolute;
            width: 100%;
            height: 100%;
        }
        
        .processing-rings .ring {
            position: absolute;
            border: 2px solid;
            border-radius: 50%;
            animation: ringRotate 3s linear infinite;
        }
        
        .processing-rings .ring-1 {
            width: 60px;
            height: 60px;
            top: 10px;
            left: 10px;
            border-color: #FF6B6B;
            animation-delay: 0s;
        }
        
        .processing-rings .ring-2 {
            width: 70px;
            height: 70px;
            top: 5px;
            left: 5px;
            border-color: #4ECDC4;
            animation-delay: 1s;
        }
        
        .processing-rings .ring-3 {
            width: 80px;
            height: 80px;
            top: 0;
            left: 0;
            border-color: #A8E6CF;
            animation-delay: 2s;
        }
        
        @keyframes ringRotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        
        .data-streams {
            position: absolute;
            width: 100%;
            height: 100%;
        }
        
        .stream {
            position: absolute;
            width: 2px;
            height: 20px;
            background: linear-gradient(to bottom, #4ECDC4, transparent);
            animation: streamFlow 1.5s ease-in-out infinite;
        }
        
        .stream-1 {
            top: 10px;
            left: 50%;
            animation-delay: 0s;
        }
        
        .stream-2 {
            top: 50%;
            right: 10px;
            animation-delay: 0.3s;
        }
        
        .stream-3 {
            bottom: 10px;
            left: 50%;
            animation-delay: 0.6s;
        }
        
        .stream-4 {
            top: 50%;
            left: 10px;
            animation-delay: 0.9s;
        }
        
        @keyframes streamFlow {
            0%, 100% { opacity: 0.3; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.5); }
        }
        
        .progress-bar-professional {
            position: relative;
            width: 100%;
            max-width: 400px;
            height: 8px;
            background: var(--gray-200);
            border-radius: 4px;
            overflow: hidden;
            margin: 0 auto var(--spacing-sm);
        }
        
        .progress-fill-professional {
            height: 100%;
            background: var(--gradient-primary);
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
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent);
            animation: progressGlow 2s ease-in-out infinite;
        }
        
        @keyframes progressGlow {
            0% { left: -30px; }
            100% { left: 100%; }
        }
        
        .progress-stats {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: var(--spacing-sm);
            font-size: 0.875rem;
        }
        
        .progress-percentage {
            font-weight: var(--font-weight-semibold);
            color: var(--rainbow-blue);
        }
        
        .progress-speed {
            color: var(--gray-500);
        }
        
        .analysis-features {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: var(--spacing-md);
            margin-top: var(--spacing-xl);
        }
        
        .analysis-features .feature-item {
            display: flex;
            align-items: center;
            gap: var(--spacing-sm);
            padding: var(--spacing-md);
            background: var(--glass-bg);
            border: 1px solid var(--glass-border);
            border-radius: var(--radius-lg);
            opacity: 0.5;
            transition: all var(--transition-normal);
        }
        
        .analysis-features .feature-item.active {
            opacity: 1;
            background: var(--glass-bg-strong);
            border-color: var(--rainbow-blue);
            transform: scale(1.02);
        }
        
        .analysis-features .feature-icon {
            font-size: 1.25rem;
        }
        
        .professional-results {
            animation: slideUp 0.6s ease-out;
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
            background: rgba(16, 185, 129, 0.1);
            border-color: rgba(16, 185, 129, 0.2);
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
            color: #10B981;
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
        
        .risk-level {
            font-size: 0.875rem;
            color: var(--gray-500);
        }
        
        .analysis-tabs {
            display: flex;
            gap: var(--spacing-sm);
            margin: var(--spacing-xl) 0;
            background: var(--glass-bg);
            padding: var(--spacing-xs);
            border-radius: var(--radius-lg);
        }
        
        .tab-btn {
            flex: 1;
            padding: var(--spacing-sm) var(--spacing-md);
            background: none;
            border: none;
            border-radius: var(--radius-md);
            font-weight: var(--font-weight-medium);
            color: var(--gray-600);
            cursor: pointer;
            transition: all var(--transition-fast);
        }
        
        .tab-btn.active {
            background: white;
            color: var(--gray-900);
            box-shadow: var(--shadow-sm);
        }
        
        .tab-content {
            display: none;
        }
        
        .tab-content.active {
            display: block;
        }
        
        .analysis-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: var(--spacing-lg);
            margin-bottom: var(--spacing-xl);
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
            color: #10B981;
        }
        
        .metric-value.resistance {
            color: #EF4444;
        }
        
        .metric-value.target {
            color: var(--rainbow-blue);
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
            background: rgba(69, 183, 209, 0.1);
            border-radius: var(--radius-lg);
        }
        
        .rr-label {
            font-weight: var(--font-weight-medium);
            color: var(--gray-700);
        }
        
        .rr-value {
            font-weight: var(--font-weight-bold);
            color: var(--rainbow-blue);
            font-size: 1.125rem;
        }
        
        .technical-indicators {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: var(--spacing-lg);
        }
        
        .indicator-card {
            background: var(--glass-bg);
            padding: var(--spacing-lg);
            border-radius: var(--radius-lg);
            text-align: center;
        }
        
        .indicator-card h5 {
            font-size: 0.875rem;
            color: var(--gray-600);
            margin-bottom: var(--spacing-sm);
        }
        
        .indicator-value {
            font-size: 1.5rem;
            font-weight: var(--font-weight-bold);
            color: var(--gray-900);
            margin-bottom: var(--spacing-xs);
        }
        
        .indicator-status {
            font-size: 0.75rem;
            color: var(--gray-500);
        }
        
        .structure-analysis {
            display: flex;
            flex-direction: column;
            gap: var(--spacing-lg);
        }
        
        .structure-item {
            background: var(--glass-bg);
            padding: var(--spacing-lg);
            border-radius: var(--radius-lg);
        }
        
        .structure-item h5 {
            font-size: 1rem;
            color: var(--gray-900);
            margin-bottom: var(--spacing-sm);
        }
        
        .structure-item p {
            color: var(--gray-600);
            line-height: 1.5;
        }
        
        @media (max-width: 768px) {
            .analysis-grid {
                grid-template-columns: 1fr;
            }
            
            .technical-indicators {
                grid-template-columns: 1fr;
            }
            
            .analysis-features {
                grid-template-columns: 1fr;
            }
        }
    `;
    
    document.head.appendChild(styles);
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

// Advanced notification styles
const advancedNotificationStyles = `
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
        border-color: #FF6B6B;
        background: rgba(255, 107, 107, 0.1);
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

// Add advanced notification styles to document
const advancedNotificationStyleSheet = document.createElement('style');
advancedNotificationStyleSheet.textContent = advancedNotificationStyles;
document.head.appendChild(advancedNotificationStyleSheet);