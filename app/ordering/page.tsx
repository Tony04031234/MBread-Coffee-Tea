'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { FiPlus, FiCheck, FiX, FiShoppingCart, FiUser } from 'react-icons/fi'
import { menuItems, categories } from '@/data/menu'
import { useCart } from '@/contexts/CartContext'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import SharedCart from '@/components/SharedCart'


const OrderingPage = () => {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { state: cartState, dispatch } = useCart()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showCart, setShowCart] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(false)


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

  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN') + 'đ'
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
        <div className="max-w-6xl mx-auto text-center">
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

      {/* Guest Ordering Info for Non-Signed-In Users
      {!session && (
        <section className="bg-blue-50 border-b border-blue-200 py-6">
          <div className="max-w-6xl mx-auto px-4">
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
         */}


      <div className="max-w-6xl mx-auto py-4 md:py-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
          {/* Menu Section */}
          <div className="lg:col-span-2">
            {/* Category Filter */}
            <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 mb-4 md:mb-8">
              <h2 className="text-xl md:text-2xl font-serif font-bold text-primary-800 mb-4">
                Chọn món nước & bánh
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
                  <Link href={`/product/${item.id}`} className="block flex-grow">
                    <div className="relative h-40 md:h-48">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4 flex flex-col flex-grow">
                      <h3 className="text-lg md:text-xl font-serif font-bold text-primary-600 hover:text-primary-700 transition-colors duration-200 mb-2 hover:underline">
                        {item.name}
                      </h3>
                      <p className="text-sm md:text-base text-gray-600 leading-relaxed flex-grow">
                        {item.description}
                      </p>
                    </div>
                  </Link>
                  <div className="p-4 md:p-6 pt-0 mt-auto">
                    <div className="flex items-center justify-between">
                      <span className="text-lg md:text-2xl font-bold text-primary-600">
                        {formatPrice(item.price)}
                      </span>
                      <button
                        onClick={() => addToCart(item)}
                        className="btn-primary flex items-center space-x-2 text-sm md:text-base px-3 md:px-4 py-2 md:py-3"
                      >
                        <FiPlus />
                        <span>Thêm vào giỏ</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Cart Section - Desktop */}
          <div className="hidden lg:block lg:col-span-1">
            <SharedCart />
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
                    <SharedCart 
                      isMobile={true} 
                      onClose={() => setShowCart(false)} 
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


export default OrderingPage
