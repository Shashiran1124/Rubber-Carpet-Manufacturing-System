import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, LineChart, Line } from 'recharts';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function Report() {
  const [costs, setCosts] = useState([]);
  const [monthlyTotals, setMonthlyTotals] = useState({});
  const [chartData, setChartData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedMonthCosts, setSelectedMonthCosts] = useState([]);
  const [lineChartData, setLineChartData] = useState([]);

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
          Insurance_Cost: 0
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

    setChartData(Object.entries(totals).map(([month, totals]) => ({
      month,
      ...totals
    })));

    setLineChartData(Object.entries(totals).map(([month, totals]) => ({
      month,
      totalCost: Object.values(totals).reduce((sum, value) => sum + value, 0)
    })));
  };

  useEffect(() => {
    fetchCosts();
  }, []);

  const handleRowClick = (month) => {
    setSelectedMonth(month);
    setSelectedMonthCosts(Object.entries(monthlyTotals[month] || {}).map(([type, value]) => ({
      name: type,
      value
    })));
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

      // Add header
      pdf.setFontSize(22);
      pdf.text('P.R.I Rubber Industries', 105, 15, { align: 'center' });
      pdf.setFontSize(10); // Reset font size for other content
      pdf.addImage(imgData, 'PNG', 0, 20, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('Monthly_Cost_Report.pdf');
    });
  };

  return (
    <div>
      <div id="report-content" style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '15px' }}>
        <Typography variant="h4" style={{ marginBottom: '20px', textAlign: 'center', color: theme.palette.primary.main }}>
          Monthly Cost Report
        </Typography>

        <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${theme.palette.divider}`, backgroundColor: '#ffffff', boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)' }}>
          <thead>
            <tr style={{ backgroundColor: theme.palette.primary.light, color: '#ffffff' }}>
              <th style={{ border: `1px solid ${theme.palette.divider}`, padding: '12px' }}>Month</th>
              <th style={{ border: `1px solid ${theme.palette.divider}`, padding: '12px' }}>Total Transport Cost</th>
              <th style={{ border: `1px solid ${theme.palette.divider}`, padding: '12px' }}>Total Fuel Cost</th>
              <th style={{ border: `1px solid ${theme.palette.divider}`, padding: '12px' }}>Total Vehicle Repair Cost</th>
              <th style={{ border: `1px solid ${theme.palette.divider}`, padding: '12px' }}>Total Food Cost</th>
              <th style={{ border: `1px solid ${theme.palette.divider}`, padding: '12px' }}>Total Insurance Cost</th>
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
                    transition: 'background-color 0.3s ease'
                  }}
                >
                  <td style={{ border: `1px solid ${theme.palette.divider}`, padding: '12px' }}>{month}</td>
                  <td style={{ border: `1px solid ${theme.palette.divider}`, padding: '12px' }}>{totals.Transport_Cost.toFixed(2)}</td>
                  <td style={{ border: `1px solid ${theme.palette.divider}`, padding: '12px' }}>{totals.Fuel_Cost.toFixed(2)}</td>
                  <td style={{ border: `1px solid ${theme.palette.divider}`, padding: '12px' }}>{totals.Vehicle_Repair_Cost.toFixed(2)}</td>
                  <td style={{ border: `1px solid ${theme.palette.divider}`, padding: '12px' }}>{totals.Food_Cost.toFixed(2)}</td>
                  <td style={{ border: `1px solid ${theme.palette.divider}`, padding: '12px' }}>{totals.Insurance_Cost.toFixed(2)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ padding: '12px', textAlign: 'center' }}>No cost data available</td>
              </tr>
            )}
          </tbody>
        </table>

        {chartData.length > 0 && (
          <div style={{ marginTop: '40px', backgroundColor: '#ffffff', padding: '20px', borderRadius: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <Typography variant="h5" style={{ marginBottom: '20px', color: theme.palette.primary.main }}>
              Monthly Cost Breakdown
            </Typography>
            <BarChart
              width={800}
              height={500}
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip contentStyle={{ backgroundColor: theme.palette.background.paper, borderColor: theme.palette.divider }} />
              <Legend />
              <Bar dataKey="Transport_Cost" fill={theme.palette.primary.main} />
              <Bar dataKey="Fuel_Cost" fill={theme.palette.secondary.main} />
              <Bar dataKey="Vehicle_Repair_Cost" fill={theme.palette.error.main} />
              <Bar dataKey="Food_Cost" fill={theme.palette.warning.main} />
              <Bar dataKey="Insurance_Cost" fill={theme.palette.info.main} />
            </BarChart>
          </div>
        )}

        {lineChartData.length > 0 && (
          <div style={{ marginTop: '40px', backgroundColor: '#ffffff', padding: '20px', borderRadius: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <Typography variant="h5" style={{ marginBottom: '20px', color: theme.palette.primary.main }}>
              Monthly Total Costs
            </Typography>
            <LineChart
              width={800}
              height={500}
              data={lineChartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="totalCost" stroke={theme.palette.primary.main} />
            </LineChart>
          </div>
        )}

        {/* Summary Section */}
        <div style={{ marginTop: '40px', backgroundColor: '#ffffff', padding: '20px', borderRadius: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <Typography variant="h5" style={{ marginBottom: '20px', color: theme.palette.primary.main }}>
            Summary of Monthly Costs
          </Typography>
          <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${theme.palette.divider}` }}>
            <thead>
              <tr style={{ backgroundColor: theme.palette.primary.light, color: '#ffffff' }}>
                <th style={{ border: `1px solid ${theme.palette.divider}`, padding: '12px' }}>Month</th>
                <th style={{ border: `1px solid ${theme.palette.divider}`, padding: '12px' }}>Total Costs</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(lineChartData).map(([index, { month, totalCost }]) => (
                <tr key={index}>
                  <td style={{ border: `1px solid ${theme.palette.divider}`, padding: '12px' }}>{month}</td>
                  <td style={{ border: `1px solid ${theme.palette.divider}`, padding: '12px' }}>{totalCost.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Button
          variant="contained"
          color="primary"
          onClick={generatePDF}
          style={{ marginTop: '40px' }}
        >
          Download Report as PDF
        </Button>
      </div>
    </div>
  );
}
