'use client'

// O componente Textfield é uma caixa de texto reutilizável.
// Ele aceita os seguintes props:

// - id: Um identificador único para o elemento input.
// - label: O rótulo que será exibido acima da caixa de texto.
// - placeholder: O texto de dica que aparece na caixa de texto quando ela está vazia.
// - type: O tipo de entrada da caixa de texto, como "text", "password", etc.

import React from 'react';
import './style.css'

export default function Textfield({ id, label, placeholder, type }) {

    return (
        <>
            <div className='field'>
                <div className='label-container'>
                    <label htmlFor={id} className='label'>
                        {label}
                    </label>
                </div>
                <input id={id} className='input' type={type} placeholder={placeholder} />
            </div>
        </>

    );
}