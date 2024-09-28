import React, { useContext } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LogoutIcon from '@mui/icons-material/Logout';
import { styled, keyframes } from '@mui/system';

// Define keyframes for text animation (Left to Right)
const moveText = keyframes`
  0% {
    transform: translateX(-100%); /* Start from the left */
  }
  100% {
    transform: translateX(100%); /* Move to the right */
  }
`;

// Custom styled components
const StyledAppBar = styled(AppBar)({
  backgroundColor: '#424242', // Dark gray background
  color: '#ffffff', // White text for contrast
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Softer shadow
});

const StyledButton = styled(Button)({
  margin: '0 10px',
  textTransform: 'none',
  color: '#333',
  '&:hover': {
    backgroundColor: '#e0e0e0', // Slightly darker gray on hover
  },
});

// Animated text container
const AnimatedTextContainer = styled(Typography)({
  display: 'inline-block',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  width: '100%',
  animation: `${moveText} 10s linear infinite`, // 10s animation, repeats infinitely
});

const UNavbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <StyledAppBar position="static">
      <Toolbar>
        {/* App title/logo with animation */}
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
          <RouterLink to="/app" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
            <HomeIcon sx={{ marginRight: '8px' }} />
            <AnimatedTextContainer variant="h6">
              YOUR TRUSTED PARTNER IN INNOVATIVE RUBBER MANUFACTURING SOLUTIONS.
            </AnimatedTextContainer>
          </RouterLink>
        </Box>

        {/* Right-aligned buttons */}
        <Box>
          {!user ? (
            <>
              <StyledButton
                component={RouterLink}
                to="/login"
                startIcon={<LoginIcon />}
              >
                Login
              </StyledButton>
              <StyledButton
                component={RouterLink}
                to="/register"
                startIcon={<PersonAddIcon />}
              >
                Register
              </StyledButton>
            </>
          ) : (
            <>
              {/* User Avatar and Welcome Text */}
              <Box display="flex" alignItems="center">
                <Avatar sx={{ bgcolor: '#ff5722', marginRight: '10px' }}>
                  {user.name.charAt(0).toUpperCase()}
                </Avatar>
                <Typography variant="body1" sx={{ marginRight: '1rem' }}>
                  Welcome, {user.name}
                </Typography>
                <IconButton onClick={handleLogout} color="inherit">
                  <LogoutIcon />
                </IconButton>
              </Box>
            </>
          )}
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
};

export default UNavbar;
