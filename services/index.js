// Arquivo responsável por definir uma instância do axios e fornecer funções de consulta à API.

// Importação da biblioteca axios para realizar chamadas HTTP.
import axios from 'axios';

// Criação da instância da API usando o axios, com a URL base configurada.
const api = axios.create({
    baseURL: 'http://127.0.0.1:8000',
});

// Função de consulta à API para interagir com o assistente virtual.
export async function Query(query, isAudio, idUser) {
    try {
        // Realiza uma solicitação POST para a rota específica com os parâmetros fornecidos.
        const response = await api.post(`/api/assistant/?idUser=${idUser}`, { query: query, use_audio: isAudio });
        return response;
    } catch (error) {
        // Em caso de erro, exibe uma mensagem de erro no console e retorna nulo.
        console.error(error);
        return null;
    }
}

// Função para transcrição de áudio, enviando um arquivo de áudio para a API.
export async function Transcribe(audio_record) {
    try {
        // Realiza uma solicitação POST para a rota específica com o arquivo de áudio fornecido.
        const response = await api.post("/api/transcribe/", { audio_record: audio_record });
        return response;
    } catch (error) {
        // Em caso de erro, exibe uma mensagem de erro no console e retorna nulo.
        console.error(error);
        return null;
    }
}

export async function AlterPDF(index) {
    try {
        const response = await api.post("/api/loader/", { index:index });
        return response;
    } catch (error) {
        console.error(error);
        return null;
    }
}

// Exportação da instância do axios para uso em outras partes do código.
export default api;
