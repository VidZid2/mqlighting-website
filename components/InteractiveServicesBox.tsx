'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Wrench, Package, Users, Award, Zap, CheckCircle } from 'lucide-react'
import Image from 'next/image'

const services = [
  {
    name: 'System Integration',
    icon: Wrench,
    image: '/System Integration.png',
    description: 'Complete turnkey installations for broadcast facilities',
    details: 'MQ Group specializes in project work and caters to television studios, OB Vans, theaters, live stage, and multi-purpose facilities from small to large scale complete turnkey installations.',
    features: ['TV Studios', 'OB Vans', 'Theaters & Live Stage', 'Multi-purpose Facilities'],
    color: 'from-blue-500 to-cyan-500'
  },
  {
    name: 'Technical Repair',
    icon: Package,
    image: '/Technical Repair.png',
    description: 'Quality repair services for all equipment',
    details: 'MQ qualified technical team composed of trained technicians and engineers offer quality repair services; ranging from troubleshooting to equipment repairs for both Warranty and Non-Warranty equipment.',
    features: ['Troubleshooting', 'Equipment Repairs', 'Warranty Support', 'Non-Warranty Repairs'],
    color: 'from-purple-500 to-pink-500'
  },
  {
    name: 'Product Training',
    icon: Users,
    image: '/Product Training.png',
    description: 'User and technical training programs',
    details: 'User and technical (basic troubleshooting) training programs are available at MQ Group; helping customers to fully engage the maximum potential of their purchased equipment or system.',
    features: ['User Training', 'Technical Training', 'Basic Troubleshooting', 'Equipment Optimization'],
    color: 'from-emerald-500 to-teal-500'
  },
  {
    name: 'Corrective Maintenance',
    icon: Award,
    image: '/Corrective Maintenance.png',
    description: 'Scheduled maintenance for optimal performance',
    details: 'For every system, every equipment is a vital part in ensuring a smooth and problem-free workflow. MQ Group provides one-time, quarterly, bi-yearly, and annual Corrective Maintenance.',
    features: ['One-time Service', 'Quarterly Plans', 'Bi-yearly Programs', 'Annual Contracts'],
    color: 'from-orange-500 to-red-500'
  },
  {
    name: 'Preventive Maintenance',
    icon: Zap,
    image: '/Preventive Maintenance.png',
    description: 'Systematic inspection and care',
    details: 'We want your equipment to serve you for the longest time possible. Maintaining equipment in satisfactory operating condition by providing for systematic inspection, detection, and correction of failures.',
    features: ['Regular Inspections', 'Early Detection', 'Failure Prevention', 'Extended Lifespan'],
    color: 'from-indigo-500 to-purple-500'
  },
  {
    name: 'Innovative Turnkey Solutions',
    icon: CheckCircle,
    image: '/Innovative Turnkey Solutions.png',
    description: 'End-to-end systems integration',
    details: 'Systems integration for television, broadcast, and theater requires attention to detail and a vast range of skills and experience. With a highly capable technical team and strongly established partnerships with 40+ global manufacturers, we ensure efficient and reliable systems integration services.',
    features: ['OB/ENG Trucks & Uplink', 'Play-out Transmission', 'Post-production Systems', 'TV Studios & Theaters'],
    color: 'from-rose-500 to-pink-500'
  }
]

export default function InteractiveServicesBox() {
  const [currentService, setCurrentService] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return

    const timer = setInterval(() => {
      setCurrentService((prev) => (prev + 1) % services.length)
    }, 10000) // 10 seconds

    return () => clearInterval(timer)
  }, [currentService, isPaused])

  const handleServiceClick = (index: number) => {
    setCurrentService(index)
    setIsPaused(true)

    // Resume after 7 seconds
    setTimeout(() => {
      setIsPaused(false)
    }, 7000)
  }

  return (
    <div className="relative w-full">
      {/* Subtle Background Glow Effects */}
      <div className="absolute -inset-4 opacity-20 blur-3xl pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-emerald-300 via-teal-200 to-transparent rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-200 via-cyan-200 to-transparent rounded-full"></div>
      </div>
      
      {/* Card Container */}
      <div className="relative rounded-3xl shadow-2xl overflow-hidden bg-white border border-gray-200">
        {/* Gradient on the left */}
        <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-transparent"></div>
        
        <div className="relative z-10 grid lg:grid-cols-2 gap-10 p-8 lg:p-12 items-start">
          {/* Left Side - Service Details */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentService}
                initial={{ opacity: 0, filter: "blur(10px)", scale: 0.95 }}
                animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                exit={{ opacity: 0, filter: "blur(10px)", scale: 0.95 }}
                transition={{ 
                  duration: 0.6,
                  ease: [0.25, 0.4, 0.25, 1]
                }}
                className="bg-white border-2 border-emerald-400 rounded-2xl overflow-hidden shadow-xl"
              >
                {/* Service Image */}
                <div className="relative h-64 w-full overflow-hidden bg-gray-100">
                  <Image
                    src={services[currentService].image}
                    alt={services[currentService].name}
                    fill
                    className="object-cover"
                    priority
                  />
                  
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-gray-800 text-xs font-bold shadow-lg">
                      Service {currentService + 1} of {services.length}
                    </span>
                  </div>
                </div>

                {/* Service Details */}
                <div className="p-6">
                  <motion.h5 
                    className="text-gray-900 font-bold text-2xl mb-2"
                    initial={{ opacity: 0, filter: "blur(10px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.4, 0.25, 1] }}
                  >
                    {services[currentService].name}
                  </motion.h5>
                  
                  {/* Word-by-word blur animation for description */}
                  <div className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {services[currentService].details.split(' ').map((word, idx) => (
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
                        {word}{' '}
                      </motion.span>
                    ))}
                  </div>
                  
                  <motion.div 
                    className="space-y-2"
                    initial={{ opacity: 0, filter: "blur(10px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
                  >
                    <span className="text-xs text-emerald-600 font-semibold block mb-2">KEY FEATURES</span>
                    {services[currentService].features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Side - Service Grid */}
          <div>
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-white border border-emerald-600 rounded-full text-emerald-600 text-xs font-semibold uppercase tracking-wide">
                  Our Services
                </span>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">Complete Solutions</h3>
              <p className="text-gray-600 text-base leading-relaxed mb-8">
                From consultation to after-sales support, we provide comprehensive services for all your professional equipment needs.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
            {services.map((service, index) => {
              const IconComponent = service.icon
              return (
                <motion.button
                  key={service.name}
                  onClick={() => handleServiceClick(index)}
                  className="relative group cursor-pointer"
                  animate={{
                    scale: currentService === index ? 1.05 : 1,
                    opacity: currentService === index ? 1 : 0.7,
                  }}
                  whileHover={{
                    scale: 1.03,
                    opacity: 1,
                  }}
                  transition={{ 
                    duration: 0.3,
                    ease: "easeOut"
                  }}
                >
                  <div className={`relative border-2 rounded-xl p-4 transition-all duration-300 ${
                    currentService === index 
                      ? 'border-emerald-500 bg-emerald-50 shadow-lg shadow-emerald-500/20' 
                      : 'border-gray-200 bg-white hover:border-emerald-300 hover:bg-emerald-50/50'
                  }`}>
                    {currentService === index && (
                      <motion.div
                        layoutId="activeService"
                        className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white shadow-lg"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    
                    <IconComponent className={`w-8 h-8 mb-2 transition-colors duration-300 ${
                      currentService === index ? 'text-emerald-600' : 'text-gray-400'
                    }`} strokeWidth={1.5} />
                    <h4 className={`text-sm font-semibold transition-colors duration-300 ${
                      currentService === index ? 'text-gray-900' : 'text-gray-600'
                    }`}>
                      {service.name}
                    </h4>
                  </div>
                </motion.button>
              )
            })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
