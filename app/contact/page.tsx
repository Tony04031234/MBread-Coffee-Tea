'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMapPin, FiPhone, FiMail, FiClock, FiFacebook, FiInstagram, FiSend } from 'react-icons/fi'

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Mock form submission
    setTimeout(() => {
      alert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong vòng 24 giờ.')
      setFormData({ name: '', email: '', phone: '', message: '' })
      setIsSubmitting(false)
    }, 1000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const contactInfo = [
    {
      icon: <FiMapPin className="text-2xl text-primary-600" />,
      title: 'Địa chỉ',
      details: ['123 Đường Nguyễn Huệ', 'Quận 1, TP.HCM', 'Việt Nam']
    },
    {
      icon: <FiPhone className="text-2xl text-primary-600" />,
      title: 'Điện thoại',
      details: ['(028) 1234 5678', '(028) 1234 5679']
    },
    {
      icon: <FiMail className="text-2xl text-primary-600" />,
      title: 'Email',
      details: ['info@mbread-coffee-tea.com', 'support@mbread-coffee-tea.com']
    },
    {
      icon: <FiClock className="text-2xl text-primary-600" />,
      title: 'Giờ mở cửa',
      details: ['Thứ 2 - Thứ 6: 7:00 - 22:00', 'Thứ 7 - Chủ nhật: 8:00 - 23:00']
    }
  ]

  const socialLinks = [
    {
      name: 'Facebook',
      icon: <FiFacebook />,
      url: 'https://facebook.com',
      color: 'hover:text-blue-600'
    },
    {
      name: 'Instagram',
      icon: <FiInstagram />,
      url: 'https://instagram.com',
      color: 'hover:text-pink-600'
    }
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
              Liên hệ với chúng tôi
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="section-padding bg-cream-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card p-6 text-center"
              >
                <div className="flex justify-center mb-4">
                  {info.icon}
                </div>
                <h3 className="text-xl font-serif font-semibold text-primary-800 mb-3">
                  {info.title}
                </h3>
                <div className="space-y-1">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-gray-600">
                      {detail}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Map and Contact Form */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-3xl font-serif font-bold text-primary-800 mb-4">
                  Tìm chúng tôi
                </h2>
                <p className="text-gray-600 mb-6">
                  Ghé thăm MBread Coffee & Tea tại trung tâm TP.HCM để trải nghiệm 
                  không gian ấm cúng và đồ uống tuyệt vời.
                </p>
              </div>

              {/* Google Maps Integration */}
              <div className="bg-gray-200 rounded-xl h-96 overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.325123456789!2d106.629123456789!3d10.761234567890!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752e1234567890%3A0x1234567890abcdef!2s7%20%C4%90%C6%B0%E1%BB%9Dng%20S%E1%BB%91%207%2C%20An%20L%E1%BA%A1c%20A%2C%20B%C3%ACnh%20T%C3%A2n%2C%20Th%C3%A0nh%20ph%E1%BB%91%20H%E1%BB%93%20Ch%C3%AD%20Minh%2C%20Vi%E1%BB%87t%20Nam!5e0!3m2!1svi!2s!4v1234567890123!5m2!1svi!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="MBread Coffee & Tea Location"
                ></iframe>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="text-xl font-serif font-semibold text-primary-800 mb-4">
                  Theo dõi chúng tôi
                </h3>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-gray-600 ${social.color} transition-colors duration-200 p-3 bg-white rounded-lg shadow-md hover:shadow-lg`}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="card p-8"
            >
              <h2 className="text-3xl font-serif font-bold text-primary-800 mb-6">
                Gửi tin nhắn
              </h2>
              <p className="text-gray-600 mb-8">
                Có câu hỏi hoặc góp ý? Chúng tôi rất muốn nghe từ bạn!
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Họ và tên *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Nhập họ và tên"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Nhập email"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Nhập số điện thoại"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Tin nhắn *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Nhập tin nhắn của bạn"
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
                      <span>Gửi tin nhắn</span>
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-cream-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-800 mb-4">
              Câu hỏi thường gặp
            </h2>
            <p className="text-lg text-gray-600">
              Những câu hỏi phổ biến của khách hàng
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-6">
            {[
              {
                question: 'MBread Coffee & Tea có giao hàng không?',
                answer: 'Có, chúng tôi cung cấp dịch vụ giao hàng trong bán kính 5km từ cửa hàng. Phí giao hàng là 15,000đ.'
              },
              {
                question: 'Tôi có thể đặt hàng online không?',
                answer: 'Có, bạn có thể đặt hàng online thông qua website của chúng tôi hoặc gọi điện trực tiếp.'
              },
              {
                question: 'Có chỗ đậu xe không?',
                answer: 'Có, chúng tôi có bãi đậu xe miễn phí cho khách hàng tại cửa hàng.'
              },
              {
                question: 'Có WiFi miễn phí không?',
                answer: 'Có, chúng tôi cung cấp WiFi miễn phí cho tất cả khách hàng.'
              },
              {
                question: 'Có chương trình khuyến mãi nào không?',
                answer: 'Chúng tôi thường xuyên có các chương trình khuyến mãi đặc biệt. Theo dõi Facebook và Instagram để cập nhật.'
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card p-6"
              >
                <h3 className="text-lg font-serif font-semibold text-primary-800 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default ContactPage
