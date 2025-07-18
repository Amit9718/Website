# Gmail Setup Guide for Portfolio Contact Form

## Current Issue

The contact form is showing authentication errors because Gmail requires an "App Password" instead of your regular password for third-party applications.

## How to Fix Gmail Authentication

### Step 1: Enable 2-Factor Authentication

1. Go to your Google Account: https://myaccount.google.com/
2. Click on "Security" in the left sidebar
3. Under "How you sign in to Google", click "2-Step Verification"
4. Follow the setup process to enable 2FA

### Step 2: Generate App Password

1. After enabling 2FA, go back to Security settings
2. Click on "2-Step Verification"
3. Scroll down and click "App passwords"
4. Select "Mail" as the app
5. Select "Windows Computer" (or your device)
6. Click "Generate"
7. Copy the 16-character password (it will look like: `abcd efgh ijkl mnop`)

### Step 3: Update .env File

Replace the current password in your `.env` file:

```env
# Replace this line:
EMAIL_PASS=Amit@3028

# With your new app password (remove spaces):
EMAIL_PASS=abcdefghijklmnop
```

## Alternative: Test Without Email

The server is now configured to work even without email setup. Contact form submissions will be logged to the console, so you can still test the functionality.

## Testing the Setup

1. **Start the server:**

   ```bash
   npm start
   ```

2. **Visit:** http://localhost:3000

3. **Test contact form:**
   - Fill out the form and submit
   - Check the terminal/console for logs
   - If email is configured correctly, you'll receive an email
   - If not, the data will be logged to console

## Troubleshooting

### If you still get authentication errors:

1. Make sure 2FA is enabled on your Google account
2. Use the App Password (not your regular password)
3. Remove any spaces from the App Password
4. Restart the server after updating .env

### If you don't want to use Gmail:

You can disable email functionality and just log form submissions by commenting out the email configuration in `server.js`.

## Security Note

Never commit your actual passwords to version control. The `.env` file should be added to `.gitignore`.
