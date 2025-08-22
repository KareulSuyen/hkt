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
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export const sendPrompt = async (prompt) => {
  try {
    console.log('Sending prompt to AI endpoint:', prompt);
    
    const response = await api.post('/ai/ai/', {
      prompt: prompt
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 60000, 
    });

    console.log('AI API response:', response.data);
    return response.data;
    
  } catch (error) {
    console.error('AI API error:', error);
    
    if (error.response) {
      console.error('Error Status:', error.response.status);
      console.error('Error Data:', error.response.data);
      
      const errorMsg = error.response.data?.error || 
      error.response.data?.details || 
      error.response.data?.message ||
      `HTTP ${error.response.status}: ${error.response.statusText}`;
      
      throw new Error(`AI API Error: ${errorMsg}`);
      
    } else if (error.request) {
      console.error('Network Error - No response received');
      throw new Error('Network Error: No response from server. Please check your connection.');
      
    } else {
      console.error('Request Setup Error:', error.message);
      throw new Error(`Request Error: ${error.message}`);
    }
  }
};

export const submitIssueReport = async (reportData) => {
  try {
    console.log('Submitting issue report:', reportData);
    
    const response = await api.post('/report-issue/', reportData, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 30000,
    });

    console.log('Report submission response:', response.data);
    return response.data;
    
  } catch (error) {
    console.error('Report submission error:', error);
    
    if (error.response) {
      console.error('Error Status:', error.response.status);
      console.error('Error Data:', error.response.data);
      
      let errorMsg = 'Failed to submit report';
      
      if (error.response.data?.error) {
        errorMsg = error.response.data.error;
      } else if (error.response.data) {
        const errors = Object.values(error.response.data).flat().join(', ');
        errorMsg = errors || errorMsg;
      }
      
      throw new Error(errorMsg);
      
    } else if (error.request) {
      console.error('Network Error - No response received');
      throw new Error('Network Error: Could not reach the server');
      
    } else {
      console.error('Request Setup Error:', error.message);
      throw new Error(`Request Error: ${error.message}`);
    }
  }
};

export const testAPIConnection = async () => {
  try {
    const response = await api.get('/');
    return { success: true, data: response.data };
  } catch (error) {
    return { 
      success: false, 
      error: error.message,
      details: error.response?.data 
    };
  }
};

export default api;