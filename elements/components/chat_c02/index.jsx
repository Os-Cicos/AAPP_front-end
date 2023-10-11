import React, { useState } from 'react';
import './style.css'
import ImagemBot from '@/public/assets/logo-bot.png'
import ImagemUser from '@/public/assets/logo-user.png'
import Image from 'next/image';
import WritingMessage from '@/elements/fragments/writingMessage';

export default function Chat({ messages, isWaiting }) {
  return (
    <div className="floating-window">
      <div className="container-chat">
        <div style={{display:'flex', flexDirection:'column'}}>
          {messages.map((message, index) => (
            <div
              key={index}
              className={message.isUser ? 'user-message' : 'bot-message'}
            >
              {message.isUser ? <Image className='img' src={ImagemUser} alt="Imagem do usuário" /> : <Image className='img' src={ImagemBot} alt="Imagem do professor" />}
              <p>
                {message.text}
              </p>
            </div>
          ))}
          {isWaiting && <WritingMessage isUser={false} />}
        </div> 
      </div>
    </div>
  );
}