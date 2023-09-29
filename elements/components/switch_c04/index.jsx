'use client'
import Image from 'next/image';
import React from 'react';
import './style.css'

// O componente Switch é uma representação visual de um interruptor de ligar/desligar.
// Ele possui uma animação que muda o estado do interruptor quando clicado.

export default function Switch() {
    const [isOn, setIsOn] = React.useState(false)

    return (
        <>
            <div id='bg-switch'>
                <div id='left-icon' className={`${isOn ? 'off' : 'on'}`}>
                    aA
                </div>
                <div type='button' id='switch' onClick={() => setIsOn(!isOn)}>
                    <div id='ball' className={`${isOn ? 'right' : 'left'}`} />
                </div>
                <div id='right-icon'>
                    <Image
                        src={isOn ? "/assets/speaker_on.svg" : "/assets/speaker_off.svg"}
                        alt="Icone alto-falante"
                        className={'speaker-icon'}
                        width={25}
                        height={25}
                        priority
                    />
                </div>
            </div>
        </>)
}
