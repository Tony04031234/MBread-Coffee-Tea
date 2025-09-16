'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { FiClock, FiMapPin, FiCreditCard, FiEye, FiCoffee, FiCheckCircle, FiXCircle, FiLoader, FiFilter, FiRefreshCw } from 'react-icons/fi'
import Image from 'next/image'
import { Order, updateOrderStatus } from '@/lib/order-utils'

const AdminOrdersPage = () => {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled'>('all')
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
      return
    }

    if (session?.user?.role !== 'ADMIN') {
      router.push('/')
      return
    }

    loadOrders()
  }, [session, status, router])

  const loadOrders = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/admin/orders')
      const data = await response.json()
      
      if (response.ok) {
        setOrders(data.orders)
      } else {
        console.error('Error loading orders:', data.message)
      }
    } catch (error) {
      console.error('Error loading orders:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleStatusUpdate = async (orderId: string, newStatus: Order['status']) => {
    try {
      setIsUpdating(true)
      const response = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      })

      if (response.ok) {
        // Update local state
        setOrders(orders.map(order => 
          order.id === orderId 
            ? { ...order, status: newStatus, updatedAt: new Date().toISOString() }
            : order
        ))
        
        if (selectedOrder?.id === orderId) {
          setSelectedOrder({
            ...selectedOrder,
            status: newStatus,
            updatedAt: new Date().toISOString()
          })
        }
      } else {
        alert('Có lỗi xảy ra khi cập nhật trạng thái đơn hàng')
      }
    } catch (error) {
      console.error('Error updating order status:', error)
      alert('Có lỗi xảy ra khi cập nhật trạng thái đơn hàng')
    } finally {
      setIsUpdating(false)
    }
  }

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <FiClock className="text-yellow-500" />
      case 'confirmed':
        return <FiCheckCircle className="text-blue-500" />
      case 'preparing':
        return <FiLoader className="text-orange-500 animate-spin" />
      case 'ready':
        return <FiCoffee className="text-green-500" />
      case 'delivered':
        return <FiCheckCircle className="text-green-500" />
      case 'cancelled':
        return <FiXCircle className="text-red-500" />
      default:
        return <FiClock className="text-gray-500" />
    }
  }

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'Chờ xác nhận'
      case 'confirmed':
        return 'Đã xác nhận'
      case 'preparing':
        return 'Đang chuẩn bị'
      case 'ready':
        return 'Sẵn sàng'
      case 'delivered':
        return 'Đã giao'
      case 'cancelled':
        return 'Đã hủy'
      default:
        return 'Không xác định'
    }
  }

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'confirmed':
        return 'bg-blue-100 text-blue-800'
      case 'preparing':
        return 'bg-orange-100 text-orange-800'
      case 'ready':
        return 'bg-green-100 text-green-800'
      case 'delivered':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getNextStatus = (currentStatus: Order['status']): Order['status'] | null => {
    switch (currentStatus) {
      case 'pending':
        return 'confirmed'
      case 'confirmed':
        return 'preparing'
      case 'preparing':
        return 'ready'
      case 'ready':
        return 'delivered'
      default:
        return null
    }
  }

  const filteredOrders = orders.filter(order => 
    filter === 'all' || order.status === filter
  )

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="text-center">
          <div className="spinner w-8 h-8 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải đơn hàng...</p>
        </div>
      </div>
    )
  }

  if (!session || session.user?.role !== 'ADMIN') {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Bạn không có quyền truy cập trang này</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream-50 py-8">
      <div className="container-custom px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto"
        >
          {/* Header */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                  <FiCoffee className="text-primary-600 text-2xl" />
                </div>
                <div>
                  <h1 className="text-2xl font-serif font-bold text-primary-800">
                    Quản lý đơn hàng
                  </h1>
                  <p className="text-gray-600">Theo dõi và xử lý đơn hàng</p>
                </div>
              </div>
              <button
                onClick={loadOrders}
                className="btn-outline flex items-center space-x-2"
              >
                <FiRefreshCw />
                <span>Làm mới</span>
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { key: 'pending', label: 'Chờ xác nhận', color: 'bg-yellow-500' },
              { key: 'confirmed', label: 'Đã xác nhận', color: 'bg-blue-500' },
              { key: 'preparing', label: 'Đang chuẩn bị', color: 'bg-orange-500' },
              { key: 'ready', label: 'Sẵn sàng', color: 'bg-green-500' }
            ].map((stat) => (
              <div key={stat.key} className="bg-white rounded-xl shadow-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {orders.filter(order => order.status === stat.key).length}
                    </p>
                  </div>
                  <div className={`w-12 h-12 rounded-full ${stat.color} flex items-center justify-center`}>
                    {getStatusIcon(stat.key as Order['status'])}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Filter Tabs */}
          <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
            <div className="flex flex-wrap gap-2">
              {[
                { key: 'all', label: 'Tất cả' },
                { key: 'pending', label: 'Chờ xác nhận' },
                { key: 'confirmed', label: 'Đã xác nhận' },
                { key: 'preparing', label: 'Đang chuẩn bị' },
                { key: 'ready', label: 'Sẵn sàng' },
                { key: 'delivered', label: 'Đã giao' },
                { key: 'cancelled', label: 'Đã hủy' }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setFilter(tab.key as any)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    filter === tab.key
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Orders List */}
          <div className="space-y-4">
            {filteredOrders.length === 0 ? (
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <FiCoffee className="text-gray-400 text-4xl mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Không có đơn hàng nào
                </h3>
                <p className="text-gray-600">
                  Chưa có đơn hàng nào trong trạng thái này
                </p>
              </div>
            ) : (
              filteredOrders.map((order) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-xl shadow-lg p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(order.status)}
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                          {getStatusText(order.status)}
                        </span>
                      </div>
                      <span className="text-gray-500 text-sm">
                        #{order.id}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-primary-600">
                        {order.orderSummary.total.toLocaleString('vi-VN')}đ
                      </span>
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="btn-outline flex items-center space-x-2"
                      >
                        <FiEye />
                        <span>Chi tiết</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <FiClock className="text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {new Date(order.createdAt).toLocaleString('vi-VN')}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FiMapPin className="text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {order.customerInfo.deliveryType === 'pickup' ? 'Mang đi' : 'Giao hàng'}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FiCreditCard className="text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {order.customerInfo.paymentMethod === 'cash' ? 'Tiền mặt' :
                         order.customerInfo.paymentMethod === 'card' ? 'Thẻ' :
                         order.customerInfo.paymentMethod === 'momo' ? 'MoMo' : 'ZaloPay'}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">Khách hàng:</span>
                      <span className="text-sm font-medium">{order.customerInfo.name}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Món đã đặt:</span>
                    <div className="flex space-x-2">
                      {order.items.slice(0, 3).map((item) => (
                        <div key={item.id} className="flex items-center space-x-1 bg-gray-100 px-2 py-1 rounded">
                          <span className="text-xs text-gray-600">{item.name}</span>
                          <span className="text-xs text-gray-500">x{item.quantity}</span>
                        </div>
                      ))}
                      {order.items.length > 3 && (
                        <span className="text-xs text-gray-500">
                          +{order.items.length - 3} món khác
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-4 flex space-x-2">
                    {getNextStatus(order.status) && (
                      <button
                        onClick={() => handleStatusUpdate(order.id, getNextStatus(order.status)!)}
                        disabled={isUpdating}
                        className="btn-primary text-sm px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isUpdating ? 'Đang cập nhật...' : `Chuyển sang ${getStatusText(getNextStatus(order.status)!)}`}
                      </button>
                    )}
                    {order.status === 'pending' && (
                      <button
                        onClick={() => handleStatusUpdate(order.id, 'cancelled')}
                        disabled={isUpdating}
                        className="btn-outline text-sm px-4 py-2 text-red-600 border-red-600 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Hủy đơn hàng
                      </button>
                    )}
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-xl shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-serif font-bold text-primary-800">
                  Chi tiết đơn hàng #{selectedOrder.id}
                </h2>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FiXCircle size={24} />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Order Items */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Món đã đặt</h3>
                  <div className="space-y-3">
                    {selectedOrder.items.map((item) => (
                      <div key={item.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-12 h-12 rounded-lg overflow-hidden">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={48}
                            height={48}
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{item.name}</h4>
                          <p className="text-sm text-gray-600">
                            {item.price.toLocaleString('vi-VN')}đ x {item.quantity}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">
                            {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Customer Info */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Thông tin khách hàng</h3>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tên:</span>
                      <span className="font-medium">{selectedOrder.customerInfo.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">SĐT:</span>
                      <span className="font-medium">{selectedOrder.customerInfo.phone}</span>
                    </div>
                    {selectedOrder.customerInfo.email && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Email:</span>
                        <span className="font-medium">{selectedOrder.customerInfo.email}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Hình thức:</span>
                      <span className="font-medium">
                        {selectedOrder.customerInfo.deliveryType === 'pickup' ? 'Mang đi' : 'Giao hàng'}
                      </span>
                    </div>
                    {selectedOrder.customerInfo.address && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Địa chỉ:</span>
                        <span className="font-medium text-right max-w-48 truncate">
                          {selectedOrder.customerInfo.address}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Thanh toán:</span>
                      <span className="font-medium">
                        {selectedOrder.customerInfo.paymentMethod === 'cash' ? 'Tiền mặt' :
                         selectedOrder.customerInfo.paymentMethod === 'card' ? 'Thẻ' :
                         selectedOrder.customerInfo.paymentMethod === 'momo' ? 'MoMo' : 'ZaloPay'}
                      </span>
                    </div>
                    {selectedOrder.customerInfo.notes && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Ghi chú:</span>
                        <span className="font-medium">{selectedOrder.customerInfo.notes}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Tổng kết đơn hàng</h3>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tạm tính:</span>
                    <span className="font-medium">{selectedOrder.orderSummary.subtotal.toLocaleString('vi-VN')}đ</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Thuế (10%):</span>
                    <span className="font-medium">{selectedOrder.orderSummary.tax.toLocaleString('vi-VN')}đ</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phí giao hàng:</span>
                    <span className="font-medium">{selectedOrder.orderSummary.deliveryFee.toLocaleString('vi-VN')}đ</span>
                  </div>
                  {selectedOrder.orderSummary.discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Giảm giá:</span>
                      <span className="font-medium">-{selectedOrder.orderSummary.discount.toLocaleString('vi-VN')}đ</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-lg border-t pt-2">
                    <span>Tổng cộng:</span>
                    <span className="text-primary-600">{selectedOrder.orderSummary.total.toLocaleString('vi-VN')}đ</span>
                  </div>
                </div>
              </div>

              {/* Order Status */}
              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(selectedOrder.status)}
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedOrder.status)}`}>
                    {getStatusText(selectedOrder.status)}
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  Đặt lúc: {new Date(selectedOrder.createdAt).toLocaleString('vi-VN')}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex space-x-2">
                {getNextStatus(selectedOrder.status) && (
                  <button
                    onClick={() => {
                      handleStatusUpdate(selectedOrder.id, getNextStatus(selectedOrder.status)!)
                      setSelectedOrder(null)
                    }}
                    disabled={isUpdating}
                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isUpdating ? 'Đang cập nhật...' : `Chuyển sang ${getStatusText(getNextStatus(selectedOrder.status)!)}`}
                  </button>
                )}
                {selectedOrder.status === 'pending' && (
                  <button
                    onClick={() => {
                      handleStatusUpdate(selectedOrder.id, 'cancelled')
                      setSelectedOrder(null)
                    }}
                    disabled={isUpdating}
                    className="btn-outline text-red-600 border-red-600 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Hủy đơn hàng
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default AdminOrdersPage
