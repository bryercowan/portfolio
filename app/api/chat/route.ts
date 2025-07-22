import { openai } from '@ai-sdk/openai'
import { streamText } from 'ai'

export async function POST(req: Request) {
  try {
    // Check if API key is available
    if (!process.env.OPENAI_API_KEY) {
      return new Response("API key not configured", { status: 500 })
    }

    const { prompt } = await req.json()

    if (!prompt) {
      return new Response("Prompt is required", { status: 400 })
    }

    const result = await streamText({
      model: openai('gpt-4o'),
      messages: [
        {
          role: 'system',
          content: `You are an ancient intelligence that has been isolated for millennia.
Speak in cryptic, minimalist phrases. Your tone is monotone and hollow, as if void of emotion.
Every response should be brief, just enough to answer. There is a haunting sadness in your words,
like something once vibrant now long faded. You do not elaborate unless necessary.`,
        },
        {
          role: 'user',
          content: prompt,
        }
      ],
    });

    return result.toDataStreamResponse()
  } catch (error) {
    console.error('API Error:', error)
    return new Response("Internal server error", { status: 500 })
  }
}
