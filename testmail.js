require('dotenv').config();
const nodemailer = require('nodemailer');

console.log('=== Gmail SMTP Test Script ===');
console.log('Environment variables:');
console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_HOST:', process.env.EMAIL_HOST);
console.log('EMAIL_PORT:', process.env.EMAIL_PORT);
console.log('EMAIL_SECURE:', process.env.EMAIL_SECURE);
console.log('OWNER_EMAIL:', process.env.OWNER_EMAIL);
console.log('');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT, 10),
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  debug: true, // Enable debug output
  logger: true, // Log to console
});

async function testSMTP() {
  console.log('Testing SMTP connection...');
  
  try {
    // First, verify the connection
    console.log('1. Verifying SMTP connection...');
    await transporter.verify();
    console.log('✅ SMTP connection verified successfully!');
    
    // Then, try to send a test email
    console.log('2. Sending test email...');
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.OWNER_EMAIL,
      subject: 'SMTP Test Email - Tanasvi Technologies',
      text: 'This is a test email sent from testmail.js using your Gmail SMTP setup.',
      html: '<p>This is a test email sent from <strong>testmail.js</strong> using your Gmail SMTP setup.</p>',
    });
    
    console.log('✅ Test email sent successfully!');
    console.log('Message ID:', info.messageId);
    console.log('Response:', info.response);
    
  } catch (error) {
    console.error('❌ Error occurred:');
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
    console.error('Full error:', error);
    
    if (error.code === 'EAUTH') {
      console.error('\n🔐 AUTHENTICATION ERROR:');
      console.error('- Check if your Gmail app password is correct');
      console.error('- Make sure 2-factor authentication is enabled on your Gmail account');
      console.error('- Verify the app password was generated for "Mail" access');
    } else if (error.code === 'ETIMEDOUT' || error.code === 'ESOCKET') {
      console.error('\n🌐 NETWORK ERROR:');
      console.error('- Check your internet connection');
      console.error('- Check if port 587 is blocked by firewall');
      console.error('- Try using port 465 with secure: true');
    } else if (error.code === 'EENVELOPE' || error.responseCode === 550) {
      console.error('\n📧 ENVELOPE ERROR:');
      console.error('- Check if the email addresses are valid');
      console.error('- Verify the sender email matches your Gmail account');
    }
  }
}

testSMTP(); 