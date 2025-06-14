import axios from 'axios';
import Cookies from 'js-cookie';

// Cria uma instância do axios com a URL base do seu backend
const api = axios.create({
  baseURL: 'http://localhost:3001/api'
});

// Este "interceptor" adiciona o token de autenticação em CADA requisição
// que fizermos usando esta instância 'api'
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('auth_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;