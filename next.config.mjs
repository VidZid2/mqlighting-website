/** @type {import('next').NextConfig} */
const nextConfig = {
  // Production optimization
  reactStrictMode: true,
  
  // Image optimization - configured for Netlify
  images: {
    unoptimized: true, // Required for Netlify static deployment
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  
  // Security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()'
          }
        ],
      },
    ]
  },
  
  // Webpack configuration for code obfuscation
  webpack: (config, { isServer, dev }) => {
    if (!dev && !isServer) {
      // Minification and obfuscation in production
      config.optimization = {
        ...config.optimization,
        minimize: true,
        minimizer: [
          ...config.optimization.minimizer,
        ],
      }
      
      // Remove source maps in production for security
      config.devtool = false
    }
    
    return config
  },
  
  // Disable X-Powered-By header
  poweredByHeader: false,
  
  // Compression
  compress: true,
  
  // Production source maps disabled for security
  productionBrowserSourceMaps: false,
  
  // Experimental features for better security
  experimental: {
    scrollRestoration: true,
  },
}

export default nextConfig
