# Firebase Integration Guide

This document outlines the Firebase integration for the MBread Coffee & Tea application.

## Overview

The application now uses Firebase Authentication and Firestore for user management, replacing the previous mock authentication system.

## Features Implemented

### 1. Firebase Authentication
- User registration with email/password
- User sign-in with email/password
- Integration with NextAuth.js for session management
- Custom claims for user roles and points

### 2. Firestore Database
- User data storage with additional fields (phone, role, points)
- Real-time data synchronization
- Structured user documents

### 3. Firebase Admin SDK
- Server-side user management
- Custom claims management
- User data operations

## Configuration

### Environment Variables

Create a `.env.local` file with the following variables:

```env
# NextAuth Configuration
NEXTAUTH_SECRET=your-nextauth-secret-key-here
NEXTAUTH_URL=http://localhost:3000

# Firebase Configuration
FIREBASE_API_KEY=AIzaSyBr2JEI2uWNjsg_VKedt-cl_JjWaJTnmPc
FIREBASE_AUTH_DOMAIN=mbreadcoffeetea-75636.firebaseapp.com
FIREBASE_PROJECT_ID=mbreadcoffeetea-75636
FIREBASE_STORAGE_BUCKET=mbreadcoffeetea-75636.firebasestorage.app
FIREBASE_MESSAGING_SENDER_ID=763070371252
FIREBASE_APP_ID=1:763070371252:web:91beb9b679724d90c54ee1
FIREBASE_MEASUREMENT_ID=G-M693P8FDSY

# Firebase Admin SDK
FIREBASE_ADMIN_PROJECT_ID=mbreadcoffeetea-75636
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n..."
FIREBASE_ADMIN_CLIENT_EMAIL=firebase-adminsdk-fbsvc@mbreadcoffeetea-75636.iam.gserviceaccount.com
```

## File Structure

```
lib/
├── firebase.ts              # Client-side Firebase configuration
├── firebase-admin.ts        # Server-side Firebase Admin configuration
├── firebase-utils.ts        # Utility functions for Firebase operations
└── auth.ts                 # NextAuth configuration with Firebase integration

app/api/auth/
└── register/
    └── route.ts            # User registration endpoint
```

## Key Components

### 1. Firebase Client Configuration (`lib/firebase.ts`)
- Initializes Firebase app
- Exports auth and firestore instances
- Uses environment variables for configuration

### 2. Firebase Admin Configuration (`lib/firebase-admin.ts`)
- Server-side Firebase Admin SDK setup
- Service account authentication
- Admin auth and firestore instances

### 3. Firebase Utilities (`lib/firebase-utils.ts`)
- Helper functions for user management
- Custom claims management
- Firestore operations

### 4. Authentication Integration (`lib/auth.ts`)
- NextAuth configuration with Firebase
- Credentials provider using Firebase Auth
- Session management with custom claims

## User Data Structure

Users are stored in Firestore with the following structure:

```typescript
interface UserData {
  id: string
  name: string
  email: string
  phone: string
  role: 'CUSTOMER' | 'ADMIN'
  points: number
  createdAt: string
  updatedAt: string
}
```

## Custom Claims

Firebase custom claims are used to store:
- `role`: User role (CUSTOMER or ADMIN)
- `points`: User loyalty points

## API Endpoints

### POST `/api/auth/register`
Registers a new user with Firebase Auth and stores additional data in Firestore.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Đăng ký thành công!",
  "user": {
    "id": "firebase-uid",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "role": "CUSTOMER",
    "points": 0,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

## Security Considerations

1. **Service Account Key**: The Firebase service account key is included in the codebase for development. In production, use environment variables or secure key management.

2. **Environment Variables**: All sensitive configuration should be stored in environment variables.

3. **Custom Claims**: Used for role-based access control and user metadata.

4. **Firestore Rules**: Ensure proper Firestore security rules are configured in the Firebase console.

## Testing

To test the Firebase integration:

1. Start the development server: `npm run dev`
2. Navigate to `/auth/signup` to test user registration
3. Navigate to `/auth/signin` to test user authentication
4. Check the Firebase console to verify user creation and data storage

## Troubleshooting

### Common Issues

1. **Firebase App Already Initialized**: The configuration checks for existing apps to prevent re-initialization.

2. **Environment Variables**: Ensure all required environment variables are set.

3. **Service Account Permissions**: Verify the service account has the necessary permissions in Firebase console.

4. **Network Issues**: Check Firebase project configuration and network connectivity.

## Next Steps

1. Configure Firestore security rules
2. Implement user profile management
3. Add password reset functionality
4. Implement email verification
5. Add social authentication providers
6. Set up Firebase hosting for production deployment
