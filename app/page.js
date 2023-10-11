"use client"
import React from 'react'
import ChatModal from "@/elements/fragments/chatModal";
import OpenButton from '@/elements/components/openButton_c01';


export default function Home() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <main style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
      <ChatModal isOpen={isOpen} setClose={() => { setIsOpen(false) }} />
      <OpenButton onCLick={() => { setIsOpen(true) }} />
    </main>
  )
}
