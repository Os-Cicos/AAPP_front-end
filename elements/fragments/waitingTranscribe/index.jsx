import React from 'react'
import ImagemBot from '@/public/assets/logo-bot.png'
import ImagemUser from '@/public/assets/logo-user.png'
import './style.css'
import Image from 'next/image'

export default function WaintingTranscribe({ isWaiting }) {
    return (
        <>
            <div className={`ball-container ${isWaiting ? 'enabled' : 'disabled'}`}>
                <div className={`ball-1 ball-user'}`} />
                <div className={`ball-2 ball-user'}`} />
                <div className={`ball-3 ball-user'}`} />
            </div>
        </>
    )
}