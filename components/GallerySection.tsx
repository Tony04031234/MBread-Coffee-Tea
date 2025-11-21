'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { FiArrowRight, FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi'

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [selectedIndex, setSelectedIndex] = useState(0)

  // Selected high-quality images from the gallery for homepage showcase
  const featuredImages = [
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800',
      alt: 'Không gian café ấm cúng',
      category: 'interior'
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800',
      alt: 'Cà phê espresso thơm ngon',
      category: 'coffee'
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800',
      alt: 'Bánh ngọt tươi ngon',
      category: 'pastry'
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800',
      alt: 'Cà phê đen đậm đà',
      category: 'coffee'
    },
    {
      id: 5,
      src: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800',
      alt: 'Trà xanh thơm ngát',
      category: 'tea'
    },
    {
      id: 6,
      src: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=800',
      alt: 'Cappuccino nghệ thuật',
      category: 'coffee'
    }
  ]

  const openLightbox = (src: string, index: number) => {
    setSelectedImage(src)
    setSelectedIndex(index)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const nextImage = () => {
    const nextIndex = (selectedIndex + 1) % featuredImages.length
    setSelectedIndex(nextIndex)
    setSelectedImage(featuredImages[nextIndex].src)
  }

  const prevImage = () => {
    const prevIndex = (selectedIndex - 1 + featuredImages.length) % featuredImages.length
    setSelectedIndex(prevIndex)
    setSelectedImage(featuredImages[prevIndex].src)
  }

  return (
    <section className="section-padding bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-800 mb-4">
            Khám phá không gian tại MBread Coffee & Tea
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Những khoảnh khắc đẹp và không gian ấm cúng tại MBread Coffee & Tea
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featuredImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group cursor-pointer"
              onClick={() => openLightbox(image.src, index)}
            >
              <div className="relative h-64 rounded-xl overflow-hidden shadow-lg">
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
              <div className="mt-3 text-center">
                <h3 className="font-medium text-gray-800">{image.alt}</h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <Link href="/gallery" className="btn-primary flex items-center justify-center space-x-2 mx-auto w-fit">
            <span>Xem thêm ảnh</span>
            <FiArrowRight />
          </Link>
        </motion.div>
      </div>

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
                alt={featuredImages[selectedIndex]?.alt || 'Gallery image'}
                width={800}
                height={600}
                className="rounded-lg object-contain max-h-[80vh]"
              />
              
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-center">
                <p className="text-lg font-medium">{featuredImages[selectedIndex]?.alt}</p>
                <p className="text-sm opacity-75">
                  {selectedIndex + 1} / {featuredImages.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default GallerySection
