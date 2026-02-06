// src/utils/apiHelper.js
import config from '../config.js';

class ApiHelper {
  constructor() {
    this.isApiAvailable = false;
    this.checkApiHealth();
  }

  async checkApiHealth() {
    if (!config.useApi) {
      console.log('API usage disabled in config');
      return false;
    }

    try {
      const response = await fetch(`${config.apiBaseUrl}/health`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        signal: AbortSignal.timeout(3000), // Quick health check
      });
      
      this.isApiAvailable = response.ok;
      console.log('API health check:', this.isApiAvailable ? 'Available' : 'Unavailable');
      return this.isApiAvailable;
    } catch (error) {
      console.log('API health check failed, using fallback mode');
      this.isApiAvailable = false;
      return false;
    }
  }

  async fetchWithFallback(endpoint, options = {}) {
    // If API is disabled in config, skip entirely
    if (!config.useApi) {
      console.log(`API disabled for ${endpoint}, using fallback`);
      return { success: false, data: null, fromFallback: true };
    }

    // Check API health first (cached result)
    if (!this.isApiAvailable) {
      const isHealthy = await this.checkApiHealth();
      if (!isHealthy) {
        return { success: false, data: null, fromFallback: true };
      }
    }

    // Try API with retries
    for (let attempt = 0; attempt <= config.maxRetries; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), config.apiTimeout);

        const response = await fetch(`${config.apiBaseUrl}${endpoint}`, {
          ...options,
          signal: controller.signal,
          headers: {
            'Content-Type': 'application/json',
            ...options.headers,
          },
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        console.log(`API ${endpoint}: Success`);
        
        return {
          success: true,
          data,
          fromFallback: false,
          status: response.status,
        };

      } catch (error) {
        console.warn(`API ${endpoint} attempt ${attempt + 1} failed:`, error.message);
        
        if (attempt === config.maxRetries) {
          this.isApiAvailable = false; // Mark API as unhealthy
          break;
        }
        
        // Wait before retry
        await new Promise(resolve => setTimeout(resolve, config.retryDelay));
      }
    }

    // All attempts failed, use fallback
    return { success: false, data: null, fromFallback: true };
  }

  // Helper for common API patterns
  async get(endpoint) {
    return this.fetchWithFallback(endpoint, { method: 'GET' });
  }

  async post(endpoint, data) {
    return this.fetchWithFallback(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put(endpoint, data) {
    return this.fetchWithFallback(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete(endpoint) {
    return this.fetchWithFallback(endpoint, { method: 'DELETE' });
  }
}

// Singleton instance
export const api = new ApiHelper();

// Fallback delay helper for consistent UX
export const simulateApiDelay = () => {
  return new Promise(resolve => setTimeout(resolve, config.fallbackDelay));
};