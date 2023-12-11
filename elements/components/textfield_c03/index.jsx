import React, { useState, useEffect } from 'react';
import './style.css';
import Timer from '../timer_c07';
import { record } from '@/utils/record';

export default function Textfield({ id, label, placeholder, type, register }) {
    const [time, setTime] = React.useState(0)
    const [start, setStart] = React.useState(false)
    const [stopRecording, setStopRecording] = React.useState(null)

    const startRecording = () => {
        const stop = record(120000);
        setStopRecording(() => stop);
        setStart(true);
        setTime(120000);
    }

    const stopRecordingEarly = () => {
        if (stopRecording) {
            stopRecording();
        }
        setStart(false);
        setTime(0);
    }

    return (
        <>
            <div className='field'>
                <div className='label-container'>
                    <label htmlFor={id} className='label'>
                        {label}
                    </label>
                </div>
                <div className='input-container'>
                    <input id={id} className='input' type={type} placeholder={placeholder} {...register} />
                    <button style={{ position: start ? 'absolute' : 'static', left:'auto' }} onClick={startRecording} className='microphone-button' />
                    <button style={{ position: start ? 'absolute' : 'static', left:'auto' }} onClick={stopRecordingEarly} className='microphone-button' />
                    <Timer timeout={time} start={start}></Timer>
                </div>
            </div>
        </>
    );
}
