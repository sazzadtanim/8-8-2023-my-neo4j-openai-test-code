import { OpenAIStream, StreamingTextResponse } from 'ai'
import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI()

export async function GET(req: Request) {
  const { messages } = await req.json()
  try {
    const result = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      // messages: [
      //   ...feedMessages,
      //   {
      //     role: 'user',
      //     content:
      //       'Give me the list of all customers who are insured by Direct Seguros',
      //   },
      // ],
      messages,
      temperature: 0,
      stream: true,
    })

    const stream = OpenAIStream(result)
    return new StreamingTextResponse(stream)

    // const { isQuery, query } = await extractCyperQueryFromGpt(
    //   result.choices[0].message
    // )

    // const responseNeo4j = isQuery
    //   ? neo4jStream(result.choices[0].message.content)
    //   : query

    // return new StreamingTextResponse(responseNeo4j as ReadableStream)
  } catch (error) {
    return NextResponse.json({ error: error })
  }
}
