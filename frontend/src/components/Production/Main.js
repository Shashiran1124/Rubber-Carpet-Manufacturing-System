import React from 'react';
import { Box, Typography, Card, CardContent, Grid, Container } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import BuildIcon from '@mui/icons-material/Build';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import GavelIcon from '@mui/icons-material/Gavel';
import backgroundImage from '../../images/back5.jpeg';

// Keyframe animation for fading in the entire section
const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

// Full page background with image
const PageContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  backgroundImage: `url(${backgroundImage})`,  // Ensure the image path is correct
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed', // Make background image fixed on scroll
  color: '#fff',
}));

// Dark background for banner with fade-in effect for the entire section
const BannerSection = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(12),
  backgroundColor: 'rgba(0, 0, 0, 0.7)', // Dark background with transparency
  color: '#fff',
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[6],
  position: 'relative',
  overflow: 'hidden',
  animation: `${fadeIn} 2s ease-out`, // Fading effect for entire banner section
}));

const HighlightText = styled('span')(({ theme }) => ({
  color: '#FFD700', // Golden color for highlight
  fontWeight: 'bold',
  textShadow: '2px 2px 8px rgba(0, 0, 0, 0.5)', // Text shadow for added depth
}));

const Section = styled(Box)(({ theme }) => ({
  //marginTop: theme.spacing(8),
}));

const CustomCard = styled(Card)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius * 2, // More rounded corners
  boxShadow: '0 6px 18px rgba(0,0,0,0.1)', // Soft shadow for depth
  background: 'linear-gradient(135deg, #f8f8f8 30%, #e0e0e0 100%)', // Gradient for card background
  transition: 'transform 0.3s ease-in-out', // Animation for hover
  '&:hover': {
    transform: 'translateY(-10px)', // Lift the card on hover
    boxShadow: '0 12px 24px rgba(0,0,0,0.15)', // Stronger shadow on hover
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  fontSize: '4rem',
  color: theme.palette.primary.main, // Icon color
  marginBottom: theme.spacing(2),
}));

const CustomTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(1),
}));

const Main = () => {
  // Array of services details with icons
  const services = [
    { title: 'Consulting', description: 'Expert guidance to help you make informed decisions about rubber products and eco-friendly solutions.', icon: <GavelIcon /> },
    { title: 'Custom Manufacturing', description: 'Tailored production services to meet your specific requirements, ensuring quality and precision.', icon: <PrecisionManufacturingIcon /> },
    { title: 'Supply Chain Management', description: 'Efficient management of the supply chain from raw materials to final delivery.', icon: <LocalShippingIcon /> },
  ];

  return (
    <PageContainer>
      {/* Banner Section */}
      <BannerSection>
        <Box position="relative" zIndex="1">
          <Typography variant="h2" component="h1" gutterBottom>
            Welcome to <HighlightText>P.R.I. RUBBER</HighlightText>
          </Typography>
          <Typography variant="h6" component="p" gutterBottom>
            Discover Our 10+ Eco-Friendly Products For 2024
          </Typography>
        </Box>
      </BannerSection>

      {/* Our Services Section */}
      <Section>
        <Container maxWidth="lg">
          <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#fff' }}>
            Our Services
          </Typography>
          <Typography variant="body1" align="center" color='#fff' gutterBottom sx={{ marginBottom: 4 }}>
            We offer a wide range of services to meet all your needs in the rubber industry.
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {services.map((service, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <CustomCard>
                  <CardContent>
                    {/* Icon */}
                    <IconWrapper>
                      {service.icon}
                    </IconWrapper>
                    {/* Service Title */}
                    <CustomTypography variant="h5" component="h2">
                      {service.title}
                    </CustomTypography>
                    {/* Service Description */}
                    <Typography variant="body2" color="textSecondary">
                      {service.description}
                    </Typography>
                  </CardContent>
                </CustomCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Section>
    </PageContainer>
  );
};

export default Main;
