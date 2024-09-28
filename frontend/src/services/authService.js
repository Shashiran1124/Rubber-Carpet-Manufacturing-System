import axios from 'axios';

const API_URL = '/test'; // Update with your backend route

// user1 (massina mata dapu nama)

// Login function
export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data; // This should return user data, including the token
};

// Register function
export const register = async (name, email, password) => {
  const response = await axios.post(`${API_URL}/register`, { name, email, password });
  return response.data; // This should return user data, including the token
};
