/**
 * File: main.js
 * Purpose: Main JavaScript functionality for Eye-Docs KTP Demo frontend
 * Created: 2025-01-27 v1.0.0
 * Last Modified: 2025-01-27 v1.0.0
 * Author: AI Development Team
 * 
 * Dependencies: config.js, Bootstrap 5
 * API Endpoints: All endpoints for main functionality
 * 
 * Changelog:
 * v1.0.0 - Initial creation with API communication and utilities
 */

// Main application object
window.EyeDocsApp = {
    // Application state
    state: {
        isAuthenticated: false,
        currentUser: null,
        lastUpdate: null,
        loading: false,
        error: null
    },
    
    // Initialize the application
    init: function() {
        try {
            this.log('Initializing EyeDocs application...');
            
            // Set up event listeners
            this.setupEventListeners();
            
            // Check authentication
            this.checkAuthentication();
            
            // Update last modified timestamp
            this.updateTimestamp();
            
            // Start auto-refresh if enabled
            if (EyeDocsConfig.UI.AUTO_REFRESH_INTERVAL > 0) {
                this.startAutoRefresh();
            }
            
            this.log('Application initialized successfully');
            
        } catch (error) {
            this.logError('Failed to initialize application:', error);
            this.showAlert('Failed to initialize application', 'danger');
        }
    },
    
    // Set up global event listeners
    setupEventListeners: function() {
        // Handle window load
        window.addEventListener('load', () => {
            this.hideLoading();
        });
        
        // Handle errors
        window.addEventListener('error', (event) => {
            this.logError('JavaScript error:', event.error);
        });
        
        // Handle unhandled promise rejections
        window.addEventListener('unhandledrejection', (event) => {
            this.logError('Unhandled promise rejection:', event.reason);
        });
        
        // Handle network status
        window.addEventListener('online', () => {
            this.showAlert('Connection restored', 'success');
        });
        
        window.addEventListener('offline', () => {
            this.showAlert('Connection lost', 'warning');
        });
    },
    
    // API Communication Methods
    
    /**
     * Make API request with error handling and retries
     */
    apiRequest: async function(endpoint, options = {}) {
        const url = EyeDocsConfig.buildEndpointUrl(endpoint, options.pathParams || {});
        
        const requestOptions = {
            method: options.method || 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        };
        
        // Add authentication token if available
        const token = this.getAuthToken();
        if (token) {
            requestOptions.headers.Authorization = `Bearer ${token}`;
        }
        
        // Add request body for POST/PUT requests
        if (options.data && (requestOptions.method === 'POST' || requestOptions.method === 'PUT')) {
            requestOptions.body = JSON.stringify(options.data);
        }
        
        let lastError = null;
        
        // Retry logic
        for (let attempt = 1; attempt <= EyeDocsConfig.API_RETRY_ATTEMPTS; attempt++) {
            try {
                this.log(`API Request [${attempt}/${EyeDocsConfig.API_RETRY_ATTEMPTS}]: ${requestOptions.method} ${url}`);
                
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), EyeDocsConfig.API_TIMEOUT);
                requestOptions.signal = controller.signal;
                
                const response = await fetch(url, requestOptions);
                clearTimeout(timeoutId);
                
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }
                
                const data = await response.json();
                this.log(`API Response: ${response.status}`, data);
                
                return data;
                
            } catch (error) {
                lastError = error;
                this.logError(`API Request failed (attempt ${attempt}):`, error);
                
                // Don't retry on authentication errors
                if (error.message.includes('401') || error.message.includes('403')) {
                    throw error;
                }
                
                // Wait before retry (except on last attempt)
                if (attempt < EyeDocsConfig.API_RETRY_ATTEMPTS) {
                    await this.delay(EyeDocsConfig.API_RETRY_DELAY * attempt);
                }
            }
        }
        
        // All attempts failed
        throw lastError || new Error('API request failed after all retry attempts');
    },
    
    /**
     * Test API connectivity
     */
    testAPI: async function() {
        try {
            this.showAlert('Testing API connection...', 'info');
            
            const response = await this.apiRequest(EyeDocsConfig.ENDPOINTS.STATUS);
            
            if (response.status === 'success') {
                this.showAlert('API connection successful!', 'success');
                return true;
            } else {
                this.showAlert('API test failed', 'danger');
                return false;
            }
        } catch (error) {
            this.logError('API test failed:', error);
            this.showAlert('API connection failed: ' + error.message, 'danger');
            return false;
        }
    },
    
    /**
     * Check system health
     */
    checkHealth: async function() {
        try {
            const response = await this.apiRequest(EyeDocsConfig.ENDPOINTS.HEALTH);
            return response;
        } catch (error) {
            this.logError('Health check failed:', error);
            return { status: 'error', message: error.message };
        }
    },
    
    /**
     * Get application configuration
     */
    getAppConfig: async function() {
        try {
            const response = await this.apiRequest(EyeDocsConfig.ENDPOINTS.CONFIG);
            return response.data;
        } catch (error) {
            this.logError('Failed to get app config:', error);
            return null;
        }
    },
    
    // Authentication Methods
    
    /**
     * Check if user is authenticated
     */
    checkAuthentication: function() {
        const token = this.getAuthToken();
        const userData = this.getUserData();
        
        if (token && userData) {
            this.state.isAuthenticated = true;
            this.state.currentUser = userData;
            return true;
        }
        
        return false;
    },
    
    /**
     * Get authentication token from storage
     */
    getAuthToken: function() {
        return localStorage.getItem(EyeDocsConfig.STORAGE_KEYS.AUTH_TOKEN);
    },
    
    /**
     * Get user data from storage
     */
    getUserData: function() {
        const userData = localStorage.getItem(EyeDocsConfig.STORAGE_KEYS.USER_DATA);
        return userData ? JSON.parse(userData) : null;
    },
    
    /**
     * Save authentication data
     */
    saveAuthData: function(token, userData) {
        localStorage.setItem(EyeDocsConfig.STORAGE_KEYS.AUTH_TOKEN, token);
        localStorage.setItem(EyeDocsConfig.STORAGE_KEYS.USER_DATA, JSON.stringify(userData));
        this.state.isAuthenticated = true;
        this.state.currentUser = userData;
    },
    
    /**
     * Clear authentication data
     */
    clearAuthData: function() {
        localStorage.removeItem(EyeDocsConfig.STORAGE_KEYS.AUTH_TOKEN);
        localStorage.removeItem(EyeDocsConfig.STORAGE_KEYS.USER_DATA);
        this.state.isAuthenticated = false;
        this.state.currentUser = null;
    },
    
    /**
     * Logout user
     */
    logout: function() {
        this.clearAuthData();
        this.showAlert('Logged out successfully', 'info');
        // Redirect to login page if needed
        // window.location.href = 'login.html';
    },
    
    // UI Helper Methods
    
    /**
     * Show alert message
     */
    showAlert: function(message, type = 'info', duration = 5000) {
        const alertContainer = document.getElementById('alert-container');
        if (!alertContainer) return;
        
        const alertId = 'alert-' + Date.now();
        const alertHtml = `
            <div id="${alertId}" class="alert alert-${type} alert-dismissible fade show" role="alert">
                <i class="bi bi-${this.getAlertIcon(type)} me-2"></i>
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `;
        
        alertContainer.insertAdjacentHTML('beforeend', alertHtml);
        
        // Auto-dismiss after duration
        if (duration > 0) {
            setTimeout(() => {
                const alertElement = document.getElementById(alertId);
                if (alertElement) {
                    const alert = new bootstrap.Alert(alertElement);
                    alert.close();
                }
            }, duration);
        }
    },
    
    /**
     * Get icon for alert type
     */
    getAlertIcon: function(type) {
        const icons = {
            success: 'check-circle',
            danger: 'exclamation-triangle',
            warning: 'exclamation-triangle',
            info: 'info-circle',
            primary: 'info-circle',
            secondary: 'info-circle',
            light: 'info-circle',
            dark: 'info-circle'
        };
        return icons[type] || 'info-circle';
    },
    
    /**
     * Show loading state
     */
    showLoading: function(elementId = null) {
        if (elementId) {
            const element = document.getElementById(elementId);
            if (element) {
                element.innerHTML = '<div class="text-center p-3"><div class="spinner-border text-primary" role="status"></div><p class="mt-2">Loading...</p></div>';
            }
        } else {
            this.state.loading = true;
        }
    },
    
    /**
     * Hide loading state
     */
    hideLoading: function(elementId = null) {
        if (elementId) {
            // Implementation depends on specific use case
        } else {
            this.state.loading = false;
        }
    },
    
    /**
     * Update timestamp display
     */
    updateTimestamp: function() {
        const timestampElement = document.getElementById('last-updated');
        if (timestampElement) {
            timestampElement.textContent = new Date().toLocaleString();
        }
        this.state.lastUpdate = new Date();
    },
    
    /**
     * Format date for display
     */
    formatDate: function(dateString, options = {}) {
        if (!dateString) return 'N/A';
        
        const defaultOptions = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        
        const formatOptions = { ...defaultOptions, ...options };
        return new Date(dateString).toLocaleDateString('en-UK', formatOptions);
    },
    
    /**
     * Format status badge
     */
    formatStatusBadge: function(status) {
        const config = EyeDocsConfig.getStatusConfig(status);
        return `<span class="badge bg-${config.class}">${config.label}</span>`;
    },
    
    /**
     * Format urgency badge
     */
    formatUrgencyBadge: function(urgency) {
        const config = EyeDocsConfig.getUrgencyConfig(urgency);
        return `<span class="badge bg-${config.class}">${config.label}</span>`;
    },
    
    // Utility Methods
    
    /**
     * Delay execution
     */
    delay: function(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },
    
    /**
     * Debounce function calls
     */
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    /**
     * Start auto-refresh timer
     */
    startAutoRefresh: function() {
        setInterval(() => {
            if (typeof refreshData === 'function') {
                refreshData();
            }
        }, EyeDocsConfig.UI.AUTO_REFRESH_INTERVAL);
    },
    
    /**
     * Logging methods
     */
    log: function(message, data = null) {
        if (EyeDocsConfig.DEBUG) {
            console.log(`[EyeDocs] ${message}`, data || '');
        }
    },
    
    logError: function(message, error = null) {
        console.error(`[EyeDocs] ${message}`, error || '');
    },
    
    logWarning: function(message, data = null) {
        if (EyeDocsConfig.DEBUG) {
            console.warn(`[EyeDocs] ${message}`, data || '');
        }
    }
};

// Global helper functions
window.testAPI = function() {
    EyeDocsApp.testAPI();
};

window.logout = function() {
    EyeDocsApp.logout();
};

window.showAlert = function(message, type, duration) {
    EyeDocsApp.showAlert(message, type, duration);
};

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    EyeDocsApp.init();
});

// Export for modules if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EyeDocsApp;
}