import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000/api';

export const login = (userData) => {
  return axios.post(`${apiUrl}/auth/login`, userData, { Headers: { 'Content-Type': 'application/json' }});
};

export const register = (userData) => {
  return axios.post(`${apiUrl}/auth/register`, userData, { Headers: { 'Content-Type': 'application/json' }});
};
