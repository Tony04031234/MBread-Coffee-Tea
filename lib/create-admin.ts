import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from './firebase'
import { adminAuth } from './firebase-admin'
import { createUserWithRole } from './firebase-utils'

/**
 * Utility function to create an admin user
 * This should be run once to create the initial admin user
 */
export async function createAdminUser(
  email: string,
  password: string,
  name: string,
  phone: string
) {
  try {
    // Create user with Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )
    
    const user = userCredential.user
    
    // Update user profile with display name
    await adminAuth.updateUser(user.uid, {
      displayName: name
    })

    // Create user with admin role
    const userData = await createUserWithRole(user.uid, {
      name,
      email,
      phone,
      role: 'ADMIN',
      points: 0
    })

    console.log('Admin user created successfully:', userData)
    return userData
  } catch (error) {
    console.error('Error creating admin user:', error)
    throw error
  }
}

// Example usage (uncomment and run when needed):
// createAdminUser(
//   'lifecookvietnam@gmail.com',
//   'admin123456',
//   'Admin User',
//   '+1234567890'
// ).then(() => {
//   console.log('Admin user created!')
// }).catch(console.error)
