import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, CircularProgress, Grid, Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { TrendingUp, TrendingDown, CheckCircle, Error, Star, StarOutline } from '@mui/icons-material';

export default function Reports() {
  const [progressData, setProgressData] = useState([]);
  const [efficiency, setEfficiency] = useState(null);
  const [highestQualityLine, setHighestQualityLine] = useState({ lineName: '', percentage: 0 });
  const [lowestQualityLine, setLowestQualityLine] = useState({ lineName: '', percentage: 100 });
  const [trendData, setTrendData] = useState({ labels: [], data: [] });
  const [lineRatings, setLineRatings] = useState([]);

  // Function to fetch production progress data from the server
  const fetchProgressData = async () => {
    try {
      const response = await fetch('http://localhost:8070/test4/progress');
      if (response.ok) {
        const data = await response.json();
        setProgressData(data);
      } else {
        console.error('Failed to fetch progress data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchProgressData();
  }, []);

  useEffect(() => {
    if (progressData.length > 0) {
      const totalGoodUnits = progressData.reduce((sum, item) => sum + item.lgoodunit, 0);
      const totalDefectiveUnits = progressData.reduce((sum, item) => sum + item.lDefectiveunit, 0);
      const totalUnits = totalGoodUnits + totalDefectiveUnits;

      if (totalUnits > 0) {
        const efficiencyPercentage = (totalGoodUnits / totalUnits) * 100;
        setEfficiency(efficiencyPercentage.toFixed(2));
      } else {
        setEfficiency(0);
      }

      let highestQuality = { lineName: '', percentage: 0 };
      let lowestQuality = { lineName: '', percentage: 100 };

      progressData.forEach((progress) => {
        const totalUnitsForLine = progress.lgoodunit + progress.lDefectiveunit;
        const qualityPercentage = totalUnitsForLine > 0 ? (progress.lgoodunit / totalUnitsForLine) * 100 : 0;

        if (qualityPercentage > highestQuality.percentage) {
          highestQuality = { lineName: progress.lname, percentage: qualityPercentage };
        }

        if (qualityPercentage < lowestQuality.percentage) {
          lowestQuality = { lineName: progress.lname, percentage: qualityPercentage };
        }
      });

      setHighestQualityLine(highestQuality);
      setLowestQualityLine(lowestQuality);

      const trendLabels = progressData.map((progress) => progress.lname);
      const trendDataPoints = progressData.map((progress) => {
        const totalUnitsForLine = progress.lgoodunit + progress.lDefectiveunit;
        return totalUnitsForLine > 0 ? (progress.lgoodunit / totalUnitsForLine) * 100 : 0;
      });

      setTrendData({ labels: trendLabels, data: trendDataPoints });

      const ratings = progressData.map((progress) => {
        const totalUnitsForLine = progress.lgoodunit + progress.lDefectiveunit;
        const qualityPercentage = totalUnitsForLine > 0 ? (progress.lgoodunit / totalUnitsForLine) * 100 : 0;

        let rating = 0;
        if (qualityPercentage >= 90) {
          rating = 5;
        } else if (qualityPercentage >= 75) {
          rating = 4;
        } else if (qualityPercentage >= 60) {
          rating = 3;
        } else if (qualityPercentage >= 40) {
          rating = 2;
        } else if (qualityPercentage >= 20) {
          rating = 1;
        } else {
          rating = 0;
        }
        return { lineName: progress.lname, rating };
      });
      setLineRatings(ratings);
    }
  }, [progressData]);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(<Star key={i} sx={{ color: '#ff0015' }} />);
      } else {
        stars.push(<StarOutline key={i} sx={{ color: '#ff0015' }} />);
      }
    }
    return stars;
  };

  return (
    <Box sx={{ padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f6f8', minHeight: '100vh' }}>
      {/* New Contact Information Section */}
      <Box sx={{ textAlign: 'left', paddingTop: '10px', fontSize: '12px' }}>
        <Box sx={{ height: '50px', width: '25%', paddingTop: '10px' }}>
          <Typography variant="body2" sx={{ margin: 0 }}>PRI Rubber Industry</Typography>
          <Typography variant="body2" sx={{ margin: 0 }}>Colombo 07</Typography>
          <Typography variant="body2" sx={{ margin: 0 }}>Sri Lanka</Typography>
          <Typography variant="body2" sx={{ margin: 0 }}>Tell: +94 781 111 111</Typography>
          <Typography variant="body2" sx={{ margin: 0 }}>
            Email: 
            <Link href="mailto:malindu113@gmail.com" sx={{ textDecoration: 'none', color: 'blue' }}>
              malindu113@gmail.com
            </Link>
          </Typography>
        </Box>
      </Box>
      
      <Typography variant="h3" sx={{ marginBottom: '20px', color: '#333', textAlign: 'center', fontWeight: 'bold' }}>
        PRI RUBBER CARPET
      </Typography>
      <Typography variant="h3" sx={{ marginBottom: '20px', color: '#333', textAlign: 'center', fontWeight: 'bold' }}>
        Production Efficiency Report
      </Typography>
      
      {/* Display efficiency */}
      <Card
        sx={{
          maxWidth: 600,
          margin: '0 auto',
          padding: '20px',
          backgroundColor: '#fff',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          borderRadius: '10px',
        }}
      >
        <CardContent>
          <Grid container alignItems="center" justifyContent="center" spacing={2}>
            <Grid item>
              {efficiency !== null ? (
                efficiency >= 80 ? (
                  <CheckCircle sx={{ fontSize: 60, color: '#28a745' }} />
                ) : (
                  <Error sx={{ fontSize: 60, color: '#dc3545' }} />
                )
              ) : (
                <CircularProgress sx={{ color: '#007bff' }} />
              )}
            </Grid>
            <Grid item>
              {efficiency !== null ? (
                <Typography variant="h4" sx={{ color: '#333', fontWeight: 'bold' }}>
                  Product Efficiency: {efficiency}%
                </Typography>
              ) : (
                <Typography variant="h6" sx={{ color: '#555' }}>
                  Calculating efficiency...
                </Typography>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Display highest and lowest quality lines */}
      <Grid container spacing={4} sx={{ marginTop: '40px' }}>
        <Grid item xs={12} sm={6}>
          <Card
            sx={{
              background: 'linear-gradient(135deg, #d7e5f1, #f4f9fc)',
              color: '#000',
              padding: '20px',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
              borderRadius: '10px',
            }}
          >
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
                Highest Quality Line
              </Typography>
              <Typography variant="h6">Line Name: {highestQualityLine.lineName}</Typography>
              <Typography variant="h6">Quality Percentage: {highestQualityLine.percentage.toFixed(2)}%</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Card
            sx={{
              background: 'linear-gradient(135deg, #d7e5f1, #f4f9fc)',
              color: '#000',
              padding: '20px',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
              borderRadius: '10px',
            }}
          >
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
                Lowest Quality Line
              </Typography>
              <Typography variant="h6">Line Name: {lowestQualityLine.lineName}</Typography>
              <Typography variant="h6">Quality Percentage: {lowestQualityLine.percentage.toFixed(2)}%</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Additional Information Cards */}
      <Grid container spacing={4} sx={{ marginTop: '40px' }}>
        <Grid item xs={12} sm={6}>
          <Card
            sx={{
              backgroundColor: '#7D2CE0',
              color: '#fff',
              padding: '20px',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
              borderRadius: '10px',
            }}
          >
            <CardContent>
              <Grid container alignItems="center">
                <Grid item>
                  <TrendingUp sx={{ fontSize: 50, color: '#28a745' }} />
                </Grid>
                <Grid item sx={{ marginLeft: '20px' }}>
                  <Typography variant="h5">Good Units</Typography>
                  <Typography variant="h6">
                    {progressData.reduce((sum, item) => sum + item.lgoodunit, 0)}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card
            sx={{
              backgroundColor: '#dc3545',
              color: '#fff',
              padding: '20px',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
              borderRadius: '10px',
            }}
          >
            <CardContent>
              <Grid container alignItems="center">
                <Grid item>
                  <TrendingDown sx={{ fontSize: 50, color: '#ffc107' }} />
                </Grid>
                <Grid item sx={{ marginLeft: '20px' }}>
                  <Typography variant="h5">Defective Units</Typography>
                  <Typography variant="h6">
                    {progressData.reduce((sum, item) => sum + item.lDefectiveunit, 0)}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

{/* Trend Over Time (Table) */}
<Box sx={{ marginTop: '40px' }}>
  <Card
    sx={{
      backgroundColor: '#f9f9f9', // Light background color
      padding: '20px',
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.08)', // Softer shadow for a smoother look
      borderRadius: '16px', // Rounded corners
      border: '1px solid #e0e0e0', // Soft border for more definition
    }}
  >
    <CardContent>
      <Typography
        variant="h5"
        sx={{
          marginBottom: '20px',
          textAlign: 'center',
          fontWeight: 'bold',
          color: '#333', // Slightly darker text for contrast
        }}
      >
        Quality Percentage Trend and Line Ratings Over Time
      </Typography>
      <TableContainer
        component={Paper}
        sx={{
          boxShadow: 'none', // Remove extra shadows from the table container
          borderRadius: '12px', // Smooth edges on the table
        }}
      >
        <Table sx={{ backgroundColor: '#fff' }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#e8f5e9' }}> {/* Light green background for table headers */}
              <TableCell
                sx={{
                  color: '#2e7d32',
                  fontWeight: 'bold',
                  padding: '16px',
                  width: '30%', // Set width for better column balancing
                }}
              >
                Line Name
              </TableCell>
              <TableCell
                sx={{
                  color: '#2e7d32',
                  fontWeight: 'bold',
                  padding: '16px',
                  width: '30%', // Set width for better column balancing
                  textAlign: 'center',
                }}
              >
                Quality Percentage
              </TableCell>
              <TableCell
                sx={{
                  color: '#2e7d32',
                  fontWeight: 'bold',
                  padding: '16px',
                  width: '40%', // Set width for better column balancing
                  textAlign: 'center', // Center align for the ratings column
                }}
              >
                Line Rating
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {trendData.labels.map((label, index) => (
              <TableRow
                key={index}
                sx={{
                  '&:nth-of-type(odd)': { backgroundColor: '#f4f6f8' }, // Light grey background for odd rows
                  '&:nth-of-type(even)': { backgroundColor: '#ffffff' }, // White for even rows
                  transition: 'background-color 0.3s ease', // Smooth transition for hover
                  '&:hover': { backgroundColor: '#f1f8e9' }, // Light hover effect
                }}
              >
                <TableCell sx={{ padding: '16px' }}>{label}</TableCell>
                <TableCell sx={{ padding: '16px', textAlign: 'center' }}>
                  {trendData.data[index].toFixed(2)}%
                </TableCell>
                <TableCell sx={{ padding: '16px', textAlign: 'center' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    {renderStars(lineRatings[index].rating)} {/* Render the star ratings */}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </CardContent>
  </Card>
</Box>

    </Box>
  );
}
