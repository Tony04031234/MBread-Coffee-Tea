import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { updateOrderStatus, getOrderById } from '@/lib/order-utils'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { orderId: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Vui lòng đăng nhập' },
        { status: 401 }
      )
    }

    if (session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { message: 'Bạn không có quyền truy cập' },
        { status: 403 }
      )
    }

    const { orderId } = params
    const { status } = await request.json()

    if (!status) {
      return NextResponse.json(
        { message: 'Trạng thái không được để trống' },
        { status: 400 }
      )
    }

    const validStatuses = ['pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled']
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { message: 'Trạng thái không hợp lệ' },
        { status: 400 }
      )
    }

    // Check if order exists
    const order = await getOrderById(orderId)
    if (!order) {
      return NextResponse.json(
        { message: 'Không tìm thấy đơn hàng' },
        { status: 404 }
      )
    }

    await updateOrderStatus(orderId, status)

    return NextResponse.json(
      { 
        message: 'Cập nhật trạng thái đơn hàng thành công',
        order: { ...order, status, updatedAt: new Date().toISOString() }
      }
    )
  } catch (error) {
    console.error('Error updating order status:', error)
    return NextResponse.json(
      { message: 'Đã xảy ra lỗi, vui lòng thử lại' },
      { status: 500 }
    )
  }
}
