'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, Mail, MapPin } from 'lucide-react'
import Link from 'next/link'

export default function LeftContactPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const [showButton, setShowButton] = useState(false)

  return (
    <>
      {/* Contact Button - Only visible on hover */}
      <AnimatePresence>
        {showButton && !isOpen && (
          <motion.button
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            transition={{ 
              type: 'spring',
              stiffness: 300,
              damping: 25,
            }}
            onClick={() => setIsOpen(true)}
            onMouseEnter={() => setShowButton(true)}
            className="fixed right-0 top-1/2 -translate-y-1/2 bg-white px-4 py-8 rounded-l-xl shadow-2xl z-50 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <span className="text-[#0a2540] font-semibold text-sm tracking-wider writing-mode-vertical">
              CONTACT
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Hover detection area - shows button */}
      <div
        className="fixed right-0 top-0 w-20 h-full z-40 pointer-events-auto"
        onMouseEnter={() => setShowButton(true)}
        onMouseLeave={() => !isOpen && setShowButton(false)}
      />

      {/* Contact Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay - click to close */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ x: 400 }}
              animate={{ x: 0 }}
              exit={{ x: 400 }}
              transition={{ 
                type: 'spring',
                stiffness: 300,
                damping: 30,
                mass: 0.8,
              }}
              className="fixed right-0 top-1/2 -translate-y-1/2 w-[400px] max-h-[90vh] bg-[#0a2540] text-white shadow-2xl z-50 rounded-l-2xl overflow-y-auto"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
            >

              {/* Content */}
              <div className="p-8 space-y-6 flex flex-col">
                {/* Header */}
                <div className="space-y-2 border-b border-white/10 pb-4">
                  <h3 className="text-lg font-light italic text-white/90">One world. One Contact.</h3>
                  <h2 className="text-3xl font-bold text-white tracking-tight">MQ Group</h2>
                </div>

                {/* Address */}
                <div className="space-y-2">
                  <div className="flex items-start gap-4 group hover:translate-x-1 transition-transform duration-300">
                    <div className="w-10 h-10 rounded-lg bg-sky-500/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-sky-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Location</p>
                      <div className="text-sm leading-relaxed text-sky-400 font-medium">
                        <p>G/F Lydia Building, #39 Polaris Street,</p>
                        <p>Bel-Air Village, Makati City,</p>
                        <p>Metro Manila, Philippines</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-3">
                  {/* Mobile */}
                  <a 
                    href="tel:+639175061168" 
                    className="flex items-center gap-4 group hover:translate-x-1 transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-500/20 transition-colors">
                      <Phone className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Mobile</p>
                      <p className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
                        +63917 506 1168
                      </p>
                    </div>
                  </a>

                  {/* Landline */}
                  <a 
                    href="tel:+6328890-8858" 
                    className="flex items-center gap-4 group hover:translate-x-1 transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-500/20 transition-colors">
                      <Phone className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Landline</p>
                      <p className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
                        +6328890-8858
                      </p>
                    </div>
                  </a>

                  {/* Email */}
                  <a 
                    href="mailto:marketing@mqgroup.com.ph" 
                    className="flex items-center gap-4 group hover:translate-x-1 transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/20 transition-colors">
                      <Mail className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">E-Mail</p>
                      <p className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors break-all">
                        marketing@mqgroup.com.ph
                      </p>
                    </div>
                  </a>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2.5 pt-4 border-t border-white/10">
                  <Link
                    href="/contact"
                    className="block w-full py-3.5 text-center bg-emerald-500 text-white rounded-lg font-semibold text-sm hover:bg-emerald-600 transition-all uppercase tracking-wide shadow-lg hover:shadow-emerald-500/50 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Contact Form
                  </Link>
                  <Link
                    href="/contact"
                    className="block w-full py-3.5 text-center bg-white/5 backdrop-blur-sm text-white rounded-lg font-semibold text-sm hover:bg-white/10 transition-all uppercase tracking-wide border border-white/20 hover:border-white/40 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Contact Us
                  </Link>
                  <Link
                    href="/newsletter"
                    className="block w-full py-3.5 text-center bg-white/5 backdrop-blur-sm text-white rounded-lg font-semibold text-sm hover:bg-white/10 transition-all uppercase tracking-wide border border-white/20 hover:border-white/40 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Newsletter
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .writing-mode-vertical {
          writing-mode: vertical-rl;
        }
        div[style*="overflow-y: auto"]::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  )
}
