import React, { useState, useContext } from 'react';
import { TextField, Button, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext'; // Import AuthContext

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Use navigate hook
  const { login } = useContext(AuthContext); // Get the login function from AuthContext

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Update the API URL to the correct port (8070)
      const response = await axios.post('http://localhost:8070/test5/login', {
        email,
        password,
      });

      const userData = {
        _id: response.data._id, // Store the user's ID
        name: response.data.name,
        email: response.data.email,
        token: response.data.token,
      };

      login(userData); // Store user data in context and localStorage
      navigate('/app'); // Redirect to dashboard after successful login
    } catch (error) {
      console.error('Error logging in:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        fullWidth
        label="Email"
        type="email"
        variant="outlined"
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <TextField
        fullWidth
        label="Password"
        type="password"
        variant="outlined"
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2, padding: '10px 0' }}
      >
        Log In
      </Button>
    </Box>
  );
};

export default LoginForm;
