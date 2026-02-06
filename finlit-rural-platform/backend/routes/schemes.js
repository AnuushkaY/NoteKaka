// backend/routes/schemes.js
const express = require('express');
const router = express.Router();
const schemes = require('../data/schemes.json');

// GET /api/schemes - Get all schemes
router.get('/', (req, res) => {
  try {
    // Add artificial delay to simulate real API (optional)
    const delay = parseInt(req.query.delay) || 0;
    
    setTimeout(() => {
      res.json({
        success: true,
        count: schemes.length,
        data: schemes,
        timestamp: new Date().toISOString(),
        source: 'api'
      });
    }, delay);
  } catch (error) {
    console.error('Error fetching schemes:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch schemes',
      message: error.message
    });
  }
});

// GET /api/schemes/:id - Get single scheme
router.get('/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const scheme = schemes.find(s => s.id === id);
    
    if (!scheme) {
      return res.status(404).json({
        success: false,
        error: 'Scheme not found',
        message: `No scheme found with ID ${id}`
      });
    }
    
    res.json({
      success: true,
      data: scheme,
      timestamp: new Date().toISOString(),
      source: 'api'
    });
  } catch (error) {
    console.error('Error fetching scheme:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch scheme',
      message: error.message
    });
  }
});

// GET /api/schemes/category/:category - Get schemes by category
router.get('/category/:category', (req, res) => {
  try {
    const category = req.params.category;
    const filteredSchemes = schemes.filter(s => 
      s.category.toLowerCase() === category.toLowerCase()
    );
    
    res.json({
      success: true,
      count: filteredSchemes.length,
      data: filteredSchemes,
      timestamp: new Date().toISOString(),
      source: 'api'
    });
  } catch (error) {
    console.error('Error filtering schemes:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to filter schemes',
      message: error.message
    });
  }
});

// GET /api/schemes/search?q=query - Search schemes
router.get('/search', (req, res) => {
  try {
    const query = req.query.q?.toLowerCase() || '';
    
    if (!query) {
      return res.json({
        success: true,
        count: 0,
        data: [],
        message: 'Please provide a search query',
        timestamp: new Date().toISOString()
      });
    }
    
    const filteredSchemes = schemes.filter(scheme => 
      scheme.name.toLowerCase().includes(query) ||
      scheme.description.toLowerCase().includes(query) ||
      scheme.benefits.toLowerCase().includes(query) ||
      scheme.category.toLowerCase().includes(query)
    );
    
    res.json({
      success: true,
      count: filteredSchemes.length,
      data: filteredSchemes,
      timestamp: new Date().toISOString(),
      source: 'api'
    });
  } catch (error) {
    console.error('Error searching schemes:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to search schemes',
      message: error.message
    });
  }
});

module.exports = router;