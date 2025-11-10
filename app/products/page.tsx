'use client'

// TypeScript declaration for lord-icon custom element
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'lord-icon': {
        src?: string;
        trigger?: string;
        stroke?: string;
        state?: string;
        colors?: string;
        style?: React.CSSProperties;
      };
    }
  }
}

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Camera, 
  Lightbulb, 
  Video, 
  Mic, 
  MonitorPlay, 
  Clapperboard, 
  ArrowRight,
  MessageSquare,
  Phone,
  Mail,
  MapPin
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import Script from 'next/script'
import FadeIn from '@/components/animations/FadeIn'
import StaggerContainer from '@/components/animations/StaggerContainer'
import StaggerItem from '@/components/animations/StaggerItem'
import ScaleIn from '@/components/animations/ScaleIn'

// Lord Icon Component for animated SVG icons
function LordIcon({ src, size = 40 }: { src: string; size?: number }) {
  useEffect(() => {
    // Load lord-icon script if not already loaded
    if (typeof window !== 'undefined' && !customElements.get('lord-icon')) {
      const script = document.createElement('script');
      script.src = 'https://cdn.lordicon.com/lordicon.js';
      document.head.appendChild(script);
    }
  }, []);

  return (
    <lord-icon
      src={src}
      trigger="hover"
      stroke="bold"
      colors={`primary:#0a2540,secondary:#3b82f6`}
      style={{ width: `${size}px`, height: `${size}px` }}
    />
  );
}

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

export default function ProductsPage() {
  const categories = [
    {
      icon: <LordIcon src="https://cdn.lordicon.com/pshkgjmy.json" size={40} />,
      title: 'Lighting Fixtures',
      count: 30,
      description: 'Professional lighting fixtures for broadcast, studio, and stage applications',
      link: '/products?category=lighting-fixtures',
      image: '/Lighting-Fixtures-300x300.jpg',
    },
    {
      icon: <LordIcon src="https://cdn.lordicon.com/ripqtsik.json" size={40} />,
      title: 'Stage Equipment',
      count: 2,
      description: 'Complete stage equipment and theater solutions',
      link: '/products?category=stage-equipment',
      image: '/Stage-Equipment-300x300.jpg',
    },
    {
      icon: <LordIcon src="https://cdn.lordicon.com/wsaaegar.json" size={40} />,
      title: 'Camera Systems',
      count: 2,
      description: 'Professional camera systems for broadcast and cinema',
      link: '/products?category=camera-systems',
      image: '/Camera-Systems-300x300.png',
    },
    {
      icon: <LordIcon src="https://cdn.lordicon.com/ugllxeyl.json" size={40} />,
      title: 'Camera Supports',
      count: 2,
      description: 'Tripods, dollies, cranes, and stabilization systems',
      link: '/products?category=camera-supports',
      image: '/Camera-Supports-300x300.png',
    },
    {
      icon: <LordIcon src="https://cdn.lordicon.com/tamskqkf.json" size={40} />,
      title: 'Lighting Supports',
      count: 2,
      description: 'Professional lighting support equipment and accessories',
      link: '/products?category=lighting-supports',
      image: '/Lighting-Supports-300x300.png',
    },
    {
      icon: <LordIcon src="https://cdn.lordicon.com/ezityrjj.json" size={40} />,
      title: 'Battery Solutions',
      count: 2,
      description: 'Power solutions for professional equipment',
      link: '/products?category=battery-solutions',
      image: '/Battery-Solutions-300x300.png',
    },
    {
      icon: <LordIcon src="https://cdn.lordicon.com/fwkrbvja.json" size={40} />,
      title: 'Production Equipment',
      count: 2,
      description: 'Complete production equipment and accessories',
      link: '/products?category=production-equipment',
      image: '/Production-Equipment-300x300.png',
    },
    {
      icon: <LordIcon src="https://cdn.lordicon.com/txfzrzvh.json" size={40} />,
      title: 'Pro Audio',
      count: 2,
      description: 'Professional audio equipment and solutions',
      link: '/products?category=pro-audio',
      image: '/Pro-Audio-300x300.png',
    },
    {
      icon: <LordIcon src="https://cdn.lordicon.com/zkboyyym.json" size={40} />,
      title: 'Rigging System',
      count: 3,
      description: 'Professional rigging hardware and safety equipment',
      link: '/products?category=rigging-system',
      image: '/Rigging-System-300x300.png',
    },
  ]

  const brands = [
    'ARRI', 'Kino Flo', 'Dedolight', 'ETC', 'Cartoni', 'Matthews', 
    'Manfrotto', 'Nanlite', 'Litepanels', 'Chimera'
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-[#0a2540] text-white pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <FadeIn delay={0.1}>
              <h1 className="text-[3rem] md:text-[4rem] lg:text-[5rem] font-light mb-8">Our Products</h1>
            </FadeIn>
            <FadeIn delay={0.2} direction="up">
              <p className="text-[1.25rem] md:text-[1.5rem] text-gray-300 leading-relaxed">
                World-class professional equipment from the industry's leading manufacturers
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-5xl mx-auto mb-16">
            <FadeIn delay={0.1}>
              <div className="mb-4">
                <span className="text-[#0a2540] text-sm font-bold uppercase tracking-widest">
                  Product Categories
                </span>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <h2 className="text-[2.5rem] md:text-[3.5rem] lg:text-[4rem] font-bold text-[#0a2540] mb-8 leading-tight">
                Premium Equipment Solutions
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-gray-600 text-lg leading-relaxed max-w-4xl mx-auto">
                MQ Group provides state-of-the-art equipment and complete turnkey solutions for broadcast, studio, and stage applications, serving as the country's premier destination for professional media and entertainment solutions.
              </p>
            </FadeIn>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <StaggerItem key={index}>
                <Link href={category.link} className="block group h-full">
                  <motion.div 
                    className="relative bg-white rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-200 h-full flex flex-col"
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    {/* Image Section */}
                    <div className="relative h-64 bg-white p-6 flex items-center justify-center overflow-hidden">
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="w-full h-full flex items-center justify-center"
                      >
                        <Image
                          src={category.image}
                          alt={category.title}
                          width={300}
                          height={300}
                          className="object-contain w-full h-full group-hover:scale-110 transition-transform duration-500"
                        />
                      </motion.div>
                    </div>
                    
                    {/* Content Section */}
                    <div className="p-6 border-t border-gray-100 flex-1 flex flex-col">
                      <motion.div 
                        className="flex items-center gap-3 mb-3"
                        initial={{ x: -20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
                      >
                        <motion.div 
                          className="bg-white p-3 rounded-xl border border-gray-200 text-primary-500 shadow-sm hover:shadow-md transition-shadow duration-300"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                        >
                          {category.icon}
                        </motion.div>
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#0a2540] transition-colors duration-300">
                          {category.title}
                        </h3>
                      </motion.div>
                      
                      <motion.p 
                        className="text-gray-600 text-sm leading-relaxed mb-4 flex-1"
                        initial={{ y: 10, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.1 + 0.4 }}
                      >
                        {category.description}
                      </motion.p>
                      
                      {/* CTA */}
                      <motion.div 
                        className="flex items-center gap-2 text-[#0a2540] font-semibold group-hover:gap-3 transition-all duration-300 mt-auto"
                        initial={{ y: 10, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.1 + 0.5 }}
                      >
                        <span className="text-sm">Explore Collection</span>
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
                        >
                          <ArrowRight size={16} />
                        </motion.div>
                      </motion.div>
                    </div>
                  </motion.div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
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
