'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { FiCoffee, FiHeart, FiUsers, FiAward, FiTarget, FiEye } from 'react-icons/fi'

const AboutPage = () => {
  const values = [
    {
      icon: <FiCoffee className="text-4xl text-primary-600" />,
      title: 'Chất lượng cao',
      description: 'Chúng tôi cam kết sử dụng những nguyên liệu tốt nhất và công thức pha chế chuẩn quốc tế.'
    },
    {
      icon: <FiHeart className="text-4xl text-primary-600" />,
      title: 'Tình yêu nghề',
      description: 'Mỗi ly đồ uống đều được pha chế với tình yêu và sự tận tâm của đội ngũ barista chuyên nghiệp.'
    },
    {
      icon: <FiUsers className="text-4xl text-primary-600" />,
      title: 'Phục vụ tận tâm',
      description: 'Đội ngũ nhân viên thân thiện, chuyên nghiệp luôn sẵn sàng phục vụ khách hàng với nụ cười.'
    },
    {
      icon: <FiAward className="text-4xl text-primary-600" />,
      title: 'Uy tín thương hiệu',
      description: 'Xây dựng thương hiệu dựa trên sự tin tưởng và hài lòng của khách hàng qua nhiều năm.'
    }
  ]

  const milestones = [
    { year: '2020', title: 'Thành lập', description: 'MBread Coffee & Tea được thành lập với tầm nhìn mang đến trải nghiệm cà phê tuyệt vời' },
    { year: '2021', title: 'Mở rộng', description: 'Mở thêm 3 chi nhánh tại TP.HCM và nhận được sự yêu mến của đông đảo khách hàng' },
    { year: '2022', title: 'Phát triển', description: 'Ra mắt dòng sản phẩm trà cao cấp và bánh ngọt thủ công' },
    { year: '2023', title: 'Công nhận', description: 'Nhận giải thưởng "Café tốt nhất TP.HCM" và mở chương trình nhượng quyền' },
    { year: '2024', title: 'Tương lai', description: 'Kế hoạch mở rộng ra các tỉnh thành khác và phát triển thương hiệu quốc gia' }
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
              Về chúng tôi
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Câu chuyện về hành trình xây dựng thương hiệu cà phê và trà cao cấp
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-800 mb-6">
                Câu chuyện của chúng tôi
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  MBread Coffee & Tea được thành lập vào năm 2020 với tình yêu dành cho cà phê và trà. 
                  Từ một quán cà phê nhỏ tại trung tâm TP.HCM, chúng tôi đã phát triển thành một 
                  thương hiệu được yêu mến với nhiều chi nhánh.
                </p>
                <p>
                  Sứ mệnh của chúng tôi là mang đến những trải nghiệm cà phê và trà tuyệt vời, 
                  kết hợp giữa hương vị truyền thống và phong cách hiện đại. Mỗi ly đồ uống 
                  đều được pha chế với sự tận tâm và chuyên nghiệp.
                </p>
                <p>
                  Chúng tôi tin rằng cà phê không chỉ là một thức uống mà còn là một nghệ thuật, 
                  một cách kết nối mọi người và tạo nên những khoảnh khắc đáng nhớ.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative h-96 rounded-xl overflow-hidden"
            >
              <Image
                src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800"
                alt="Café interior"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-cream-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <FiTarget className="text-5xl text-primary-600 mx-auto mb-6" />
                <h3 className="text-2xl font-serif font-bold text-primary-800 mb-4">
                  Sứ mệnh
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Mang đến những trải nghiệm cà phê và trà tuyệt vời, tạo nên không gian 
                  ấm cúng và thân thiện nơi mọi người có thể kết nối, thư giãn và tận hưởng 
                  những khoảnh khắc đáng nhớ.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <FiEye className="text-5xl text-primary-600 mx-auto mb-6" />
                <h3 className="text-2xl font-serif font-bold text-primary-800 mb-4">
                  Tầm nhìn
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Trở thành thương hiệu cà phê và trà hàng đầu Việt Nam, được công nhận 
                  về chất lượng sản phẩm và dịch vụ xuất sắc, góp phần nâng cao văn hóa 
                  thưởng thức cà phê của người Việt.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-800 mb-4">
              Giá trị cốt lõi
            </h2>
            <p className="text-lg text-gray-600">
              Những giá trị định hướng mọi hoạt động của chúng tôi
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card p-6 text-center hover:scale-105 transition-transform duration-300"
              >
                <div className="flex justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-serif font-semibold text-primary-800 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-primary-600 text-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Hành trình phát triển
            </h2>
            <p className="text-xl opacity-90">
              Những cột mốc quan trọng trong quá trình xây dựng thương hiệu
            </p>
          </motion.div>

          <div className="relative">
            {/* Desktop Timeline */}
            <div className="hidden lg:block">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-white bg-opacity-20"></div>
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                  >
                    <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                      <div className="bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-xl">
                        <h3 className="text-xl font-serif font-bold mb-2">{milestone.title}</h3>
                        <p className="opacity-90">{milestone.description}</p>
                      </div>
                    </div>
                    <div className="relative z-10 w-16 h-16 bg-secondary-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {milestone.year}
                    </div>
                    <div className="w-1/2"></div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Mobile Timeline */}
            <div className="lg:hidden">
              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-start space-x-4"
                  >
                    {/* Year Circle */}
                    <div className="flex-shrink-0 w-12 h-12 bg-secondary-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {milestone.year}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <div className="bg-white bg-opacity-10 backdrop-blur-sm p-4 rounded-xl">
                        <h3 className="text-lg font-serif font-bold mb-2">{milestone.title}</h3>
                        <p className="opacity-90 text-sm leading-relaxed">{milestone.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-cream-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-800 mb-4">
              Đội ngũ của chúng tôi
            </h2>
            <p className="text-lg text-gray-600">
              Những con người tài năng và tận tâm đằng sau MBread Coffee & Tea
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Nguyễn Minh Tuấn',
                position: 'Giám đốc điều hành',
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
                description: 'Với hơn 10 năm kinh nghiệm trong ngành F&B, anh Tuấn là người dẫn dắt tầm nhìn và chiến lược phát triển của MBread Coffee & Tea.'
              },
              {
                name: 'Trần Thị Lan',
                position: 'Head Barista',
                image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400',
                description: 'Chị Lan là chuyên gia pha chế với chứng chỉ quốc tế, đảm bảo chất lượng đồ uống luôn đạt tiêu chuẩn cao nhất.'
              },
              {
                name: 'Lê Văn Hùng',
                position: 'Quản lý chất lượng',
                image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
                description: 'Anh Hùng chịu trách nhiệm kiểm soát chất lượng nguyên liệu và quy trình pha chế tại tất cả các chi nhánh.'
              }
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card p-6 text-center"
              >
                <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-serif font-semibold text-primary-800 mb-2">
                  {member.name}
                </h3>
                <p className="text-primary-600 font-medium mb-4">{member.position}</p>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {member.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage
