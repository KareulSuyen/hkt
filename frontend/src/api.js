import axios from 'axios';
import { ACCESS_TOKEN } from './constants';

const API_BASE_URL = 'https://hkktn-3.onrender.com';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add CSRF token handling
api.interceptors.request.use((config) => {
  const token = localStorage.getItem(ACCESS_TOKEN);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  // Add CSRF token for non-GET requests
  if (config.method !== 'get') {
    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]')?.value;
    if (csrfToken) {
      config.headers['X-CSRFToken'] = csrfToken;
    }
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

// Fixed User Registration Function
export const registerUser = async (userData) => {
  try {
    console.log('Registering user:', userData);
    console.log('API Base URL:', API_BASE_URL);
    
    // Ensure data structure is correct
    const registrationData = {
      username: userData.username,
      email: userData.email,
      password: userData.password,
      password_confirm: userData.password_confirm || userData.password, // Add confirm if missing
      first_name: userData.first_name || '',
      last_name: userData.last_name || '',
    };
    
    console.log('Sending registration data:', registrationData);
    
    const response = await api.post('/api/user/register/', registrationData, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        // Remove CSRF for API endpoints (assuming you're using DRF without CSRF)
      },
      timeout: 30000,
      withCredentials: false, // Try without credentials first
    });

    console.log('Registration response:', response.data);
    return response.data;
    
  } catch (error) {
    console.error('Registration error:', error);
    
    if (error.response) {
      console.error('Error Status:', error.response.status);
      console.error('Error Data:', error.response.data);
      console.error('Error Headers:', error.response.headers);
      
      let errorMsg = 'Registration failed';
      
      // Handle HTML error responses (400 Bad Request pages)
      if (typeof error.response.data === 'string' && error.response.data.includes('<!doctype html>')) {
        console.error('Received HTML error page instead of JSON');
        
        if (error.response.status === 400) {
          errorMsg = 'Bad Request - Check your data format and CSRF token';
        } else if (error.response.status === 403) {
          errorMsg = 'Forbidden - CSRF token or CORS issue';
        }
        
      } else if (error.response.data && typeof error.response.data === 'object') {
        // Handle Django REST framework validation errors
        const errors = [];
        Object.keys(error.response.data).forEach(field => {
          const fieldErrors = error.response.data[field];
          if (Array.isArray(fieldErrors)) {
            fieldErrors.forEach(err => {
              errors.push(`${field}: ${err}`);
            });
          } else {
            errors.push(`${field}: ${fieldErrors}`);
          }
        });
        errorMsg = errors.length > 0 ? errors.join(', ') : errorMsg;
        
      } else if (typeof error.response.data === 'string') {
        errorMsg = error.response.data;
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

// Alternative registration function without /api/ prefix
export const registerUserAlt = async (userData) => {
  try {
    console.log('Trying alternative endpoint: /user/register/');
    
    const registrationData = {
      username: userData.username,
      email: userData.email,
      password: userData.password,
      password_confirm: userData.password_confirm || userData.password,
      first_name: userData.first_name || '',
      last_name: userData.last_name || '',
    };
    
    const response = await api.post('/user/register/', registrationData, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      timeout: 30000,
    });

    console.log('Registration response (alt):', response.data);
    return response.data;
    
  } catch (error) {
    console.error('Alternative registration error:', error);
    throw error;
  }
};

// Debug function to test what's happening
export const debugRegistration = async (userData) => {
  console.log('=== REGISTRATION DEBUG ===');
  console.log('API Base URL:', API_BASE_URL);
  console.log('User Data:', userData);
  
  // Try to get CSRF token
  try {
    const csrfResponse = await api.get('/');
    console.log('CSRF Response:', csrfResponse.headers);
  } catch (e) {
    console.log('CSRF fetch error:', e);
  }
  
  // Test with minimal data
  const minimalData = {
    username: 'testuser123',
    email: 'test@example.com', 
    password: 'testpass123',
    password_confirm: 'testpass123'
  };
  
  console.log('Testing with minimal data:', minimalData);
  
  try {
    const response = await registerUser(minimalData);
    console.log('✅ Registration successful:', response);
    return response;
  } catch (error) {
    console.log('❌ Registration failed:', error.message);
    throw error;
  }
};

// Rest of your existing functions...
export const loginUser = async (credentials) => {
  try {
    console.log('Logging in user:', credentials.username || credentials.email);
    
    const response = await api.post('/api/token/', credentials, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      timeout: 30000,
    });

    console.log('Login response:', response.data);
    return response.data;
    
  } catch (error) {
    console.error('Login error:', error);
    
    if (error.response) {
      console.error('Error Status:', error.response.status);
      console.error('Error Data:', error.response.data);
      
      let errorMsg = 'Login failed';
      
      if (error.response.data?.detail) {
        errorMsg = error.response.data.detail;
      } else if (error.response.data?.non_field_errors) {
        errorMsg = error.response.data.non_field_errors.join(', ');
      } else if (error.response.data) {
        const errors = Object.values(error.response.data).flat().join(', ');
        errorMsg = errors || errorMsg;
      }
      
      throw new Error(errorMsg);
      
    } else if (error.request) {
      throw new Error('Network Error: Could not reach the server');
    } else {
      throw new Error(`Request Error: ${error.message}`);
    }
  }
};