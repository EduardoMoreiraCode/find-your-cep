import axios from 'axios';

// https://viacep.com.br/ws/  baseURL
//13412090/json rota

const api = axios.create({
    baseURL: "https://viacep.com.br/ws/"
});

export default api;