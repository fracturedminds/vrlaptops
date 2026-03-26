import axios from 'axios';

const api = axios.create({
//   baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000', // your NestJS backend URL
 baseURL:'http://localhost:3000', 

});

// Request interceptor to add the token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;