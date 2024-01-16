// O componente AudioChat é responsável por exibir e reproduzir mensagens de áudio.
// Ele aceita os seguintes parâmetros:
// - message: Um objeto contendo a mensagem, incluindo a base64 do áudio.
// - isWaiting: Um booleano indicando se o áudio está aguardando para ser reproduzido.

// Importação de bibliotecas e estilos necessários para o componente.
import React, { useState, useEffect } from 'react';
import './style.css';
import Image from 'next/image';
import { base64toBlob } from '@/utils/base64';

// Declaração do componente funcional AudioChat.
export default function AudioChat({ message, isWaiting }) {
  // Estados locais para controlar o estado de reprodução e a URL do áudio.
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);

  // Efeito colateral para gerenciar a reprodução do áudio quando a mensagem é alterada.
  useEffect(() => {
    // Verifica se a mensagem e a base64 do áudio existem.
    if (message && message.audio_base64) {
      // Converte a base64 do áudio para um blob e cria uma URL para reprodução.
      const blob = base64toBlob(message.audio_base64, 'audio/mp3');
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);

      // Limpeza do URL do áudio quando o componente é desmontado.
      return () => URL.revokeObjectURL(url);
    }
  }, [message]);

  // Função para reproduzir o áudio.
  const playAudio = () => {
    setIsPlaying(true);
    const audio = new Audio(audioUrl);
    audio.play();

    // Adiciona um ouvinte de evento para atualizar o estado de reprodução quando o áudio termina.
    audio.addEventListener('ended', () => {
      setIsPlaying(false);
    });
  };

  // Renderização do componente.
  return (
    <div className="floating-window">
      <div className="container-audio-chat">
        {/* Componente de ícone de alto-falante. */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Image
            src={"/assets/speaker_off.svg"}
            alt="Icone alto-falante"
            className={'speaker-icon-avatar'}
            width={75}
            height={75}
            priority
            // Ao clicar no ícone, verifica se não está reproduzindo para iniciar a reprodução.
            onClick={() => (!isPlaying ? playAudio() : null)}
          />
        </div>
      </div>
    </div>
  );
}
