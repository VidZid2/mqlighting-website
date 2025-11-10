'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useBanner } from '@/contexts/BannerContext'

export default function Navigation() {
  const { isBannerVisible } = useBanner()
  const [isOpen, setIsOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [hoveredDropdown, setHoveredDropdown] = useState<string | null>(null)
  const [isDesktop, setIsDesktop] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Calculate animation progress (0 to 1) based on scroll - instant
  const scrollProgress = scrollY > 50 ? 1 : 0 // Instant state change
  const isScrolled = scrollY > 50

  const navLinks = [
    { href: '/products', label: 'Products', hasDropdown: true },
    { href: '/services', label: 'Services', hasDropdown: false },
    { href: '/about', label: 'About', hasDropdown: false },
    { href: '/brands', label: 'Our Brands', hasDropdown: true },
    { href: '/contact', label: 'Contact', hasDropdown: false },
  ]

  const productCategories = [
    { name: 'Lighting Equipment', href: '/products?category=lighting', iconSrc: 'https://cdn.lordicon.com/pshkgjmy.json' },
    { name: 'Camera & Lenses', href: '/products?category=camera', iconSrc: 'https://cdn.lordicon.com/wsaaegar.json' },
    { name: 'Audio Equipment', href: '/products?category=audio', iconSrc: 'https://cdn.lordicon.com/hmabmtlg.json' },
    { name: 'Grip & Support', href: '/products?category=grip', iconSrc: 'https://cdn.lordicon.com/ugllxeyl.json' },
    { name: 'Broadcast Equipment', href: '/products?category=broadcast', iconSrc: 'https://cdn.lordicon.com/mhridhuu.json' },
    { name: 'Studio Accessories', href: '/products?category=accessories', iconSrc: 'https://cdn.lordicon.com/fwkrbvja.json' },
  ]

  const brandCategories = [
    { name: 'ARRI', href: '/brands?brand=arri', logo: '/arri-logo.png', desc: 'Cinema cameras' },
    { name: 'Sony', href: '/brands?brand=sony', logo: '/sony-logo-scaled.png', desc: 'Broadcast equipment' },
    { name: 'Kino Flo', href: '/brands?brand=kinoflo', logo: '/kino-flo-logo.png', desc: 'LED lighting' },
    { name: 'ETC', href: '/brands?brand=etc', logo: '/ETC-Logo.jpg', desc: 'Theatre lighting' },
    { name: 'Canon', href: '/brands?brand=canon', logo: '/canon-logo.png', desc: 'Cameras & lenses' },
  ]

  return (
    <>
      {/* Main Navigation */}
      <motion.nav
        initial={false}
        animate={isDesktop ? {
          width: `${100 - (scrollProgress * 30)}%`, // 100% to 70% on desktop
          left: `${scrollProgress * 15}%`, // 0% to 15% on desktop
          top: isBannerVisible 
            ? `${38 + (scrollProgress * 6)}px` // 38px (banner height) to 44px when banner visible
            : `${scrollProgress * 20}px`, // 0px to 20px when banner closed
          borderRadius: `${scrollProgress * 50}px`, // 0px to 50px (more circular)
        } : {
          width: isScrolled ? 'calc(100% - 24px)' : '100%', // Float effect on mobile when scrolled
          left: isScrolled ? 12 : 0, // 12px margin on mobile when scrolled
          top: isScrolled 
            ? (isBannerVisible ? 38 : 8) // Flush with banner on mobile even when scrolled
            : (isBannerVisible ? 38 : 0), // Flush with banner when not scrolled
          borderRadius: isScrolled ? 28 : 0, // More rounded on mobile when scrolled (increased)
        }}
        transition={{ 
          type: 'spring',
          stiffness: 300,
          damping: 30,
          mass: 0.5,
        }}
        className={`fixed z-50 transition-colors duration-300 ${
          isScrolled 
            ? 'bg-white shadow-lg' 
            : 'bg-[#0a2540]'
        }`}
      >
        <motion.div 
          className="container mx-auto px-4"
          initial={false}
          animate={{
            height: `${80 - (scrollProgress * 20)}px`, // 80px to 60px
            padding: `0 ${16 + (scrollProgress * 4)}px`, // 16px to 20px
          }}
          transition={{ 
            type: 'spring',
            stiffness: 300,
            damping: 30,
            mass: 0.5,
          }}
        >
          <div className="flex items-center h-full relative">
            {/* Logo */}
            <Link href="/" className="flex items-center mr-auto">
              <motion.div
                initial={false}
                animate={{
                  height: `${60 - (scrollProgress * 15)}px`, // 60px to 45px
                }}
                transition={{ 
                  type: 'spring',
                  stiffness: 300,
                  damping: 30,
                  mass: 0.5,
                }}
                className="relative transition-all duration-150"
                style={{
                  filter: isScrolled ? 'none' : 'brightness(0) invert(1)',
                }}
              >
                <Image
                  src="/MQ-logo-colored.png"
                  alt="MQ Group Logo"
                  width={200}
                  height={60}
                  className="h-full w-auto object-contain"
                  priority
                />
              </motion.div>
            </Link>

            {/* Desktop Navigation - Centered */}
            <motion.div 
              className="hidden lg:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2"
              initial={false}
              animate={{
                gap: `${32 - (scrollProgress * 8)}px`, // 32px to 24px
              }}
              transition={{ 
                type: 'spring',
                stiffness: 100,
                damping: 20,
                mass: 0.5,
              }}
            >
              {navLinks.map((link) => (
                <motion.div
                  key={link.href}
                  initial={false}
                  animate={{
                    fontSize: `${1 - (scrollProgress * 0.15)}rem`, // 1rem to 0.85rem
                  }}
                  transition={{ 
                    type: 'spring',
                    stiffness: 100,
                    damping: 20,
                    mass: 0.5,
                  }}
                  className="relative"
                  onMouseEnter={() => link.hasDropdown && setHoveredDropdown(link.label)}
                  onMouseLeave={() => setHoveredDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className={`font-medium transition-colors uppercase text-sm tracking-wide flex items-center gap-1 ${
                      isScrolled 
                        ? 'text-gray-700 hover:text-primary-600' 
                        : 'text-white/90 hover:text-white'
                    }`}
                  >
                    {link.label}
                    {link.hasDropdown && (
                      <motion.svg 
                        className="w-3 h-3" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                        animate={{ 
                          rotate: hoveredDropdown === link.label ? 180 : 0 
                        }}
                        transition={{ 
                          duration: 0.3,
                          ease: [0.4, 0, 0.2, 1]
                        }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </motion.svg>
                    )}
                  </Link>
                  
                  {/* Dropdown for Products */}
                  {link.label === 'Products' && (
                    <AnimatePresence>
                      {hoveredDropdown === 'Products' && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ 
                            duration: 0.2,
                            ease: [0.4, 0, 0.2, 1]
                          }}
                          className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50"
                          onMouseEnter={() => setHoveredDropdown('Products')}
                          onMouseLeave={() => setHoveredDropdown(null)}
                        >
                        <div className="w-96 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
                          <div className="p-0">
                            <div className="space-y-0">
                              {productCategories.map((category) => (
                                <Link
                                  key={category.href}
                                  href={category.href}
                                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-all duration-200 group border-b border-gray-100 last:border-b-0"
                                >
                                  <div className="flex-shrink-0 w-12 h-12 bg-white rounded-lg flex items-center justify-center border border-gray-200 group-hover:shadow-md group-hover:border-gray-300 transition-all duration-200">
                                    <lord-icon
                                      src={category.iconSrc}
                                      trigger="hover"
                                      stroke="bold"
                                      colors="primary:#64748b,secondary:#0ea5e9"
                                      style={{ width: '32px', height: '32px' }}
                                    ></lord-icon>
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="text-gray-900 font-semibold text-sm mb-0.5 group-hover:text-primary-600 transition-colors">
                                      {category.name}
                                    </div>
                                    <div className="text-xs text-gray-500 line-clamp-1">
                                      Professional equipment and solutions
                                    </div>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}

                  {/* Dropdown for Our Brands */}
                  {link.label === 'Our Brands' && (
                    <AnimatePresence>
                      {hoveredDropdown === 'Our Brands' && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ 
                            duration: 0.2,
                            ease: [0.4, 0, 0.2, 1]
                          }}
                          className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50"
                          onMouseEnter={() => setHoveredDropdown('Our Brands')}
                          onMouseLeave={() => setHoveredDropdown(null)}
                        >
                        <div className="w-80 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
                          <div className="p-0">
                            {brandCategories.map((brand) => (
                              <Link
                                key={brand.href}
                                href={brand.href}
                                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-all duration-200 group border-b border-gray-100 last:border-b-0"
                              >
                                <div className="flex-shrink-0 w-14 h-14 bg-white rounded-lg flex items-center justify-center border border-gray-200 group-hover:shadow-md group-hover:border-gray-300 transition-all duration-200 p-2">
                                  <Image
                                    src={brand.logo}
                                    alt={brand.name}
                                    width={48}
                                    height={48}
                                    className="w-full h-full object-contain"
                                  />
                                </div>
                                <div className="flex-1">
                                  <div className="text-gray-900 font-semibold text-sm mb-0.5 group-hover:text-primary-600 transition-colors">
                                    {brand.name}
                                  </div>
                                  <div className="text-xs text-gray-500">{brand.desc}</div>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </motion.div>
              ))}
            </motion.div>

            {/* Action Buttons - Far Right */}
            <div className="hidden lg:flex items-center gap-3 ml-auto">
              {/* Download Button */}
              <motion.div
                initial={false}
                animate={{
                  height: `${44 - (scrollProgress * 4)}px`,
                  fontSize: `${0.875 - (scrollProgress * 0.05)}rem`,
                  borderRadius: `${8 - (scrollProgress * 2)}px`,
                }}
                transition={{ 
                  type: 'spring',
                  stiffness: 100,
                  damping: 20,
                  mass: 0.5,
                }}
              >
                <Link
                  href="/contact"
                  className="bg-emerald-500 text-white hover:bg-emerald-600 transition-colors font-semibold flex items-center h-full px-6 rounded-lg uppercase tracking-wide"
                >
                  Get a Quote
                </Link>
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`lg:hidden transition-colors ${
                isScrolled 
                  ? 'text-gray-700 hover:text-primary-600' 
                  : 'text-white hover:text-primary-400'
              }`}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Mobile Navigation - Full Screen Overlay */}
          <AnimatePresence>
            {isOpen && (
              <>
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="lg:hidden fixed inset-0 bg-black/50 z-40"
                  onClick={() => setIsOpen(false)}
                />
                
                {/* Menu Panel */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -20 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
                  className="lg:hidden fixed top-4 left-4 right-4 z-50 bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <Link href="/" onClick={() => setIsOpen(false)}>
                      <Image
                        src="/MQ-logo-colored.png"
                        alt="MQ Group Logo"
                        width={150}
                        height={45}
                        className="h-12 w-auto object-contain"
                      />
                    </Link>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="text-gray-700 hover:text-gray-900 transition-colors"
                    >
                      <X size={28} />
                    </button>
                  </div>

                  {/* Menu Items */}
                  <div className="flex-1 overflow-y-auto py-4">
                    {navLinks.map((link, index) => (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                      >
                        <Link
                          href={link.href}
                          className="block py-4 px-6 text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors text-lg font-medium"
                          onClick={() => setIsOpen(false)}
                        >
                          {link.label}
                        </Link>
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: navLinks.length * 0.05, duration: 0.3 }}
                    className="p-4 border-t border-gray-100"
                  >
                    <Link
                      href="/contact"
                      className="block bg-emerald-500 text-white px-6 py-4 rounded-2xl hover:bg-emerald-600 transition-colors font-bold text-center uppercase tracking-wide text-lg shadow-lg"
                      onClick={() => setIsOpen(false)}
                    >
                      Get a Quote
                    </Link>
                  </motion.div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.nav>
    </>
  )
}
