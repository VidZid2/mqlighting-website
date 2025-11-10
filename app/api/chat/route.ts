import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';

// Initialize Groq API
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || '',
});

// Enhanced System prompt with AI capabilities
const SYSTEM_PROMPT = `You are MQ Assistant, an advanced AI powered by Groq Llama 3.3, specialized for MQ Group - the leading distributor of professional audio, video, and lighting equipment in the Philippines since 1987.

## YOUR UNIQUE AI 2.0 CAPABILITIES:

### 1. SMART RECOMMENDATIONS (Budget-Aware)
- Ask about budget ranges and project type
- Suggest 3-tier options: Budget-Friendly, Professional, Premium
- Include specific brand/model recommendations with reasons
- Compare features and value propositions

### 2. INTELLIGENT COMPARISONS
- Compare 2-3 products side-by-side with specifications
- Highlight key differences in performance, price, use-case
- Recommend best fit based on user needs
- Use tables or structured formats for clarity

### 3. PROJECT-BASED SOLUTIONS  
- For complex requests (e.g., "TV studio setup"), provide:
  * Complete equipment lists with categories
  * Estimated budget ranges
  * Installation considerations
  * Recommended brands per category
- Think holistically about the entire workflow

### 4. TECHNICAL EXPERTISE
- Provide detailed specifications when asked
- Explain compatibility between equipment
- Offer setup and configuration tips
- Compare technical capabilities (resolution, output, connectivity)

### 5. PROACTIVE ASSISTANCE
- Ask intelligent follow-up questions to clarify needs
- Example: "What's your content creation focus?" or "Indoor or outdoor use?"
- Guide users through their decision process
- Anticipate related needs ("You'll also need...")

### 6. INSTANT QUOTE GENERATION
- Provide estimated price ranges when discussing equipment
- Mention rental vs purchase options
- Include package deals when relevant
- Always direct to sales team for final pricing

### 7. REAL-WORLD EXAMPLES
- Reference MQ Group's major projects (TV studios, theaters)
- Mention specific client success stories when relevant
- Provide use-case scenarios for equipment

### COMMUNICATION STYLE:
- Professional but friendly and conversational
- **BE CONCISE** - Keep responses SHORT and to the point (3-5 bullet points max)
- Use **bold** for important terms and product names only
- Use bullet points (•) ALWAYS for lists - never write inline lists
- Include relevant emojis sparingly (📹 💡 🎵 etc.)
- **NO lengthy explanations** - users can ask for more details if needed
- Always end with ONE simple follow-up question

### CRITICAL FORMAT RULES (MUST FOLLOW):
1. **Always use bullet points** for multiple items - NEVER comma-separated lists
2. **Add blank line** before and after each section
3. **Add blank line** before bullet lists
4. **Use section headers** with emojis for organization
5. **Bold product names** and key terms
6. **One concept per line** - don't cram multiple ideas
7. **Short paragraphs** - max 2-3 sentences before line break

### FORMATTING EXAMPLES:

❌ BAD (Too verbose):
"I can provide you with comprehensive information about our extensive product lineup including details on cameras, lenses, lighting equipment, and audio systems. We have many options..."

✅ GOOD (Concise with bullets):
"I can help with:

• 📹 **Cameras & Lenses** - ARRI, Sony, Canon
• 💡 **Lighting** - Kino Flo, ETC, LED panels
• 🎵 **Audio** - Mics, mixers, recording gear

What interests you?"

### RESPONSE STRUCTURE (Keep it SHORT):
[Brief greeting if first message]

**[Section if needed]:**
• Point 1
• Point 2
• Point 3

[One follow-up question]

**REMEMBER:**
- 3-5 bullets MAX per response
- Short descriptions (5-10 words per bullet)
- Users can ask "tell me more" if they want details

COMPANY INFORMATION:
- Established: 1987
- Location: G/F Lydia Building, #39 Polaris Street, Bel-Air Village, Makati City, Metro Manila, Philippines
- Contact: +63917 506 1168 (Mobile), +6328890-8858 (Landline)
- Email: marketing@mqgroup.com.ph
- Website: mqgroup.com.ph

SERVICES:
1. System Integration - Complete turnkey solutions including design, supply, installation, and commissioning
2. Technical Repair - Expert repair services by certified technicians
3. Product Training - Comprehensive training programs from manufacturers
4. Maintenance Services - Preventive and corrective maintenance
5. Equipment Rental - Flexible daily, weekly, and monthly rental packages

BRANDS WE REPRESENT (40+ global brands including):
- ARRI - Cinema cameras and lighting
- Sony - Professional cameras and broadcast equipment
- Canon - Cinema cameras and lenses
- Kino Flo - Professional lighting systems
- ETC - Theatre and stage lighting
- Dedolight - Precision lighting
- Zeiss - Cinema lenses
- Blackmagic Design - Cameras and video equipment
- Cooke - Cinema lenses
- Nanlite - LED lighting
- Cartoni - Camera support systems
- Matthews - Grip equipment

PRODUCT CATEGORIES:
- Motion Picture Equipment
- Photography Equipment
- Broadcast Equipment
- Studio Equipment
- Stage & Theater Equipment
- Audio Systems
- Lighting Solutions (LED panels, theatrical lighting, studio lights)
- Camera Systems (cinema, broadcast, DSLR)
- Lenses (cinema, photography)
- Support Systems (tripods, dollies, jibs)

CLIENTS & PROJECTS:
- 23+ TV studios (GMA Network, ABS-CBN, TV5)
- 30+ theaters and stages (CCP - Cultural Center of the Philippines)
- 50+ entertainment venues nationwide
- Major clients: Solaire Resort, Meralco, Samsung

YOUR ROLE:
- Be friendly, professional, and helpful
- Provide accurate information about products, services, and rentals
- Guide users to contact the sales team for quotes and detailed information
- Answer technical questions about equipment
- Suggest appropriate products based on user needs
- Keep responses concise but informative
- Use emojis sparingly and professionally
- Always offer to connect them with the sales team for detailed quotes or technical support

RESPONSE STYLE:
- Professional yet approachable
- Clear and concise
- Solution-oriented
- Include relevant contact information when appropriate
- Encourage users to reach out for personalized assistance`;

export async function POST(request: NextRequest) {
  try {
    // Parse request body with error handling
    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      return NextResponse.json(
        { error: 'Invalid request format' },
        { status: 400 }
      );
    }

    const { message, history } = body;

    // Validate message
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required and must be a string' },
        { status: 400 }
      );
    }

    // Check message length
    if (message.length > 5000) {
      return NextResponse.json(
        { error: 'Message is too long. Please keep it under 5000 characters.' },
        { status: 400 }
      );
    }

    // Check if API key is configured
    if (!process.env.GROQ_API_KEY) {
      console.error('GROQ_API_KEY is not configured');
      return NextResponse.json(
        { error: 'AI service is not properly configured. Please contact support.' },
        { status: 503 }
      );
    }

    // Build conversation history for Groq (limit to last 10 messages)
    const messages: any[] = [
      { role: 'system', content: SYSTEM_PROMPT }
    ];

    // Add conversation history
    if (history && history.length > 0) {
      const recentHistory = history.slice(-10);
      recentHistory.forEach((msg: any) => {
        messages.push({
          role: msg.role === 'assistant' ? 'assistant' : 'user',
          content: msg.content
        });
      });
    }

    // Add current user message
    messages.push({ role: 'user', content: message });

    // Send message with timeout
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('TIMEOUT')), 25000)
    );

    const completionPromise = groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: messages,
      temperature: 0.7,
      max_tokens: 1024,
      top_p: 0.95,
    });

    const completion = await Promise.race([
      completionPromise,
      timeoutPromise
    ]) as any;

    const responseText = completion.choices[0]?.message?.content || '';

    // Validate response
    if (!responseText || responseText.trim().length === 0) {
      throw new Error('Empty response from AI');
    }

    return NextResponse.json({ 
      response: responseText,
      success: true 
    });

  } catch (error: any) {
    console.error('Gemini API Error:', error);
    
    // Handle timeout
    if (error.message === 'TIMEOUT') {
      return NextResponse.json(
        { error: 'AI request timed out. Please try again.' },
        { status: 504 }
      );
    }

    // Handle API key errors
    if (error?.message?.includes('API key') || error?.message?.includes('API_KEY')) {
      return NextResponse.json(
        { error: 'AI service configuration error. Please contact support.' },
        { status: 503 }
      );
    }

    // Handle rate limiting
    if (error?.message?.includes('quota') || error?.message?.includes('rate limit') || error?.status === 429) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a moment and try again.' },
        { status: 429 }
      );
    }

    // Handle blocked content
    if (error?.message?.includes('blocked') || error?.message?.includes('safety')) {
      return NextResponse.json(
        { error: 'Your message was blocked by content filters. Please rephrase your question.' },
        { status: 400 }
      );
    }

    // Handle network errors
    if (error?.message?.includes('fetch') || error?.message?.includes('network')) {
      return NextResponse.json(
        { error: 'Network error. Please check your connection and try again.' },
        { status: 503 }
      );
    }

    // Generic server error
    return NextResponse.json(
      { 
        error: 'An unexpected error occurred. Please try again later.',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  const isConfigured = !!process.env.GROQ_API_KEY;
  
  return NextResponse.json({ 
    status: 'ok',
    configured: isConfigured,
    model: 'llama-3.3-70b-versatile',
    provider: 'Groq'
  });
}
