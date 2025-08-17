function createSidebar() {
    return `
        <aside class="sidebar">
            <!-- Logo Section -->
            <div class="logo-section">
                <a href="/" class="logo">
                    <div class="logo-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 13l4 4L17 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M21 7l-4 4-4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <span class="logo-text">ChartMaster</span>
                    <span class="logo-ai">AI</span>
                </a>
            </div>
            
            <!-- Navigation Menu -->
            <nav class="nav-menu">
                <!-- Main Section -->
                <div class="nav-section">
                    <div class="nav-section-title">Analysis</div>
                    <a href="#" class="nav-item active" onclick="showSection('analyses')" data-section="analyses">
                        <div class="nav-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M3 3v18h18"/>
                                <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/>
                            </svg>
                        </div>
                        <span class="nav-text">My Analyses</span>
                    </a>
                    <a href="#" class="nav-item" onclick="showSection('upload')" data-section="upload">
                        <div class="nav-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                                <polyline points="17 8 12 3 7 8"/>
                                <line x1="12" y1="3" x2="12" y2="15"/>
                            </svg>
                        </div>
                        <span class="nav-text">Upload Chart</span>
                    </a>
                </div>
                
                <!-- Modes Section -->
                <div class="nav-section">
                    <div class="nav-section-title">Analysis Modes</div>
                    <a href="#" class="nav-item" onclick="showSection('simple')" data-section="simple">
                        <div class="nav-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="12" cy="12" r="10"/>
                                <path d="M8 12h8M12 8v8"/>
                            </svg>
                        </div>
                        <span class="nav-text">Simple Mode</span>
                    </a>
                    <a href="#" class="nav-item" onclick="showSection('scalping')" data-section="scalping">
                        <div class="nav-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M22 12h-6l-3 9L9 3l-3 9H2"/>
                            </svg>
                        </div>
                        <span class="nav-text">Scalping Mode</span>
                    </a>
                    <a href="#" class="nav-item" onclick="showSection('professional')" data-section="professional">
                        <div class="nav-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                                <path d="M2 17l10 5 10-5"/>
                                <path d="M2 12l10 5 10-5"/>
                            </svg>
                        </div>
                        <span class="nav-text">Professional</span>
                        <div class="pro-badge">PRO</div>
                    </a>
                </div>
                
                <!-- Tools Section -->
                <div class="nav-section">
                    <div class="nav-section-title">Tools</div>
                    <a href="#" class="nav-item" onclick="showSection('patterns')" data-section="patterns">
                        <div class="nav-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
                            </svg>
                        </div>
                        <span class="nav-text">Patterns</span>
                    </a>
                    <a href="#" class="nav-item" onclick="showSection('alerts')" data-section="alerts">
                        <div class="nav-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                                <path d="M13.73 21a2 2 0 01-3.46 0"/>
                            </svg>
                        </div>
                        <span class="nav-text">Alerts</span>
                    </a>
                    <a href="#" class="nav-item" onclick="showSection('styles')" data-section="styles">
                        <div class="nav-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                        </div>
                        <span class="nav-text">Styles</span>
                    </a>
                </div>
                
                <!-- Settings Section -->
                <div class="nav-section">
                    <div class="nav-section-title">Account</div>
                    <a href="#" class="nav-item" onclick="showSection('settings')" data-section="settings">
                        <div class="nav-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="12" cy="12" r="3"/>
                                <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/>
                            </svg>
                        </div>
                        <span class="nav-text">Settings</span>
                    </a>
                    <a href="#" class="nav-item" onclick="showSection('support')" data-section="support">
                        <div class="nav-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="12" cy="12" r="10"/>
                                <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/>
                                <line x1="12" y1="17" x2="12.01" y2="17"/>
                            </svg>
                        </div>
                        <span class="nav-text">Support</span>
                    </a>
                </div>
            </nav>
            
            <!-- User Profile -->
            <div class="user-profile">
                <div class="user-card">
                    <div class="user-avatar" id="userAvatar">U</div>
                    <div class="user-info">
                        <div class="user-name" id="userName">User</div>
                        <div class="user-plan">Premium Plan</div>
                    </div>
                    <button class="logout-btn" onclick="logout()" title="Logout">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
                            <polyline points="16 17 21 12 16 7"/>
                            <line x1="21" y1="12" x2="9" y2="12"/>
                        </svg>
                    </button>
                </div>
            </div>
        </aside>
        
        <style>
            .pro-badge {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                padding: 2px 8px;
                font-size: 10px;
                font-weight: 700;
                letter-spacing: 0.5px;
                border-radius: 4px;
                background: linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%);
                color: white;
                margin-left: auto;
                flex-shrink: 0;
            }
        </style>
    `;
}