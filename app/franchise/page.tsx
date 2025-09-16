'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FiCheck, FiTrendingUp, FiUsers, FiAward, FiDollarSign, FiMapPin, FiClock, FiPhone, FiMail, FiSend } from 'react-icons/fi'

const FranchisePage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    investment: '',
    experience: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Mock form submission
    setTimeout(() => {
      alert('Cảm ơn bạn đã quan tâm đến cơ hội nhượng quyền! Chúng tôi sẽ liên hệ với bạn trong vòng 24 giờ.')
      setFormData({ name: '', email: '', phone: '', city: '', investment: '', experience: '', message: '' })
      setIsSubmitting(false)
    }, 1000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const benefits = [
    {
      icon: <FiTrendingUp className="text-4xl text-primary-600" />,
      title: 'Thương hiệu mạnh',
      description: 'Sử dụng thương hiệu đã được công nhận và yêu mến bởi khách hàng'
    },
    {
      icon: <FiUsers className="text-4xl text-primary-600" />,
      title: 'Hỗ trợ toàn diện',
      description: 'Đào tạo nhân viên, hỗ trợ marketing và quản lý vận hành'
    },
    {
      icon: <FiAward className="text-4xl text-primary-600" />,
      title: 'Chất lượng đảm bảo',
      description: 'Nguyên liệu và công thức chuẩn, đảm bảo chất lượng đồng nhất'
    },
    {
      icon: <FiDollarSign className="text-4xl text-primary-600" />,
      title: 'Lợi nhuận hấp dẫn',
      description: 'Mô hình kinh doanh đã được chứng minh với tỷ suất lợi nhuận cao'
    }
  ]

  const requirements = [
    'Vốn đầu tư tối thiểu: 500 triệu VNĐ',
    'Diện tích mặt bằng: 50-100m²',
    'Vị trí tốt, đông dân cư',
    'Kinh nghiệm kinh doanh F&B (ưu tiên)',
    'Cam kết tuân thủ tiêu chuẩn thương hiệu',
    'Tinh thần hợp tác và phát triển lâu dài'
  ]

  const processSteps = [
    {
      step: '01',
      title: 'Liên hệ tư vấn',
      description: 'Gửi thông tin và nhận tư vấn miễn phí về cơ hội nhượng quyền'
    },
    {
      step: '02',
      title: 'Đánh giá hồ sơ',
      description: 'Chúng tôi sẽ đánh giá hồ sơ và khả năng tài chính của bạn'
    },
    {
      step: '03',
      title: 'Thương lượng hợp đồng',
      description: 'Thảo luận các điều khoản và ký kết hợp đồng nhượng quyền'
    },
    {
      step: '04',
      title: 'Đào tạo và setup',
      description: 'Đào tạo nhân viên, setup cửa hàng và chuẩn bị khai trương'
    },
    {
      step: '05',
      title: 'Khai trương và hỗ trợ',
      description: 'Hỗ trợ khai trương và vận hành trong suốt quá trình hợp tác'
    }
  ]

  const stats = [
    { number: '15+', label: 'Chi nhánh đã mở' },
    { number: '95%', label: 'Tỷ lệ thành công' },
    { number: '18', label: 'Tháng hoàn vốn' },
    { number: '24/7', label: 'Hỗ trợ khách hàng' }
  ]

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-primary-800 text-white py-20">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              Cơ hội nhượng quyền
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Tham gia cùng MBread Coffee & Tea để xây dựng thành công trong ngành F&B
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-cream-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-800 mb-4">
              Tại sao chọn MBread Coffee & Tea?
            </h2>
            <p className="text-lg text-gray-600">
              Những lợi ích khi trở thành đối tác nhượng quyền của chúng tôi
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card p-6 text-center hover:scale-105 transition-transform duration-300"
              >
                <div className="flex justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-serif font-semibold text-primary-800 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-800 mb-6">
                Yêu cầu đối tác
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Để trở thành đối tác nhượng quyền của MBread Coffee & Tea, bạn cần đáp ứng các yêu cầu sau:
              </p>
              <ul className="space-y-4">
                {requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <FiCheck className="text-primary-600 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{requirement}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative h-96 rounded-xl overflow-hidden"
            >
              <Image
                src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800"
                alt="Franchise opportunity"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding bg-primary-600 text-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Quy trình nhượng quyền
            </h2>
            <p className="text-xl opacity-90">
              Hành trình trở thành đối tác nhượng quyền của MBread Coffee & Tea
            </p>
          </motion.div>

          {/* Desktop Process */}
          <div className="hidden lg:block">
            <div className="space-y-8">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-xl">
                      <h3 className="text-xl font-serif font-bold mb-2">{step.title}</h3>
                      <p className="opacity-90">{step.description}</p>
                    </div>
                  </div>
                  <div className="relative z-10 w-16 h-16 bg-secondary-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {step.step}
                  </div>
                  <div className="w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile Process */}
          <div className="lg:hidden">
            <div className="space-y-8">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-start space-x-4"
                >
                  {/* Step Circle */}
                  <div className="flex-shrink-0 w-12 h-12 bg-secondary-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {step.step}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <div className="bg-white bg-opacity-10 backdrop-blur-sm p-4 rounded-xl">
                      <h3 className="text-lg font-serif font-bold mb-2">{step.title}</h3>
                      <p className="opacity-90 text-sm leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Investment Info */}
      <section className="section-padding bg-cream-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-800 mb-6">
                Thông tin đầu tư
              </h2>
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <h3 className="text-xl font-serif font-semibold text-primary-800 mb-4">
                    Chi phí đầu tư ban đầu
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Phí nhượng quyền: 50 triệu VNĐ</li>
                    <li>• Thiết bị và trang thiết bị: 200 triệu VNĐ</li>
                    <li>• Cải tạo mặt bằng: 100 triệu VNĐ</li>
                    <li>• Vốn lưu động: 150 triệu VNĐ</li>
                    <li className="font-bold text-primary-600">Tổng cộng: 500 triệu VNĐ</li>
                  </ul>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <h3 className="text-xl font-serif font-semibold text-primary-800 mb-4">
                    Phí vận hành hàng tháng
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Phí quản lý: 3% doanh thu</li>
                    <li>• Phí marketing: 2% doanh thu</li>
                    <li>• Phí đào tạo: 500,000 VNĐ/tháng</li>
                    <li>• Phí hỗ trợ kỹ thuật: 1,000,000 VNĐ/tháng</li>
                  </ul>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white p-8 rounded-xl shadow-lg"
            >
              <h3 className="text-2xl font-serif font-bold text-primary-800 mb-6">
                Liên hệ tư vấn
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Họ và tên *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Nhập họ và tên"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Nhập email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Số điện thoại *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Nhập số điện thoại"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Thành phố/Tỉnh
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Nhập thành phố/tỉnh"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Khả năng đầu tư
                  </label>
                  <select
                    name="investment"
                    value={formData.investment}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Chọn mức đầu tư</option>
                    <option value="500-1000">500 triệu - 1 tỷ VNĐ</option>
                    <option value="1000-2000">1 tỷ - 2 tỷ VNĐ</option>
                    <option value="2000+">Trên 2 tỷ VNĐ</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kinh nghiệm F&B
                  </label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Chọn kinh nghiệm</option>
                    <option value="none">Chưa có kinh nghiệm</option>
                    <option value="1-3">1-3 năm</option>
                    <option value="3-5">3-5 năm</option>
                    <option value="5+">Trên 5 năm</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tin nhắn
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Chia sẻ thêm về bạn và kế hoạch kinh doanh"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary py-3 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="spinner w-5 h-5"></div>
                  ) : (
                    <>
                      <FiSend />
                      <span>Gửi yêu cầu tư vấn</span>
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="section-padding bg-primary-800 text-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Liên hệ trực tiếp
            </h2>
            <p className="text-xl opacity-90">
              Đội ngũ phát triển nhượng quyền của chúng tôi luôn sẵn sàng hỗ trợ bạn
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <FiPhone className="text-3xl text-secondary-400 mx-auto mb-4" />
              <h3 className="text-xl font-serif font-semibold mb-2">Điện thoại</h3>
              <p className="opacity-90">094 625 20 20</p>
            </div>
            <div className="text-center">
              <FiMail className="text-3xl text-secondary-400 mx-auto mb-4" />
              <h3 className="text-xl font-serif font-semibold mb-2">Email</h3>
              <p className="opacity-90">pkdmaikhoi@gmail.com</p>
            </div>
            <div className="text-center">
              <FiMapPin className="text-3xl text-secondary-400 mx-auto mb-4" />
              <h3 className="text-xl font-serif font-semibold mb-2">Địa chỉ</h3>
              <p className="opacity-90">7 Đường Số 7, An Lạc A, Bình Tân, TP.HCM</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default FranchisePage
