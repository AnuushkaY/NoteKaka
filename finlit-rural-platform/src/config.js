// src/config.js
const config = {
  // Feature flags - can be controlled via environment variables
  useApi: process.env.REACT_APP_USE_API === 'true',
  apiBaseUrl: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  
  // Timeouts in milliseconds
  apiTimeout: 10000, // 10 seconds
  
  // Retry configuration
  maxRetries: 2,
  retryDelay: 1000,
  
  // Fallback settings
  useHardcodedFallback: true,
  fallbackDelay: 500, // Artificial delay for consistency
};

// Development defaults (overridden by .env in production)
if (process.env.NODE_ENV === 'development') {
  config.useApi = config.useApi || false; // Default to false in dev
  console.log('Running in development mode. API usage:', config.useApi);
}

export default config;