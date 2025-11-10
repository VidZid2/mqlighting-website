'use client'

import { useEffect } from 'react'

export default function SecurityProtection() {
  useEffect(() => {
    // Console Warning
    const styles = [
      'color: #FF6B35',
      'font-size: 40px',
      'font-weight: bold',
      'text-shadow: 2px 2px 4px rgba(0,0,0,0.3)'
    ].join(';')

    console.log('%c⚠️ STOP!', styles)
    console.log(
      '%c🚫 This website is protected by copyright laws.\n' +
      'Unauthorized copying, modification, or distribution of this code is strictly prohibited.\n\n' +
      '© 2024 Josiah P. De Asis. All Rights Reserved.\n' +
      'Legal action will be taken against copyright violators.',
      'color: #FF6B35; font-size: 14px; font-weight: bold;'
    )

    // Disable right-click
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()
      console.warn('⚠️ Right-click is disabled. This content is protected.')
      return false
    }

    // Disable certain keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U (view source)
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
        (e.ctrlKey && e.key === 'U')
      ) {
        e.preventDefault()
        console.warn('⚠️ Developer tools shortcuts are monitored.')
        return false
      }
    }

    // Disable text selection on certain elements
    const disableSelection = () => {
      document.body.style.userSelect = 'none'
      document.body.style.webkitUserSelect = 'none'
    }

    // Detect DevTools
    const detectDevTools = () => {
      const threshold = 160
      const widthThreshold = window.outerWidth - window.innerWidth > threshold
      const heightThreshold = window.outerHeight - window.innerHeight > threshold
      
      if (widthThreshold || heightThreshold) {
        console.clear()
        console.log(
          '%c⚠️ WARNING: Developer Tools Detected\n' +
          'This website is protected. Unauthorized access to source code is prohibited.',
          'color: #FF6B35; font-size: 16px; font-weight: bold;'
        )
      }
    }

    // Add event listeners
    document.addEventListener('contextmenu', handleContextMenu)
    document.addEventListener('keydown', handleKeyDown)
    disableSelection()

    // Check for DevTools periodically
    const devToolsInterval = setInterval(detectDevTools, 1000)

    // Watermark in console
    console.log(
      '%c© Josiah P. De Asis',
      'color: #0a2540; font-size: 12px; padding: 10px;'
    )

    // Cleanup
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu)
      document.removeEventListener('keydown', handleKeyDown)
      clearInterval(devToolsInterval)
    }
  }, [])

  return (
    <>
      {/* Invisible copyright watermark */}
      <div 
        style={{ 
          position: 'fixed', 
          bottom: 0, 
          right: 0, 
          opacity: 0, 
          pointerEvents: 'none',
          zIndex: -1
        }}
      >
        © 2024 Josiah P. De Asis. All Rights Reserved. Unauthorized copying prohibited.
      </div>
      
      {/* CSS-based protection */}
      <style jsx global>{`
        * {
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
        
        input, textarea {
          -webkit-user-select: text !important;
          -moz-user-select: text !important;
          -ms-user-select: text !important;
          user-select: text !important;
        }

        img {
          pointer-events: none;
          -webkit-user-drag: none;
          -khtml-user-drag: none;
          -moz-user-drag: none;
          -o-user-drag: none;
          user-drag: none;
        }
      `}</style>
    </>
  )
}
