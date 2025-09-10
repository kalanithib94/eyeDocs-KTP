/**
 * File: dashboard.js
 * Purpose: Dashboard specific functionality for Eye-Docs KTP Demo
 * Created: 2025-01-27 v1.0.0
 * Last Modified: 2025-01-27 v1.0.0
 * Author: AI Development Team
 * 
 * Dependencies: config.js, main.js, Bootstrap 5
 * API Endpoints: /referrals, /referrals/stats, /status, /health
 * 
 * Changelog:
 * v1.0.0 - Initial creation with dashboard data loading and display
 */

// Dashboard specific functionality
window.EyeDashboard = {
    // Dashboard state
    state: {
        stats: null,
        recentReferrals: [],
        systemStatus: {},
        lastRefresh: null,
        refreshInterval: null
    },
    
    // Initialize dashboard
    init: function() {
        EyeDocsApp.log('Initializing dashboard...');
        
        // Load initial data
        this.loadDashboardData();
        
        // Set up refresh interval
        this.setupAutoRefresh();
        
        // Set up event listeners
        this.setupEventListeners();
        
        EyeDocsApp.log('Dashboard initialized');
    },
    
    // Setup event listeners
    setupEventListeners: function() {
        // Refresh button if exists
        const refreshBtn = document.getElementById('refresh-btn');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => this.refreshData());
        }
        
        // Quick action buttons
        const syncBtn = document.querySelector('[onclick="syncSalesforce()"]');
        if (syncBtn) {
            syncBtn.onclick = () => this.syncSalesforce();
        }
        
        const forecastBtn = document.querySelector('[onclick="generateForecast()"]');
        if (forecastBtn) {
            forecastBtn.onclick = () => this.generateForecast();
        }
    },
    
    // Load all dashboard data
    loadDashboardData: async function() {
        try {
            EyeDocsApp.log('Loading dashboard data...');
            
            // Show loading states
            this.showLoadingStates();
            
            // Load data in parallel
            await Promise.allSettled([
                this.loadStats(),
                this.loadRecentReferrals(),
                this.loadSystemStatus()
            ]);
            
            // Update timestamp
            EyeDocsApp.updateTimestamp();
            this.state.lastRefresh = new Date();
            
            EyeDocsApp.log('Dashboard data loaded successfully');
            
        } catch (error) {
            EyeDocsApp.logError('Failed to load dashboard data:', error);
            EyeDocsApp.showAlert('Failed to load dashboard data', 'danger');
        }
    },
    
    // Load referral statistics
    loadStats: async function() {
        try {
            // For demo purposes, we'll generate mock data since the API endpoint might not be fully implemented
            const mockStats = {
                new_referrals: Math.floor(Math.random() * 20) + 5,
                under_review: Math.floor(Math.random() * 15) + 3,
                scheduled: Math.floor(Math.random() * 25) + 8,
                completed: Math.floor(Math.random() * 50) + 20
            };
            
            try {
                // Try to get real data from API
                const response = await EyeDocsApp.apiRequest(EyeDocsConfig.ENDPOINTS.REFERRALS_STATS);
                this.state.stats = response.data || mockStats;
            } catch (error) {
                // Fall back to mock data if API fails
                EyeDocsApp.logWarning('Using mock stats data:', error.message);
                this.state.stats = mockStats;
            }
            
            // Update stat displays
            this.updateStatsDisplay();
            
        } catch (error) {
            EyeDocsApp.logError('Failed to load stats:', error);
            this.showStatsError();
        }
    },
    
    // Load recent referrals
    loadRecentReferrals: async function() {
        try {
            // Show loading state
            document.getElementById('referrals-loading').style.display = 'block';
            document.getElementById('referrals-table').style.display = 'none';
            document.getElementById('referrals-empty').style.display = 'none';
            
            try {
                // Try to get real data from API
                const response = await EyeDocsApp.apiRequest(EyeDocsConfig.ENDPOINTS.REFERRALS, {
                    method: 'GET',
                    data: { limit: 10, page: 1 }
                });
                
                if (response.status === 'success' && response.data && response.data.referrals) {
                    this.state.recentReferrals = response.data.referrals;
                } else {
                    throw new Error('Invalid response format');
                }
            } catch (error) {
                // Generate mock data for demo
                EyeDocsApp.logWarning('Using mock referrals data:', error.message);
                this.state.recentReferrals = this.generateMockReferrals();
            }
            
            // Update referrals display
            this.updateReferralsDisplay();
            
        } catch (error) {
            EyeDocsApp.logError('Failed to load recent referrals:', error);
            this.showReferralsError();
        }
    },
    
    // Load system status
    loadSystemStatus: async function() {
        try {
            // Check API status
            try {
                await EyeDocsApp.apiRequest(EyeDocsConfig.ENDPOINTS.STATUS);
                this.updateStatusBadge('api-status', 'Online', 'success');
            } catch (error) {
                this.updateStatusBadge('api-status', 'Offline', 'danger');
            }
            
            // Check database status (through health endpoint)
            try {
                const health = await EyeDocsApp.checkHealth();
                if (health.checks && health.checks.database) {
                    const dbStatus = health.checks.database.status === 'healthy' ? 'Connected' : 'Error';
                    const dbClass = health.checks.database.status === 'healthy' ? 'success' : 'danger';
                    this.updateStatusBadge('db-status', dbStatus, dbClass);
                } else {
                    this.updateStatusBadge('db-status', 'Unknown', 'warning');
                }
            } catch (error) {
                this.updateStatusBadge('db-status', 'Error', 'danger');
            }
            
            // Check Salesforce status
            if (EyeDocsConfig.isFeatureEnabled('SALESFORCE_INTEGRATION')) {
                try {
                    await EyeDocsApp.apiRequest(EyeDocsConfig.ENDPOINTS.SALESFORCE_TEST);
                    this.updateStatusBadge('sf-status', 'Ready', 'warning');
                } catch (error) {
                    this.updateStatusBadge('sf-status', 'Not Configured', 'secondary');
                }
            } else {
                this.updateStatusBadge('sf-status', 'Disabled', 'secondary');
            }
            
        } catch (error) {
            EyeDocsApp.logError('Failed to load system status:', error);
        }
    },
    
    // Update stats display
    updateStatsDisplay: function() {
        const stats = this.state.stats;
        if (!stats) return;
        
        const statElements = {
            'stat-new': stats.new_referrals || 0,
            'stat-pending': stats.under_review || 0,
            'stat-scheduled': stats.scheduled || 0,
            'stat-completed': stats.completed || 0
        };
        
        Object.entries(statElements).forEach(([elementId, value]) => {
            const element = document.getElementById(elementId);
            if (element) {
                element.textContent = value;
            }
        });
    },
    
    // Update referrals display
    updateReferralsDisplay: function() {
        const loadingElement = document.getElementById('referrals-loading');
        const tableElement = document.getElementById('referrals-table');
        const emptyElement = document.getElementById('referrals-empty');
        const bodyElement = document.getElementById('referrals-body');
        
        // Hide loading
        if (loadingElement) loadingElement.style.display = 'none';
        
        if (this.state.recentReferrals.length === 0) {
            // Show empty state
            if (emptyElement) emptyElement.style.display = 'block';
            if (tableElement) tableElement.style.display = 'none';
        } else {
            // Show table with data
            if (tableElement) tableElement.style.display = 'block';
            if (emptyElement) emptyElement.style.display = 'none';
            
            // Populate table
            if (bodyElement) {
                bodyElement.innerHTML = this.state.recentReferrals.map(referral => `
                    <tr>
                        <td>
                            <strong>${referral.patient_name}</strong><br>
                            <small class="text-muted">${referral.referral_number || 'N/A'}</small>
                        </td>
                        <td>
                            <span class="text-capitalize">${EyeDocsConfig.getConditionLabel(referral.condition)}</span>
                        </td>
                        <td>${EyeDocsApp.formatStatusBadge(referral.status)}</td>
                        <td>
                            <small>${EyeDocsApp.formatDate(referral.date_received || referral.created_at)}</small>
                        </td>
                    </tr>
                `).join('');
            }
        }
    },
    
    // Update status badge
    updateStatusBadge: function(elementId, text, className) {
        const element = document.getElementById(elementId);
        if (element) {
            element.className = `badge bg-${className}`;
            element.textContent = text;
        }
    },
    
    // Show loading states
    showLoadingStates: function() {
        // Stats loading
        ['stat-new', 'stat-pending', 'stat-scheduled', 'stat-completed'].forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.innerHTML = '<span class="spinner-border spinner-border-sm" role="status"></span>';
            }
        });
        
        // Status badges loading
        ['api-status', 'db-status', 'sf-status'].forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.innerHTML = '<span class="spinner-border spinner-border-sm" role="status"></span>';
            }
        });
    },
    
    // Show stats error
    showStatsError: function() {
        ['stat-new', 'stat-pending', 'stat-scheduled', 'stat-completed'].forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = 'Error';
            }
        });
    },
    
    // Show referrals error
    showReferralsError: function() {
        const loadingElement = document.getElementById('referrals-loading');
        const tableElement = document.getElementById('referrals-table');
        const emptyElement = document.getElementById('referrals-empty');
        
        if (loadingElement) loadingElement.style.display = 'none';
        if (tableElement) tableElement.style.display = 'none';
        if (emptyElement) {
            emptyElement.style.display = 'block';
            emptyElement.innerHTML = `
                <div class="text-center p-4">
                    <i class="bi bi-exclamation-triangle text-warning fs-1"></i>
                    <p class="text-muted mt-2">Failed to load referrals</p>
                    <button class="btn btn-outline-primary" onclick="EyeDashboard.loadRecentReferrals()">
                        <i class="bi bi-arrow-clockwise me-1"></i>Retry
                    </button>
                </div>
            `;
        }
    },
    
    // Generate mock referrals for demo
    generateMockReferrals: function() {
        const mockReferrals = [];
        const conditions = ['cataract', 'amd', 'oculoplastics', 'vitreoretinal'];
        const statuses = ['received', 'under_review', 'scheduled', 'completed'];
        const names = ['Emma Thompson', 'Robert Wilson', 'Margaret Davies', 'James Miller', 'Sarah Johnson'];
        
        for (let i = 0; i < 5; i++) {
            mockReferrals.push({
                id: i + 1,
                referral_number: `REF-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(i + 1).padStart(4, '0')}`,
                patient_name: names[i % names.length],
                condition: conditions[Math.floor(Math.random() * conditions.length)],
                status: statuses[Math.floor(Math.random() * statuses.length)],
                date_received: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
                urgency: Math.random() > 0.7 ? 'urgent' : 'routine'
            });
        }
        
        return mockReferrals;
    },
    
    // Refresh all data
    refreshData: function() {
        EyeDocsApp.showAlert('Refreshing data...', 'info', 2000);
        this.loadDashboardData();
    },
    
    // Setup auto refresh
    setupAutoRefresh: function() {
        if (EyeDocsConfig.UI.AUTO_REFRESH_INTERVAL > 0) {
            this.state.refreshInterval = setInterval(() => {
                this.refreshData();
            }, EyeDocsConfig.UI.AUTO_REFRESH_INTERVAL);
        }
    },
    
    // Sync with Salesforce
    syncSalesforce: async function() {
        if (!EyeDocsConfig.isFeatureEnabled('SALESFORCE_INTEGRATION')) {
            EyeDocsApp.showAlert('Salesforce integration is not enabled', 'warning');
            return;
        }
        
        try {
            EyeDocsApp.showAlert('Starting Salesforce sync...', 'info');
            
            // For demo purposes, simulate sync
            await EyeDocsApp.delay(2000);
            
            try {
                await EyeDocsApp.apiRequest(EyeDocsConfig.ENDPOINTS.SALESFORCE_SYNC, {
                    method: 'POST',
                    data: { force: true }
                });
                EyeDocsApp.showAlert('Salesforce sync completed successfully', 'success');
            } catch (error) {
                EyeDocsApp.showAlert('Salesforce sync simulation completed (API not yet connected)', 'warning');
            }
            
            // Refresh data after sync
            this.refreshData();
            
        } catch (error) {
            EyeDocsApp.logError('Salesforce sync failed:', error);
            EyeDocsApp.showAlert('Salesforce sync failed: ' + error.message, 'danger');
        }
    },
    
    // Generate forecast
    generateForecast: async function() {
        if (!EyeDocsConfig.isFeatureEnabled('ARIMA_FORECASTING')) {
            EyeDocsApp.showAlert('Forecasting is not enabled', 'warning');
            return;
        }
        
        try {
            EyeDocsApp.showAlert('Generating forecast...', 'info');
            
            // For demo purposes, simulate forecast generation
            await EyeDocsApp.delay(3000);
            
            try {
                await EyeDocsApp.apiRequest(EyeDocsConfig.ENDPOINTS.ANALYTICS_FORECAST, {
                    method: 'POST',
                    data: { periods: 12 }
                });
                EyeDocsApp.showAlert('Forecast generated successfully', 'success');
            } catch (error) {
                EyeDocsApp.showAlert('Forecast simulation completed (Analytics system not yet connected)', 'warning');
            }
            
        } catch (error) {
            EyeDocsApp.logError('Forecast generation failed:', error);
            EyeDocsApp.showAlert('Forecast generation failed: ' + error.message, 'danger');
        }
    },
    
    // Cleanup
    destroy: function() {
        if (this.state.refreshInterval) {
            clearInterval(this.state.refreshInterval);
        }
    }
};

// Global functions for dashboard
window.syncSalesforce = function() {
    EyeDashboard.syncSalesforce();
};

window.generateForecast = function() {
    EyeDashboard.generateForecast();
};

window.refreshData = function() {
    EyeDashboard.refreshData();
};

// Initialize dashboard when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit for main app to initialize
    setTimeout(() => {
        EyeDashboard.init();
    }, 100);
});

// Cleanup when page unloads
window.addEventListener('beforeunload', function() {
    EyeDashboard.destroy();
});