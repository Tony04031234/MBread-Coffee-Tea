import { adminAuth, adminDb } from './firebase-admin'

export interface UserData {
  id: string
  name: string
  email: string
  phone: string
  role: 'CUSTOMER' | 'ADMIN'
  points: number
  createdAt: string
  updatedAt: string
}

export async function createUserWithRole(
  uid: string,
  userData: Omit<UserData, 'id' | 'createdAt' | 'updatedAt'>
): Promise<UserData> {
  const now = new Date().toISOString()
  
  // Set custom claims
  await adminAuth.setCustomUserClaims(uid, {
    role: userData.role,
    points: userData.points
  })

  // Store user data in Firestore
  const userDoc = {
    ...userData,
    createdAt: now,
    updatedAt: now
  }
  
  await adminDb.collection('users').doc(uid).set(userDoc)

  return {
    id: uid,
    ...userDoc
  }
}

export async function getUserData(uid: string): Promise<UserData | null> {
  try {
    const userDoc = await adminDb.collection('users').doc(uid).get()
    
    if (!userDoc.exists) {
      return null
    }

    const data = userDoc.data() as Omit<UserData, 'id'>
    return {
      id: uid,
      ...data
    }
  } catch (error) {
    console.error('Error getting user data:', error)
    return null
  }
}

export async function updateUserPoints(uid: string, points: number): Promise<void> {
  try {
    // Update custom claims
    await adminAuth.setCustomUserClaims(uid, {
      role: 'CUSTOMER', // Keep existing role
      points: points
    })

    // Update Firestore
    await adminDb.collection('users').doc(uid).update({
      points: points,
      updatedAt: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error updating user points:', error)
    throw error
  }
}

export async function updateUserRole(uid: string, role: 'CUSTOMER' | 'ADMIN'): Promise<void> {
  try {
    // Get current user data
    const userData = await getUserData(uid)
    if (!userData) {
      throw new Error('User not found')
    }

    // Update custom claims
    await adminAuth.setCustomUserClaims(uid, {
      role: role,
      points: userData.points
    })

    // Update Firestore
    await adminDb.collection('users').doc(uid).update({
      role: role,
      updatedAt: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error updating user role:', error)
    throw error
  }
}
