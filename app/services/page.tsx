'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Settings, Wrench, GraduationCap, Shield, Lightbulb, Users, CheckCircle, MessageSquare, Phone, Mail, MapPin, ArrowRight } from 'lucide-react'
import Link from 'next/link'
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

export default function ServicesPage() {
  const services = [
    {
      icon: <Settings className="w-10 h-10" />,
      title: 'System Integration',
      description: 'Complete turnkey solutions from concept to completion',
      features: [
        'Project Planning & Design',
        'Equipment Supply & Sourcing',
        'Professional Installation',
        'System Commissioning',
        'Testing & Validation',
        'Documentation & Training',
      ],
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: <Wrench className="w-10 h-10" />,
      title: 'Technical Repair',
      description: 'Expert repair services by certified technicians',
      features: [
        'Manufacturer-Certified Repairs',
        'Diagnostics & Troubleshooting',
        'Parts Replacement',
        'Quality Assurance Testing',
        'Warranty Service',
        'Quick Turnaround Time',
      ],
      color: 'from-green-500 to-green-600',
    },
    {
      icon: <GraduationCap className="w-10 h-10" />,
      title: 'Product Training',
      description: 'Comprehensive training programs for your team',
      features: [
        'Equipment Operation Training',
        'Technical Workshops',
        'On-site Training Sessions',
        'Manufacturer-Led Programs',
        'Certification Courses',
        'Ongoing Support',
      ],
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: <Shield className="w-10 h-10" />,
      title: 'Preventive Maintenance',
      description: 'Keep your equipment running at peak performance',
      features: [
        'Regular Inspection Schedules',
        'Performance Optimization',
        'Parts Replacement Planning',
        'System Health Reports',
        'Extended Equipment Lifespan',
        'Reduced Downtime',
      ],
      color: 'from-orange-500 to-orange-600',
    },
    {
      icon: <Lightbulb className="w-10 h-10" />,
      title: 'Lighting Design',
      description: 'Professional lighting design and consultation',
      features: [
        'Studio Lighting Design',
        'Theater & Stage Lighting',
        'Broadcast Facility Planning',
        '3D Visualization',
        'Energy Efficiency Analysis',
        'Technical Specifications',
      ],
      color: 'from-yellow-500 to-yellow-600',
    },
    {
      icon: <Users className="w-10 h-10" />,
      title: 'Technical Support',
      description: 'Ongoing support and consultation services',
      features: [
        '24/7 Technical Helpline',
        'Remote Troubleshooting',
        'On-site Support',
        'Technical Consultation',
        'Equipment Recommendations',
        'Project Management',
      ],
      color: 'from-red-500 to-red-600',
    },
  ]

  const process = [
    {
      step: '01',
      title: 'Consultation',
      description: 'We discuss your requirements and project goals',
    },
    {
      step: '02',
      title: 'Design & Planning',
      description: 'Our team creates a detailed solution tailored to your needs',
    },
    {
      step: '03',
      title: 'Implementation',
      description: 'Professional installation and system integration',
    },
    {
      step: '04',
      title: 'Training & Support',
      description: 'Comprehensive training and ongoing technical support',
    },
  ]

  const projects = [
    { number: '23+', label: 'TV Studios' },
    { number: '30+', label: 'Theaters' },
    { number: '50+', label: 'Venues' },
    { number: '100+', label: 'Clients Served' },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0a2540] via-[#0c2d4f] to-[#0a2540] text-white pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <FadeIn delay={0.1}>
              <h1 className="text-[3rem] md:text-[4rem] lg:text-[5rem] font-light mb-8">Professional Services</h1>
            </FadeIn>
            <FadeIn delay={0.2} direction="up">
              <p className="text-[1.25rem] md:text-[1.5rem] text-gray-300 leading-relaxed">
                Comprehensive technical services backed by 37 years of expertise and manufacturer-certified training
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {projects.map((project, index) => (
              <StaggerItem key={index}>
                <div className="text-center">
                  <ScaleIn delay={index * 0.1}>
                    <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">
                      {project.number}
                    </div>
                  </ScaleIn>
                  <div className="text-gray-600 font-medium">{project.label}</div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <FadeIn>
              <div className="inline-block mb-4 px-4 py-2 bg-primary-100 rounded-full text-primary-700 text-sm font-semibold">
                What We Offer
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="text-[2.25rem] md:text-[3rem] lg:text-[3.5rem] font-light text-gray-900 mb-6">
                Complete Technical Solutions
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-gray-600 text-lg">
                Our highly trained team delivers world-class service with manufacturer certifications
              </p>
            </FadeIn>
          </div>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <StaggerItem key={index}>
                <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all border border-gray-100">
                  <ScaleIn delay={index * 0.05}>
                    <div className={`bg-gradient-to-r ${service.color} w-16 h-16 rounded-lg flex items-center justify-center text-white mb-4`}>
                      {service.icon}
                    </div>
                  </ScaleIn>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <FadeIn>
              <div className="inline-block mb-4 px-4 py-2 bg-primary-100 rounded-full text-primary-700 text-sm font-semibold">
                Our Process
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="text-[2.25rem] md:text-[3rem] lg:text-[3.5rem] font-light text-gray-900 mb-6">
                How We Work
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-gray-600 text-lg">
                A proven methodology for delivering exceptional results
              </p>
            </FadeIn>
          </div>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {process.map((item, index) => (
              <StaggerItem key={index}>
                <div className="relative">
                  {index !== process.length - 1 && (
                    <div className="hidden lg:block absolute top-12 left-1/2 w-full h-0.5 bg-primary-200"></div>
                  )}
                  <div className="text-center relative z-10">
                    <ScaleIn delay={index * 0.1}>
                      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                        {item.step}
                      </div>
                    </ScaleIn>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Team Expertise */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <FadeIn>
                <h2 className="text-[2.25rem] md:text-[3rem] lg:text-[3.5rem] font-light mb-6">
                  Expert Technical Team
                </h2>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="text-primary-100 text-lg">
                  Our team receives specialized annual training directly from manufacturers
                </p>
              </FadeIn>
            </div>

            <StaggerContainer className="grid md:grid-cols-3 gap-6">
              {[
                { num: '100%', label: 'Certified Team', desc: 'All technicians receive manufacturer certification' },
                { num: '37+', label: 'Years Experience', desc: 'Industry expertise since 1987' },
                { num: '24/7', label: 'Technical Support', desc: 'Round-the-clock assistance when you need it' },
              ].map((item, index) => (
                <StaggerItem key={index}>
                  <div className="bg-white/10 backdrop-blur p-6 rounded-xl border border-white/20">
                    <ScaleIn delay={index * 0.1}>
                      <div className="text-4xl font-bold mb-2">{item.num}</div>
                    </ScaleIn>
                    <div className="text-lg font-semibold mb-1">{item.label}</div>
                    <p className="text-primary-100 text-sm">
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
