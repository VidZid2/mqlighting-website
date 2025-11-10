'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link'
import Image from 'next/image'
import { Package, Award, Users, Wrench, CheckCircle, ChevronRight, ArrowRight, MessageSquare, Phone, Mail, MapPin, Settings, Headphones, GraduationCap, Shield } from 'lucide-react'
import FadeIn from '@/components/animations/FadeIn'
import StaggerContainer from '@/components/animations/StaggerContainer'
import StaggerItem from '@/components/animations/StaggerItem'
import ScaleIn from '@/components/animations/ScaleIn'
import HeroSlideshow from '@/components/HeroSlideshow'
import AnimatedWord from '@/components/AnimatedWord'
import BrandCarousel from '@/components/BrandCarousel'
import InteractiveBrandBox from '@/components/InteractiveBrandBox'
import InteractiveServicesBox from '@/components/InteractiveServicesBox'
import { BackgroundLines } from '@/components/ui/background-lines'
import { GlowingEffect } from '@/components/ui/glowing-effect'
import { Highlighter } from '@/components/ui/highlighter'
import IntroScreen from '@/components/IntroScreen'
import { LayoutTextFlip } from '@/components/ui/layout-text-flip'
import { CardContainer, CardBody, CardItem } from '@/components/ui/3d-card'

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

function AllArticlesGrid() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const smallArticles = [
    {
      tag: 'Media',
      title: 'The Portrait: Bounced & Reflected Light',
      description: 'Professional lighting techniques for portrait photography',
      date: 'Jun 5, 2025',
      read: 'MQ Team',
      image: '/The-Portrait-Bounced-Reflected-Light-1080x675.jpg'
    },
    {
      tag: 'Media',
      title: 'The light that changed the world – Part 2',
      description: 'Exploring the evolution of lighting technology',
      date: 'Jun 5, 2025',
      read: 'MQ Team',
      image: '/The-light-that-changed-the-world-–-Part-2-1080x675.jpg'
    },
    {
      tag: 'Media',
      title: 'Still Photography with Ilya Rashap – "Painting with Light"',
      description: 'Professional photography techniques and lighting mastery',
      date: 'Jun 5, 2025',
      read: 'MQ Team',
      image: '/Still-Photography-with-Ilya-Rashap-–-Painting-with-Light-1080x675.jpg'
    },
    {
      tag: 'Media',
      title: 'Nanlite PavoTube II 6C',
      description: 'Advanced RGB tube lighting for creative professionals',
      date: 'Jun 5, 2025',
      read: 'MQ Team',
      image: '/Nanlite-PavoTube-II-6C-1080x675.jpg'
    }
  ];
  
  const isFeaturedHovered = hoveredIndex === 0;
  const isAnySmallCardHovered = hoveredIndex !== null && hoveredIndex > 0;
  
  return (
    <div className="grid lg:grid-cols-[1.4fr_1fr] gap-2">
      {/* Featured Article - Left */}
      <motion.div
        className="h-full"
        animate={{
          scale: isAnySmallCardHovered ? 0.98 : 1,
          opacity: isAnySmallCardHovered ? 0.7 : 1
        }}
        transition={{
          duration: 0.3,
          ease: [0.25, 0.4, 0.25, 1]
        }}
        onMouseEnter={() => setHoveredIndex(0)}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <Link href="/blog/introducing-nanlite-forza-series" className="group block h-full">
          <motion.div
            className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg overflow-hidden h-full relative flex flex-col"
            whileHover={{ 
              scale: 1.01,
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.2)'
            }}
            transition={{ duration: 0.3 }}
          >
            {/* Hero Image */}
            <div className="relative h-80 overflow-hidden">
              <Image
                src="/Introducing-the-NANLITE-Forza-Series-1080x675.jpg"
                alt="NANLITE Forza Series"
                width={1080}
                height={675}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            
            <div className="p-6 md:p-8 relative z-10 flex-1 flex flex-col bg-white">
              <div className="mb-3">
                <div className="inline-block bg-red-600 text-white px-3 py-1 rounded text-sm font-semibold">
                  Media
                </div>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                Introducing the NANLITE Forza Series
              </h3>
              <div className="border-t border-gray-200 my-3"></div>
              <p className="text-gray-700 text-sm mb-6 flex-1">
                Discover the latest professional lighting solutions from NANLITE, designed for broadcast and studio applications.
              </p>
              <div className="text-gray-500 text-xs mt-auto">
                MQ Team · Jun 5, 2025
              </div>
            </div>
          </motion.div>
        </Link>
      </motion.div>

      {/* Article List - Right */}
      <div className="space-y-1.5">
        {smallArticles.map((article, index) => {
          const actualIndex = index + 1; // Offset by 1 since featured is index 0
          const isHovered = hoveredIndex === actualIndex;
          const isOtherHovered = hoveredIndex !== null && hoveredIndex !== actualIndex;
          
          return (
            <motion.div
              key={index}
              animate={{
                scale: isOtherHovered ? 0.97 : 1,
                y: isOtherHovered && hoveredIndex !== 0 ? (actualIndex < hoveredIndex ? -3 : 3) : 0,
                opacity: isOtherHovered ? 0.7 : 1
              }}
              transition={{
                duration: 0.3,
                ease: [0.25, 0.4, 0.25, 1]
              }}
              onMouseEnter={() => setHoveredIndex(actualIndex)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Link href={`/blog/${article.title.toLowerCase().replace(/\s/g, '-')}`} className="group">
                <motion.div
                  className="bg-white rounded-lg overflow-hidden flex items-stretch min-h-[140px]"
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)'
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Left Content - Tag, Title, Date */}
                  <div className="flex-1 p-5 flex flex-col gap-3 justify-center">
                    <div className={`inline-block px-3 py-1 rounded text-xs font-semibold self-start ${
                      article.tag === 'Media' ? 'bg-red-600 text-white' : 'bg-white text-gray-900'
                    }`}>
                      {article.tag}
                    </div>
                    <h4 className="text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors leading-snug">
                      {article.title}
                    </h4>
                    <div className="text-gray-600 text-xs">
                      {article.read} · {article.date}
                    </div>
                  </div>
                  
                  {/* Vertical Separator - Full height */}
                  <div className="w-px bg-gray-200 self-stretch"></div>
                  
                  {/* Right Image - Fills entire right side */}
                  <div className="w-60 flex-shrink-0 relative overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      width={240}
                      height={140}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// Client Logos Grid Component with Auto-Play
function ClientLogosGrid() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const clients = [
    { src: '/solaire.png', alt: 'Solaire Resort' },
    { src: '/gma.png', alt: 'GMA Network' },
    { src: '/meralco.png', alt: 'Meralco' },
    { src: '/abs-cbn.png', alt: 'ABS-CBN' },
    { src: '/samsung.png', alt: 'Samsung' },
    { src: '/tv-5.png', alt: 'TV5' },
    { src: '/ccp.png', alt: 'CCP' }
  ];

  useEffect(() => {
    if (isHovered) return; // Pause auto-play on hover

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % clients.length);
    }, 2000); // Change every 2 seconds

    return () => clearInterval(interval);
  }, [isHovered, clients.length]);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 items-center">
        {clients.map((client, index) => {
          const isActive = activeIndex === index;
          const isCurrentHovered = hoveredIndex === index;
          
          return (
            <motion.div
              key={client.alt}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              animate={{
                x: hoveredIndex !== null && hoveredIndex !== index
                  ? index < hoveredIndex 
                    ? -6
                    : 6
                  : 0,
                scale: hoveredIndex !== null && hoveredIndex !== index ? 0.96 : 1
              }}
              transition={{
                opacity: { duration: 0.6, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
                y: { duration: 0.6, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
                x: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
                scale: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }
              }}
              className="flex items-center justify-center"
              onMouseEnter={() => {
                setIsHovered(true);
                setHoveredIndex(index);
              }}
              onMouseLeave={() => {
                setIsHovered(false);
                setHoveredIndex(null);
              }}
            >
              <motion.div
                animate={{
                  y: isActive || isCurrentHovered ? -8 : 0,
                  scale: isActive || isCurrentHovered ? 1.03 : 1
                }}
                transition={{ 
                  duration: 0.4,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                style={{
                  boxShadow: isActive || isCurrentHovered 
                    ? '0 10px 30px -10px rgba(10, 37, 64, 0.15), 0 4px 12px -4px rgba(10, 37, 64, 0.08)' 
                    : '0 2px 8px -2px rgba(10, 37, 64, 0.08), 0 1px 3px -1px rgba(10, 37, 64, 0.04)'
                }}
                className="relative bg-white rounded-2xl p-8 border border-gray-200 cursor-pointer w-full h-32 flex items-center justify-center overflow-hidden backdrop-blur-sm"
              >
                {/* Subtle gradient border on hover */}
                <motion.div 
                  animate={{
                    opacity: isActive || isCurrentHovered ? 1 : 0
                  }}
                  transition={{ 
                    duration: 0.4,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(147, 197, 253, 0.05) 100%)',
                    border: '1px solid rgba(59, 130, 246, 0.1)'
                  }}
                />
                
                {/* Logo */}
                <motion.div 
                  animate={{
                    filter: isActive || isCurrentHovered ? 'grayscale(0%) brightness(1)' : 'grayscale(100%) brightness(0.9)'
                  }}
                  transition={{ 
                    duration: 0.4,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  className="relative z-10"
                >
                  <motion.div
                    animate={{
                      opacity: isActive || isCurrentHovered ? 1 : 0.6,
                      scale: isActive || isCurrentHovered ? 1.05 : 1
                    }}
                    transition={{ 
                      duration: 0.4,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                  >
                    <Image
                      src={client.src}
                      alt={client.alt}
                      width={180}
                      height={120}
                      className="w-auto h-14 md:h-16 object-contain"
                    />
                  </motion.div>
                </motion.div>
                
                {/* Refined shine effect */}
                <motion.div 
                  animate={{
                    x: isActive || isCurrentHovered ? '150%' : '-150%',
                    opacity: isActive || isCurrentHovered ? 0.4 : 0
                  }}
                  transition={{ 
                    duration: 0.8,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
                />
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// Year Counter Component with Roll Animation
function YearCounter() {
  const [displayYear, setDisplayYear] = useState(1987);
  const milestones = [1987, 1990, 1993];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const targetYear = milestones[currentIndex];
    const duration = 1200; // Faster: 1.2 seconds for counting
    const steps = Math.abs(targetYear - displayYear);
    const stepDuration = duration / steps;

    if (displayYear < targetYear) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setDisplayYear(prev => prev + 1);
      }, stepDuration);
      return () => clearTimeout(timer);
    } else if (displayYear === targetYear) {
      setIsAnimating(false);
      // Pause for 2 seconds at each milestone (faster)
      const pauseTimer = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % milestones.length);
        if (currentIndex === milestones.length - 1) {
          setDisplayYear(1987); // Reset to start
        }
      }, 2000);
      return () => clearTimeout(pauseTimer);
    }
  }, [displayYear, currentIndex, milestones]);

  return (
    <div className="text-6xl font-bold h-16 flex items-center justify-center">
      <div 
        key={displayYear}
        className={`${isAnimating ? 'animate-roll-up' : ''}`}
      >
        {displayYear}
      </div>
    </div>
  );
}

export default function Home() {
  const [showIntro, setShowIntro] = useState(false); // Default to false
  const [hoveredBentoCard, setHoveredBentoCard] = useState<number | null>(null);
  const [isClient, setIsClient] = useState(false);

  // Ensure client-side rendering
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Check if user has seen intro before (only once per new user)
  useEffect(() => {
    const hasSeenIntro = localStorage.getItem('mqgroup-intro-seen');
    if (!hasSeenIntro) {
      setShowIntro(true);
    }
  }, []);


  // Ensure page starts at top on initial load
  useEffect(() => {
    if (showIntro) {
      window.scrollTo(0, 0);
      document.body.style.overflow = 'hidden';
    }
  }, [showIntro]);

  const handleIntroComplete = () => {
    // Mark intro as seen for this user (persists across refreshes)
    localStorage.setItem('mqgroup-intro-seen', 'true');
    
    setShowIntro(false);
    document.body.style.overflow = 'auto';
    // Ensure we're at the top (hero section)
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  };

  // Don't render anything until client-side
  if (!isClient) {
    return <div className="fixed inset-0 bg-black z-[9999]" />;
  }
  
  const services = [
    {
      Icon: Wrench,
      title: 'System Integration',
      description: 'Complete turnkey solutions including design, supply, installation, and commissioning.',
    },
    {
      Icon: Package,
      title: 'Technical Repair',
      description: 'Expert repair services by highly trained technicians with manufacturer certifications.',
    },
    {
      Icon: Users,
      title: 'Product Training',
      description: 'Comprehensive training programs direct from our overseas manufacturers.',
    },
    {
      Icon: Award,
      title: 'Maintenance Services',
      description: 'Preventive and corrective maintenance to keep your equipment in top condition.',
    },
  ]

  const stats = [
    { number: '37+', label: 'Years of Excellence' },
    { number: '40+', label: 'Global Brands' },
    { number: '23+', label: 'TV Studios Completed' },
    { number: '30+', label: 'Theaters & Stages' },
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
  ]

  const projects = [
    {
      title: 'Broadcast Studios',
      count: '23+',
      description: 'Large-scale TV studio installations',
    },
    {
      title: 'Theaters & Stages',
      count: '30+',
      description: 'Professional theater and auditorium setups',
    },
    {
      title: 'Entertainment Venues',
      count: '50+',
      description: 'Bars, clubs, and museums nationwide',
    },
  ]

  // Show intro screen first
  if (showIntro) {
    return <IntroScreen onComplete={handleIntroComplete} />;
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section - Unified */}
      <section className="relative bg-[#0a2540] text-white overflow-hidden mt-20">
        {/* Hero Content */}
        <div className="py-20 lg:py-32">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
              {/* Left Content */}
              <div>
                <FadeIn delay={0.1}>
                  <h1 className="text-[2.5rem] md:text-[3.5rem] lg:text-[4.5rem] font-light mb-6 leading-[1.2] tracking-tight max-w-5xl">
                    Professional Broadcast & Cinema <AnimatedWord />
                  </h1>
                  <p className="text-gray-300 text-lg mb-8">
                    Serving the Philippines' Top Studios & Production Houses Since 1992
                  </p>
                </FadeIn>
                
                <FadeIn delay={0.2}>
                  <div className="flex flex-col sm:flex-row gap-4 mb-12">
                    <Link
                      href="/products"
                      className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#FF6B35] to-[#FF8C42] text-white px-8 py-4 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 font-semibold text-base shadow-md"
                    >
                      Explore Products
                      <ArrowRight size={20} />
                    </Link>
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center gap-2 bg-transparent text-white px-8 py-4 rounded-lg hover:bg-white/10 transition-all font-semibold text-base border-2 border-white/30 hover:border-white/50"
                    >
                      <Package size={20} />
                      Get a Quote
                    </Link>
                  </div>
                </FadeIn>
                
                {/* Description with dot indicator */}
                <FadeIn delay={0.3}>
                  <div className="flex items-start gap-3 text-gray-300">
                    <div className="w-2 h-2 bg-[#FF6B35] rounded-full mt-2 flex-shrink-0"></div>
                    <div className="text-base leading-relaxed inline">
                      MQ Group is the{' '}
                      <span className="inline-flex items-baseline [&>*]:!text-base [&>*]:!py-0 [&>*]:!px-1">
                        <LayoutTextFlip 
                          text=""
                          words={["leading", "premier", "top", "trusted"]}
                          duration={3000}
                        />
                      </span>
                      {' '}distributor of{' '}
                      <span className="inline-flex items-baseline [&>*]:!text-base [&>*]:!py-0 [&>*]:!px-1">
                        <LayoutTextFlip 
                          text=""
                          words={["world-class", "professional", "cutting-edge", "premium"]}
                          duration={3000}
                        />
                      </span>
                      {' '}motion picture, photography, broadcast, studio, stage & theater equipment—built to keep you and your team in flow.
                    </div>
                  </div>
                </FadeIn>
              </div>
              
              {/* Right - Slideshow */}
              <FadeIn delay={0.4} direction="left" className="hidden lg:block">
                <HeroSlideshow />
              </FadeIn>
            </div>
          </div>
        </div>

        {/* Moving Brand Carousel */}
        <div className="pt-8 pb-12">
          <BrandCarousel />
        </div>

        {/* Features Section */}
        <div className="pt-8 pb-20">
          <div className="container mx-auto px-4">
            {/* Top Section */}
            <FadeIn>
              <div className="text-center max-w-4xl mx-auto mb-12">
                <p className="text-primary-400 text-sm uppercase tracking-wider font-semibold mb-6">Explore Our Solutions</p>
                <motion.h2 
                  initial={{ color: '#ffffff' }}
                  whileInView={{ color: '#38bdf8' }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ 
                    duration: 1.5,
                    ease: [0.25, 0.1, 0.25, 1]
                  }}
                  className="text-[2.5rem] md:text-[3.5rem] lg:text-[4.5rem] font-bold mb-8 leading-[1.1] whitespace-nowrap"
                >
                  <BlurInText text="Professional Equipment" delay={0} />
                </motion.h2>
                <div className="text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto">
                  <BlurInText text="MQ Group combines extensive industry knowledge, world-class brand partnerships, and decades of experience into a powerful, seamless, and professional service. We are the most trusted partner for professional equipment in the Philippines." delay={0.5} />
                </div>
              </div>
              
              {/* Indented Divider */}
              <div className="max-w-6xl mx-auto mb-20">
                <div className="border-t border-white/10"></div>
              </div>
            </FadeIn>

            {/* Bottom Two-Column Section - Moved Here */}
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto mb-20 mt-16">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <h3 className="text-[2rem] md:text-[2.5rem] font-light mb-6 leading-tight">
                  MQ Group, your partner that delivers exceptional results
                </h3>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 font-medium text-lg transition-colors group"
                >
                  Explore Our Company
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>

              <CardContainer containerClassName="py-0">
                <CardBody className="w-full h-auto">
                  <CardItem
                    translateZ="50"
                    className="w-full"
                  >
                    <motion.div 
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                      className="bg-white/5 backdrop-blur-sm border border-white/5 rounded-2xl p-8 w-full"
                    >
                      <p className="text-gray-300 leading-relaxed text-base">
                        Built to keep you in flow by providing cutting-edge professional equipment and handling the complex technical requirements so you can focus on creating exceptional work.
                      </p>
                    </motion.div>
                  </CardItem>
                </CardBody>
              </CardContainer>
            </div>

            {/* Interactive Brand Box */}
            <FadeIn delay={0.3}>
              <div className="mb-16 max-w-6xl mx-auto">
                <InteractiveBrandBox />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Professional Services Section */}
      <section className="relative bg-[#0a2540] text-white overflow-hidden py-20">
        <div className="container mx-auto px-4">
          {/* Top Section */}
          <FadeIn>
            <div className="text-center max-w-4xl mx-auto mb-12">
              <p className="text-emerald-400 text-sm uppercase tracking-wider font-semibold mb-6">Comprehensive Support</p>
              <motion.h2 
                initial={{ color: '#ffffff' }}
                whileInView={{ color: '#10b981' }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ 
                  duration: 1.5,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
                className="text-[2.5rem] md:text-[3.5rem] lg:text-[4.5rem] font-bold mb-8 leading-[1.1] whitespace-nowrap"
              >
                <BlurInText text="Professional Services" delay={0} />
              </motion.h2>
              <div className="text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto">
                <BlurInText text="Beyond supplying world-class equipment, we provide complete technical support and services to ensure your success from project inception to long-term operations." delay={0.5} />
              </div>
            </div>
            
            {/* Indented Divider */}
            <div className="max-w-6xl mx-auto mb-20">
              <div className="border-t border-white/10"></div>
            </div>
          </FadeIn>

          {/* Bottom Two-Column Section */}
          <FadeIn delay={0.2}>
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto mb-20 mt-16">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <h3 className="text-[2rem] md:text-[2.5rem] font-light mb-6 leading-tight">
                  Expertise that drives excellence
                </h3>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-medium text-lg transition-colors group"
                >
                  Explore Our Services
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>

              <CardContainer containerClassName="py-0">
                <CardBody className="w-full h-auto">
                  <CardItem
                    translateZ="50"
                    className="w-full"
                  >
                    <motion.div 
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                      className="bg-white/5 backdrop-blur-sm border border-white/5 rounded-2xl p-8 w-full"
                    >
                      <p className="text-gray-300 leading-relaxed text-base">
                        Our highly trained technicians and engineers bring decades of combined experience, with specialized certifications from leading manufacturers worldwide.
                      </p>
                    </motion.div>
                  </CardItem>
                </CardBody>
              </CardContainer>
            </div>
          </FadeIn>

          {/* Interactive Services Box */}
          <FadeIn delay={0.3}>
            <div className="mb-16 max-w-6xl mx-auto">
              <InteractiveServicesBox />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* About Section - Bento Grid */}
      <section className="py-20 lg:py-32 bg-gradient-to-b from-[#0a2540] via-black to-[#0a2540]">
        <div className="container mx-auto px-4 max-w-7xl">
          <FadeIn className="mb-8">
            <motion.div
              initial={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
              className="inline-block mb-4 px-4 py-2 bg-primary-100 rounded-full text-primary-700 text-sm font-medium"
            >
              About MQ Group
            </motion.div>
            <h2 className="text-[2.5rem] md:text-[3.5rem] font-light text-white mb-6">
              <BlurInText text="Work with the Best, Get the Best" delay={0.2} />
            </h2>
            <div className="text-gray-300 text-lg leading-relaxed max-w-4xl mb-12">
              <BlurInText text="Established in 1987, MQ Group is the leading distribution company representing more than 40 global brands for the Philippine market. We supply world-class cutting-edge professional equipment nationwide." delay={0.5} />
            </div>
          </FadeIn>

          {/* Bento Grid - Responsive */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-[200px] md:auto-rows-[180px] lg:auto-rows-[160px] gap-4">
            {/* Item 1 - Large (Top Left, 2x2) */}
            <FadeIn delay={0.2} className="col-span-1 md:col-span-2 row-span-2">
              <motion.div 
                className="relative h-full rounded-3xl"
                onMouseEnter={() => setHoveredBentoCard(1)}
                onMouseLeave={() => setHoveredBentoCard(null)}
                animate={{
                  filter: hoveredBentoCard !== null && hoveredBentoCard !== 1 ? 'blur(10px)' : 'blur(0px)',
                  scale: hoveredBentoCard !== null && hoveredBentoCard !== 1 ? 0.9 : 1
                }}
                transition={{ duration: 0.4 }}
              >
                <GlowingEffect disabled={false} proximity={150} spread={80} blur={0} glow={true} movementDuration={0.8} borderWidth={2} inactiveZone={0} variant="white" />
                <div className="h-full bg-[#0a2540] rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer relative overflow-hidden p-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
                  <div className="relative z-10 h-full flex flex-col">
                  <motion.div 
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center gap-2 mb-3"
                  >
                    <motion.div
                      initial={{ rotate: -180, scale: 0 }}
                      whileInView={{ rotate: 0, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.0, ease: "backOut" }}
                    >
                      <CheckCircle className="text-white" size={28} />
                    </motion.div>
                    <h3 className="text-white font-semibold text-xl">Learn More</h3>
                  </motion.div>
                  <motion.p 
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-white text-base mb-4"
                  >
                    Exclusive distributor of 40+ world-class professional equipment brands in the Philippines.
                  </motion.p>
                  <div className="flex-1 bg-white rounded-2xl overflow-hidden relative border border-white/10">
                    {/* Sliding Brand Carousel */}
                    <div className="absolute inset-0 flex items-center">
                      <div className="flex items-center animate-brand-slide">
                        {/* Set 1 */}
                        <div className="flex items-center justify-between min-w-full px-4">
                          <div className="w-1/3 flex justify-start">
                            <Image src="/arri-logo.png" alt="ARRI" width={350} height={175} className="h-40 w-auto object-contain opacity-90" />
                          </div>
                          <div className="w-1/3 flex justify-center">
                            <Image src="/sony-logo-scaled.png" alt="Sony" width={350} height={175} className="h-40 w-auto object-contain opacity-90" />
                          </div>
                          <div className="w-1/3 flex justify-end">
                            <Image src="/canon-logo.png" alt="Canon" width={350} height={175} className="h-40 w-auto object-contain opacity-90" />
                          </div>
                        </div>
                        
                        {/* Set 2 */}
                        <div className="flex items-center justify-between min-w-full px-4">
                          <div className="w-1/3 flex justify-start">
                            <Image src="/Dedolight-logo-2.png" alt="Dedolight" width={350} height={175} className="h-40 w-auto object-contain opacity-90" />
                          </div>
                          <div className="w-1/3 flex justify-center">
                            <Image src="/kino-flo-logo.png" alt="Kino Flo" width={350} height={175} className="h-40 w-auto object-contain opacity-90" />
                          </div>
                          <div className="w-1/3 flex justify-end">
                            <Image src="/Zeiss-logo.png" alt="Zeiss" width={350} height={175} className="h-40 w-auto object-contain opacity-90" />
                          </div>
                        </div>
                        
                        {/* Set 3 */}
                        <div className="flex items-center justify-between min-w-full px-4">
                          <div className="w-1/3 flex justify-start">
                            <Image src="/blackmagic-design-featured.png" alt="Blackmagic" width={350} height={175} className="h-40 w-auto object-contain opacity-90" />
                          </div>
                          <div className="w-1/3 flex justify-center">
                            <Image src="/ETC-Logo.jpg" alt="ETC" width={350} height={175} className="h-40 w-auto object-contain opacity-90 brightness-200" />
                          </div>
                          <div className="w-1/3 flex justify-end">
                            <Image src="/Cooke-logo-2.png" alt="Cooke" width={350} height={175} className="h-40 w-auto object-contain opacity-90" />
                          </div>
                        </div>
                        
                        {/* Duplicate Set 1 for seamless loop */}
                        <div className="flex items-center justify-between min-w-full px-4">
                          <div className="w-1/3 flex justify-start">
                            <Image src="/arri-logo.png" alt="ARRI" width={350} height={175} className="h-40 w-auto object-contain opacity-90" />
                          </div>
                          <div className="w-1/3 flex justify-center">
                            <Image src="/sony-logo-scaled.png" alt="Sony" width={350} height={175} className="h-40 w-auto object-contain opacity-90" />
                          </div>
                          <div className="w-1/3 flex justify-end">
                            <Image src="/canon-logo.png" alt="Canon" width={350} height={175} className="h-40 w-auto object-contain opacity-90" />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Left Edge Blur Gradient */}
                    <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent pointer-events-none z-10"></div>
                    
                    {/* Right Edge Blur Gradient */}
                    <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent pointer-events-none z-10"></div>
                  </div>
                </div>
                </div>
              </motion.div>
            </FadeIn>

            {/* Item 2 - (Top Middle, 1x2) */}
            <FadeIn delay={0.5} className="row-span-2">
              <motion.div 
                className="relative h-full rounded-3xl"
                onMouseEnter={() => setHoveredBentoCard(2)}
                onMouseLeave={() => setHoveredBentoCard(null)}
                animate={{
                  filter: hoveredBentoCard !== null && hoveredBentoCard !== 2 ? 'blur(10px)' : 'blur(0px)',
                  scale: hoveredBentoCard !== null && hoveredBentoCard !== 2 ? 0.9 : 1
                }}
                transition={{ duration: 0.4 }}
              >
                <GlowingEffect disabled={false} proximity={150} spread={80} blur={0} glow={true} movementDuration={0.8} borderWidth={2} inactiveZone={0} variant="white" />
                <div className="h-full bg-[#0a2540] rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer relative overflow-hidden p-8">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
                  <div className="relative z-10 h-full flex flex-col justify-center items-center text-center">
                  <motion.div 
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.0, ease: "easeOut" }}
                    className="text-7xl font-bold mb-3 bg-gradient-to-r from-white via-white/90 to-[#003D7A] bg-clip-text text-transparent"
                  >
                    1987
                  </motion.div>
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="text-white font-medium text-lg mb-3"
                  >
                    Established
                  </motion.div>
                  <motion.p 
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="text-white/90 text-base leading-relaxed"
                  >
                    Pioneering excellence in professional lighting and equipment solutions
                  </motion.p>
                  </div>
                </div>
              </motion.div>
            </FadeIn>

            {/* Item 3 - (Top Right Middle, 1x2) */}
            <FadeIn delay={0.8} className="row-span-2">
              <motion.div 
                className="relative h-full rounded-3xl"
                onMouseEnter={() => setHoveredBentoCard(3)}
                onMouseLeave={() => setHoveredBentoCard(null)}
                animate={{
                  filter: hoveredBentoCard !== null && hoveredBentoCard !== 3 ? 'blur(10px)' : 'blur(0px)',
                  scale: hoveredBentoCard !== null && hoveredBentoCard !== 3 ? 0.9 : 1
                }}
                transition={{ duration: 0.4 }}
              >
                <GlowingEffect disabled={false} proximity={150} spread={80} blur={0} glow={true} movementDuration={0.8} borderWidth={2} inactiveZone={0} variant="white" />
                <div className="h-full bg-[#0a2540] rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer relative overflow-hidden p-8">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
                  <div className="relative z-10 h-full flex flex-col justify-center items-center text-center">
                  <motion.div 
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.0, ease: "easeOut" }}
                    className="text-7xl font-bold mb-3 bg-gradient-to-r from-white via-white/90 to-[#003D7A] bg-clip-text text-transparent"
                  >
                    100%
                  </motion.div>
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="text-white font-medium text-lg mb-3"
                  >
                    Certified
                  </motion.div>
                  <motion.p 
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="text-white/90 text-base leading-relaxed"
                  >
                    Factory-trained technicians and engineers
                  </motion.p>
                  </div>
                </div>
              </motion.div>
            </FadeIn>

            {/* Item 4 - (Top Right, 1x2) */}
            <FadeIn delay={1.1} className="row-span-2">
              <motion.div 
                className="relative h-full rounded-3xl"
                onMouseEnter={() => setHoveredBentoCard(4)}
                onMouseLeave={() => setHoveredBentoCard(null)}
                animate={{
                  filter: hoveredBentoCard !== null && hoveredBentoCard !== 4 ? 'blur(10px)' : 'blur(0px)',
                  scale: hoveredBentoCard !== null && hoveredBentoCard !== 4 ? 0.9 : 1
                }}
                transition={{ duration: 0.4 }}
              >
                <GlowingEffect disabled={false} proximity={150} spread={80} blur={0} glow={true} movementDuration={0.8} borderWidth={2} inactiveZone={0} variant="white" />
                <div className="h-full bg-[#0a2540] rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer relative overflow-hidden p-8">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
                  <div className="relative z-10 h-full flex flex-col justify-center items-center text-center">
                  <motion.div 
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.0, ease: "easeOut" }}
                    className="text-7xl font-bold mb-3 bg-gradient-to-r from-white via-white/90 to-[#003D7A] bg-clip-text text-transparent"
                  >
                    50+
                  </motion.div>
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="text-white font-medium text-lg mb-3"
                  >
                    Projects
                  </motion.div>
                  <motion.p 
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="text-white/90 text-base leading-relaxed"
                  >
                    Complete turnkey solutions nationwide
                  </motion.p>
                  </div>
                </div>
              </motion.div>
            </FadeIn>

            {/* Item 6 - (Bottom Left, 1x2) */}
            <FadeIn delay={1.4} className="row-span-2">
              <motion.div 
                className="relative h-full rounded-3xl"
                onMouseEnter={() => setHoveredBentoCard(5)}
                onMouseLeave={() => setHoveredBentoCard(null)}
                animate={{
                  filter: hoveredBentoCard !== null && hoveredBentoCard !== 5 ? 'blur(10px)' : 'blur(0px)',
                  scale: hoveredBentoCard !== null && hoveredBentoCard !== 5 ? 0.9 : 1
                }}
                transition={{ duration: 0.4 }}
              >
                <GlowingEffect disabled={false} proximity={150} spread={80} blur={0} glow={true} movementDuration={0.8} borderWidth={2} inactiveZone={0} variant="white" />
                <div className="h-full bg-[#0a2540] rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer relative overflow-hidden p-8">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
                  <div className="relative z-10 h-full flex flex-col justify-center items-center text-center">
                  <motion.div 
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.0, ease: "easeOut" }}
                    className="text-7xl font-bold mb-3 bg-gradient-to-r from-white via-white/90 to-[#003D7A] bg-clip-text text-transparent"
                  >
                    23+
                  </motion.div>
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="text-white font-medium text-lg mb-3"
                  >
                    TV Studios
                  </motion.div>
                  <motion.p 
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="text-white/90 text-base leading-relaxed"
                  >
                    Nationwide coverage and installations
                  </motion.p>
                  </div>
                </div>
              </motion.div>
            </FadeIn>

            {/* Item 7 - Learn More (Bottom Middle, 2x2) */}
            <FadeIn delay={1.7} className="col-span-1 md:col-span-2 row-span-2">
              <Link href="/about" className="block h-full">
                <motion.div 
                  className="relative h-full rounded-3xl"
                  onMouseEnter={() => setHoveredBentoCard(6)}
                  onMouseLeave={() => setHoveredBentoCard(null)}
                  animate={{
                    filter: hoveredBentoCard !== null && hoveredBentoCard !== 6 ? 'blur(10px)' : 'blur(0px)',
                    scale: hoveredBentoCard !== null && hoveredBentoCard !== 6 ? 0.9 : 1
                  }}
                  transition={{ duration: 0.4 }}
                >
                  <GlowingEffect disabled={false} proximity={150} spread={80} blur={0} glow={true} movementDuration={0.8} borderWidth={2} inactiveZone={0} variant="white" />
                  <div className="h-full bg-[#0a2540] rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer relative overflow-hidden group p-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
                    <div className="relative z-10 h-full flex flex-col">
                    <motion.div 
                      initial={{ x: -20, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      className="flex items-center gap-2 mb-3"
                    >
                      <motion.div
                        initial={{ rotate: -180, scale: 0 }}
                        whileInView={{ rotate: 0, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.0, ease: "backOut" }}
                      >
                        <CheckCircle className="text-white" size={28} />
                      </motion.div>
                      <h3 className="text-white font-semibold text-xl">Learn More</h3>
                    </motion.div>
                    <motion.p 
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      className="text-white text-base mb-4"
                    >
                      Discover how MQ Group delivers world-class solutions and exceptional service since 1987.
                    </motion.p>
                    <div className="flex-1 bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                      {/* Service Icons Grid */}
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        {[
                          { icon: Wrench, label: 'Installation', delay: 0.3 },
                          { icon: Settings, label: 'Repair', delay: 0.5 },
                          { icon: GraduationCap, label: 'Training', delay: 0.7 },
                          { icon: Shield, label: 'Maintenance', delay: 0.9 },
                          { icon: Headphones, label: 'Support', delay: 1.1 },
                          { icon: Package, label: 'Distribution', delay: 1.3 }
                        ].map((service, index) => (
                          <motion.div 
                            key={service.label}
                            initial={{ scale: 0, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: service.delay, ease: "backOut" }}
                            whileHover={{ scale: 1.1, y: -5 }}
                            className="flex flex-col items-center text-center"
                          >
                            <motion.div 
                              className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-2"
                              whileHover={{ backgroundColor: "rgba(255,255,255,0.2)" }}
                            >
                              <service.icon className="text-white" size={24} />
                            </motion.div>
                            <span className="text-white/80 text-xs">{service.label}</span>
                          </motion.div>
                        ))}
                      </div>
                      
                      {/* CTA Button */}
                      <div className="flex items-center justify-between pt-4 border-t border-white/10">
                        <div className="text-white font-medium">Explore Our Story</div>
                        <ChevronRight className="text-white/80 group-hover:text-white group-hover:translate-x-1 transition-all" size={28} />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
              </Link>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* Trusted Clients Section */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-32 bg-white relative overflow-hidden">
        {/* Top gradient blend - only affects top portion */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#0a2540] via-[#7FA1C3] to-transparent pointer-events-none"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-6xl mx-auto mb-16 overflow-visible">
            {/* Yellow subtitle with smooth entrance animation */}
            <motion.div
              initial={{ opacity: 0, y: -30, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.8,
                delay: 0.1,
                ease: [0.22, 0.61, 0.36, 1]
              }}
              className="mb-6"
            >
              <span className="inline-block text-yellow-600 text-sm md:text-base font-bold tracking-[0.2em] uppercase">
                Industry Leaders
              </span>
            </motion.div>
            
            {/* Main title with yellow gradient and premium entrance */}
            <motion.h2
              initial={{ opacity: 0, y: 40, scale: 0.92 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 1,
                delay: 0.2,
                ease: [0.22, 0.61, 0.36, 1]
              }}
              className="text-[2rem] md:text-[3rem] lg:text-[3.5rem] font-black mb-8 leading-[1.3] overflow-visible"
            >
              <motion.span
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.8,
                  delay: 0.5,
                  ease: [0.22, 0.61, 0.36, 1]
                }}
                className="inline-block"
                style={{
                  background: 'linear-gradient(135deg, #eab308 0%, #fbbf24 50%, #fcd34d 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Trusted by
              </motion.span>
              <br />
              <motion.span
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.8,
                  delay: 0.7,
                  ease: [0.22, 0.61, 0.36, 1]
                }}
                className="inline-block"
                style={{
                  background: 'linear-gradient(135deg, #eab308 0%, #fbbf24 50%, #fcd34d 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Leading Organizations
              </motion.span>
            </motion.h2>
            
            {/* Description with smooth fade and blur */}
            <motion.p
              initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.9,
                delay: 0.9,
                ease: [0.22, 0.61, 0.36, 1]
              }}
              className="text-gray-800 text-lg md:text-xl leading-relaxed max-w-4xl mx-auto font-light"
            >
              Our shared tradition and quality leadership with Industry's Leading International Brands allow us to sustain and create solutions required for tomorrow's markets.
            </motion.p>
          </div>

          {/* Client Logos Grid with Auto-Play */}
          <ClientLogosGrid />
        </div>
      </section>

      {/* Insights & Updates Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header */}
          <div className="flex justify-between items-end mb-12">
            <FadeIn>
              <h2 className="text-4xl md:text-5xl font-light text-gray-900">
                Insights<br />& Updates
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 bg-emerald-400 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-emerald-300 transition-all"
              >
                See all articles <ArrowRight size={20} />
              </Link>
            </FadeIn>
          </div>

          {/* Articles Grid */}
          <AllArticlesGrid />
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
