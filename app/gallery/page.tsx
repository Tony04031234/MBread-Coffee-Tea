'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi'

const GalleryPage = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [selectedIndex, setSelectedIndex] = useState(0)

  const galleryImages = [
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800',
      alt: 'Không gian café',
      category: 'interior'
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800',
      alt: 'Cà phê espresso',
      category: 'coffee'
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800',
      alt: 'Bánh ngọt',
      category: 'pastry'
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800',
      alt: 'Cà phê đen',
      category: 'coffee'
    },
    {
      id: 5,
      src: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800',
      alt: 'Trà xanh',
      category: 'tea'
    },
    {
      id: 6,
      src: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=800',
      alt: 'Cappuccino',
      category: 'coffee'
    },
    {
      id: 7,
      src: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=800',
      alt: 'Muffin chocolate',
      category: 'pastry'
    },
    {
      id: 8,
      src: 'https://images.unsplash.com/photo-1525385133512-2f3bdd039054?w=800',
      alt: 'Trà sữa',
      category: 'tea'
    },
    {
      id: 9,
      src: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800',
      alt: 'Không gian làm việc',
      category: 'interior'
    },
    {
      id: 10,
      src: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800',
      alt: 'Tiramisu',
      category: 'pastry'
    },
    {
      id: 11,
      src: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800',
      alt: 'Mocha',
      category: 'coffee'
    },
    {
      id: 12,
      src: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800',
      alt: 'Macaron',
      category: 'pastry'
    }
  ]

  const categories = [
    { id: 'all', name: 'Tất cả' },
    { id: 'interior', name: 'Không gian' },
    { id: 'coffee', name: 'Cà phê' },
    { id: 'tea', name: 'Trà' },
    { id: 'pastry', name: 'Bánh ngọt' }
  ]

  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredImages = selectedCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory)

  const openLightbox = (src: string, index: number) => {
    setSelectedImage(src)
    setSelectedIndex(index)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const nextImage = () => {
    const nextIndex = (selectedIndex + 1) % filteredImages.length
    setSelectedIndex(nextIndex)
    setSelectedImage(filteredImages[nextIndex].src)
  }

  const prevImage = () => {
    const prevIndex = (selectedIndex - 1 + filteredImages.length) % filteredImages.length
    setSelectedIndex(prevIndex)
    setSelectedImage(filteredImages[prevIndex].src)
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className=" text-primary-800 pt-20 ">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              Thư viện ảnh
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Khám phá không gian và sản phẩm của MBread Coffee & Tea qua những hình ảnh đẹp
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter */}
      <section className="py-8 bg-white shadow-sm">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-colors duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section-padding">
        <div className="max-w-6xl mx-auto">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence>
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className="relative group cursor-pointer"
                  onClick={() => openLightbox(image.src, index)}
                >
                  <div className="relative h-64 rounded-xl overflow-hidden">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-3">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-4xl max-h-full p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeLightbox}
                className="absolute -top-4 -right-4 z-10 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-full p-2 transition-all duration-200"
              >
                <FiX size={24} />
              </button>
              
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-full p-3 transition-all duration-200"
              >
                <FiChevronLeft size={24} />
              </button>
              
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-full p-3 transition-all duration-200"
              >
                <FiChevronRight size={24} />
              </button>

              <Image
                src={selectedImage}
                alt={filteredImages[selectedIndex]?.alt || 'Gallery image'}
                width={800}
                height={600}
                className="rounded-lg object-contain max-h-[80vh]"
              />
              
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-center">
                <p className="text-lg font-medium">{filteredImages[selectedIndex]?.alt}</p>
                <p className="text-sm opacity-75">
                  {selectedIndex + 1} / {filteredImages.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default GalleryPage
