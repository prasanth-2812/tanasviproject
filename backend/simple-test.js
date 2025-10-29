// Simple test to check if the app loads correctly
console.log('Testing app.js...');

try {
  const app = require('./src/app.js');
  console.log('✅ App loaded successfully');
  console.log('✅ Routes should be available');
} catch (error) {
  console.error('❌ Error loading app:', error.message);
  console.error('Stack:', error.stack);
}
