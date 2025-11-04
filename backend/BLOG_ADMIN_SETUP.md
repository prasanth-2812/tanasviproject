# Blog Admin Setup Guide

## Issue: "Unauthorized" Error When Posting Blogs

If you're getting an "Unauthorized" error when trying to post blogs, it means the `ADMIN_TOKEN` environment variable is not set in your backend.

## Solution

1. **Create or edit the `.env` file** in the `backend` folder:
   ```bash
   cd backend
   ```

2. **Add the ADMIN_TOKEN** to your `.env` file:
   ```
   ADMIN_TOKEN=your-secure-admin-token-here
   ```
   
   Replace `your-secure-admin-token-here` with a strong, random token. For example:
   ```
   ADMIN_TOKEN=tanasvi_admin_2024_secure_token_xyz123
   ```

3. **Restart your backend server** for the changes to take effect:
   ```bash
   npm start
   # or
   node start.js
   ```

4. **Enter the same token** in the frontend when prompted:
   - When you visit the Blog Admin page, you'll be prompted to enter an admin token
   - Enter the exact same token you set in the `.env` file
   - The token is stored in your browser's session storage

## Important Notes

- **Security**: Use a strong, random token. Don't use simple words or common passwords.
- **Matching Tokens**: The token entered in the frontend must exactly match the `ADMIN_TOKEN` in your backend `.env` file.
- **No Spaces**: Make sure there are no leading or trailing spaces in your token.
- **Environment Variables**: The `.env` file should be in the `backend` folder, not the root folder.

## Example `.env` File

```env
# Server Configuration
NODE_ENV=development
PORT=5000

# Admin Token for Blog Management
ADMIN_TOKEN=your-secure-admin-token-here

# Email Configuration (Gmail SMTP)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Company Email
OWNER_EMAIL=info@tanasvi.com

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001,https://tanasvi.com

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# File Upload
MAX_FILE_SIZE=5242880
ALLOWED_FILE_TYPES=pdf,doc,docx
```

## Troubleshooting

1. **Still getting "Unauthorized"?**
   - Check that the `.env` file is in the `backend` folder
   - Verify the token in `.env` matches exactly what you enter in the frontend
   - Make sure you restarted the backend server after adding the token
   - Check the backend console for error messages

2. **Token not working?**
   - Clear your browser's session storage: `sessionStorage.removeItem('ADMIN_TOKEN')` in the browser console
   - Refresh the page and enter the token again
   - Check for extra spaces or characters in the token

3. **Server error: "ADMIN_TOKEN not set"?**
   - The `.env` file might not be loaded properly
   - Make sure `dotenv` is installed: `npm install dotenv`
   - Check that `require('dotenv').config()` is at the top of `app.js`

