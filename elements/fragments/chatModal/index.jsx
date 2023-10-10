'use client'
import React from 'react';
import './style.css'
import Chat from '@/elements/components/chat_c02';
import Textfield from '@/elements/components/textfileld_c03';
import Button from '@/elements/components/button_c05';
import Switch from '@/elements/components/switch_c04';

// Este é o componente ChatModal, que representa um modal de chat em um aplicativo.
// Ele inclui componentes como Chat (para a exibição do chat em si), Textfield (para a entrada de texto do usuário),
// Button (para botões no cabeçalho e rodapé) e Switch (um interruptor).

export default function ChatModal({setClose}) {

    return (
        <>
            <div id='bg-chat'>
                <div id='header'>
                    <Button icon="assets/back_arrow_icon.svg" onClick={setClose} alt={'Fechar chat'}/>
                    <Switch/>
                </div>
                <Chat />
                <form>
                    <div id='footer'>
                        <Textfield
                            label={'Insira sua pergunta'}
                            placeholder={'Digite aqui...'}
                            id={'TextField'} type={'text'} />
                        <Button alt={'Enviar mensagem'}/>
                    </div>
                </form>
            </div>
        </>)
}
