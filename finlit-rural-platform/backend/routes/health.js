// backend/routes/health.js
const express = require('express');
const router = express.Router();

// GET /api/health - Simple health check
router.get('/', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// GET /api/health/ready - Readiness check (for deployments)
router.get('/ready', (req, res) => {
  // Add your readiness checks here
  // For now, just return healthy if server is running
  res.json({
    status: 'ready',
    checks: {
      server: 'up',
      // database: 'connected', // Add when you have a DB
      // cache: 'connected',    // Add when you have cache
    }
  });
});

// GET /api/health/live - Liveness check
router.get('/live', (req, res) => {
  res.json({ status: 'alive' });
});

module.exports = router;