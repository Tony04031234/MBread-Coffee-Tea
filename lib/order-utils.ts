import { adminDb } from './firebase-admin'

export interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

export interface CustomerInfo {
  name: string
  phone: string
  email?: string
  address?: string
  deliveryType: 'pickup' | 'delivery'
  paymentMethod: string
  notes?: string
}

export interface OrderSummary {
  subtotal: number
  tax: number
  deliveryFee: number
  discount: number
  total: number
}

export interface Order {
  id: string
  userId: string
  items: OrderItem[]
  customerInfo: CustomerInfo
  orderSummary: OrderSummary
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled'
  createdAt: string
  updatedAt: string
  estimatedTime?: string
}

export async function createOrder(
  userId: string,
  items: OrderItem[],
  customerInfo: CustomerInfo,
  orderSummary: OrderSummary
): Promise<Order> {
  try {
    const now = new Date().toISOString()
    const orderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    const order: Order = {
      id: orderId,
      userId,
      items,
      customerInfo,
      orderSummary,
      status: 'pending',
      createdAt: now,
      updatedAt: now,
      estimatedTime: customerInfo.deliveryType === 'pickup' ? '10-15 phút' : '20-30 phút'
    }

    // Save order to Firestore
    await adminDb.collection('orders').doc(orderId).set(order)

    return order
  } catch (error) {
    console.error('Error creating order:', error)
    throw error
  }
}

export async function getUserOrders(userId: string): Promise<Order[]> {
  try {
    const ordersSnapshot = await adminDb
      .collection('orders')
      .where('userId', '==', userId)
      .orderBy('createdAt', 'desc')
      .get()

    const orders: Order[] = []
    ordersSnapshot.forEach(doc => {
      orders.push(doc.data() as Order)
    })

    return orders
  } catch (error) {
    console.error('Error getting user orders:', error)
    return []
  }
}

export async function getOrderById(orderId: string): Promise<Order | null> {
  try {
    const orderDoc = await adminDb.collection('orders').doc(orderId).get()
    
    if (!orderDoc.exists) {
      return null
    }

    return orderDoc.data() as Order
  } catch (error) {
    console.error('Error getting order:', error)
    return null
  }
}

export async function updateOrderStatus(orderId: string, status: Order['status']): Promise<void> {
  try {
    await adminDb.collection('orders').doc(orderId).update({
      status,
      updatedAt: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error updating order status:', error)
    throw error
  }
}

export async function getAllOrders(): Promise<Order[]> {
  try {
    const ordersSnapshot = await adminDb
      .collection('orders')
      .orderBy('createdAt', 'desc')
      .get()

    const orders: Order[] = []
    ordersSnapshot.forEach(doc => {
      orders.push(doc.data() as Order)
    })

    return orders
  } catch (error) {
    console.error('Error getting all orders:', error)
    return []
  }
}

export async function getOrdersByStatus(status: Order['status']): Promise<Order[]> {
  try {
    const ordersSnapshot = await adminDb
      .collection('orders')
      .where('status', '==', status)
      .orderBy('createdAt', 'desc')
      .get()

    const orders: Order[] = []
    ordersSnapshot.forEach(doc => {
      orders.push(doc.data() as Order)
    })

    return orders
  } catch (error) {
    console.error('Error getting orders by status:', error)
    return []
  }
}

export function calculateOrderSummary(
  items: OrderItem[],
  deliveryType: 'pickup' | 'delivery'
): OrderSummary {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const tax = subtotal * 0.1 // 10% tax
  const deliveryFee = deliveryType === 'delivery' ? 15000 : 0
  const discount = subtotal > 200000 ? subtotal * 0.05 : 0 // 5% discount for orders over 200k
  const total = subtotal + tax + deliveryFee - discount

  return {
    subtotal,
    tax,
    deliveryFee,
    discount,
    total
  }
}
