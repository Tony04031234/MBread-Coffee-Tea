import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createOrder, getUserOrders, OrderItem, CustomerInfo } from '@/lib/order-utils'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    const { items, customerInfo, isGuestOrder } = await request.json()

    // For guest orders, we don't require authentication
    if (!isGuestOrder && !session?.user?.id) {
      return NextResponse.json(
        { message: 'Vui lòng đăng nhập để đặt hàng' },
        { status: 401 }
      )
    }

    // Validation
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { message: 'Giỏ hàng không được để trống' },
        { status: 400 }
      )
    }

    if (!customerInfo?.name || !customerInfo?.phone) {
      return NextResponse.json(
        { message: 'Vui lòng điền đầy đủ thông tin khách hàng' },
        { status: 400 }
      )
    }

    if (customerInfo.deliveryType === 'delivery' && !customerInfo.address) {
      return NextResponse.json(
        { message: 'Vui lòng nhập địa chỉ giao hàng' },
        { status: 400 }
      )
    }

    // Create order
    const userId = isGuestOrder ? 'guest_' + Date.now() : session?.user?.id!
    const order = await createOrder(
      userId,
      items as OrderItem[],
      customerInfo as CustomerInfo,
      {
        subtotal: items.reduce((sum: number, item: OrderItem) => sum + (item.price * item.quantity), 0),
        tax: items.reduce((sum: number, item: OrderItem) => sum + (item.price * item.quantity), 0) * 0.1,
        deliveryFee: customerInfo.deliveryType === 'delivery' ? 15000 : 0,
        discount: items.reduce((sum: number, item: OrderItem) => sum + (item.price * item.quantity), 0) > 200000 
          ? items.reduce((sum: number, item: OrderItem) => sum + (item.price * item.quantity), 0) * 0.05 
          : 0,
        total: 0 // Will be calculated
      }
    )

    // Calculate total
    const total = order.orderSummary.subtotal + order.orderSummary.tax + order.orderSummary.deliveryFee - order.orderSummary.discount
    order.orderSummary.total = total

    return NextResponse.json(
      { 
        message: 'Đặt hàng thành công!',
        order
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Order creation error:', error)
    return NextResponse.json(
      { message: 'Đã xảy ra lỗi, vui lòng thử lại' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Vui lòng đăng nhập để xem đơn hàng' },
        { status: 401 }
      )
    }

    const orders = await getUserOrders(session.user.id)

    return NextResponse.json({ orders })
  } catch (error) {
    console.error('Error getting orders:', error)
    return NextResponse.json(
      { message: 'Đã xảy ra lỗi, vui lòng thử lại' },
      { status: 500 }
    )
  }
}
