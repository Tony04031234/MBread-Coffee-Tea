'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FiArrowRight, FiStar, FiClock, FiUsers, FiCoffee } from 'react-icons/fi'
import HeroCarousel from '@/components/HeroCarousel'
import FeaturedMenu from '@/components/FeaturedMenu'

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user has seen loading animation recently
    const hasSeenLoadingRecently = () => {
      try {
        const lastSeen = localStorage.getItem('mbread-loading-seen')
        if (!lastSeen) return false
        
        const lastSeenTime = parseInt(lastSeen)
        const now = Date.now()
        const timeDifference = now - lastSeenTime
        
        // Show loading again after 24 hours (86400000 ms)
        const shouldShowAgain = timeDifference > 86400000
        return !shouldShowAgain
      } catch (error) {
        // If localStorage fails, default to showing loading
        return false
      }
    }

    // Check if we should skip loading
    if (hasSeenLoadingRecently()) {
      setIsLoading(false)
      return
    }

    // Show loading animation
    const timer = setTimeout(() => {
      setIsLoading(false)
      // Mark that user has seen the loading animation
      try {
        localStorage.setItem('mbread-loading-seen', Date.now().toString())
      } catch (error) {
        // Ignore localStorage errors
        console.warn('Could not save loading state to localStorage:', error)
      }
    }, 3000)
    
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-800 via-primary-600 to-primary-400">
        <motion.div 
          className="flex flex-col items-center space-y-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Logo with jumping animation */}
          <motion.div
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 5, -5, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative"
          >
            <Image
              src="/mbread-logo.png"
              alt="MBread Logo"
              width={120}
              height={120}
              className="drop-shadow-2xl rounded-full"
              priority
            />
          </motion.div>
          
          {/* Loading text with fade animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-center text-white"
          >
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">
              MBread Coffee & Tea
            </h1>
            <motion.p
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-lg opacity-90"
            >
              Đang tải trải nghiệm tuyệt vời...
            </motion.p>
          </motion.div>
          
          {/* Animated loading dots */}
          <div className="flex space-x-2">
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                className="w-3 h-3 bg-white rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: index * 0.2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
          
          {/* Coffee bean animation */}
          <motion.div
            className="flex space-x-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                className="text-2xl"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.5,
                  ease: "linear"
                }}
              >
                ☕
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroCarousel />

      {/* Introduction Section */}
      <section className="section-padding bg-cream-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-5xl mx-auto"
          >
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-primary-800 mb-6">
              Chào mừng đến với MBread Coffee & Tea
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-4xl mx-auto">
              Tại MBread Coffee & Tea, chúng tôi mang đến những trải nghiệm cà phê và trà tuyệt vời 
              trong không gian ấm cúng và thân thiện. Với nguyên liệu cao cấp và công thức 
              truyền thống, mỗi ly đồ uống đều được pha chế với tình yêu và sự tận tâm.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/menu" className="btn-primary flex items-center justify-center space-x-2">
                <span>Xem thực đơn</span>
                <FiArrowRight />
              </Link>
              <Link href="/ordering" className="btn-outline flex items-center justify-center space-x-2">
                <span>Đặt món ngay</span>
                <FiArrowRight />
              </Link>
            </div>
            
            {/* About App Link
            <div className="mt-8">
              <Link href="/about-app" className="text-primary-600 hover:text-primary-700 underline font-semibold">
                📱 Tìm hiểu về ứng dụng và chính sách dữ liệu
              </Link>
            </div>
             */}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-800 mb-4">
              Tại sao chọn MBread Coffee & Tea?
            </h2>
            <p className="text-lg text-gray-600">
              Những điều đặc biệt làm nên thương hiệu của chúng tôi
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <FiCoffee className="text-4xl text-primary-600" />,
                title: 'Nguyên liệu cao cấp',
                description: 'Sử dụng cà phê và trà nhập khẩu chất lượng cao từ các vùng trồng nổi tiếng thế giới'
              },
              {
                icon: <FiStar className="text-4xl text-primary-600" />,
                title: 'Chất lượng tuyệt hảo',
                description: 'Mỗi ly đồ uống đều được pha chế theo công thức chuẩn với sự tận tâm và chuyên nghiệp'
              },
              {
                icon: <FiClock className="text-4xl text-primary-600" />,
                title: 'Phục vụ nhanh chóng',
                description: 'Đội ngũ nhân viên chuyên nghiệp, phục vụ nhanh chóng và thân thiện'
              },
              {
                icon: <FiUsers className="text-4xl text-primary-600" />,
                title: 'Không gian ấm cúng',
                description: 'Thiết kế không gian hiện đại, ấm cúng, phù hợp cho mọi dịp gặp gỡ'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="card p-6 text-center hover:scale-105 transition-transform duration-300"
              >
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-serif font-semibold text-primary-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Menu Section */}
      <FeaturedMenu />

      {/* Promotions Section */}
      <section className="section-padding bg-primary-600">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center text-white"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Ưu đãi đặc biệt
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Giảm giá 20% cho đơn hàng đầu tiên khi đặt online
            </p>
            <Link href="/ordering" className="btn-secondary text-lg px-8 py-4">
              Đặt món ngay
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-cream-100">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-800 mb-6">
              Sẵn sàng khám phá hương vị tuyệt vời?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Ghé thăm MBread Coffee & Tea ngay hôm nay để trải nghiệm những ly cà phê và trà 
              tuyệt vời trong không gian ấm cúng và thân thiện.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/about" className="btn-primary text-lg px-8 py-4">
                Tìm hiểu thêm
              </Link>
              <Link href="/franchise" className="btn-outline text-lg px-8 py-4">
                Cơ hội nhượng quyền
              </Link>
            </div>
            
            {/* Legal Links */}
            <div className="mt-8 pt-6 ">
              <div className="bg-white/80 p-6 rounded-lg shadow-sm border border-gray-200 ">
                <h3 className="md:text-2xl text-xl font-semibold text-primary-800 mb-4 text-center">
                  Thông tin pháp lý
                </h3>
                <p className="md:text-lg text-base text-gray-600 mb-4 text-center">
                  Bằng việc sử dụng dịch vụ của chúng tôi, bạn đồng ý với các điều khoản sau:
                </p>
                <div className="flex flex-wrap justify-center gap-6">
                  <Link href="/about-app" className="flex items-center space-x-2 text-primary-600 hover:text-primary-700  font-semibold">
                    <span>📱</span>
                    <span className="underline">Về ứng dụng</span>
                  </Link>
                  <Link href="/privacy" className="flex items-center space-x-2 text-primary-600 hover:text-primary-700  font-semibold">
                    <span>🔒</span>
                    <span className="underline">Chính sách bảo mật</span>
                  </Link>
                  <Link href="/terms" className="flex items-center space-x-2 text-primary-600 hover:text-primary-700  font-semibold">
                    <span>📋</span>
                    <span className="underline">Điều khoản dịch vụ</span>
                  </Link>
                </div>
                <p className="md:text-base text-sm text-gray-500 mt-4 text-center">
                  Chính sách bảo mật của chúng tôi giải thích cách chúng tôi thu thập, sử dụng và bảo vệ dữ liệu Google của bạn.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
