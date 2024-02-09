// O componente Textfield é responsável por renderizar um campo de entrada de texto com funcionalidades adicionais,
// como gravação de áudio e reprodução. Ele aceita os seguintes parâmetros:
// - id: O ID único do campo de entrada.
// - label: O rótulo associado ao campo de entrada.
// - placeholder: O texto de placeholder para o campo de entrada.
// - type: O tipo de entrada (por exemplo, 'text', 'password', etc.).
// - register: A função de registro do formulário React Hook Form.

// Importação de bibliotecas, estilos e componentes necessários para o componente.
import React, { useState, useEffect } from 'react';
import './style.css';
import Timer from '../timer_c07';
import { record, stopRecordingEarly } from '@/utils/record';
import WaintingTranscribe from '@/elements/fragments/waitingTranscribe';

// Declaração do componente funcional Textfield.
export default function Textfield({ id, label, placeholder, type, register }) {
    // Estados locais para gerenciar o tempo de gravação, o texto digitado, a gravação de áudio, a reprodução, a resposta gravada.
    const [time, setTime] = React.useState(0);
    const [text, setText] = React.useState(null);
    const [isWaiting, setIsWaiting] = React.useState(false);
    const [start, setStart] = React.useState(false);
    const [audio, setAudio] = React.useState(null);
    const [play, setPlay] = React.useState(false);
    const [response, setResponse] = React.useState(null);

    // Função para iniciar a gravação de áudio.
    const startRecording = () => {
        record(60000, setStart, setText, setAudio, setPlay, setResponse, setIsWaiting, setTime, setStart);
    }

    // Função para manipular a reprodução ou pausa do áudio gravado.
    const handlePlay = () => {
        if (audio) {
            if (play) {
                audio.pause();
                audio.currentTime = 0;
            } else {
                audio.play();
                setPlay(!play);
            }
        }
    }

    // Efeito colateral para atualizar o valor do campo de entrada com a resposta gravada.
    React.useEffect(() => {
        if (response !== null) {
            document.getElementById('inputTextfieldAudio').value = response;
        }
    }, [response]);

    // Renderização do componente.
    return (
        <>
            <div className='field'>
                <div className='label-container'>
                    {/* Rótulo associado ao campo de entrada. */}
                    <label htmlFor={'inputTextfieldAudio'} className='label'>
                        {label}
                    </label>
                </div>
                <div className='input-container'>
                    {/* Campo de entrada de texto. */}
                    <input
                        id={'inputTextfieldAudio'}
                        className={`input ${!isWaiting ? 'enabled' : 'disabled'}`}
                        type={type}
                        disabled={start}
                        placeholder={placeholder}
                        {...register}
                    />
                    <WaintingTranscribe isWaiting={isWaiting} />
                    {/* Botões para iniciar e parar a gravação de áudio. */}
                    <button
                        style={{ position: 'absolute', right: 12, display: !start ? 'block' : 'none' }}
                        onClick={startRecording}
                        className='icon-button microphone-button'
                        type='button'
                    />
                    <button
                        style={{ position: 'absolute', right: 72, display: start ? 'block' : 'none' }}
                        onClick={stopRecordingEarly}
                        className='icon-button small-button stop-button'
                    />
                    {/* Timer para mostrar a contagem regressiva durante a gravação. */}
                    <Timer timeout={time} start={start}></Timer>
                </div>
            </div>
        </>
    );
}
