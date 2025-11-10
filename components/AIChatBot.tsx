'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Sparkles, Volume2, VolumeX } from 'lucide-react'
import { PlaceholdersAndVanishInput } from '@/components/ui/placeholders-and-vanish-input'
import { useVoiceChat } from '@/hooks/useVoiceChat'

interface Message {
  id: string
  text: string
  isBot: boolean
  timestamp: Date
  isSending?: boolean
  isError?: boolean
  canRetry?: boolean
}

// Component to format message content with bullets and bold text
function MessageContent({ text, isBot }: { text: string; isBot: boolean }) {
  const formatText = (content: string) => {
    const lines = content.split('\n')
    
    return lines.map((line, index) => {
      // Handle bullet points (• or -)
      if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
        const bulletText = line.replace(/^[•\-]\s*/, '')
        return (
          <li key={index} className="ml-1 mb-2 leading-relaxed flex items-start gap-2">
            <span className="text-[#0a2540] mt-0.5">•</span>
            <span className="flex-1">{formatInlineText(bulletText)}</span>
          </li>
        )
      }
      
      // Regular line
      if (line.trim()) {
        return (
          <p key={index} className="mb-2 leading-relaxed last:mb-0">
            {formatInlineText(line)}
          </p>
        )
      }
      
      // Empty line creates spacing
      return <div key={index} className="h-1"></div>
    })
  }

  const formatInlineText = (text: string) => {
    // Split by emojis and bold patterns
    const parts = text.split(/(\*\*[^*]+\*\*|__[^_]+__|[^\s]+:\s)/g)
    
    return parts.map((part, idx) => {
      // Bold text (**text** or __text__)
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={idx} className="font-semibold text-gray-900">{part.slice(2, -2)}</strong>
      }
      if (part.startsWith('__') && part.endsWith('__')) {
        return <strong key={idx} className="font-semibold text-gray-900">{part.slice(2, -2)}</strong>
      }
      
      // Labels (text:)
      if (part.endsWith(':') && part.split(' ').length === 1) {
        return <strong key={idx} className="font-semibold text-gray-900">{part}</strong>
      }
      
      return <span key={idx}>{part}</span>
    })
  }

  const hasBullets = text.includes('•') || text.split('\n').some(line => line.trim().startsWith('-'))

  return (
    <div className={`${isBot ? 'text-[13px]' : 'text-[14px]'} ${isBot ? 'text-gray-700' : 'text-white'} font-normal leading-[1.6]`}>
      {hasBullets ? (
        <ul className="list-none space-y-0">{formatText(text)}</ul>
      ) : (
        <div>{formatText(text)}</div>
      )}
    </div>
  )
}

export default function AIChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [voiceEnabled, setVoiceEnabled] = useState(false)
  const [rateLimited, setRateLimited] = useState(false)
  const [isButtonVisible, setIsButtonVisible] = useState(true)
  const lastRequestTime = useRef<number>(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { speak, stop, isPlaying, isLoading } = useVoiceChat()

  const placeholders = [
    "Ask me about cameras and equipment...",
    "What lighting do you need?",
    "Looking for audio systems?",
    "Need a rental quote?",
    "Tell me about your project...",
    "Which brands interest you?",
  ]

  // Mouse proximity detection
  useEffect(() => {
    // Check if device has touch (mobile/tablet) - always show button on touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    
    if (isTouchDevice) {
      setIsButtonVisible(true)
      return
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (isOpen) {
        setIsButtonVisible(true) // Keep button visible when chat is open
        return
      }
      
      const threshold = 200 // Distance in pixels to trigger visibility
      const windowWidth = window.innerWidth
      const windowHeight = window.innerHeight
      
      // Calculate distance from cursor to bottom-right corner
      const distanceX = windowWidth - e.clientX
      const distanceY = windowHeight - e.clientY
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)
      
      setIsButtonVisible(distance < threshold)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [isOpen])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addBotMessage(
        "👋 Hi! I'm **MQ Assistant**, powered by **Groq Llama 3.3**.\n\nI can help with:\n\n• 📹 **Equipment Recommendations** - Cameras, lenses, lighting\n• 🔍 **Product Comparisons** - Compare brands and models\n• 💰 **Quotes & Pricing** - Rental and purchase options\n• 🎯 **Project Setup** - Complete system solutions\n\nWhat do you need?"
      )
    }
  }, [isOpen])

  const addBotMessage = (text: string) => {
    setIsTyping(true)
    setTimeout(() => {
      const newMessage: Message = {
        id: Date.now().toString(),
        text,
        isBot: true,
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, newMessage])
      setIsTyping(false)
    }, 1000)
  }

  const addUserMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot: false,
      timestamp: new Date(),
    }
    setMessages(prev => [...prev, newMessage])
  }


  const getAIResponse = async (input: string, history: Message[], retryCount = 0): Promise<{ success: boolean; message: string }> => {
    const maxRetries = 2
    
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 30000) // 30 second timeout

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: input,
          history: history.map(msg => ({
            role: msg.isBot ? 'assistant' : 'user',
            content: msg.text,
          })),
        }),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error('RATE_LIMIT')
        } else if (response.status >= 500) {
          throw new Error('SERVER_ERROR')
        } else {
          throw new Error('API_ERROR')
        }
      }

      const data = await response.json()
      return { 
        success: true, 
        message: data.response || 'I apologize, but I received an empty response. Please try again.' 
      }
    } catch (error: any) {
      console.error('Error calling AI:', error)
      
      // Handle timeout
      if (error.name === 'AbortError') {
        if (retryCount < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, 1000 * (retryCount + 1)))
          return getAIResponse(input, history, retryCount + 1)
        }
        return { 
          success: false, 
          message: "⏱️ Request timed out. The AI is taking longer than usual. Please try again." 
        }
      }
      
      // Handle rate limiting
      if (error.message === 'RATE_LIMIT') {
        return { 
          success: false, 
          message: "⚠️ Too many requests detected. Our AI service has usage limits.\n\n• Please wait 30-60 seconds before trying again\n• Consider spacing out your questions\n• If this persists, the daily quota may be reached\n\nThank you for your patience!" 
        }
      }
      
      // Handle server errors with retry
      if (error.message === 'SERVER_ERROR' && retryCount < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, 1000 * (retryCount + 1)))
        return getAIResponse(input, history, retryCount + 1)
      }
      
      // Handle network errors
      if (error.message === 'Failed to fetch' || !navigator.onLine) {
        return { 
          success: false, 
          message: "📡 No internet connection. Please check your network and try again." 
        }
      }
      
      // Generic error with retry option
      return { 
        success: false, 
        message: "❌ I encountered an error connecting to the AI service. Click 'Retry' to try again, or ask your question differently." 
      }
    }
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    // Check rate limiting (minimum 3 seconds between requests)
    const now = Date.now()
    const timeSinceLastRequest = now - lastRequestTime.current
    const minDelay = 3000 // 3 seconds

    if (timeSinceLastRequest < minDelay) {
      const waitTime = Math.ceil((minDelay - timeSinceLastRequest) / 1000)
      const errorMessage: Message = {
        id: Date.now().toString(),
        text: `⏱️ Please wait ${waitTime} second${waitTime > 1 ? 's' : ''} before sending another message. This helps prevent rate limiting.`,
        isBot: true,
        timestamp: new Date(),
        isError: true,
      }
      setMessages(prev => [...prev, errorMessage])
      return
    }

    lastRequestTime.current = now

    const userMessage = inputValue
    const messageId = Date.now().toString()
    
    // Add message with sending state
    const sendingMessage: Message = {
      id: messageId,
      text: userMessage,
      isBot: false,
      timestamp: new Date(),
      isSending: true,
    }
    setMessages(prev => [...prev, sendingMessage])
    // Note: PlaceholdersAndVanishInput handles clearing its own value

    // Simulate sending delay (realistic feel)
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === messageId ? { ...msg, isSending: false } : msg
        )
      )
    }, 500)

    // Get AI response
    const result = await getAIResponse(userMessage, messages)
    
    // Add bot message immediately
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: result.message,
      isBot: true,
      timestamp: new Date(),
      isError: !result.success,
      canRetry: !result.success,
    }
    
    // Show typing briefly then display message
    setIsTyping(true)
    setTimeout(() => {
      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
      
      // Start voice immediately when message appears
      if (voiceEnabled && result.success) {
        speak(result.message)
      }
    }, 300)
    
    // Clear input value for next message
    setInputValue('')
  }

  const handleRetry = async (messageId: string) => {
    // Find the failed message
    const failedMessageIndex = messages.findIndex(msg => msg.id === messageId)
    if (failedMessageIndex === -1) return

    // Find the user message that triggered this response
    const userMessage = messages[failedMessageIndex - 1]
    if (!userMessage || userMessage.isBot) return

    // Remove the failed message
    setMessages(prev => prev.filter(msg => msg.id !== messageId))

    // Retry the AI call
    const result = await getAIResponse(userMessage.text, messages.slice(0, failedMessageIndex - 1))
    
    // Add new bot message
    const botMessage: Message = {
      id: Date.now().toString(),
      text: result.message,
      isBot: true,
      timestamp: new Date(),
      isError: !result.success,
      canRetry: !result.success,
    }
    
    setIsTyping(true)
    setTimeout(() => {
      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
      
      // Start voice immediately when message appears
      if (voiceEnabled && result.success) {
        speak(result.message)
      }
    }, 300)
  }

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: isButtonVisible ? 1 : 0,
              opacity: isButtonVisible ? 1 : 0,
              transition: { 
                duration: 0.3,
                ease: [0.34, 1.56, 0.64, 1]
              }
            }}
            exit={{ 
              scale: 0, 
              opacity: 0,
              transition: { duration: 0.2 }
            }}
            whileHover={{ 
              scale: 1.08,
              boxShadow: "0 20px 60px -10px rgba(10, 37, 64, 0.3)",
              transition: { duration: 0.2, ease: "easeOut" }
            }}
            whileTap={{ 
              scale: 0.95,
              transition: { duration: 0.1, ease: "easeInOut" }
            }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center z-50 transition-all duration-200 ease-out hover:bg-gray-50"
            style={{ pointerEvents: isButtonVisible ? 'auto' : 'none' }}
          >
            <lord-icon
              src="https://cdn.lordicon.com/bpptgtfr.json"
              trigger="hover"
              colors="primary:#0a2540"
              style={{ width: '36px', height: '36px' }}
            ></lord-icon>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 w-[440px] h-[650px] bg-[#0a2540] rounded-xl shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#0a2540] to-[#0d2f54] p-4 flex items-center justify-between rounded-t-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-[#0a2540]" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">MQ Assistant</h3>
                  <p className="text-gray-300 text-xs flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    {isPlaying && voiceEnabled ? 'Speaking...' : 'Online • AI Powered'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {/* Voice Toggle */}
                <button
                  onClick={() => {
                    setVoiceEnabled(!voiceEnabled)
                    if (voiceEnabled) stop() // Stop speaking if disabling
                  }}
                  className="text-white/70 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg relative"
                  title={voiceEnabled ? "Voice enabled" : "Voice disabled"}
                >
                  {voiceEnabled ? (
                    <>
                      <Volume2 className="w-5 h-5" />
                      {(isPlaying || isLoading) && (
                        <span className="absolute top-1 right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                      )}
                    </>
                  ) : (
                    <VolumeX className="w-5 h-5" />
                  )}
                </button>
                
                {/* Close Button */}
                <button
                  onClick={() => {
                    setIsOpen(false)
                    stop() // Stop any playing voice
                  }}
                  className="text-white/70 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-lg"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 pb-0 bg-gray-50">
              <div className="space-y-3 pb-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.isBot ? 'flex-row items-start gap-2' : 'flex-col items-end'} gap-1`}
                  >
                    {message.isBot && (
                      <div className="w-8 h-8 rounded-full bg-[#0a2540] flex items-center justify-center flex-shrink-0 mt-5">
                        <Sparkles className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <div className="flex flex-col gap-1 flex-1">
                      {message.isBot && (
                        <span className="text-[12px] font-semibold text-gray-700 px-1">MQ Assistant</span>
                      )}
                      <div>
                        <div
                          className={`${
                            message.isBot 
                              ? `rounded-lg px-4 py-3 bg-white text-gray-800 shadow-sm ${message.isError ? 'border-2 border-red-300' : ''}` 
                              : 'rounded-lg px-4 py-3 bg-[#0a2540] text-white shadow-sm inline-block'
                          } ${message.isSending ? 'opacity-60' : 'opacity-100'} transition-opacity`}
                        >
                          <MessageContent text={message.text} isBot={message.isBot} />
                          <div className={`text-[10px] mt-2 flex items-center gap-1 ${message.isBot ? 'text-gray-400' : 'text-white/70'}`}>
                            {message.timestamp.toLocaleTimeString('en-US', { 
                              hour: '2-digit', 
                              minute: '2-digit',
                              hour12: true 
                            })}
                            {message.isSending && !message.isBot && (
                              <span className="italic text-white/50">• Sending...</span>
                            )}
                          </div>
                        </div>
                        {/* Retry button for errors */}
                        {message.canRetry && message.isError && (
                          <button
                            onClick={() => handleRetry(message.id)}
                            className="mt-2 text-xs bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-md transition-colors flex items-center gap-1"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Retry
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-row items-start gap-2"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#0a2540] flex items-center justify-center flex-shrink-0 mt-5">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[12px] font-semibold text-gray-700 px-1">MQ Assistant</span>
                      <div className="bg-white rounded-lg px-4 py-3 shadow-sm">
                        <span className="text-gray-500 text-[13px] italic">Typing...</span>
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input - Sticky at bottom */}
            <div className="p-4 bg-gray-50">
              <PlaceholdersAndVanishInput
                placeholders={placeholders}
                onChange={(e) => setInputValue(e.target.value)}
                onSubmit={handleSendMessage}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
