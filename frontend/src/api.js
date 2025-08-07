// api.js
import axios from 'axios';
import { ACCESS_TOKEN } from './constants';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
});

// Auto-attach token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem(ACCESS_TOKEN);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Fix: Use the api instance instead of creating a new axios call
export const sendPrompt = async (prompt) => {
  try {
    console.log('Sending prompt:', prompt);
    const response = await api.post('/ai/', {
      prompt: prompt,
    });
    console.log('API response:', response.data);
    return response.data;
  } catch (error) {
    console.error('API error:', error.response?.data || error.message);
    throw error;
  }
};

export default api;