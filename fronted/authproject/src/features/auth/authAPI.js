import axios from 'axios';

const API_URL = '/api/auth/';

export const login = async (userData) => {
  const response = await axios.post(`${API_URL}login`, userData);
  return response.data;
};

export const register = async (userData) => {
  const response = await axios.post(`${API_URL}register`, userData);
  return response.data;
};

export const verifyToken = async () => {
  const response = await axios.get(`${API_URL}verify`);
  return response.data;
};
