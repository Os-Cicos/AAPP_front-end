import React from 'react'
import ImagemBot from '@/public/assets/logo-bot.png'
import ImagemUser from '@/public/assets/logo-user.png'
import './style.css'
import Image from 'next/image'

export default function WritingMessage({ isUser }) {
    return (
        <>
            <div
                className={isUser ? 'user-message-write' : 'bot-message-write'}
            >
                {isUser ? <Image className='img' src={ImagemUser} alt="Imagem do usuário" /> : <Image className='img' src={ImagemBot} alt="Imagem do professor" />}
                <div className={'ball-container'}>
                    <div className={`ball-1 ${isUser ? 'ball-user' : 'ball-bot'}`} />
                    <div className={`ball-2 ${isUser ? 'ball-user' : 'ball-bot'}`} />
                    <div className={`ball-3 ${isUser ? 'ball-user' : 'ball-bot'}`} />
                </div>
            </div>
        </>
    )
}