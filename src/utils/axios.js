// axiosInterceptorInstance.js

import axios from 'axios';
import useAuthStore from '@/store/useAuthStore';

const axiosInstance = axios.create({
//   baseURL: 'https://your-api-base-url.com/', // Replace with your API base URL
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  // baseURL: 'http://localhost:7000',
  headers: {
    'Content-Type': 'application/json', // Default headers
  }, // Replace with your API base URL
});

console.log("env",process.env.NEXT_PUBLIC_API_URL);

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Modify the request config here (add headers, authentication tokens)

    // const accessToken = JSON.parse(localStorage.getItem("token"));
    const accessToken = useAuthStore.getState().token;

    // console.log("access token form axios",accessToken);

    // If token is present, add it to request's Authorization Header
    // If token is present, add it to request's Authorization Header
    if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
      return config;
  },
  (error) => {
    // Handle request errors here
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Modify the response data here
    return response;
  },
  (error) => {
    // Handle response errors here
    return Promise.reject(error);
  }
);

export default axiosInstance;