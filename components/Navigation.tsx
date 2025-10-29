'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { FiMenu, FiX, FiShoppingCart, FiUser, FiLogOut, FiSettings, FiShoppingBag, FiPhone, FiMail, FiFacebook, FiYoutube, FiInstagram } from 'react-icons/fi'
import { FaTiktok } from 'react-icons/fa'
import Image from 'next/image'
import { useCart } from '@/contexts/CartContext'
import { motion, AnimatePresence } from 'framer-motion'
import SharedCart from '@/components/SharedCart'
import { brandInfo } from '@/data/stores'

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
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

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setIsUserMenuOpen(false)
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  return (

    <>
          {/* Top Bar */}
      <div className="bg-cream-50 text-primary-800 py-2 border-b border-gray-200">
        <div className="container-custom px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm">
            <div className="flex items-center space-x-3 sm:space-x-6 mb-2 sm:mb-0">
              <div className="flex items-center space-x-2">
                <FiPhone className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>094 625 20 20</span>
              </div>
              <div className="flex items-center space-x-2">
                <FiMail className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden lg:inline">{brandInfo.email}</span>
                <span className="lg:hidden">Email</span>
              </div>
            </div>
            <div className="flex items-center space-x-3 sm:space-x-4">
              <a href={brandInfo.social.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-primary-600 transition-colors duration-200 p-1" title="Facebook">
                <FiFacebook className="w-4 h-4" />
              </a>
              <a href={brandInfo.social.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-primary-600 transition-colors duration-200 p-1" title="YouTube">
                <FiYoutube className="w-4 h-4" />
              </a>
              <a href={brandInfo.social.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-primary-600 transition-colors duration-200 p-1" title="Instagram">
                <FiInstagram className="w-4 h-4" />
              </a>
              <a href={brandInfo.social.tiktok} target="_blank" rel="noopener noreferrer" className="hover:text-primary-600 transition-colors duration-200 p-1" title="TikTok">
                <FaTiktok className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

   
    <nav className="bg-white shadow-lg sticky top-0 z-50 relative">
      <div className="container-custom px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/mbread-logo.jpg" alt="MBread Coffee & Tea" width={100} height={100} className="w-10 h-10 rounded-full" />
            <span className="text-xl md:text-xl font-serif font-bold text-primary-800">
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
                href="https://pos.mbreadcoffeetea.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200"
              >
                <span className="text-sm">Hệ thống</span>
              </Link>
            )}


            <Link
              href="https://pos.mbreadcoffeetea.com/order"
              target="_blank"
              rel="noopener noreferrer"
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
              <div className="">
                <Link
                  href="https://pos.mbreadcoffeetea.com/order"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMenuOpen(false)}
                  className="btn-primary w-full flex items-center justify-center space-x-2 relative py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <FiShoppingCart size={20} />
                  <span className='text-sm'>Đặt hàng ngay</span>
                  {cartState.totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold animate-pulse">
                      {cartState.totalItems}
                    </span>
                  )}
                </Link>
              </div>

              {/* User Section */}
              <div className="pt-4 border-t border-gray-200">
                  <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <FiUser className="text-gray-400 text-3xl mx-auto mb-3" />
                    <p className="text-gray-600 mb-4">Hệ thống quản lý MBread Coffee & Tea</p>
                    <Link
                      href="https://pos.mbreadcoffeetea.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsMenuOpen(false)}
                      className="btn-primary w-full flex items-center justify-center space-x-2"
                    >
                      <span className='text-sm'>Vào hệ thống </span>
                    </Link>
                  </div>
            
              </div>

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
                  <button
                    onClick={() => dispatch({ type: 'HIDE_MOBILE_CART' })}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <FiX size={20} />
                  </button>
                </div>
                
                <div className="flex-1 overflow-y-auto">
                  <div className="p-4">
                    <SharedCart 
                      isMobile={true} 
                      onClose={() => dispatch({ type: 'HIDE_MOBILE_CART' })} 
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
    </>
  )
}

export default Navigation