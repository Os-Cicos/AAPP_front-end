'use client'
import Image from 'next/image';
import React from 'react';
import './style.css'

// O componente Button é um botão reutilizável que pode conter um ícone.
// Ele aceita os seguintes parâmetros:

// - icon: O caminho da imagem do ícone a ser exibido no botão.
// - onClick: A função a ser executada quando o botão for clicado.
// - type: O tipo do botão (por exemplo, 'button', 'submit', etc.).
// - alt: O texto alternativo para a imagem do ícone.

export default function Button({ icon, onClick, type, alt, text, outlined, isSelected, noIcon }) {

    return (
        <>
            <button type={`${type ? type : 'button'}`} id='bg-button' className={`${outlined ? 'bt-outlined' : ''} ${isSelected ? 'bt-selected' : ''}`} onClick={onClick}>
                {!noIcon ? <Image
                    src={icon ? icon : '/assets/submit_arrow_icon.svg'}
                    alt={alt}
                    className={'icon'}
                    width={25}
                    height={25}
                    priority
                >
                </Image> : <></>}
                {text ? <p id='buttonText'>{text}</p> : <></>}
            </button>
        </>)
}
