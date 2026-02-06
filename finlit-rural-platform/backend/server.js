// backend/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Import routes
const healthRoutes = require('./routes/health');
const schemesRoutes = require('./routes/schemes');

// Use routes
app.use('/api/health', healthRoutes);
app.use('/api/schemes', schemesRoutes);

// Basic route for testing
app.get('/', (req, res) => {
  res.json({
    message: 'Financial Literacy Backend API',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      health: '/api/health',
      schemes: '/api/schemes',
      lessons: '/api/lessons (coming soon)',
      stories: '/api/stories (coming soon)'
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Cannot ${req.method} ${req.path}`,
    availableEndpoints: ['/api/health', '/api/schemes']
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  
  // Don't leak stack trace in production
  const errorResponse = {
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  };
  
  if (process.env.NODE_ENV === 'development') {
    errorResponse.stack = err.stack;
  }
  
  res.status(err.status || 500).json(errorResponse);
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on port ${PORT}`);
  console.log(`📡 API Base URL: http://localhost:${PORT}/api`);
  console.log(`🔗 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
  console.log(`⚙️  Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;