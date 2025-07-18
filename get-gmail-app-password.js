// Gmail App Password Generator Helper
// This script will guide you through getting your Gmail App Password

console.log('🔐 Gmail App Password Setup Guide');
console.log('=====================================\n');

console.log('Your current credentials:');
console.log('📧 Email: roygoblin583@gmail.com');
console.log('🔑 Password: Amit@3028 (This needs to be changed to App Password)\n');

console.log('📋 STEP-BY-STEP INSTRUCTIONS:');
console.log('==============================\n');

console.log('1️⃣  ENABLE 2-FACTOR AUTHENTICATION:');
console.log('   • Open: https://myaccount.google.com/security');
console.log('   • Click "2-Step Verification"');
console.log('   • Follow the setup process (use your phone number)');
console.log('   • Complete the verification\n');

console.log('2️⃣  GENERATE APP PASSWORD:');
console.log('   • After enabling 2FA, go back to Security page');
console.log('   • Click "2-Step Verification" again');
console.log('   • Scroll down and click "App passwords"');
console.log('   • Select "Mail" as the app type');
console.log('   • Select "Windows Computer" as device');
console.log('   • Click "Generate"');
console.log('   • Copy the 16-character password (like: abcd efgh ijkl mnop)\n');

console.log('3️⃣  UPDATE YOUR .ENV FILE:');
console.log('   • Replace this line in .env:');
console.log('     EMAIL_PASS=Amit@3028');
console.log('   • With your new App Password (remove spaces):');
console.log('     EMAIL_PASS=abcdefghijklmnop\n');

console.log('4️⃣  RESTART THE SERVER:');
console.log('   • Stop the current server (Ctrl+C)');
console.log('   • Run: npm start');
console.log('   • Test the contact form\n');

console.log('🚨 IMPORTANT NOTES:');
console.log('==================');
console.log('• Use the App Password, NOT your regular Gmail password');
console.log('• Remove all spaces from the App Password');
console.log('• Keep your App Password secure');
console.log('• The App Password is only for this application\n');

console.log('❓ TROUBLESHOOTING:');
console.log('==================');
console.log('• If 2FA is already enabled, go directly to App Passwords');
console.log('• If you don\'t see App Passwords option, make sure 2FA is fully set up');
console.log('• If it still doesn\'t work, try generating a new App Password\n');

console.log('✅ Once completed, your contact form will send emails successfully!');

// Auto-open the Google Security page
const { exec } = require('child_process');
console.log('🌐 Opening Google Account Security page...');
exec('start https://myaccount.google.com/security', (error) => {
    if (error) {
        console.log('Please manually open: https://myaccount.google.com/security');
    }
});