'use client'

import { motion } from 'framer-motion'
import { Award, Target, Eye, Users, CheckCircle, ArrowRight, Sparkles, MessageSquare, Phone, Mail, MapPin } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import FadeIn from '@/components/animations/FadeIn'
import StaggerContainer from '@/components/animations/StaggerContainer'
import StaggerItem from '@/components/animations/StaggerItem'
import ScaleIn from '@/components/animations/ScaleIn'

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

export default function AboutPage() {
  const [activeCard, setActiveCard] = useState(0)
  const milestones = [
    {
      year: '1990',
      title: 'First Major Exhibit',
      description: 'Held our first exhibit at PHILCITE, showcasing the latest ARRI lighting technology. Began continuous introduction of professional film cameras, lighting, dollies, cranes, and underwater camera casings.',
    },
    {
      year: '1993',
      title: 'First TV Studio Project',
      description: 'Completed our first TV studio lighting project, supplying and installing complete studio lighting suspension, dimming, and lighting facilities for one of the largest TV stations in the country.',
    },
    {
      year: '1993 to Present',
      title: 'Industry Leadership',
      description: 'Leading supplier of professional lighting for over 37 years. Completed 23 TV studios, 30 theaters and stages, plus numerous venues nationwide.',
    },
  ]

  const brands = [
    { name: 'ARRI', logo: '/arri-logo.png' },
    { name: 'Kino Flo', logo: '/kino-flo-logo.png' },
    { name: 'Dedolight', logo: '/Dedolight-logo-2.png' },
    { name: 'ETC', logo: '/ETC-Logo.jpg' },
    { name: 'Cartoni', logo: '/cartoni-logo.png' },
    { name: 'Matthews', logo: '/matthews-grip-logo.png' },
    { name: 'Nanlite', logo: '/nanlite-logo.png' },
    { name: 'Chimera', logo: '/chimera-logo.png' },
    { name: 'Canon', logo: '/canon-logo.png' },
    { name: 'Sony', logo: '/sony-logo-scaled.png' },
    { name: 'Blackmagic', logo: '/blackmagic-design-featured.png' },
    { name: 'Zeiss', logo: '/Zeiss-logo.png' },
  ]

  // Auto-play carousel effect
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % milestones.length)
    }, 4000) // Change card every 4 seconds

    return () => clearInterval(interval)
  }, [milestones.length])

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0a2540] via-[#0c2d4f] to-[#0a2540] text-white pt-32 pb-24 overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-10 w-96 h-96 bg-[#1e5a8e] rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#1e5a8e] rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <FadeIn>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
                <Sparkles size={16} className="text-primary-400" />
                <span className="text-sm font-medium">Established 1987</span>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="text-[3.5rem] md:text-[4.5rem] lg:text-[6rem] font-light mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                About Us
              </h1>
            </FadeIn>
            <FadeIn delay={0.2} direction="up">
              <p className="text-[1.375rem] md:text-[1.75rem] text-gray-300 leading-relaxed max-w-3xl mx-auto">
                37 years of excellence in supplying world-class professional equipment to the Philippine market
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <FadeIn>
              <h2 className="text-[2.75rem] md:text-[3.5rem] lg:text-[4rem] font-light text-gray-900 mb-10 text-center">
                Work with the Best, Get the Best
              </h2>
            </FadeIn>
            
            <div className="space-y-6 text-gray-700 text-[1.125rem] leading-relaxed mb-12">
              <FadeIn delay={0.1} direction="up">
                <p className="text-center max-w-4xl mx-auto">
                  <strong className="text-gray-900">Established in 1987</strong>, MQ Group (or popularly known as MQ Lightings) is a distribution company currently representing more than <strong className="text-primary-600">40 Global Brands</strong> for the Philippine market; supplying customers world class cutting-edge, professional Motion Picture, Photography, Broadcast, Studio, Stage, & Theater equipment nationwide.
                </p>
              </FadeIn>
              
              <FadeIn delay={0.2} direction="up">
                <p className="text-center max-w-4xl mx-auto">
                  Among MQ's extensive product portfolio, the Company takes great pride to represent as the <strong className="text-primary-600">Exclusive Nationwide Distributor</strong> for a number of notable World Class Manufacturers; including <span className="font-semibold">ARRI, Kino Flo, Dedolight, Electronic Theater Controls (ETC), Cartoni, Matthews Studio Equipment (MSE Grip), Manfrotto, Nanlite</span>, and many others.
                </p>
              </FadeIn>
            </div>

            <ScaleIn delay={0.3}>
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 lg:p-12 rounded-3xl border-2 border-gray-200 shadow-xl">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-[1.75rem] md:text-[2.25rem] font-medium text-gray-900 mb-4">Our Foundation</h3>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Founded in <strong>1987</strong> and officially established in <strong>1989</strong>, MQ Lightings Enterprises, Inc. (now known as MQ Group) began primarily in the lamp business.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      During its first year, the company identified a market need for a reputable supplier of professional equipment for the film and broadcast industry.
                    </p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-md">
                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <Award className="text-primary-600" size={20} />
                      Our Commitment
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      MQ Group takes great pride in sourcing the latest equipment and technology from top manufacturers in Europe and the USA, ensuring that the local film and production industries remain informed about the latest global advancements.
                    </p>
                  </div>
                </div>
              </div>
            </ScaleIn>
          </div>
        </div>
      </section>

      {/* Milestones Timeline */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <FadeIn>
              <h2 className="text-[2.75rem] md:text-[3.5rem] lg:text-[4rem] font-light text-gray-900 mb-6">
                Our Milestones
              </h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-gray-600 text-lg">
                Key moments that shaped our journey to excellence
              </p>
            </FadeIn>
          </div>

          <div className="max-w-6xl mx-auto">
            <StaggerContainer className="grid md:grid-cols-3 gap-8">
              {milestones.map((milestone, index) => (
                <StaggerItem key={index}>
                  <div 
                    className={`group relative bg-white rounded-2xl shadow-lg transition-all duration-[800ms] ease-[cubic-bezier(0.4,0,0.2,1)] border-2 overflow-hidden cursor-pointer min-h-[380px] flex flex-col ${
                      activeCard === index 
                        ? 'border-[#0a2540] shadow-2xl scale-105 z-10' 
                        : 'border-gray-100 hover:border-[#0a2540] hover:scale-105 hover:z-10 hover:shadow-2xl'
                    }`}
                    onMouseEnter={() => setActiveCard(index)}
                  >
                    {/* Image placeholder that appears on active/hover */}
                    <div className={`absolute top-0 left-0 right-0 h-48 scale-95 transition-all duration-[800ms] ease-[cubic-bezier(0.4,0,0.2,1)] pointer-events-none ${
                      activeCard === index ? 'opacity-100 scale-100' : 'opacity-0'
                    }`}>
                      <div className="absolute inset-0 bg-gradient-to-br from-[#0a2540]/10 to-[#0a2540]/20">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-6xl font-bold text-[#0a2540]/20 transition-all duration-[800ms] ease-[cubic-bezier(0.4,0,0.2,1)]">
                            {milestone.year}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className={`p-8 transition-all duration-[800ms] ease-[cubic-bezier(0.4,0,0.2,1)] flex flex-col flex-grow ${
                      activeCard === index ? 'pt-56' : 'pt-8'
                    }`}>
                      <div className={`text-5xl font-bold mb-4 transition-all duration-[800ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${
                        activeCard === index ? 'text-[#0a2540] scale-110' : 'text-[#1e5a8e]'
                      }`}>
                        {milestone.year}
                      </div>
                      <h3 className={`text-xl font-bold mb-3 transition-all duration-[800ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${
                        activeCard === index ? 'text-[#0a2540]' : 'text-gray-900'
                      }`}>
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-sm transition-all duration-[800ms] ease-[cubic-bezier(0.4,0,0.2,1)]">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* Featured Brand Partners */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <FadeIn>
              <h2 className="text-[2.75rem] md:text-[3.5rem] lg:text-[4rem] font-light text-gray-900 mb-6">
                Featured Brand Partners
              </h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-gray-600 text-lg">
                Exclusive distributor for world-class manufacturers
              </p>
            </FadeIn>
          </div>

          <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
            {brands.map((brand, index) => (
              <StaggerItem key={index}>
                <div className="group bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 h-32 flex items-center justify-center cursor-pointer">
                  <ScaleIn delay={index * 0.05}>
                    <Image
                      src={brand.logo}
                      alt={`${brand.name} logo`}
                      width={180}
                      height={80}
                      className="w-auto h-20 object-contain transition-all duration-300 group-hover:scale-105"
                    />
                  </ScaleIn>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeIn delay={0.5}>
            <div className="text-center">
              <Link
                href="/brands"
                className="inline-flex items-center gap-2 text-[#0a2540] font-semibold hover:gap-3 transition-all text-lg group"
              >
                View All 40+ Brands 
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </FadeIn>
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
