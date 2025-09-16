'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FiStar, FiArrowRight, FiSearch, FiShoppingCart } from 'react-icons/fi'
import { menuItems, categories } from '@/data/menu'
import { useCart } from '@/contexts/CartContext'
import CartNotification from '@/components/CartNotification'
import StructuredData from '@/components/StructuredData'

const MenuPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [showNotification, setShowNotification] = useState(false)
  const [notificationItem, setNotificationItem] = useState('')
  
  const { dispatch, state: cartState } = useCart()

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN') + 'đ'
  }

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
    <div className="min-h-screen bg-cream-50">
      <StructuredData type="menu" />
      <CartNotification
        show={showNotification}
        itemName={notificationItem}
        onClose={() => setShowNotification(false)}
        cartCount={cartState.totalItems}
        onOpenCart={() => dispatch({ type: 'SHOW_MOBILE_CART' })}
      />
      {/* Header */}
      <section className="bg-primary-800 text-white py-20">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              Thực đơn
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Khám phá những món ăn và đồ uống tuyệt vời tại MBread Coffee & Tea
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-white shadow-sm px-4">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 md:max-w-md w-full">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm món ăn..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-3 sticky top-0 bg-white">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-full font-medium transition-colors duration-200 ${
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
                  className={`px-4 py-2 rounded-full font-medium transition-colors duration-200 ${
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
        </div>
      </section>

      {/* Menu Items */}
      <section className="section-padding">
        <div className="container-custom">
          {filteredItems.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-gray-500">Không tìm thấy món ăn nào phù hợp</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item, index) => (
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
                      {item.isPopular && (
                        <div className="absolute top-4 right-4 bg-secondary-500 text-white px-2 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                          <FiStar size={14} />
                          <span>Yêu thích</span>
                        </div>
                      )}
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-serif font-semibold text-primary-800">
                          {item.name}
                        </h3>
                        <span className="text-lg font-bold text-primary-600">
                          {formatPrice(item.price)}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4 leading-relaxed flex-grow">
                        {item.description}
                      </p>
                    </div>
                  </Link>
                  <div className="p-6 pt-0">
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 w-full flex items-center justify-center space-x-2"
                    >
                      <FiShoppingCart />
                      <span>Thêm vào giỏ</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary-600">
        <div className="container-custom text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Sẵn sàng thưởng thức?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Đặt món online để nhận ưu đãi đặc biệt
            </p>
            <Link href="/ordering" className="btn-secondary text-lg px-8 py-4">
              Đặt món ngay
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default MenuPage
