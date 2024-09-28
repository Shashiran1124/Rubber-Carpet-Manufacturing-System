import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext'; // Import AuthContext
import { TextField, Button, Box, Typography } from '@mui/material';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // Get login function from context

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form behavior

    try {
      // Call the registration API endpoint
      const response = await axios.post('http://localhost:8070/test5/register', {
        name,
        email,
        password,
      });

      const userData = {
        _id: response.data._id, // Store the user's ID
        name: response.data.name,
        email: response.data.email,
        token: response.data.token, // Save the token received from backend
      };

      // Set user data in context and localStorage
      login(userData);

      // After successful registration, redirect to the dashboard
      navigate('/app');
    } catch (error) {
      console.error('Error registering user:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
        <Typography variant="h5" gutterBottom>
          Create a New Account
        </Typography>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Register
        </Button>
      </Box>
    </form>
  );
};

export default RegisterForm;
