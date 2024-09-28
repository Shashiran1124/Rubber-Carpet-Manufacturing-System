import React from 'react';
import { Typography, Box, Grid, Link, Container, IconButton } from '@mui/material';
import Facebook from '@mui/icons-material/Facebook';
import LinkedIn from '@mui/icons-material/LinkedIn';
import Instagram from '@mui/icons-material/Instagram';
import Twitter from '@mui/icons-material/Twitter';
import Pinterest from '@mui/icons-material/Pinterest';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#f9f9f9',
        paddingTop: '40px',
        paddingBottom: '20px',
        borderTop: '1px solid #e0e0e0',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Useful Links Section */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
              USEFUL LINKS
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Link href="#" color="inherit" underline="hover">
                Privacy Policy
              </Link>
              <Link href="#" color="inherit" underline="hover">
                Categories
              </Link>
              <Link href="#" color="inherit" underline="hover">
                About Us
              </Link>
              <Link href="#" color="inherit" underline="hover">
                Videos
              </Link>
              <Link href="#" color="inherit" underline="hover">
                More
              </Link>
            </Box>
          </Grid>

          {/* Navigation Links */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
              NAVIGATION
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Link href="#" color="inherit" underline="hover">
                Home
              </Link>
              <Link href="#" color="inherit" underline="hover">
                Products
              </Link>
              <Link href="#" color="inherit" underline="hover">
                Gallery
              </Link>
              <Link href="#" color="inherit" underline="hover">
                Testimonials
              </Link>
            </Box>
          </Grid>

          {/* Contact Section */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
              CONTACT
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Palm Court Bldg M, 501/B, 5th Floor, New Link Road, 
              Beside Goregaon Sports Complex, Malad West, 
              Mumbai, Maharashtra 400064, India
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ marginTop: '10px' }}>
              +91-8888888888
            </Typography>
            <Typography variant="body2" color="textSecondary">
              websupport@justdial.com
            </Typography>
          </Grid>
        </Grid>

        {/* Social Media Section */}
        <Box sx={{ marginTop: '40px', textAlign: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
            CONNECT
          </Typography>
          <Box>
            <IconButton href="#" sx={{ color: '#34a853', marginRight: '10px' }}>
              <Facebook fontSize="large" />
            </IconButton>
            <IconButton href="#" sx={{ color: '#34a853', marginRight: '10px' }}>
              <LinkedIn fontSize="large" />
            </IconButton>
            <IconButton href="#" sx={{ color: '#34a853', marginRight: '10px' }}>
              <Instagram fontSize="large" />
            </IconButton>
            <IconButton href="#" sx={{ color: '#34a853', marginRight: '10px' }}>
              <Twitter fontSize="large" />
            </IconButton>
            <IconButton href="#" sx={{ color: '#34a853' }}>
              <Pinterest fontSize="large" />
            </IconButton>
          </Box>
        </Box>

        {/* Copyright Section */}
        <Box sx={{ marginTop: '20px', textAlign: 'center' }}>
          <Typography variant="body2" color="textSecondary">
            © Copyrights 2023 - 2024 Prism Home Decor. All Rights Reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
