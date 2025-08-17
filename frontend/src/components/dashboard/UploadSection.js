function loadUploadSection() {
    const contentArea = document.getElementById('contentArea');
    
    contentArea.innerHTML = `
        <div class="upload-section fade-in">
            <!-- Upload Area -->
            <div class="upload-container" id="uploadContainer">
                <div class="upload-area" id="uploadArea" onclick="document.getElementById('chartFileInput').click()">
                    <input type="file" id="chartFileInput" accept="image/*" style="display: none;" onchange="handleChartFileUpload(event)">
                    
                    <div class="upload-content">
                        <div class="upload-icon">
                            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                                <polyline points="17 8 12 3 7 8"/>
                                <line x1="12" y1="3" x2="12" y2="15"/>
                            </svg>
                        </div>
                        <h3 class="upload-title">Drop your chart here</h3>
                        <p class="upload-subtitle">or click to browse files</p>
                        <div style="margin-top: 16px; font-size: 14px; color: var(--text-tertiary);">
                            Supports: PNG, JPG, GIF up to 10MB
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Chart Preview (hidden initially) -->
            <div class="chart-preview-section" id="chartPreviewSection" style="display: none;">
                <div class="glass-card" style="padding: 24px;">
                    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
                        <h3 style="font-size: 18px; font-weight: 600; color: var(--text-primary);">Chart Preview</h3>
                        <button class="btn btn-secondary" onclick="resetUpload()">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
                            </svg>
                            Remove
                        </button>
                    </div>
                    <div class="chart-preview-container">
                        <img id="chartPreview" style="max-width: 100%; max-height: 400px; border-radius: 12px; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);">
                    </div>
                </div>
            </div>
            
            <!-- Analysis Settings -->
            <div class="analysis-settings" id="analysisSettings" style="display: none;">
                <div class="glass-card" style="padding: 32px;">
                    <h3 style="font-size: 20px; font-weight: 600; color: var(--text-primary); margin-bottom: 24px;">Analysis Settings</h3>
                    
                    <div class="grid-2" style="gap: 24px;">
                        <div class="form-group">
                            <label class="form-label">Symbol/Pair</label>
                            <input type="text" class="form-input" id="symbolInput" placeholder="e.g., EUR/USD, BTC/USD, AAPL">
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Timeframe</label>
                            <select class="form-select" id="timeframeSelect">
                                <option value="">Select timeframe</option>
                                <option value="1m">1 Minute</option>
                                <option value="5m">5 Minutes</option>
                                <option value="15m">15 Minutes</option>
                                <option value="30m">30 Minutes</option>
                                <option value="1h">1 Hour</option>
                                <option value="4h">4 Hours</option>
                                <option value="1d">Daily</option>
                                <option value="1w">Weekly</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Analysis Type</label>
                        <div class="analysis-types-grid">
                            <div class="analysis-type-card active" data-type="comprehensive" onclick="selectAnalysisType(this, 'comprehensive')">
                                <div class="type-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M3 3v18h18"/>
                                        <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/>
                                    </svg>
                                </div>
                                <div class="type-content">
                                    <div class="type-title">Comprehensive</div>
                                    <div class="type-description">Full technical analysis with patterns, indicators, and recommendations</div>
                                </div>
                            </div>
                            
                            <div class="analysis-type-card" data-type="quick" onclick="selectAnalysisType(this, 'quick')">
                                <div class="type-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                                    </svg>
                                </div>
                                <div class="type-content">
                                    <div class="type-title">Quick Analysis</div>
                                    <div class="type-description">Fast sentiment analysis with key levels and signals</div>
                                </div>
                            </div>
                            
                            <div class="analysis-type-card" data-type="pattern" onclick="selectAnalysisType(this, 'pattern')">
                                <div class="type-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
                                    </svg>
                                </div>
                                <div class="type-content">
                                    <div class="type-title">Pattern Focus</div>
                                    <div class="type-description">Specialized pattern recognition and formation analysis</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Additional Notes (Optional)</label>
                        <textarea class="form-textarea" id="notesInput" placeholder="Any specific questions or areas you'd like the AI to focus on..."></textarea>
                    </div>
                    
                    <div style="display: flex; gap: 16px; margin-top: 32px;">
                        <button class="btn btn-primary" id="analyzeBtn" onclick="startAnalysis()" style="flex: 1;">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M9 12l2 2 4-4"/>
                                <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c2.35 0 4.48.9 6.08 2.38"/>
                            </svg>
                            Analyze Chart
                        </button>
                        <button class="btn btn-secondary" onclick="resetUpload()">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
            
            <!-- Analysis Progress -->
            <div class="analysis-progress" id="analysisProgress" style="display: none;">
                <div class="glass-card" style="padding: 48px; text-align: center;">
                    <div class="progress-animation">
                        <div class="loading-spinner" style="width: 64px; height: 64px; margin: 0 auto 24px;"></div>
                    </div>
                    <h3 style="font-size: 24px; font-weight: 600; color: var(--text-primary); margin-bottom: 12px;">Analyzing Your Chart</h3>
                    <p style="font-size: 16px; color: var(--text-secondary); margin-bottom: 32px;" id="progressMessage">Initializing AI analysis...</p>
                    
                    <div class="progress-steps">
                        <div class="progress-step active" id="step1">
                            <div class="step-icon">📊</div>
                            <div class="step-text">Processing Image</div>
                        </div>
                        <div class="progress-step" id="step2">
                            <div class="step-icon">🔍</div>
                            <div class="step-text">Detecting Patterns</div>
                        </div>
                        <div class="progress-step" id="step3">
                            <div class="step-icon">🧠</div>
                            <div class="step-text">AI Analysis</div>
                        </div>
                        <div class="progress-step" id="step4">
                            <div class="step-icon">📝</div>
                            <div class="step-text">Generating Report</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Analysis Results -->
            <div class="analysis-results" id="analysisResults" style="display: none;">
                <div class="glass-card" style="padding: 32px;">
                    <div style="display: flex; align-items: center; justify-content: between; margin-bottom: 32px;">
                        <h3 style="font-size: 24px; font-weight: 600; color: var(--text-primary);">Analysis Complete</h3>
                        <div style="margin-left: auto; display: flex; gap: 12px;">
                            <button class="btn btn-secondary">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                                    <polyline points="7 10 12 15 17 10"/>
                                    <line x1="12" y1="15" x2="12" y2="3"/>
                                </svg>
                                Export
                            </button>
                            <button class="btn btn-secondary">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                                    <path d="M13.73 21a2 2 0 01-3.46 0"/>
                                </svg>
                                Save
                            </button>
                            <button class="btn btn-primary" onclick="resetUpload()">
                                New Analysis
                            </button>
                        </div>
                    </div>
                    
                    <div id="resultsContent">
                        <!-- Results will be populated here -->
                    </div>
                </div>
            </div>
        </div>
        
        <style>
            .upload-container {
                margin-bottom: 32px;
            }
            
            .upload-content {
                position: relative;
                z-index: 2;
            }
            
            .analysis-types-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                gap: 16px;
                margin-top: 12px;
            }
            
            .analysis-type-card {
                display: flex;
                align-items: center;
                gap: 16px;
                padding: 20px;
                background: rgba(255, 255, 255, 0.6);
                border: 2px solid rgba(255, 255, 255, 0.3);
                border-radius: 12px;
                cursor: pointer;
                transition: all 0.3s ease;
                backdrop-filter: blur(10px);
                -webkit-backdrop-filter: blur(10px);
            }
            
            .analysis-type-card:hover {
                background: rgba(255, 255, 255, 0.8);
                border-color: rgba(0, 122, 255, 0.3);
                transform: translateY(-2px);
                box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
            }
            
            .analysis-type-card.active {
                background: rgba(0, 122, 255, 0.1);
                border-color: var(--accent-blue);
                box-shadow: 0 4px 16px rgba(0, 122, 255, 0.2);
            }
            
            .type-icon {
                width: 48px;
                height: 48px;
                background: linear-gradient(135deg, var(--accent-blue) 0%, var(--accent-purple) 100%);
                border-radius: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                flex-shrink: 0;
            }
            
            .analysis-type-card.active .type-icon {
                box-shadow: 0 4px 16px rgba(0, 122, 255, 0.4);
            }
            
            .type-content {
                flex: 1;
            }
            
            .type-title {
                font-size: 16px;
                font-weight: 600;
                color: var(--text-primary);
                margin-bottom: 4px;
            }
            
            .type-description {
                font-size: 14px;
                color: var(--text-secondary);
                line-height: 1.4;
            }
            
            .progress-steps {
                display: flex;
                justify-content: center;
                gap: 48px;
                margin-top: 32px;
            }
            
            .progress-step {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 12px;
                opacity: 0.4;
                transition: all 0.3s ease;
            }
            
            .progress-step.active {
                opacity: 1;
                transform: scale(1.1);
            }
            
            .step-icon {
                font-size: 32px;
                margin-bottom: 8px;
            }
            
            .step-text {
                font-size: 14px;
                font-weight: 600;
                color: var(--text-primary);
                text-align: center;
            }
            
            .progress-step.active .step-icon {
                animation: bounce 1s infinite;
            }
            
            @keyframes bounce {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
            }
            
            .chart-preview-container {
                text-align: center;
                background: rgba(0, 0, 0, 0.02);
                border-radius: 12px;
                padding: 20px;
            }
        </style>
    `;
    
    // Setup drag and drop
    setupDragAndDrop();
}

let selectedAnalysisType = 'comprehensive';
let uploadedFile = null;

function handleChartFileUpload(event) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
        uploadedFile = file;
        const reader = new FileReader();
        
        reader.onload = function(e) {
            // Show preview
            document.getElementById('uploadContainer').style.display = 'none';
            document.getElementById('chartPreviewSection').style.display = 'block';
            document.getElementById('analysisSettings').style.display = 'block';
            document.getElementById('chartPreview').src = e.target.result;
        };
        
        reader.readAsDataURL(file);
    }
}

function selectAnalysisType(element, type) {
    // Remove active class from all cards
    document.querySelectorAll('.analysis-type-card').forEach(card => {
        card.classList.remove('active');
    });
    
    // Add active class to selected card
    element.classList.add('active');
    selectedAnalysisType = type;
}

function resetUpload() {
    document.getElementById('uploadContainer').style.display = 'block';
    document.getElementById('chartPreviewSection').style.display = 'none';
    document.getElementById('analysisSettings').style.display = 'none';
    document.getElementById('analysisProgress').style.display = 'none';
    document.getElementById('analysisResults').style.display = 'none';
    
    // Reset form
    document.getElementById('chartFileInput').value = '';
    document.getElementById('symbolInput').value = '';
    document.getElementById('timeframeSelect').value = '';
    document.getElementById('notesInput').value = '';
    
    uploadedFile = null;
}

function startAnalysis() {
    if (!uploadedFile) {
        alert('Please upload a chart first');
        return;
    }
    
    // Hide settings, show progress
    document.getElementById('analysisSettings').style.display = 'none';
    document.getElementById('analysisProgress').style.display = 'block';
    
    // Simulate analysis progress
    simulateAnalysisProgress();
}

function simulateAnalysisProgress() {
    const steps = [
        { id: 'step1', message: 'Processing image and extracting chart data...', duration: 2000 },
        { id: 'step2', message: 'Detecting patterns and technical indicators...', duration: 3000 },
        { id: 'step3', message: 'Running AI analysis algorithms...', duration: 4000 },
        { id: 'step4', message: 'Generating comprehensive report...', duration: 2000 }
    ];
    
    let currentStep = 0;
    
    function nextStep() {
        if (currentStep > 0) {
            document.getElementById(steps[currentStep - 1].id).classList.remove('active');
        }
        
        if (currentStep < steps.length) {
            const step = steps[currentStep];
            document.getElementById(step.id).classList.add('active');
            document.getElementById('progressMessage').textContent = step.message;
            
            setTimeout(() => {
                currentStep++;
                nextStep();
            }, step.duration);
        } else {
            // Analysis complete
            showAnalysisResults();
        }
    }
    
    nextStep();
}

function showAnalysisResults() {
    document.getElementById('analysisProgress').style.display = 'none';
    document.getElementById('analysisResults').style.display = 'block';
    
    // Generate sample results
    const results = generateSampleResults();
    document.getElementById('resultsContent').innerHTML = results;
}

function generateSampleResults() {
    return `
        <div class="grid-2" style="gap: 24px; margin-bottom: 32px;">
            <div class="result-card">
                <div class="result-header">
                    <div class="result-icon bullish">📈</div>
                    <div>
                        <div class="result-title">Market Sentiment</div>
                        <div class="result-value bullish">BULLISH</div>
                    </div>
                </div>
                <div class="confidence-meter">
                    <div class="confidence-label">Confidence: 87%</div>
                    <div class="confidence-bar">
                        <div class="confidence-fill" style="width: 87%"></div>
                    </div>
                </div>
            </div>
            
            <div class="result-card">
                <div class="result-header">
                    <div class="result-icon">🎯</div>
                    <div>
                        <div class="result-title">Key Levels</div>
                        <div class="result-value">Support: $1,850</div>
                    </div>
                </div>
                <div style="font-size: 14px; color: var(--text-secondary); margin-top: 8px;">
                    Resistance: $1,920<br>
                    Target: $1,950
                </div>
            </div>
        </div>
        
        <div class="result-section">
            <h4 style="font-size: 18px; font-weight: 600; margin-bottom: 16px; color: var(--text-primary);">Analysis Summary</h4>
            <div class="result-text">
                The chart shows a strong bullish breakout above the key resistance level at $1,900. 
                The RSI is at healthy levels around 65, indicating room for further upside movement. 
                Volume confirmation supports the breakout validity. Target price is set at $1,950 
                with a stop loss below $1,870.
            </div>
        </div>
        
        <div class="result-section">
            <h4 style="font-size: 18px; font-weight: 600; margin-bottom: 16px; color: var(--text-primary);">Detected Patterns</h4>
            <div class="pattern-tags">
                <span class="pattern-tag">Ascending Triangle</span>
                <span class="pattern-tag">Bullish Breakout</span>
                <span class="pattern-tag">Volume Confirmation</span>
                <span class="pattern-tag">RSI Divergence</span>
            </div>
        </div>
        
        <div class="result-section">
            <h4 style="font-size: 18px; font-weight: 600; margin-bottom: 16px; color: var(--text-primary);">Trading Recommendation</h4>
            <div class="recommendation-card">
                <div class="recommendation-header">
                    <span class="recommendation-action buy">BUY</span>
                    <span class="recommendation-confidence">High Confidence</span>
                </div>
                <div class="recommendation-details">
                    <div class="recommendation-item">
                        <span class="label">Entry:</span>
                        <span class="value">$1,905 - $1,910</span>
                    </div>
                    <div class="recommendation-item">
                        <span class="label">Stop Loss:</span>
                        <span class="value">$1,870</span>
                    </div>
                    <div class="recommendation-item">
                        <span class="label">Take Profit:</span>
                        <span class="value">$1,950</span>
                    </div>
                    <div class="recommendation-item">
                        <span class="label">Risk/Reward:</span>
                        <span class="value">1:1.3</span>
                    </div>
                </div>
            </div>
        </div>
        
        <style>
            .result-card {
                background: rgba(255, 255, 255, 0.6);
                border: 1px solid rgba(255, 255, 255, 0.3);
                border-radius: 12px;
                padding: 20px;
                backdrop-filter: blur(10px);
                -webkit-backdrop-filter: blur(10px);
            }
            
            .result-header {
                display: flex;
                align-items: center;
                gap: 16px;
                margin-bottom: 16px;
            }
            
            .result-icon {
                width: 48px;
                height: 48px;
                border-radius: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 24px;
                background: rgba(0, 122, 255, 0.1);
                color: var(--accent-blue);
            }
            
            .result-icon.bullish {
                background: rgba(48, 209, 88, 0.1);
                color: var(--accent-green);
            }
            
            .result-title {
                font-size: 14px;
                color: var(--text-secondary);
                margin-bottom: 4px;
            }
            
            .result-value {
                font-size: 18px;
                font-weight: 600;
                color: var(--text-primary);
            }
            
            .result-value.bullish {
                color: var(--accent-green);
            }
            
            .confidence-meter {
                margin-top: 16px;
            }
            
            .confidence-label {
                font-size: 14px;
                color: var(--text-secondary);
                margin-bottom: 8px;
            }
            
            .confidence-bar {
                width: 100%;
                height: 6px;
                background: rgba(0, 0, 0, 0.1);
                border-radius: 3px;
                overflow: hidden;
            }
            
            .confidence-fill {
                height: 100%;
                background: linear-gradient(90deg, var(--accent-blue) 0%, var(--accent-green) 100%);
                border-radius: 3px;
                transition: width 0.3s ease;
            }
            
            .result-section {
                margin-bottom: 32px;
            }
            
            .result-text {
                font-size: 15px;
                line-height: 1.6;
                color: var(--text-primary);
                background: rgba(255, 255, 255, 0.6);
                padding: 20px;
                border-radius: 12px;
                border: 1px solid rgba(255, 255, 255, 0.3);
            }
            
            .pattern-tags {
                display: flex;
                flex-wrap: wrap;
                gap: 12px;
            }
            
            .pattern-tag {
                padding: 8px 16px;
                background: rgba(0, 122, 255, 0.1);
                color: var(--accent-blue);
                border-radius: 20px;
                font-size: 14px;
                font-weight: 500;
                border: 1px solid rgba(0, 122, 255, 0.2);
            }
            
            .recommendation-card {
                background: rgba(255, 255, 255, 0.6);
                border: 1px solid rgba(255, 255, 255, 0.3);
                border-radius: 12px;
                padding: 24px;
                backdrop-filter: blur(10px);
                -webkit-backdrop-filter: blur(10px);
            }
            
            .recommendation-header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 20px;
            }
            
            .recommendation-action {
                padding: 8px 20px;
                border-radius: 8px;
                font-weight: 700;
                font-size: 16px;
            }
            
            .recommendation-action.buy {
                background: rgba(48, 209, 88, 0.1);
                color: var(--accent-green);
                border: 1px solid rgba(48, 209, 88, 0.3);
            }
            
            .recommendation-confidence {
                font-size: 14px;
                color: var(--text-secondary);
                font-weight: 500;
            }
            
            .recommendation-details {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 16px;
            }
            
            .recommendation-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 12px 0;
                border-bottom: 1px solid rgba(255, 255, 255, 0.2);
            }
            
            .recommendation-item:last-child {
                border-bottom: none;
            }
            
            .recommendation-item .label {
                font-size: 14px;
                color: var(--text-secondary);
                font-weight: 500;
            }
            
            .recommendation-item .value {
                font-size: 14px;
                color: var(--text-primary);
                font-weight: 600;
            }
        </style>
    `;
}

function setupDragAndDrop() {
    const uploadArea = document.getElementById('uploadArea');
    
    if (uploadArea) {
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('drag-over');
        });
        
        uploadArea.addEventListener('dragleave', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('drag-over');
        });
        
        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('drag-over');
            
            const file = e.dataTransfer.files[0];
            if (file && file.type.startsWith('image/')) {
                const input = document.getElementById('chartFileInput');
                const dataTransfer = new DataTransfer();
                dataTransfer.items.add(file);
                input.files = dataTransfer.files;
                handleChartFileUpload({ target: input });
            }
        });
    }
}