// Este é o componente ChatModal, que representa um modal de chat em um aplicativo.
// Ele inclui componentes como Chat (para a exibição do chat em si), Textfield (para a entrada de texto do usuário),
// Button (para botões no cabeçalho e rodapé) e Switch (um interruptor).

// Importação de bibliotecas, estilos e componentes necessários para o componente.
'use client'
import React from 'react';
import './style.css'
import Chat from '@/elements/components/chat_c02';
import Textfield from '@/elements/components/textfield_c03';
import Button from '@/elements/components/button_c05';
import Switch from '@/elements/components/switch_c04';
import { useForm } from 'react-hook-form';
import { Query } from '@/services';
import AudioChat from '@/elements/components/audioChat_c06';
import SelectionMenu from '../selectionMenu';

// Declaração do componente funcional ChatModal.
export default function ChatModal({ setClose, isOpen }) {
    // Utilização do React Hook Form para gerenciar o estado do formulário.
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    // Estados locais para gerenciar mensagens, espera, arquivo de áudio e o estado do interruptor.
    const [messages, setMessages] = React.useState([{ text: "Sou seu professor pessoal, como posso ajudá-lo?", isUser: false }])
    const [isWaiting, setIsWaiting] = React.useState(false)
    const [file, setFile] = React.useState(null)
    const [isOn, setIsOn] = React.useState(false)

    // Função para processar o envio do formulário.
    async function onsubmit(data) {
        try {
            // Reset do formulário e indicação de espera.
            reset()
            setIsWaiting(true)

            // Construção da resposta do chat e chamada à função de consulta.
            const queryResponse = messages
            queryResponse.push({ text: data.query, isUser: true })
            const response = await Query(data.query, isOn)
            queryResponse.push({ text: response.data.response_text, isUser: false })

            // Atualização do estado com a resposta do servidor.
            setFile(response.data.response_audio)
            setMessages(queryResponse);
        } catch (error) {
            console.error(error);
        }
        finally {
            // Finalização do estado de espera.
            setIsWaiting(false);
        }
    }

    // Renderização do componente.
    return (
        <>
            {/* Estrutura do modal de chat. */}
            <div id='bg-chat' className={`${isOpen ? 'bg-open' : 'bg-close'}`}>
                {/* Cabeçalho com botão de fechar e interruptor. */}
                <div id='header'>
                    <Button icon="assets/back_arrow_icon.svg" onClick={setClose} alt={'Fechar chat'} />
                    <Switch isOn={isOn} setIsOn={setIsOn} />
                </div>
                <SelectionMenu options={[{ title: 'Python', icon: 'assets/pythonIcon.svg', index: 0 },
                { title: 'Lógica', icon: 'assets/logicaIcon.svg', index: 1 }]} />
                <div id='middle'>
                    {/* Condicional para renderizar o componente de áudio ou o componente de chat. */}
                    {isOn ? <AudioChat message={{ 'text': messages[-1], 'audio_base64': file }} isWaiting={isWaiting}></AudioChat> : <Chat isWaiting={isWaiting} messages={messages} />}
                </div>

                {/* Formulário de entrada de texto e botão de envio. */}
                <form id='footer' autoComplete="off" onSubmit={handleSubmit(onsubmit)}>
                    <Textfield
                        label={'Insira sua pergunta'}
                        placeholder={'Digite aqui...'}
                        id={'TextField'} type={'text'}
                        register={register('query', { required: true })} />
                    <Button type='submit' alt={'Enviar mensagem'} />
                </form>
            </div >
        </>
    );
}
