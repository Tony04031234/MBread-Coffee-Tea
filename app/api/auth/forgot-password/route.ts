import { NextRequest, NextResponse } from 'next/server'
import { adminAuth } from '@/lib/firebase-admin'
import crypto from 'crypto'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email là bắt buộc' },
        { status: 400 }
      )
    }

    // Check if user exists
    try {
      const userRecord = await adminAuth.getUserByEmail(email)
      
      // Generate a secure token
      const resetToken = crypto.randomBytes(32).toString('hex')
      const expiresAt = new Date(Date.now() + 15 * 60 * 1000) // 15 minutes from now

      // Store the reset token in Firestore
      const { adminDb } = await import('@/lib/firebase-admin')
      await adminDb.collection('passwordResetTokens').doc(resetToken).set({
        userId: userRecord.uid,
        email: email,
        expiresAt: expiresAt.toISOString(),
        createdAt: new Date().toISOString(),
        used: false
      })

      // In a real application, you would send an email here
      // For now, we'll just return success
      // You can integrate with services like SendGrid, AWS SES, or Nodemailer
      
      console.log(`Password reset token for ${email}: ${resetToken}`)
      console.log(`Reset link: ${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/auth/reset-password?token=${resetToken}`)

      return NextResponse.json({
        message: 'Liên kết đặt lại mật khẩu đã được gửi đến email của bạn'
      })

    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        // Don't reveal if user exists or not for security
        return NextResponse.json({
          message: 'Nếu email tồn tại trong hệ thống, bạn sẽ nhận được liên kết đặt lại mật khẩu'
        })
      }
      
      console.error('Error in forgot password:', error)
      return NextResponse.json(
        { error: 'Đã xảy ra lỗi, vui lòng thử lại' },
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
