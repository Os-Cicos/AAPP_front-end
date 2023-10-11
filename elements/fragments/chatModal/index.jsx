'use client'
import React from 'react';
import './style.css'
import Chat from '@/elements/components/chat_c02';
import Textfield from '@/elements/components/textfield_c03';
import Button from '@/elements/components/button_c05';
import Switch from '@/elements/components/switch_c04';
import { useForm } from 'react-hook-form';
import { Query } from '@/services';

// Este é o componente ChatModal, que representa um modal de chat em um aplicativo.
// Ele inclui componentes como Chat (para a exibição do chat em si), Textfield (para a entrada de texto do usuário),
// Button (para botões no cabeçalho e rodapé) e Switch (um interruptor).

export default function ChatModal({ setClose, isOpen }) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [messages, setMessages] = React.useState([{ text: "Sou seu professor pessoal, como posso ajudá-lo?", isUser: false }])
    const [isWaiting, setIsWaiting] = React.useState(false)
    async function onsubmit(data) {
        try {
            reset()
            setIsWaiting(true)
            const queryRespone = messages
            queryRespone.push({ text: data.query, isUser: true })
            const response = await Query(data)
            queryRespone.push({ text: response, isUser: false })
            setMessages(queryRespone);
        } catch (error) {
            console.error(error);
        }
        finally {
            setIsWaiting(false);
        }
    }


    return (
        <>
            <div id='bg-chat' className={`${isOpen ? 'bg-open' : 'bg-close'}`}>
                <div id='header'>
                    <Button icon="assets/back_arrow_icon.svg" onClick={setClose} alt={'Fechar chat'} />
                    <Switch />
                </div>
                <Chat isWaiting={isWaiting} messages={messages} />
                <form onSubmit={handleSubmit(onsubmit)}>
                    <div id='footer'>
                        <Textfield
                            label={'Insira sua pergunta'}
                            placeholder={'Digite aqui...'}
                            id={'TextField'} type={'text'}
                            register={register('query', { required: true })} />
                        <Button type='submit' alt={'Enviar mensagem'} />
                    </div>
                </form>
            </div>
        </>)
}
