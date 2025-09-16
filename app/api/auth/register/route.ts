import { NextRequest, NextResponse } from 'next/server'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { adminAuth } from '@/lib/firebase-admin'
import { createUserWithRole } from '@/lib/firebase-utils'

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, password } = await request.json()

    // Validation
    if (!name || !email || !phone || !password) {
      return NextResponse.json(
        { message: 'Vui lòng điền đầy đủ thông tin' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: 'Mật khẩu phải có ít nhất 6 ký tự' },
        { status: 400 }
      )
    }

    // Create user with Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )
    
    const user = userCredential.user
    
    // Update user profile with display name using Firebase Admin
    await adminAuth.updateUser(user.uid, {
      displayName: name
    })

    // Create user with role and store in Firestore
    const userData = await createUserWithRole(user.uid, {
      name,
      email,
      phone,
      role: 'CUSTOMER',
      points: 0
    })

    return NextResponse.json(
      { 
        message: 'Đăng ký thành công!',
        user: userData
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Registration error:', error)
    
    // Handle specific Firebase errors
    if (error.code === 'auth/email-already-in-use') {
      return NextResponse.json(
        { message: 'Email này đã được sử dụng' },
        { status: 400 }
      )
    }
    
    if (error.code === 'auth/weak-password') {
      return NextResponse.json(
        { message: 'Mật khẩu quá yếu' },
        { status: 400 }
      )
    }
    
    if (error.code === 'auth/invalid-email') {
      return NextResponse.json(
        { message: 'Email không hợp lệ' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { message: 'Đã xảy ra lỗi, vui lòng thử lại' },
      { status: 500 }
    )
  }
}
