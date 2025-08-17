function createHeader() {
    return `
        <header class="content-header">
            <h1 class="page-title" id="pageTitle">My Analyses</h1>
            
            <div class="header-actions">
                <div class="search-box">
                    <span class="search-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="11" cy="11" r="8"/>
                            <path d="M21 21l-4.35-4.35"/>
                        </svg>
                    </span>
                    <input type="text" class="search-input" placeholder="Search analyses..." id="searchInput">
                </div>
                
                <button class="header-btn" onclick="showSection('upload')">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M12 5v14M5 12h14"/>
                    </svg>
                    New Analysis
                </button>
            </div>
        </header>
    `;
}