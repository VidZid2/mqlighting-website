'use client'

import { useEffect, useState } from 'react'

interface DeviceInfo {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  isTouchDevice: boolean
  isLowPerformance: boolean
}

export function useDeviceDetection(): DeviceInfo {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    isTouchDevice: false,
    isLowPerformance: false,
  })

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase()
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    
    // Mobile detection
    const isMobile = /iphone|ipod|android.*mobile|windows phone|blackberry|bb10|mobile/i.test(userAgent)
    
    // Tablet detection
    const isTablet = /ipad|android(?!.*mobile)|tablet|kindle|silk/i.test(userAgent)
    
    // Desktop
    const isDesktop = !isMobile && !isTablet
    
    // Low performance heuristics
    const isLowPerformance = 
      isMobile || 
      (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) ||
      ('connection' in navigator && (navigator as any).connection?.effectiveType === '2g')

    setDeviceInfo({
      isMobile,
      isTablet,
      isDesktop,
      isTouchDevice,
      isLowPerformance,
    })
  }, [])

  return deviceInfo
}
