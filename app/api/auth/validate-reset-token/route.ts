import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')

    if (!token) {
      return NextResponse.json(
        { error: 'Token là bắt buộc' },
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

    return NextResponse.json({
      valid: true,
      email: tokenData.email
    })

  } catch (error) {
    console.error('Error validating reset token:', error)
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi khi xác thực token' },
      { status: 500 }
    )
  }
}
