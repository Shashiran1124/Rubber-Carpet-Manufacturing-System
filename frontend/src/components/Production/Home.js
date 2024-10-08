import React from 'react';
//import { Box ,Typography,Grid,CardMedia,List, ListItem, ListItemIcon, ListItemText} from '@mui/material';

import Main from './Main';
import Footer from './Footer';
import Sidebar2 from './Sidebar2';



import img1 from '../../images/inventory_rubber_mats.jpeg';
import img2 from '../../images/gym_rubber_flooring.jpeg';
import img3 from '../../images/rubber_runner_mats.jpeg';
import img4 from '../../images/rubber_playground_mats.jpeg';
import img5 from '../../images/commercial_flooring.jpeg';
import img6 from '../../images/rubber_carpet_tile.jpeg';
import myImage from '../../images/myImage.png';
import locationMap from '../../images/location-map.png';




//import { Facebook, Twitter, Instagram, Search, Phone, Email, LocationOn, ArrowBack, ArrowForward, AddShoppingCart, Mail, AccessTime, LinkedIn, Pinterest } from '@mui/icons-material';
import { AppBar, Toolbar, IconButton, Typography, Button, TextField, Container, Box, Grid, Card, CardContent, CardMedia, List, ListItem, ListItemIcon, ListItemText, Link } from '@mui/material';
import { Facebook, Twitter, Instagram, Search, Phone, Email, LocationOn, ArrowBack, ArrowForward, AddShoppingCart, Mail, AccessTime, LinkedIn, Pinterest } from '@mui/icons-material';
import UNavbar from './UNavbar';

const products = [
  { id: 1, name: 'Inventory rubber mats', price: '400LKR', image: img1, description: '' },
  { id: 2, name: 'Gym rubber flooring', price: '1,333LKR', image: img2, description: ''  },
  { id: 3, name:'Rubber runner mats', price: '860LKR', image: img3, description: '' },
  { id: 4, name: 'Rubber playground mats', price: '500LKR', image: img4, description: '' },
  { id: 5, name:'Commercial flooring', price: '600LKR', image: img5, description:  ''},
  { id: 6, name: 'Rubber carpet tile', price: '550LKR', image: img6, description: '' },
];




const Home = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden', // Ensures the background image doesn't overflow


      }}
    >
      {/* Background Image */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1, // Places the background image behind other content
   
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      <UNavbar/>
      <Box sx={{ display: 'flex', flex: 1 }}>
        <Sidebar2 />
        <Box component="main" sx={{ flex: 1, padding: 2 }}>
          <Main />
        </Box>
      </Box>


         {/* Products Section */}
      <Box py={5} id="products">
        <Typography variant="h4"  align="center" gutterBottom>PRODUCTS</Typography>
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
                </CardContent>
              </Card>
            </Grid>
          ))}
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
                <ListItemText primary="Our Office Address" secondary="PRI Rubber Manufacturing (Pvt) Ltd. 123, Industrial Zone, Colombo 05,Colombo,,00500,Sri Lanka" />
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
            <Typography variant="body1" color="textSecondary">At P.R.I RUBBER, we specialize in creating durable, high-quality rubber carpets designed for both commercial and residential use. </Typography>
            <Typography variant="body1" color="textSecondary" mt={2}>With a focus on innovation and sustainability, we are committed to providing eco-friendly flooring solutions that enhance comfort, safety, and style. Our dedicated team ensures that every product meets the highest standards of performance and design, delivering value and satisfaction to our customers.</Typography>
          </Grid>
        </Grid>
      </Box>



      <Footer />
    </Box>
  );
};

export default Home;
