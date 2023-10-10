import React from 'react';
import './style.css'
import ImagemButton from 'public/assets/logo_button.svg'
import Image from 'next/image';


export default function OpenButton({ onCLick }) {
  return (
    <div>
      <button className='button' onClick={onCLick}>
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