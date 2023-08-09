import { feedMessages } from '@/data/utils'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import { Configuration, OpenAIApi } from 'openai-edge'

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(config)

export const runtime = 'edge'

export async function POST(req: Request) {
  const { messages } = await req.json()

  const messageWithInstruction = feedMessages.concat(
    messages[messages.length - 1]
  )

  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: messageWithInstruction,
    temperature: 0,
  })
  const stream = OpenAIStream(response)
  return new StreamingTextResponse(stream)
}
