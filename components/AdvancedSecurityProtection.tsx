'use client'

import { useEffect, useRef } from 'react'

export default function AdvancedSecurityProtection() {
  const integrityCheckInterval = useRef<NodeJS.Timeout>()
  const debugCheckInterval = useRef<NodeJS.Timeout>()
  const consoleCheckInterval = useRef<NodeJS.Timeout>()

  useEffect(() => {
    // ==========================================
    // 1. ADVANCED ANTI-DEBUGGING
    // ==========================================
    
    const detectDebugger = () => {
      const start = performance.now()
      debugger // This line will pause if DevTools is open
      const end = performance.now()
      
      // If execution took more than 100ms, debugger was triggered
      if (end - start > 100) {
        console.clear()
        document.body.innerHTML = `
          <div style="
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background: #0a2540;
            color: white;
            font-family: Arial, sans-serif;
            text-align: center;
            flex-direction: column;
          ">
            <h1 style="font-size: 48px; margin-bottom: 20px;">⚠️ Access Denied</h1>
            <p style="font-size: 20px; margin-bottom: 30px;">
              Developer tools detected.<br>
              This website is protected by copyright law.
            </p>
            <p style="font-size: 16px; color: #FF6B35;">
              © ${new Date().getFullYear()} Josiah P. De Asis. All Rights Reserved.
            </p>
          </div>
        `
        throw new Error('Debugger detected')
      }
    }

    // ==========================================
    // 2. CONSOLE OVERRIDE & PROTECTION
    // ==========================================
    
    const protectConsole = () => {
      // Save original console methods
      const originalLog = console.log
      const originalWarn = console.warn
      const originalError = console.error
      
      // Override console to show warnings
      console.log = (...args) => {
        originalLog('%c⚠️ STOP! Console access is monitored.', 
          'color: #FF6B35; font-size: 24px; font-weight: bold;')
        originalLog(...args)
      }
      
      console.warn = (...args) => {
        originalWarn('%c⚠️ Unauthorized console access detected.', 
          'color: #FF6B35; font-size: 18px;')
        originalWarn(...args)
      }
      
      console.error = (...args) => {
        originalError('%c🚫 This action has been logged.', 
          'color: red; font-size: 18px;')
        originalError(...args)
      }
    }

    // ==========================================
    // 3. ADVANCED DEVTOOLS DETECTION
    // ==========================================
    
    const detectDevTools = () => {
      const widthThreshold = window.outerWidth - window.innerWidth > 160
      const heightThreshold = window.outerHeight - window.innerHeight > 160
      const orientation = widthThreshold ? 'vertical' : 'horizontal'
      
      if (widthThreshold || heightThreshold) {
        console.clear()
        
        // More aggressive - blur content
        document.body.style.filter = 'blur(8px)'
        document.body.style.pointerEvents = 'none'
        document.body.style.userSelect = 'none'
        
        // Show warning overlay
        const existingOverlay = document.getElementById('devtools-warning')
        if (!existingOverlay) {
          const overlay = document.createElement('div')
          overlay.id = 'devtools-warning'
          overlay.innerHTML = `
            <div style="
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: rgba(10, 37, 64, 0.98);
              z-index: 999999;
              display: flex;
              justify-content: center;
              align-items: center;
              flex-direction: column;
              color: white;
              font-family: Arial, sans-serif;
              text-align: center;
            ">
              <div style="max-width: 600px; padding: 40px;">
                <h1 style="font-size: 48px; margin-bottom: 20px; color: #FF6B35;">⚠️ WARNING</h1>
                <h2 style="font-size: 28px; margin-bottom: 30px;">Developer Tools Detected</h2>
                <p style="font-size: 18px; line-height: 1.6; margin-bottom: 20px;">
                  This website's content is protected by Philippine Copyright Law (RA 8293) 
                  and international copyright treaties.
                </p>
                <p style="font-size: 16px; line-height: 1.6; margin-bottom: 30px; color: #ccc;">
                  Unauthorized access to source code, copying, reproduction, or reverse engineering 
                  is strictly prohibited and constitutes intellectual property theft.
                </p>
                <p style="font-size: 14px; color: #FF6B35; font-weight: bold;">
                  Your IP address and activity are being logged.
                </p>
                <p style="font-size: 14px; margin-top: 30px; color: #888;">
                  Close Developer Tools to continue browsing.
                </p>
                <p style="font-size: 12px; margin-top: 20px; color: #666;">
                  © ${new Date().getFullYear()} Josiah P. De Asis. All Rights Reserved.
                </p>
              </div>
            </div>
          `
          document.body.appendChild(overlay)
        }
        
        return true
      } else {
        // DevTools closed - restore
        document.body.style.filter = 'none'
        document.body.style.pointerEvents = 'auto'
        const overlay = document.getElementById('devtools-warning')
        if (overlay) overlay.remove()
        return false
      }
    }

    // ==========================================
    // 4. DOM INTEGRITY CHECK
    // ==========================================
    
    let originalHTML = ''
    const checkDOMIntegrity = () => {
      if (!originalHTML) {
        originalHTML = document.body.innerHTML
        return
      }
      
      // Check if someone modified critical elements
      const criticalElements = document.querySelectorAll('[data-protected]')
      if (criticalElements.length === 0) {
        console.warn('⚠️ DOM tampering detected. Reloading...')
        // Could reload page here, but might be annoying
      }
    }

    // ==========================================
    // 5. SCREENSHOT DETECTION
    // ==========================================
    
    const detectScreenshot = () => {
      // Detect print screen key
      document.addEventListener('keyup', (e) => {
        if (e.key === 'PrintScreen') {
          navigator.clipboard.writeText('')
          console.warn('⚠️ Screenshot attempt detected and cleared.')
        }
      })
      
      // Detect Ctrl+P (print)
      document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
          e.preventDefault()
          console.warn('⚠️ Print attempt blocked.')
          return false
        }
      })
    }

    // ==========================================
    // 6. WATERMARK INJECTION
    // ==========================================
    
    const injectWatermark = () => {
      // Create invisible watermark
      const watermark = document.createElement('div')
      watermark.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 72px;
        color: rgba(255, 107, 53, 0.03);
        pointer-events: none;
        z-index: 1;
        white-space: nowrap;
        user-select: none;
        font-weight: bold;
      `
      watermark.textContent = `© JOSIAH P. DE ASIS ${new Date().getFullYear()}`
      document.body.appendChild(watermark)
      
      // Add metadata watermark
      const meta = document.createElement('meta')
      meta.name = 'copyright'
      meta.content = `© ${new Date().getFullYear()} Josiah P. De Asis. All Rights Reserved. ID: ${Date.now()}`
      document.head.appendChild(meta)
    }

    // ==========================================
    // 7. PERFORMANCE TIMING CHECK
    // ==========================================
    
    const checkPerformance = () => {
      const timing = performance.timing
      const loadTime = timing.loadEventEnd - timing.navigationStart
      
      // If page loaded suspiciously fast, might be a scraper
      if (loadTime < 100) {
        console.warn('⚠️ Suspicious activity detected.')
      }
    }

    // ==========================================
    // 8. USER AGENT CHECK
    // ==========================================
    
    const checkUserAgent = () => {
      const ua = navigator.userAgent.toLowerCase()
      const suspiciousPatterns = [
        'bot', 'crawler', 'spider', 'scraper', 'curl', 'wget', 
        'python', 'phantom', 'headless', 'selenium'
      ]
      
      for (const pattern of suspiciousPatterns) {
        if (ua.includes(pattern)) {
          console.warn('⚠️ Automated tool detected.')
          return true
        }
      }
      return false
    }

    // ==========================================
    // 9. MOUSE MOVEMENT TRACKING
    // ==========================================
    
    let mouseMovements = 0
    let mouseTimer: NodeJS.Timeout
    
    const trackMouse = () => {
      document.addEventListener('mousemove', () => {
        mouseMovements++
        clearTimeout(mouseTimer)
        
        // Reset counter after 5 seconds
        mouseTimer = setTimeout(() => {
          mouseMovements = 0
        }, 5000)
      })
      
      // Check if movements are too perfect (bot-like)
      setInterval(() => {
        if (mouseMovements === 0) {
          console.warn('⚠️ No human interaction detected.')
        }
      }, 10000)
    }

    // ==========================================
    // 10. VISIBILITY CHANGE DETECTION
    // ==========================================
    
    const trackVisibility = () => {
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          console.clear()
          console.log('%c👀 Tab hidden - Protection active', 'color: #FF6B35; font-size: 14px;')
        }
      })
    }

    // ==========================================
    // INITIALIZE ALL PROTECTIONS
    // ==========================================
    
    // Initial setup
    protectConsole()
    detectScreenshot()
    injectWatermark()
    checkPerformance()
    checkUserAgent()
    trackMouse()
    trackVisibility()
    
    // Show initial warning
    console.clear()
    console.log(
      '%c🛡️ PROTECTED WEBSITE',
      'color: #FF6B35; font-size: 40px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);'
    )
    console.log(
      '%c⚠️ WARNING: This website is protected by law.\n' +
      'Unauthorized copying, reproduction, or distribution is prohibited.\n' +
      'All activities are monitored and logged.\n\n' +
      '© ' + new Date().getFullYear() + ' Josiah P. De Asis. All Rights Reserved.',
      'color: white; font-size: 14px; line-height: 1.8;'
    )
    
    // Periodic checks
    debugCheckInterval.current = setInterval(detectDebugger, 1000)
    integrityCheckInterval.current = setInterval(checkDOMIntegrity, 5000)
    consoleCheckInterval.current = setInterval(detectDevTools, 1000)
    
    // Cleanup
    return () => {
      if (debugCheckInterval.current) clearInterval(debugCheckInterval.current)
      if (integrityCheckInterval.current) clearInterval(integrityCheckInterval.current)
      if (consoleCheckInterval.current) clearInterval(consoleCheckInterval.current)
    }
  }, [])

  return null
}
