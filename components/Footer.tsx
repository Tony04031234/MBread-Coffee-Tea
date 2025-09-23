import Link from 'next/link'
import { FiCoffee, FiMapPin, FiPhone, FiMail, FiClock, FiFacebook, FiInstagram, FiGlobe, FiYoutube } from 'react-icons/fi'
import Image from 'next/image'
import { brandInfo } from '@/data/stores'

const Footer = () => {
  return (
    <footer className="bg-primary-800 text-white">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Image src="/mbread-logo.png" alt="MBread Coffee & Tea" width={100} height={100} className="w-10 h-10 rounded-full shrink-0" />
              <span className="text-xl font-serif font-bold">MBread Coffee & Tea</span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Khám phá hương vị cà phê và trà tuyệt vời trong không gian ấm cúng và thân thiện.
            </p>
            <div className="flex space-x-4">
              <a
                href={brandInfo.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-blue-400 transition-colors duration-200"
                title="Facebook"
              >
                <FiFacebook size={24} />
              </a>
              <a
                href={brandInfo.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-pink-400 transition-colors duration-200"
                title="Instagram"
              >
                <FiInstagram size={24} />
              </a>
              <a
                href={brandInfo.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-red-400 transition-colors duration-200"
                title="YouTube"
              >
                <FiYoutube size={24} />
              </a>
              <a
                href={brandInfo.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors duration-200"
                title="TikTok"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-serif font-semibold">Liên kết nhanh</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/menu" className="text-gray-300 hover:text-secondary-400 transition-colors duration-200">
                  Thực đơn
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-secondary-400 transition-colors duration-200">
                  Về chúng tôi
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-gray-300 hover:text-secondary-400 transition-colors duration-200">
                  Thư viện ảnh
                </Link>
              </li>
              <li>
                <Link href="/franchise" className="text-gray-300 hover:text-secondary-400 transition-colors duration-200">
                  Nhượng quyền
                </Link>
              </li>
              <li>
                <Link href="/about-app" className="text-gray-300 hover:text-secondary-400 transition-colors duration-200">
                  Về ứng dụng
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-secondary-400 transition-colors duration-200">
                  Chính sách bảo mật
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-secondary-400 transition-colors duration-200">
                  Điều khoản dịch vụ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-serif font-semibold">Thông tin liên hệ</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <FiMapPin className="text-secondary-400 shrink-0" />
                <span className="text-gray-300">
                  7 Đường Số 7, An Lạc A, Bình Tân, TP.HCM
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <FiPhone className="text-secondary-400 shrink-0" />
                <span className="text-gray-300">094 625 20 20</span>
              </div>
              <div className="flex items-center space-x-3">
                <FiMail className="text-secondary-400 shrink-0" />
                <span className="text-gray-300">{brandInfo.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <FiGlobe className="text-secondary-400 shrink-0" />
                <a 
                  href={`https://${brandInfo.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-secondary-400 transition-colors duration-200"
                >
                  {brandInfo.website}
                </a>
              </div>
            </div>
          </div>

          {/* Opening Hours */}
          <div className="space-y-4">
            <h3 className="text-xl font-serif font-semibold">Giờ mở cửa</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <FiClock className="text-secondary-400 shrink-0" />
                <div className="text-gray-300">
                  <div>Thứ 2 - Thứ 6: 7:00 - 22:00</div>
                  <div>Thứ 7 - Chủ nhật: 8:00 - 23:00</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-700 mt-12 pt-8 text-center">
          <p className="text-gray-300">
            © 2025 MBread Coffee & Tea. Tất cả quyền được bảo lưu.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
