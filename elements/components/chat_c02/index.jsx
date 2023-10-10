import React, { useState } from 'react';
import './style.css'
import ImagemBot from '@/public/assets/logo-bot.png'
import ImagemUser from '@/public/assets/logo-user.png'
import Image from 'next/image';

// Este é um componente de chat chamado Chat_c02. Ele permite que os usuários interajam com um assistente virtual.
// O componente aceita entrada de texto do usuário, exibe mensagens de usuário e respostas do assistente.

export default function Chat(){
  const [textInput, setTextInput] = useState('');
  const [messagesChat, setMessagesChat] = useState([{isUser:false, text:"Olá sou seu professor ajudante :D"},
  {isUser:true, text:"Oque é sql?"}, {isUser:false, text:"Uma linguagem de consulta estruturada"}]);
return (
  <div className="floating-window">
      <div className="container-chat">
        <div>
          {messagesChat.map((mensagem, index) => (
            <div
              key={index}
              className={mensagem.isUser ? 'user-message' : 'bot-message'}
            >
            {mensagem.isUser ? <Image className='img' src={ImagemUser} alt="Imagem do usuário" />:<Image className='img' src={ImagemBot} alt="Imagem do professor" />}
             <p>
                {mensagem.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
