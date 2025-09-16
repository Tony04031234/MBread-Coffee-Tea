import { NextRequest, NextResponse } from 'next/server'
import { adminAuth, adminDb } from '@/lib/firebase-admin'

export async function POST(request: NextRequest) {
  try {
    const { token, password } = await request.json()

    if (!token || !password) {
      return NextResponse.json(
        { error: 'Token và mật khẩu là bắt buộc' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Mật khẩu phải có ít nhất 6 ký tự' },
        { status: 400 }
      )
    }

    // Get the token document from Firestore
    const tokenDoc = await adminDb.collection('passwordResetTokens').doc(token).get()

    if (!tokenDoc.exists) {
      return NextResponse.json(
        { error: 'Token không hợp lệ' },
        { status: 400 }
      )
    }

    const tokenData = tokenDoc.data()

    if (!tokenData) {
      return NextResponse.json(
        { error: 'Token không hợp lệ' },
        { status: 400 }
      )
    }

    // Check if token has been used
    if (tokenData.used) {
      return NextResponse.json(
        { error: 'Token đã được sử dụng' },
        { status: 400 }
      )
    }

    // Check if token has expired
    const expiresAt = new Date(tokenData.expiresAt)
    const now = new Date()

    if (now > expiresAt) {
      return NextResponse.json(
        { error: 'Token đã hết hạn' },
        { status: 400 }
      )
    }

    try {
      // Update the user's password using Firebase Admin
      await adminAuth.updateUser(tokenData.userId, {
        password: password
      })

      // Mark the token as used
      await adminDb.collection('passwordResetTokens').doc(token).update({
        used: true,
        usedAt: new Date().toISOString()
      })

      return NextResponse.json({
        message: 'Mật khẩu đã được đặt lại thành công'
      })

    } catch (error: any) {
      console.error('Error updating password:', error)
      
      if (error.code === 'auth/user-not-found') {
        return NextResponse.json(
          { error: 'Người dùng không tồn tại' },
          { status: 400 }
        )
      }

      return NextResponse.json(
        { error: 'Đã xảy ra lỗi khi cập nhật mật khẩu' },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('Error parsing request:', error)
    return NextResponse.json(
      { error: 'Dữ liệu không hợp lệ' },
      { status: 400 }
    )
  }
}
