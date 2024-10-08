import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Paper, Grid, Card, CardContent, Icon } from '@mui/material';
import { LinearProgress } from '@mui/material'; // Import for progress bars
import {List, ListItem, ListItemIcon, ListItemText, Divider, Box } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import BarChartIcon from '@mui/icons-material/BarChart';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import PRIImage from '../../images/PRI.jpg';


export default function Report() {
  const [costs, setCosts] = useState([]);
  const [monthlyTotals, setMonthlyTotals] = useState({});
  const [chartData, setChartData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedMonthCosts, setSelectedMonthCosts] = useState([]);
  const [bestDistributionAreas, setBestDistributionAreas] = useState([]);

  const theme = useTheme();

  const fetchCosts = async () => {
    try {
      const response = await fetch('http://localhost:8070/controller3/costs');
      if (response.ok) {
        const data = await response.json();
        setCosts(data);
        calculateMonthlyTotals(data);
      } else {
        console.error('Failed to fetch costs');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const calculateMonthlyTotals = (data) => {
    const totals = data.reduce((acc, cost) => {
      const month = cost.Month;
      if (!acc[month]) {
        acc[month] = {
          Transport_Cost: 0,
          Fuel_Cost: 0,
          Vehicle_Repair_Cost: 0,
          Food_Cost: 0,
          Insurance_Cost: 0,
        };
      }
      acc[month].Transport_Cost += parseFloat(cost.Transport_Cost) || 0;
      acc[month].Fuel_Cost += parseFloat(cost.Fuel_Cost) || 0;
      acc[month].Vehicle_Repair_Cost += parseFloat(cost.Vehicle_Repair_Cost) || 0;
      acc[month].Food_Cost += parseFloat(cost.Food_Cost) || 0;
      acc[month].Insurance_Cost += parseFloat(cost.Insurance_Cost) || 0;
      return acc;
    }, {});

    setMonthlyTotals(totals);

    setChartData(
      Object.entries(totals).map(([month, totals]) => ({
        month,
        ...totals,
      }))
    );

    setBestDistributionAreas([
      { area: 'Colombo', score: 95, rating: 'Excellent' },
      { area: 'Kandy', score: 88, rating: 'Very Good' },
      { area: 'Galle', score: 85, rating: 'Good' },
      { area: 'Jaffna', score: 80, rating: 'Good' },
      { area: 'Negombo', score: 75, rating: 'Fair' },
    ]);
  };

  useEffect(() => {
    fetchCosts();
  }, []);

  const handleRowClick = (month) => {
    setSelectedMonth(month);
    setSelectedMonthCosts(
      Object.entries(monthlyTotals[month] || {}).map(([type, value]) => ({
        name: type,
        value,
      }))
    );
  };

  const COLORS = ['#FF8042', '#00C49F', '#FFBB28', '#0088FE', '#FF6361'];

  const generatePDF = () => {
    const reportElement = document.getElementById('report-content');
    html2canvas(reportElement).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.setFontSize(22);
      <div style={{ marginLeft: '450px' }}>
        <img src={PRIImage} alt="PRI" style={{ width: '130px', height: '15vh', borderRadius: '10px' }} />
      </div>
      pdf.text('P.R.I Rubber Industries', 105, 15, { align: 'center' });
      pdf.setFontSize(10);
      pdf.addImage(imgData, 'PRI.jpg', 0, 20, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PRI.jpg', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('Monthly_Cost_Report.pdf');
    });
  };

  const getRatingColor = (rating) => {
    switch (rating) {
      case 'Excellent':
        return theme.palette.success.light;
      case 'Very Good':
        return theme.palette.info.light;
      case 'Good':
        return theme.palette.warning.light;
      case 'Fair':
        return theme.palette.error.light;
      default:
        return theme.palette.grey[200];
    }
  };

  return (
    <div>
      <div
        id="report-content"
        style={{
          padding: '20px',
          backgroundColor: '#f5f5f5',
          borderRadius: '15px',
          height: '380vh',
         
        }}
        
      >
        <div style={{ marginTop:'5px',marginLeft:'500px' }}>
        <img src={PRIImage} alt="PRI" style={{ width: '160px', height: '15vh', borderRadius: '10px' }} />
        </div>
        
<div style={{  marginLeft:'500px',top: '0px', width: '100%', textAlign: 'left', paddingTop: '10px',fontSize: '12px'}}>
      <div style={{ height: '50px', marginLeft:'500px',width: '25%', margin: '0 auto', top: '0px', textAlign: 'left', paddingTop: '10px', }}>
      <p style={{ margin: 0 }}>PRI Rubber Industry </p>
      <p style={{ margin: 0 }}>Colombo 07 </p>
      <p style={{ margin: 0 }}>Sri Lanka </p>
      <p style={{ margin: 0 }}>Tell: +94 xxxxxxxx </p>
      <p style={{ margin: 0 }}>Email:
      <a href="mailto:nishan113@gmail.com" style={{ textDecoration: 'none', color: 'blue' }}>
        nishan113@gmail.com
      </a>
      </p> {/* Clickable email link */}
      </div>
      </div>
        
        
        <Typography
          variant="h4"
          style={{
            marginBottom: '20px',
            textAlign: 'center',
            color: theme.palette.primary.main,
            

          }}
        >
          Monthly Cost Report
          
        </Typography>

        <Paper
        elevation={4}
        style={{
          marginTop: '50px',
          padding: '5px',
          borderRadius: '20px',
          backgroundColor: '#ffffff',
          marginBottom: '40px',
          position: 'relative',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.2)', // Slightly deeper shadow
          
   }}
   
   >
   {/* Title Section */}
   <Typography
    variant="h5"
    style={{
      
      marginBottom: '15px',
      color: theme.palette.primary.main,
      fontWeight: 'bold',
      textAlign: 'center',
      textTransform: 'uppercase',
      letterSpacing: '2px',
      textShadow: '1px 1px 3px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
    }}
  >
    Report Summary
  </Typography>
  <Typography
    variant="body1"
    style={{
      marginBottom: '20px',
      textAlign: 'center',
      color: '#666',
      fontSize: '1.1rem',
      lineHeight: '1.6',
      fontStyle: 'italic',
    }}
  >
    This report summarizes the monthly costs of distribution operations, including transport, food, vehicle maintenance, and fuel expenses. It highlights cost trends, fluctuations, and efficiency initiatives, providing insights into key expenses and strategies to manage rising costs while ensuring smooth logistics and operational effectiveness across the distribution network.
  </Typography>

  <Divider style={{ margin: '20px 0', backgroundColor: theme.palette.primary.light }} />

  {/* Key Highlights Section */}
  <Box style={{ marginBottom: '20px' }}>
    <Typography
      variant="h6"
      style={{
        color: theme.palette.primary.dark,
        marginBottom: '10px',
        fontWeight: 'bold',
        textAlign: 'center',
        textDecoration: 'underline',
        letterSpacing: '1px',

        
      }}
      
    >
      Key Highlights
      
    </Typography>
    <List>
      {[
        { text: 'Total Last Monthly Costs', value: 'Rs 24,200.00', icon: <CurrencyRupeeIcon /> },
        { text: 'Best Distribution Area', value: 'Colombo', icon: <LocationOnIcon /> },
        { text: 'Cost Trend', value: '5% decrease from last month', icon: <TrendingUpIcon /> },
        { text: 'Top Expenses', value: 'Transportation, Fuel, Packaging', icon: <BarChartIcon /> },
      ].map((item, index) => (
        <ListItem key={index} style={{ backgroundColor: '#f9f9f9', borderRadius: '10px', marginBottom: '10px' }}>
          <ListItemIcon>
            {React.cloneElement(item.icon, { style: { color: theme.palette.secondary.main, fontSize: '2.5rem' } })}
          </ListItemIcon>
          <ListItemText
            primary={item.text}
            secondary={item.value}
            primaryTypographyProps={{
              style: { fontWeight: 'bold', color: theme.palette.primary.dark },
            }}
            secondaryTypographyProps={{
              style: { color: '#555', fontStyle: 'italic' },
            }}
          />
        </ListItem>
      ))}
    </List>
  </Box>

  <Divider style={{ margin: '20px 0', backgroundColor: theme.palette.primary.light }} />


</Paper>



        <Paper
          elevation={3}
          style={{
            marginTop: '80px',
            padding: '30px',
            borderRadius: '15px',
            backgroundColor: '#ffffff',
          }}
        >
          <Typography variant="h5" style={{ marginBottom: '20px', color: theme.palette.primary.main }}>
            Total Monthly Costs
          </Typography>
          <table style={{ width: '100%', borderCollapse: 'collapse'}}>
            <thead>
              <tr style={{ backgroundColor: theme.palette.primary.light, color: '#ffffff' }}>
                <th style={{ padding: '12px', border: `1px solid ${theme.palette.divider}` }}>Month</th>
                <th style={{ padding: '12px', border: `1px solid ${theme.palette.divider}` }}>Total Cost</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(monthlyTotals).length > 0 ? (
                Object.entries(monthlyTotals).map(([month, totals]) => (
                  <tr
                    key={month}
                    onClick={() => handleRowClick(month)}
                    style={{
                      cursor: 'pointer',
                      backgroundColor: selectedMonth === month ? '#E3F2FD' : 'transparent',
                      transition: 'background-color 0.3s ease',
                    }}
                  >
                    <td style={{ padding: '12px', border: `1px solid ${theme.palette.divider}` }}>{month}</td>
                    <td style={{ padding: '12px', border: `1px solid ${theme.palette.divider}` }}>
                      {Object.values(totals).reduce((acc, val) => acc + val, 0).toFixed(2)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" style={{ padding: '12px', textAlign: 'center' }}>No cost data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </Paper>

        {chartData.length > 0 && (
  <Paper
    elevation={3}
    style={{
      marginTop: '100px',
      padding: '20px',
      borderRadius: '15px',
      backgroundColor: '#ffffff',
    }}
  >
    <Typography variant="h5" style={{ marginBottom: '15px', color: theme.palette.primary.main }}>
      Monthly Cost Table
    </Typography>
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr style={{ backgroundColor: theme.palette.primary.light, color: '#ffffff' }}>
          <th style={{ padding: '12px', border: `1px solid ${theme.palette.divider}` }}>Month</th>
          <th style={{ padding: '12px', border: `1px solid ${theme.palette.divider}` }}>Transport Cost</th>
          <th style={{ padding: '12px', border: `1px solid ${theme.palette.divider}` }}>Fuel Cost</th>
          <th style={{ padding: '12px', border: `1px solid ${theme.palette.divider}` }}>Vehicle Repair Cost</th>
          <th style={{ padding: '12px', border: `1px solid ${theme.palette.divider}` }}>Food Cost</th>
          <th style={{ padding: '12px', border: `1px solid ${theme.palette.divider}` }}>Insurance Cost</th>
        </tr>
      </thead>
      <tbody>
        {chartData.map((data, index) => (
          <tr key={index}>
            <td style={{ padding: '12px', border: `1px solid ${theme.palette.divider}` }}>{data.month}</td>
            <td style={{ padding: '12px', border: `1px solid ${theme.palette.divider}` }}>{data.Transport_Cost.toFixed(2)}</td>
            <td style={{ padding: '12px', border: `1px solid ${theme.palette.divider}` }}>{data.Fuel_Cost.toFixed(2)}</td>
            <td style={{ padding: '12px', border: `1px solid ${theme.palette.divider}` }}>{data.Vehicle_Repair_Cost.toFixed(2)}</td>
            <td style={{ padding: '12px', border: `1px solid ${theme.palette.divider}` }}>{data.Food_Cost.toFixed(2)}</td>
            <td style={{ padding: '12px', border: `1px solid ${theme.palette.divider}` }}>{data.Insurance_Cost.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </Paper>
)}


        <Paper
          elevation={3}
          style={{
            marginTop: '80px',
            padding: '20px',
            borderRadius: '15px',
            backgroundColor: '#ffffff',
          }}
        >
          <Typography variant="h5" style={{ marginBottom: '10px', color: theme.palette.primary.main }}>
            Best Distribution Areas
          </Typography>
          <Grid container spacing={2}>
            {bestDistributionAreas.map((area) => (
              <Grid item xs={12} sm={6} md={4} key={area.area}>
                <Card
                  style={{
                    borderRadius: '15px',
                    background: `linear-gradient(145deg, ${getRatingColor(area.rating)}, ${theme.palette.background.default})`,
                    color: '#000000',
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" style={{ marginBottom: '8px' }}>
                      {area.area}
                    </Typography>
                    <Typography variant="body2">
                      Score: {area.score} | Rating: {area.rating}
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={area.score}
                      style={{
                        marginTop: '12px',
                        height: '6px',
                        borderRadius: '5px',
                        backgroundColor: theme.palette.grey[300],
                      }}
                    />
                  </CardContent>
                </Card>
              </Grid>
              
            ))}
          </Grid>
          
        </Paper>
        <div style={{ height: '50px',width: '18%', marginTop: '60px', textAlign: 'left',borderTop: '2px dotted black', paddingTop: '10px',fontSize: '16px' }}>
        <p style={{ margin: 0  }}>Nishan Nilanga </p>
        <p style={{ margin: 0 }}>Distribution Coordinator </p>
        <p style={{ margin: 0 }}>Date:{new Date().toLocaleDateString()}</p>
         </div>
        
        
      

      </div>
     
      <Button
        variant="contained"
        color="primary"
        onClick={generatePDF}
        style={{ marginTop: '20px', borderRadius: '15px' }}
      >
        Download Report as PDF
      </Button>
    </div>
  );
}
