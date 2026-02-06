// src/utils/fallbackData.js
import { lessons } from '../data/lessons';
import { stories } from '../data/stories';
import { schemes } from '../data/schemes';
import { dummyData } from '../data/dummyData';

// This file serves as the bridge between hardcoded data and API responses
// It maintains the exact same structure as what the API would return

export const fallbackData = {
  // Schemes endpoint fallback
  '/schemes': {
    success: true,
    data: schemes,
    timestamp: new Date().toISOString(),
    source: 'fallback',
  },

  // Lessons endpoint fallback
  '/lessons': {
    success: true,
    data: lessons,
    timestamp: new Date().toISOString(),
    source: 'fallback',
  },

  // Stories endpoint fallback
  '/stories': {
    success: true,
    data: stories,
    timestamp: new Date().toISOString(),
    source: 'fallback',
  },

  // Dashboard stats fallback
  '/dashboard/stats': {
    success: true,
    data: {
      villagesReached: 2500,
      activeLearners: 150000,
      lessonsAvailable: 48,
      languages: 3,
      updatedAt: new Date().toISOString(),
    },
    source: 'fallback',
  },

  // Success stories fallback
  '/stories/success': {
    success: true,
    data: [
      {
        id: 1,
        name: 'Ram Singh',
        location: 'Rajasthan',
        story: 'Learned crop insurance, saved ₹20,000 in losses',
        image: '👨‍🌾',
      },
      // ... other hardcoded stories
    ],
    source: 'fallback',
  },

  // Helper method to get fallback data
  getFallback(endpoint) {
    const fallback = this[endpoint];
    if (fallback) {
      console.log(`Using fallback data for ${endpoint}`);
      return Promise.resolve(fallback);
    }
    
    console.warn(`No fallback found for ${endpoint}`);
    return Promise.resolve({
      success: false,
      data: null,
      error: 'No fallback data available',
      source: 'fallback',
    });
  },
};

// Export individual getters for easy use
export const getSchemesFallback = () => fallbackData.getFallback('/schemes');
export const getLessonsFallback = () => fallbackData.getFallback('/lessons');
export const getStoriesFallback = () => fallbackData.getFallback('/stories');
export const getDashboardStatsFallback = () => fallbackData.getFallback('/dashboard/stats');