#!/usr/bin/env node

/**
 * Tanasvi Technologies Backend Startup Script
 * This script starts the backend server with proper configuration
 */

const path = require('path');
const fs = require('fs');

// Check if .env file exists
const envPath = path.join(__dirname, '.env');
const testEnvPath = path.join(__dirname, 'test.env');

if (!fs.existsSync(envPath) && !fs.existsSync(testEnvPath)) {
  console.log('⚠️  No .env file found. Please copy env.example to .env and configure your settings.');
  console.log('📝 Run: cp env.example .env');
  console.log('🧪 Or use test environment: cp test.env .env');
  process.exit(1);
}

// Load environment variables
require('dotenv').config();

// Validate required environment variables
const requiredVars = ['EMAIL_USER', 'EMAIL_PASS', 'OWNER_EMAIL'];
const missingVars = requiredVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.log('❌ Missing required environment variables:');
  missingVars.forEach(varName => {
    console.log(`   - ${varName}`);
  });
  console.log('\n📝 Please configure these variables in your .env file.');
  process.exit(1);
}

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('📁 Created uploads directory');
}

// Start the application
console.log('🚀 Starting Tanasvi Technologies Backend API...');
console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
console.log(`🔌 Port: ${process.env.PORT || 5000}`);
console.log(`📧 Email: ${process.env.EMAIL_USER}`);

require('./src/app.js');
