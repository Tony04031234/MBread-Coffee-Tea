# Google OAuth Setup Guide

This guide will help you set up Google OAuth authentication for the MBread Coffee & Tea application.

## Prerequisites

- A Google Cloud Platform account
- Access to the Google Cloud Console

## Step 1: Create a Google Cloud Project

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Note down your project ID

## Step 2: Enable Google+ API

1. In the Google Cloud Console, go to "APIs & Services" > "Library"
2. Search for "Google+ API" and enable it
3. Also enable "Google Identity" API

## Step 3: Create OAuth 2.0 Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth client ID"
3. If prompted, configure the OAuth consent screen first:
   - Choose "External" user type
   - Fill in the required fields:
     - App name: "MBread Coffee & Tea"
     - User support email: Your email
     - Developer contact information: Your email
   - Add scopes: `email`, `profile`, `openid`
   - Add test users (for development)

4. Create the OAuth client ID:
   - Application type: "Web application"
   - Name: "MBread Coffee & Tea Web Client"
   - Authorized JavaScript origins:
     - `http://localhost:3000` (for development)
     - `http://localhost:3001` (if port 3000 is busy)
     - Your production domain (e.g., `https://yourdomain.com`)
   - Authorized redirect URIs:
     - `http://localhost:3000/api/auth/callback/google` (for development)
     - `http://localhost:3001/api/auth/callback/google` (if port 3000 is busy)
     - `https://yourdomain.com/api/auth/callback/google` (for production)

## Step 4: Get Your Credentials

1. After creating the OAuth client, you'll see a popup with your credentials
2. Copy the "Client ID" and "Client Secret"
3. Keep these credentials secure

## Step 5: Configure Environment Variables

1. Copy your `.env.example` to `.env.local`
2. Add your Google OAuth credentials:

```env
# Google OAuth Configuration
GOOGLE_CLIENT_ID=your-google-client-id-here
GOOGLE_CLIENT_SECRET=your-google-client-secret-here
```

## Step 6: Test the Integration

1. Start your development server: `npm run dev`
2. Go to `http://localhost:3000/auth/signin` or `http://localhost:3000/auth/signup`
3. Click the "Đăng nhập với Google" or "Đăng ký với Google" button
4. You should be redirected to Google's OAuth consent screen
5. After authorization, you should be redirected back to your app

## Troubleshooting

### Common Issues

1. **"redirect_uri_mismatch" error**
   - Make sure your redirect URI in Google Console matches exactly: `http://localhost:3000/api/auth/callback/google`
   - Check for trailing slashes or protocol mismatches

2. **"access_denied" error**
   - Make sure your OAuth consent screen is properly configured
   - Add your email as a test user if the app is in testing mode

3. **"invalid_client" error**
   - Double-check your Client ID and Client Secret
   - Make sure they're correctly set in your environment variables

4. **App not verified warning**
   - This is normal for development. Click "Advanced" > "Go to [App Name] (unsafe)"
   - For production, you'll need to submit your app for verification

### Development vs Production

- **Development**: Use `http://localhost:3000` or `http://localhost:3001`
- **Production**: Replace with your actual domain
- **HTTPS**: Production must use HTTPS for OAuth to work

## Security Notes

- Never commit your Client Secret to version control
- Use environment variables for all sensitive data
- Regularly rotate your credentials
- Monitor your OAuth usage in Google Cloud Console

## Additional Resources

- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [NextAuth.js Google Provider](https://next-auth.js.org/providers/google)
- [Google Cloud Console](https://console.cloud.google.com/)

## Support

If you encounter any issues, check:
1. Google Cloud Console for error logs
2. Browser developer tools for network errors
3. Your application logs for authentication errors
