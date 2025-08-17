function loadAnalysesSection() {
    const contentArea = document.getElementById('contentArea');
    
    contentArea.innerHTML = `
        <div class="analyses-section fade-in">
            <!-- Quick Stats -->
            <div class="grid-4" style="margin-bottom: 32px;">
                <div class="glass-card" style="padding: 24px; text-align: center;">
                    <div style="font-size: 32px; font-weight: 700; color: var(--accent-blue); margin-bottom: 8px;">24</div>
                    <div style="font-size: 14px; color: var(--text-secondary);">Total Analyses</div>
                </div>
                <div class="glass-card" style="padding: 24px; text-align: center;">
                    <div style="font-size: 32px; font-weight: 700; color: var(--accent-green); margin-bottom: 8px;">87%</div>
                    <div style="font-size: 14px; color: var(--text-secondary);">Accuracy Rate</div>
                </div>
                <div class="glass-card" style="padding: 24px; text-align: center;">
                    <div style="font-size: 32px; font-weight: 700; color: var(--accent-purple); margin-bottom: 8px;">12</div>
                    <div style="font-size: 14px; color: var(--text-secondary);">This Week</div>
                </div>
                <div class="glass-card" style="padding: 24px; text-align: center;">
                    <div style="font-size: 32px; font-weight: 700; color: var(--accent-orange); margin-bottom: 8px;">5.2s</div>
                    <div style="font-size: 14px; color: var(--text-secondary);">Avg. Time</div>
                </div>
            </div>
            
            <!-- Filter Bar -->
            <div class="glass-card" style="padding: 20px; margin-bottom: 32px;">
                <div style="display: flex; align-items: center; gap: 16px; flex-wrap: wrap;">
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <span style="font-size: 14px; font-weight: 600; color: var(--text-primary);">Filter:</span>
                        <select class="form-select" style="width: auto; min-width: 120px;">
                            <option>All Time</option>
                            <option>This Week</option>
                            <option>This Month</option>
                            <option>Last 3 Months</option>
                        </select>
                    </div>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <span style="font-size: 14px; font-weight: 600; color: var(--text-primary);">Type:</span>
                        <select class="form-select" style="width: auto; min-width: 120px;">
                            <option>All Types</option>
                            <option>Technical Analysis</option>
                            <option>Price Action</option>
                            <option>Pattern Recognition</option>
                        </select>
                    </div>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <span style="font-size: 14px; font-weight: 600; color: var(--text-primary);">Status:</span>
                        <select class="form-select" style="width: auto; min-width: 120px;">
                            <option>All Status</option>
                            <option>Completed</option>
                            <option>Processing</option>
                            <option>Failed</option>
                        </select>
                    </div>
                    <div style="margin-left: auto;">
                        <button class="btn btn-secondary">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                                <polyline points="7 10 12 15 17 10"/>
                                <line x1="12" y1="15" x2="12" y2="3"/>
                            </svg>
                            Export All
                        </button>
                    </div>
                </div>
            </div>
            
            <!-- Analyses Grid -->
            <div class="analyses-grid" id="analysesList">
                ${generateSampleAnalyses()}
            </div>
            
            <!-- Empty State (hidden by default) -->
            <div class="empty-state" id="emptyState" style="display: none;">
                <div class="glass-card" style="padding: 64px; text-align: center;">
                    <div style="font-size: 64px; margin-bottom: 24px; opacity: 0.5;">📊</div>
                    <h3 style="font-size: 24px; font-weight: 600; margin-bottom: 12px; color: var(--text-primary);">No analyses yet</h3>
                    <p style="font-size: 16px; color: var(--text-secondary); margin-bottom: 32px;">Upload your first chart to get started with AI-powered analysis</p>
                    <button class="btn btn-primary" onclick="showSection('upload')">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                            <polyline points="17 8 12 3 7 8"/>
                            <line x1="12" y1="3" x2="12" y2="15"/>
                        </svg>
                        Upload Chart
                    </button>
                </div>
            </div>
        </div>
        
        <style>
            .analyses-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
                gap: 24px;
            }
            
            .analysis-item {
                background: rgba(255, 255, 255, 0.7);
                backdrop-filter: blur(20px);
                -webkit-backdrop-filter: blur(20px);
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 16px;
                padding: 24px;
                transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                cursor: pointer;
                position: relative;
                overflow: hidden;
            }
            
            .analysis-item::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
                transition: left 0.6s;
            }
            
            .analysis-item:hover::before {
                left: 100%;
            }
            
            .analysis-item:hover {
                transform: translateY(-8px);
                box-shadow: 0 16px 48px rgba(0, 0, 0, 0.1);
                background: rgba(255, 255, 255, 0.85);
                border-color: rgba(255, 255, 255, 0.3);
            }
            
            .analysis-header {
                display: flex;
                align-items: center;
                gap: 16px;
                margin-bottom: 16px;
            }
            
            .analysis-icon {
                width: 48px;
                height: 48px;
                border-radius: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 24px;
                color: white;
                flex-shrink: 0;
                position: relative;
                z-index: 2;
            }
            
            .analysis-icon.bullish {
                background: linear-gradient(135deg, var(--accent-green) 0%, #059669 100%);
                box-shadow: 0 4px 16px rgba(48, 209, 88, 0.3);
            }
            
            .analysis-icon.bearish {
                background: linear-gradient(135deg, var(--accent-red) 0%, #dc2626 100%);
                box-shadow: 0 4px 16px rgba(255, 59, 48, 0.3);
            }
            
            .analysis-icon.neutral {
                background: linear-gradient(135deg, var(--accent-orange) 0%, #d97706 100%);
                box-shadow: 0 4px 16px rgba(255, 149, 0, 0.3);
            }
            
            .analysis-info {
                flex: 1;
                position: relative;
                z-index: 2;
            }
            
            .analysis-title {
                font-size: 18px;
                font-weight: 600;
                color: var(--text-primary);
                margin-bottom: 4px;
                line-height: 1.3;
            }
            
            .analysis-meta {
                font-size: 14px;
                color: var(--text-secondary);
                display: flex;
                align-items: center;
                gap: 12px;
            }
            
            .analysis-sentiment {
                font-weight: 600;
                padding: 2px 8px;
                border-radius: 6px;
                font-size: 12px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
            
            .analysis-sentiment.bullish {
                background: rgba(48, 209, 88, 0.1);
                color: var(--accent-green);
            }
            
            .analysis-sentiment.bearish {
                background: rgba(255, 59, 48, 0.1);
                color: var(--accent-red);
            }
            
            .analysis-sentiment.neutral {
                background: rgba(255, 149, 0, 0.1);
                color: var(--accent-orange);
            }
            
            .analysis-content {
                margin-top: 16px;
                position: relative;
                z-index: 2;
            }
            
            .analysis-summary {
                font-size: 15px;
                color: var(--text-primary);
                line-height: 1.5;
                margin-bottom: 16px;
            }
            
            .analysis-tags {
                display: flex;
                flex-wrap: wrap;
                gap: 8px;
                margin-bottom: 16px;
            }
            
            .analysis-tag {
                padding: 4px 12px;
                background: rgba(0, 122, 255, 0.1);
                color: var(--accent-blue);
                border-radius: 12px;
                font-size: 12px;
                font-weight: 500;
                border: 1px solid rgba(0, 122, 255, 0.2);
            }
            
            .analysis-actions {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-top: 16px;
                padding-top: 16px;
                border-top: 1px solid rgba(255, 255, 255, 0.2);
                position: relative;
                z-index: 2;
            }
            
            .analysis-confidence {
                display: flex;
                align-items: center;
                gap: 8px;
                font-size: 14px;
                color: var(--text-secondary);
            }
            
            .confidence-bar {
                width: 60px;
                height: 4px;
                background: rgba(0, 0, 0, 0.1);
                border-radius: 2px;
                overflow: hidden;
            }
            
            .confidence-fill {
                height: 100%;
                background: linear-gradient(90deg, var(--accent-blue) 0%, var(--accent-purple) 100%);
                border-radius: 2px;
                transition: width 0.3s ease;
            }
            
            .analysis-menu {
                position: relative;
            }
            
            .menu-btn {
                width: 32px;
                height: 32px;
                border: none;
                background: rgba(0, 0, 0, 0.05);
                border-radius: 8px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s ease;
            }
            
            .menu-btn:hover {
                background: rgba(0, 0, 0, 0.1);
                transform: scale(1.05);
            }
        </style>
    `;
}

function generateSampleAnalyses() {
    const analyses = [
        {
            title: "EUR/USD Technical Analysis",
            sentiment: "bullish",
            confidence: 87,
            date: "2 hours ago",
            summary: "Strong bullish momentum with breakout above key resistance. RSI showing healthy levels.",
            tags: ["Breakout", "RSI", "Support/Resistance"]
        },
        {
            title: "BTC/USD Price Action",
            sentiment: "bearish",
            confidence: 73,
            date: "5 hours ago",
            summary: "Bearish divergence detected on 4H chart. Potential correction to $58,000 support level.",
            tags: ["Divergence", "Support", "Correction"]
        },
        {
            title: "AAPL Stock Analysis",
            sentiment: "neutral",
            confidence: 65,
            date: "1 day ago",
            summary: "Consolidation pattern forming. Waiting for clear directional break above/below range.",
            tags: ["Consolidation", "Range", "Breakout"]
        },
        {
            title: "GBP/JPY Scalping Setup",
            sentiment: "bullish",
            confidence: 92,
            date: "1 day ago",
            summary: "Perfect scalping opportunity with tight stop loss. 1:3 risk-reward ratio setup.",
            tags: ["Scalping", "Risk-Reward", "Entry"]
        },
        {
            title: "Gold (XAU/USD) Analysis",
            sentiment: "bearish",
            confidence: 78,
            date: "2 days ago",
            summary: "Head and shoulders pattern completed. Target $1,850 with stop above $1,920.",
            tags: ["Head & Shoulders", "Pattern", "Target"]
        },
        {
            title: "S&P 500 Weekly Outlook",
            sentiment: "bullish",
            confidence: 81,
            date: "3 days ago",
            summary: "Weekly uptrend intact. Pullback to 4,200 would be healthy before next leg up.",
            tags: ["Weekly", "Uptrend", "Pullback"]
        }
    ];
    
    return analyses.map(analysis => `
        <div class="analysis-item" onclick="viewAnalysis('${analysis.title}')">
            <div class="analysis-header">
                <div class="analysis-icon ${analysis.sentiment}">
                    ${analysis.sentiment === 'bullish' ? '📈' : analysis.sentiment === 'bearish' ? '📉' : '➡️'}
                </div>
                <div class="analysis-info">
                    <div class="analysis-title">${analysis.title}</div>
                    <div class="analysis-meta">
                        <span>${analysis.date}</span>
                        <span class="analysis-sentiment ${analysis.sentiment}">${analysis.sentiment}</span>
                    </div>
                </div>
            </div>
            <div class="analysis-content">
                <div class="analysis-summary">${analysis.summary}</div>
                <div class="analysis-tags">
                    ${analysis.tags.map(tag => `<span class="analysis-tag">${tag}</span>`).join('')}
                </div>
            </div>
            <div class="analysis-actions">
                <div class="analysis-confidence">
                    <span>Confidence:</span>
                    <div class="confidence-bar">
                        <div class="confidence-fill" style="width: ${analysis.confidence}%"></div>
                    </div>
                    <span>${analysis.confidence}%</span>
                </div>
                <div class="analysis-menu">
                    <button class="menu-btn" onclick="event.stopPropagation(); showAnalysisMenu(this)">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="1"/>
                            <circle cx="19" cy="12" r="1"/>
                            <circle cx="5" cy="12" r="1"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function viewAnalysis(title) {
    console.log('Viewing analysis:', title);
    // Implement analysis detail view
}

function showAnalysisMenu(button) {
    console.log('Showing analysis menu');
    // Implement context menu
}