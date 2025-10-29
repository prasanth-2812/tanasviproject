require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

// Import routes
const contactRoutes = require('./routes/contact');
const careerRoutes = require('./routes/career');

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:3001',
      'https://tanasvi.com',
      'https://www.tanasvi.com'
    ];
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      // For development, allow all origins
      if (process.env.NODE_ENV === 'development') {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

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

// API routes
app.use('/api/contact', contactRoutes);
app.use('/api/career', careerRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'API endpoint not found',
    message: 'The requested endpoint does not exist',
    availableEndpoints: [
      'GET /health',
      'POST /api/contact/send',
      'POST /api/career/apply'
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
  console.log(`🔒 CORS enabled for: ${process.env.NODE_ENV === 'production' ? 'Production domains' : 'Development domains'}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
});

module.exports = app;
