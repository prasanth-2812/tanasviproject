// Debug test to check what's happening
console.log('Testing backend startup...');

try {
  require('dotenv').config();
  console.log('✅ dotenv loaded');
  
  const express = require('express');
  console.log('✅ express loaded');
  
  const app = express();
  console.log('✅ app created');
  
  app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'Backend is running' });
  });
  console.log('✅ health route added');
  
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
  });
  
} catch (error) {
  console.error('❌ Error:', error.message);
  console.error('Stack:', error.stack);
}
