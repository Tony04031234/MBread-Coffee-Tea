'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiCheck, FiShoppingCart, FiX } from 'react-icons/fi'
import Link from 'next/link'

interface CartNotificationProps {
  show: boolean
  itemName: string
  onClose: () => void
  cartCount: number
  onOpenCart?: () => void
}

const CartNotification = ({ show, itemName, onClose, cartCount, onOpenCart }: CartNotificationProps) => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024) // lg breakpoint
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose()
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [show, onClose])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -100, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -100, scale: 0.8 }}
          className="fixed top-20 right-4 z-50 bg-white rounded-lg shadow-lg border border-gray-200 p-4 max-w-sm"
        >
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <FiCheck className="text-green-600" size={20} />
              </div>
            </div>
            <div className="flex-grow">
              <p className="text-sm font-medium text-gray-900">
                Đã thêm vào giỏ hàng
              </p>
              <p className="text-xs text-gray-500">
                {itemName}
              </p>
            </div>
            <button
              onClick={onClose}
              className="flex-shrink-0 text-gray-400 hover:text-gray-600"
            >
              <FiX size={16} />
            </button>
          </div>
          
          <div className="mt-3 pt-3 border-t border-gray-100">
            {isMobile && onOpenCart ? (
              <button
                onClick={() => {
                  onOpenCart()
                  onClose()
                }}
                className="w-full flex items-center justify-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors duration-200"
              >
                <FiShoppingCart size={16} />
                <span>Xem giỏ hàng ({cartCount})</span>
              </button>
            ) : (
              <Link
                href="/ordering"
                className="flex items-center justify-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                onClick={onClose}
              >
                <FiShoppingCart size={16} />
                <span>Xem giỏ hàng ({cartCount})</span>
              </Link>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default CartNotification
