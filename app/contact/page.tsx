'use client'

import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react'
import { useState } from 'react'
import FadeIn from '@/components/animations/FadeIn'
import StaggerContainer from '@/components/animations/StaggerContainer'
import StaggerItem from '@/components/animations/StaggerItem'
import ScaleIn from '@/components/animations/ScaleIn'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setSubmitted(true)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false)
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        message: '',
      })
    }, 3000)
  }

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Phone',
      content: '+63917 506 1168',
      link: 'tel:+639175061168',
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email',
      content: 'marketing@mqgroup.com.ph',
      link: 'mailto:marketing@mqgroup.com.ph',
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Location',
      content: 'Metro Manila, Philippines',
      link: '#',
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Business Hours',
      content: 'Mon - Fri: 9:00 AM - 6:00 PM',
      link: '#',
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0a2540] via-[#0c2d4f] to-[#0a2540] text-white pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <FadeIn delay={0.1}>
              <h1 className="text-[3rem] md:text-[4rem] lg:text-[5rem] font-light mb-8">Contact Us</h1>
            </FadeIn>
            <FadeIn delay={0.2} direction="up">
              <p className="text-[1.25rem] md:text-[1.5rem] text-gray-300 leading-relaxed">
                Get in touch with our team for quotes, inquiries, or technical support
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <StaggerItem key={index}>
                <a
                  href={info.link}
                  className="bg-gray-50 p-6 rounded-xl hover:shadow-lg transition-all border border-gray-100 text-center group block"
                >
                  <ScaleIn delay={index * 0.1}>
                    <div className="bg-primary-100 w-14 h-14 rounded-full flex items-center justify-center text-primary-600 mx-auto mb-3 group-hover:bg-primary-600 group-hover:text-white transition-all">
                      {info.icon}
                    </div>
                  </ScaleIn>
                  <div className="font-semibold text-gray-900 mb-1">{info.title}</div>
                  <div className="text-gray-600 text-sm">{info.content}</div>
                </a>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <FadeIn direction="right">
              <div>
                <div className="mb-8">
                  <div className="inline-block mb-4 px-4 py-2 bg-primary-100 rounded-full text-primary-700 text-sm font-semibold">
                    Get a Quote
                  </div>
                  <h2 className="text-[2.25rem] md:text-[3rem] lg:text-[3.5rem] font-light text-gray-900 mb-6">
                    Request a Quote
                  </h2>
                  <p className="text-gray-600 text-lg">
                    Fill out the form below and our team will get back to you within 24 hours.
                  </p>
                </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                      placeholder="+63 xxx xxx xxxx"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                      placeholder="Your Company"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-semibold text-gray-700 mb-2">
                    Service Interested In *
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                  >
                    <option value="">Select a service</option>
                    <option value="equipment">Equipment Purchase</option>
                    <option value="system-integration">System Integration</option>
                    <option value="repair">Technical Repair</option>
                    <option value="training">Product Training</option>
                    <option value="maintenance">Maintenance Services</option>
                    <option value="consultation">Consultation</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition resize-none"
                    placeholder="Tell us about your project or requirements..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || submitted}
                  className="w-full bg-primary-600 text-white px-8 py-4 rounded-lg hover:bg-primary-700 transition-all text-lg font-semibold shadow-lg hover:shadow-xl disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : submitted ? (
                    <>
                      ✓ Message Sent!
                    </>
                  ) : (
                    <>
                      Send Message <Send size={20} />
                    </>
                  )}
                </button>
              </form>
              </div>
            </FadeIn>

            {/* Additional Info */}
            <FadeIn direction="left" delay={0.2}>
              <div>
                <ScaleIn>
                  <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mb-6">
                    <h3 className="text-[1.75rem] md:text-[2rem] font-medium text-gray-900 mb-4">
                      Why Choose MQ Group?
                    </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">37 Years of Excellence</div>
                      <p className="text-gray-600 text-sm">Trusted by the industry since 1987</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">40+ Global Brands</div>
                      <p className="text-gray-600 text-sm">Exclusive distributor for world-class manufacturers</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Expert Technical Team</div>
                      <p className="text-gray-600 text-sm">Certified technicians with manufacturer training</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Complete Solutions</div>
                      <p className="text-gray-600 text-sm">From design to installation and support</p>
                    </div>
                  </div>
                </div>
                  </div>
                </ScaleIn>

                <ScaleIn delay={0.2}>
                  <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl p-8 text-white">
                <h3 className="text-[1.75rem] md:text-[2rem] font-medium mb-4">
                  Need Immediate Assistance?
                </h3>
                <p className="text-primary-100 mb-6">
                  Our team is ready to help you with any questions or technical support.
                </p>
                <div className="space-y-3">
                  <a
                    href="tel:+639175061168"
                    className="flex items-center gap-3 bg-white/10 backdrop-blur p-4 rounded-lg hover:bg-white/20 transition-all border border-white/20"
                  >
                    <Phone className="w-5 h-5" />
                    <div>
                      <div className="text-sm text-primary-100">Call Us</div>
                      <div className="font-semibold">+63917 506 1168</div>
                    </div>
                  </a>
                  <a
                    href="mailto:marketing@mqgroup.com.ph"
                    className="flex items-center gap-3 bg-white/10 backdrop-blur p-4 rounded-lg hover:bg-white/20 transition-all border border-white/20"
                  >
                    <Mail className="w-5 h-5" />
                    <div>
                      <div className="text-sm text-primary-100">Email Us</div>
                      <div className="font-semibold">marketing@mqgroup.com.ph</div>
                    </div>
                  </a>
                </div>
                  </div>
                </ScaleIn>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  )
}
