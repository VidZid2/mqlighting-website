import { useState, useRef, useCallback } from 'react'

export function useVoiceChat() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const speak = useCallback(async (text: string) => {
    try {
      const startTime = performance.now()
      setIsLoading(true)

      // Stop any currently playing audio
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }

      console.log('🎤 Starting TTS for text length:', text.length)

      // Call text-to-speech API
      const fetchStart = performance.now()
      const response = await fetch('/api/text-to-speech', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      })
      const fetchEnd = performance.now()
      console.log(`⏱️ API call took: ${(fetchEnd - fetchStart).toFixed(0)}ms`)

      const data = await response.json()

      if (!response.ok || !data.audio) {
        console.error('TTS API failed or no audio returned:', data)
        // Fallback to browser TTS if API fails
        fallbackSpeak(text)
        setIsLoading(false)
        return
      }

      const audioDataReceived = performance.now()
      console.log(`✅ Audio data received in: ${(audioDataReceived - startTime).toFixed(0)}ms`)
      console.log(`📊 Audio size: ${(data.audio.length / 1024).toFixed(1)}KB`)

      // Create and configure audio with optimizations
      const audio = new Audio()
      audio.preload = 'auto' // Preload immediately
      audio.src = data.audio // Set source after preload
      audio.playbackRate = 1.15 // Speed up playback
      audioRef.current = audio

      // Set up event listeners
      audio.oncanplay = () => {
        const canPlayTime = performance.now()
        console.log(`🎵 Audio can play at: ${(canPlayTime - startTime).toFixed(0)}ms`)
        // Play as soon as it's ready
        audio.play().catch(() => {
          setIsLoading(false)
          setIsPlaying(false)
        })
      }

      audio.onplay = () => {
        const playTime = performance.now()
        console.log(`▶️ Audio started playing at: ${(playTime - startTime).toFixed(0)}ms`)
        console.log(`🚀 Total time to voice: ${(playTime - startTime).toFixed(0)}ms`)
        setIsPlaying(true)
        setIsLoading(false)
      }

      audio.onended = () => {
        setIsPlaying(false)
        audioRef.current = null
      }

      audio.onerror = () => {
        setIsPlaying(false)
        setIsLoading(false)
        fallbackSpeak(text)
      }

      // Load and auto-play when ready
      audio.load()
    } catch (error) {
      console.error('Error in text-to-speech:', error)
      setIsLoading(false)
      setIsPlaying(false)
      fallbackSpeak(text)
    }
  }, [])

  const fallbackSpeak = (text: string) => {
    // Use browser's built-in speech synthesis as fallback
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 1.15
      utterance.pitch = 0.85
      utterance.volume = 1

      utterance.onstart = () => setIsPlaying(true)
      utterance.onend = () => setIsPlaying(false)
      utterance.onerror = () => setIsPlaying(false)

      window.speechSynthesis.speak(utterance)
    }
  }

  const stop = useCallback(() => {
    // Stop ElevenLabs audio
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
    }

    // Stop browser TTS
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    }

    setIsPlaying(false)
    setIsLoading(false)
  }, [])

  return {
    speak,
    stop,
    isPlaying,
    isLoading,
  }
}
