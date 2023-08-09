'use client'

import logo from '@images/oxilate.png'
import { useChat } from 'ai/react'
import Image from 'next/image'
export const runtime = 'edge'

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } =
    useChat({
      api: '/api/chat',
    })

  console.log('🚀 ~ file: page.tsx:10 ~ Home ~ messages:', messages)
  return (
    <main className='flex min-h-screen flex-col bg-black text-black dark:bg-slate-900 dark:text-white'>
      <div className='mb-10 border-b-[1px] border-white/40 p-10'>
        <Image alt='oxilate' src={logo} className='invert dark:invert-0' />
      </div>
      <div className='container mx-auto flex-1'>
        <div className='flex flex-col justify-between'>
          <div className='flex-1'>
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
