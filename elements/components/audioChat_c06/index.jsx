// O componente AudioChat é responsável por exibir e reproduzir mensagens de áudio.
// Ele aceita os seguintes parâmetros:
// - message: Um objeto contendo a mensagem, incluindo a base64 do áudio.
// - isWaiting: Um booleano indicando se o áudio está aguardando para ser reproduzido.

// Importação de bibliotecas e estilos necessários para o componente.
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
    <div className="floating-window-audio">
      <div className="container-audio-chat">

        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          {message.user ? message.user : "Nenhuma mensagem com resposta de texto foi encontrada"}
          <Image
            src={"/assets/speaker_off.svg"}
            alt="Icone alto-falante"
            className={'speaker-icon-avatar'}
            width={75}
            height={75}
            priority
            onClick={() => (!isPlaying ? playAudio() : null)}
          />
        </div>
      </div>
    </div>
  );
}
