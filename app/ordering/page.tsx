'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { FiPlus, FiMinus, FiShoppingCart, FiTrash2, FiUser, FiPhone, FiMapPin, FiClock, FiCreditCard, FiCheck, FiX, FiChevronLeft, FiChevronRight, FiSearch, FiNavigation, FiLogIn } from 'react-icons/fi'
import { menuItems, categories } from '@/data/menu'
import { useCart } from '@/contexts/CartContext'
import { useAddress } from '@/hooks/useAddress'
import { AddressSuggestion } from '@/lib/googleMaps'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

interface CustomerInfo {
  name: string
  phone: string
  email: string
  address: string
  deliveryType: 'pickup' | 'delivery'
  paymentMethod: 'cash' | 'card' | 'momo' | 'zalopay'
  notes: string
}

interface OrderSummary {
  subtotal: number
  tax: number
  deliveryFee: number
  discount: number
  total: number
}

const OrderingPage = () => {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { state: cartState, dispatch } = useCart()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showCart, setShowCart] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(false)
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: '',
    phone: '',
    email: '',
    address: '',
    deliveryType: 'pickup',
    paymentMethod: 'cash',
    notes: ''
  })
  const [userProfile, setUserProfile] = useState<any>(null)
  const [isLoadingProfile, setIsLoadingProfile] = useState(false)

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
      const response = await fetch('/api/user/profile')
      const data = await response.json()
      
      if (response.ok && data.user) {
        setUserProfile(data.user)
        // Auto-fill customer info with profile data
        setCustomerInfo(prev => ({
          ...prev,
          name: data.user.name || '',
          phone: data.user.phone || '',
          email: data.user.email || session.user?.email || ''
        }))
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

  const filteredItems = selectedCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory)

  // Cart functions
  const addToCart = (item: typeof menuItems[0]) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image
      }
    })
    // Show cart on mobile after adding item
    if (window.innerWidth < 1024) {
      setShowCart(true)
    }
  }

  const removeFromCart = (itemId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: itemId })
  }

  const updateQuantity = (itemId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: itemId, quantity } })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  // Address functions
  const handleDetectLocation = async () => {
    try {
      const address = await detectCurrentLocation()
      if (address) {
        setCustomerInfo({...customerInfo, address})
      }
    } catch (error) {
      alert('Không thể lấy vị trí hiện tại. Vui lòng nhập địa chỉ thủ công.')
    }
  }

  const handleAddressChange = (value: string) => {
    setCustomerInfo({...customerInfo, address: value})
    searchAddress(value)
  }

  const selectAddress = async (suggestion: AddressSuggestion) => {
    try {
      // Get detailed place information
      const placeDetails = await getPlaceDetails(suggestion.placeId)
      const address = placeDetails?.fullAddress || suggestion.fullAddress
      setCustomerInfo({...customerInfo, address})
      clearSuggestions()
    } catch (error) {
      // Fallback to basic address
      setCustomerInfo({...customerInfo, address: suggestion.fullAddress})
      clearSuggestions()
    }
  }

  // Order calculations
  const calculateOrderSummary = (): OrderSummary => {
    const subtotal = cartState.totalPrice
    const tax = subtotal * 0.1 // 10% tax
    const deliveryFee = customerInfo.deliveryType === 'delivery' ? 15000 : 0
    const discount = subtotal > 200000 ? subtotal * 0.05 : 0 // 5% discount for orders over 200k
    const total = subtotal + tax + deliveryFee - discount

    return { subtotal, tax, deliveryFee, discount, total }
  }

  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN') + 'đ'
  }

  // Checkout flow
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

  const handleSubmitOrder = async () => {
    setIsSubmitting(true)
    
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
        isGuestOrder: !session?.user?.id // Flag to indicate if this is a guest order
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
        setOrderSuccess(true)
        console.log('Order created successfully:', result.order?.id)
        
        // Reset form after 3 seconds
        setTimeout(() => {
          clearCart()
          setCustomerInfo({
            name: '',
            phone: '',
            email: '',
            address: '',
            deliveryType: 'pickup',
            paymentMethod: 'cash',
            notes: ''
          })
          setCurrentStep(1)
          setOrderSuccess(false)
          setShowCart(false)
          
          // Redirect based on user status
          if (session?.user?.id) {
            // Add a small delay to ensure order is saved, then redirect with cache busting
            setTimeout(() => {
              router.push(`/orders?t=${Date.now()}`)
            }, 1000)
          } else {
            router.push('/')
          }
        }, 3000)
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

  // Mobile cart toggle
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setShowCart(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const orderSummary = calculateOrderSummary()

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Success Modal */}
      <AnimatePresence>
        {orderSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-xl p-8 max-w-md mx-4 text-center"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiCheck className="text-green-600 text-2xl" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-primary-800 mb-2">
                Đặt món thành công!
              </h3>
              <p className="text-gray-600 mb-4">
                {session?.user?.id 
                  ? 'Cảm ơn bạn đã đặt hàng. Bạn có thể theo dõi đơn hàng trong trang đơn hàng của mình.'
                  : 'Cảm ơn bạn đã đặt hàng. Chúng tôi sẽ liên hệ với bạn trong vòng 15 phút.'
                }
              </p>
              <p className="text-sm text-gray-500">
                Trang sẽ tự động chuyển về trang chủ...
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <section className="bg-primary-800 text-white py-12 md:py-20">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4 md:mb-6">
              Đặt món online
            </h1>
            <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto px-4">
              Đặt món dễ dàng và nhận ưu đãi đặc biệt khi đặt online
            </p>
          </motion.div>
        </div>
      </section>

      {/* Guest Ordering Info for Non-Signed-In Users */}
      {!session && (
        <section className="bg-blue-50 border-b border-blue-200 py-6">
          <div className="container-custom px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center justify-center space-x-3 mb-4">
                <FiShoppingCart className="text-primary-600 text-2xl" />
                <h2 className="text-xl font-serif font-bold text-primary-800">
                  Đặt món không cần đăng ký
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-600 mb-4">
                    Bạn có thể đặt món ngay mà không cần đăng ký tài khoản. 
                    Chỉ cần điền thông tin liên hệ để chúng tôi có thể giao hàng.
                  </p>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <FiCheck className="text-green-600" />
                      <span>Đặt món nhanh chóng</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FiCheck className="text-green-600" />
                      <span>Không cần đăng ký</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FiCheck className="text-green-600" />
                      <span>Giao hàng tận nơi</span>
                    </div>
                  </div>
                </div>
                <div className="bg-primary-50 p-4 rounded-lg">
                  <h3 className="font-medium text-primary-800 mb-3">Hoặc đăng nhập để:</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <FiUser className="text-primary-600" />
                      <span>Theo dõi đơn hàng</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FiUser className="text-primary-600" />
                      <span>Tích lũy điểm thưởng</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FiUser className="text-primary-600" />
                      <span>Lưu địa chỉ giao hàng</span>
                    </div>
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <button
                      onClick={() => router.push('/auth/signin')}
                      className="btn-primary text-sm px-4 py-2"
                    >
                      Đăng nhập
                    </button>
                    <button
                      onClick={() => router.push('/auth/signup')}
                      className="btn-outline text-sm px-4 py-2"
                    >
                      Đăng ký
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}


      <div className="container-custom py-4 md:py-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
          {/* Menu Section */}
          <div className="lg:col-span-2">
            {/* Category Filter */}
            <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 mb-4 md:mb-8">
              <h2 className="text-xl md:text-2xl font-serif font-bold text-primary-800 mb-4">
                Chọn món
              </h2>
              <div className="flex flex-wrap gap-2 md:gap-3">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-3 md:px-4 py-2 rounded-full font-medium transition-colors duration-200 text-sm md:text-base ${
                    selectedCategory === 'all'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Tất cả
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-3 md:px-4 py-2 rounded-full font-medium transition-colors duration-200 text-sm md:text-base ${
                      selectedCategory === category.id
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {category.icon} {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Menu Items */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
                >
                  <Link href={`/product/${item.id}`} className="block">
                    <div className="relative h-40 md:h-48">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4 md:p-6 flex flex-col flex-grow">
                      <h3 className="text-lg md:text-xl font-serif font-semibold text-primary-800 hover:text-primary-600 transition-colors duration-200 mb-2">
                        {item.name}
                      </h3>
                      <p className="text-sm md:text-base text-gray-600 mb-4 leading-relaxed flex-grow">
                        {item.description}
                      </p>
                    </div>
                  </Link>
                  <div className="p-4 md:p-6 pt-0">
                    <div className="flex items-center justify-between">
                      <span className="text-lg md:text-2xl font-bold text-primary-600">
                        {formatPrice(item.price)}
                      </span>
                      <button
                        onClick={() => addToCart(item)}
                        className="btn-primary flex items-center space-x-2 text-sm md:text-base px-3 md:px-4 py-2 md:py-3"
                      >
                        <FiPlus />
                        <span>Thêm</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Cart Section - Desktop */}
          <div className="hidden lg:block lg:col-span-1">
            <CartSection 
              cart={cartState.items}
              customerInfo={customerInfo}
              setCustomerInfo={setCustomerInfo}
              orderSummary={orderSummary}
              formatPrice={formatPrice}
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCart}
              clearCart={clearCart}
              handleSubmitOrder={handleSubmitOrder}
              isSubmitting={isSubmitting}
              currentStep={currentStep}
              nextStep={nextStep}
              prevStep={prevStep}
              handleDetectLocation={handleDetectLocation}
              isDetectingLocation={isDetectingLocation}
              handleAddressChange={handleAddressChange}
              showAddressSuggestions={showAddressSuggestions}
              setShowAddressSuggestions={setShowAddressSuggestions}
              addressSuggestions={addressSuggestions}
              selectAddress={selectAddress}
              isSearching={isSearching}
              session={session}
              router={router}
              userProfile={userProfile}
              isLoadingProfile={isLoadingProfile}
              loadUserProfile={loadUserProfile}
            />
          </div>
        </div>
      </div>

      {/* Mobile Cart Overlay */}
      <AnimatePresence>
        {showCart && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50"
            onClick={() => setShowCart(false)}
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
                  <button
                    onClick={() => setShowCart(false)}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <FiX size={20} />
                  </button>
                </div>
                
                <div className="flex-1 overflow-y-auto">
                  <div className="p-4">
                    <CartSection 
                      cart={cartState.items}
                      customerInfo={customerInfo}
                      setCustomerInfo={setCustomerInfo}
                      orderSummary={orderSummary}
                      formatPrice={formatPrice}
                      updateQuantity={updateQuantity}
                      removeFromCart={removeFromCart}
                      clearCart={clearCart}
                      handleSubmitOrder={handleSubmitOrder}
                      isSubmitting={isSubmitting}
                      currentStep={currentStep}
                      nextStep={nextStep}
                      prevStep={prevStep}
                      isMobile={true}
                      handleDetectLocation={handleDetectLocation}
                      isDetectingLocation={isDetectingLocation}
                      handleAddressChange={handleAddressChange}
                      showAddressSuggestions={showAddressSuggestions}
                      setShowAddressSuggestions={setShowAddressSuggestions}
                      addressSuggestions={addressSuggestions}
                      selectAddress={selectAddress}
                      isSearching={isSearching}
                      session={session}
                      router={router}
                      userProfile={userProfile}
                      isLoadingProfile={isLoadingProfile}
                      loadUserProfile={loadUserProfile}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Cart Section Component
interface CartSectionProps {
  cart: CartItem[]
  customerInfo: CustomerInfo
  setCustomerInfo: (info: CustomerInfo) => void
  orderSummary: OrderSummary
  formatPrice: (price: number) => string
  updateQuantity: (itemId: string, quantity: number) => void
  removeFromCart: (itemId: string) => void
  clearCart: () => void
  handleSubmitOrder: () => void
  isSubmitting: boolean
  currentStep: number
  nextStep: () => void
  prevStep: () => void
  isMobile?: boolean
  // Address functions
  handleDetectLocation: () => void
  isDetectingLocation: boolean
  handleAddressChange: (value: string) => void
  showAddressSuggestions: boolean
  setShowAddressSuggestions: (show: boolean) => void
  addressSuggestions: AddressSuggestion[]
  selectAddress: (suggestion: AddressSuggestion) => void
  isSearching: boolean
  // Session
  session: any
  router: any
  // Profile data
  userProfile: any
  isLoadingProfile: boolean
  loadUserProfile: () => void
}

const CartSection: React.FC<CartSectionProps> = ({
  cart,
  customerInfo,
  setCustomerInfo,
  orderSummary,
  formatPrice,
  updateQuantity,
  removeFromCart,
  clearCart,
  handleSubmitOrder,
  isSubmitting,
  currentStep,
  nextStep,
  prevStep,
  isMobile = false,
  // Address functions
  handleDetectLocation,
  isDetectingLocation,
  handleAddressChange,
  showAddressSuggestions,
  setShowAddressSuggestions,
  addressSuggestions,
  selectAddress,
  isSearching,
  // Session
  session,
  router,
  // Profile data
  userProfile,
  isLoadingProfile,
  loadUserProfile
}) => {
  const isFormValid = () => {
    if (currentStep === 1) return true
    if (currentStep === 2) {
      return customerInfo.name && customerInfo.phone && 
             (customerInfo.deliveryType === 'pickup' || customerInfo.address)
    }
    return true
  }

  return (
    <div className={`bg-white rounded-xl shadow-lg ${isMobile ? 'p-0' : 'p-6'} ${isMobile ? '' : 'sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto'}`}>
      {!isMobile && (
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <FiShoppingCart className="text-primary-600 text-xl" />
            <h2 className="text-2xl font-serif font-bold text-primary-800">
              Giỏ hàng ({cart.length})
            </h2>
          </div>
          {cart.length > 0 && (
            <button
              onClick={clearCart}
              className="text-red-500 hover:text-red-700 text-sm font-medium"
            >
              Xóa tất cả
            </button>
          )}
        </div>
      )}

      {cart.length === 0 ? (
        <div className="text-center py-8">
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
            {cart.map((item) => (
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
                <span>Tạm tính:</span>
                <span>{formatPrice(orderSummary.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Thuế VAT (10%):</span>
                <span>{formatPrice(orderSummary.tax)}</span>
              </div>
              {orderSummary.deliveryFee > 0 && (
                <div className="flex justify-between">
                  <span>Phí giao hàng:</span>
                  <span>{formatPrice(orderSummary.deliveryFee)}</span>
                </div>
              )}
              {orderSummary.discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Giảm giá (5%):</span>
                  <span>-{formatPrice(orderSummary.discount)}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-lg border-t pt-2">
                <span>Tổng cộng:</span>
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
                    step <= currentStep 
                      ? 'bg-primary-600 text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {step}
                  </div>
                  {step < 3 && (
                    <div className={`md:w-24 sm:w-8 w-2 h-0.5 mx-2 ${
                      step < currentStep ? 'bg-primary-600' : 'bg-gray-200'
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
                  <div className="flex items-center space-x-2">
                    {session && userProfile && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        Đã tự động điền
                      </span>
                    )}
                    {!session && (
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        Khách
                      </span>
                    )}
                  </div>
                </div>

                {/* Auto-fill notification for signed-in users
                {session && userProfile && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <FiUser className="text-green-600" />
                        <span className="text-sm text-green-800 font-medium">
                          Thông tin đã được tự động điền từ hồ sơ của bạn
                        </span>
                      </div>
                      <button
                        onClick={loadUserProfile}
                        disabled={isLoadingProfile}
                        className="text-xs text-green-700 hover:text-green-800 underline disabled:opacity-50"
                      >
                        {isLoadingProfile ? 'Đang tải...' : 'Làm mới'}
                      </button>
                    </div>
                    <p className="text-xs text-green-700 mt-1">
                      Bạn có thể chỉnh sửa thông tin nếu cần thiết
                    </p>
                  </div>
                )}
                   */}

                {/* Loading state for profile data */}
                {session && isLoadingProfile && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="flex items-center space-x-2">
                      <div className="spinner w-4 h-4"></div>
                      <span className="text-sm text-blue-800">Đang tải thông tin từ hồ sơ...</span>
                    </div>
                  </div>
                )}

                {/* Manual load profile button for signed-in users without profile data */}
                {session && !userProfile && !isLoadingProfile && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <FiUser className="text-blue-600" />
                        <span className="text-sm text-blue-800 font-medium">
                          Tự động điền thông tin từ hồ sơ
                        </span>
                      </div>
                      <button
                        onClick={loadUserProfile}
                        className="text-xs bg-blue-600 text-white px-3 py-1 rounded-full hover:bg-blue-700 transition-colors"
                      >
                        Điền tự động
                      </button>
                    </div>
                    <p className="text-xs text-blue-700 mt-1">
                      Nhấn để tự động điền thông tin từ hồ sơ của bạn
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
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
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
                    onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
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
                    onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
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
                        onChange={(e) => setCustomerInfo({...customerInfo, deliveryType: e.target.value as 'pickup' | 'delivery'})}
                        className="mr-2"
                      />
                      <span>Mang đi</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="delivery"
                        checked={customerInfo.deliveryType === 'delivery'}
                        onChange={(e) => setCustomerInfo({...customerInfo, deliveryType: e.target.value as 'pickup' | 'delivery'})}
                        className="mr-2"
                      />
                      <span>Giao hàng (+{formatPrice(15000)})</span>
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

                    {/* Address Details Input */}
                    {customerInfo.address && (
                      <div className="mt-3">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Chi tiết địa chỉ (tầng, số nhà, ghi chú...)
                        </label>
                        <textarea
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          rows={2}
                          placeholder="Ví dụ: Tầng 5, số nhà 123, căn hộ A..."
                        />
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
                        onChange={(e) => setCustomerInfo({...customerInfo, paymentMethod: e.target.value as any})}
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
                    onChange={(e) => setCustomerInfo({...customerInfo, notes: e.target.value})}
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
      )}
    </div>
  )
}

export default OrderingPage
