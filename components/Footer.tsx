'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Mail, Phone, MapPin } from 'lucide-react'
import FadeIn from '@/components/animations/FadeIn'
import StaggerContainer from '@/components/animations/StaggerContainer'
import StaggerItem from '@/components/animations/StaggerItem'
import ScaleIn from '@/components/animations/ScaleIn'

export default function Footer() {
  return (
    <footer className="bg-[#0a2540] text-white relative overflow-hidden">
      {/* Top border with indentation */}
      <div className="container mx-auto px-8 md:px-12 lg:px-16 xl:px-20">
        <div className="border-t border-white/10"></div>
      </div>
      
      <div className="container mx-auto px-8 md:px-12 lg:px-16 xl:px-20 py-12 lg:py-16 relative z-10">
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-16">
          {/* Company Info */}
          <StaggerItem>
            <div>
              <ScaleIn>
                <div className="mb-4">
                  <Image
                    src="/MQ-logo-colored.png"
                    alt="MQ Group Logo"
                    width={100}
                    height={100}
                    className="object-contain brightness-0 invert"
                  />
                </div>
              </ScaleIn>
              <FadeIn delay={0.2} direction="up">
                <p className="text-sm leading-relaxed text-gray-300">
                  Your trusted distributor of world-class motion picture, photography, broadcast, studio, stage & theater equipment in the Philippines.
                </p>
              </FadeIn>
            </div>
          </StaggerItem>

          {/* Quick Links */}
          <StaggerItem>
            <div>
              <h3 className="text-white font-semibold text-base mb-5">
                Quick Links
              </h3>
              <ul className="space-y-2">
                {[
                  { href: '/', label: 'Home' },
                  { href: '/about', label: 'About Us' },
                  { href: '/products', label: 'Products' },
                  { href: '/services', label: 'Services' },
                  { href: '/brands', label: 'Our Brands' },
                  { href: '/contact', label: 'Contact Us' }
                ].map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href} 
                      className="text-sm text-gray-300 hover:text-primary-400 transition-all duration-200 inline-block hover:translate-x-1"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </StaggerItem>

          {/* Contact Info */}
          <StaggerItem>
            <div>
              <h3 className="text-white font-semibold text-base mb-5">Get In Touch</h3>
              <div className="space-y-3">
                <a href="tel:+639175061168" className="flex items-center gap-3 hover:text-primary-400 transition-colors text-sm text-gray-300">
                  <Phone size={18} strokeWidth={1.5} className="flex-shrink-0" />
                  <span>+63917 506 1168</span>
                </a>
                <a href="mailto:marketing@mqgroup.com.ph" className="flex items-center gap-3 hover:text-primary-400 transition-colors text-sm text-gray-300">
                  <Mail size={18} strokeWidth={1.5} className="flex-shrink-0" />
                  <span>marketing@mqgroup.com.ph</span>
                </a>
                <div className="flex items-start gap-3 text-sm text-gray-300">
                  <MapPin size={18} strokeWidth={1.5} className="mt-0.5 flex-shrink-0" />
                  <span>Metro Manila, Philippines</span>
                </div>
                
                {/* Newsletter Signup */}
                <div className="pt-4 mt-4 border-t border-white/10">
                  <p className="text-xs font-semibold text-white mb-3">For Latest News & Updates</p>
                  <div className="relative">
                    <input
                      required
                      type="email"
                      name="email"
                      autoComplete="off"
                      className="peer w-full border-[1.5px] border-gray-500 rounded-2xl bg-transparent px-4 py-3 text-sm text-white transition-all duration-150 ease-in-out outline-none focus:outline-none focus:border-primary-400 valid:border-primary-400"
                    />
                    <label className="absolute left-4 top-3 text-gray-400 text-sm pointer-events-none transition-all duration-150 ease-in-out peer-focus:-translate-y-6 peer-focus:translate-x-0 peer-focus:scale-75 peer-focus:bg-[#0a2540] peer-focus:px-2 peer-focus:text-primary-400 peer-valid:-translate-y-6 peer-valid:translate-x-0 peer-valid:scale-75 peer-valid:bg-[#0a2540] peer-valid:px-2 peer-valid:text-primary-400">
                      Enter E-mail Address
                    </label>
                    <button
                      type="submit"
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary-600 hover:bg-primary-700 text-white p-2 rounded-xl transition-colors"
                      aria-label="Subscribe"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </StaggerItem>
        </StaggerContainer>

        <div className="mt-10 pt-6">
          {/* Copyright and Links */}
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-4">
            <div className="flex flex-col items-center md:items-start gap-3">
              {/* Social Media Icons */}
              <div className="flex gap-3">
                <a
                  href="https://www.facebook.com/MQLightings"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 p-2 rounded-lg hover:bg-primary-600 transition-colors outline-none focus:outline-none flex items-center justify-center"
                  aria-label="Facebook"
                >
                  <lord-icon
                    src="https://cdn.lordicon.com/bfoumeno.json"
                    trigger="hover"
                    stroke="bold"
                    state="hover-roll"
                    colors="primary:#ffffff,secondary:#38bdf8"
                    style={{ width: '32px', height: '32px' }}
                  />
                </a>
                <a
                  href="https://www.instagram.com/mq_lightings/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 p-2 rounded-lg hover:bg-primary-600 transition-colors outline-none focus:outline-none flex items-center justify-center"
                  aria-label="Instagram"
                >
                  <lord-icon
                    src="https://cdn.lordicon.com/tgyvxauj.json"
                    trigger="hover"
                    stroke="bold"
                    state="hover-rotate"
                    colors="primary:#ffffff,secondary:#38bdf8"
                    style={{ width: '32px', height: '32px' }}
                  />
                </a>
              </div>
              
              <div className="text-sm text-center md:text-left text-gray-400 space-y-1">
                <p className="font-semibold text-white">© 2025 Josiah P. De Asis. All Rights Reserved.</p>
                <p className="text-xs text-gray-500">
                  Unauthorized copying, reproduction, or distribution of this website's design, code, or content is strictly prohibited and will be prosecuted to the fullest extent of the law.
                </p>
              </div>
            </div>
            
            <div className="flex gap-6 text-sm pb-0.5">
              <Link href="/privacy" className="hover:text-primary-400 transition-colors text-gray-400">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-primary-400 transition-colors text-gray-400">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
