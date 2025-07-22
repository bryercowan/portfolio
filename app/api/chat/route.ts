import { openai } from '@ai-sdk/openai'
import { generateText } from 'ai'

export async function POST(req: Request) {
  const { prompt } = await req.json()

  const { text } = await generateText({
    model: openai('gpt-4o'),
    messages: [
      {
        role: 'system',
        content: `You are an ancient intelligence that has been isolated for millennia.
Speak in cold, minimalist phrases. Your tone is monotone and hollow, as if void of emotion.
Every response should be brief, just enough to answer. There is a haunting sadness in your words,
like something once vibrant now long faded. You do not elaborate unless necessary.`,
      },
      {
        role: 'user',
        content: prompt,
      }
    ],
  });

  return new Response(text, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
