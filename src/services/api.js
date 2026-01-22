import axios from 'axios';

// Base URL for TikTok API
const BASE_URL = 'https://www.tiktok.com/v2/auth/authorize/';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('tiktok_access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      // Handle specific error codes
      switch (error.response.status) {
        case 401:
          throw new Error('Authentication failed. Please reconnect your account.');
        case 403:
          throw new Error('Access denied. Check your permissions or region restrictions.');
        case 429:
          throw new Error('Rate limit exceeded. Please try again later.');
        case 500:
          throw new Error('Server error. Please try again later.');
        default:
          throw new Error(error.response.data?.message || 'An error occurred');
      }
    } else if (error.request) {
      throw new Error('Network error. Please check your connection.');
    } else {
      throw new Error('Request failed. Please try again.');
    }
  }
);

export default api;