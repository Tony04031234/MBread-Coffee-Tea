'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { FiArrowRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { getCarouselSlides } from '@/lib/tina'

interface TinaCarouselSlide {
  id: string
  title: string
  subtitle?: string
  image: string
  buttonText?: string
  buttonLink?: string
  isActive?: boolean
}

const TinaHeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [slides, setSlides] = useState<TinaCarouselSlide[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const carouselSlides = await getCarouselSlides()
        const activeSlides = carouselSlides.filter(slide => slide.isActive)
        setSlides(activeSlides)
      } catch (error) {
        console.error('Error fetching carousel slides:', error)
        // Fallback to static slides if TinaCMS fails
        setSlides([
          {
            id: 'fallback-1',
            title: 'Khám phá hương vị cà phê tuyệt vời',
            subtitle: 'Tại MBread Coffee & Tea, mỗi ly cà phê đều được pha chế với tình yêu và sự tận tâm',
            image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200',
            buttonText: 'Thưởng thức cà phê',
            buttonLink: '/menu?category=coffee',
            isActive: true
          },
          {
            id: 'fallback-2',
            title: 'Trà cao cấp từ khắp nơi trên thế giới',
            subtitle: 'Thưởng thức những loại trà đặc sản với hương vị độc đáo và tinh tế',
            image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200',
            buttonText: 'Khám phá trà',
            buttonLink: '/menu?category=tea',
            isActive: true
          },
          {
            id: 'fallback-3',
            title: 'Bánh ngọt tươi ngon mỗi ngày',
            subtitle: 'Những chiếc bánh được làm thủ công với nguyên liệu tươi ngon nhất',
            image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=1200',
            buttonText: 'Xem bánh ngọt',
            buttonLink: '/menu?category=pastry',
            isActive: true
          }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchSlides()
  }, [])

  useEffect(() => {
    if (slides.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
      }, 5000)

      return () => clearInterval(timer)
    }
  }, [slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  if (loading) {
    return (
      <section className="relative md:h-[75vh] h-[90vh] overflow-hidden">
        <div className="absolute inset-0 bg-gray-300 animate-pulse"></div>
        <div className="relative z-10 h-full flex items-center px-4">
          <div className="container-custom">
            <div className="max-w-4xl text-white">
              <div className="h-16 bg-gray-400 rounded mb-6 animate-pulse"></div>
              <div className="h-6 bg-gray-400 rounded mb-8 animate-pulse"></div>
              <div className="h-12 bg-gray-400 rounded w-48 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (slides.length === 0) {
    return (
      <section className="relative md:h-[75vh] h-[90vh] overflow-hidden">
        <div className="absolute inset-0 bg-gray-200"></div>
        <div className="relative z-10 h-full flex items-center px-4">
          <div className="container-custom">
            <div className="max-w-4xl text-center">
              <h1 className="text-4xl md:text-7xl font-serif font-bold mb-6 text-gray-800">
                Chào mừng đến với MBread Coffee & Tea
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-600">
                Khám phá hương vị tuyệt vời của cà phê và trà
              </p>
              <Link
                href="/menu"
                className="btn-primary text-lg px-8 py-4 inline-flex items-center space-x-2 hover:scale-105 transition-transform duration-200"
              >
                <span>Xem thực đơn</span>
                <FiArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative md:h-[75vh] h-[90vh] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <Image
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center px-4">
        <div className="container-custom">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl text-white"
            >
              <h1 className="text-4xl md:text-7xl font-serif font-bold mb-6 leading-tight">
                {slides[currentSlide].title}
              </h1>
              {slides[currentSlide].subtitle && (
                <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
                  {slides[currentSlide].subtitle}
                </p>
              )}
              {slides[currentSlide].buttonText && slides[currentSlide].buttonLink && (
                <Link
                  href={slides[currentSlide].buttonLink}
                  className="btn-primary text-lg px-8 py-4 inline-flex items-center space-x-2 hover:scale-105 transition-transform duration-200"
                >
                  <span>{slides[currentSlide].buttonText}</span>
                  <FiArrowRight />
                </Link>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Arrows */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="md:visible hidden absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all duration-200"
          >
            <FiChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="md:visible hidden absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all duration-200"
          >
            <FiChevronRight size={24} />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {slides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentSlide
                  ? 'bg-white scale-125'
                  : 'bg-white bg-opacity-50 hover:bg-opacity-75'
              }`}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default TinaHeroCarousel
