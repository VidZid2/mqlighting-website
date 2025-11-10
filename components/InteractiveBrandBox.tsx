'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink } from 'lucide-react'

const featuredBrands = [
  {
    name: 'ARRI',
    logo: '/arri-logo.png',
    image: '/Picture ARRI.webp',
    description: 'World leader in cinema camera systems and professional lighting solutions trusted by Hollywood',
    specialty: 'Cinema Cameras & Lighting',
    established: '1917',
    origin: 'Germany'
  },
  {
    name: 'Kino Flo',
    logo: '/kino-flo-logo.png',
    image: '/Picture Kino.png',
    description: 'Industry-defining fluorescent and LED lighting fixtures for film and television production',
    specialty: 'Professional Lighting',
    established: '1987',
    origin: 'USA'
  },
  {
    name: 'Dedolight',
    logo: '/Dedolight-logo-2.png',
    image: '/Picture Dedolight.webp',
    description: 'Precision-engineered lighting instruments delivering exceptional control and quality',
    specialty: 'Precision Lighting',
    established: '1984',
    origin: 'Germany'
  },
  {
    name: 'Nanlite',
    logo: '/nanlite-logo.png',
    image: '/Picture Nanlite.jpg',
    description: 'Next-generation LED lighting technology for modern content creators and filmmakers',
    specialty: 'LED Lighting Technology',
    established: '2018',
    origin: 'China'
  },
  {
    name: 'Cartoni',
    logo: '/cartoni-logo.png',
    image: '/Picture Cartoni.webp',
    description: 'Italian-crafted camera support systems delivering precision and reliability',
    specialty: 'Camera Support Systems',
    established: '1935',
    origin: 'Italy'
  },
  {
    name: 'Matthews',
    logo: '/matthews-grip-logo.png',
    image: '/Picture Matthews.webp',
    description: 'Industry-standard grip equipment and studio accessories since 1911',
    specialty: 'Grip & Studio Equipment',
    established: '1911',
    origin: 'USA'
  },
  {
    name: 'Canon',
    logo: '/canon-logo.png',
    image: '/Picture Cannon.webp',
    description: 'Leading innovator in cinema cameras and broadcast imaging technology',
    specialty: 'Cinema & Broadcast Cameras',
    established: '1937',
    origin: 'Japan'
  },
  {
    name: 'Sony',
    logo: '/sony-logo-scaled.png',
    image: '/Picture Sony.webp',
    description: 'Professional cameras and broadcast solutions powering global productions',
    specialty: 'Broadcast & Cinema Systems',
    established: '1946',
    origin: 'Japan'
  },
  {
    name: 'Blackmagic Design',
    logo: '/blackmagic-design-featured.png',
    image: '/Picture Blackmagic.webp',
    description: 'Revolutionary digital cinema cameras and post-production workflow solutions',
    specialty: 'Digital Cinema & Editing',
    established: '2001',
    origin: 'Australia'
  },
  {
    name: 'Zeiss',
    logo: '/Zeiss-logo.png',
    image: '/Picture zeiss.jpeg',
    description: 'Premium optics and cinema lenses for professional filmmaking',
    specialty: 'Cinema Lenses',
    established: '1846',
    origin: 'Germany'
  },
  {
    name: 'Cooke',
    logo: '/Cooke-logo-2.png',
    image: '/Picture Cooke.webp',
    description: 'Legendary cinema lenses trusted by top cinematographers',
    specialty: 'Premium Cinema Lenses',
    established: '1893',
    origin: 'UK'
  },
  {
    name: 'Aladdin',
    logo: '/aladdin-logo-1.png',
    image: '/Picture Aladdin.webp',
    description: 'High-performance LED lighting for film and broadcast',
    specialty: 'LED Lighting Systems',
    established: '2014',
    origin: 'Germany'
  },
  {
    name: 'K5600',
    logo: '/k5600-logo.png',
    image: '/Picture k5600.webp',
    description: 'Professional HMI and LED lighting systems',
    specialty: 'HMI & LED Lighting',
    established: '1989',
    origin: 'Denmark'
  },
  {
    name: 'Chimera',
    logo: '/chimera-logo.png',
    image: '/Picture chimera.jpg',
    description: 'Industry-leading light control and modifiers',
    specialty: 'Light Modifiers',
    established: '1980',
    origin: 'USA'
  },
  {
    name: 'Mole-Richardson',
    logo: '/mole-richardson-logo.png',
    image: '/Picture MoleRichardson.webp',
    description: 'Hollywood\'s premier lighting manufacturer since 1927',
    specialty: 'Studio Lighting',
    established: '1927',
    origin: 'USA'
  }
]

export default function InteractiveBrandBox() {
  const [currentBrand, setCurrentBrand] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isHovering || isPaused) return
    
    const timer = setInterval(() => {
      setCurrentBrand((prev) => (prev + 1) % featuredBrands.length)
    }, 10000) // Change brand every 10 seconds

    return () => clearInterval(timer)
  }, [isHovering, currentBrand, isPaused])

  const handleBrandClick = (index: number) => {
    setCurrentBrand(index)
    setIsPaused(true)

    // Resume after 7 seconds
    setTimeout(() => {
      setIsPaused(false)
    }, 7000)
  }

  return (
    <div className="relative w-full">
      {/* Subtle Background Glow Effects */}
      <div className="absolute -inset-4 opacity-30 blur-3xl pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-300 via-pink-200 to-transparent rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-blue-200 via-indigo-200 to-transparent rounded-full"></div>
        <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-gradient-to-br from-cyan-200 via-teal-100 to-transparent rounded-full"></div>
      </div>
      
      {/* Card Container */}
      <div className="relative rounded-3xl shadow-2xl overflow-hidden bg-white border border-gray-200">
        {/* Blue gradient on the right */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#003D7A]/10 via-[#003D7A]/5 to-transparent"></div>
        
        <div className="relative z-10 grid lg:grid-cols-2 gap-10 p-8 lg:p-12 items-start">
          {/* Left Side - Brand Grid */}
          <div>
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-white border border-[#003D7A] rounded-full text-[#003D7A] text-xs font-semibold uppercase tracking-wide">
                  Our Partners
                </span>
                <a href="/brands" className="px-3 py-1 bg-white border border-[#003D7A] rounded-full text-[#003D7A] text-xs font-semibold uppercase tracking-wide hover:bg-[#003D7A] hover:text-white transition-colors flex items-center gap-1">
                  View All <ExternalLink size={12} />
                </a>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">Featured Brands</h3>
              <p className="text-gray-600 text-base leading-relaxed mb-8">
                Explore our curated selection of world-renowned brands in professional broadcast and production equipment.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2.5 mb-5">
            {featuredBrands.map((brand, index) => (
              <motion.button
                key={brand.name}
                onClick={() => handleBrandClick(index)}
                onHoverStart={() => setIsHovering(true)}
                onHoverEnd={() => setIsHovering(false)}
                className="relative group cursor-pointer"
                animate={{
                  scale: currentBrand === index ? 1.08 : 1,
                  opacity: currentBrand === index ? 1 : 0.6,
                }}
                whileHover={{
                  scale: 1.05,
                  opacity: 1,
                }}
                transition={{ 
                  duration: 0.4,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
              >
                {/* Brand Card */}
                <div className={`relative border-2 rounded-lg p-3 transition-all duration-300 ${
                  currentBrand === index 
                    ? 'border-[#003D7A] bg-[#003D7A]/5 shadow-xl shadow-[#003D7A]/20' 
                    : 'border-gray-200 bg-white hover:border-[#003D7A]/50 hover:bg-[#003D7A]/5'
                }`}>
                  {/* Active Indicator */}
                  {currentBrand === index && (
                    <motion.div
                      layoutId="activeBrand"
                      className="absolute -top-1 -right-1 w-3 h-3 bg-[#003D7A] rounded-full border-2 border-white shadow-lg"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  
                  {/* Logo */}
                  <div className="h-12 relative flex items-center justify-center">
                    <Image
                      src={brand.logo}
                      alt={brand.name}
                      fill
                      className="object-contain transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  </div>
                </div>
              </motion.button>
            ))}
            </div>


          </div>

          {/* Right Side - Description */}
          <div className="relative">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-white border border-[#003D7A] rounded-full text-[#003D7A] text-xs font-semibold uppercase tracking-wide">
                Exclusive Distribution
              </span>
              <span className="px-3 py-1 bg-white border border-[#003D7A] rounded-full text-[#003D7A] text-xs font-semibold uppercase tracking-wide">
                37+ Years Experience
              </span>
            </div>
            <h4 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">World-Class Partners</h4>
            <p className="text-gray-600 text-base leading-relaxed mb-8">
              Trusted partnerships with industry-leading manufacturers delivering cutting-edge equipment for broadcast, film, theatre, and studio productions across the Philippines.
            </p>
            </div>

            {/* Auto-Cycling Brand Details with Equipment Image */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentBrand}
                initial={{ opacity: 0, filter: "blur(10px)", scale: 0.95 }}
                animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                exit={{ opacity: 0, filter: "blur(10px)", scale: 0.95 }}
                transition={{ 
                  duration: 0.6,
                  ease: [0.25, 0.4, 0.25, 1]
                }}
                className="bg-white border-2 border-[#003D7A] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300"
              >
                {/* Equipment Image */}
                <div className="relative h-56 w-full bg-gradient-to-br from-[#003D7A]/10 via-[#003D7A]/5 to-purple-100 overflow-hidden">
                  {/* Actual Equipment Image */}
                  <Image
                    src={featuredBrands[currentBrand].image}
                    alt={`${featuredBrands[currentBrand].name} Equipment`}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      // Fallback to logo display
                      target.style.display = 'none';
                    }}
                  />
                  
                  {/* Overlay gradient for better text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20" />
                  
                  {/* Brand Logo Overlay */}
                  <div className="absolute bottom-4 left-4">
                    <div className="relative w-32 h-16 bg-white/90 backdrop-blur-sm rounded-lg p-2 flex items-center justify-center">
                      <Image
                        src={featuredBrands[currentBrand].logo}
                        alt={featuredBrands[currentBrand].name}
                        fill
                        className="object-contain p-2"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    </div>
                  </div>
                  
                  {/* Premium Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[#003D7A] text-xs font-bold shadow-lg border border-[#003D7A]">
                      Premium Partner
                    </span>
                  </div>
                </div>

                {/* Brand Details */}
                <div className="p-6">
                  <motion.div 
                    className="flex items-start justify-between mb-3"
                    initial={{ opacity: 0, filter: "blur(10px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.4, 0.25, 1] }}
                  >
                    <h5 className="text-gray-900 font-bold text-2xl">{featuredBrands[currentBrand].name}</h5>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      Est. {featuredBrands[currentBrand].established}
                    </span>
                  </motion.div>
                  
                  {/* Word-by-word blur animation for description */}
                  <div className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {featuredBrands[currentBrand].description.split(' ').map((word, idx) => (
                      <motion.span
                        key={idx}
                        className="inline-block mr-[0.25em]"
                        initial={{ opacity: 0, filter: "blur(10px)" }}
                        animate={{ opacity: 1, filter: "blur(0px)" }}
                        transition={{ 
                          duration: 0.5, 
                          delay: 0.3 + (idx * 0.06),
                          ease: [0.25, 0.4, 0.25, 1] 
                        }}
                      >
                        {word}
                      </motion.span>
                    ))}
                  </div>
                  
                  <motion.div 
                    className="grid grid-cols-2 gap-4"
                    initial={{ opacity: 0, filter: "blur(10px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
                  >
                    <div className="bg-[#003D7A]/5 rounded-lg p-3 border border-[#003D7A]/30">
                      <span className="text-xs text-[#003D7A] font-semibold block mb-1">SPECIALTY</span>
                      <span className="text-sm text-gray-900 font-medium">{featuredBrands[currentBrand].specialty}</span>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <span className="text-xs text-gray-500 font-semibold block mb-1">ORIGIN</span>
                      <span className="text-sm text-gray-900 font-medium">{featuredBrands[currentBrand].origin}</span>
                    </div>
                  </motion.div>
                  
                  {/* View Products Link */}
                  <a
                    href="/brands"
                    className="mt-4 inline-flex items-center justify-center gap-2 w-full min-h-[3rem] px-6 py-3.5 
                    bg-white text-[#003D7A] font-semibold text-base rounded-full 
                    border-2 border-[#003D7A] 
                    shadow-[0_1px_3px_rgba(0,0,0,0.1)] 
                    hover:shadow-[0_8px_16px_rgba(0,61,122,0.25)] 
                    hover:-translate-y-1 
                    active:translate-y-0 active:shadow-[0_2px_8px_rgba(0,61,122,0.2)]
                    transition-all duration-300 ease-in-out
                    group cursor-pointer select-none
                    hover:bg-[#003D7A] hover:text-white
                    active:bg-[#002A5C]"
                  >
                    <span className="relative font-bold">
                      Explore Products
                    </span>
                    <ExternalLink className="w-5 h-5 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110" />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
