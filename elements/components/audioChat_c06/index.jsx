import React, { useState, useEffect } from 'react';
import './style.css';
import Image from 'next/image';
import { base64toBlob } from '@/utils/base64';

export default function AudioChat({ message, isWaiting }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);

  useEffect(() => {
    if (message && message.audio_base64) {
      const blob = base64toBlob(message.audio_base64, 'audio/mp3');
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);

      // Limpeza do URL do áudio quando o componente é desmontado
      return () => URL.revokeObjectURL(url);
    }
  }, [message]);

  const playAudio = () => {
    setIsPlaying(true);
    const audio = new Audio(audioUrl);
    audio.play();

    audio.addEventListener('ended', () => {
      setIsPlaying(false);
    });
  };

  return (
    <div className="floating-window">
      <div className="container-audio-chat">
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Image
            src={"/assets/speaker_off.svg"}
            alt="Icone alto-falante"
            className={'speaker-icon-avatar'}
            width={75}
            height={75}
            priority
            onClick={() => (!isPlaying ? playAudio() : null)} // Encapsulamento em uma função anônima
          />
        </div>
      </div>
    </div>
  );
}

