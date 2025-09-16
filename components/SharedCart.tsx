'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiPlus, 
  FiMinus, 
  FiTrash2, 
  FiUser, 
  FiPhone, 
  FiMapPin, 
  FiClock, 
  FiCreditCard, 
  FiCheck, 
  FiX, 
  FiChevronLeft, 
  FiChevronRight, 
  FiSearch, 
  FiNavigation,
  FiShoppingCart
} from 'react-icons/fi'
import { useCart } from '@/contexts/CartContext'
import { useAddress } from '@/hooks/useAddress'
import { AddressSuggestion } from '@/lib/googleMaps'
import { useSession } from 'next-auth/react'

interface SharedCartProps {
  isMobile?: boolean
  onClose?: () => void
}

const SharedCart: React.FC<SharedCartProps> = ({ isMobile = false, onClose }) => {
  const { state: cartState, dispatch } = useCart()
  const { data: session } = useSession()
  const [userProfile, setUserProfile] = useState<any>(null)
  const [isLoadingProfile, setIsLoadingProfile] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Use the address hook
  const {
    addressSuggestions,
    showAddressSuggestions,
    setShowAddressSuggestions,
    isDetectingLocation,
    isSearching,
    searchAddress,
    detectCurrentLocation,
    getPlaceDetails,
    clearSuggestions
  } = useAddress()

  // Load user profile data for auto-fill
  const loadUserProfile = async () => {
    if (!session?.user?.id) return
    
    try {
      setIsLoadingProfile(true)
      console.log('Loading user profile for:', session.user.id)
      const response = await fetch('/api/user/profile')
      const data = await response.json()
      
      console.log('Profile response:', data)
      
      if (response.ok && data.user) {
        setUserProfile(data.user)
        // Auto-fill customer info with profile data
        const newCustomerInfo = {
          name: data.user.name || '',
          phone: data.user.phone || '',
          email: data.user.email || session.user?.email || '',
          address: cartState.customerInfo.address,
          deliveryType: cartState.customerInfo.deliveryType,
          paymentMethod: cartState.customerInfo.paymentMethod,
          notes: cartState.customerInfo.notes
        }
        console.log('Auto-filling customer info:', newCustomerInfo)
        dispatch({ type: 'UPDATE_CUSTOMER_INFO', payload: newCustomerInfo })
      } else {
        console.error('Failed to load profile:', data.message)
      }
    } catch (error) {
      console.error('Error loading user profile:', error)
    } finally {
      setIsLoadingProfile(false)
    }
  }

  // Load profile when user signs in
  useEffect(() => {
    if (session?.user?.id && !userProfile) {
      loadUserProfile()
    }
  }, [session?.user?.id])

  // Auto-fill email from session immediately when available
  useEffect(() => {
    if (session?.user?.email && !cartState.customerInfo.email) {
      dispatch({ type: 'UPDATE_CUSTOMER_INFO', payload: { email: session.user.email } })
    }
  }, [session?.user?.email, cartState.customerInfo.email])

  // Load profile when mobile cart is opened
  useEffect(() => {
    if (cartState.showMobileCart && session?.user?.id && !userProfile && !isLoadingProfile) {
      console.log('Mobile cart opened, loading profile...')
      loadUserProfile()
    }
  }, [cartState.showMobileCart, session?.user?.id, userProfile, isLoadingProfile])

  // Cart functions
  const updateQuantity = (itemId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: itemId, quantity } })
  }

  const removeFromCart = (itemId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: itemId })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  const updateCustomerInfo = (updates: Partial<typeof cartState.customerInfo>) => {
    dispatch({ type: 'UPDATE_CUSTOMER_INFO', payload: updates })
  }

  const nextStep = () => {
    if (cartState.currentStep < 3) {
      dispatch({ type: 'SET_CHECKOUT_STEP', payload: cartState.currentStep + 1 })
    }
  }

  const prevStep = () => {
    if (cartState.currentStep > 1) {
      dispatch({ type: 'SET_CHECKOUT_STEP', payload: cartState.currentStep - 1 })
    }
  }

  // Address functions
  const handleDetectLocation = async () => {
    try {
      const address = await detectCurrentLocation()
      if (address) {
        updateCustomerInfo({ address })
      }
    } catch (error) {
      alert('Không thể lấy vị trí hiện tại. Vui lòng nhập địa chỉ thủ công.')
    }
  }

  const handleAddressChange = (value: string) => {
    updateCustomerInfo({ address: value })
    searchAddress(value)
  }

  const selectAddress = async (suggestion: AddressSuggestion) => {
    try {
      // Get detailed place information
      const placeDetails = await getPlaceDetails(suggestion.placeId)
      const address = placeDetails?.fullAddress || suggestion.fullAddress
      updateCustomerInfo({ address })
      clearSuggestions()
    } catch (error) {
      // Fallback to basic address
      updateCustomerInfo({ address: suggestion.fullAddress })
      clearSuggestions()
    }
  }

  // Order calculations
  const calculateOrderSummary = () => {
    const subtotal = cartState.totalPrice
    const tax = subtotal * 0.1 // 10% tax
    const deliveryFee = cartState.customerInfo.deliveryType === 'delivery' ? 15000 : 0
    const discount = subtotal > 200000 ? subtotal * 0.05 : 0 // 5% discount for orders over 200k
    const total = subtotal + tax + deliveryFee - discount

    return { subtotal, tax, deliveryFee, discount, total }
  }

  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN') + 'đ'
  }

  const orderSummary = calculateOrderSummary()

  const isFormValid = () => {
    if (cartState.currentStep === 1) return true
    if (cartState.currentStep === 2) {
      return cartState.customerInfo.name && cartState.customerInfo.phone && 
             (cartState.customerInfo.deliveryType === 'pickup' || cartState.customerInfo.address)
    }
    return true
  }

  const handleSubmitOrder = async () => {
    setIsSubmitting(true)
    
    try {
      const orderData = {
        items: cartState.items,
        customerInfo: {
          name: cartState.customerInfo.name,
          phone: cartState.customerInfo.phone,
          email: cartState.customerInfo.email || (session?.user?.email || ''),
          address: cartState.customerInfo.address,
          deliveryType: cartState.customerInfo.deliveryType,
          paymentMethod: cartState.customerInfo.paymentMethod,
          notes: cartState.customerInfo.notes
        },
        isGuestOrder: !session?.user?.id
      }

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      })

      const result = await response.json()

      if (response.ok) {
        console.log('Order created successfully:', result.order?.id)
        
        // Reset cart and show success
        dispatch({ type: 'RESET_CHECKOUT' })
        
        if (session?.user?.id) {
          alert('Đặt món thành công! Đơn hàng của bạn đang được xử lý.')
        } else {
          alert('Đặt món thành công! Chúng tôi sẽ liên hệ với bạn trong vòng 15 phút.')
        }
        
        if (onClose) onClose()
      } else {
        alert(result.message || 'Đã xảy ra lỗi, vui lòng thử lại')
      }
    } catch (error) {
      console.error('Order error:', error)
      alert('Đã xảy ra lỗi, vui lòng thử lại')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (cartState.items.length === 0) {
    return (
      <div className="text-center py-8 bg-white rounded-xl shadow-lg">
        <FiShoppingCart className="text-gray-400 text-4xl mx-auto mb-4" />
        <p className="text-gray-500">Giỏ hàng trống</p>
        <p className="text-sm text-gray-400 mt-2">Thêm món ăn để bắt đầu đặt hàng</p>
        {!session && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-700">
              💡 Bạn có thể đặt món mà không cần đăng ký tài khoản
            </p>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={`bg-white ${isMobile ? 'p-0' : 'p-6 rounded-xl shadow-lg'} ${isMobile ? '' : 'sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto'}`}>
      {!isMobile && (
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <FiShoppingCart className="text-primary-600 text-xl" />
            <h2 className="text-2xl font-serif font-bold text-primary-800">
              Giỏ hàng ({cartState.items.length})
            </h2>
          </div>
          {cartState.items.length > 0 && (
            <button
              onClick={clearCart}
              className="text-red-500 hover:text-red-700 text-sm font-medium"
            >
              Xóa tất cả
            </button>
          )}
        </div>
      )}

      <div className="space-y-4">
        {/* User Status Indicator */}
        {!session && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <FiUser className="text-yellow-600" />
              <span className="text-sm text-yellow-800 font-medium">Đặt món không cần đăng ký</span>
            </div>
            <p className="text-xs text-yellow-700 mt-1">
              Chỉ cần điền thông tin liên hệ để hoàn tất đơn hàng
            </p>
          </div>
        )}
        
        {session && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <FiUser className="text-green-600" />
              <span className="text-sm text-green-800 font-medium">Chào mừng, {session.user?.name}!</span>
            </div>
            <p className="text-xs text-green-700 mt-1">
              Bạn có thể theo dõi đơn hàng và tích lũy điểm thưởng
            </p>
          </div>
        )}

        {/* Cart Items */}
        <div className="space-y-3 overflow-y-auto pr-2">
          {cartState.items.map((item) => (
            <div key={item.id} className="flex items-center space-x-3 md:p-3 rounded-lg">
              <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-primary-800 truncate">{item.name}</h4>
                <p className="text-sm text-gray-600">{formatPrice(item.price)}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors duration-200"
                >
                  <FiMinus size={14} />
                </button>
                <span className="w-8 text-center font-medium">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors duration-200"
                >
                  <FiPlus size={14} />
                </button>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700 transition-colors duration-200 p-1"
              >
                <FiTrash2 size={16} />
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="border-t pt-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Tạm tính:</span>
              <span>{formatPrice(orderSummary.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">Thuế VAT (10%):</span>
              <span>{formatPrice(orderSummary.tax)}</span>
            </div>
            {orderSummary.deliveryFee > 0 && (
              <div className="flex justify-between">
                <span className="text-sm font-medium">Phí giao hàng:</span>
                <span>{formatPrice(orderSummary.deliveryFee)}</span>
              </div>
            )}
            {orderSummary.discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span className="text-sm font-medium">Giảm giá (5%):</span>
                <span>-{formatPrice(orderSummary.discount)}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-lg border-t pt-2">
              <span className="text-sm font-bold">Tổng cộng:</span>
              <span className="text-primary-600">{formatPrice(orderSummary.total)}</span>
            </div>
          </div>
        </div>

        {/* Checkout Steps */}
        <div className="space-y-4">
          {/* Step Indicator */}
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step <= cartState.currentStep 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`w-24 h-0.5 mx-2 ${
                    step < cartState.currentStep ? 'bg-primary-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>

          {/* Step Content */}
          {cartState.currentStep === 1 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-serif font-semibold text-primary-800">
                  Thông tin khách hàng
                </h3>
                <div className="flex items-center space-x-2">
                  {session && userProfile && (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      ✓ Đã tự động điền
                    </span>
                  )}
                  {session && isLoadingProfile && (
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full flex items-center">
                      <div className="spinner w-3 h-3 mr-1"></div>
                      Đang tải...
                    </span>
                  )}
                  {!session && (
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      Khách
                    </span>
                  )}
                </div>
              </div>

              {/* Manual load profile button for signed-in users */}
              {session && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <FiUser className="text-blue-600" />
                      <span className="text-sm text-blue-800 font-medium">
                        {userProfile ? 'Thông tin đã được điền' : 'Tự động điền thông tin từ hồ sơ'}
                      </span>
                    </div>
                    <button
                      onClick={loadUserProfile}
                      disabled={isLoadingProfile}
                      className="text-xs bg-blue-600 text-white px-3 py-1 rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                      {isLoadingProfile ? 'Đang tải...' : userProfile ? 'Làm mới' : 'Điền tự động'}
                    </button>
                  </div>
                  <p className="text-xs text-blue-700 mt-1">
                    {userProfile 
                      ? 'Thông tin đã được tự động điền từ hồ sơ của bạn' 
                      : 'Nhấn để tự động điền thông tin từ hồ sơ của bạn'
                    }
                  </p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FiUser className="inline mr-2" />
                  Họ và tên *
                </label>
                <input
                  type="text"
                  value={cartState.customerInfo.name}
                  onChange={(e) => updateCustomerInfo({ name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Nhập họ và tên"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FiPhone className="inline mr-2" />
                  Số điện thoại *
                </label>
                <input
                  type="tel"
                  value={cartState.customerInfo.phone}
                  onChange={(e) => updateCustomerInfo({ phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Nhập số điện thoại"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={cartState.customerInfo.email}
                  onChange={(e) => updateCustomerInfo({ email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Nhập email (tùy chọn)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FiClock className="inline mr-2" />
                  Hình thức nhận hàng
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="pickup"
                      checked={cartState.customerInfo.deliveryType === 'pickup'}
                      onChange={(e) => updateCustomerInfo({ deliveryType: e.target.value as 'pickup' | 'delivery' })}
                      className="mr-2"
                    />
                    <span>Mang đi</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="delivery"
                      checked={cartState.customerInfo.deliveryType === 'delivery'}
                      onChange={(e) => updateCustomerInfo({ deliveryType: e.target.value as 'pickup' | 'delivery' })}
                      className="mr-2"
                    />
                    <span>Giao hàng (+{formatPrice(15000)})</span>
                  </label>
                </div>
              </div>

              {cartState.customerInfo.deliveryType === 'delivery' && (
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FiMapPin className="inline mr-2" />
                    Địa chỉ giao hàng *
                  </label>
                  
                  {/* Location Detection Button */}
                  <div className="mb-3">
                    <button
                      type="button"
                      onClick={handleDetectLocation}
                      disabled={isDetectingLocation}
                      className="flex items-center space-x-2 text-sm text-primary-600 hover:text-primary-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FiNavigation size={16} />
                      <span>{isDetectingLocation ? 'Đang lấy vị trí...' : 'Tự động lấy vị trí hiện tại'}</span>
                    </button>
                  </div>

                  {/* Smart Address Input */}
                  <div className="relative">
                    <input
                      type="text"
                      value={cartState.customerInfo.address}
                      onChange={(e) => handleAddressChange(e.target.value)}
                      onFocus={() => cartState.customerInfo.address.length >= 3 && setShowAddressSuggestions(true)}
                      onBlur={() => setTimeout(() => setShowAddressSuggestions(false), 200)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent pr-10"
                      placeholder="Nhập địa chỉ hoặc tên đường..."
                    />
                    <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  </div>

                  {/* Address Suggestions Dropdown */}
                  {showAddressSuggestions && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      {isSearching ? (
                        <div className="px-4 py-3 text-center text-gray-500">
                          <div className="flex items-center justify-center space-x-2">
                            <div className="spinner w-4 h-4"></div>
                            <span className="text-sm">Đang tìm kiếm...</span>
                          </div>
                        </div>
                      ) : addressSuggestions.length > 0 ? (
                        addressSuggestions.map((suggestion) => (
                          <button
                            key={suggestion.id}
                            type="button"
                            onClick={() => selectAddress(suggestion)}
                            className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 flex items-center space-x-2"
                          >
                            <FiMapPin size={16} className="text-gray-400 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{suggestion.address}</span>
                          </button>
                        ))
                      ) : (
                        <div className="px-4 py-3 text-center text-gray-500">
                          <span className="text-sm">Không tìm thấy địa chỉ phù hợp</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              <button
                onClick={nextStep}
                disabled={!cartState.customerInfo.name || !cartState.customerInfo.phone || (cartState.customerInfo.deliveryType === 'delivery' && !cartState.customerInfo.address)}
                className="w-full btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <span>Tiếp tục</span>
                <FiChevronRight />
              </button>
            </div>
          )}

          {cartState.currentStep === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-serif font-semibold text-primary-800">
                Phương thức thanh toán
              </h3>
              
              <div className="space-y-3">
                {[
                  { id: 'cash', label: 'Tiền mặt', icon: '💵' },
                  { id: 'card', label: 'Thẻ tín dụng/ghi nợ', icon: '💳' },
                  { id: 'momo', label: 'Ví MoMo', icon: '📱' },
                  { id: 'zalopay', label: 'ZaloPay', icon: '📱' }
                ].map((method) => (
                  <label key={method.id} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.id}
                      checked={cartState.customerInfo.paymentMethod === method.id}
                      onChange={(e) => updateCustomerInfo({ paymentMethod: e.target.value as any })}
                      className="mr-3"
                    />
                    <span className="mr-3">{method.icon}</span>
                    <span>{method.label}</span>
                  </label>
                ))}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ghi chú đặc biệt
                </label>
                <textarea
                  value={cartState.customerInfo.notes}
                  onChange={(e) => updateCustomerInfo({ notes: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  rows={3}
                  placeholder="Ghi chú cho đơn hàng (tùy chọn)"
                />
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={prevStep}
                  className="flex-1 btn-outline py-3 flex items-center justify-center space-x-2"
                >
                  <FiChevronLeft />
                  <span>Quay lại</span>
                </button>
                <button
                  onClick={nextStep}
                  className="flex-1 btn-primary py-3 flex items-center justify-center space-x-2"
                >
                  <span>Tiếp tục</span>
                  <FiChevronRight />
                </button>
              </div>
            </div>
          )}

          {cartState.currentStep === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-serif font-semibold text-primary-800">
                Xác nhận đơn hàng
              </h3>
              
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Khách hàng:</span>
                  <span>{cartState.customerInfo.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">SĐT:</span>
                  <span>{cartState.customerInfo.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Hình thức:</span>
                  <span>{cartState.customerInfo.deliveryType === 'pickup' ? 'Mang đi' : 'Giao hàng'}</span>
                </div>
                {cartState.customerInfo.deliveryType === 'delivery' && (
                  <div className="flex justify-between">
                    <span className="font-medium">Địa chỉ:</span>
                    <span className="text-right max-w-48 truncate">{cartState.customerInfo.address}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="font-medium">Thanh toán:</span>
                  <span>
                    {cartState.customerInfo.paymentMethod === 'cash' ? 'Tiền mặt' :
                     cartState.customerInfo.paymentMethod === 'card' ? 'Thẻ' :
                     cartState.customerInfo.paymentMethod === 'momo' ? 'MoMo' : 'ZaloPay'}
                  </span>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={prevStep}
                  className="flex-1 btn-outline py-3 flex items-center justify-center space-x-2"
                >
                  <FiChevronLeft />
                  <span>Quay lại</span>
                </button>
                <button
                  onClick={handleSubmitOrder}
                  disabled={isSubmitting}
                  className="flex-1 btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="spinner w-5 h-5"></div>
                      <span>Đang xử lý...</span>
                    </>
                  ) : (
                    <>
                      <FiCheck />
                      <span>Đặt món</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SharedCart
