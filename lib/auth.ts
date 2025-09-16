import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { signInWithEmailAndPassword, signInWithCredential, GoogleAuthProvider } from 'firebase/auth'
import { auth } from './firebase'
import { adminAuth, adminDb } from './firebase-admin'
import { createUserWithRole } from './firebase-utils'

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          // Sign in with Firebase Auth
          const userCredential = await signInWithEmailAndPassword(
            auth,
            credentials.email,
            credentials.password
          )
          
          const user = userCredential.user
          
          // Get additional user data from Firebase Admin
          const userRecord = await adminAuth.getUser(user.uid)
          
          // Get custom claims for role
          const customClaims = userRecord.customClaims || {}
          
          return {
            id: user.uid,
            email: user.email!,
            name: user.displayName || userRecord.displayName || 'User',
            role: customClaims.role || 'CUSTOMER',
            points: customClaims.points || 0
          }
        } catch (error) {
          console.error('Firebase auth error:', error)
          return null
        }
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google') {
        try {
          // Check if user exists in Firebase by email
          let firebaseUser
          try {
            firebaseUser = await adminAuth.getUserByEmail(user.email!)
            // User exists, update their data
            await adminAuth.updateUser(firebaseUser.uid, {
              displayName: user.name || profile?.name || 'User'
            })
          } catch (error) {
            // User doesn't exist, create new user in Firebase Auth
            const newUser = await adminAuth.createUser({
              uid: user.id, // Use NextAuth user ID as Firebase UID
              email: user.email!,
              displayName: user.name || profile?.name || 'User',
              emailVerified: true
            })
            
            // Set custom claims
            await adminAuth.setCustomUserClaims(newUser.uid, {
              role: 'CUSTOMER',
              points: 0
            })
            
            // Create user document in Firestore
            await adminDb.collection('users').doc(newUser.uid).set({
              name: user.name || profile?.name || 'User',
              email: user.email!,
              phone: '', // Google doesn't provide phone
              role: 'CUSTOMER',
              points: 0,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            })
            
            firebaseUser = newUser
          }

          // Update user data for NextAuth session
          if (firebaseUser) {
            const customClaims = firebaseUser.customClaims || {}
            user.role = customClaims.role || 'CUSTOMER'
            user.points = customClaims.points || 0
            user.id = firebaseUser.uid // Ensure we use Firebase UID
          }
        } catch (error) {
          console.error('Google sign-in error:', error)
          console.error('Error details:', {
            message: error instanceof Error ? error.message : 'Unknown error',
            userEmail: user.email,
            userId: user.id
          })
          return false
        }
      }
      return true
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.role = user.role
        token.points = user.points
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!
        session.user.role = token.role as string
        session.user.points = token.points as number
      }
      return session
    }
  },
  pages: {
    signIn: '/auth/signin'
  },
  secret: process.env.NEXTAUTH_SECRET
}
