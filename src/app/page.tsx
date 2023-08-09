'use client'

import logo from '@images/oxilate.png'
import { useChat } from 'ai/react'
import Image from 'next/image'

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit } = useChat()
  console.log('messages' + messages)
  return (
    <main className='flex min-h-screen flex-col bg-black dark:bg-slate-900'>
      <div className='mb-10 border-b-[1px] p-10 border-white/40'>
        <Image alt='oxilate' src={logo} className='invert dark:invert-0' />
      </div>
      <div className='container mx-auto flex-1'>
        <div>
          {messages.map(m => (
            <div key={m.id}>
              {m.role}: {m.content}
            </div>
          ))}

          <form onSubmit={handleSubmit}>
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
