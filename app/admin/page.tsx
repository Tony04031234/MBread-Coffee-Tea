'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FiUsers, FiShoppingBag, FiDollarSign, FiTrendingUp, FiCoffee, FiPackage, FiClock } from 'react-icons/fi'
import { prisma } from '@/lib/prisma'

interface DashboardStats {
  totalOrders: number
  totalRevenue: number
  totalCustomers: number
  totalMenuItems: number
  pendingOrders: number
  completedOrders: number
}

const AdminDashboard = () => {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (status === 'loading') return

    if (!session || session.user?.role !== 'ADMIN') {
      router.push('/auth/signin')
      return
    }

    fetchStats()
  }, [session, status, router])

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats')
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    )
  }

  if (!session || session.user?.role !== 'ADMIN') {
    return null
  }

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Header */}
      <section className="bg-primary-800 text-white py-12">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Bảng điều khiển quản trị
            </h1>
            <p className="text-xl opacity-90">
              Chào mừng, {session.user?.name}
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container-custom py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="card p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tổng đơn hàng</p>
                <p className="text-2xl font-bold text-primary-600">
                  {stats?.totalOrders || 0}
                </p>
              </div>
              <FiShoppingBag className="text-3xl text-primary-600" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="card p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Doanh thu</p>
                <p className="text-2xl font-bold text-green-600">
                  {stats?.totalRevenue?.toLocaleString('vi-VN') || 0}đ
                </p>
              </div>
              <FiDollarSign className="text-3xl text-green-600" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="card p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Khách hàng</p>
                <p className="text-2xl font-bold text-blue-600">
                  {stats?.totalCustomers || 0}
                </p>
              </div>
              <FiUsers className="text-3xl text-blue-600" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="card p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Món ăn</p>
                <p className="text-2xl font-bold text-purple-600">
                  {stats?.totalMenuItems || 0}
                </p>
              </div>
              <FiCoffee className="text-3xl text-purple-600" />
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="card p-6 mb-8"
        >
          <h2 className="text-xl font-serif font-bold text-primary-800 mb-4">
            Thao tác nhanh
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="btn-primary flex items-center justify-center space-x-2 py-3">
              <FiPackage />
              <span>Quản lý đơn hàng</span>
            </button>
            <button className="btn-outline flex items-center justify-center space-x-2 py-3">
              <FiCoffee />
              <span>Quản lý thực đơn</span>
            </button>
            <button className="btn-outline flex items-center justify-center space-x-2 py-3">
              <FiUsers />
              <span>Quản lý khách hàng</span>
            </button>
          </div>
        </motion.div>

        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="card p-6"
        >
          <h2 className="text-xl font-serif font-bold text-primary-800 mb-4">
            Đơn hàng gần đây
          </h2>
          <div className="text-center py-8 text-gray-500">
            <FiClock className="text-4xl mx-auto mb-4" />
            <p>Chức năng này sẽ được triển khai trong phiên bản tiếp theo</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default AdminDashboard
