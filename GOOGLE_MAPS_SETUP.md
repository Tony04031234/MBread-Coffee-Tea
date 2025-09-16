# Google Maps API Setup Guide

This application uses Google Maps API for address autocomplete and location services. Follow these steps to set up the API:

## 1. Get Google Maps API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the following APIs:
   - **Places API** (for address autocomplete)
   - **Geocoding API** (for reverse geocoding)
   - **Maps JavaScript API** (for the maps functionality)

## 2. Create API Key

1. Go to "Credentials" in the Google Cloud Console
2. Click "Create Credentials" → "API Key"
3. Copy the generated API key
4. (Optional) Restrict the API key to your domain for security

## 3. Configure Environment Variables

Create a `.env.local` file in the project root and add:

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

Replace `your_google_maps_api_key_here` with your actual API key.

## 4. API Usage and Billing

- **Places API**: Charges per request for autocomplete suggestions
- **Geocoding API**: Charges per request for reverse geocoding
- **Free Tier**: Google provides $200 free credit per month

## 5. Features Implemented

### Address Autocomplete
- Real-time address suggestions as user types
- Restricted to Vietnam addresses
- Loading states and error handling

### Location Detection
- GPS-based current location detection
- Reverse geocoding to get address from coordinates
- Fallback to manual input if GPS fails

### Place Details
- Detailed address information from Google Places
- Coordinates for future mapping features
- Structured address data

## 6. Error Handling

The application gracefully handles:
- API key not configured
- Network failures
- GPS permission denied
- Invalid addresses
- Rate limiting

## 7. Security Notes

- Never commit your API key to version control
- Use environment variables for API keys
- Consider restricting API key to specific domains/IPs
- Monitor usage in Google Cloud Console

## 8. Testing

To test the integration:
1. Set up your API key in `.env.local`
2. Start the development server: `npm run dev`
3. Go to the ordering page
4. Try the "Tự động lấy vị trí hiện tại" button
5. Type in the address input to see autocomplete suggestions

## 9. Production Deployment

For production:
1. Set the environment variable in your hosting platform
2. Ensure the API key has proper restrictions
3. Monitor usage and costs in Google Cloud Console
4. Consider implementing caching for frequently searched addresses
