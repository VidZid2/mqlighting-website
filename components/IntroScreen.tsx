'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { TextAnimate } from '@/components/ui/text-animate'
import { SparklesText } from '@/components/ui/sparkles-text'
import { TypingAnimation } from '@/components/ui/typing-animation'
import { SmoothCursor } from '@/components/ui/smooth-cursor'
import { useDeviceDetection } from '@/hooks/useDeviceDetection'

interface IntroScreenProps {
  onComplete: () => void
}

export default function IntroScreen({ onComplete }: IntroScreenProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [showText, setShowText] = useState(false)
  const [showButton, setShowButton] = useState(false)
  const [isVoicePlaying, setIsVoicePlaying] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const hasPlayedRef = useRef(false)
  
  // Performance optimization: detect device type
  const { isLowPerformance } = useDeviceDetection()

  // Non-camera showcase images
  const showcaseImages = [
    '/System Integration.png',
    '/Innovative Turnkey Solutions.png',
    '/Technical Repair.png',
    '/Product Training.png',
    '/Corrective Maintenance.png'
  ]

  const introText = "Welcome to MQ Group. Your premier destination for professional lighting and studio equipment in the Philippines. Established in 1987, we've been the nation's leading distributor for over 37 years. We proudly partner with ARRI, Kino Flo, ETC, and more, delivering cutting-edge technology. Our services: system integration, technical design, installation, repair, maintenance, and training. Trusted by TV networks, film production houses, theaters, and corporate facilities nationwide. Excellence backed by decades of expertise."

  const fallbackSpeak = (text: string) => {
    console.log('🔊 Using browser TTS fallback...')
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 1.15
      utterance.pitch = 0.85
      utterance.volume = 1

      utterance.onstart = () => {
        setIsVoicePlaying(true)
        console.log('▶️ Browser TTS playing...')
      }
      
      utterance.onend = () => {
        setIsVoicePlaying(false)
        console.log('✅ Browser TTS completed')
        setTimeout(() => {
          setShowButton(true)
        }, 500)
      }
      
      utterance.onerror = () => {
        setIsVoicePlaying(false)
        setShowButton(true)
      }

      window.speechSynthesis.speak(utterance)
    } else {
      // No TTS available, just show button
      setShowButton(true)
    }
  }

  const playVoiceOver = async () => {
    // Prevent multiple calls
    if (hasPlayedRef.current) {
      console.log('⚠️ Voice-over already initiated')
      return
    }
    
    hasPlayedRef.current = true
    console.log('🎤 Initiating voice-over...')

    try {
      setIsVoicePlaying(true)
      console.log('🎙️ Trying ElevenLabs API...')
      
      const response = await fetch('/api/text-to-speech', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: introText }),
      })

      const data = await response.json()

      if (response.ok && data.audio) {
        console.log('✅ ElevenLabs API successful, provider:', data.provider)
        const audio = new Audio(data.audio)
        audio.playbackRate = 1.1
        audioRef.current = audio

        audio.onended = () => {
          console.log('✅ ElevenLabs voice-over completed')
          setIsVoicePlaying(false)
          audioRef.current = null
          setTimeout(() => {
            setShowButton(true)
          }, 500)
        }

        audio.onerror = (e) => {
          console.error('❌ Audio playback error:', e)
          console.error('❌ Falling back to browser TTS')
          setIsVoicePlaying(false)
          audioRef.current = null
          fallbackSpeak(introText)
        }

        await audio.play()
        console.log('▶️ ElevenLabs voice playing...')
      } else {
        // API failed (quota exceeded or other error), use fallback
        console.error('❌ ElevenLabs API failed with status:', response.status)
        console.error('❌ Response data:', data)
        console.warn('⚠️ Using browser TTS fallback')
        setIsVoicePlaying(false)
        fallbackSpeak(introText)
      }
    } catch (error) {
      console.error('❌ Voice-over error:', error)
      console.log('🔄 Falling back to browser TTS...')
      setIsVoicePlaying(false)
      fallbackSpeak(introText)
    }
  }

  // Image rotation effect - slower on low-performance devices
  useEffect(() => {
    if (!showText) return
    
    const intervalTime = isLowPerformance ? 6000 : 4000 // Slower on mobile
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % showcaseImages.length)
    }, intervalTime)
    
    return () => clearInterval(interval)
  }, [showText, showcaseImages.length, isLowPerformance])

  useEffect(() => {
    let isMounted = true
    
    // Animation sequence
    const sequence = async () => {
      if (!isMounted) return
      
      console.log('🎬 Starting intro sequence...')
      
      // Step 1: Wait a moment before showing content
      await new Promise(resolve => setTimeout(resolve, 800))
      
      if (!isMounted) return
      // Step 2: Show card and text content
      setShowText(true)
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      if (!isMounted) return
      // Step 3: Start voice-over
      await playVoiceOver()
    }
    
    sequence()
    
    // Cleanup function to prevent issues on unmount
    return () => {
      isMounted = false
      if (audioRef.current) {
        console.log('🧹 Cleaning up audio on unmount')
        audioRef.current.pause()
        audioRef.current = null
      }
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel()
      }
    }
  }, []) // Empty deps array - runs only once

  const handleContinue = () => {
    // Stop audio if playing
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
    }
    // Stop browser TTS if playing
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    }
    setIsVoicePlaying(false)
    
    setIsVisible(false)
    // Wait for animation to complete before calling onComplete
    setTimeout(() => {
      onComplete()
    }, 800)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-white flex items-center justify-center overflow-hidden custom-cursor-page"
        >
          {/* Smooth Custom Cursor */}
          <SmoothCursor />

          {/* Content Container */}
          <div className="relative w-full h-full flex items-center justify-center">
            
            <AnimatePresence>
              {showText && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="flex items-stretch w-full h-screen"
                >
                  {/* Left Side - Full Height Image with Testimonial Overlay */}
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="w-[60%] relative h-full will-change-transform"
                  >
                    {/* Background Image Slideshow - Blur only on high-performance devices */}
                    <div className="absolute inset-0">
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={currentImageIndex}
                          src={showcaseImages[currentImageIndex]}
                          alt="MQ Group Services"
                          className="w-full h-full object-cover will-change-[opacity,filter]"
                          initial={{ 
                            opacity: 0, 
                            filter: isLowPerformance ? 'blur(0px)' : 'blur(10px)' 
                          }}
                          animate={{ opacity: 1, filter: 'blur(0px)' }}
                          exit={{ 
                            opacity: 0, 
                            filter: isLowPerformance ? 'blur(0px)' : 'blur(10px)' 
                          }}
                          transition={{ duration: isLowPerformance ? 0.6 : 1 }}
                        />
                      </AnimatePresence>
                    </div>

                    {/* Testimonial Content at Bottom with Gradient Behind */}
                    <div className="absolute bottom-0 left-0 right-0 h-[55vh]">
                      {/* Smooth White Gradient Fade - Starts higher, white closer to text */}
                      <div className="absolute inset-0 bg-gradient-to-t from-white from-35% via-white/90 via-60% to-transparent"></div>
                      
                      {/* Testimonial Text */}
                      <div className="relative px-16 pb-12 pt-8 space-y-8 flex flex-col justify-end h-full">
                      {/* Quote */}
                      <TextAnimate
                        animation="blurInUp"
                        by="character"
                        once
                        delay={0.6}
                        duration={1.5}
                        className="text-lg text-gray-800 leading-relaxed max-w-2xl"
                      >
                        "Every single one of our clients experiences world-class service and cutting-edge technology that transforms their productions."
                      </TextAnimate>

                      {/* MQ Logo and Info */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="flex items-center gap-6"
                      >
                        {/* Large MQ Logo */}
                        <div className="relative w-32 h-20 flex-shrink-0">
                          <Image
                            src="/MQ-logo-colored.png"
                            alt="MQ Group"
                            fill
                            className="object-contain"
                          />
                        </div>
                        <div>
                          <p className="text-base font-bold text-gray-900">MQ Group</p>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">Established 1987</span>
                          </div>
                        </div>
                      </motion.div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Right Side - Content */}
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="w-[40%] flex items-center justify-center px-16 py-16 will-change-transform"
                  >
                    <div className="max-w-lg w-full space-y-8">
                      {/* Title */}
                      <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-5xl font-bold leading-tight flex items-center gap-3"
                      >
                        <SparklesText
                          colors={{ first: "#f7941d", second: "#000000" }}
                          className="text-5xl font-bold text-[#f7941d]"
                          sparklesCount={isLowPerformance ? 3 : 8}
                        >
                          Welcome
                        </SparklesText>
                        <span className="text-[#f7941d]">to</span>{' '}
                        <span className="text-black">MQ</span>
                      </motion.h1>

                      {/* Description with Typing Animation */}
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="text-base text-gray-700 leading-relaxed"
                      >
                        <TypingAnimation
                          typeSpeed={isLowPerformance ? 50 : 30}
                          delay={800}
                          showCursor={false}
                          className="text-base text-gray-700 leading-relaxed whitespace-pre-line"
                        >
                          {`Established in 1987, we've been the nation's leading distributor for over 37 years.

We proudly partner with ARRI, Kino Flo, ETC, and more, delivering cutting-edge technology to the Philippine market.

Our comprehensive services include system integration, technical design, installation, repair, maintenance, and training.

Trusted by TV networks, film production houses, theaters, and corporate facilities nationwide.

Excellence backed by decades of expertise.`}
                        </TypingAnimation>
                      </motion.div>

                      {/* Voice Indicator */}
                      {isVoicePlaying && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex items-center gap-2 text-emerald-600"
                        >
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className="w-2 h-2 bg-emerald-600 rounded-full"
                          />
                          <span className="text-sm font-medium">Playing introduction...</span>
                        </motion.div>
                      )}

                      {/* Continue Button - Only shows after voice ends */}
                      <AnimatePresence>
                        {showButton && (
                          <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            whileHover={{ 
                              scale: 1.02,
                              backgroundColor: "#0a1f3d"
                            }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleContinue}
                            className="group relative px-10 py-3 bg-[#0a2540] text-white font-medium text-base rounded-lg border border-[#1e3a5f] hover:border-[#2d4a6f] transition-all duration-300"
                          >
                            <span className="relative z-10 flex items-center gap-2">
                              Continue
                              <svg
                                className="w-4 h-4 transition-transform group-hover:translate-x-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </span>
                          </motion.button>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
