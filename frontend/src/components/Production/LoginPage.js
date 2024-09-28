import React from 'react';
import { Container, Box, Paper, Typography, Link, Checkbox, FormControlLabel, Button } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import LoginForm from './LoginForm';
import back6 from '../../images/back6.jpeg';

// Styled components for layout
const RootContainer = styled(Box)({
  display: 'flex',
  minHeight: '100vh',
});

const LeftSection = styled(Box)({
  flex: 1,
  background: 'linear-gradient(to bottom right, #FFEFBA, #ffffff)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const RightSection = styled(Box)({
  flex: 1,
  backgroundImage: `url(${back6})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
});

const LoginBox = styled(Paper)({
  padding: '2rem',
  maxWidth: '400px',
  width: '100%',
  textAlign: 'center',
  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
  borderRadius: '10px',
});

const Logo = styled(Typography)({
  fontWeight: 'bold',
  marginBottom: '1rem',
});

const LoginPage = () => {
  const navigate = useNavigate(); // Initialize navigate hook

  // Function to handle back navigation
  const handleBackClick = () => {
    navigate('/'); // Navigate to the home startup page
  };

  return (
    <RootContainer>
      <LeftSection>
        <LoginBox elevation={3}>
          <Logo variant="h4">Rubber Carpet Factory</Logo>
          <Typography variant="body1" gutterBottom>
            Log in to your account
          </Typography>
          <LoginForm />
          <Box display="flex" justifyContent="space-between" mt={2}>
            <FormControlLabel control={<Checkbox name="remember" />} label="Keep me logged in" />
          </Box>
          <Typography variant="body2" mt={2}>
            Don't have an account? <Link href="/register">Register</Link>
          </Typography>
          {/* Back Button */}
          <Button onClick={handleBackClick} variant="outlined" color="primary" sx={{ mt: 2 }}>
            Back to Home
          </Button>
        </LoginBox>
      </LeftSection>
      <RightSection />
    </RootContainer>
  );
};

export default LoginPage;
