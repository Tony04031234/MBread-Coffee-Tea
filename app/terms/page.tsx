'use client'

import { motion } from 'framer-motion'
import { FiFileText, FiShield, FiCreditCard, FiTruck, FiUser, FiAlertCircle, FiCheckCircle } from 'react-icons/fi'
import Image from 'next/image'

const TermsPage = () => {
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
              Điều khoản dịch vụ
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Các điều khoản và điều kiện sử dụng dịch vụ của MBread Coffee & Tea
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
              <FiFileText className="text-primary-600 text-2xl" />
              <h2 className="text-2xl font-serif font-bold text-primary-800">Giới thiệu</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Chào mừng bạn đến với MBread Coffee & Tea! Những điều khoản dịch vụ này ("Điều khoản") 
              điều chỉnh việc sử dụng website, ứng dụng di động và các dịch vụ của chúng tôi 
              (gọi chung là "Dịch vụ").
            </p>
            <p className="text-gray-700 leading-relaxed">
              Bằng việc truy cập hoặc sử dụng Dịch vụ của chúng tôi, bạn đồng ý tuân thủ và bị ràng buộc 
              bởi những Điều khoản này. Nếu bạn không đồng ý với bất kỳ phần nào của Điều khoản này, 
              vui lòng không sử dụng Dịch vụ của chúng tôi.
            </p>
          </div>

          {/* Acceptance of Terms */}
          <div className="mb-12">
            <h2 className="text-2xl font-serif font-bold text-primary-800 mb-6">Chấp nhận điều khoản</h2>
            
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="flex items-start space-x-3">
                <FiCheckCircle className="text-blue-600 text-xl mt-1" />
                <div>
                  <h3 className="font-semibold text-blue-800 mb-2">Đồng ý tuân thủ</h3>
                  <p className="text-gray-700">
                    Việc sử dụng Dịch vụ của chúng tôi có nghĩa là bạn đã đọc, hiểu và đồng ý tuân thủ 
                    tất cả các điều khoản và điều kiện được nêu trong tài liệu này.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Service Description */}
          <div className="mb-12">
            <h2 className="text-2xl font-serif font-bold text-primary-800 mb-6">Mô tả dịch vụ</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-primary-800 mb-3">Dịch vụ chúng tôi cung cấp</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Đặt món cà phê và trà trực tuyến</li>
                  <li>Giao hàng tận nơi và dịch vụ mang đi</li>
                  <li>Quản lý tài khoản khách hàng</li>
                  <li>Chương trình tích điểm và khuyến mãi</li>
                  <li>Thông tin về sản phẩm và dịch vụ</li>
                  <li>Hỗ trợ khách hàng</li>
                </ul>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <div className="flex items-start space-x-3">
                  <FiAlertCircle className="text-yellow-600 text-xl mt-1" />
                  <div>
                    <h3 className="font-semibold text-yellow-800 mb-2">Lưu ý quan trọng</h3>
                    <p className="text-gray-700">
                      Chúng tôi có quyền thay đổi, tạm ngưng hoặc chấm dứt bất kỳ phần nào của Dịch vụ 
                      mà không cần thông báo trước. Chúng tôi không chịu trách nhiệm nếu Dịch vụ bị 
                      gián đoạn hoặc không khả dụng.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* User Accounts */}
          <div className="mb-12">
            <div className="flex items-center space-x-3 mb-6">
              <FiUser className="text-primary-600 text-2xl" />
              <h2 className="text-2xl font-serif font-bold text-primary-800">Tài khoản người dùng</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-primary-800 mb-3">Đăng ký tài khoản</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Bạn phải cung cấp thông tin chính xác và đầy đủ khi đăng ký</li>
                  <li>Bạn có trách nhiệm bảo mật mật khẩu và tài khoản của mình</li>
                  <li>Bạn phải thông báo ngay lập tức về bất kỳ vi phạm bảo mật nào</li>
                  <li>Mỗi người chỉ được tạo một tài khoản</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-primary-800 mb-3">Trách nhiệm của người dùng</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Không sử dụng tài khoản cho mục đích bất hợp pháp</li>
                  <li>Không chia sẻ thông tin đăng nhập với người khác</li>
                  <li>Cập nhật thông tin cá nhân khi có thay đổi</li>
                  <li>Tuân thủ tất cả các luật và quy định hiện hành</li>
                </ul>
              </div>

              <div className="bg-red-50 p-4 rounded-lg">
                <h3 className="font-semibold text-red-800 mb-2">Hành vi bị cấm</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Sử dụng tài khoản giả mạo hoặc thông tin sai lệch</li>
                  <li>Gây rối, spam hoặc làm gián đoạn dịch vụ</li>
                  <li>Vi phạm bản quyền hoặc quyền sở hữu trí tuệ</li>
                  <li>Phân phối phần mềm độc hại hoặc mã độc</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Orders and Payment */}
          <div className="mb-12">
            <div className="flex items-center space-x-3 mb-6">
              <FiCreditCard className="text-primary-600 text-2xl" />
              <h2 className="text-2xl font-serif font-bold text-primary-800">Đơn hàng và thanh toán</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-primary-800 mb-3">Quy trình đặt hàng</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>Chọn sản phẩm từ menu</li>
                  <li>Thêm vào giỏ hàng và kiểm tra</li>
                  <li>Cung cấp thông tin giao hàng</li>
                  <li>Chọn phương thức thanh toán</li>
                  <li>Xác nhận đơn hàng</li>
                  <li>Nhận xác nhận qua email/SMS</li>
                </ol>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-primary-800 mb-3">Phương thức thanh toán</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-primary-800 mb-2">Thanh toán khi nhận hàng (COD)</h4>
                    <p className="text-gray-700 text-sm">Thanh toán bằng tiền mặt khi nhận hàng</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-primary-800 mb-2">Chuyển khoản ngân hàng</h4>
                    <p className="text-gray-700 text-sm">Thanh toán qua chuyển khoản trước khi giao hàng</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-primary-800 mb-2">Ví điện tử</h4>
                    <p className="text-gray-700 text-sm">Thanh toán qua các ứng dụng ví điện tử</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-primary-800 mb-2">Thẻ tín dụng/ghi nợ</h4>
                    <p className="text-gray-700 text-sm">Thanh toán qua thẻ ngân hàng</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">Bảo mật thanh toán</h3>
                <p className="text-gray-700">
                  Tất cả thông tin thanh toán được mã hóa và xử lý an toàn. Chúng tôi không lưu trữ 
                  thông tin thẻ tín dụng trên hệ thống của mình.
                </p>
              </div>
            </div>
          </div>

          {/* Delivery and Shipping */}
          <div className="mb-12">
            <div className="flex items-center space-x-3 mb-6">
              <FiTruck className="text-primary-600 text-2xl" />
              <h2 className="text-2xl font-serif font-bold text-primary-800">Giao hàng và vận chuyển</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-primary-800 mb-3">Phương thức giao hàng</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Giao hàng tận nơi</h4>
                    <ul className="text-gray-700 text-sm space-y-1">
                      <li>• Phí giao hàng: 15.000đ - 25.000đ</li>
                      <li>• Thời gian: 30-45 phút</li>
                      <li>• Khu vực: TP.HCM</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Mang đi</h4>
                    <ul className="text-gray-700 text-sm space-y-1">
                      <li>• Không phí giao hàng</li>
                      <li>• Thời gian: 10-20 phút</li>
                      <li>• Tại cửa hàng</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-primary-800 mb-3">Điều kiện giao hàng</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Đơn hàng tối thiểu: 50.000đ (áp dụng cho giao hàng)</li>
                  <li>Thời gian giao hàng có thể thay đổi tùy theo tình trạng giao thông</li>
                  <li>Khách hàng cần có mặt tại địa chỉ giao hàng</li>
                  <li>Nếu không có người nhận, đơn hàng sẽ được giao lại vào lần sau</li>
                  <li>Chúng tôi không chịu trách nhiệm nếu khách hàng cung cấp sai địa chỉ</li>
                </ul>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="font-semibold text-yellow-800 mb-2">Lưu ý quan trọng</h3>
                <p className="text-gray-700">
                  Thời gian giao hàng có thể bị ảnh hưởng bởi thời tiết, giao thông, hoặc các sự kiện 
                  đặc biệt. Chúng tôi sẽ thông báo cho bạn nếu có thay đổi.
                </p>
              </div>
            </div>
          </div>

          {/* Cancellation and Refunds */}
          <div className="mb-12">
            <h2 className="text-2xl font-serif font-bold text-primary-800 mb-6">Hủy đơn và hoàn tiền</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-primary-800 mb-3">Hủy đơn hàng</h3>
                <div className="space-y-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Có thể hủy</h4>
                    <ul className="text-gray-700 text-sm space-y-1">
                      <li>• Trong vòng 5 phút sau khi đặt hàng</li>
                      <li>• Trước khi đơn hàng được chuẩn bị</li>
                      <li>• Nếu sản phẩm hết hàng</li>
                    </ul>
                  </div>
                  
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-red-800 mb-2">Không thể hủy</h4>
                    <ul className="text-gray-700 text-sm space-y-1">
                      <li>• Sau khi đơn hàng đã được chuẩn bị</li>
                      <li>• Đơn hàng đang trong quá trình giao</li>
                      <li>• Đơn hàng đã giao thành công</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-primary-800 mb-3">Chính sách hoàn tiền</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Hoàn tiền 100% nếu đơn hàng bị hủy do lỗi của chúng tôi</li>
                  <li>Hoàn tiền theo tỷ lệ nếu sản phẩm không đúng với mô tả</li>
                  <li>Thời gian xử lý hoàn tiền: 3-5 ngày làm việc</li>
                  <li>Hoàn tiền sẽ được thực hiện theo phương thức thanh toán ban đầu</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Product Information */}
          <div className="mb-12">
            <h2 className="text-2xl font-serif font-bold text-primary-800 mb-6">Thông tin sản phẩm</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-primary-800 mb-3">Mô tả sản phẩm</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Chúng tôi cố gắng cung cấp thông tin chính xác về sản phẩm</li>
                  <li>Hình ảnh chỉ mang tính chất minh họa</li>
                  <li>Giá có thể thay đổi mà không cần thông báo trước</li>
                  <li>Sản phẩm có thể hết hàng bất cứ lúc nào</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-primary-800 mb-3">Dị ứng và thành phần</h3>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <p className="text-gray-700">
                    <strong>Lưu ý quan trọng:</strong> Một số sản phẩm có thể chứa các thành phần gây dị ứng 
                    như sữa, đậu nành, gluten, các loại hạt. Vui lòng thông báo cho chúng tôi nếu bạn có 
                    dị ứng với bất kỳ thành phần nào.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Intellectual Property */}
          <div className="mb-12">
            <h2 className="text-2xl font-serif font-bold text-primary-800 mb-6">Sở hữu trí tuệ</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-primary-800 mb-3">Bản quyền</h3>
                <p className="text-gray-700">
                  Tất cả nội dung trên website, bao gồm văn bản, hình ảnh, logo, thiết kế, và phần mềm 
                  đều thuộc sở hữu của MBread Coffee & Tea hoặc được sử dụng với sự cho phép.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-primary-800 mb-3">Sử dụng nội dung</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Bạn không được sao chép, phân phối hoặc sử dụng nội dung mà không có sự cho phép</li>
                  <li>Bạn có thể chia sẻ liên kết đến website của chúng tôi</li>
                  <li>Việc sử dụng thương hiệu của chúng tôi cần có sự đồng ý bằng văn bản</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Limitation of Liability */}
          <div className="mb-12">
            <h2 className="text-2xl font-serif font-bold text-primary-800 mb-6">Giới hạn trách nhiệm</h2>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-primary-800 mb-3">Trách nhiệm của chúng tôi</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>Chúng tôi cam kết cung cấp dịch vụ chất lượng tốt nhất</li>
                    <li>Chúng tôi sẽ xử lý khiếu nại một cách công bằng và nhanh chóng</li>
                    <li>Chúng tôi đảm bảo thông tin cá nhân được bảo mật</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-primary-800 mb-3">Giới hạn trách nhiệm</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>Chúng tôi không chịu trách nhiệm cho các thiệt hại gián tiếp</li>
                    <li>Trách nhiệm tối đa không vượt quá giá trị đơn hàng</li>
                    <li>Chúng tôi không chịu trách nhiệm cho các sự kiện bất khả kháng</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Privacy Policy */}
          <div className="mb-12">
            <div className="flex items-center space-x-3 mb-6">
              <FiShield className="text-primary-600 text-2xl" />
              <h2 className="text-2xl font-serif font-bold text-primary-800">Chính sách bảo mật</h2>
            </div>
            
            <p className="text-gray-700 leading-relaxed mb-4">
              Việc thu thập và sử dụng thông tin cá nhân của bạn được điều chỉnh bởi 
              <a href="/privacy" className="text-primary-600 hover:text-primary-700 underline"> Chính sách bảo mật</a> 
              của chúng tôi. Bằng việc sử dụng Dịch vụ, bạn đồng ý với việc thu thập và sử dụng 
              thông tin theo chính sách đó.
            </p>
          </div>

          {/* Changes to Terms */}
          <div className="mb-12">
            <h2 className="text-2xl font-serif font-bold text-primary-800 mb-6">Thay đổi điều khoản</h2>
            
            <div className="bg-blue-50 p-6 rounded-lg">
              <p className="text-gray-700 leading-relaxed">
                Chúng tôi có quyền cập nhật hoặc thay đổi những Điều khoản này bất cứ lúc nào. 
                Khi có thay đổi quan trọng, chúng tôi sẽ thông báo cho bạn qua email hoặc thông báo 
                trên website. Việc tiếp tục sử dụng Dịch vụ sau khi có thay đổi được coi là đồng ý 
                với Điều khoản mới.
              </p>
            </div>
          </div>

          {/* Governing Law */}
          <div className="mb-12">
            <h2 className="text-2xl font-serif font-bold text-primary-800 mb-6">Luật áp dụng</h2>
            
            <div className="space-y-4">
              <p className="text-gray-700">
                Những Điều khoản này được điều chỉnh bởi pháp luật Việt Nam. Mọi tranh chấp phát sinh 
                từ việc sử dụng Dịch vụ sẽ được giải quyết tại tòa án có thẩm quyền tại TP.HCM.
              </p>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">Giải quyết tranh chấp</h3>
                <p className="text-gray-700 text-sm">
                  Chúng tôi khuyến khích giải quyết tranh chấp thông qua đối thoại và thương lượng 
                  trước khi tiến hành các thủ tục pháp lý.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-primary-50 p-6 rounded-lg">
            <h2 className="text-xl font-serif font-bold text-primary-800 mb-4">Thông tin liên hệ</h2>
            
            <p className="text-gray-700 mb-4">
              Nếu bạn có câu hỏi về những Điều khoản này, vui lòng liên hệ với chúng tôi:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
              <div>
                <h3 className="font-semibold text-primary-800 mb-2">Thông tin công ty</h3>
                <p><strong>Tên:</strong> MBread Coffee & Tea</p>
                <p><strong>Địa chỉ:</strong> 7 Đường Số 7, An Lạc A, Bình Tân, TP.HCM</p>
                <p><strong>Điện thoại:</strong> 094 625 20 20</p>
                <p><strong>Email:</strong> lifecookvietnam@gmail.com</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-primary-800 mb-2">Giờ làm việc</h3>
                <p><strong>Thứ 2 - Thứ 6:</strong> 8:00 - 18:00</p>
                <p><strong>Thứ 7:</strong> 8:00 - 17:00</p>
                <p><strong>Chủ nhật:</strong> Nghỉ</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default TermsPage
