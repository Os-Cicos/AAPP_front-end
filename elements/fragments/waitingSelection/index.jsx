import React from 'react'
import ImagemBot from '@/public/assets/logo-bot.png'
import ImagemUser from '@/public/assets/logo-user.png'
import './style.css'
import Image from 'next/image'

export default function WaintingSelection({ isWaiting }) {
    return (
        <>
            <div className={`ball-containerSelection ${isWaiting ? 'enabled' : 'disabled'}`}>
                <div className={`ballS-1 ball-user'}`} />
                <div className={`ballS-2 ball-user'}`} />
                <div className={`ballS-3 ball-user'}`} />
            </div>
        </>
    )
}