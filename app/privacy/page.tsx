'use client'

import { motion } from 'framer-motion'
import { FiShield, FiLock, FiEye, FiDatabase, FiMail, FiPhone, FiMapPin } from 'react-icons/fi'
import Image from 'next/image'

const PrivacyPage = () => {
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
              Chính sách bảo mật
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Chúng tôi cam kết bảo vệ thông tin cá nhân của bạn và minh bạch trong việc thu thập, sử dụng dữ liệu.
            </p>
            <p className="text-sm text-gray-300 mt-4">
              Cập nhật lần cuối: {new Date().toLocaleDateString('vi-VN')}
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
          className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 md:p-12"
        >
          {/* Introduction */}
          <div className="mb-12">
            <div className="flex items-center space-x-3 mb-6">
              <FiShield className="text-primary-600 text-2xl" />
              <h2 className="text-2xl font-serif font-bold text-primary-800">Giới thiệu</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              MBread Coffee & Tea ("chúng tôi", "công ty", "dịch vụ") cam kết bảo vệ quyền riêng tư của bạn. 
              Chính sách bảo mật này giải thích cách chúng tôi thu thập, sử dụng, lưu trữ và bảo vệ thông tin cá nhân 
              của bạn khi bạn sử dụng dịch vụ của chúng tôi.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Bằng việc sử dụng dịch vụ của chúng tôi, bạn đồng ý với việc thu thập và sử dụng thông tin theo 
              chính sách này. Nếu bạn không đồng ý với bất kỳ phần nào của chính sách này, vui lòng không sử dụng dịch vụ của chúng tôi.
            </p>
          </div>

          {/* Information We Collect */}
          <div className="mb-12">
            <div className="flex items-center space-x-3 mb-6">
              <FiDatabase className="text-primary-600 text-2xl" />
              <h2 className="text-2xl font-serif font-bold text-primary-800">Thông tin chúng tôi thu thập</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-primary-800 mb-3">1. Thông tin cá nhân</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Tên đầy đủ</li>
                  <li>Địa chỉ email</li>
                  <li>Số điện thoại</li>
                  <li>Địa chỉ giao hàng</li>
                  <li>Thông tin thanh toán (được mã hóa và bảo mật)</li>
                  <li>Ngày sinh (nếu bạn cung cấp)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-primary-800 mb-3">2. Thông tin sử dụng dịch vụ</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Lịch sử đơn hàng</li>
                  <li>Sở thích và hành vi mua sắm</li>
                  <li>Đánh giá và phản hồi</li>
                  <li>Thông tin tài khoản và điểm tích lũy</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-primary-800 mb-3">3. Thông tin kỹ thuật</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Địa chỉ IP</li>
                  <li>Loại trình duyệt và phiên bản</li>
                  <li>Hệ điều hành</li>
                  <li>Thông tin thiết bị di động</li>
                  <li>Cookies và công nghệ theo dõi tương tự</li>
                </ul>
              </div>
            </div>
          </div>

          {/* How We Use Information */}
          <div className="mb-12">
            <div className="flex items-center space-x-3 mb-6">
              <FiEye className="text-primary-600 text-2xl" />
              <h2 className="text-2xl font-serif font-bold text-primary-800">Cách chúng tôi sử dụng thông tin</h2>
            </div>
            
            <div className="space-y-4">
              <div className="bg-primary-50 p-4 rounded-lg">
                <h3 className="font-semibold text-primary-800 mb-2">Cung cấp dịch vụ</h3>
                <p className="text-gray-700">Xử lý đơn hàng, giao hàng, và cung cấp dịch vụ khách hàng</p>
              </div>
              
              <div className="bg-primary-50 p-4 rounded-lg">
                <h3 className="font-semibold text-primary-800 mb-2">Cải thiện trải nghiệm</h3>
                <p className="text-gray-700">Cá nhân hóa nội dung, đề xuất sản phẩm phù hợp</p>
              </div>
              
              <div className="bg-primary-50 p-4 rounded-lg">
                <h3 className="font-semibold text-primary-800 mb-2">Giao tiếp</h3>
                <p className="text-gray-700">Gửi thông báo về đơn hàng, khuyến mãi, và cập nhật dịch vụ</p>
              </div>
              
              <div className="bg-primary-50 p-4 rounded-lg">
                <h3 className="font-semibold text-primary-800 mb-2">Bảo mật</h3>
                <p className="text-gray-700">Phát hiện và ngăn chặn gian lận, bảo vệ tài khoản</p>
              </div>
              
              <div className="bg-primary-50 p-4 rounded-lg">
                <h3 className="font-semibold text-primary-800 mb-2">Phân tích</h3>
                <p className="text-gray-700">Phân tích xu hướng, cải thiện sản phẩm và dịch vụ</p>
              </div>
            </div>
          </div>

          {/* Data Protection */}
          <div className="mb-12">
            <div className="flex items-center space-x-3 mb-6">
              <FiLock className="text-primary-600 text-2xl" />
              <h2 className="text-2xl font-serif font-bold text-primary-800">Bảo vệ dữ liệu</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-primary-800 mb-3">Biện pháp bảo mật</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Mã hóa SSL/TLS cho tất cả dữ liệu truyền tải</li>
                  <li>Mã hóa dữ liệu nhạy cảm trong cơ sở dữ liệu</li>
                  <li>Xác thực hai yếu tố cho tài khoản quản trị</li>
                  <li>Kiểm tra bảo mật định kỳ và cập nhật hệ thống</li>
                  <li>Giới hạn quyền truy cập dữ liệu theo nguyên tắc cần thiết tối thiểu</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-primary-800 mb-3">Lưu trữ dữ liệu</h3>
                <p className="text-gray-700 mb-3">
                  Dữ liệu của bạn được lưu trữ trên các máy chủ bảo mật tại Việt Nam và các nhà cung cấp 
                  dịch vụ đám mây uy tín như Google Cloud Platform và Firebase.
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Sao lưu dữ liệu định kỳ</li>
                  <li>Giám sát truy cập 24/7</li>
                  <li>Tuân thủ các tiêu chuẩn bảo mật quốc tế</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Cookies */}
          <div className="mb-12">
            <h2 className="text-2xl font-serif font-bold text-primary-800 mb-6">Cookies và Công nghệ theo dõi</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-primary-800 mb-3">Loại cookies chúng tôi sử dụng</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li><strong>Cookies thiết yếu:</strong> Cần thiết cho hoạt động cơ bản của website</li>
                  <li><strong>Cookies hiệu suất:</strong> Thu thập thông tin về cách bạn sử dụng website</li>
                  <li><strong>Cookies chức năng:</strong> Ghi nhớ lựa chọn của bạn (ngôn ngữ, khu vực)</li>
                  <li><strong>Cookies quảng cáo:</strong> Hiển thị quảng cáo phù hợp với sở thích của bạn</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-primary-800 mb-3">Quản lý cookies</h3>
                <p className="text-gray-700">
                  Bạn có thể kiểm soát và xóa cookies thông qua cài đặt trình duyệt. Tuy nhiên, việc vô hiệu hóa 
                  cookies có thể ảnh hưởng đến chức năng của website.
                </p>
              </div>
            </div>
          </div>

          {/* Third Party Services */}
          <div className="mb-12">
            <h2 className="text-2xl font-serif font-bold text-primary-800 mb-6">Dịch vụ bên thứ ba</h2>
            
            <div className="space-y-4">
              <p className="text-gray-700">
                Chúng tôi có thể sử dụng các dịch vụ bên thứ ba để cải thiện trải nghiệm của bạn:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-primary-800 mb-2">Google Analytics</h3>
                  <p className="text-gray-700 text-sm">Phân tích lưu lượng truy cập và hành vi người dùng</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-primary-800 mb-2">Google OAuth</h3>
                  <p className="text-gray-700 text-sm">Đăng nhập bằng tài khoản Google</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-primary-800 mb-2">Firebase</h3>
                  <p className="text-gray-700 text-sm">Lưu trữ dữ liệu và xác thực người dùng</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-primary-800 mb-2">Payment Gateway</h3>
                  <p className="text-gray-700 text-sm">Xử lý thanh toán an toàn</p>
                </div>
              </div>
            </div>
          </div>

          {/* Your Rights */}
          <div className="mb-12">
            <h2 className="text-2xl font-serif font-bold text-primary-800 mb-6">Quyền của bạn</h2>
            
            <div className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">Quyền truy cập</h3>
                <p className="text-gray-700">Bạn có quyền yêu cầu thông tin về dữ liệu cá nhân chúng tôi đang lưu trữ</p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">Quyền chỉnh sửa</h3>
                <p className="text-gray-700">Bạn có thể cập nhật hoặc sửa đổi thông tin cá nhân bất cứ lúc nào</p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">Quyền xóa</h3>
                <p className="text-gray-700">Bạn có thể yêu cầu xóa tài khoản và dữ liệu cá nhân</p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">Quyền từ chối</h3>
                <p className="text-gray-700">Bạn có thể từ chối nhận email marketing và thông báo</p>
              </div>
            </div>
          </div>

          {/* Data Retention */}
          <div className="mb-12">
            <h2 className="text-2xl font-serif font-bold text-primary-800 mb-6">Lưu trữ dữ liệu</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-primary-800 mb-3">Thời gian lưu trữ</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li><strong>Tài khoản hoạt động:</strong> Dữ liệu được lưu trữ cho đến khi bạn xóa tài khoản</li>
                  <li><strong>Tài khoản không hoạt động:</strong> Dữ liệu có thể được xóa sau 3 năm không hoạt động</li>
                  <li><strong>Dữ liệu pháp lý:</strong> Một số dữ liệu có thể được lưu trữ lâu hơn để tuân thủ pháp luật</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Children's Privacy */}
          <div className="mb-12">
            <h2 className="text-2xl font-serif font-bold text-primary-800 mb-6">Bảo vệ trẻ em</h2>
            
            <div className="bg-yellow-50 p-6 rounded-lg">
              <p className="text-gray-700">
                Dịch vụ của chúng tôi không dành cho trẻ em dưới 13 tuổi. Chúng tôi không cố ý thu thập 
                thông tin cá nhân từ trẻ em dưới 13 tuổi. Nếu chúng tôi phát hiện đã thu thập thông tin 
                từ trẻ em dưới 13 tuổi, chúng tôi sẽ xóa thông tin đó ngay lập tức.
              </p>
            </div>
          </div>

          {/* Changes to Policy */}
          <div className="mb-12">
            <h2 className="text-2xl font-serif font-bold text-primary-800 mb-6">Thay đổi chính sách</h2>
            
            <p className="text-gray-700 leading-relaxed">
              Chúng tôi có thể cập nhật chính sách bảo mật này theo thời gian. Khi có thay đổi quan trọng, 
              chúng tôi sẽ thông báo cho bạn qua email hoặc thông báo trên website. Việc tiếp tục sử dụng 
              dịch vụ sau khi có thay đổi được coi là đồng ý với chính sách mới.
            </p>
          </div>

          {/* Contact Information */}
          <div className="bg-primary-50 p-6 rounded-lg">
            <div className="flex items-center space-x-3 mb-4">
              <FiMail className="text-primary-600 text-xl" />
              <h2 className="text-xl font-serif font-bold text-primary-800">Liên hệ với chúng tôi</h2>
            </div>
            
            <p className="text-gray-700 mb-4">
              Nếu bạn có câu hỏi về chính sách bảo mật này hoặc muốn thực hiện quyền của mình, 
              vui lòng liên hệ với chúng tôi:
            </p>
            
            <div className="space-y-2 text-gray-700">
              <div className="flex items-center space-x-3">
                <FiMail className="text-primary-600" />
                <span>privacy@mbread-coffee-tea.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <FiPhone className="text-primary-600" />
                <span>(028) 1234 5678</span>
              </div>
              <div className="flex items-center space-x-3">
                <FiMapPin className="text-primary-600" />
                <span>123 Đường Nguyễn Huệ, Quận 1, TP.HCM</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default PrivacyPage
