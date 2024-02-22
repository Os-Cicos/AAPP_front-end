// Este é o componente ChatModal, que representa um modal de chat em um aplicativo.
// Ele inclui componentes como Chat (para a exibição do chat em si), Textfield (para a entrada de texto do usuário),
// Button (para botões no cabeçalho e rodapé) e Switch (um interruptor).

// Importação de bibliotecas, estilos e componentes necessários para o componente.
'use client'
import React, { useContext, useEffect } from 'react';
import './style.css'
import Chat from '@/elements/components/chat_c02';
import Textfield from '@/elements/components/textfield_c03';
import Button from '@/elements/components/button_c05';
import Switch from '@/elements/components/switch_c04';
import { useForm } from 'react-hook-form';
import { Query } from '@/services';
import AudioChat from '@/elements/components/audioChat_c06';
import SelectionMenu from '../selectionMenu';
import { UserContext } from '@/context/userContext';
import { MenuContext } from '@/context/menuContext';

// Declaração do componente funcional ChatModal.
export default function ChatModal({ setClose, isOpen }) {
    // Utilização do React Hook Form para gerenciar o estado do formulário.
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { user } = useContext(UserContext);
    const { selected, setSelected } = useContext(MenuContext)

    // Estados locais para gerenciar mensagens, espera, arquivo de áudio e o estado do interruptor.
    const [messages, setMessages] = React.useState([{ text: "Sou seu professor pessoal, selecione o conteúdo desejado.", isUser: false }])
    const [lastAudioMessage, setLastAudioMessage] = React.useState({
        text: { bot: "Nenhuma mensagem com resposta de áudio foi encontrada", user: "" },
        audio_base64: null
    })
    const [isWaiting, setIsWaiting] = React.useState(false)
    const [isOn, setIsOn] = React.useState(false)
    const [isWaitingAudio, setIsWaitingAudio] = React.useState(false)
    useEffect(() => {
        if (messages.length == 1 && selected.index != -1) {
            setMessages([{ text: `Sou seu professor pessoal, conteúdo ${selected.name} selecionado.`, isUser: false }])
        }
    }, [selected])
    async function onsubmit(data) {
        try {

            // Reset do formulário e indicação de espera.
            reset()
            setIsWaiting(true)
            if (isOn) {
                setIsWaitingAudio(true)
                setLastAudioMessage({ text: { bot: lastAudioMessage.text.bot, user: data.query }, audio_base64: lastAudioMessage.audio_base64 })
                const queryResponse = messages
                queryResponse.push({ text: data.query, isUser: true })
                const response = await Query(data.query, isOn, user)
                queryResponse.push({ text: response.data.response_text, isUser: false })
                setIsWaitingAudio(false)
                setLastAudioMessage({ text: { bot: response.data.response_text, user: data.query }, audio_base64: response.data.response_audio })
                setMessages(queryResponse);
            } else {
                const queryResponse = messages
                queryResponse.push({ text: data.query, isUser: true })
                const response = await Query(data.query, isOn)
                queryResponse.push({ text: response.data.response_text, isUser: false })
                setMessages(queryResponse);
            }

        } catch (error) {
            console.error(error);
        }
        finally {
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
                <SelectionMenu />
                <div id='middle'>
                    {/* Condicional para renderizar o componente de áudio ou o componente de chat. */}
                    {isOn ? <AudioChat message={lastAudioMessage} isWaiting={isWaiting}></AudioChat> :
                        <Chat isWaiting={isWaiting} messages={messages} />}
                </div>

                {/* Formulário de entrada de texto e botão de envio. */}
                <form id='footer' autoComplete="off" onSubmit={handleSubmit(onsubmit)}>
                    <Textfield
                        label={'Insira sua pergunta'}
                        placeholder={selected.index==-1?'Selecione um conteúdo':'Digite aqui...'}
                        id={'TextField'} type={'text'}
                        register={register('query', { required: true })} />
                    <Button disabled={selected.index == -1? true: false} type='submit' alt={'Enviar mensagem'} />
                </form>
            </div >
        </>
    );
}
