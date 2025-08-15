import axios from 'axios';
import { ACCESS_TOKEN } from './constants';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(ACCESS_TOKEN);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    console.warn('No access token found. Request might fail.');
  }

  return config;
});

export const sendPrompt = async (prompt) => {
  try {
    console.log('Sending prompt:', prompt);
    
    const response = await axios.post(`${API_BASE_URL}/ai/`, {
      prompt: prompt
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 60000, // 60 seconds
    });

    console.log('API response:', response.data);
    return response.data;
    
  } catch (error) {
    console.error('API error:', error);
    
    if (error.response) {

      console.error('Error Status:', error.response.status);
      console.error('Error Data:', error.response.data);
      console.error('Full Error Response:', {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data,
        headers: error.response.headers
      });
      
      const errorMsg = error.response.data?.error || 
                      error.response.data?.details || 
                      `HTTP ${error.response.status}: ${error.response.statusText}`;
      
      throw new Error(`AI API Error: ${errorMsg}`);
      
    } else if (error.request) {

      console.error('🌐 Network Error - No response received:', error.request);
      throw new Error('Network Error: No response from server');
      
    } else {

      console.error('Request Setup Error:', error.message);
      throw new Error(`Request Error: ${error.message}`);
    }
  }
};

export default api;