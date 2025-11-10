import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json()

    console.log('TTS API called with text length:', text?.length)

    if (!text || typeof text !== 'string') {
      console.error('Invalid text provided to TTS API')
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      )
    }

    // Check if ElevenLabs API key is configured
    const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY

    if (!ELEVENLABS_API_KEY) {
      console.error('ELEVENLABS_API_KEY not configured')
      return NextResponse.json(
        { error: 'Text-to-speech service not configured', fallback: true },
        { status: 503 }
      )
    }

    const apiStartTime = Date.now()
    console.log('🎤 Using ElevenLabs API with voice Daniel, text length:', text.length)

    // Use ElevenLabs for natural voice (like Speechify)
    // Voice ID for "Daniel" - deep, authoritative male voice
    const VOICE_ID = 'onwK4e9ZLuTAKqWW03F9' // Daniel - deep, authoritative, clear
    
    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}?optimize_streaming_latency=3&output_format=mp3_22050_32`,
      {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': ELEVENLABS_API_KEY,
        },
        body: JSON.stringify({
          text: text,
          model_id: 'eleven_turbo_v2_5',
          voice_settings: {
            stability: 0.45,
            similarity_boost: 0.75,
            style: 0.3,
            use_speaker_boost: true
          }
        })
      }
    )
    
    const apiEndTime = Date.now()
    console.log(`⏱️ ElevenLabs API took: ${apiEndTime - apiStartTime}ms`)

    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ ElevenLabs API error - Status:', response.status)
      console.error('❌ Error details:', errorText)
      console.error('❌ Voice ID used:', VOICE_ID)
      console.error('❌ API Key (first 10 chars):', ELEVENLABS_API_KEY.substring(0, 10) + '...')
      throw new Error(`TTS API request failed: ${response.status} - ${errorText}`)
    }

    // Get audio as array buffer
    const audioBuffer = await response.arrayBuffer()
    console.log('Audio buffer received, size:', audioBuffer.byteLength, 'bytes')
    
    // Return audio as base64
    const base64Audio = Buffer.from(audioBuffer).toString('base64')
    console.log('Base64 audio generated, length:', base64Audio.length)
    
    return NextResponse.json({
      success: true,
      audio: `data:audio/mpeg;base64,${base64Audio}`,
      provider: 'elevenlabs'
    })

  } catch (error: any) {
    console.error('Text-to-speech error:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to generate speech',
        fallback: true // Signal to use browser TTS
      },
      { status: 500 }
    )
  }
}
