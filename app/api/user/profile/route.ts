import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getUserData } from '@/lib/firebase-utils'
import { adminAuth } from '@/lib/firebase-admin'
import { adminDb } from '@/lib/firebase-admin'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Vui lòng đăng nhập' },
        { status: 401 }
      )
    }

    const userData = await getUserData(session.user.id)

    if (!userData) {
      return NextResponse.json(
        { message: 'Không tìm thấy thông tin người dùng' },
        { status: 404 }
      )
    }

    return NextResponse.json({ user: userData })
  } catch (error) {
    console.error('Error getting user profile:', error)
    return NextResponse.json(
      { message: 'Đã xảy ra lỗi, vui lòng thử lại' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Vui lòng đăng nhập' },
        { status: 401 }
      )
    }

    const { name, phone } = await request.json()

    // Validation
    if (!name || !phone) {
      return NextResponse.json(
        { message: 'Vui lòng điền đầy đủ thông tin' },
        { status: 400 }
      )
    }

    if (name.trim().length < 2) {
      return NextResponse.json(
        { message: 'Tên phải có ít nhất 2 ký tự' },
        { status: 400 }
      )
    }

    if (phone.trim().length < 10) {
      return NextResponse.json(
        { message: 'Số điện thoại không hợp lệ' },
        { status: 400 }
      )
    }

    // Update Firebase Auth display name
    await adminAuth.updateUser(session.user.id, {
      displayName: name.trim()
    })

    // Update Firestore
    await adminDb.collection('users').doc(session.user.id).update({
      name: name.trim(),
      phone: phone.trim(),
      updatedAt: new Date().toISOString()
    })

    // Get updated user data
    const updatedUserData = await getUserData(session.user.id)

    return NextResponse.json({
      message: 'Cập nhật thông tin thành công',
      user: updatedUserData
    })
  } catch (error) {
    console.error('Error updating user profile:', error)
    return NextResponse.json(
      { message: 'Đã xảy ra lỗi, vui lòng thử lại' },
      { status: 500 }
    )
  }
}
