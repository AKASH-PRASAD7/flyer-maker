const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '.env') });

console.log('=== Environment Variables Test ===');
console.log('Current working directory:', process.cwd());
console.log('.env file path:', path.join(__dirname, '.env'));
console.log('PORT:', process.env.PORT);
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('GEMINI_API_KEY:', process.env.GEMINI_API_KEY ? 'LOADED' : 'NOT LOADED');

if (process.env.GEMINI_API_KEY) {
  console.log('API Key length:', process.env.GEMINI_API_KEY.length);
  console.log('API Key preview:', process.env.GEMINI_API_KEY.substring(0, 15) + '...');
} else {
  console.log('❌ GEMINI_API_KEY is not loaded!');
  console.log('Check:');
  console.log('1. File exists at:', path.join(__dirname, '.env'));
  console.log('2. File content format is correct');
  console.log('3. No extra spaces or special characters');
}

// Test if file exists
const fs = require('fs');
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  console.log('✅ .env file exists');
  const content = fs.readFileSync(envPath, 'utf8');
  console.log('File content:');
  console.log('---');
  console.log(content);
  console.log('---');
} else {
  console.log('❌ .env file does not exist at:', envPath);
}
