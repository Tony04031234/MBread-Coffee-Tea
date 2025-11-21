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
            <div className="bg-primary-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-semibold text-primary-800 mb-3">Về ứng dụng MBread Coffee & Tea</h3>
              <p className="text-gray-700 leading-relaxed">
                Chính sách bảo mật này áp dụng cho ứng dụng web MBread Coffee & Tea (mbread-coffee-tea.com) 
                và tất cả các dịch vụ liên quan. Đây là chính sách chính thức của MBread Coffee & Tea, 
                một công ty cà phê và trà có trụ sở tại Việt Nam.
              </p>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              MBread Coffee & Tea ("chúng tôi", "công ty", "dịch vụ") cam kết bảo vệ quyền riêng tư của bạn. 
              Chính sách bảo mật này giải thích cách chúng tôi thu thập, sử dụng, lưu trữ và bảo vệ thông tin cá nhân 
              của bạn khi bạn sử dụng dịch vụ của chúng tôi, bao gồm cả việc sử dụng Google OAuth để đăng nhập.
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
            
            <div className="space-y-6">
              <div className="bg-red-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-primary-800 mb-4">Biện pháp bảo mật cho dữ liệu Google</h3>
                <p className="text-gray-700 mb-4">
                  Chúng tôi áp dụng các biện pháp bảo mật nghiêm ngặt để bảo vệ dữ liệu Google của bạn:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li><strong>Mã hóa trong quá trình truyền tải:</strong> Tất cả dữ liệu Google được mã hóa SSL/TLS khi truyền tải</li>
                  <li><strong>Mã hóa khi lưu trữ:</strong> Dữ liệu Google được mã hóa AES-256 trong cơ sở dữ liệu</li>
                  <li><strong>Xác thực hai yếu tố:</strong> Tài khoản quản trị có xác thực hai yếu tố bắt buộc</li>
                  <li><strong>Kiểm soát truy cập:</strong> Chỉ nhân viên được ủy quyền mới có thể truy cập dữ liệu Google</li>
                  <li><strong>Giám sát bảo mật:</strong> Hệ thống giám sát 24/7 để phát hiện hoạt động bất thường</li>
                  <li><strong>Cập nhật bảo mật:</strong> Thường xuyên cập nhật và vá lỗ hổng bảo mật</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-primary-800 mb-3">Biện pháp bảo mật tổng thể</h3>
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

          {/* Google User Data */}
          <div className="mb-12">
            <div className="flex items-center space-x-3 mb-6">
              <FiShield className="text-primary-600 text-2xl" />
              <h2 className="text-2xl font-serif font-bold text-primary-800">Dữ liệu người dùng Google</h2>
            </div>
            
            <div className="space-y-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-primary-800 mb-4">Dữ liệu Google chúng tôi thu thập</h3>
                <p className="text-gray-700 mb-4">
                  Khi bạn sử dụng tính năng đăng nhập bằng Google OAuth, chúng tôi có thể thu thập các thông tin sau từ tài khoản Google của bạn:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Tên đầy đủ từ hồ sơ Google của bạn</li>
                  <li>Địa chỉ email từ tài khoản Google</li>
                  <li>Ảnh đại diện (nếu bạn cho phép)</li>
                  <li>ID duy nhất của tài khoản Google để xác thực</li>
                </ul>
              </div>

              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-primary-800 mb-4">Cách chúng tôi sử dụng dữ liệu Google</h3>
                <p className="text-gray-700 mb-4">
                  Chúng tôi chỉ sử dụng dữ liệu Google của bạn để:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Tạo và quản lý tài khoản người dùng trên ứng dụng MBread Coffee & Tea</li>
                  <li>Cung cấp dịch vụ đặt hàng và giao hàng</li>
                  <li>Gửi thông báo về đơn hàng và dịch vụ</li>
                  <li>Cải thiện trải nghiệm người dùng và chức năng của ứng dụng</li>
                </ul>
                <p className="text-gray-700 mt-4 font-semibold">
                  Chúng tôi KHÔNG sử dụng dữ liệu Google của bạn cho:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 mt-2">
                  <li>Quảng cáo có mục tiêu hoặc cá nhân hóa</li>
                  <li>Bán dữ liệu cho bên thứ ba</li>
                  <li>Chuyển giao cho nhà môi giới dữ liệu</li>
                  <li>Đánh giá tín dụng hoặc mục đích cho vay</li>
                  <li>Tạo cơ sở dữ liệu để bán</li>
                  <li>Huấn luyện mô hình AI</li>
                </ul>
              </div>

              <div className="bg-yellow-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-primary-800 mb-4">Chia sẻ dữ liệu Google</h3>
                <p className="text-gray-700 mb-4">
                  Chúng tôi KHÔNG bán, cho thuê hoặc chuyển giao dữ liệu Google của bạn cho bên thứ ba, ngoại trừ:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Các nhà cung cấp dịch vụ đáng tin cậy giúp chúng tôi vận hành ứng dụng (như Firebase, Google Cloud Platform)</li>
                  <li>Khi được yêu cầu bởi pháp luật hoặc để bảo vệ quyền lợi hợp pháp của chúng tôi</li>
                  <li>Với sự đồng ý rõ ràng của bạn</li>
                </ul>
                <p className="text-gray-700 mt-4">
                  Tất cả các bên thứ ba này đều được yêu cầu bảo vệ dữ liệu của bạn và chỉ sử dụng cho mục đích cung cấp dịch vụ.
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
            
            <div className="space-y-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-primary-800 mb-4">Quyền đối với dữ liệu Google</h3>
                <p className="text-gray-700 mb-4">
                  Bạn có các quyền sau đối với dữ liệu Google của mình:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Quyền truy cập</h4>
                    <p className="text-gray-700 text-sm">Xem dữ liệu Google chúng tôi đang lưu trữ về bạn</p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Quyền chỉnh sửa</h4>
                    <p className="text-gray-700 text-sm">Cập nhật hoặc sửa đổi dữ liệu Google của bạn</p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Quyền xóa</h4>
                    <p className="text-gray-700 text-sm">Yêu cầu xóa dữ liệu Google của bạn</p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Quyền từ chối</h4>
                    <p className="text-gray-700 text-sm">Từ chối việc sử dụng dữ liệu Google cho mục đích marketing</p>
                  </div>
                </div>
              </div>

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

              <div className="bg-yellow-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-primary-800 mb-4">Cách thực hiện quyền của bạn</h3>
                <p className="text-gray-700 mb-4">
                  Để thực hiện bất kỳ quyền nào đối với dữ liệu Google của bạn:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Gửi email đến: pkdmaikhoi@gmail.com</li>
                  <li>Gọi điện đến: 094 625 20 20</li>
                  <li>Liên hệ trực tiếp tại cửa hàng: B1.12.40 Đường 33CL, Phường Cát Lái, Thành phố Hồ Chí Minh, Việt Nam</li>
                  <li>Chúng tôi sẽ phản hồi trong vòng 30 ngày</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Data Retention */}
          <div className="mb-12">
            <h2 className="text-2xl font-serif font-bold text-primary-800 mb-6">Lưu trữ và xóa dữ liệu</h2>
            
            <div className="space-y-6">
              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-primary-800 mb-4">Chính sách lưu trữ dữ liệu Google</h3>
                <p className="text-gray-700 mb-4">
                  Chúng tôi lưu trữ dữ liệu Google của bạn trong thời gian cần thiết để cung cấp dịch vụ:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li><strong>Tài khoản hoạt động:</strong> Dữ liệu Google được lưu trữ cho đến khi bạn xóa tài khoản hoặc yêu cầu xóa</li>
                  <li><strong>Tài khoản không hoạt động:</strong> Dữ liệu Google sẽ được xóa sau 2 năm không hoạt động</li>
                  <li><strong>Dữ liệu pháp lý:</strong> Một số dữ liệu có thể được lưu trữ lâu hơn để tuân thủ pháp luật</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-primary-800 mb-3">Thời gian lưu trữ tổng thể</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li><strong>Tài khoản hoạt động:</strong> Dữ liệu được lưu trữ cho đến khi bạn xóa tài khoản</li>
                  <li><strong>Tài khoản không hoạt động:</strong> Dữ liệu có thể được xóa sau 3 năm không hoạt động</li>
                  <li><strong>Dữ liệu pháp lý:</strong> Một số dữ liệu có thể được lưu trữ lâu hơn để tuân thủ pháp luật</li>
                </ul>
              </div>

              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-primary-800 mb-4">Quyền xóa dữ liệu</h3>
                <p className="text-gray-700 mb-4">
                  Bạn có quyền yêu cầu xóa dữ liệu Google của mình bất cứ lúc nào:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Liên hệ với chúng tôi qua email: pkdmaikhoi@gmail.com</li>
                  <li>Chúng tôi sẽ xóa dữ liệu Google của bạn trong vòng 30 ngày</li>
                  <li>Bạn sẽ nhận được xác nhận khi việc xóa hoàn tất</li>
                  <li>Một số dữ liệu có thể được giữ lại để tuân thủ nghĩa vụ pháp lý</li>
                </ul>
              </div>

              <div className="bg-orange-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-primary-800 mb-4">Tự động xóa dữ liệu</h3>
                <p className="text-gray-700 mb-4">
                  Chúng tôi có các quy trình tự động để xóa dữ liệu:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Dữ liệu tạm thời được xóa sau 24 giờ</li>
                  <li>Logs hệ thống được xóa sau 90 ngày</li>
                  <li>Dữ liệu sao lưu cũ được xóa sau 1 năm</li>
                  <li>Dữ liệu Google không hoạt động được xóa sau 2 năm</li>
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
                <span>pkdmaikhoi@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <FiPhone className="text-primary-600" />
                <span>094 625 20 20</span>
              </div>
              <div className="flex items-center space-x-3">
                <FiMapPin className="text-primary-600" />
                <span>B1.12.40 Đường 33CL, Phường Cát Lái, Thành phố Hồ Chí Minh, Việt Nam</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default PrivacyPage
