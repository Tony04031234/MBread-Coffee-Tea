import { initializeApp, getApps } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || "AIzaSyBr2JEI2uWNjsg_VKedt-cl_JjWaJTnmPc",
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || "mbreadcoffeetea-75636.firebaseapp.com",
  projectId: process.env.FIREBASE_PROJECT_ID || "mbreadcoffeetea-75636",
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "mbreadcoffeetea-75636.firebasestorage.app",
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "763070371252",
  appId: process.env.FIREBASE_APP_ID || "1:763070371252:web:91beb9b679724d90c54ee1",
  measurementId: process.env.FIREBASE_MEASUREMENT_ID || "G-M693P8FDSY"
}

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

// Initialize Firebase Auth
export const auth = getAuth(app)

// Initialize Firestore
export const db = getFirestore(app)

export default app
