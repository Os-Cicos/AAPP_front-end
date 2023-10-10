import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080'
});

export async function query(message){
    api.post("/api/pergunta", {query:message})
        .then((response) => {
            console.log(response.data.response)
            return response.data.response
        }).catch((error => {
            console.error(error)
        }))
    return null
}

export default api