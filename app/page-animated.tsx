import Link from 'next/link'
import { ArrowRight, Award, Users, Package, Wrench, CheckCircle, ChevronRight } from 'lucide-react'
import FadeIn from '@/components/animations/FadeIn'
import StaggerContainer from '@/components/animations/StaggerContainer'
import StaggerItem from '@/components/animations/StaggerItem'
import ScaleIn from '@/components/animations/ScaleIn'

export default function Home() {
  const services = [
    {
      icon: <Wrench className="w-8 h-8" />,
      title: 'System Integration',
      description: 'Complete turnkey solutions including design, supply, installation, and commissioning.',
    },
    {
      icon: <Package className="w-8 h-8" />,
      title: 'Technical Repair',
      description: 'Expert repair services by highly trained technicians with manufacturer certifications.',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Product Training',
      description: 'Comprehensive training programs direct from our overseas manufacturers.',
    },
    {
      icon: <Award className="w-8 h-8" />,
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
    'ARRI', 'Kino Flo', 'Dedolight', 'ETC', 'Cartoni', 'Matthews', 'Manfrotto', 'Nanlite',
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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <FadeIn delay={0.1} direction="down">
              <div className="relative inline-flex items-center mb-4 group">
                {/* Static glow effect */}
                <div className="absolute -inset-1 bg-primary-500/30 rounded-full blur-md"></div>
                
                {/* Glass badge */}
                <div className="relative px-4 py-2 bg-white/5 backdrop-blur-xl border border-primary-400/40 rounded-full text-primary-200 text-sm font-semibold shadow-2xl hover:scale-105 transition-all duration-300">
                  🏆 Excellence Since 1987
                </div>
              </div>
            </FadeIn>
            
            <FadeIn delay={0.2} duration={0.8}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Your Trusted Partner in
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600"> Professional Equipment</span>
              </h1>
            </FadeIn>
            
            <FadeIn delay={0.3} direction="up">
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Distributor of world-class motion picture, photography, broadcast, studio, stage & theater equipment in the Philippines
              </p>
            </FadeIn>
            
            <FadeIn delay={0.4} direction="up" blur={false}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-primary-600 text-white px-8 py-4 rounded-lg hover:bg-primary-700 transition-all text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Get a Quote <ArrowRight size={20} />
                </Link>
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur text-white px-8 py-4 rounded-lg hover:bg-white/20 transition-all text-lg font-semibold border border-white/20"
                >
                  View Products
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <StaggerItem key={index}>
                <div className="text-center">
                  <ScaleIn delay={index * 0.1}>
                    <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">
                      {stat.number}
                    </div>
                  </ScaleIn>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <FadeIn direction="right">
                <div className="inline-block mb-4 px-4 py-2 bg-primary-100 rounded-full text-primary-700 text-sm font-semibold">
                  About MQ Group
                </div>
              </FadeIn>
              
              <FadeIn delay={0.1} direction="right">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Work with the Best, Get the Best
                </h2>
              </FadeIn>
              
              <FadeIn delay={0.2} direction="right">
                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                  Established in 1987, MQ Group is the leading distribution company representing more than 40 global brands for the Philippine market. We supply world-class cutting-edge professional equipment nationwide.
                </p>
              </FadeIn>
              
              <StaggerContainer className="space-y-3 mb-8">
                {[
                  { title: 'Exclusive Distributor', desc: 'for ARRI, Kino Flo, Dedolight, ETC, and many more' },
                  { title: '37 Years of Excellence', desc: "Trusted by the country's leading organizations" },
                  { title: 'Complete Solutions', desc: 'From design to installation and maintenance' },
                ].map((item, index) => (
                  <StaggerItem key={index}>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="text-primary-600 flex-shrink-0 mt-1" size={24} />
                      <div>
                        <span className="font-semibold text-gray-900">{item.title}</span>
                        <p className="text-gray-600">{item.desc}</p>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
              
              <FadeIn delay={0.5} direction="right" blur={false}>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:gap-3 transition-all"
                >
                  Learn More About Us <ChevronRight size={20} />
                </Link>
              </FadeIn>
            </div>
            
            <StaggerContainer className="grid grid-cols-2 gap-4">
              {[
                { num: '40+', label: 'Global Brands' },
                { num: '100%', label: 'Certified Team', delay: true },
                { num: '23+', label: 'TV Studios', negMargin: true },
                { num: '30+', label: 'Theaters', delay: true },
              ].map((item, index) => (
                <StaggerItem key={index}>
                  <div className={`bg-white p-6 rounded-xl shadow-lg ${item.delay ? 'mt-8' : ''} ${item.negMargin ? '-mt-4' : ''} ${item.delay && !item.negMargin ? 'mt-4' : ''}`}>
                    <div className="text-3xl font-bold text-primary-600 mb-2">{item.num}</div>
                    <div className="text-gray-700 font-medium">{item.label}</div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <FadeIn>
              <div className="inline-block mb-4 px-4 py-2 bg-primary-100 rounded-full text-primary-700 text-sm font-semibold">
                Our Services
              </div>
            </FadeIn>
            
            <FadeIn delay={0.1}>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Professional Services You Can Trust
              </h2>
            </FadeIn>
            
            <FadeIn delay={0.2}>
              <p className="text-gray-600 text-lg">
                Our technical team consists of highly trained technicians and engineers with specialized training from overseas manufacturers
              </p>
            </FadeIn>
          </div>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <StaggerItem key={index}>
                <div className="bg-gray-50 p-6 rounded-xl hover:shadow-xl transition-all hover:-translate-y-1 border border-gray-100">
                  <ScaleIn delay={index * 0.1}>
                    <div className="bg-primary-100 w-16 h-16 rounded-lg flex items-center justify-center text-primary-600 mb-4">
                      {service.icon}
                    </div>
                  </ScaleIn>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeIn delay={0.5} className="text-center mt-12">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition-all font-semibold"
            >
              View All Services <ArrowRight size={20} />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Projects Showcase */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <FadeIn>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Proven Track Record of Excellence
              </h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-primary-100 text-lg">
                Trusted by leading organizations across the Philippines
              </p>
            </FadeIn>
          </div>

          <StaggerContainer className="grid md:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <StaggerItem key={index}>
                <div className="bg-white/10 backdrop-blur p-8 rounded-xl border border-white/20">
                  <ScaleIn delay={index * 0.1}>
                    <div className="text-5xl font-bold mb-3">{project.count}</div>
                  </ScaleIn>
                  <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                  <p className="text-primary-100">{project.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Featured Brands */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <FadeIn>
              <div className="inline-block mb-4 px-4 py-2 bg-primary-100 rounded-full text-primary-700 text-sm font-semibold">
                Trusted Partners
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                World-Class Brand Partners
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-gray-600 text-lg">
                Exclusive distributor for industry-leading manufacturers
              </p>
            </FadeIn>
          </div>

          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {brands.map((brand, index) => (
              <StaggerItem key={index}>
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all flex items-center justify-center border border-gray-100">
                  <span className="text-xl font-bold text-gray-800">{brand}</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeIn delay={0.5} className="text-center">
            <Link
              href="/brands"
              className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:gap-3 transition-all text-lg"
            >
              View All 40+ Brands <ChevronRight size={24} />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <ScaleIn>
            <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 lg:p-12 text-center text-white">
              <FadeIn>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Ready to Get Started?
                </h2>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
                  Contact us today for a free consultation and quote. Our team is ready to help you find the perfect solution.
                </p>
              </FadeIn>
              <FadeIn delay={0.2} blur={false}>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 bg-white text-primary-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-all text-lg font-semibold shadow-lg"
                  >
                    Request a Quote <ArrowRight size={20} />
                  </Link>
                  <a
                    href="tel:+639175061168"
                    className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur text-white px-8 py-4 rounded-lg hover:bg-white/20 transition-all text-lg font-semibold border border-white/20"
                  >
                    Call Us Now
                  </a>
                </div>
              </FadeIn>
            </div>
          </ScaleIn>
        </div>
      </section>
    </div>
  )
}
