'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { FiArrowRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi'

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      id: 1,
      image: '/images/hero1.jpg',
      title: '',
      subtitle: '',
      cta: '',
      link: ''
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=1200',
      title: 'Bánh ngọt tươi ngon mỗi ngày',
      subtitle: 'Những chiếc bánh được làm thủ công với nguyên liệu tươi ngon nhất',
      cta: 'Xem bánh ngọt',
      link: '/menu?category=pastry'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200',
      title: 'Trà cao cấp từ khắp nơi trên thế giới',
      subtitle: 'Thưởng thức những loại trà đặc sản với hương vị độc đáo và tinh tế',
      cta: 'Khám phá trà',
      link: '/menu?category=tea'
    },

  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(timer)
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

  return (
    <section className="relative h-[90vh] overflow-hidden">
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
          {slides[currentSlide].link && (
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          )}
           <div className="absolute inset-0 bg-black bg-opacity-5"></div>

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
              <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
                {slides[currentSlide].subtitle}
              </p>
              
              {slides[currentSlide].link && (
                <Link
                href={slides[currentSlide].link}
                className="btn-primary text-lg px-8 py-4 inline-flex items-center space-x-2 hover:scale-105 transition-transform duration-200"
              >
                  <span>{slides[currentSlide].cta}</span>
                  <FiArrowRight />
                </Link>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Arrows */}
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

      {/* Dots Indicator */}
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
    </section>
  )
}

export default HeroCarousel
