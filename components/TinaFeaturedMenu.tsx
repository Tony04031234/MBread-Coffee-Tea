'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FiStar, FiArrowRight, FiShoppingCart, FiHeart, FiShare2 } from 'react-icons/fi'
import { useCart } from '@/contexts/CartContext'
import { useFavorites } from '@/hooks/useFavorites'
import { ShareService } from '@/lib/share'
import CartNotification from '@/components/CartNotification'
import ShareModal from '@/components/ShareModal'
import Toast from '@/components/Toast'
import { getMenuItems } from '@/lib/tina'

interface TinaMenuItem {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: 'coffee' | 'tea' | 'pastry' | 'special'
  isPopular?: boolean
  ingredients?: string
  allergens?: string
}

const TinaFeaturedMenu = () => {
  const [showNotification, setShowNotification] = useState(false)
  const [notificationItem, setNotificationItem] = useState('')
  const [showShareModal, setShowShareModal] = useState(false)
  const [shareData, setShareData] = useState<any>(null)
  const [favoriteSuccess, setFavoriteSuccess] = useState<string | null>(null)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [menuItems, setMenuItems] = useState<TinaMenuItem[]>([])
  const [loading, setLoading] = useState(true)
  
  const { dispatch, state: cartState } = useCart()
  const { toggleFavorite, isFavorite, isLoading: favoritesLoading, isSignedIn } = useFavorites()

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const items = await getMenuItems()
        setMenuItems(items)
      } catch (error) {
        console.error('Error fetching menu items:', error)
        // Fallback to static data if TinaCMS fails
        setMenuItems([])
      } finally {
        setLoading(false)
      }
    }

    fetchMenuItems()
  }, [])

  const featuredItems = menuItems.filter(item => item.isPopular).slice(0, 6)

  const handleAddToCart = (item: TinaMenuItem) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image
      }
    })
    
    setNotificationItem(item.name)
    setShowNotification(true)
  }

  const handleToggleFavorite = async (item: TinaMenuItem) => {
    // Show toast for non-signed-in users
    if (!isSignedIn) {
      setToastMessage('Đăng nhập để lưu sản phẩm yêu thích và đồng bộ trên tất cả thiết bị!')
      setShowToast(true)
      return
    }

    const success = await toggleFavorite(item.id, {
      name: item.name,
      image: item.image,
      price: item.price,
      category: item.category
    })

    if (success) {
      setFavoriteSuccess(item.id)
      setTimeout(() => setFavoriteSuccess(null), 2000)
    }
  }

  const handleShare = (item: TinaMenuItem) => {
    const productUrl = `${window.location.origin}/product/${item.id}`
    const shareData = ShareService.generateProductShareText(
      item.name,
      item.description,
      productUrl
    )
    setShareData(shareData)
    setShowShareModal(true)
  }

  if (loading) {
    return (
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-96 mx-auto mb-16"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="card overflow-hidden">
                  <div className="animate-pulse">
                    <div className="h-48 bg-gray-300"></div>
                    <div className="p-6">
                      <div className="h-6 bg-gray-300 rounded mb-2"></div>
                      <div className="h-4 bg-gray-300 rounded mb-4"></div>
                      <div className="h-4 bg-gray-300 rounded mb-4"></div>
                      <div className="h-8 bg-gray-300 rounded"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="section-padding bg-white">
      <CartNotification
        show={showNotification}
        itemName={notificationItem}
        onClose={() => setShowNotification(false)}
        cartCount={cartState.totalItems}
        onOpenCart={() => dispatch({ type: 'SHOW_MOBILE_CART' })}
      />
      {shareData && (
        <ShareModal
          isOpen={showShareModal}
          onClose={() => setShowShareModal(false)}
          shareData={shareData}
        />
      )}
      <Toast
        show={showToast}
        message={toastMessage}
        type="info"
        onClose={() => setShowToast(false)}
        showSignInLink={true}
      />
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-800 mb-4">
            Món được yêu thích
          </h2>
          <p className="text-lg text-gray-600">
            Những món ăn và đồ uống được khách hàng yêu thích nhất
          </p>
        </motion.div>

        {featuredItems.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg mb-4">
              Chưa có món nào được đánh dấu là yêu thích.
            </p>
            <p className="text-gray-400">
              Hãy thêm nội dung qua TinaCMS hoặc kiểm tra cấu hình.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card overflow-hidden hover:scale-105 transition-transform duration-300 flex flex-col"
              >
                <Link href={`/product/${item.id}`} className="block">
                  <div className="relative h-48">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-secondary-500 text-white px-2 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                      <FiStar size={14} />
                      <span>Yêu thích</span>
                    </div>
                  </div>
                </Link>
                <div className="p-6 flex flex-col flex-grow">
                  <Link href={`/product/${item.id}`} className="block mb-2">
                    <h3 className="text-xl font-serif font-bold text-primary-600 hover:text-primary-700 transition-colors duration-200 hover:underline">
                      {item.name}
                    </h3>
                  </Link>
                  <p className="text-gray-600 mb-4 leading-relaxed flex-grow">
                    {item.description}
                  </p>
                  <div className="space-y-3 mt-auto">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary-600">
                        {item.price.toLocaleString('vi-VN')}đ
                      </span>
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="text-primary-600 hover:text-primary-700 font-medium flex items-center space-x-1 transition-colors duration-200"
                      >
                        <FiShoppingCart size={16} />
                        <span>Đặt nước</span>
                      </button>
                    </div>
                    
                    {/* Secondary Action Buttons */}
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleToggleFavorite(item)}
                        disabled={favoritesLoading}
                        className={`flex-1 btn-outline flex items-center justify-center space-x-2 py-2 px-3 text-sm transition-all duration-200 ${
                          isFavorite(item.id) 
                            ? 'bg-red-50 border-red-200 text-red-600 hover:bg-red-100' 
                            : 'hover:bg-gray-50'
                        } ${favoritesLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        <FiHeart className={isFavorite(item.id) ? 'fill-current' : ''} />
                        <span>
                          {favoriteSuccess === item.id 
                            ? (isFavorite(item.id) ? 'Đã thêm!' : 'Đã xóa!')
                            : isFavorite(item.id) 
                              ? 'Đã yêu thích' 
                              : 'Yêu thích'
                          }
                        </span>
                      </button>
                      <button 
                        onClick={() => handleShare(item)}
                        className="flex-1 btn-outline flex items-center justify-center space-x-2 py-2 px-3 text-sm hover:bg-gray-50 transition-colors duration-200"
                      >
                        <FiShare2 />
                        <span>Chia sẻ</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center mt-12"
        >
          <Link
            href="/menu"
            className="btn-primary text-lg px-8 py-4 inline-flex items-center space-x-2"
          >
            <span>Xem toàn bộ thực đơn</span>
            <FiArrowRight />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default TinaFeaturedMenu
