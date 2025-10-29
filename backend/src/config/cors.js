const cors = require('cors');

// CORS configuration for different environments
const corsOptions = {
  development: {
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      
      const allowedOrigins = [
        'http://localhost:3000',
        'http://localhost:3001',
        'http://127.0.0.1:3000',
        'http://127.0.0.1:3001',
        'http://localhost:5173', // Vite dev server
        'http://localhost:8080'  // Alternative dev server
      ];
      
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        console.warn(`CORS: Blocked request from origin: ${origin}`);
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type', 
      'Authorization', 
      'X-Requested-With',
      'Accept',
      'Origin'
    ],
    optionsSuccessStatus: 200
  },
  
  production: {
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      
      const allowedOrigins = [
        'https://tanasvi.com',
        'https://www.tanasvi.com',
        'https://tanasvi-technologies.vercel.app',
        'https://tanasvi-technologies.netlify.app'
      ];
      
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        console.warn(`CORS: Blocked production request from origin: ${origin}`);
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type', 
      'Authorization', 
      'X-Requested-With',
      'Accept',
      'Origin'
    ],
    optionsSuccessStatus: 200
  }
};

// Get CORS options based on environment
const getCorsOptions = () => {
  const env = process.env.NODE_ENV || 'development';
  return corsOptions[env] || corsOptions.development;
};

module.exports = {
  corsOptions: getCorsOptions(),
  cors
};
