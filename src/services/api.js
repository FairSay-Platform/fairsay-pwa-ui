import axios from 'axios';

// Live Render Backend URL
const API_BASE_URL = "https://fairsay-backend.onrender.com/api";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

// Request Interceptor: Attach JWT for protected workplace reports
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('fs_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
})

// Response Interceptor: Handle session expiration (401)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // If the token is invalid or expired, boot to sign-in
        if (error.response && error.response.status === 401) {

            const activeToken = localStorage.getItem('fs_token');
            
            if (activeToken === 'dev-bypass-token-123') {
                return Promise.reject(error);
            }
            localStorage.removeItem('fs_token');
           
            const currentPath = window.location.pathname;

          if (!['/sign-in', '/sign-up', '/'].includes(currentPath)) {
                window.location.href = '/sign-in';
            }
        } 
        return Promise.reject(error);
    }
)

export default api;