import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';


// Create axios instance with base URL
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const registerUser = async (userData) => {
  try {
    console.log('Registering user with data:', { ...userData, password: '[REDACTED]' });
    const response = await api.post('/auth/register', userData);
    console.log('Registration response:', response.data);
    
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    console.error('Registration error:', error.response || error);
    const errorMessage = 
      error.response?.data?.message || 
      error.response?.data?.error || 
      error.message || 
      'Registration failed';
    throw new Error(errorMessage);
  }
};

export const loginUser = async (userData) => {
  try {
    // Check for admin login first
    if (userData.userType === 'admin') {
      // Allow both username and email for admin
      if ((userData.emailOrUsername === 'Monakhalil' || userData.emailOrUsername === 'monakhalil@examify.com') 
          && userData.password === 'examify') {
        const adminData = {
          token: 'admin-token',
          user: {
            id: 1,
            name: 'Mona Khalil',
            email: 'monakhalil@examify.com',
            userType: 'admin',
            contact: '+92 300 1234567'
          }
        };
        localStorage.setItem('token', adminData.token);
        localStorage.setItem('user', JSON.stringify(adminData));
        return adminData;
      } else {
        throw new Error('Invalid admin credentials');
      }
    }

    // For other user types, proceed with API call
    // Transform the emailOrUsername to match the backend expectation
    const loginPayload = {
      ...userData,
      email: userData.emailOrUsername, // Backend still expects 'email' field
      username: userData.emailOrUsername // Add username field for backend to check both
    };
    delete loginPayload.emailOrUsername; // Remove the combined field

    const response = await api.post('/auth/login', loginPayload);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message || 'Login failed');
  }
};

export const requestPasswordReset = async (email) => {
  try {
    const response = await fetch(`${API_URL}/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to send reset email');
    }
    return data;
  } catch (error) {
    throw error;
  }
};

export const resetPassword = async (token, password) => {
  try {
    const response = await fetch(`${API_URL}/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, password })
    });
    
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to reset password');
    }
    return data;
  } catch (error) {
    throw error;
  }
};

export const logoutUser = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

// User Management API Functions
export const getAllUsers = async () => {
  try {
    const response = await api.get('/api/users');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message || 'Failed to fetch users');
  }
};

export const updateUserRole = async (userId, newRole) => {
  try {
    const response = await api.put(`/api/users/${userId}/role`, { role: newRole });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message || 'Failed to update user role');
  }
};

export const toggleUserStatus = async (userId) => {
  try {
    const response = await api.put(`/api/users/${userId}/toggle-status`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message || 'Failed to toggle user status');
  }
};

export const getUserDetails = async (userId) => {
  try {
    const response = await api.get(`/api/users/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message || 'Failed to fetch user details');
  }
}; 