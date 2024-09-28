import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, CircularProgress, Grid } from '@mui/material';
import { TrendingUp, TrendingDown, CheckCircle, Error } from '@mui/icons-material';

export default function Reports() {
  const [progressData, setProgressData] = useState([]);
  const [efficiency, setEfficiency] = useState(null);

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

  // Calculate efficiency when the progress data is available
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
    }
  }, [progressData]);

  return (
    <Box sx={{ padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f6f8', minHeight: '100vh' }}>
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
    </Box>
  );
}
