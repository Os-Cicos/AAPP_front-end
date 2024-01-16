// O componente Chat é responsável por exibir mensagens de um chat entre o usuário e um bot.
// Ele aceita os seguintes parâmetros:
// - messages: Um array de objetos representando as mensagens do chat.
// - isWaiting: Um booleano indicando se o bot está atualmente processando uma mensagem.

// Importação de bibliotecas, estilos e componentes necessários para o componente.
import React from 'react';
import './style.css'
import ImagemBot from '@/public/assets/logo-bot.png'
import ImagemUser from '@/public/assets/logo-user.png'
import Image from 'next/image';
import WritingMessage from '@/elements/fragments/writingMessage';

// Declaração do componente funcional Chat.
export default function Chat({ messages, isWaiting }) {
  // Renderização do componente.
  return (
    <div className="floating-window">
      <div className="container-chat">
        {/* Estrutura de mensagens do chat. */}
        <div style={{display:'flex', flexDirection:'column'}}>
          {messages.map((message, index) => (
            <div
              key={index}
              className={message.isUser ? 'user-message' : 'bot-message'}
            >
              {/* Exibição da imagem do usuário ou do bot com base no remetente da mensagem. */}
              {message.isUser ? <Image className='img' src={ImagemUser} alt="Imagem do usuário" /> : <Image className='img' src={ImagemBot} alt="Imagem do professor" />}
              {/* Exibição do texto da mensagem. */}
              <p>
                {message.text}
              </p>
            </div>
          ))}
          {/* Exibição de uma animação de escrita se o bot estiver aguardando uma resposta. */}
          {isWaiting && <WritingMessage isUser={false} />}
        </div> 
      </div>
    </div>
  );
}
