'use client'

import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useBanner } from '@/contexts/BannerContext'

export default function StickyBanner() {
  const { isBannerVisible, setIsBannerVisible } = useBanner()
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Hide banner when scrolling down, show when scrolling up (only if not closed)
      if (isBannerVisible) {
        if (currentScrollY > lastScrollY && currentScrollY > 50) {
          setIsVisible(false)
        } else {
          setIsVisible(true)
        }
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY, isBannerVisible])

  const handleClose = () => {
    setIsBannerVisible(false)
  }

  if (!isBannerVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : -100 }}
        exit={{ y: -100 }}
        transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
        className="fixed top-0 left-0 right-0 z-[100] bg-white py-2 border-b border-gray-200"
      >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between text-gray-800">
          {/* Left side - Empty spacer for balance (Desktop only) */}
          <div className="hidden lg:flex flex-1"></div>

          {/* Center - Tagline */}
          <div className="flex items-center gap-2 justify-center flex-1">
            <span className="font-medium text-gray-800 text-[11px] md:text-[13px] tracking-tight">
              Your Pro Video, Photo, Stage, Theater, & Studio Gear Shop
            </span>
            <span className="text-gray-500 text-[11px] md:text-[13px]">- since 1987</span>
          </div>

          {/* Close Button - Mobile */}
          <button
            onClick={handleClose}
            className="lg:hidden p-1 hover:bg-gray-100 rounded-full transition-all"
            aria-label="Close banner"
          >
            <X className="w-4 h-4 text-gray-600" strokeWidth={2} />
          </button>

          {/* Right side - Contact Info (Desktop only) */}
          <div className="hidden lg:flex items-center gap-4 flex-1 justify-end">
            {/* Phone */}
            <a
              href="tel:+639175061168"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity group"
            >
              <lord-icon
                src="https://cdn.lordicon.com/wtywrnoz.json"
                trigger="hover"
                colors="primary:#0a2540,secondary:#0ea5e9"
                style={{ width: '18px', height: '18px' }}
              ></lord-icon>
              <span className="font-semibold text-[#0a2540] text-[13px] tracking-tight">+63917 506 1168</span>
            </a>

            {/* Email */}
            <a
              href="mailto:marketing@mqgroup.com.ph"
              className="hidden md:flex items-center gap-2 hover:opacity-80 transition-opacity group"
            >
              <lord-icon
                src="https://cdn.lordicon.com/dhzbkemf.json"
                trigger="hover"
                stroke="bold"
                colors="primary:#0a2540,secondary:#0ea5e9"
                style={{ width: '18px', height: '18px' }}
              ></lord-icon>
              <span className="font-semibold text-[#0a2540] text-[13px] tracking-tight">marketing@mqgroup.com.ph</span>
            </a>

            {/* Social Media Icons */}
            <div className="flex items-center gap-2 ml-2 border-l border-gray-300 pl-4">
              <a
                href="https://www.facebook.com/mqgroup1987"
                target="_blank"
                rel="noopener noreferrer"
                className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-all hover:scale-110"
                aria-label="Facebook"
              >
                <lord-icon
                  src="https://cdn.lordicon.com/bfoumeno.json"
                  trigger="hover"
                  stroke="bold"
                  colors="primary:#1f2937,secondary:#0ea5e9"
                  style={{ width: '16px', height: '16px' }}
                ></lord-icon>
              </a>
              <a
                href="https://www.instagram.com/mqgroup1987"
                target="_blank"
                rel="noopener noreferrer"
                className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-all hover:scale-110"
                aria-label="Instagram"
              >
                <lord-icon
                  src="https://cdn.lordicon.com/tgyvxauj.json"
                  trigger="hover"
                  stroke="bold"
                  colors="primary:#1f2937,secondary:#0ea5e9"
                  style={{ width: '16px', height: '16px' }}
                ></lord-icon>
              </a>
            </div>

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="ml-3 p-1.5 hover:bg-gray-100 rounded-full transition-all hover:scale-110 group"
              aria-label="Close banner"
            >
              <X className="w-4 h-4 text-gray-600 group-hover:text-gray-900 transition-colors" strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
    </AnimatePresence>
  )
}
