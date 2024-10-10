import React, { useState, useEffect } from 'react'; // Import useState and useEffect

import { AppBar, Toolbar, IconButton, Typography, Button, TextField, Container, Box, Grid, Card, CardContent, CardMedia, List, ListItem, ListItemIcon, ListItemText, Link } from '@mui/material';
import { Facebook, Twitter, Instagram, Search, Phone,  LocationOn, ArrowBack, ArrowForward, AddShoppingCart, Mail, AccessTime, LinkedIn, Pinterest } from '@mui/icons-material';

import { useNavigate} from 'react-router-dom';
import { keyframes } from '@mui/system';

// Import your image
import backgroundImage1 from '../../images/back5.jpeg';
import backgroundImage2 from '../../images/back6.jpeg';
import backgroundImage3 from '../../images/back8.png';
import logo from '../../images/logo.png';

import img1 from '../../images/inventory_rubber_mats.jpeg';
import img2 from '../../images/gym_rubber_flooring.jpeg';
import img3 from '../../images/rubber_runner_mats.jpeg';
import img4 from '../../images/rubber_playground_mats.jpeg';
import img5 from '../../images/commercial_flooring.jpeg';
import img6 from '../../images/rubber_carpet_tile.jpeg';
import myImage from '../../images/myImage.png';
import locationMap from '../../images/location-map.png';


const products = [
  { id: 1, name: 'Inventory rubber mats', price: '400LKR', image: img1, description: '' },
  { id: 2, name: 'Gym rubber flooring', price: '1,333LKR', image: img2, description: ''  },
  { id: 3, name:'Rubber runner mats', price: '860LKR', image: img3, description: '' },
  { id: 4, name: 'Rubber playground mats', price: '500LKR', image: img4, description: '' },
  { id: 5, name:'Commercial flooring', price: '600LKR', image: img5, description:  ''},
  { id: 6, name: 'Rubber carpet tile', price: '550LKR', image: img6, description: '' },
];
const textBounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-100px);
  }
`;



    


// Button hover animation
const buttonHover11 = {
  transition: '0.3s',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    transform: 'scale(1.1)',
  }
};





const fadeInUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const buttonHover1 = {
  transition: '0.3s',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    transform: 'scale(1.1)',
  }
};

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const buttonHover = {
  transition: '0.3s',
  '&:hover': {
    backgroundColor: '#7540a7',
    color: '#fff',
  }
};

const StartupPage = () => {
  const navigate = useNavigate(); 


  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const backgroundImages = [backgroundImage1, backgroundImage2, backgroundImage3];

  // Automatically change background image every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 2000);

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? backgroundImages.length - 1 : prevIndex - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
  };

  



  const handleNavigation = (path) => {
    navigate(path);  // Navigate to the desired path
  };

  return (
    <div>
      

      <AppBar position="static" color="default" sx={{ boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', animation: `${fadeIn} 1s ease-in-out` }}>
        <Toolbar style={{ padding: '0 24px', justifyContent: 'space-between' }}>
          {/* Logo and Title */}
          <Box sx={{ display: 'flex', alignItems: 'center', animation: `${fadeIn} 1.5s ease-in-out` }}>
            <img src={logo} alt="P.R.I. Rubber" height="40px" style={{ marginRight: '10px', borderRadius: '5px', transition: 'transform 0.3s' }} onMouseOver={e => (e.currentTarget.style.transform = 'scale(1.1)')} onMouseOut={e => (e.currentTarget.style.transform = 'scale(1)')} />
            <Typography variant="h6" component="div" sx={{ marginRight: '50px', fontWeight: 'bold', letterSpacing: '1px', color: '#7540a7' }}>P.R.I. Rubber</Typography>
            {/* Social Media Icons */}
            <IconButton size="small" sx={{ marginRight: '10px', color: '#3b5998', '&:hover': { transform: 'scale(1.2)', color: '#3b5998' } }}>
              <Facebook />
            </IconButton>
            <IconButton size="small" sx={{ marginRight: '10px', color: '#1DA1F2', '&:hover': { transform: 'scale(1.2)', color: '#1DA1F2' } }}>
              <Twitter />
            </IconButton>
            <IconButton size="small" sx={{ marginRight: '10px', color: '#E1306C', '&:hover': { transform: 'scale(1.2)', color: '#E1306C' } }}>
              <Instagram />
            </IconButton>
          </Box>

          {/* Navigation Buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'center', flexGrow: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', flexGrow: 1 }}>
          <Button
              href="#products"
              sx={{
                mx: 2, // Adjust the spacing between buttons
                border: '2px solid #7540a7',
                borderRadius: '30px',
                padding: '10px 20px',
                width:'88px',
                backgroundColor: '#7540a7',
                color: '#fff',
                transition: '0.3s',
                '&:hover': {
                  background: 'linear-gradient(to right, #2575fc, #6a11cb)',
                  transform: 'scale(1.05)',
                },
              }}
            >
              Products
            </Button>
            <Button
              href="#about-us"
              sx={{
                mx: 2,
                border: '2px solid #7540a7',
                borderRadius: '30px',
                padding: '10px 20px',
                backgroundColor: '#7540a7',
                color: '#fff',
                transition: '0.3s',
                '&:hover': {
                  background: 'linear-gradient(to right, #2575fc, #6a11cb)',
                  transform: 'scale(1.05)',
                },
              }}
            >
              About Us
            </Button>
            <Button
              href="#contact-us"
              sx={{
                mx: 2,
                border: '2px solid #7540a7',
                borderRadius: '30px',
                padding: '10px 20px',
                backgroundColor: '#7540a7',
                color: '#fff',
                transition: '0.3s',
                '&:hover': {
                  background: 'linear-gradient(to right, #2575fc, #6a11cb)',
                  transform: 'scale(1.05)',
                },
              }}
            >
              Contact Us
            </Button>

            {/* Log In and Register Buttons */}
            <Button
              sx={{
                mx: 2, // Adjust the spacing as necessary
                backgroundColor: '#7540a7',
                color: '#fff',
                padding: '10px 25px',
                borderRadius: '30px',
                transition: '0.3s',
                '&:hover': {
                  background: 'linear-gradient(to right, #2575fc, #6a11cb)',
                  transform: 'scale(1.05)',
                },
              }}
              onClick={() => navigate('/login')}
            >
              Log In
            </Button>
            <Button
              sx={{
                mx: 2, // Adjust the spacing as necessary
                backgroundColor: '#7540a7',
                color: '#fff',
                padding: '10px 25px',
                borderRadius: '30px',
                transition: '0.3s',
                '&:hover': {
                  background: 'linear-gradient(to right, #2575fc, #6a11cb)',
                  transform: 'scale(1.05)',
                },
              }}
              onClick={() => navigate('/register')}
            >
              Register
            </Button>
</Box>

</Box>


          {/* Search Bar */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField placeholder="Search" variant="outlined" size="small" sx={{ backgroundColor: '#f9f9f9', borderRadius: '20px', '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#ccc', }, '&:hover fieldset': { borderColor: '#7540a7', }, }, marginRight: '10px', width: '200px', }} />
            <IconButton sx={{ backgroundColor: '#7540a7', color: '#fff', '&:hover': { backgroundColor: '#5c2d91' } }}>
              <Search />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Hero Section */}
      <Box 
        position="relative"
        sx={{ 
          backgroundImage: `url(${backgroundImages[currentImageIndex]})`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center', 
          height: '65vh', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          textAlign: 'center', 
          overflow: 'hidden'
        }}
      >
        {/* Gradient Overlay */}
        <Box sx={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.7))', 
          zIndex: 1 
        }} />

        {/* Text Section with Bounce Animation */}
        <Box 
          sx={{ 
            color: '#fff', 
            position: 'relative', 
            zIndex: 2, 
            animation: `${textBounce} 5s infinite ease-in-out` // Text bounce animation
          }}
        >
          <Typography 
            variant="h2" 
            sx={{ 
              fontWeight: 'bold', 
              textShadow: '2px 2px 4px rgba(0,0,0,0.6)', 
              marginBottom: '20px' 
            }}
          >
            Amazing Carpets
          </Typography>
          <Typography 
            variant="h4" 
            sx={{ 
              fontStyle: 'italic', 
              textShadow: '1px 1px 3px rgba(0,0,0,0.5)' 
            }}
          >
            To Suit Your Style
          </Typography>
        </Box>

         {/* Carousel Buttons */}
         <IconButton 
          onClick={handlePreviousImage}
          sx={{ 
            position: 'absolute', 
            top: '50%', 
            left: '20px', 
            color: '#fff', 
            zIndex: 2, 
            backgroundColor: 'rgba(0, 0, 0, 0.3)', 
            '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.5)' }
          }}
        >
          <ArrowBack fontSize="large" />
        </IconButton>
        <IconButton 
          onClick={handleNextImage}
          sx={{ 
            position: 'absolute', 
            top: '50%', 
            right: '20px', 
            color: '#fff', 
            zIndex: 2, 
            backgroundColor: 'rgba(0, 0, 0, 0.3)', 
            '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.5)' }
          }}
        >
          <ArrowForward fontSize="large" />
        </IconButton>
      </Box>

      {/* Products Section */}
      <Box py={5} id="products">
        <Typography variant="h4" align="center" gutterBottom>PRODUCTS</Typography>
        <Grid container spacing={3} justifyContent="center">
          {products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={2}>
              <Card sx={{ maxWidth: 345, textAlign: 'center', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)' }}>
                <CardMedia component="img" alt={product.name} height="200" image={product.image} />
                <CardContent>
                  <Typography variant="h6" gutterBottom>{product.name}</Typography>
                  {product.description && (
                    <Typography variant="body2" color="textSecondary">{product.description}</Typography>
                  )}
                  <Typography variant="h6" color="primary">{product.price}</Typography>
                  <Button variant="contained" color="success" startIcon={<AddShoppingCart />} sx={{ marginTop: 2, borderRadius: '20px' }} onClick={() => handleNavigation('/login')}>Add</Button>

                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* About Us Section */}
      <Box py={5} px={3} bgcolor="#f9f9f9" id="about-us">
        <Grid container alignItems="center" justifyContent="center">
          {/* Left Image Section */}
          <Grid item xs={12} md={6}>
          <CardMedia component="img" alt="Decorative Image" height="400" image={myImage} sx={{ borderRadius: '10px', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)' }} />

          </Grid>
          {/* Right Text Section */}
          <Grid item xs={12} md={6} sx={{ paddingLeft: { xs: '0', md: '30px' }, marginTop: { xs: '20px', md: '0' } }}>
            <Typography variant="h4" component="h2" gutterBottom>ABOUT US</Typography>
            <Typography variant="body1" color="textSecondary">At P.R.I RUBBER, we specialize in creating durable, high-quality rubber carpets designed for both commercial and residential use. With a focus on innovation and sustainability, we are committed to providing eco-friendly flooring solutions that enhance comfort, safety, and style. Our dedicated team ensures that every product meets the highest standards of performance and design, delivering value and satisfaction to our customers.</Typography>
           
          </Grid>
        </Grid>
      </Box>

      {/* Contact Us Section */}
      <Box py={5} px={3} bgcolor="#f9f9f9" id="contact-us">
        <Typography variant="h4" align="center" gutterBottom>CONTACT US</Typography>
        <Grid container spacing={4} justifyContent="center">
          {/* Left Side - Map */}
          <Grid item xs={12} md={6}>
          <CardMedia component="img" alt="Location Map" image={locationMap} sx={{ borderRadius: '10px', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)' }} />

          </Grid>
          {/* Right Side - Contact Information */}
          <Grid item xs={12} md={6}>
            <List>
              {/* Address */}
              <ListItem>
                <ListItemIcon><LocationOn fontSize="large" color="primary" /></ListItemIcon>
                <ListItemText primary="Our Office Address" secondary=" PRI Rubber Manufacturing (Pvt) Ltd. 123, Industrial Zone, Colombo 05,Colombo,,00500,Sri Lanka" />
              </ListItem>
              {/* Email */}
              <ListItem>
                <ListItemIcon><Mail fontSize="large" color="primary" /></ListItemIcon>
                <ListItemText primary="General Enquiries" secondary="prirubber@email.com" />
              </ListItem>
              {/* Phone */}
              <ListItem>
                <ListItemIcon><Phone fontSize="large" color="primary" /></ListItemIcon>
                <ListItemText primary="Call Us" secondary="+94-78 111 1111" />
              </ListItem>
              {/* Office Hours */}
              <ListItem>
                <ListItemIcon><AccessTime fontSize="large" color="primary" /></ListItemIcon>
                <ListItemText primary="Our Timing" secondary="Mon - Sun: 10:00 AM - 07:00 PM" />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Box>

      {/* Footer */}
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
            PRI Rubber Manufacturing (Pvt) Ltd. 123, Industrial Zone, Colombo 05,Colombo,,00500,Sri Lanka
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ marginTop: '10px' }}>
              +94-78 111 1111
            </Typography>
            <Typography variant="body2" color="textSecondary">
              prirubber@email.com
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
    </div>
  );
};

export default StartupPage;
