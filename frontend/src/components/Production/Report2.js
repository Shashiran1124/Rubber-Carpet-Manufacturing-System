import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

// Register the required Chart.js components
Chart.register(ArcElement, Tooltip, Legend);

export default function Reports2() {
  const [orderData, setOrderData] = useState([]);
  const [categorySums, setCategorySums] = useState({
    'Inventory rubber mats': 0,
    'Rubber playground mats': 0,
    'Gym rubber flooring': 0,
    'Commercial rubber flooring': 0,
    'Rubber carpet tile': 0,
    'Rubber runner mats': 0,
  });

  const [totalQuantity, setTotalQuantity] = useState(0); // State to store the total quantity

  // Function to fetch order data from the server
  const fetchOrderData = async () => {
    try {
      const response = await fetch('http://localhost:8070/test/');
      if (response.ok) {
        const data = await response.json();
        setOrderData(data);
      } else {
        console.error('Failed to fetch order data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Fetch order data on component mount
  useEffect(() => {
    fetchOrderData();
  }, []);

  // Update category sums and total quantity whenever orderData changes
  useEffect(() => {
    const calculateSums = () => {
      const sums = {
        'Inventory rubber mats': 0,
        'Rubber playground mats': 0,
        'Gym rubber flooring': 0,
        'Commercial rubber flooring': 0,
        'Rubber carpet tile': 0,
        'Rubber runner mats': 0,
      };

      let totalQty = 0;

      orderData.forEach(order => {
        if (sums.hasOwnProperty(order.name)) {
          sums[order.name] += order.qty;
        }
        totalQty += order.qty; // Calculate the total quantity
      });

      setCategorySums(sums);
      setTotalQuantity(totalQty); // Set total quantity
    };

    calculateSums();
  }, [orderData]);

  // Prepare data for the pie chart
  const pieChartData = {
    labels: Object.keys(categorySums),
    datasets: [
      {
        label: 'Order Quantities',
        data: Object.values(categorySums),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
      },
    ],
  };

  return (
    <Box sx={{ padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f6f8', minHeight: '100vh' }}>
      <Typography variant="h3" sx={{ marginBottom: '20px', color: '#333', textAlign: 'center', fontWeight: 'bold' }}>
        Production Summary Report
      </Typography>

      {/* Pie Chart */}
      <Box sx={{ maxWidth: 600, margin: '0 auto' }}>
        <Pie data={pieChartData} />
      </Box>

      {/* Product Summary */}
      <Typography
        variant="h4"
        sx={{ marginTop: '30px', color: '#333', textAlign: 'center', fontWeight: 'bold' }}
      >
        Product Summary
      </Typography>

      {/* Product List and Quantities */}
      <Grid container spacing={2} sx={{ marginTop: '20px' }}>
        {Object.entries(categorySums).map(([product, quantity], index) => {
          const percentage = totalQuantity > 0 ? ((quantity / totalQuantity) * 100).toFixed(2) : 0; // Calculate percentage

          return (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper
                sx={{
                  padding: '20px',
                  backgroundColor: '#fff',
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                  borderRadius: '10px',
                  textAlign: 'center',
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#555' }}>
                  {product}
                </Typography>
                <Typography variant="h5" sx={{ color: '#333', marginTop: '10px' }}>
                  Total Quantity: {quantity}
                </Typography>
                <Typography variant="h6" sx={{ color: '#777', marginTop: '5px' }}>
                  Percentage: {percentage}%
                </Typography>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
      <div style={{ height: '50px',width: '25%', marginTop: '100px', marginBottom: '30px', borderTop: '2px dotted black', textAlign: 'left', paddingTop: '10px',fontSize: '14px' }}>
      <p style={{ margin: 0 }}>Hashan Lahiru</p>
        <p style={{ margin: 0 }}>Production Handling </p>
        <p style={{ margin: 0 }}>Date:{new Date().toLocaleDateString()}</p>
      </div>
    </Box>
  );
}
