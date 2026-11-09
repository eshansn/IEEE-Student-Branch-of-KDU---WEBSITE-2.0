// API Configuration
const API_CONFIG = {
  development: 'http://localhost:3000/api',
  production: 'https://kdu-ieee-backend.vercel.app/api'
};

// Get the current environment
const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
export const API_BASE_URL = isDevelopment ? API_CONFIG.development : API_CONFIG.production;

export default API_BASE_URL;
