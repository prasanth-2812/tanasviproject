#!/usr/bin/env node

/**
 * Script to fix .env file - add ADMIN_TOKEN if missing
 */

const path = require('path');
const fs = require('fs');

const envPath = path.join(__dirname, '.env');

if (!fs.existsSync(envPath)) {
  console.error('❌ .env file not found at:', envPath);
  process.exit(1);
}

console.log('📋 Reading .env file...');
const envContent = fs.readFileSync(envPath, 'utf8');
const lines = envContent.split('\n');

console.log('\n📝 Current .env file content (masked):');
lines.forEach((line, index) => {
  const trimmed = line.trim();
  if (!trimmed) {
    console.log(`   ${index + 1}: (empty line)`);
  } else if (trimmed.startsWith('#')) {
    console.log(`   ${index + 1}: ${trimmed}`);
  } else {
    const [key, ...valueParts] = trimmed.split('=');
    const value = valueParts.join('=');
    if (key === 'ADMIN_TOKEN') {
      console.log(`   ${index + 1}: ADMIN_TOKEN=${value.substring(0, 3)}***`);
    } else if (key === 'EMAIL_PASS' || key === 'AWS_SECRET_ACCESS_KEY') {
      console.log(`   ${index + 1}: ${key}=***`);
    } else {
      console.log(`   ${index + 1}: ${trimmed}`);
    }
  }
});

// Check if ADMIN_TOKEN exists
let hasAdminToken = false;
let adminTokenLine = -1;

lines.forEach((line, index) => {
  const trimmed = line.trim();
  if (trimmed.startsWith('ADMIN_TOKEN=')) {
    hasAdminToken = true;
    adminTokenLine = index;
    const value = trimmed.substring('ADMIN_TOKEN='.length).trim();
    if (!value) {
      console.log(`\n⚠️  ADMIN_TOKEN found on line ${index + 1} but value is empty`);
    } else {
      console.log(`\n✅ ADMIN_TOKEN found on line ${index + 1}: ${value.substring(0, 3)}***`);
    }
  }
});

if (!hasAdminToken) {
  console.log('\n❌ ADMIN_TOKEN not found in .env file');
  console.log('\n🔧 Adding ADMIN_TOKEN to .env file...');
  
  // Add ADMIN_TOKEN at the end
  const newLine = '\n# Admin Token for Blog Management\nADMIN_TOKEN=Tanasvi@123\n';
  fs.appendFileSync(envPath, newLine);
  
  console.log('✅ Added ADMIN_TOKEN=Tanasvi@123 to .env file');
  console.log('\n📝 Please restart your backend server for changes to take effect');
} else {
  // Check if the line has issues
  const line = lines[adminTokenLine];
  const trimmed = line.trim();
  
  // Check for common issues
  if (trimmed.includes('#') && !trimmed.startsWith('#')) {
    console.log('\n⚠️  WARNING: ADMIN_TOKEN line has a comment after it. This might cause issues.');
    console.log(`   Current line: ${trimmed}`);
    console.log('   Fix: Remove any comments or quotes around the value');
  }
  
  if (trimmed.includes('"') || trimmed.includes("'")) {
    console.log('\n⚠️  WARNING: ADMIN_TOKEN has quotes around it. Remove quotes.');
  }
  
  // Check if there are spaces around =
  if (trimmed.match(/ADMIN_TOKEN\s+=\s+/) || trimmed.match(/ADMIN_TOKEN\s=/)) {
    console.log('\n⚠️  WARNING: ADMIN_TOKEN has spaces around =. Remove spaces.');
  }
  
  // Try to extract and test the value
  const match = trimmed.match(/ADMIN_TOKEN=(.+?)(\s*#|$)/);
  if (match) {
    const value = match[1].trim().replace(/^["']|["']$/g, '');
    console.log(`\n✅ ADMIN_TOKEN value extracted: ${value.substring(0, 3)}*** (${value.length} chars)`);
    
    // Test if it loads correctly
    const dotenv = require('dotenv');
    const result = dotenv.config({ path: envPath });
    
    if (process.env.ADMIN_TOKEN) {
      console.log('✅ ADMIN_TOKEN loads correctly with dotenv');
    } else {
      console.log('❌ ADMIN_TOKEN does NOT load with dotenv');
      console.log('   This might be a formatting issue in the .env file');
    }
  }
}

console.log('\n' + '='.repeat(50));

