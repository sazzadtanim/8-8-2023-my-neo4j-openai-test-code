'use client'

import { initialGraphData, layout, styleSheet } from '@/data/data'
import logo from '@images/oxilate.png'
import { useChat } from 'ai/react'
import Image from 'next/image'
import { useState } from 'react'
import CytoscapeComponent from 'react-cytoscapejs'

export const runtime = 'edge'

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } =
    useChat({
      api: '/api/chat',
    })
  const [width, setWith] = useState('100%')
  const [height, setHeight] = useState('400px')

  const [graphData, setGraphData] = useState(initialGraphData)

  return (
    <main className='flex min-h-screen flex-col bg-black text-black dark:bg-slate-900 dark:text-white'>
      <div className='mb-10 border-b-[1px] border-white/40 p-10'>
        <Image alt='oxilate' src={logo} className='invert dark:invert-0' />
      </div>
      <div className='container mx-auto flex-1'>
        <div className='flex flex-col justify-between'>
          <div className='flex-1'>
            <CytoscapeComponent
              elements={CytoscapeComponent.normalizeElements(graphData)}
              pan={{ x: 200, y: 200 }}
              style={{ width: width, height: height }}
              zoomingEnabled={true}
              maxZoom={3}
              minZoom={0.1}
              autounselectify={false}
              boxSelectionEnabled={true}
              layout={layout}
              stylesheet={styleSheet}
            />
            {isLoading ? (
              <div>...loading</div>
            ) : error ? (
              <div className='m-10 leading-6'>
                {error.message}
                {/* <p>{JSON.stringify(error.cause)}</p> */}
              </div>
            ) : (
              <div className='p-2'>
                {messages.map(m => (
                  <div key={m.id}>
                    {m.role}: {m.content}
                  </div>
                ))}
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className='mx-auto text-center'>
            <input
              value={input}
              placeholder='Say something...'
              onChange={handleInputChange}
              className='text-black'
            />
          </form>
        </div>
      </div>
    </main>
  )
}
