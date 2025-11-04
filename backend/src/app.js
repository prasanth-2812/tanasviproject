const path = require('path');
// Load environment variables from backend directory (only if not already loaded by start.js)
// This ensures dotenv is loaded even if app.js is run directly
if (!process.env.ADMIN_TOKEN) {
  const envResult = require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
  if (envResult.error && process.env.NODE_ENV !== 'test') {
    console.warn('⚠️  Warning: Could not load .env file:', envResult.error.message);
  }
}

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

// Import routes
const contactRoutes = require('./routes/contact');
const careerRoutes = require('./routes/career');
const blogRoutes = require('./routes/blog');
const analyticsRoutes = require('./routes/analytics');
const trackRoutes = require('./routes/track');

const app = express();
const PORT = process.env.PORT || 5000;

// Trust proxy for correct IP detection (important for production)
// Use 1 for single proxy hop instead of true to avoid rate-limit warnings
app.set('trust proxy', process.env.NODE_ENV === 'production' ? 1 : false);

// CORS configuration - MUST be before other middleware
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:3001',
      'http://localhost:5173',
      'http://127.0.0.1:5173',
      'https://tanasvi.com',
      'https://www.tanasvi.com',
      'https://tanasvi-technologies.vercel.app',
      'https://tanasvi-technologies.netlify.app'
    ];
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      // For development, allow all origins
      if (process.env.NODE_ENV === 'development') {
        callback(null, true);
      } else {
        console.warn(`CORS: Blocked request from origin: ${origin}`);
        callback(new Error('Not allowed by CORS'));
      }
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: [
    'Content-Type', 
    'Authorization', 
    'X-Requested-With',
    'Accept',
    'Origin',
    'Access-Control-Request-Method',
    'Access-Control-Request-Headers'
  ],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  maxAge: 86400 // Cache preflight requests for 24 hours
};

// Apply CORS middleware (automatically handles OPTIONS preflight requests)
app.use(cors(corsOptions));

// Security middleware (after CORS to not interfere with CORS headers)
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:", "http:"],
    },
  },
  crossOriginResourcePolicy: { policy: "cross-origin" }, // Allow cross-origin requests
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.',
    retryAfter: '15 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Compression middleware
app.use(compression());

// Logging middleware
app.use(morgan('combined'));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Tanasvi Technologies Backend API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Static uploads (images for blogs)
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// API routes
app.use('/api/contact', contactRoutes);
app.use('/api/career', careerRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/track', trackRoutes); // POST /api/track
app.use('/api/analytics', analyticsRoutes); // GET /api/analytics and /api/analytics/summary

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'API endpoint not found',
    message: 'The requested endpoint does not exist',
    availableEndpoints: [
      'GET /health',
      'POST /api/contact/send',
      'GET /api/contact/status',
      'POST /api/career/apply',
      'GET /api/blogs',
      'GET /api/blogs/:slug',
      'POST /api/track',
      'GET /api/analytics',
      'GET /api/analytics/summary'
    ]
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('Global error handler:', error);
  
  if (error.message === 'Not allowed by CORS') {
    return res.status(403).json({
      error: 'CORS Error',
      message: 'This origin is not allowed to access this API'
    });
  }
  
  res.status(500).json({
    error: 'Internal Server Error',
    message: 'Something went wrong on our end',
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Tanasvi Technologies Backend API running on http://localhost:${PORT}`);
  console.log(`📧 Email service: ${process.env.EMAIL_USER ? 'Configured' : 'Not configured'}`);
  console.log(`🔐 Admin token: ${process.env.ADMIN_TOKEN ? 'Set' : 'NOT SET - Blog admin will not work!'}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔒 CORS enabled for: ${process.env.NODE_ENV === 'production' ? 'Production domains' : 'Development domains'}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`✅ CORS allows: https://tanasvi.com, https://www.tanasvi.com`);
});

module.exports = app;
