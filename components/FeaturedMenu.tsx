'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FiStar, FiArrowRight, FiShoppingCart } from 'react-icons/fi'
import { menuItems } from '@/data/menu'
import { useCart } from '@/contexts/CartContext'
import CartNotification from '@/components/CartNotification'

const FeaturedMenu = () => {
  const [showNotification, setShowNotification] = useState(false)
  const [notificationItem, setNotificationItem] = useState('')
  
  const { dispatch, state: cartState } = useCart()
  const featuredItems = menuItems.filter(item => item.isPopular).slice(0, 6)

  const handleAddToCart = (item: any) => {
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

  return (
    <section className="section-padding bg-white">
      <CartNotification
        show={showNotification}
        itemName={notificationItem}
        onClose={() => setShowNotification(false)}
        cartCount={cartState.totalItems}
        onOpenCart={() => dispatch({ type: 'SHOW_MOBILE_CART' })}
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card overflow-hidden hover:scale-105 transition-transform duration-300 flex flex-col"
            >
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
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-serif font-semibold text-primary-800 mb-2">
                  {item.name}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed flex-grow">
                  {item.description}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-2xl font-bold text-primary-600">
                    {item.price.toLocaleString('vi-VN')}đ
                  </span>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="text-primary-600 hover:text-primary-700 font-medium flex items-center space-x-1 transition-colors duration-200"
                  >
                    <FiShoppingCart size={16} />
                    <span>Đặt món</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

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

export default FeaturedMenu
