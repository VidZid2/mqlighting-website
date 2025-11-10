'use client'

import Image from 'next/image'

const brands = [
  { name: 'ARRI', logo: '/arri-logo.png' },
  { name: 'Kino Flo', logo: '/kino-flo-logo.png' },
  { name: 'Dedolight', logo: '/Dedolight-logo-2.png' },
  { name: 'Cartoni', logo: '/cartoni-logo.png' },
  { name: 'Matthews', logo: '/matthews-grip-logo.png' },
  { name: 'Nanlite', logo: '/nanlite-logo.png' },
  { name: 'Chimera', logo: '/chimera-logo.png' },
]

export default function BrandCarousel() {
  // Duplicate brands array for seamless loop
  const duplicatedBrands = [...brands, ...brands, ...brands]

  return (
    <div className="w-full overflow-hidden py-8">
      <style jsx global>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        
        .animate-scroll-brands {
          animation: scroll-left 30s linear infinite;
        }
        
        .brand-logo {
          filter: brightness(0) invert(1);
          opacity: 0.7;
        }
      `}</style>
      
      <div className="relative flex">
        <div className="flex animate-scroll-brands gap-8 items-center">
          {duplicatedBrands.map((brand, index) => (
            <div
              key={`${brand.name}-${index}`}
              className="flex-shrink-0 w-48 h-24 relative"
            >
              <Image
                src={brand.logo}
                alt={brand.name}
                fill
                className="object-contain brand-logo"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
