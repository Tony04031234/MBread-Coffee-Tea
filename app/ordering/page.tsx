'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { FiPlus, FiCheck, FiX, FiShoppingCart, FiUser, FiSearch } from 'react-icons/fi'
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
  const [searchTerm, setSearchTerm] = useState('')
  const [showCart, setShowCart] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(false)


  // Enhanced filtering with search functionality
  const filteredItems = menuItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
    const matchesSearch = searchTerm === '' || 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Auto-select category when search finds results
  const handleSearch = (searchValue: string) => {
    setSearchTerm(searchValue)
    
    if (searchValue.trim() === '') {
      setSelectedCategory('all')
      return
    }

    // Find which category has the most matching items
    const categoryMatches = categories.map(category => {
      const items = menuItems.filter(item => 
        item.category === category.id &&
        (item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
         item.description.toLowerCase().includes(searchValue.toLowerCase()))
      )
      return { category: category.id, count: items.length }
    })

    const bestMatch = categoryMatches.reduce((prev, current) => 
      current.count > prev.count ? current : prev
    )

    // If we found matches in a specific category, switch to it
    if (bestMatch.count > 0) {
      setSelectedCategory(bestMatch.category)
    } else {
      // If no matches found, stay in current category
      setSelectedCategory('all')
    }
  }

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
      <section className="relative text-white py-12 md:py-20 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1920&h=1080&fit=crop"
            alt="Coffee ordering experience"
            fill
            className="object-cover"
            priority
          />
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/50 via-primary-800/50 to-primary-900/50" />
        </div>
        
        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4 md:mb-6 drop-shadow-lg">
              Đặt món online
            </h1>
            <p className="text-lg md:text-xl opacity-95 max-w-2xl mx-auto px-4 drop-shadow-md mb-8">
              Đặt món dễ dàng và nhận ưu đãi đặc biệt khi đặt online
            </p>
            
            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="max-w-md mx-auto"
            >
              <div className="relative">
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600 text-xl z-10" />
                <input
                  type="text"
                  placeholder="Tìm kiếm món ăn, đồ uống..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-lg bg-white bg-opacity-90 backdrop-blur-sm border border-white border-opacity-20 rounded-xl focus:ring-2 focus:ring-white focus:border-transparent placeholder-gray-500 text-gray-800 shadow-lg"
                />
                {searchTerm && (
                  <button
                    onClick={() => handleSearch('')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 transition-colors z-10"
                  >
                    <FiX className="text-xl" />
                  </button>
                )}
              </div>
            </motion.div>
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


      <div className="max-w-7xl mx-auto py-4 md:py-8 px-4">
        {/* Mobile Category Filter */}
        <div className="lg:hidden bg-white rounded-xl shadow-lg border border-gray-100 p-4 mb-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
              <span className="text-primary-600 text-lg">📋</span>
            </div>
            <h2 className="text-lg font-serif font-bold text-primary-800">
              Chọn danh mục
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-3 rounded-xl font-medium transition-all duration-200 text-sm flex items-center space-x-2 shadow-sm ${
                selectedCategory === 'all'
                  ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg transform scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-primary-50 hover:text-primary-700 hover:shadow-md hover:scale-105'
              }`}
            >
              <span>🍽️</span>
              <span>Tất cả</span>
            </button>
            {categories.map((category) => {
              const categoryItems = menuItems.filter(item => item.category === category.id)
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-3 rounded-xl font-medium transition-all duration-200 text-sm flex items-center space-x-2 shadow-sm ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg transform scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-primary-50 hover:text-primary-700 hover:shadow-md hover:scale-105'
                  }`}
                >
                  <span>{category.icon}</span>
                  <span>{category.name}</span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
          {/* Category Navigation - Left Column */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 sticky top-20">
              <div className="flex items-center mb-2 space-x-3 mb-0 border-b border-gray-100 pb-4">
                <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                  <span className="text-primary-600 text-lg">📋</span>
                </div>
                <h2 className="text-xl font-serif font-bold text-primary-800">
                  Danh mục
              </h2>
              </div>
              <nav className="space-y-2">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full text-left px-2 py-2 rounded-xl font-medium transition-all duration-300 flex items-center space-x-4 group ${
                    selectedCategory === 'all'
                      ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg transform scale-105'
                      : 'text-gray-700 hover:bg-gradient-to-r hover:from-primary-50 hover:to-primary-100 hover:shadow-md hover:scale-105 border border-transparent hover:border-primary-200'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl ${
                    selectedCategory === 'all' ? 'bg-white bg-opacity-20' : 'bg-gray-100 group-hover:bg-primary-100'
                  }`}>
                    🍽️
                  </div>
                  <div className="flex-1">
                    <span className="block font-semibold">Tất cả món</span>
                    <span className={`text-sm ${selectedCategory === 'all' ? 'text-white text-opacity-80' : 'text-gray-500'}`}>
                      {menuItems.length} món
                    </span>
                  </div>
                </button>
                {categories.map((category) => {
                  const categoryItems = menuItems.filter(item => item.category === category.id)
                  return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-2 py-2 rounded-xl font-medium transition-all duration-300 flex items-center space-x-4 group ${
                      selectedCategory === category.id
                          ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg transform scale-105'
                          : 'text-gray-700 hover:bg-gradient-to-r hover:from-primary-50 hover:to-primary-100 hover:shadow-md hover:scale-105 border border-transparent hover:border-primary-200'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl ${
                        selectedCategory === category.id ? 'bg-white bg-opacity-20' : 'bg-gray-100 group-hover:bg-primary-100'
                      }`}>
                        {category.icon}
                      </div>
                      <div className="flex-1">
                        <span className="block font-semibold">{category.name}</span>
                        <span className={`text-sm ${selectedCategory === category.id ? 'text-white text-opacity-80' : 'text-gray-500'}`}>
                          {categoryItems.length} món
                        </span>
                      </div>
                  </button>
                  )
                })}
              </nav>
            </div>
          </div>

          {/* Menu Items - Middle Column */}
          <div className="lg:col-span-6">
            <div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-xl border border-primary-200 p-4 mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center">
                  <span className="text-white text-xl">
                    {searchTerm ? '🔍' : (selectedCategory === 'all' ? '🍽️' : categories.find(c => c.id === selectedCategory)?.icon)}
                  </span>
                </div>
                <div>
                  <h2 className="text-2xl font-serif font-bold text-primary-800">
                    {searchTerm 
                      ? `Kết quả tìm kiếm "${searchTerm}"` 
                      : (selectedCategory === 'all' ? 'Tất cả món ăn' : categories.find(c => c.id === selectedCategory)?.name)
                    }
                  </h2>
                  <p className="text-primary-600 font-medium">
                    {searchTerm 
                      ? `${filteredItems.length} kết quả tìm thấy` 
                      : `${filteredItems.length} món ăn có sẵn`
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* Menu Items Grid */}
            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl hover:border-primary-200 transition-all duration-300 group h-96"
                >
                  <div className="flex flex-col h-full">
                    {/* Product Image - Fixed Height */}
                    <div className="relative h-48 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 left-2">
                        <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-full px-3 py-1">
                          <span className="text-xs font-medium text-primary-600">
                            {item.category === 'coffee' ? '☕ Cà phê' :
                             item.category === 'tea' ? '🍵 Trà' :
                             item.category === 'pastry' ? '🍰 Bánh ngọt' :
                             item.category === 'special' ? '⭐ Đặc biệt' : '🍽️ Món ăn'}
                          </span>
                        </div>
                      </div>
                      {item.isPopular && (
                        <div className="absolute top-2 right-2">
                          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full px-3 py-1 shadow-lg">
                            <span className="text-xs font-bold flex items-center space-x-1">
                              <span>⭐</span>
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Product Info - Flexible Height */}
                    <div className="flex-1 p-4 flex flex-col">
                      <div className="flex-grow">
                        <Link href={`/product/${item.id}`} className="block">
                          <h3 className="text-lg font-serif font-bold text-primary-800 hover:text-primary-600 transition-colors duration-200 mb-2 group-hover:underline line-clamp-2">
                        {item.name}
                      </h3>
                          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                        {item.description}
                      </p>
                        </Link>
                    </div>

                      {/* Price and Add to Cart - Fixed at Bottom */}
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
                        <div>
                          <span className="text-xl font-bold text-primary-600">
                        {formatPrice(item.price)}
                      </span>
                          <p className="text-xs text-gray-500">Mỗi phần</p>
                        </div>
                      <button
                        onClick={() => addToCart(item)}
                          className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 text-sm"
                      >
                          <FiPlus className="w-4 h-4" />
                          <span>Thêm</span>
                      </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
              </div>
            ) : (
              /* No Results State */
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center py-16"
              >
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FiSearch className="text-3xl text-gray-400" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-gray-800 mb-3">
                    {searchTerm ? 'Không tìm thấy kết quả' : 'Không có món ăn'}
                  </h3>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    {searchTerm 
                      ? `Không tìm thấy món nào phù hợp với "${searchTerm}". Hãy thử tìm kiếm với từ khóa khác.`
                      : 'Hiện tại không có món ăn nào trong danh mục này.'
                    }
                  </p>
                  {searchTerm && (
                    <button
                      onClick={() => handleSearch('')}
                      className="btn-primary flex items-center space-x-2 mx-auto"
                    >
                      <FiX />
                      <span>Xóa tìm kiếm</span>
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </div>

          {/* Cart Section - Right Column */}
          <div className="lg:col-span-3">
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
