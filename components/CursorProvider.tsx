'use client'

import { SmoothCursor } from '@/components/ui/smooth-cursor'
import { useDeviceDetection } from '@/hooks/useDeviceDetection'

export default function CursorProvider() {
  const { isTouchDevice } = useDeviceDetection()
  
  // Only show smooth cursor on non-touch devices
  if (isTouchDevice) {
    return null
  }
  
  return <SmoothCursor />
}
