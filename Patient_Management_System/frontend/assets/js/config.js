/**
 * File: config.js
 * Purpose: Frontend configuration for Eye-Docs KTP Demo
 * Created: 2025-01-27 v1.0.0
 * Last Modified: 2025-01-27 v1.0.0
 * Author: AI Development Team
 * 
 * Dependencies: None (must load first)
 * API Endpoints: Configures all API communication
 * 
 * Changelog:
 * v1.0.0 - Initial creation with comprehensive configuration
 */

// Environment detection
const hostname = window.location.hostname;
const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1' || hostname.includes('localhost');
const isProduction = hostname.includes('vercel.app') || hostname.includes('railway.app') || hostname.includes('eyedocs');

// Main configuration object
window.EyeDocsConfig = {
    // Application Information
    APP_NAME: 'ReferralFlow Connect',
    VERSION: '1.0.0',
    ENVIRONMENT: isProduction ? 'production' : 'development',
    DEBUG: !isProduction,
    
    // API Configuration
    API_BASE_URL: isProduction 
        ? 'https://eyedocs-api.railway.app/api'  // Production API URL (update after deployment)
        : 'http://localhost:8000',               // Development API URL (no /api prefix)
    
    API_TIMEOUT: 30000, // 30 seconds
    API_RETRY_ATTEMPTS: 3,
    API_RETRY_DELAY: 1000, // 1 second
    
    // Frontend URLs
    FRONTEND_URL: isProduction 
        ? 'https://eyedocs-demo.vercel.app'     // Production frontend URL
        : 'http://localhost:3000',              // Development frontend URL
    
    // Feature Flags
    FEATURES: {
        SALESFORCE_INTEGRATION: true,
        ANALYTICS_DASHBOARD: true,
        ARIMA_FORECASTING: true,
        REAL_TIME_UPDATES: true,
        USER_AUTHENTICATION: true,
        DEMO_MODE: true,
        EMAIL_NOTIFICATIONS: false,    // Disabled for demo
        FILE_UPLOADS: true,
        AUDIT_LOGGING: true,
        PERFORMANCE_MONITORING: true
    },
    
    // UI Configuration
    UI: {
        ITEMS_PER_PAGE: 20,
        AUTO_REFRESH_INTERVAL: 30000,     // 30 seconds
        NOTIFICATION_TIMEOUT: 5000,       // 5 seconds
        LOADING_TIMEOUT: 10000,           // 10 seconds
        TABLE_PAGE_SIZE: 10,
        CHART_ANIMATION_DURATION: 1000,
        THEME: 'light',                   // light, dark, auto
        SIDEBAR_COLLAPSED: false
    },
    
    // Validation Rules
    VALIDATION: {
        MIN_PASSWORD_LENGTH: 8,
        MAX_PATIENT_NAME_LENGTH: 255,
        MAX_CLINICAL_NOTES_LENGTH: 2000,
        REQUIRED_FIELDS: ['patient_name', 'condition', 'optician_id'],
        EMAIL_PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        PHONE_PATTERN: /^[\+]?[1-9][\d]{0,15}$/,
        NHS_NUMBER_PATTERN: /^\d{10}$/
    },
    
    // Status and Priority Options
    OPTIONS: {
        REFERRAL_STATUS: [
            { value: 'received', label: 'Received', class: 'primary' },
            { value: 'under_review', label: 'Under Review', class: 'warning' },
            { value: 'scheduled', label: 'Scheduled', class: 'info' },
            { value: 'in_progress', label: 'In Progress', class: 'secondary' },
            { value: 'completed', label: 'Completed', class: 'success' },
            { value: 'cancelled', label: 'Cancelled', class: 'danger' },
            { value: 'rejected', label: 'Rejected', class: 'dark' }
        ],
        
        URGENCY_LEVELS: [
            { value: 'routine', label: 'Routine', class: 'success' },
            { value: 'urgent', label: 'Urgent', class: 'warning' },
            { value: 'emergency', label: 'Emergency', class: 'danger' }
        ],
        
        CONDITIONS: [
            { value: 'cataract', label: 'Cataract' },
            { value: 'amd', label: 'Age-related Macular Degeneration (AMD)' },
            { value: 'oculoplastics', label: 'Oculoplastics' },
            { value: 'vitreoretinal', label: 'Vitreoretinal' },
            { value: 'glaucoma', label: 'Glaucoma' },
            { value: 'diabetic_retinopathy', label: 'Diabetic Retinopathy' },
            { value: 'other', label: 'Other' }
        ]
    },
    
    // Chart and Analytics Configuration
    CHARTS: {
        DEFAULT_COLORS: [
            '#0d6efd', '#198754', '#dc3545', '#ffc107', '#6f42c1',
            '#fd7e14', '#20c997', '#0dcaf0', '#6c757d', '#f8f9fa'
        ],
        ANIMATION_DURATION: 750,
        LEGEND_POSITION: 'bottom',
        RESPONSIVE: true,
        MAINTAIN_ASPECT_RATIO: false
    },
    
    // Local Storage Keys
    STORAGE_KEYS: {
        AUTH_TOKEN: 'eyedocs_auth_token',
        USER_DATA: 'eyedocs_user_data',
        USER_PREFERENCES: 'eyedocs_preferences',
        THEME: 'eyedocs_theme',
        LAST_REFRESH: 'eyedocs_last_refresh',
        CACHED_DATA: 'eyedocs_cached_data'
    },
    
    // Error Messages
    MESSAGES: {
        ERROR: {
            NETWORK: 'Network error. Please check your connection and try again.',
            SERVER: 'Server error. Please try again later.',
            VALIDATION: 'Please check the form and correct any errors.',
            UNAUTHORIZED: 'You are not authorized to perform this action.',
            NOT_FOUND: 'The requested resource was not found.',
            TIMEOUT: 'Request timed out. Please try again.',
            GENERIC: 'An unexpected error occurred. Please try again.'
        },
        SUCCESS: {
            SAVE: 'Changes saved successfully.',
            DELETE: 'Item deleted successfully.',
            CREATE: 'Item created successfully.',
            UPDATE: 'Item updated successfully.',
            SYNC: 'Synchronization completed successfully.'
        },
        INFO: {
            LOADING: 'Loading...',
            SAVING: 'Saving...',
            SYNCING: 'Synchronizing...',
            PROCESSING: 'Processing...'
        }
    },
    
    // API Endpoints
    ENDPOINTS: {
        // Authentication
        AUTH_LOGIN: '/auth/login',
        AUTH_LOGOUT: '/auth/logout',
        AUTH_VALIDATE: '/auth/validate',
        
        // System
        STATUS: '/status',
        HEALTH: '/health',
        CONFIG: '/config',
        
        // Opticians
        OPTICIANS: '/opticians',
        OPTICIAN_BY_ID: '/opticians/{id}',
        
        // Referrals
        REFERRALS: '/referrals',
        REFERRAL_BY_ID: '/referrals/{id}',
        REFERRALS_SEARCH: '/referrals/search',
        REFERRALS_STATS: '/referrals/stats',
        
        // Analytics
        ANALYTICS_DASHBOARD: '/analytics/dashboard',
        ANALYTICS_FORECAST: '/analytics/forecast',
        ANALYTICS_TRENDS: '/analytics/trends',
        
        // Salesforce
        SALESFORCE_SYNC: '/salesforce/sync',
        SALESFORCE_STATUS: '/salesforce/status',
        SALESFORCE_TEST: '/salesforce/test'
    }
};

// Utility functions for configuration
window.EyeDocsConfig.isFeatureEnabled = function(feature) {
    return this.FEATURES[feature] === true;
};

window.EyeDocsConfig.getStatusConfig = function(status) {
    return this.OPTIONS.REFERRAL_STATUS.find(s => s.value === status) || 
           { value: status, label: status, class: 'secondary' };
};

window.EyeDocsConfig.getUrgencyConfig = function(urgency) {
    return this.OPTIONS.URGENCY_LEVELS.find(u => u.value === urgency) || 
           { value: urgency, label: urgency, class: 'secondary' };
};

window.EyeDocsConfig.getConditionLabel = function(condition) {
    const conditionConfig = this.OPTIONS.CONDITIONS.find(c => c.value === condition);
    return conditionConfig ? conditionConfig.label : condition;
};

window.EyeDocsConfig.buildEndpointUrl = function(endpoint, params = {}) {
    let url = this.API_BASE_URL + endpoint;
    
    // Replace path parameters
    Object.keys(params).forEach(key => {
        url = url.replace(`{${key}}`, encodeURIComponent(params[key]));
    });
    
    return url;
};

// Freeze configuration to prevent accidental modifications (after adding utility functions)
Object.freeze(EyeDocsConfig.FEATURES);
Object.freeze(EyeDocsConfig.UI);
Object.freeze(EyeDocsConfig.VALIDATION);
Object.freeze(EyeDocsConfig.OPTIONS);
Object.freeze(EyeDocsConfig.CHARTS);
Object.freeze(EyeDocsConfig.STORAGE_KEYS);
Object.freeze(EyeDocsConfig.MESSAGES);
Object.freeze(EyeDocsConfig.ENDPOINTS);
// Note: Don't freeze the main EyeDocsConfig object since we added methods to it

// Initialize configuration logging
if (EyeDocsConfig.DEBUG) {
    console.log(`%c${EyeDocsConfig.APP_NAME} v${EyeDocsConfig.VERSION}`, 
                'color: #0d6efd; font-weight: bold; font-size: 16px;');
    console.log('Environment:', EyeDocsConfig.ENVIRONMENT);
    console.log('API Base URL:', EyeDocsConfig.API_BASE_URL);
    console.log('Features:', EyeDocsConfig.FEATURES);
    console.log('Configuration loaded successfully');
}

// Export for Node.js environments (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EyeDocsConfig;
}