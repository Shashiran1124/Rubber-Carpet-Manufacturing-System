import React from 'react';
import { Container, Box, Paper, Typography, Link, Checkbox, FormControlLabel } from '@mui/material';
import { styled } from '@mui/system';
import RegisterForm from './RegisterForm';
import back6 from '../../images/back10.png';

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

const RegisterBox = styled(Paper)({
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

const RegisterPage = () => {
  return (
    <RootContainer>
      <LeftSection>
        <RegisterBox elevation={3}>
          <Logo variant="h4">Rubber Carpet Factory</Logo>
          <Typography variant="body1" gutterBottom>
            Create a new account
          </Typography>
          <RegisterForm />
          <Typography variant="body2" mt={2}>
            Already have an account? <Link href="/login">Login</Link>
          </Typography>
        </RegisterBox>
      </LeftSection>
      <RightSection />
    </RootContainer>
  );
};

export default RegisterPage;
