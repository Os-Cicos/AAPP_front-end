// O componente OpenButton é responsável por exibir um botão de abertura/fechamento de uma janela ou componente.
// Ele aceita os seguintes parâmetros:
// - onCLick: A função a ser executada quando o botão for clicado.
// - isOpen: Um booleano indicando se o componente associado está aberto ou fechado.

// Importação de bibliotecas, estilos e componentes necessários para o componente.
import React from 'react';
import './style.css'
import ImagemButton from 'public/assets/logo_button.svg'
import Image from 'next/image';

// Declaração do componente funcional OpenButton.
export default function OpenButton({ onCLick, isOpen }) {
  // Renderização do componente.
  return (
    <div>
      {/* Botão com classe condicional para alterar o estilo com base no estado 'isOpen'. */}
      <button className={`button ${isOpen ? "bt-expand" : "bt-shrink"}`} onClick={onCLick}>
        {/* Ícone do botão, exibido com a biblioteca Next.js Image. */}
        <Image
          src={ImagemButton}
          alt="Seu professor ajudante"
          className={'bt-icon'}
          width={25}
          height={25}
          priority
        />
      </button>
    </div>
  );
};
