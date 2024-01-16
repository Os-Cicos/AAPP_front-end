// Este arquivo contém funções relacionadas à gravação e manipulação de áudio.

// Importação da instância da API e da função de transcrição.
import api, { Transcribe } from "@/services";

// Função auxiliar para converter um Blob em uma string base64.
const b2text = blob => new Promise((resolve) => {
    const reader = new FileReader()
    reader.onloadend = e => resolve(e.srcElement.result)
    reader.readAsDataURL(blob)
})

// Variáveis globais para o gravador e o controle de tempo.
let recorder;
let timeOut;

// Função principal para iniciar a gravação de áudio.
export var record = (time, setStart, setText, setAudio, setPlay, setResponse, setWainting) => new Promise(async resolve => {
    // Obtém a permissão do usuário para acessar o microfone.
    let stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    
    // Inicializa o gravador de mídia com o stream de áudio.
    recorder = new MediaRecorder(stream)
    let chunks = []

    // Configura o evento para capturar os dados disponíveis durante a gravação.
    recorder.ondataavailable = e => chunks.push(e.data)
    
    // Inicia o gravador.
    recorder.start()

    // Configura o evento para ser executado quando a gravação é interrompida.
    recorder.onstop = async () => {
        // Cria um Blob a partir dos chunks coletados durante a gravação.
        let blob = new Blob(chunks)
        
        // Cria uma URL para reprodução do áudio.
        const audioUrl = URL.createObjectURL(blob);
        
        // Cria um elemento de áudio para manipulação do áudio.
        const audio = new Audio(audioUrl);
        
        // Configura eventos para controlar o estado de reprodução do áudio.
        audio.addEventListener("ended", function (e) {
            setPlay(false)
        });
        audio.addEventListener('pause', function (e) {
            setPlay(false)
        });
        audio.addEventListener("play", function (e) {
            setPlay(true)
        });
        
        // Converte o áudio em uma string base64 e atualiza o estado de texto.
        let text = await b2text(blob)
        setText(text)
        
        // Atualiza os estados indicando o fim da gravação.
        setStart(false)
        
        // Chama a função de transcrição e atualiza o estado de resposta.
        let response = await Transcribe(text)
        response ? setResponse(response.data.response_whisper) : setResponse('Erro na transcrição')
    }

    // Configura um timeout para parar a gravação após o tempo especificado.
    timeOut = setTimeout(() => recorder.stop(), time);
})

// Função para interromper a gravação prematuramente.
export var stopRecordingEarly = () => {
    if (recorder) {
        // Limpa o timeout e interrompe a gravação.
        clearTimeout(timeOut);
        recorder.stop();
    }
}
