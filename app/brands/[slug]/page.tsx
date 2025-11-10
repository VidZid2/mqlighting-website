'use client'

import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import FadeIn from '@/components/animations/FadeIn'
import ScaleIn from '@/components/animations/ScaleIn'
import { brandData } from '@/lib/brandData'

export default function BrandDetailPage({ params }: { params: { slug: string } }) {
  const brand = brandData[params.slug]

  if (!brand) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="py-12 bg-gradient-to-br from-[#0a2540] to-[#0c2d4f] text-white">
        <div className="container mx-auto px-4">
          <Link
            href="/brands"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to All Brands
          </Link>
          
          <div className="flex flex-col md:flex-row items-center gap-8">
            <ScaleIn>
              <div className="bg-white p-8 rounded-2xl shadow-xl">
                <Image
                  src={brand.logo}
                  alt={`${brand.name} logo`}
                  width={250}
                  height={120}
                  className="w-auto h-28 object-contain"
                />
              </div>
            </ScaleIn>
            
            <div className="flex-1 text-center md:text-left">
              <FadeIn>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{brand.name}</h1>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="text-xl text-gray-300">{brand.description}</p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <FadeIn>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                About the Company
              </h2>
            </FadeIn>
            
            <FadeIn delay={0.1}>
              <div className="prose prose-lg max-w-none space-y-4">
                {brand.about.split('\n\n').map((section, index) => {
                  // Check if this section contains bullet points
                  if (section.includes('•')) {
                    const bullets = section.split('\n').filter(line => line.trim().startsWith('•'));
                    if (bullets.length > 0) {
                      return (
                        <div key={index} className="space-y-3 my-6">
                          {bullets.map((bullet, bIndex) => (
                            <p key={bIndex} className="text-gray-700 leading-relaxed flex items-start gap-3 ml-6">
                              <span className="text-[#0a2540] font-bold text-xl mt-0.5">•</span>
                              <span 
                                className="flex-1"
                                dangerouslySetInnerHTML={{ 
                                  __html: bullet.substring(1).trim().replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
                                }} 
                              />
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
                      className="text-gray-700 leading-relaxed mb-6"
                      dangerouslySetInnerHTML={{ 
                        __html: section.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
                      }}
                    />
                  )
                })}
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="mt-12 pt-8 border-t">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-[#0a2540] text-white px-8 py-4 rounded-xl hover:bg-[#0c2d4f] transition-all text-lg font-semibold shadow-lg hover:shadow-xl"
                >
                  Learn More About This Brand
                  <ArrowRight size={20} />
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  )
}
