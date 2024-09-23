import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

import RMCTable from './RMCTable';

// Register the required components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const SupReport = () => {
    const [reportData, setReportData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch report data from the backend API
    useEffect(() => {
        const fetchReportData = async () => {
            try {
                const response = await fetch('http://localhost:8070/test/'); // Replace with your actual API endpoint
                const data = await response.json();
                
                // Filter out duplicate material types and sum their quantities
                const filteredData = data.reduce((acc, item) => {
                    const existing = acc.find(entry => entry.materialType === item.materialType);
                    if (existing) {
                        existing.quantity += item.quantity;
                    } else {
                        acc.push({ ...item });
                    }
                    return acc;
                }, []);
                
                setReportData(filteredData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching report data:', error);
                setLoading(false);
            }
        };

        fetchReportData();
    }, []);

    // Prepare data for the pie chart
    const pieChartData = {
        labels: reportData.map(item => item.materialType), // Use materialType as labels
        datasets: [
            {
                label: 'Quantity Distribution by Material Type',
                data: reportData.map(item => item.quantity), // Use quantity as data
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF'
                ],
                hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF'
                ]
            }
        ]
    };

    // Define options to set the size of the pie chart and format the data as percentage
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            tooltip: {
                callbacks: {
                    label: function(context) {
                        const label = context.label || '';
                        const value = context.raw || 0;
                        const total = context.dataset.data.reduce((acc, val) => acc + val, 0); // Get the total value for percentage calculation
                        const percentage = ((value / total) * 100).toFixed(2); // Calculate percentage
                        return `${label}: ${percentage}%`; // Format as percentage
                    }
                }
            },
            legend: {
                position: 'top'
            }
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
            <h1>Material Type Quantity Report</h1>

            {/* Container for Pie Chart */}
            <div style={{ position: 'relative', width: '60%', height: '400px', marginBottom: '20px' }}>
                {loading ? (
                    <p>Loading report data...</p>
                ) : (
                    reportData.length > 0 ? (
                        <Pie data={pieChartData} options={chartOptions} />
                    ) : (
                        <p>No data available for the report</p>
                    )
                )}
            </div>

            {/* Container for Table */}
            <div style={{ width: '100%', height: 'auto', marginTop: '20px', padding: '10px' }}>
                <RMCTable /> {/* Render the RMCTable component here */}
            </div>
        </div>
    );
};

export default SupReport;
