import { extractCyperQueryFromGpt, neo4jStream } from '@/data/helper_functions'
import { feedMessages } from '@/data/utils'
import { StreamingTextResponse } from 'ai'
import { Configuration, OpenAIApi } from 'openai-edge'

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(config)

export const runtime = 'edge'

export async function POST(req: Request) {
  const { messages } = await req.json()
  console.log('🚀 ~ file: route.ts:15 ~ POST ~ messages:', messages)

  const messageWithInstruction = feedMessages.concat(
    messages[messages.length - 1]
  )
  console.log(
    '🚀 ~ file: route.ts:20 ~ POST ~ messageWithInstruction:',
    messageWithInstruction
  )

  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: messageWithInstruction,
    temperature: 0,
  })
  console.log('🚀 ~ file: route.ts:31 ~ POST ~ response:', response)

  const { isQuery, query } = await extractCyperQueryFromGpt(response)
  console.log('🚀 ~ file: route.ts:27 ~ POST ~ query:', query)

  // const stream = OpenAIStream(response)
  // return new StreamingTextResponse(stream)

  const responseNeo4j = isQuery ? neo4jStream(query) : query

  return new StreamingTextResponse(responseNeo4j as ReadableStream)
}
