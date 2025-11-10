'use client'

import { motion } from 'framer-motion'
import { Award, Star, Globe, CheckCircle, MessageSquare, Phone, Mail, MapPin, ArrowRight, Grid3x3, List } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import FadeIn from '@/components/animations/FadeIn'
import StaggerContainer from '@/components/animations/StaggerContainer'
import StaggerItem from '@/components/animations/StaggerItem'
import ScaleIn from '@/components/animations/ScaleIn'
import { brandData } from '@/lib/brandData'

// Blur-In Text Animation Component
function BlurInText({ text, delay = 0 }: { text: string; delay?: number }) {
  const words = text.split(' ');
  
  return (
    <>
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: delay + index * 0.1,
            ease: [0.25, 0.4, 0.25, 1]
          }}
          className="inline-block mr-[0.3em]"
        >
          {word}
        </motion.span>
      ))}
    </>
  );
}

function CTACards() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const cards = [
    {
      icon: MessageSquare,
      title: 'Request a Quote',
      description: 'Get a detailed quote for your project requirements.',
      link: '/contact',
      linkText: 'Get Started',
      bgGradient: 'from-blue-50 to-blue-100'
    },
    {
      icon: Phone,
      title: 'Call Us',
      description: 'Speak directly with our expert team.',
      link: 'tel:+639175061168',
      linkText: '+63917 506 1168',
      bgGradient: 'from-cyan-50 to-cyan-100'
    },
    {
      icon: Mail,
      title: 'Email Us',
      description: 'Send us your inquiries and requirements.',
      link: 'mailto:marketing@mqgroup.com.ph',
      linkText: 'Send Message',
      bgGradient: 'from-purple-50 to-purple-100'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      description: 'Come see our showroom and products.',
      link: '/contact',
      linkText: 'Get Directions',
      bgGradient: 'from-emerald-50 to-emerald-100'
    }
  ];
  
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
      {cards.map((card, index) => {
        const Icon = card.icon;
        const isHovered = hoveredIndex === index;
        const isOtherHovered = hoveredIndex !== null && hoveredIndex !== index;
        
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            animate={{
              scale: isOtherHovered ? 0.95 : 1,
              opacity: isOtherHovered ? 0.6 : 1
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <Link href={card.link} className="block h-full group">
              <motion.div
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden h-full flex flex-col relative"
                whileHover={{ 
                  y: -8,
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
                  backgroundColor: 'rgba(255, 255, 255, 0.15)'
                }}
                transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
              >
                {/* Gradient background on hover */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${card.bgGradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />
                
                <div className="relative p-6 flex flex-col h-full items-center text-center">
                  {/* Icon */}
                  <motion.div
                    className="w-14 h-14 bg-primary-400/20 rounded-xl flex items-center justify-center mb-4 relative overflow-hidden"
                    whileHover={{ rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-primary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                    <Icon className="w-7 h-7 text-primary-300 group-hover:text-white transition-colors duration-300 relative z-10" strokeWidth={1.5} />
                  </motion.div>
                  
                  {/* Title */}
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary-300 transition-colors duration-300">
                    {card.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-300 text-sm mb-4 flex-grow">
                    {card.description}
                  </p>
                  
                  {/* Link with arrow */}
                  <div className="text-primary-300 font-semibold inline-flex items-center justify-center gap-1 group-hover:gap-2 transition-all duration-300">
                    <span className="text-sm">{card.linkText}</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}

export default function BrandsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedBrand, setSelectedBrand] = useState<string>('aja')
  // All brands in alphabetical order
  const allBrands = [
    { name: 'AJA', logo: '/AJA_logo.png', slug: 'aja' },
    { name: 'Aladdin', logo: '/aladdin-logo-1.png', slug: 'aladdin' },
    { name: 'Angenieux', logo: '/angenieux-logo-scaled.png', slug: 'angenieux' },
    { name: 'Antari', logo: '/Antari-Logo-1.png', slug: 'antari' },
    { name: 'ARRI', logo: '/arri-logo.png', slug: 'arri' },
    { name: 'Atomos', logo: '/Atomos-logo-1.png', slug: 'atomos' },
    { name: 'Avenger', logo: '/avenger.png', slug: 'avenger' },
    { name: 'AVIWEST', logo: '/AVIWEST-Logo-Hi-Res.jpeg', slug: 'aviwest' },
    { name: 'Backstage Equipment', logo: '/backstage_logo_jpeg_with_web_address-1 (1).png', slug: 'backstage' },
    { name: 'Blackmagic Design', logo: '/blackmagic-design-featured.png', slug: 'blackmagic' },
    { name: 'Briese', logo: '/BRIESE-LOGO_1-1-1.png', slug: 'briese' },
    { name: 'Canon', logo: '/canon-logo.png', slug: 'canon' },
    { name: 'Cartoni', logo: '/cartoni-logo.png', slug: 'cartoni' },
    { name: 'Chimera', logo: '/chimera-logo.png', slug: 'chimera' },
    { name: 'Chrosziel', logo: '/Chrosziel-logo-2.png', slug: 'chrosziel' },
    { name: 'Clear-Com', logo: '/clear-com-vector-logo.png', slug: 'clearcom' },
    { name: 'Cooke Optics', logo: '/Cooke-logo-2.png', slug: 'cooke' },
    { name: 'Cotech', logo: '/Cotech-logo.jpg', slug: 'cotech' },
    { name: 'Dedolight', logo: '/Dedolight-logo-2.png', slug: 'dedolight' },
    { name: 'DZOFilm', logo: '/Screen-Shot-2021-04-05-at-12.15.05-AM (1).png', slug: 'dzofilm' },
    { name: 'EasyRig', logo: '/easyrig-logo.jpg' },
    { name: 'ETC', logo: '/ETC-Logo.jpg', slug: 'etc' },
    { name: 'Ewa Marine', logo: '/ewa-marine-logo-2.png', slug: 'ewa-marine' },
    { name: 'Flowcine', logo: '/Flowcine-logo.png', slug: 'flowcine' },
    { name: 'Fujifilm', logo: '/fujifilm-logo-scaled.png', slug: 'fujifilm' },
    { name: 'Fxlion', logo: '/fxlion-logo.png', slug: 'fxlion' },
    { name: 'GE Lighting', logo: '/GE-Logo-2.png', slug: 'ge' },
    { name: 'Glidecam', logo: '/Glidecam-logo.png', slug: 'glidecam' },
    { name: 'IFF Rigging', logo: '/IFF-Rigging-logo.png', slug: 'iff' },
    { name: 'JC Joel', logo: '/JC-JOEL-LOGO.png', slug: 'jcjoel' },
    { name: 'K5600', logo: '/k5600-logo.png', slug: 'k5600' },
    { name: 'Kino Flo', logo: '/kino-flo-logo.png', slug: 'kino-flo' },
    { name: 'Koto', logo: '/koto-logo.jpg', slug: 'koto' },
    { name: 'Leader', logo: '/Leader-logo.png' },
    { name: 'Ledgo', logo: '/ledgo-logo.png' },
    { name: 'Lee Filters', logo: '/lee-logo.png' },
    { name: 'Le Maitre', logo: '/Le-Maitre.jpg' },
    { name: 'Lightstar', logo: '/lightstar-logo.png' },
    { name: 'Macostar', logo: '/macostar-logo.png' },
    { name: 'Marshall', logo: '/marshall-logo.png' },
    { name: 'Martin by Harman', logo: '/Martin-by-HARMAN-logo.png' },
    { name: 'Matthews', logo: '/matthews-grip-logo.png' },
    { name: 'Mole-Richardson', logo: '/mole-richardson-logo.png' },
    { name: 'Nanlite', logo: '/nanlite-logo.png' },
    { name: 'Osram', logo: '/osram-logo.png' },
    { name: 'Panther', logo: '/panther-logo.png' },
    { name: 'Photoflex', logo: '/photoflex-logo.png' },
    { name: 'Porta-Jib', logo: '/porta-jib-logo.png' },
    { name: 'Porta Brace', logo: '/portabrace-logo.png' },
    { name: 'Saramonic', logo: '/saramonic-logo.png' },
    { name: 'Shure', logo: '/shure-logo.jpg' },
    { name: 'Sony', logo: '/sony-logo-scaled.png' },
    { name: 'Steadicam', logo: '/Steadicam-Logo.png' },
    { name: 'SWIT', logo: '/swit-logo.png' },
    { name: 'Tiffen', logo: '/tiffen-logo.png' },
    { name: 'Ushio', logo: '/ushio-logo.png' },
    { name: 'Varilite', logo: '/varilite-logo.png' },
    { name: 'Vaxis', logo: '/vaxis-logo.png' },
    { name: 'Velvet Light', logo: '/velvet-light-logo.png' },
    { name: 'Wohler', logo: '/wohler-logo.png' },
    { name: 'Zeiss', logo: '/Zeiss-logo.png' },
  ]

  const benefits = [
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Authorized Distributor',
      description: 'Official partnerships with 40+ world-class manufacturers',
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: 'Genuine Products',
      description: '100% authentic equipment with full manufacturer warranties',
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: 'Technical Support',
      description: 'Expert support and training directly from manufacturers',
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Latest Technology',
      description: 'First access to newest products and innovations',
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0a2540] via-[#0c2d4f] to-[#0a2540] text-white pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <FadeIn delay={0.1}>
              <h1 className="text-[3rem] md:text-[4rem] lg:text-[5rem] font-light mb-8">Our Brand Partners</h1>
            </FadeIn>
            <FadeIn delay={0.2} direction="up">
              <p className="text-[1.25rem] md:text-[1.5rem] text-gray-300 leading-relaxed">
                Exclusive distributor for 40+ world-class manufacturers in the Philippines
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-white border-b">
        <div className="container mx-auto px-4">
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <StaggerItem key={index}>
                <div className="text-center">
                  <ScaleIn delay={index * 0.1}>
                    <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center text-primary-600 mx-auto mb-4">
                      {benefit.icon}
                    </div>
                  </ScaleIn>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* All Brands Grid */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <FadeIn>
              <h2 className="text-[2.75rem] md:text-[3.5rem] lg:text-[4.5rem] font-light text-gray-900 mb-8">
                World Class Brands
              </h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-xl text-gray-600 leading-relaxed mb-6">
                Exclusive distributor for 40+ world-class manufacturers in the Philippines
              </p>
            </FadeIn>
            
            {/* View Toggle */}
            <FadeIn delay={0.2}>
              <div className="flex items-center justify-center gap-2 mb-8">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                    viewMode === 'grid'
                      ? 'bg-[#0a2540] text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Grid3x3 size={20} />
                  Grid View
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                    viewMode === 'list'
                      ? 'bg-[#0a2540] text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <List size={20} />
                  List View
                </button>
              </div>
            </FadeIn>
          </div>

          {/* Grid View */}
          {viewMode === 'grid' && (
            <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 max-w-7xl mx-auto">
              {allBrands.map((brand, index) => (
                <StaggerItem key={index}>
                  {brand.slug ? (
                    <Link href={`/brands/${brand.slug}`}>
                      <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 group cursor-pointer h-40 flex items-center justify-center">
                        <ScaleIn delay={index * 0.01}>
                          <Image
                            src={brand.logo}
                            alt={`${brand.name} logo`}
                            width={200}
                            height={100}
                            className="w-auto max-h-28 object-contain transition-all duration-300 group-hover:scale-105"
                          />
                        </ScaleIn>
                      </div>
                    </Link>
                  ) : (
                    <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 group cursor-pointer h-40 flex items-center justify-center">
                      <ScaleIn delay={index * 0.01}>
                        <Image
                          src={brand.logo}
                          alt={`${brand.name} logo`}
                          width={200}
                          height={100}
                          className="w-auto max-h-28 object-contain transition-all duration-300 group-hover:scale-105"
                        />
                      </ScaleIn>
                    </div>
                  )}
                </StaggerItem>
              ))}
            </StaggerContainer>
          )}

          {/* List View */}
          {viewMode === 'list' && (
            <FadeIn>
              <div className="max-w-7xl mx-auto flex gap-8">
                {/* Sidebar with brand list */}
                <FadeIn delay={0.1} direction="left">
                  <div className="w-72 flex-shrink-0">
                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md sticky top-24">
                      <h3 className="font-bold text-gray-900 mb-4 text-base border-b border-gray-200 pb-3">
                        World Class Brands
                      </h3>
                      <div className="max-h-[500px] overflow-y-auto pr-2 -mr-2">
                        <ul className="space-y-1">
                          {allBrands.filter(b => b.slug).map((brand, index) => (
                            <li key={brand.slug}>
                              <ScaleIn delay={0.15 + (index * 0.02)}>
                                <button
                                  onClick={() => setSelectedBrand(brand.slug!)}
                                  className={`w-full text-left px-4 py-2.5 rounded-lg transition-all text-sm ${
                                    selectedBrand === brand.slug
                                      ? 'bg-[#0a2540] text-white font-semibold shadow-sm'
                                      : 'text-gray-700 hover:bg-gray-50 font-medium'
                                  }`}
                                >
                                  {brand.name}
                                </button>
                              </ScaleIn>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </FadeIn>

                {/* Brand details */}
                <FadeIn delay={0.2} direction="right">
                  <div className="flex-1 bg-white border border-gray-200 rounded-xl shadow-md">
                    {brandData[selectedBrand] ? (
                      <div className="p-10">
                        <ScaleIn delay={0.3}>
                          <div className="mb-8 pb-6 border-b border-gray-200">
                            <Image
                              src={brandData[selectedBrand].logo}
                              alt={`${brandData[selectedBrand].name} logo`}
                              width={250}
                              height={100}
                              className="w-auto h-20 object-contain"
                            />
                          </div>
                        </ScaleIn>
                        
                        <FadeIn delay={0.4}>
                          <h2 className="text-lg font-bold text-gray-900 mb-6 uppercase tracking-wide">
                            About the Company
                          </h2>
                        </FadeIn>
                        
                        <FadeIn delay={0.5}>
                          <div className="space-y-4">
                            {brandData[selectedBrand].about.split('\n\n').map((section, index) => {
                              // Check if this section contains bullet points
                              if (section.includes('•')) {
                                const bullets = section.split('\n').filter(line => line.trim().startsWith('•'));
                                if (bullets.length > 0) {
                                  return (
                                    <div key={index} className="space-y-2">
                                      {bullets.map((bullet, bIndex) => (
                                        <p key={bIndex} className="text-gray-700 leading-relaxed text-sm flex items-start gap-2 ml-4">
                                          <span className="text-[#0a2540] font-bold mt-0.5">•</span>
                                          <span dangerouslySetInnerHTML={{ 
                                            __html: bullet.substring(1).trim().replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
                                          }} />
                                        </p>
                                      ))}
                                    </div>
                                  )
                                }
                              }
                              // Regular paragraph with bold formatting
                              return (
                                <p 
                                  key={index} 
                                  className="text-gray-700 leading-relaxed text-sm text-justify"
                                  dangerouslySetInnerHTML={{ 
                                    __html: section.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
                                  }}
                                />
                              )
                            })}
                          </div>
                        </FadeIn>

                        <FadeIn delay={0.6}>
                          <div className="mt-8 pt-6 border-t border-gray-200">
                            <Link
                              href={`/brands/${selectedBrand}`}
                              className="inline-flex items-center gap-2 bg-[#0a2540] text-white px-6 py-3 rounded-lg hover:bg-[#0c2d4f] transition-all font-semibold text-sm shadow-lg hover:shadow-xl"
                            >
                              Learn More
                              <ArrowRight size={16} />
                            </Link>
                          </div>
                        </FadeIn>
                      </div>
                    ) : (
                      <div className="text-center text-gray-500 py-20">
                        <p className="text-sm">Select a brand to view details</p>
                      </div>
                    )}
                  </div>
                </FadeIn>
              </div>
            </FadeIn>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <FadeIn className="text-center mb-12">
              <h2 className="text-[2.25rem] md:text-[3rem] lg:text-[3.5rem] font-light mb-6">
                Why Partner with MQ Group?
              </h2>
            </FadeIn>

            <StaggerContainer className="grid md:grid-cols-2 gap-6">
              {[
                { title: '37 Years of Excellence', desc: 'Established relationships with manufacturers since 1987, ensuring authentic products and expert support.' },
                { title: 'Manufacturer Training', desc: 'Our team receives annual specialized training directly from our brand partners.' },
                { title: 'Full Warranty Coverage', desc: 'All products come with complete manufacturer warranties and local support.' },
                { title: 'Latest Technology', desc: 'First access to new product launches and cutting-edge technology from our partners.' },
              ].map((item, index) => (
                <StaggerItem key={index}>
                  <div className="bg-white/10 backdrop-blur p-6 rounded-xl border border-white/20">
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-primary-100">
                      {item.desc}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-20 bg-[#0a2540]">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block mb-4 px-4 py-2 bg-primary-400/20 rounded-full text-primary-300 text-sm font-semibold"
            >
              Get In Touch
            </motion.div>
            
            <h2 className="text-[2.25rem] md:text-[2.75rem] lg:text-[3rem] font-light text-white mb-6">
              <BlurInText text="Ready to Get Started?" delay={0} />
            </h2>
            
            <div className="text-base text-gray-300 leading-relaxed">
              <BlurInText text="Contact us today for a free consultation and quote. Our team is ready to help you find the perfect solution." delay={0.3} />
            </div>
          </div>

          <CTACards />
        </div>
      </section>
    </div>
  )
}
