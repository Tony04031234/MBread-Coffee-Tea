import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { adminDb } from '@/lib/firebase-admin'

export async function DELETE(
  request: NextRequest,
  { params }: { params: { addressId: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Vui lòng đăng nhập' },
        { status: 401 }
      )
    }

    const { addressId } = params

    if (!addressId) {
      return NextResponse.json(
        { message: 'Thiếu thông tin địa chỉ' },
        { status: 400 }
      )
    }

    // Check if address exists and belongs to user
    const addressRef = adminDb.collection('users').doc(session.user.id).collection('addresses').doc(addressId)
    const addressDoc = await addressRef.get()

    if (!addressDoc.exists) {
      return NextResponse.json(
        { message: 'Địa chỉ không tồn tại' },
        { status: 404 }
      )
    }

    const addressData = addressDoc.data()

    // If deleting default address, set another address as default
    if (addressData?.isDefault) {
      const addressesRef = adminDb.collection('users').doc(session.user.id).collection('addresses')
      const snapshot = await addressesRef.where('isDefault', '==', false).limit(1).get()
      
      if (!snapshot.empty) {
        const firstAddress = snapshot.docs[0]
        await firstAddress.ref.update({ isDefault: true })
      }
    }

    // Delete the address
    await addressRef.delete()

    return NextResponse.json({ message: 'Xóa địa chỉ thành công' })
  } catch (error) {
    console.error('Error deleting address:', error)
    return NextResponse.json(
      { message: 'Đã xảy ra lỗi, vui lòng thử lại' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { addressId: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Vui lòng đăng nhập' },
        { status: 401 }
      )
    }

    const { addressId } = params
    const { name, address, phone, isDefault } = await request.json()

    if (!addressId) {
      return NextResponse.json(
        { message: 'Thiếu thông tin địa chỉ' },
        { status: 400 }
      )
    }

    // Validation
    if (!name || !address || !phone) {
      return NextResponse.json(
        { message: 'Vui lòng điền đầy đủ thông tin' },
        { status: 400 }
      )
    }

    // Check if address exists and belongs to user
    const addressRef = adminDb.collection('users').doc(session.user.id).collection('addresses').doc(addressId)
    const addressDoc = await addressRef.get()

    if (!addressDoc.exists) {
      return NextResponse.json(
        { message: 'Địa chỉ không tồn tại' },
        { status: 404 }
      )
    }

    // If this is set as default, unset other defaults
    if (isDefault) {
      const addressesRef = adminDb.collection('users').doc(session.user.id).collection('addresses')
      const snapshot = await addressesRef.where('isDefault', '==', true).get()
      
      const batch = adminDb.batch()
      snapshot.docs.forEach(doc => {
        if (doc.id !== addressId) {
          batch.update(doc.ref, { isDefault: false })
        }
      })
      await batch.commit()
    }

    // Update address
    const updateData = {
      name: name.trim(),
      address: address.trim(),
      phone: phone.trim(),
      isDefault: isDefault || false,
      updatedAt: new Date().toISOString()
    }

    await addressRef.update(updateData)

    return NextResponse.json({
      message: 'Cập nhật địa chỉ thành công',
      address: { id: addressId, ...updateData }
    })
  } catch (error) {
    console.error('Error updating address:', error)
    return NextResponse.json(
      { message: 'Đã xảy ra lỗi, vui lòng thử lại' },
      { status: 500 }
    )
  }
}
