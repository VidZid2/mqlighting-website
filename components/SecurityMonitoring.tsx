'use client'

import { useEffect } from 'react'

export default function SecurityMonitoring() {
  useEffect(() => {
    // ==========================================
    // ACTIVITY LOGGING & MONITORING
    // ==========================================
    
    const logActivity = (activity: string, details?: any) => {
      const timestamp = new Date().toISOString()
      const userAgent = navigator.userAgent
      const screenSize = `${window.screen.width}x${window.screen.height}`
      const language = navigator.language
      
      const logEntry = {
        timestamp,
        activity,
        details,
        userAgent,
        screenSize,
        language,
        url: window.location.href,
        referrer: document.referrer,
      }
      
      // In production, you could send this to your analytics service
      console.log('🔍 Activity Logged:', logEntry)
      
      // Store in sessionStorage for tracking
      const logs = JSON.parse(sessionStorage.getItem('security_logs') || '[]')
      logs.push(logEntry)
      sessionStorage.setItem('security_logs', JSON.stringify(logs.slice(-50))) // Keep last 50
    }
    
    // ==========================================
    // TRACK ALL INTERACTIONS
    // ==========================================
    
    // Track page load
    logActivity('PAGE_LOAD', {
      performance: performance.timing.loadEventEnd - performance.timing.navigationStart
    })
    
    // Track mouse movements (bot detection)
    let mouseData = { movements: 0, clicks: 0 }
    document.addEventListener('mousemove', () => {
      mouseData.movements++
    })
    
    document.addEventListener('click', (e) => {
      mouseData.clicks++
      logActivity('CLICK', {
        x: e.clientX,
        y: e.clientY,
        target: (e.target as HTMLElement).tagName
      })
    })
    
    // Track keyboard (suspicious shortcuts)
    document.addEventListener('keydown', (e) => {
      const suspiciousKeys = ['F12', 'F5', 'PrintScreen']
      const suspiciousCombos = [
        e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C'),
        e.ctrlKey && e.key === 'U',
        e.ctrlKey && e.key === 'S',
        e.metaKey && e.shiftKey && (e.key === 'I' || e.key === 'J'),
      ]
      
      if (suspiciousKeys.includes(e.key) || suspiciousCombos.some(Boolean)) {
        logActivity('SUSPICIOUS_KEYPRESS', {
          key: e.key,
          ctrl: e.ctrlKey,
          shift: e.shiftKey,
          alt: e.altKey,
          meta: e.metaKey
        })
      }
    })
    
    // Track right-click attempts
    document.addEventListener('contextmenu', () => {
      logActivity('RIGHT_CLICK_ATTEMPT')
    })
    
    // Track text selection attempts
    document.addEventListener('selectionchange', () => {
      const selection = window.getSelection()
      if (selection && selection.toString().length > 10) {
        logActivity('TEXT_SELECTION', {
          length: selection.toString().length
        })
      }
    })
    
    // Track copy attempts
    document.addEventListener('copy', () => {
      logActivity('COPY_ATTEMPT')
    })
    
    // Track paste attempts
    document.addEventListener('paste', () => {
      logActivity('PASTE_ATTEMPT')
    })
    
    // Track window resize (devtools opening)
    let lastWidth = window.innerWidth
    let lastHeight = window.innerHeight
    
    window.addEventListener('resize', () => {
      const widthChange = Math.abs(window.innerWidth - lastWidth)
      const heightChange = Math.abs(window.innerHeight - lastHeight)
      
      // Significant resize might indicate devtools
      if (widthChange > 100 || heightChange > 100) {
        logActivity('WINDOW_RESIZE', {
          widthChange,
          heightChange,
          newSize: `${window.innerWidth}x${window.innerHeight}`
        })
      }
      
      lastWidth = window.innerWidth
      lastHeight = window.innerHeight
    })
    
    // Track visibility changes
    document.addEventListener('visibilitychange', () => {
      logActivity('VISIBILITY_CHANGE', {
        hidden: document.hidden
      })
    })
    
    // Track focus changes
    window.addEventListener('blur', () => {
      logActivity('WINDOW_BLUR')
    })
    
    window.addEventListener('focus', () => {
      logActivity('WINDOW_FOCUS')
    })
    
    // ==========================================
    // FINGERPRINTING FOR IDENTIFICATION
    // ==========================================
    
    const generateFingerprint = async () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.textBaseline = 'top'
        ctx.font = '14px Arial'
        ctx.fillText('MQGroup', 2, 2)
        const canvasData = canvas.toDataURL()
        
        const fingerprint = {
          canvas: canvasData.slice(0, 50),
          webgl: getWebGLFingerprint(),
          audio: await getAudioFingerprint(),
          fonts: getFontFingerprint(),
          plugins: getPluginsFingerprint(),
          screen: `${window.screen.width}x${window.screen.height}x${window.screen.colorDepth}`,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          language: navigator.language,
          platform: navigator.platform,
          hardwareConcurrency: navigator.hardwareConcurrency,
          deviceMemory: (navigator as any).deviceMemory,
          touchSupport: 'ontouchstart' in window,
        }
        
        logActivity('FINGERPRINT_GENERATED', fingerprint)
        return fingerprint
      }
    }
    
    const getWebGLFingerprint = () => {
      try {
        const canvas = document.createElement('canvas')
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
        if (gl && gl instanceof WebGLRenderingContext) {
          const debugInfo = gl.getExtension('WEBGL_debug_renderer_info')
          return {
            vendor: debugInfo ? gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) : '',
            renderer: debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : ''
          }
        }
      } catch (e) {
        return null
      }
    }
    
    const getAudioFingerprint = async () => {
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
        const oscillator = audioContext.createOscillator()
        const analyser = audioContext.createAnalyser()
        const gainNode = audioContext.createGain()
        const scriptProcessor = audioContext.createScriptProcessor(4096, 1, 1)
        
        gainNode.gain.value = 0
        oscillator.connect(analyser)
        analyser.connect(scriptProcessor)
        scriptProcessor.connect(gainNode)
        gainNode.connect(audioContext.destination)
        
        oscillator.start(0)
        
        return new Promise((resolve) => {
          scriptProcessor.addEventListener('audioprocess', function(event) {
            const output = event.outputBuffer.getChannelData(0)
            const hash = Array.from(output.slice(0, 30)).reduce((a, b) => a + Math.abs(b), 0)
            oscillator.stop()
            scriptProcessor.disconnect()
            resolve(hash.toString())
          })
        })
      } catch (e) {
        return null
      }
    }
    
    const getFontFingerprint = () => {
      const baseFonts = ['monospace', 'sans-serif', 'serif']
      const testFonts = [
        'Arial', 'Verdana', 'Times New Roman', 'Courier New', 
        'Georgia', 'Palatino', 'Garamond', 'Comic Sans MS'
      ]
      
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      if (!ctx) return []
      
      const detectedFonts: string[] = []
      
      testFonts.forEach(font => {
        ctx.font = `72px "${font}", ${baseFonts[0]}`
        ctx.fillText('MQGroup', 0, 0)
        const baselineData = canvas.toDataURL()
        
        baseFonts.forEach(baseFont => {
          ctx.clearRect(0, 0, canvas.width, canvas.height)
          ctx.font = `72px "${font}", ${baseFont}`
          ctx.fillText('MQGroup', 0, 0)
          if (canvas.toDataURL() !== baselineData) {
            detectedFonts.push(font)
          }
        })
      })
      
      return detectedFonts
    }
    
    const getPluginsFingerprint = () => {
      return Array.from(navigator.plugins).map(p => p.name)
    }
    
    // Generate fingerprint on load
    generateFingerprint()
    
    // ==========================================
    // PERIODIC SECURITY CHECK
    // ==========================================
    
    const securityCheck = () => {
      const logs = JSON.parse(sessionStorage.getItem('security_logs') || '[]')
      const suspiciousActivities = logs.filter((log: any) => 
        log.activity.includes('SUSPICIOUS') || 
        log.activity.includes('ATTEMPT')
      )
      
      if (suspiciousActivities.length > 5) {
        logActivity('SUSPICIOUS_BEHAVIOR_DETECTED', {
          count: suspiciousActivities.length,
          activities: suspiciousActivities.slice(-5)
        })
      }
      
      // Check for bot-like behavior
      if (mouseData.movements < 10 && mouseData.clicks < 2) {
        logActivity('POSSIBLE_BOT_DETECTED', mouseData)
      }
    }
    
    // Run security check every 30 seconds
    const checkInterval = setInterval(securityCheck, 30000)
    
    // Cleanup
    return () => {
      clearInterval(checkInterval)
    }
  }, [])
  
  return null
}
