// API Configuration - Force correct backend URL
export const API_CONFIG = {
  BASE_URL: 'https://eyedocs-ktp-production.up.railway.app/api',
  TIMEOUT: 15000,
  HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
};

// Force log the configuration
console.log('🔧 API CONFIG LOADED:', API_CONFIG);
console.log('🔧 Backend URL:', API_CONFIG.BASE_URL);
