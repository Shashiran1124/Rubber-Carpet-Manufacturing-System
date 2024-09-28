import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ReportTable from './ReportTable';
import { PDFDownloadLink, Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer';
import PRIImage from '../images/PRI.png';

ChartJS.register(ArcElement, Tooltip, Legend);

const styles = StyleSheet.create({
    page: {
        padding: 20,
        fontFamily: 'Helvetica',
        backgroundColor: '#f4f6f7', // Light background color
    },
    header: {
        textAlign: 'center',
        marginBottom: 20,
        borderBottom: '1px solid #dcdde1',
        paddingBottom: 10,
    },
    title: {
        fontSize: 26,
        marginBottom: 5,
        color: '#2c3e50',
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 14,
        marginBottom: 10,
        color: '#7f8c8d',
    },
    logo: {
        width: 120,
        height: 'auto',
        marginBottom: 20,
    },
    summary: {
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#fff',
        border: '1px solid #dcdde1',
        borderRadius: 5,
    },
    section: {
        marginBottom: 20,
    },
    table: {
        display: 'table',
        width: '100%',
        marginTop: 10,
        borderCollapse: 'collapse',
    },
    tableHeader: {
        display: 'table-row',
        backgroundColor: '#4B77A9',
        color: '#fff',
    },
    tableRow: {
        display: 'table-row',
        backgroundColor: '#f9fafb',
    },
    tableCell: {
        display: 'table-cell',
        padding: 10,
        border: '1px solid #dcdde1',
        fontSize: 12,
    },
    downloadButton: {
        padding: '10px 20px',
        backgroundColor: '#28a745',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
        marginTop: '20px',
        display: 'block',
        textAlign: 'center',
    },
    footer: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 10,
        color: '#7f8c8d',
    },
});

const SupReport = () => {
    const [reportData, setReportData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalQuantity, setTotalQuantity] = useState(0);

    useEffect(() => {
        const fetchReportData = async () => {
            try {
                const response = await fetch('http://localhost:8070/test/'); // Replace with your actual API endpoint
                const data = await response.json();

                const filteredData = data.reduce((acc, item) => {
                    const existing = acc.find(entry => entry.materialType === item.materialType);
                    if (existing) {
                        existing.quantity += item.quantity;
                    } else {
                        acc.push({ ...item });
                    }
                    return acc;
                }, []);

                const total = filteredData.reduce((acc, item) => acc + item.quantity, 0);
                setTotalQuantity(total);
                setReportData(filteredData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching report data:', error);
                setLoading(false);
            }
        };

        fetchReportData();
    }, []);

    const pieChartData = {
        labels: reportData.map(item => item.materialType),
        datasets: [
            {
                label: 'Quantity Distribution by Material Type',
                data: reportData.map(item => item.quantity),
                backgroundColor: ['#4B77A9', '#5C9BD1', '#9B59B6', '#E74C3C', '#2ECC71'],
                hoverBackgroundColor: ['#356D9A', '#4B85C3', '#8A3BA1', '#C7453A', '#27B460'],
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const label = context.label || '';
                        const value = context.raw || 0;
                        const total = context.dataset.data.reduce((acc, val) => acc + val, 0);
                        const percentage = ((value / total) * 100).toFixed(2);
                        return `${label}: ${percentage}%`;
                    },
                },
            },
            legend: {
                position: 'top',
                labels: {
                    font: { size: 14, weight: 'bold' },
                },
            },
        },
    };

    return (
        <div style={{ width: '99%', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f0f4f7', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            {/* Header Section */}
            <header style={{ textAlign: 'center', marginBottom: '40px', color: '#333' }}>
                <h1 style={{ fontSize: '28px', margin: '10px 0', color: '#2c3e50' }}>Material Type Quantity Report</h1>
                <p style={{ color: '#2c3e50' }}>A detailed report on the distribution of raw material quantities by type</p>
                <p style={{ fontSize: '14px', color: '#16A085' }}>{new Date().toLocaleDateString()}</p>
            </header>

            {/* Data Summary */}
            <section style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h2 style={{ fontSize: '22px', color: '#2c3e50', marginBottom: '10px' }}>Summary</h2>
                <p style={{ fontSize: '20px', color: ' #FF0000' }}>Total Materials Supplied: <strong>{totalQuantity}</strong></p>
                <p style={{ fontSize: '20px', color: ' #FF0000' }}>Top Material: <strong>{reportData.length > 0 ? reportData[0].materialType : 'N/A'}</strong></p>
            </section>

            {/* Pie Chart Section */}
            <section style={{ marginBottom: '50px' }}>
                <h2 style={{ fontSize: '22px', color: '#2c3e50', textAlign: 'center', marginBottom: '20px' }}>Quantity Distribution by Material Type</h2>
                <div style={{
                    position: 'relative',
                    width: '70%',
                    height: '400px',
                    margin: '0 auto',
                    border: '1px solid #dcdde1',
                    borderRadius: '10px',
                    padding: '20px',
                    backgroundColor: '#fff',
                }}>
                    {loading ? (
                        <p style={{ color: '#7f8c8d' }}>Loading report data...</p>
                    ) : (
                        reportData.length > 0 ? (
                            <Pie data={pieChartData} options={chartOptions} />
                        ) : (
                            <p style={{ color: '#7f8c8d' }}>No data available for the report</p>
                        )
                    )}
                </div>
            </section>

            {/* Table Section */}
            <section>
                <div style={{
                    width: '90%',
                    padding: '10px',
                    backgroundColor: '#f9fafb',
                    border: '1px solid #dcdde1',
                    borderRadius: '10px',
                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                }}>
                    <ReportTable data={reportData} />
                </div>
            </section>

            {/* Download Button */}
            <div style={{ textAlign: 'center', marginTop: '30px', width:'300px', marginLeft:'35%' }}>
                <PDFDownloadLink
                    document={<MyDocument reportData={reportData} />}
                    fileName="material_report.pdf"
                    style={styles.downloadButton}
                >
                    Download Report
                </PDFDownloadLink>
            </div>

            {/* Footer */}
            <footer style={{ textAlign: 'center', marginTop: '40px', fontSize: '12px', color: '#7f8c8d' }}>
                <p>Report generated by PRI Rubber Industries</p>
                <p>© 2024 All Rights Reserved</p>
            </footer>
        </div>
    );
};

// PDF Document Component
const MyDocument = ({ reportData }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.header}>
                <Image style={styles.logo} src={PRIImage} />
                <Text style={{ fontSize: 32, fontWeight: 'bold', marginBottom:'80px', marginTop:'-5%' }}>PRI Rubber Industries</Text>
                <Text style={styles.title}>Material Type Quantity Report</Text>
                <Text style={styles.subtitle}>A detailed report on the distribution of raw material quantities by type</Text>
                <Text>{new Date().toLocaleDateString()}</Text>
            </View>
            <View style={styles.summary}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Summary</Text>
                <Text>Total Materials Supplied: {reportData.reduce((acc, item) => acc + item.quantity, 0)}</Text>
                <Text>Top Material: {reportData.length > 0 ? reportData[0].materialType : 'N/A'}</Text>
            </View>
            <View style={styles.section}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Quantity Distribution</Text>
                <Text>Refer to the pie chart in the web report for details.</Text>
            </View>
            <View style={styles.section}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Raw Material Table</Text>
                <View style={styles.table}>
                    <View style={styles.tableHeader}>
                        <Text style={styles.tableCell}>Material Type</Text>
                        <Text style={styles.tableCell}>Quantity</Text>
                    </View>
                    {reportData.map((item, index) => (
                        <View key={index} style={styles.tableRow}>
                            <Text style={styles.tableCell}>{item.materialType}</Text>
                            <Text style={styles.tableCell}>{item.quantity}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </Page>
    </Document>
);

export default SupReport;
