'use client'

import { motion } from 'framer-motion'
import { FiShield, FiDatabase, FiEye, FiLock, FiMail, FiPhone, FiMapPin, FiCoffee, FiStar, FiClock, FiUsers } from 'react-icons/fi'
import Image from 'next/image'
import Link from 'next/link'

const AboutAppPage = () => {
  return (
    <div className="min-h-screen bg-cream-50">
      {/* Header */}
      <div className="bg-primary-800 text-white py-16">
        <div className="container-custom px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <Image src="/mbread-logo.png" alt="MBread Coffee & Tea" width={100} height={100} className="w-16 h-16 rounded-full" />
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              Về ứng dụng MBread Coffee & Tea
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Tìm hiểu về chức năng ứng dụng và cách chúng tôi bảo vệ dữ liệu của bạn
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="container-custom px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-6xl mx-auto"
        >
          {/* App Identification Section */}
          <div className="mb-16">
            <div className="bg-white p-8 rounded-xl shadow-lg mb-8">
              <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary-800 mb-4">
                  MBread Coffee & Tea
                </h1>
                <p className="text-lg text-gray-600 mb-4">
                  Ứng dụng đặt hàng và quản lý cà phê & trà trực tuyến
                </p>
                <p className="text-sm text-gray-500">
                  Website: mbread-coffee-tea.com | Email: pkdmaikhoi@gmail.com
                </p>
              </div>
            </div>
          </div>

          {/* App Functionality Section */}
          <div className="mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-800 mb-4">
                  Chức năng ứng dụng MBread Coffee & Tea
                </h2>
                <p className="text-lg text-gray-600">
                  Khám phá các tính năng và dịch vụ mà ứng dụng của chúng tôi cung cấp
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <h3 className="text-xl font-serif font-semibold text-primary-800 mb-3">
                    🛒 Đặt hàng trực tuyến
                  </h3>
                  <p className="text-gray-700">
                    Duyệt thực đơn, chọn món yêu thích và đặt hàng trực tuyến với giao hàng tận nơi hoặc mang đi.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <h3 className="text-xl font-serif font-semibold text-primary-800 mb-3">
                    👤 Tài khoản người dùng
                  </h3>
                  <p className="text-gray-700">
                    Tạo tài khoản để lưu thông tin cá nhân, địa chỉ giao hàng và lịch sử đơn hàng.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <h3 className="text-xl font-serif font-semibold text-primary-800 mb-3">
                    📱 Đăng nhập bằng Google
                  </h3>
                  <p className="text-gray-700">
                    Đăng nhập nhanh chóng và an toàn bằng tài khoản Google của bạn để truy cập ứng dụng.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <h3 className="text-xl font-serif font-semibold text-primary-800 mb-3">
                    📍 Quản lý địa chỉ
                  </h3>
                  <p className="text-gray-700">
                    Lưu và quản lý nhiều địa chỉ giao hàng, chọn địa chỉ phù hợp cho mỗi đơn hàng.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <h3 className="text-xl font-serif font-semibold text-primary-800 mb-3">
                    📊 Theo dõi đơn hàng
                  </h3>
                  <p className="text-gray-700">
                    Xem trạng thái đơn hàng, lịch sử mua hàng và nhận thông báo cập nhật.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <h3 className="text-xl font-serif font-semibold text-primary-800 mb-3">
                    💳 Thanh toán an toàn
                  </h3>
                  <p className="text-gray-700">
                    Thanh toán trực tuyến an toàn hoặc thanh toán khi nhận hàng (COD).
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Data Usage Transparency Section */}
          <div className="mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-800 mb-4">
                  Minh bạch về dữ liệu người dùng
                </h2>
                <p className="text-lg text-gray-600">
                  Chúng tôi cam kết minh bạch về cách sử dụng dữ liệu của bạn
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg">
                <h3 className="text-2xl font-serif font-semibold text-primary-800 mb-6">
                  Tại sao chúng tôi yêu cầu dữ liệu Google?
                </h3>
                
                <div className="space-y-6">
                  <div className="border-l-4 border-primary-600 pl-6">
                    <h4 className="text-lg font-semibold text-primary-800 mb-2">
                      🔐 Xác thực và bảo mật
                    </h4>
                    <p className="text-gray-700">
                      Chúng tôi sử dụng Google OAuth để xác thực danh tính của bạn một cách an toàn, 
                      giúp bảo vệ tài khoản khỏi các hoạt động gian lận.
                    </p>
                  </div>

                  <div className="border-l-4 border-primary-600 pl-6">
                    <h4 className="text-lg font-semibold text-primary-800 mb-2">
                      👤 Tạo tài khoản người dùng
                    </h4>
                    <p className="text-gray-700">
                      Thông tin từ Google (tên, email) giúp chúng tôi tạo tài khoản cá nhân hóa 
                      và cung cấp dịch vụ đặt hàng tốt nhất cho bạn.
                    </p>
                  </div>

                  <div className="border-l-4 border-primary-600 pl-6">
                    <h4 className="text-lg font-semibold text-primary-800 mb-2">
                      📧 Thông báo đơn hàng
                    </h4>
                    <p className="text-gray-700">
                      Email từ tài khoản Google của bạn được sử dụng để gửi thông báo về trạng thái đơn hàng, 
                      xác nhận đặt hàng và cập nhật dịch vụ.
                    </p>
                  </div>

                  <div className="border-l-4 border-primary-600 pl-6">
                    <h4 className="text-lg font-semibold text-primary-800 mb-2">
                      🚫 Chúng tôi KHÔNG sử dụng dữ liệu Google để:
                    </h4>
                    <ul className="text-gray-700 list-disc list-inside space-y-1">
                      <li>Quảng cáo có mục tiêu hoặc cá nhân hóa</li>
                      <li>Bán dữ liệu cho bên thứ ba</li>
                      <li>Tạo hồ sơ quảng cáo</li>
                      <li>Chia sẻ với các công ty khác</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-primary-50 rounded-lg">
                  <h4 className="text-lg font-semibold text-primary-800 mb-3">
                    📋 Quyền của bạn
                  </h4>
                  <p className="text-gray-700 mb-3">
                    Bạn có quyền truy cập, chỉnh sửa hoặc xóa dữ liệu Google của mình bất cứ lúc nào. 
                    Để thực hiện các quyền này, vui lòng liên hệ với chúng tôi.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link href="/privacy" className="text-primary-600 hover:text-primary-700 underline font-semibold">
                      Đọc chính sách bảo mật đầy đủ
                    </Link>
                    <a href="mailto:pkdmaikhoi@gmail.com" className="text-primary-600 hover:text-primary-700 underline font-semibold">
                      Liên hệ về quyền riêng tư
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Back to Home */}
          <div className="text-center">
            <Link href="/" className="btn-primary text-lg px-8 py-4">
              Quay lại trang chủ
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default AboutAppPage
