'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiInfo } from 'react-icons/fi'
import Link from 'next/link'

interface ToastProps {
  show: boolean
  message: string
  type?: 'info' | 'success' | 'warning' | 'error'
  duration?: number
  onClose: () => void
  showSignInLink?: boolean
}

const Toast = ({ 
  show, 
  message, 
  type = 'info', 
  duration = 4000, 
  onClose,
  showSignInLink = false 
}: ToastProps) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (show) {
      setIsVisible(true)
      const timer = setTimeout(() => {
        setIsVisible(false)
        setTimeout(onClose, 300) // Wait for animation to complete
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [show, duration, onClose])

  const getToastStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-500 text-white'
      case 'warning':
        return 'bg-yellow-500 text-white'
      case 'error':
        return 'bg-red-500 text-white'
      default:
        return 'bg-blue-500 text-white'
    }
  }

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✓'
      case 'warning':
        return '⚠'
      case 'error':
        return '✕'
      default:
        return <FiInfo size={20} />
    }
  }

  if (!show) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -100, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -100, scale: 0.8 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed top-4 right-4 z-50 max-w-sm w-full"
        >
          <div className={`${getToastStyles()} rounded-lg shadow-lg p-4 flex items-start space-x-3`}>
            <div className="flex-shrink-0 mt-0.5">
              {getIcon()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">{message}</p>
              {showSignInLink && (
                <div className="mt-2">
                  <Link 
                    href="/auth/signin" 
                    className="text-sm underline hover:no-underline font-semibold"
                  >
                    Đăng nhập ngay
                  </Link>
                </div>
              )}
            </div>
            <button
              onClick={() => {
                setIsVisible(false)
                setTimeout(onClose, 300)
              }}
              className="flex-shrink-0 ml-2 hover:bg-white/20 rounded-full p-1 transition-colors duration-200"
            >
              <FiX size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Toast
