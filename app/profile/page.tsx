'use client'

import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { FiUser, FiMail, FiPhone, FiMapPin, FiClock, FiEdit3, FiSave, FiX, FiCoffee, FiShoppingBag, FiHeart, FiPlus, FiMinus, FiCheck, FiAlertCircle, FiLogOut } from 'react-icons/fi'
import Image from 'next/image'

interface UserProfile {
  id: string
  name: string
  email: string
  phone: string
  role: 'CUSTOMER' | 'ADMIN'
  points: number
  createdAt: string
  updatedAt: string
}

interface Order {
  id: string
  userId: string
  items: Array<{
    id: string
    name: string
    price: number
    quantity: number
    image: string
  }>
  customerInfo: {
    name: string
    phone: string
    email: string
    address: string
    deliveryType: 'pickup' | 'delivery'
    paymentMethod: string
    notes: string
  }
  orderSummary: {
    subtotal: number
    tax: number
    deliveryFee: number
    discount: number
    total: number
  }
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled'
  createdAt: string
  updatedAt: string
}

interface DeliveryAddress {
  id: string
  name: string
  address: string
  phone: string
  isDefault: boolean
}

const ProfilePage = () => {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [editForm, setEditForm] = useState({
    name: '',
    phone: ''
  })
  const [orders, setOrders] = useState<Order[]>([])
  const [deliveryAddresses, setDeliveryAddresses] = useState<DeliveryAddress[]>([])
  const [favorites, setFavorites] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'addresses' | 'favorites'>('profile')
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [showAddAddressModal, setShowAddAddressModal] = useState(false)
  const [newAddress, setNewAddress] = useState({
    name: '',
    address: '',
    phone: '',
    isDefault: false
  })

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
      return
    }

    if (session?.user?.id) {
      loadUserProfile()
    }
  }, [session, status, router])

  const loadUserProfile = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/user/profile')
      const data = await response.json()
      
      if (response.ok) {
        setProfile(data.user)
        setEditForm({
          name: data.user.name,
          phone: data.user.phone
        })
      } else {
        console.error('Error loading profile:', data.message)
      }
    } catch (error) {
      console.error('Error loading profile:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditForm({
      name: profile?.name || '',
      phone: profile?.phone || ''
    })
  }

  const handleSave = async () => {
    try {
      setIsSaving(true)
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: editForm.name,
          phone: editForm.phone
        })
      })

      const data = await response.json()

      if (response.ok) {
        setProfile(data.user)
        setIsEditing(false)
        setSuccessMessage('Cập nhật thông tin thành công!')
        setShowSuccessMessage(true)
        setTimeout(() => setShowSuccessMessage(false), 3000)
      } else {
        alert(data.message || 'Có lỗi xảy ra khi cập nhật thông tin')
      }
    } catch (error) {
      console.error('Error updating profile:', error)
      alert('Có lỗi xảy ra khi cập nhật thông tin')
    } finally {
      setIsSaving(false)
    }
  }

  const loadOrders = async () => {
    try {
      const response = await fetch('/api/orders')
      const data = await response.json()
      
      if (response.ok) {
        setOrders(data.orders || [])
      } else {
        console.error('Error loading orders:', data.message)
      }
    } catch (error) {
      console.error('Error loading orders:', error)
    }
  }

  const loadDeliveryAddresses = async () => {
    try {
      const response = await fetch('/api/user/addresses')
      const data = await response.json()
      
      if (response.ok) {
        setDeliveryAddresses(data.addresses || [])
      } else {
        console.error('Error loading addresses:', data.message)
        // Fallback to mock data if API fails
        setDeliveryAddresses([
          {
            id: '1',
            name: 'Nhà riêng',
            address: '123 Đường ABC, Quận 1, TP.HCM',
            phone: profile?.phone || '',
            isDefault: true
          }
        ])
      }
    } catch (error) {
      console.error('Error loading addresses:', error)
      // Fallback to mock data if API fails
      setDeliveryAddresses([
        {
          id: '1',
          name: 'Nhà riêng',
          address: '123 Đường ABC, Quận 1, TP.HCM',
          phone: profile?.phone || '',
          isDefault: true
        }
      ])
    }
  }

  const loadFavorites = async () => {
    // For now, we'll use mock data. In a real app, this would come from an API
    setFavorites(['item1', 'item2', 'item3'])
  }

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'delivery':
        setActiveTab('addresses')
        loadDeliveryAddresses()
        break
      case 'orders':
        setActiveTab('orders')
        loadOrders()
        break
      case 'favorites':
        setActiveTab('favorites')
        loadFavorites()
        break
      default:
        break
    }
  }

  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN') + 'đ'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'confirmed': return 'bg-blue-100 text-blue-800'
      case 'preparing': return 'bg-orange-100 text-orange-800'
      case 'ready': return 'bg-green-100 text-green-800'
      case 'delivered': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Chờ xác nhận'
      case 'confirmed': return 'Đã xác nhận'
      case 'preparing': return 'Đang chuẩn bị'
      case 'ready': return 'Sẵn sàng'
      case 'delivered': return 'Đã giao'
      case 'cancelled': return 'Đã hủy'
      default: return status
    }
  }

  const handleAddAddress = async () => {
    try {
      const response = await fetch('/api/user/addresses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newAddress)
      })

      const data = await response.json()

      if (response.ok) {
        setShowAddAddressModal(false)
        setNewAddress({ name: '', address: '', phone: '', isDefault: false })
        setSuccessMessage('Thêm địa chỉ thành công!')
        setShowSuccessMessage(true)
        setTimeout(() => setShowSuccessMessage(false), 3000)
        loadDeliveryAddresses() // Reload addresses
      } else {
        alert(data.message || 'Có lỗi xảy ra khi thêm địa chỉ')
      }
    } catch (error) {
      console.error('Error adding address:', error)
      alert('Có lỗi xảy ra khi thêm địa chỉ')
    }
  }

  const handleLogout = async () => {
    if (confirm('Bạn có chắc chắn muốn đăng xuất?')) {
      await signOut({ callbackUrl: '/' })
    }
  }

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="text-center">
          <div className="spinner w-8 h-8 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải thông tin...</p>
        </div>
      </div>
    )
  }

  if (!session || !profile) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Không thể tải thông tin người dùng</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream-50 py-8">
      {/* Success Message */}
      <AnimatePresence>
        {showSuccessMessage && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50"
          >
            <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2">
              <FiCheck />
              <span>{successMessage}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Address Modal */}
      <AnimatePresence>
        {showAddAddressModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            onClick={() => setShowAddAddressModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-xl p-6 max-w-md mx-4 w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-serif font-bold text-primary-800">
                  Thêm địa chỉ mới
                </h3>
                <button
                  onClick={() => setShowAddAddressModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FiX size={20} />
                </button> 
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tên địa chỉ *
                  </label>
                  <input
                    type="text"
                    value={newAddress.name}
                    onChange={(e) => setNewAddress({...newAddress, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Ví dụ: Nhà riêng, Công ty..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Địa chỉ chi tiết *
                  </label>
                  <textarea
                    value={newAddress.address}
                    onChange={(e) => setNewAddress({...newAddress, address: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    rows={3}
                    placeholder="Nhập địa chỉ chi tiết..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Số điện thoại *
                  </label>
                  <input
                    type="tel"
                    value={newAddress.phone}
                    onChange={(e) => setNewAddress({...newAddress, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Nhập số điện thoại..."
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isDefault"
                    checked={newAddress.isDefault}
                    onChange={(e) => setNewAddress({...newAddress, isDefault: e.target.checked})}
                    className="mr-2"
                  />
                  <label htmlFor="isDefault" className="text-sm text-gray-700">
                    Đặt làm địa chỉ mặc định
                  </label>
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setShowAddAddressModal(false)}
                  className="flex-1 btn-outline"
                >
                  Hủy
                </button>
                <button
                  onClick={handleAddAddress}
                  disabled={!newAddress.name || !newAddress.address || !newAddress.phone}
                  className="flex-1 btn-primary text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Thêm địa chỉ
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container-custom px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex items-center md:justify-between justify-center flex-wrap gap-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-primary-100 rounded-full flex items-center justify-center">
                  <FiUser className="text-primary-600 md:text-2xl text-xl" />
                </div>
                <div>
                  <h1 className="text-xl md:text-2xl font-serif font-bold text-primary-800">
                    Thông tin cá nhân
                  </h1>
                  <p className="text-gray-600 text-sm md:text-base">Quản lý thông tin tài khoản của bạn</p>
                </div>
              </div>
              
              {/* Tab Navigation */}
              <div className="flex space-x-2">
                {[
                  { id: 'profile', label: 'Hồ sơ', icon: FiUser },
                  { id: 'orders', label: 'Đơn hàng', icon: FiShoppingBag },
                  { id: 'addresses', label: 'Địa chỉ', icon: FiMapPin },
                  { id: 'favorites', label: 'Yêu thích', icon: FiHeart }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <tab.icon size={16} />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {activeTab === 'profile' && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Profile Information */}
                  <div className="lg:col-span-2">
                    <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-serif font-semibold text-primary-800">
                    Thông tin cơ bản
                  </h2>
                  {!isEditing ? (
                    <button
                      onClick={handleEdit}
                      className="btn-outline flex items-center space-x-2 text-sm md:text-base md:p-3 p-1"
                    >
                      <FiEdit3 />
                      <span className="text-sm md:text-base">Chỉnh sửa</span>
                    </button>
                  ) : (
                    <div className="flex space-x-2">
                      <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="btn-primary flex items-center space-x-2 text-sm md:text-base md:p-3 p-1 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSaving ? (
                          <>
                            <div className="spinner w-4 h-4"></div>
                            <span className="text-sm md:text-base">Đang lưu...</span>
                          </>
                        ) : (
                          <>
                            <FiSave />
                            <span className="text-sm md:text-base">Lưu</span>
                          </>
                        )}
                      </button>
                      <button
                        onClick={handleCancel}
                        className="btn-outline flex items-center space-x-2 text-sm md:text-base md:p-3 p-1"
                      >
                        <FiX />
                        <span className="text-sm md:text-base">Hủy</span>
                      </button>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FiUser className="inline mr-2" />
                      <span className="text-sm md:text-base">Họ và tên</span>
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{profile.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FiMail className="inline mr-2" />
                      <span className="text-sm md:text-base">Email</span>
                    </label>
                    <p className="text-gray-900">{profile.email}</p>
                    <p className="text-xs text-gray-500 mt-1 text-sm md:text-base">Email không thể thay đổi</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FiPhone className="inline mr-2" />
                      <span className="text-sm md:text-base">Số điện thoại</span>
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={editForm.phone}
                        onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{profile.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FiCoffee className="inline mr-2" />
                      <span className="text-sm md:text-base">Loại tài khoản</span>  
                    </label>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      profile.role === 'ADMIN' 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {profile.role === 'ADMIN' ? 'Quản trị viên' : 'Khách hàng'}
                    </span>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FiClock className="inline mr-2" />
                      Tham gia từ
                    </label>
                    <p className="text-gray-900">
                      {new Date(profile.createdAt).toLocaleDateString('vi-VN')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats & Actions */}
            <div className="space-y-6">
              {/* Points Card */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-serif font-semibold text-primary-800 mb-4">
                  Điểm tích lũy
                </h3>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600 mb-2">
                    {profile.points.toLocaleString('vi-VN')}
                  </div>
                  <p className="text-gray-600 text-sm">điểm hiện có</p>
                  <div className="mt-4 p-3 bg-primary-50 rounded-lg">
                    <p className="text-sm text-primary-700">
                      Mỗi 1.000đ = 1 điểm<br />
                      Đổi điểm lấy quà tặng
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-serif font-semibold text-primary-800 mb-4">
                  Thao tác nhanh
                </h3>
                <div className="space-y-3">
                  <button 
                    onClick={() => handleQuickAction('delivery')}
                    className="w-full btn-outline text-left flex items-center space-x-3 hover:bg-primary-50 hover:border-primary-300 transition-colors"
                  >
                    <FiMapPin />
                    <span>Địa chỉ giao hàng</span>
                  </button>
                  <button 
                    onClick={() => handleQuickAction('orders')}
                    className="w-full btn-outline text-left flex items-center space-x-3 hover:bg-primary-50 hover:border-primary-300 transition-colors"
                  >
                    <FiShoppingBag />
                    <span>Lịch sử đơn hàng</span>
                  </button>
                  <button 
                    onClick={() => handleQuickAction('favorites')}
                    className="w-full btn-outline text-left flex items-center space-x-3 hover:bg-primary-50 hover:border-primary-300 transition-colors"
                  >
                    <FiHeart />
                    <span>Món yêu thích</span>
                  </button>
                </div>
              </div>

              {/* Account Status */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-serif font-semibold text-primary-800 mb-4">
                  Trạng thái tài khoản
                </h3>
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email xác thực:</span>
                    <span className="text-green-600 font-medium">✓ Đã xác thực</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Số điện thoại:</span>
                    <span className="text-green-600 font-medium">✓ Đã xác thực</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tài khoản:</span>
                    <span className="text-green-600 font-medium">✓ Hoạt động</span>
                  </div>
                </div>
                
                {/* Logout Button */}
                <div className="pt-4 border-t border-gray-200">
                  <button
                    onClick={handleLogout}
                    className="w-full bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 border border-red-200 hover:border-red-300"
                  >
                    <FiLogOut />
                    <span>Đăng xuất</span>
                  </button>
                </div>
              </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'orders' && (
              <motion.div
                key="orders"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-serif font-semibold text-primary-800">
                      Lịch sử đơn hàng
                    </h2>
                    <button
                      onClick={loadOrders}
                      className="btn-outline flex items-center space-x-2 text-sm md:text-base md:p-3 p-1"
                    >
                      <FiClock />
                      <span className="text-sm md:text-base">Tải lại</span>
                    </button>
                  </div>

                  {orders.length === 0 ? (
                    <div className="text-center py-12">
                      <FiShoppingBag className="text-gray-400 text-4xl mx-auto mb-4" />
                      <p className="text-gray-500 mb-2">Chưa có đơn hàng nào</p>
                      <p className="text-sm text-gray-400">Đặt món để xem lịch sử đơn hàng</p>
                      <button
                        onClick={() => router.push('/ordering')}
                        className="btn-primary mt-4"
                      >
                        Đặt món ngay
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <span className="font-medium text-primary-800">
                                Đơn hàng #{order.id.slice(-8)}
                              </span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                {getStatusText(order.status)}
                              </span>
                            </div>
                            <span className="text-sm text-gray-500">
                              {new Date(order.createdAt).toLocaleDateString('vi-VN')}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                            <div>
                              <p className="text-sm text-gray-600">Khách hàng: {order.customerInfo.name}</p>
                              <p className="text-sm text-gray-600">SĐT: {order.customerInfo.phone}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">
                                Hình thức: {order.customerInfo.deliveryType === 'pickup' ? 'Mang đi' : 'Giao hàng'}
                              </p>
                              <p className="text-sm text-gray-600">
                                Thanh toán: {order.customerInfo.paymentMethod}
                              </p>
                            </div>
                          </div>

                          <div className="space-y-2 mb-3">
                            {order.items.map((item) => (
                              <div key={item.id} className="flex items-center justify-between text-sm">
                                <span>{item.name} x{item.quantity}</span>
                                <span>{formatPrice(item.price * item.quantity)}</span>
                              </div>
                            ))}
                          </div>

                          <div className="flex items-center justify-between pt-3 border-t">
                            <span className="text-sm text-gray-600">
                              Tổng cộng: <span className="font-bold text-primary-600">{formatPrice(order.orderSummary.total)}</span>
                            </span>
                            <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                              Xem chi tiết
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === 'addresses' && (
              <motion.div
                key="addresses"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-serif font-semibold text-primary-800">
                      Địa chỉ giao hàng
                    </h2>
                    <button 
                      onClick={() => setShowAddAddressModal(true)}
                      className="btn-primary flex items-center space-x-2 text-sm md:text-base md:p-3 p-1"
                    >
                      <FiPlus />
                      <span className="text-sm md:text-base">Thêm</span>
                    </button>
                  </div>

                  {deliveryAddresses.length === 0 ? (
                    <div className="text-center py-12">
                      <FiMapPin className="text-gray-400 text-4xl mx-auto mb-4" />
                      <p className="text-gray-500 mb-2">Chưa có địa chỉ nào</p>
                      <p className="text-sm text-gray-400">Thêm địa chỉ để giao hàng nhanh hơn</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {deliveryAddresses.map((address) => (
                        <div key={address.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-medium text-primary-800">{address.name}</h3>
                            {address.isDefault && (
                              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                Mặc định
                              </span>
                            )}
                          </div>
                          <p className="text-gray-600 mb-2">{address.address}</p>
                          <p className="text-sm text-gray-500">SĐT: {address.phone}</p>
                          <div className="flex space-x-2 mt-3">
                            <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                              Chỉnh sửa
                            </button>
                            <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                              Xóa
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === 'favorites' && (
              <motion.div
                key="favorites"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-serif font-semibold text-primary-800">
                      Món yêu thích
                    </h2>
                    <button
                      onClick={() => router.push('/menu')}
                      className="btn-outline flex items-center space-x-2 text-sm md:text-base md:p-3 p-1"
                    >
                      <FiCoffee />
                      <span className="text-sm md:text-base">Xem menu</span>
                    </button>
                  </div>

                  {favorites.length === 0 ? (
                    <div className="text-center py-12">
                      <FiHeart className="text-gray-400 text-4xl mx-auto mb-4" />
                      <p className="text-gray-500 mb-2 text-sm md:text-base">Chưa có món yêu thích nào</p>
                      <p className="text-sm text-gray-400">Thêm món vào yêu thích để đặt nhanh hơn</p>
                      <button
                        onClick={() => router.push('/menu')}
                        className="btn-primary mt-4"
                      >
                        <span className="text-sm md:text-base">Khám phá menu</span>
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {favorites.map((favorite) => (
                        <div key={favorite} className="border border-gray-200 rounded-lg p-4">
                          <div className="w-full h-32 bg-gray-200 rounded-lg mb-3"></div>
                          <h3 className="font-medium text-primary-800 mb-2">Món yêu thích</h3>
                          <p className="text-gray-600 text-sm mb-3">Mô tả món ăn...</p>
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-primary-600">50.000đ</span>
                            <button className="btn-primary text-sm px-3 py-1">
                              Đặt ngay
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}

export default ProfilePage
