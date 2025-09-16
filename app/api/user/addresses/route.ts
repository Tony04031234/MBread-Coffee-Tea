import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
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

    // Get user addresses from Firestore
    const addressesRef = adminDb.collection('users').doc(session.user.id).collection('addresses')
    const snapshot = await addressesRef.get()
    
    const addresses = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))

    return NextResponse.json({ addresses })
  } catch (error) {
    console.error('Error getting addresses:', error)
    return NextResponse.json(
      { message: 'Đã xảy ra lỗi, vui lòng thử lại' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Vui lòng đăng nhập' },
        { status: 401 }
      )
    }

    const { name, address, phone, isDefault } = await request.json()

    // Validation
    if (!name || !address || !phone) {
      return NextResponse.json(
        { message: 'Vui lòng điền đầy đủ thông tin' },
        { status: 400 }
      )
    }

    // If this is set as default, unset other defaults
    if (isDefault) {
      const addressesRef = adminDb.collection('users').doc(session.user.id).collection('addresses')
      const snapshot = await addressesRef.where('isDefault', '==', true).get()
      
      const batch = adminDb.batch()
      snapshot.docs.forEach(doc => {
        batch.update(doc.ref, { isDefault: false })
      })
      await batch.commit()
    }

    // Add new address
    const addressData = {
      name: name.trim(),
      address: address.trim(),
      phone: phone.trim(),
      isDefault: isDefault || false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    const docRef = await adminDb.collection('users').doc(session.user.id).collection('addresses').add(addressData)

    return NextResponse.json({
      message: 'Thêm địa chỉ thành công',
      address: { id: docRef.id, ...addressData }
    })
  } catch (error) {
    console.error('Error adding address:', error)
    return NextResponse.json(
      { message: 'Đã xảy ra lỗi, vui lòng thử lại' },
      { status: 500 }
    )
  }
}
