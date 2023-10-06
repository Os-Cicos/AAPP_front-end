import React, { useState } from 'react';
import './test.css'
import ImagemBot from './elements/componets/Chat/logo-bot.png'
import ImagemUser from './elements/componets/Chat/logo-user.png'


export default function Chat_c02(){
  const [textoEntrada, setTextoEntrada] = useState('');
  const [mensagensChat, setMensagensChat] = useState([]);
  const [respostas, setRespostas] = useState([
      { pergunta: 'ola', resposta: 'ola, eu sou seu assistente pessoal estou aqui para ajuda-lo em qualquer coisa que precisar de mim, só perguntar!' },
      { pergunta: 'Qual é o seu nome?', resposta: 'Meu nome é ChatBot.' },
      { pergunta: 'Como você está?', resposta: 'Estou bem, obrigado por perguntar.' },
 ]);

  const valorInput = (pergunta) => {
    setTextoEntrada(pergunta.target.value);
  };

  const handleSubmit = () => {
  if (textoEntrada.trim() === '') return; 

  
  const perguntaUsuario = { texto: textoEntrada, éUsuário: true };
  setMensagensChat([...mensagensChat, perguntaUsuario]);

  const resposta = respostas.find((item) =>
      item.pergunta.toLowerCase() === textoEntrada.toLowerCase()
    );

    if (resposta) {
      const respostaBot = { texto: resposta.resposta, éUsuário: false };
      setMensagensChat([...mensagensChat, respostaBot]);
    } else {
      const respostaBot = { texto: 'Desculpe, não entendi a pergunta.', éUsuário: false };
      setMensagensChat([...mensagensChat, respostaBot]);
    }

  setTextoEntrada('');
};
return (
  <div className="janela-flutuante">
      <div className="container-chat">
        <div>
          {mensagensChat.map((mensagem, index) => (
            <div
              key={index}
              className={mensagem.éUsuário ? 'mensagem-usuario' : 'mensagem-bot'}
            >
            {mensagem.éUsuário ? <img className='imagem' src={ImagemUser} alt="err" />:
              <img className='imagem' src={ImagemBot} alt="err" />
             }
             <p>
                {mensagem.texto}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
