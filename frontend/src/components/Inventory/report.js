import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography, Card, CardContent, CircularProgress, Alert, Avatar, IconButton, Paper } from '@mui/material';
import { Fade } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import DownloadIcon from '@mui/icons-material/Download'; // Import download icon
import jsPDF from 'jspdf'; // Import jsPDF for PDF generation
import PRIImage from '../../images/PRIImage.jpg';

export default function Report() {
  const [inventorySums, setInventorySums] = useState({
    inventoryRubberMats: 0,
    gymRubberFlooring: 0,
    rubberRunnerMats: 0,
    rubberPlaygroundMats: 0,
    commercialRubberFlooring: 0,
    rubberCarpetTiles: 0,
  });

  const [releaseInventorySums, setReleaseInventorySums] = useState({
    inventoryRubberMats: 0,
    gymRubberFlooring: 0,
    rubberRunnerMats: 0,
    rubberPlaygroundMats: 0,
    commercialRubberFlooring: 0,
    rubberCarpetTiles: 0,
  });

  const [differenceSums, setDifferenceSums] = useState({
    inventoryRubberMats: 0,
    gymRubberFlooring: 0,
    rubberRunnerMats: 0,
    rubberPlaygroundMats: 0,
    commercialRubberFlooring: 0,
    rubberCarpetTiles: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInventories = async () => {
      try {
        const [inventoryResponse, releaseInventoryResponse] = await Promise.all([
          fetch('http://localhost:8070/inventoryroute/'),
          fetch('http://localhost:8070/releaseInventoryRoutes/release-inventory')
        ]);

        if (!inventoryResponse.ok) throw new Error('Failed to fetch inventory');
        if (!releaseInventoryResponse.ok) throw new Error('Failed to fetch release inventory');

        const inventoryData = await inventoryResponse.json();
        const releaseInventoryData = await releaseInventoryResponse.json();

        calculateCategorySums(inventoryData, setInventorySums);
        calculateCategorySums(releaseInventoryData, setReleaseInventorySums);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInventories();
  }, []);

  useEffect(() => {
    const calculateDifference = () => {
      const differences = {
        inventoryRubberMats: inventorySums.inventoryRubberMats - releaseInventorySums.inventoryRubberMats,
        gymRubberFlooring: inventorySums.gymRubberFlooring - releaseInventorySums.gymRubberFlooring,
        rubberRunnerMats: inventorySums.rubberRunnerMats - releaseInventorySums.rubberRunnerMats,
        rubberPlaygroundMats: inventorySums.rubberPlaygroundMats - releaseInventorySums.rubberPlaygroundMats,
        commercialRubberFlooring: inventorySums.commercialRubberFlooring - releaseInventorySums.commercialRubberFlooring,
        rubberCarpetTiles: inventorySums.rubberCarpetTiles - releaseInventorySums.rubberCarpetTiles,
      };
      setDifferenceSums(differences);
    };

    calculateDifference();
  }, [inventorySums, releaseInventorySums]);

  const calculateCategorySums = (orders, setSums) => {
    const sums = {
      inventoryRubberMats: 0,
      gymRubberFlooring: 0,
      rubberRunnerMats: 0,
      rubberPlaygroundMats: 0,
      commercialRubberFlooring: 0,
      rubberCarpetTiles: 0,
    };

    orders.forEach((order) => {
      const { productName, quantity } = order;
      const qty = parseFloat(quantity) || 0;
      switch (productName) {
        case 'Inventory Rubber Mats':
          sums.inventoryRubberMats += qty;
          break;
        case 'Gym Rubber Flooring':
          sums.gymRubberFlooring += qty;
          break;
        case 'Rubber Runner Mats':
          sums.rubberRunnerMats += qty;
          break;
        case 'Rubber Playground Mats':
          sums.rubberPlaygroundMats += qty;
          break;
        case 'Commercial Rubber Flooring':
          sums.commercialRubberFlooring += qty;
          break;
        case 'Rubber Carpet Tiles':
          sums.rubberCarpetTiles += qty;
          break;
        default:
          break;
      }
    });

    setSums(sums);
  };

  const downloadReport = () => {
    const doc = new jsPDF();
  
    // Set Title Font and Color
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 128); // Dark Blue color for title
    doc.text('Product Category Report', 14, 20);
  
    // Set Subheading Font and Color
    doc.setFontSize(12);
    doc.setTextColor(128, 0, 128); // Purple color for subheadings
  
    // Save the PDF
    doc.save('product_category_report.pdf');
  };
  
  if (loading) {
    return (
      <Container maxWidth="md" sx={{ textAlign: 'center', marginTop: '20px' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ textAlign: 'center', marginTop: '20px' }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  const barData = {
    labels: [
      'Inventory Rubber Mats',
      'Gym Rubber Flooring',
      'Rubber Runner Mats',
      'Rubber Playground Mats',
      'Commercial Rubber Flooring',
      'Rubber Carpet Tiles'
    ],
    datasets: [
      {
        label: 'Difference (Units)',
        data: [
          differenceSums.inventoryRubberMats,
          differenceSums.gymRubberFlooring,
          differenceSums.rubberRunnerMats,
          differenceSums.rubberPlaygroundMats,
          differenceSums.commercialRubberFlooring,
          differenceSums.rubberCarpetTiles,
        ],
        backgroundColor: [
          '#4a6cf7', // Blue
          '#b84df2', // Purple
          '#f7637c', // Pink
          '#f79d43', // Orange
          '#ffcb45', // Yellow
          '#32a852', // Green
        ],
        borderRadius: 8,
        barPercentage: 0.5,
        borderWidth: 2,
      }
    ]
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Inventory and Release Comparison',
      },
    },
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: '20px' }}>
      {/* Paper wrapping the entire report with a border */}
      <Paper elevation={3} sx={{ padding: 4, border: '3px solid black' }}>
      <Fade in timeout={500}>
          <Grid container justifyContent="center" alignItems="center" direction="column">
            {/* Grid item for the image and header */}
            <Grid item>
              <Avatar alt="User" src={PRIImage} sx={{ width: 150, height: 100 }} />
            </Grid>
            <Grid item>
              <Typography variant="h4" sx={{ marginTop: 4 }}>
                P.R.I Rubber Industries
              </Typography>
            </Grid>
          </Grid>
        </Fade>

        <Fade in timeout={500}>
          <Grid container direction="column">
            {/* Grid item for the image and header */}
              <Typography variant="h7" sx={{ marginTop: 4 }}>
                P.R.I Rubber Industries
              </Typography>
              <Typography variant="h7" sx={{ marginTop: 0 }}>
                Biyagama,
              </Typography>
              <Typography variant="h7" sx={{ marginTop: 0 }}>
                Sri Lanka.
              </Typography>
              <Typography variant="h7" sx={{ marginTop: 0 }}>
                Tell:+9422233322
              </Typography>
              <Typography variant="h7" sx={{ marginTop: 0 }} color="blue">
                Email:Prirubberindustry@gmail.com
              </Typography>
            </Grid>
        </Fade>

        <Grid container spacing={4} sx={{ marginTop: 1 }}>
          <Fade in timeout={500}>
            <Grid item xs={12} sm={10}>
              <Card sx={{ minHeight: '20px', backgroundColor: "#ADB4BF", color: "#000000", border: '1px solid #000' }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom >
                    Product Inventory Summary
                  </Typography>
                  <Typography>Inventory Rubber Mats: {inventorySums.inventoryRubberMats.toFixed(2)} units</Typography>
                  <Typography>Gym Rubber Flooring: {inventorySums.gymRubberFlooring.toFixed(2)} units</Typography>
                  <Typography>Rubber Runner Mats: {inventorySums.rubberRunnerMats.toFixed(2)} units</Typography>
                  <Typography>Rubber Playground Mats: {inventorySums.rubberPlaygroundMats.toFixed(2)} units</Typography>
                  <Typography>Commercial Rubber Flooring: {inventorySums.commercialRubberFlooring.toFixed(2)} units</Typography>
                  <Typography>Rubber Carpet Tiles: {inventorySums.rubberCarpetTiles.toFixed(2)} units</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Fade>
          
          <Fade in timeout={500}>
            <Grid item xs={12} sm={10}>
              <Card sx={{ minHeight: '20px', backgroundColor: "#AFB9CA", color: "#000000", border: '1px solid #000' }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Released Inventory Summary
                  </Typography>
                  <Typography>Inventory Rubber Mats: {releaseInventorySums.inventoryRubberMats.toFixed(2)} units</Typography>
                  <Typography>Gym Rubber Flooring: {releaseInventorySums.gymRubberFlooring.toFixed(2)} units</Typography>
                  <Typography>Rubber Runner Mats: {releaseInventorySums.rubberRunnerMats.toFixed(2)} units</Typography>
                  <Typography>Rubber Playground Mats: {releaseInventorySums.rubberPlaygroundMats.toFixed(2)} units</Typography>
                  <Typography>Commercial Rubber Flooring: {releaseInventorySums.commercialRubberFlooring.toFixed(2)} units</Typography>
                  <Typography>Rubber Carpet Tiles: {releaseInventorySums.rubberCarpetTiles.toFixed(2)} units</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Fade>
        </Grid>

        <div style={{ height: '400px', marginTop: '20px' }}>
          <Bar data={barData} options={barOptions} />
        </div>

        <Fade in timeout={500}>
          <Grid container direction="column">
            {/* Grid item for the image and header */}
              <Typography variant="h7" sx={{ marginTop: 4 }}>
                ............................................
              </Typography>
              <Typography variant="h7" sx={{ marginTop: 0 }}>
              Inventory Manager
              </Typography>
              <Typography variant="h7" sx={{ marginTop: 0 }}>
              P.R.I Rubber Industries
              </Typography>
              <Typography variant="h7" sx={{ marginTop: 0 }}>
                Date: 10/07/2024
              </Typography>
              
              
            </Grid>
        </Fade>

        
      </Paper>
    </Container>
  );
}
