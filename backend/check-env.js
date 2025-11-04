#!/usr/bin/env node

/**
 * Script to check if .env file is properly configured
 */

const path = require('path');
const fs = require('fs');

console.log('🔍 Checking .env file configuration...\n');

const envPath = path.join(__dirname, '.env');

if (!fs.existsSync(envPath)) {
  console.error('❌ .env file not found at:', envPath);
  console.log('\n📝 Please create a .env file in the backend directory with the following content:');
  console.log('   ADMIN_TOKEN=Tanasvi@123');
  process.exit(1);
}

console.log('✅ .env file found at:', envPath);

// Read and parse .env file manually
const envContent = fs.readFileSync(envPath, 'utf8');
const lines = envContent.split('\n');

console.log('\n📋 Parsing .env file...');
let adminTokenFound = false;
let issues = [];

lines.forEach((line, index) => {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) {
    return; // Skip empty lines and comments
  }
  
  if (trimmed.startsWith('ADMIN_TOKEN=')) {
    adminTokenFound = true;
    const value = trimmed.substring('ADMIN_TOKEN='.length).trim();
    if (!value) {
      issues.push(`Line ${index + 1}: ADMIN_TOKEN is empty`);
    } else {
      console.log(`✅ ADMIN_TOKEN found: ${value.substring(0, 3)}*** (${value.length} characters)`);
    }
  }
});

if (!adminTokenFound) {
  issues.push('ADMIN_TOKEN variable not found in .env file');
}

// Load with dotenv and check
const dotenv = require('dotenv');
const result = dotenv.config({ path: envPath });

if (result.error) {
  console.error('\n❌ Error loading .env file:', result.error.message);
  issues.push(`Dotenv error: ${result.error.message}`);
} else {
  console.log('\n✅ dotenv loaded successfully');
  
  if (process.env.ADMIN_TOKEN) {
    console.log(`✅ ADMIN_TOKEN loaded: ${process.env.ADMIN_TOKEN.substring(0, 3)}*** (${process.env.ADMIN_TOKEN.length} characters)`);
  } else {
    issues.push('ADMIN_TOKEN not accessible via process.env after dotenv.config()');
  }
}

// Summary
console.log('\n' + '='.repeat(50));
if (issues.length === 0) {
  console.log('✅ All checks passed! ADMIN_TOKEN is properly configured.');
  console.log('\n💡 Next steps:');
  console.log('   1. Restart your backend server: npm start');
  console.log('   2. Use the token "Tanasvi@123" in the Blog Admin page');
} else {
  console.log('❌ Issues found:');
  issues.forEach(issue => console.log(`   - ${issue}`));
  console.log('\n📝 Fix suggestions:');
  console.log('   1. Make sure ADMIN_TOKEN=Tanasvi@123 is in your .env file');
  console.log('   2. Make sure there are no spaces around the = sign');
  console.log('   3. Make sure the .env file is in the backend directory');
  console.log('   4. Restart the server after making changes');
  process.exit(1);
}

