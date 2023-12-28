import React, { useState, useEffect } from 'react';
import './style.css';
import Timer from '../timer_c07';
import { record, stopRecordingEarly } from '@/utils/record';

export default function Textfield({ id, label, placeholder, type, register }) {
    const [time, setTime] = React.useState(0)
    const [text, setText] = React.useState(null)
    const [start, setStart] = React.useState(false)
    const [audio, setAudio] = React.useState(null)
    const [play, setPlay] = React.useState(false)

    const startRecording = () => {
        record(12000, setStart, setText, setAudio, setPlay);
        setStart(true);
        setTime(12000);
    }

    const handlePlay = () => {
        if (audio) {
            if (play) {
                audio.pause()
                audio.currentTime = 0;
            } else {
                audio.play()
                setPlay(!play)
            }
        }
    }

    React.useEffect(() => {

    }, [text])

    return (
        <>
            <div className='field'>
                <div className='label-container'>
                    <label htmlFor={id} className='label'>
                        {label}
                    </label>
                </div>
                <div className='input-container'>
                    <input disabled={audio ? true : false} id={id} className={`input ${audio ? 'disabled' : ''}`} type={type} placeholder={placeholder} {...register} />
                    <p className={`audio-label ${!audio ? 'disabled' : ''}`}>Áudio gravado</p>
                    <button style={{ position: start ? 'absolute' : 'static', left: 'auto', display: !start && !text ? 'block' : 'none' }} onClick={startRecording} className='icon-button microphone-button' />
                    <button style={{ position: start ? 'absolute' : 'static', left: 'auto', display: start ? 'block' : 'none' }} onClick={stopRecordingEarly} className='icon-button small-button stop-button' />
                    <button style={{ position: 'absolute', left: '17rem', display: text ? 'block' : 'none' }} onClick={() => { setText(null); setAudio(null) }} className='icon-button small-button close-button' />
                    <button style={{ position: 'absolute', left: '0.5rem', display: text ? 'block' : 'none' }} onClick={handlePlay} className={`icon-button small-button ${!play ? 'play-button' : 'stop-button'}`} />
                    <Timer timeout={time} start={start}></Timer>
                </div>
            </div>
        </>
    );
}