import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
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

  // Update category sums whenever orderData changes
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

      orderData.forEach(order => {
        if (sums.hasOwnProperty(order.name)) {
          sums[order.name] += order.qty;
        }
      });

      setCategorySums(sums);
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

      <Box sx={{ maxWidth: 600, margin: '0 auto' }}>
        <Pie data={pieChartData} />
      </Box>
    </Box>
  );
}
