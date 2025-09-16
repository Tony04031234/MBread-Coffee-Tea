'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FiLock, FiEye, FiEyeOff, FiCheckCircle, FiAlertCircle } from 'react-icons/fi'
import Image from 'next/image'

const ResetPasswordPage = () => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [tokenValid, setTokenValid] = useState<boolean | null>(null)
  const [token, setToken] = useState('')
  
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const tokenParam = searchParams.get('token')
    if (tokenParam) {
      setToken(tokenParam)
      validateToken(tokenParam)
    } else {
      setTokenValid(false)
    }
  }, [searchParams])

  const validateToken = async (token: string) => {
    try {
      const response = await fetch(`/api/auth/validate-reset-token?token=${token}`)
      const data = await response.json()
      
      if (response.ok) {
        setTokenValid(true)
      } else {
        setTokenValid(false)
        setError(data.error || 'Liên kết không hợp lệ hoặc đã hết hạn')
      }
    } catch (error) {
      setTokenValid(false)
      setError('Đã xảy ra lỗi khi xác thực liên kết')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    if (password !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp')
      setIsLoading(false)
      return
    }

    if (password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự')
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          token,
          password 
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess(true)
      } else {
        setError(data.error || 'Đã xảy ra lỗi, vui lòng thử lại')
      }
    } catch (error) {
      setError('Đã xảy ra lỗi, vui lòng thử lại')
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex justify-center">
              <Image src="/mbread-logo.png" alt="MBread Coffee & Tea" width={100} height={100} className="md:w-24 md:h-24 w-16 h-16 rounded-xl" />
            </div>
            <h2 className="mt-6 text-3xl font-serif font-bold text-primary-800">
              Đặt lại mật khẩu thành công
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Mật khẩu của bạn đã được cập nhật
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white py-8 px-6 shadow-xl rounded-xl"
          >
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <FiCheckCircle className="h-16 w-16 text-green-500" />
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">
                  Hoàn thành!
                </h3>
                <p className="text-gray-600">
                  Mật khẩu của bạn đã được đặt lại thành công. Bạn có thể đăng nhập với mật khẩu mới.
                </p>
              </div>

              <Link
                href="/auth/signin"
                className="w-full btn-primary py-3 inline-block text-center"
              >
                Đăng nhập ngay
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  if (tokenValid === false) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex justify-center">
              <Image src="/mbread-logo.png" alt="MBread Coffee & Tea" width={100} height={100} className="md:w-24 md:h-24 w-16 h-16 rounded-xl" />
            </div>
            <h2 className="mt-6 text-3xl font-serif font-bold text-primary-800">
              Liên kết không hợp lệ
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Liên kết đặt lại mật khẩu không hợp lệ hoặc đã hết hạn
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white py-8 px-6 shadow-xl rounded-xl"
          >
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <FiAlertCircle className="h-16 w-16 text-red-500" />
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">
                  Liên kết không khả dụng
                </h3>
                <p className="text-gray-600">
                  Liên kết đặt lại mật khẩu có thể đã hết hạn hoặc đã được sử dụng. Vui lòng yêu cầu liên kết mới.
                </p>
              </div>

              <div className="space-y-4">
                <Link
                  href="/auth/forgot-password"
                  className="w-full btn-primary py-3 inline-block text-center"
                >
                  Yêu cầu liên kết mới
                </Link>
                
                <Link
                  href="/auth/signin"
                  className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 inline-block text-center transition-colors duration-200"
                >
                  Quay lại đăng nhập
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  if (tokenValid === null) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="flex justify-center">
              <Image src="/mbread-logo.png" alt="MBread Coffee & Tea" width={100} height={100} className="md:w-24 md:h-24 w-16 h-16 rounded-xl" />
            </div>
            <h2 className="mt-6 text-3xl font-serif font-bold text-primary-800">
              Đang xác thực...
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Vui lòng chờ trong giây lát
            </p>
          </div>
          <div className="flex justify-center">
            <div className="spinner w-8 h-8"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="flex justify-center">
            <Image src="/mbread-logo.png" alt="MBread Coffee & Tea" width={100} height={100} className="md:w-24 md:h-24 w-16 h-16 rounded-xl" />
          </div>
          <h2 className="mt-6 text-3xl font-serif font-bold text-primary-800">
            Đặt lại mật khẩu
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Nhập mật khẩu mới của bạn
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white py-8 px-6 shadow-xl rounded-xl"
        >
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                <FiLock className="inline mr-2" />
                Mật khẩu mới
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent pr-10"
                  placeholder="Nhập mật khẩu mới"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FiEyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <FiEye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                <FiLock className="inline mr-2" />
                Xác nhận mật khẩu
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent pr-10"
                  placeholder="Nhập lại mật khẩu mới"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <FiEyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <FiEye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="spinner w-5 h-5"></div>
                    <span>Đang cập nhật...</span>
                  </>
                ) : (
                  <span>Đặt lại mật khẩu</span>
                )}
              </button>
            </div>

            <div className="text-center">
              <Link
                href="/auth/signin"
                className="text-sm text-primary-600 hover:text-primary-500"
              >
                Quay lại đăng nhập
              </Link>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

export default ResetPasswordPage
