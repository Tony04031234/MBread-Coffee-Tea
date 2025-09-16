'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { FiMenu, FiX, FiCoffee, FiShoppingCart, FiUser, FiLogOut, FiPlus, FiMinus, FiTrash2, FiPhone, FiMapPin, FiClock, FiCreditCard, FiCheck, FiChevronLeft, FiChevronRight, FiSearch, FiNavigation, FiSettings, FiShoppingBag } from 'react-icons/fi'
import Image from 'next/image'
import { useCart } from '@/contexts/CartContext'
import { motion, AnimatePresence } from 'framer-motion'
import { useAddress } from '@/hooks/useAddress'
import { AddressSuggestion } from '@/lib/googleMaps'

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    deliveryType: 'pickup',
    paymentMethod: 'cash',
    notes: ''
  })

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
  const pathname = usePathname()
  const { data: session, status } = useSession()
  const { state: cartState, dispatch } = useCart()
  const router = useRouter()
  // Use global state for mobile cart visibility
  const showGlobalCart = cartState.showMobileCart

  // Handle body scroll lock when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  const navItems = [
    { href: '/', label: 'Trang chủ' },
    { href: '/menu', label: 'Thực đơn' },
    { href: '/about', label: 'Về chúng tôi' },
    { href: '/gallery', label: 'Thư viện ảnh' },
    { href: '/franchise', label: 'Nhượng quyền' },
    { href: '/contact', label: 'Liên hệ' },
  ]

  const isActive = (href: string) => pathname === href

  // Cart management functions
  const updateQuantity = (itemId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: itemId, quantity } })
  }

  const removeFromCart = (itemId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: itemId })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  // Checkout flow functions
  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const isFormValid = () => {
    if (currentStep === 1) return true
    if (currentStep === 2) {
      return customerInfo.name && customerInfo.phone &&
        (customerInfo.deliveryType === 'pickup' || customerInfo.address)
    }
    return true
  }

  // Address functions
  const handleDetectLocation = async () => {
    try {
      const address = await detectCurrentLocation()
      if (address) {
        setCustomerInfo({ ...customerInfo, address })
      }
    } catch (error) {
      alert('Không thể lấy vị trí hiện tại. Vui lòng nhập địa chỉ thủ công.')
    }
  }

  const handleAddressChange = (value: string) => {
    setCustomerInfo({ ...customerInfo, address: value })
    searchAddress(value)
  }

  const selectAddress = async (suggestion: AddressSuggestion) => {
    try {
      // Get detailed place information
      const placeDetails = await getPlaceDetails(suggestion.placeId)
      const address = placeDetails?.fullAddress || suggestion.fullAddress
      setCustomerInfo({ ...customerInfo, address })
      clearSuggestions()
    } catch (error) {
      // Fallback to basic address
      setCustomerInfo({ ...customerInfo, address: suggestion.fullAddress })
      clearSuggestions()
    }
  }

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setIsUserMenuOpen(false)
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 relative">
      <div className="container-custom px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/mbread-logo.png" alt="MBread Coffee & Tea" width={100} height={100} className="w-10 h-10 rounded-full" />
            <span className="text-xl md:text-2xl font-serif font-bold text-primary-800">
              MBread Coffee & Tea
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors duration-200 whitespace-nowrap ${isActive(item.href)
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-700 hover:text-primary-600'
                  }`}
              >
                {item.label}
              </Link>
            ))}


            {/* User Menu */}
            {status === 'loading' ? (
              <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
            ) : session ? (
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    router.push('/profile')
                  }}
                  className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors duration-200 text-sm"
                >
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <FiUser className="text-primary-600" />
                  </div>
                  {/* <span className="font-medium text-sm">{session.user?.name}</span> */}
                </button>

                {isUserMenuOpen && (
                  <div
                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{session.user?.name}</p>
                      <p className="text-xs text-gray-500">{session.user?.email}</p>
                      {session.user?.points && (
                        <p className="text-xs text-primary-600">Điểm: {session.user.points}</p>
                      )}
                    </div>
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Thông tin cá nhân
                    </Link>
                    <Link
                      href="/orders"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Đơn hàng của tôi
                    </Link>
                    {session.user?.role === 'ADMIN' && (
                      <Link
                        href="/admin"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Quản trị
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        signOut()
                        setIsUserMenuOpen(false)
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                    >
                      <FiLogOut className="inline mr-2" />
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/auth/signin"
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200"
              >
                <span className="text-sm">Đăng nhập</span>
              </Link>
            )}


            <Link
              href="/ordering"
              className="btn-primary flex items-center space-x-2 text-sm px-4 py-2 relative"
            >
              <FiShoppingCart />
              <span className="text-sm">Đặt món</span>
              {cartState.totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartState.totalItems}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-100"
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="lg:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 max-h-[calc(100vh-80px)] overflow-y-auto"
            >
              <div className="px-4 py-6 space-y-6">
              {/* Navigation Links */}
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide px-3">Menu</h3>
                <div className="space-y-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block py-3 px-4 rounded-lg font-medium transition-colors duration-200 ${
                        isActive(item.href)
                          ? 'text-primary-600 bg-primary-50 border-l-4 border-primary-600'
                          : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Order Button */}
              <div className="pt-2">
                <Link
                  href="/ordering"
                  onClick={() => setIsMenuOpen(false)}
                  className="btn-primary w-full flex items-center justify-center space-x-2 relative py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <FiShoppingCart size={20} />
                  <span>Đặt món ngay</span>
                  {cartState.totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold animate-pulse">
                      {cartState.totalItems}
                    </span>
                  )}
                </Link>
              </div>

              {/* User Section */}
              <div className="pt-4 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide px-3 mb-4">Tài khoản</h3>
                {status === 'loading' ? (
                  <div className="w-full h-12 bg-gray-200 rounded-lg animate-pulse"></div>
                ) : session ? (
                  <div className="space-y-4">
                    {/* User Info */}
                    <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg border border-primary-200">
                      <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center">
                        <FiUser className="text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{session.user?.name}</p>
                        <p className="text-sm text-gray-600">{session.user?.email}</p>
                        <div className="flex items-center mt-1">
                          <span className="text-xs bg-primary-600 text-white px-2 py-1 rounded-full">
                            {session.user?.role === 'ADMIN' ? 'Quản trị viên' : 'Khách hàng'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* User Menu Links */}
                    <div className="space-y-1">
                      <Link
                        href="/profile"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center space-x-3 py-3 px-4 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                      >
                        <FiUser size={18} />
                        <span>Thông tin cá nhân</span>
                      </Link>
                      <Link
                        href="/orders"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center space-x-3 py-3 px-4 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                      >
                        <FiShoppingBag size={18} />
                        <span>Đơn hàng của tôi</span>
                      </Link>
                      {session.user?.role === 'ADMIN' && (
                        <Link
                          href="/admin"
                          onClick={() => setIsMenuOpen(false)}
                          className="flex items-center space-x-3 py-3 px-4 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                        >
                          <FiSettings size={18} />
                          <span>Quản trị</span>
                        </Link>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <FiUser className="text-gray-400 text-3xl mx-auto mb-3" />
                    <p className="text-gray-600 mb-4">Đăng nhập để trải nghiệm tốt hơn</p>
                    <Link
                      href="/auth/signin"
                      onClick={() => setIsMenuOpen(false)}
                      className="btn-primary w-full flex items-center justify-center space-x-2"
                    >
                      <FiUser />
                      <span>Đăng nhập</span>
                    </Link>
                  </div>
                )}
              </div>

              {/* Sign Out Button - Always at Bottom */}
              {session && (
                <div className="pt-4 border-t border-gray-200">
                  <button
                    onClick={() => {
                      signOut()
                      setIsMenuOpen(false)
                    }}
                    className="w-full bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 border border-red-200 hover:border-red-300"
                  >
                    <FiLogOut />
                    <span>Đăng xuất</span>
                  </button>
                </div>
              )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Global Cart Button - Mobile Only */}
      <div className="lg:hidden fixed bottom-4 right-4 z-40">
        <button
          onClick={() => dispatch({ type: 'SHOW_MOBILE_CART' })}
          className="bg-primary-600 text-white p-4 rounded-full shadow-lg hover:bg-primary-700 transition-colors duration-200 relative"
        >
          <FiShoppingCart size={24} />
          {cartState.totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
              {cartState.totalItems}
            </span>
          )}
        </button>
      </div>

      {/* Global Cart Overlay */}
      <AnimatePresence>
        {showGlobalCart && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50"
            onClick={() => dispatch({ type: 'HIDE_MOBILE_CART' })}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="absolute bottom-0 left-0 right-0 bg-white rounded-t-xl max-h-[85vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0">
                  <h2 className="text-xl font-serif font-bold text-primary-800">
                    Giỏ hàng ({cartState.totalItems})
                  </h2>
                  <div className="flex items-center space-x-2">
                    {cartState.totalItems > 0 && (
                      <button
                        onClick={clearCart}
                        className="text-red-500 hover:text-red-700 text-sm font-medium"
                      >
                        Xóa tất cả
                      </button>
                    )}
                    <button
                      onClick={() => dispatch({ type: 'HIDE_MOBILE_CART' })}
                      className="p-2 hover:bg-gray-100 rounded-full"
                    >
                      <FiX size={20} />
                    </button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                  <div className="p-4">
                    {cartState.items.length === 0 ? (
                      <div className="text-center py-8">
                        <FiShoppingCart className="text-gray-400 text-4xl mx-auto mb-4" />
                        <p className="text-gray-500 mb-4">Giỏ hàng trống</p>
                        <p className="text-sm text-gray-400 mb-6">Thêm món ăn để bắt đầu đặt hàng</p>

                        {/* User Status for Empty Cart */}
                        {!session && (
                          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                            <p className="text-sm text-blue-700">
                              💡 Bạn có thể đặt món mà không cần đăng ký tài khoản
                            </p>
                          </div>
                        )}

                        <Link
                          href="/menu"
                          className="btn-primary w-full flex items-center justify-center space-x-2"
                          onClick={() => dispatch({ type: 'HIDE_MOBILE_CART' })}
                        >
                          <FiPlus />
                          <span>Thêm món</span>
                        </Link>
                      </div>
                    ) : (
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
                            <div key={item.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
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
                                <p className="text-sm text-gray-600">{item.price.toLocaleString('vi-VN')}đ</p>
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
                              <span>Tạm tính:</span>
                              <span>{cartState.totalPrice.toLocaleString('vi-VN')}đ</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Thuế (10%):</span>
                              <span>{(cartState.totalPrice * 0.1).toLocaleString('vi-VN')}đ</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Phí giao hàng:</span>
                              <span>15.000đ</span>
                            </div>
                            {cartState.totalPrice > 200000 && (
                              <div className="flex justify-between text-green-600">
                                <span>Giảm giá (5%):</span>
                                <span>-{(cartState.totalPrice * 0.05).toLocaleString('vi-VN')}đ</span>
                              </div>
                            )}
                            <div className="flex justify-between font-bold text-lg border-t pt-2">
                              <span>Tổng cộng:</span>
                              <span className="text-primary-600">
                                {(cartState.totalPrice + (cartState.totalPrice * 0.1) + 15000 - (cartState.totalPrice > 200000 ? cartState.totalPrice * 0.05 : 0)).toLocaleString('vi-VN')}đ
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Checkout Steps */}
                        <div className="space-y-4">
                          {/* Step Indicator */}
                          <div className="flex items-center justify-between">
                            {[1, 2, 3].map((step) => (
                              <div key={step} className="flex items-center">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step <= currentStep
                                    ? 'bg-primary-600 text-white'
                                    : 'bg-gray-200 text-gray-600'
                                  }`}>
                                  {step}
                                </div>
                                {step < 3 && (
                                  <div className={`w-8 h-0.5 mx-2 ${step < currentStep ? 'bg-primary-600' : 'bg-gray-200'
                                    }`} />
                                )}
                              </div>
                            ))}
                          </div>

                          {/* Step Content */}
                          {currentStep === 1 && (
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <h3 className="text-lg font-serif font-semibold text-primary-800">
                                  Thông tin khách hàng
                                </h3>
                                {!session && (
                                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                    Khách
                                  </span>
                                )}
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  <FiUser className="inline mr-2" />
                                  Họ và tên *
                                </label>
                                <input
                                  type="text"
                                  value={customerInfo.name}
                                  onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
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
                                  value={customerInfo.phone}
                                  onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
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
                                  value={customerInfo.email}
                                  onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
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
                                      checked={customerInfo.deliveryType === 'pickup'}
                                      onChange={(e) => setCustomerInfo({ ...customerInfo, deliveryType: e.target.value })}
                                      className="mr-2"
                                    />
                                    <span>Mang đi</span>
                                  </label>
                                  <label className="flex items-center">
                                    <input
                                      type="radio"
                                      value="delivery"
                                      checked={customerInfo.deliveryType === 'delivery'}
                                      onChange={(e) => setCustomerInfo({ ...customerInfo, deliveryType: e.target.value })}
                                      className="mr-2"
                                    />
                                    <span>Giao hàng (+15.000đ)</span>
                                  </label>
                                </div>
                              </div>

                              {customerInfo.deliveryType === 'delivery' && (
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
                                      value={customerInfo.address}
                                      onChange={(e) => handleAddressChange(e.target.value)}
                                      onFocus={() => customerInfo.address.length >= 3 && setShowAddressSuggestions(true)}
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
                                disabled={!customerInfo.name || !customerInfo.phone || (customerInfo.deliveryType === 'delivery' && !customerInfo.address)}
                                className="w-full btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                              >
                                <span>Tiếp tục</span>
                                <FiChevronRight />
                              </button>
                            </div>
                          )}

                          {currentStep === 2 && (
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
                                      checked={customerInfo.paymentMethod === method.id}
                                      onChange={(e) => setCustomerInfo({ ...customerInfo, paymentMethod: e.target.value })}
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
                                  value={customerInfo.notes}
                                  onChange={(e) => setCustomerInfo({ ...customerInfo, notes: e.target.value })}
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

                          {currentStep === 3 && (
                            <div className="space-y-4">
                              <h3 className="text-lg font-serif font-semibold text-primary-800">
                                Xác nhận đơn hàng
                              </h3>

                              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                                <div className="flex justify-between">
                                  <span className="font-medium">Khách hàng:</span>
                                  <span>{customerInfo.name}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="font-medium">SĐT:</span>
                                  <span>{customerInfo.phone}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="font-medium">Hình thức:</span>
                                  <span>{customerInfo.deliveryType === 'pickup' ? 'Mang đi' : 'Giao hàng'}</span>
                                </div>
                                {customerInfo.deliveryType === 'delivery' && (
                                  <div className="flex justify-between">
                                    <span className="font-medium">Địa chỉ:</span>
                                    <span className="text-right max-w-48 truncate">{customerInfo.address}</span>
                                  </div>
                                )}
                                <div className="flex justify-between">
                                  <span className="font-medium">Thanh toán:</span>
                                  <span>
                                    {customerInfo.paymentMethod === 'cash' ? 'Tiền mặt' :
                                      customerInfo.paymentMethod === 'card' ? 'Thẻ' :
                                        customerInfo.paymentMethod === 'momo' ? 'MoMo' : 'ZaloPay'}
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
                                  onClick={async () => {
                                    try {
                                      const orderData = {
                                        items: cartState.items,
                                        customerInfo: {
                                          name: customerInfo.name,
                                          phone: customerInfo.phone,
                                          email: customerInfo.email || (session?.user?.email || ''),
                                          address: customerInfo.address,
                                          deliveryType: customerInfo.deliveryType,
                                          paymentMethod: customerInfo.paymentMethod,
                                          notes: customerInfo.notes
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
                                        if (session?.user?.id) {
                                          alert('Đặt món thành công! Đơn hàng của bạn đang được xử lý.')
                                        } else {
                                          alert('Đặt món thành công! Chúng tôi sẽ liên hệ với bạn trong vòng 15 phút.')
                                        }
                                        dispatch({ type: 'HIDE_MOBILE_CART' })
                                        setCurrentStep(1)
                                        clearCart()
                                        // Reset form
                                        setCustomerInfo({
                                          name: '',
                                          phone: '',
                                          email: '',
                                          address: '',
                                          deliveryType: 'pickup',
                                          paymentMethod: 'cash',
                                          notes: ''
                                        })
                                      } else {
                                        alert(result.message || 'Đã xảy ra lỗi, vui lòng thử lại')
                                      }
                                    } catch (error) {
                                      console.error('Order error:', error)
                                      alert('Đã xảy ra lỗi, vui lòng thử lại')
                                    }
                                  }}
                                  className="flex-1 btn-primary py-3 flex items-center justify-center space-x-2"
                                >
                                  <FiCheck />
                                  <span>Đặt món</span>
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navigation
