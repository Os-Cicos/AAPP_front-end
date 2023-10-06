import React, { useState } from 'react';
import './style.css'
import ImagemBot from './elements/componets/Chat/logo-bot.png'
import ImagemUser from './elements/componets/Chat/logo-user.png'

// Este é um componente de chat chamado Chat_c02. Ele permite que os usuários interajam com um assistente virtual.
// O componente aceita entrada de texto do usuário, exibe mensagens de usuário e respostas do assistente.

export default function Chat(){
  const [textInput, setTextInput] = useState('');
  const [messagesChat, setMessagesChat] = useState([]);
  const [response, setResponse] = useState([
      { message: 'ola', response: 'ola, eu sou seu assistente pessoal estou aqui para ajuda-lo em qualquer coisa que precisar de mim, só perguntar!' },
      { message: 'Qual é o seu nome?', response: 'Meu nome é ChatBot.' },
      { message: 'Como você está?', response: 'Estou bem, obrigado por perguntar.' },
 ]);

  const valorInput = (e) => {
    setTextInput(e.target.value);
  };

  const handleSubmit = () => {
  if (textInput.trim() === '') return; 

  
  const userMessage = { text: textInput, isUser: true };
  setMessagesChat([...messagesChat, userMessage]);

  const response = response.find((item) =>
      item.message.toLowerCase() === textInput.toLowerCase()
    );

    if (response) {
      const responseBot = { text: response.response, isUser: false };
      setMessagesChat([...messagesChat, responseBot]);
    } else {
      const responseBot = { text: 'Desculpe, não entendi a pergunta.', isUser: false };
      setMessagesChat([...messagesChat, responseBot]);
    }

  setTextInput('');
};
return (
  <div className="floating-window">
      <div className="container-chat">
        <div>
          {messagesChat.map((mensagem, index) => (
            <div
              key={index}
              className={mensagem.isUser ? 'user-message' : 'bot-message'}
            >
            {mensagem.isUser ? <img className='img' src={ImagemUser} alt="err" />:
              <img className='imagem' src={ImagemBot} alt="err" />
             }
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
