'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface Slide {
  title: string
  description: string
  image: string
  category: string
}

const slides: Slide[] = [
  {
    title: 'Professional Lighting Solutions',
    description: 'Industry-leading equipment from ARRI, Kino Flo, and Dedolight for broadcast and film production',
    image: '/Picture Nanlite.jpg',
    category: 'Lighting'
  },
  {
    title: 'Broadcast Studio Equipment',
    description: 'Complete studio solutions with cutting-edge technology from world-class manufacturers',
    image: '/Picture Sony.webp',
    category: 'Broadcast'
  },
  {
    title: 'Stage & Theater Systems',
    description: 'Professional stage lighting and control systems from ETC and other premium brands',
    image: '/Picture ARRI.webp',
    category: 'Theater'
  },
  {
    title: 'Camera Support Systems',
    description: 'Precision camera support from Cartoni and Matthews Studio Equipment',
    image: '/Picture Cartoni.webp',
    category: 'Camera Support'
  }
]

export default function HeroSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 6000) // Change slide every 6 seconds

    return () => clearInterval(timer)
  }, [])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <div className="relative w-full h-full">
      {/* Slideshow Container */}
      <div className="relative h-[520px] rounded-3xl overflow-hidden bg-slate-900 shadow-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ 
              duration: 0.8,
              ease: [0.22, 0.61, 0.36, 1]
            }}
            className="absolute inset-0"
          >
            {/* Background Image with zoom effect */}
            <motion.div 
              className="absolute inset-0"
              initial={{ scale: 1 }}
              animate={{ scale: 1.05 }}
              transition={{ 
                duration: 6,
                ease: 'linear'
              }}
            >
              <Image
                src={slides[currentSlide].image}
                alt={slides[currentSlide].title}
                fill
                className="object-cover"
                priority
              />
              {/* Lighter overlay for better image visibility */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-950/50 via-slate-900/40 to-slate-950/55"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
            </motion.div>

            {/* Content */}
            <div className="relative h-full flex flex-col justify-end p-10 lg:p-12">
              {/* Category Badge */}
              <motion.div
                initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ 
                  delay: 0.2,
                  duration: 0.7,
                  ease: [0.22, 0.61, 0.36, 1]
                }}
                className="mb-4"
              >
                <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-xs font-bold uppercase tracking-[0.15em]">
                  {slides[currentSlide].category}
                </span>
              </motion.div>

              {/* Title */}
              <motion.h3
                initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ 
                  delay: 0.35,
                  duration: 0.8,
                  ease: [0.22, 0.61, 0.36, 1]
                }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight tracking-tight"
              >
                {slides[currentSlide].title}
              </motion.h3>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ 
                  delay: 0.5,
                  duration: 0.8,
                  ease: [0.22, 0.61, 0.36, 1]
                }}
                className="text-gray-200 text-base md:text-lg leading-relaxed max-w-2xl font-light"
              >
                {slides[currentSlide].description}
              </motion.p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Minimalist Navigation Dots */}
        <div className="absolute bottom-6 right-6 flex gap-2.5">
          {slides.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.95 }}
              className={`transition-all duration-500 rounded-full ${
                index === currentSlide
                  ? 'w-10 h-2.5 bg-white shadow-lg'
                  : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Sleek Progress Bar */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-white/10">
          <motion.div
            key={currentSlide}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 6, ease: 'linear' }}
            className="h-full bg-gradient-to-r from-primary-400 via-primary-300 to-primary-400 shadow-lg shadow-primary-400/50"
          />
        </div>
      </div>
    </div>
  )
}
