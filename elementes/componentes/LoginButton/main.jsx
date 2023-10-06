import React from 'react';
import './style.css'
import ImagemButton from './elementes/componetes/LoginButton/logo-button.png'


export default function button_c01() {
  return (
    <div>
      <button className='button' onClick={onClick}>
        <img src={ImagemButton} alt="err" />
      </button>
    </div>
  );
};