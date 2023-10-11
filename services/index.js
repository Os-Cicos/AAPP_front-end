import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080',
});

export async function Query(message) {
    try {
        const response = await api.post("http://127.0.0.1:8000/api/assistant/", { query: message });
        console.log(response.data.response);
        return response.data.response;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export default api;