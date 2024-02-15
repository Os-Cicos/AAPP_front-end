import React from 'react'
import ImagemBot from '@/public/assets/logo-bot.png'
import ImagemUser from '@/public/assets/logo-user.png'
import './style.css'
import Image from 'next/image'

export default function WaintingSelection({ isWaiting }) {
    return (
        <>
            <div className={`ball-containerSelection ${isWaiting ? 'enabled' : 'disabled'}`}>
                <div className={`ball-1S ball-user'}`} />
                <div className={`ball-2S ball-user'}`} />
                <div className={`ball-3S ball-user'}`} />
            </div>
        </>
    )
}