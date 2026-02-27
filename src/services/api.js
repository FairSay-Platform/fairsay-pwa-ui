//

import axios from 'axios';

// const API_BASE_URL= "http://localhost:5000/api";

// const api = axios.create({
//     baseURL: API_BASE_URL,
// })

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL + "/api",
  withCredentials: false,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('fs_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('fs_token');
            window.location.href = '/signin';
        } 
        return Promise.reject(error);
    }
)

export default api;