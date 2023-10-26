"use client"
import React from 'react'
import ChatModal from "@/elements/fragments/chatModal";
import OpenButton from '@/elements/components/openButton_c01';
import placeholder_bg from 'public/placeholders/placeholder_bg.png'
import Image from 'next/image';

export default function Home() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <main style={{ display: 'flex', alignItems: 'center', flexDirection: 'row'}}>
      <div className='container_placeholder'>
        <Image
          src={placeholder_bg}
          className='placeholder_bg'
        />
      </div>
      <ChatModal isOpen={isOpen} setClose={() => { setIsOpen(false) }} />
      <OpenButton isOpen={isOpen} onCLick={() => { setIsOpen(true) }} />
    </main>
  )
}
