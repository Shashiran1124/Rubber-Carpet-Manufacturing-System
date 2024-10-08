import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ReportTable from './ReportTable';
import { PDFDownloadLink, Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer';
import PRIImage from '../../images/PRI.png';

ChartJS.register(ArcElement, Tooltip, Legend);

const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontFamily: 'Helvetica',
        backgroundColor: '#f8f9fa',
        color: '#2c3e50',
    },
    header: {
        textAlign: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 4,
        color: '#34495e',
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 12,
        color: '#7f8c8d',
    },
    logo: {
        width: 100,
        margin: '10px auto',
    },
    summarySection: {
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#ecf0f1',
        borderRadius: 8,
        textAlign: 'left',
    },
    summaryTitle: {
        fontSize: 18,
        marginBottom: 8,
        color: '#2980b9',
    },
    summaryText: {
        fontSize: 14,
        marginBottom: 4,
    },
    tableSection: {
        marginTop: 20,
    },
    sectionTitle: {
        fontSize: 16,
        color: '#2980b9',
        marginBottom: 10,
    },
    table: {
        display: 'table',
        width: '100%',
        margin: '0 auto',
    },
    tableHeader: {
        display: 'table-row',
        backgroundColor: '#3498db',
        color: '#ffffff',
        fontSize: 12,
        textAlign: 'center',
    },
    tableRow: {
        display: 'table-row',
        backgroundColor: '#ecf0f1',
    },
    tableCell: {
        display: 'table-cell',
        padding: 6,
        border: '1px solid #bdc3c7',
        textAlign: 'center',
        fontSize: 12,
    },
    footer: {
        marginTop: 30,
        textAlign: 'center',
        fontSize: 10,
        color: '#7f8c8d',
    },
    signatureSection: {
        marginTop: 40,
        textAlign: 'right',
        paddingRight: 40,
    },
    signatureText: {
        fontSize: 12,
        color: '#34495e',
        marginBottom: 40,
    },
    signatureLine: {
        width: 200,
        borderBottom: '1px solid #34495e',
        marginBottom: 4,
        alignSelf: 'flex-end',
    },
});

const SupReport = () => {
    const [reportData, setReportData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalQuantity, setTotalQuantity] = useState(0);

    useEffect(() => {
        const fetchReportData = async () => {
            try {
                const response = await fetch('http://localhost:8070/suptest/');
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

    const getTopMaterial = () => {
        if (reportData.length === 0) {
            return 'N/A';
        }
        const sortedData = [...reportData].sort((a, b) => b.quantity - a.quantity);
        return sortedData[0].materialType;
    };

    return (
        <div style={{ width: '99%', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f0f4f7', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <header style={{ textAlign: 'center', marginBottom: '40px', color: '#333' }}>
                <h1 style={{ fontSize: '28px', margin: '10px 0', color: '#2c3e50' }}>Material Type Quantity Report</h1>
                <p style={{ color: '#2c3e50' }}>A detailed report on the distribution of raw material quantities and costs by type</p>
                <p style={{ fontSize: '14px', color: '#16A085' }}>{new Date().toLocaleDateString()}</p>
            </header>

            <section style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h2 style={{ fontSize: '22px', color: '#2c3e50', marginBottom: '10px' }}>Summary</h2>
                <p style={{ fontSize: '20px', color: '#FF0000' }}>Total Materials Supplied: <strong>{totalQuantity}</strong></p>
                <p style={{ fontSize: '20px', color: '#FF0000' }}>Top Material: <strong>{getTopMaterial()}</strong></p>
            </section>

            <section style={{ marginBottom: '50px' }}>
                <h2 style={{ fontSize: '22px', color: '#2c3e50', textAlign: 'center', marginBottom: '20px' }}>Bought Material Types As percentages</h2>
                <div style={{
                    position: 'relative',
                    width: '70%',
                    height: '400px',
                    margin: '0 auto',
                    border: '3px solid #000',
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

            <section>
                <div style={{
                    width: '100%',
                    padding: '10px',
                    backgroundColor: '#f9fafb',
                    border: '3px solid #000',
                    borderRadius: '10px',
                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                }}>
                    <ReportTable data={reportData} />
                </div>
            </section>

            <div style={{ textAlign: 'center', marginTop: '30px' }}>
    <PDFDownloadLink
        document={<MyDocument reportData={reportData} />}
        fileName="material_report.pdf"
        style={{
            display: 'inline-block',
            padding: '10px 20px', // Add padding for better button appearance
            backgroundColor: '#4CAF50', // Green background color
            color: 'white', // Text color
            border: 'none', // No border
            borderRadius: '5px', // Rounded corners
            textDecoration: 'none', // Remove underline from link
            fontWeight: 'bold', // Make text bold
            width: '300px', // Set a fixed width
            margin: 'center', // Center the button
        }}
    >
        Download Report
    </PDFDownloadLink>
</div>


            
        </div>
    );
};

const MyDocument = ({ reportData }) => (
    <Document>
        <Page style={styles.page}>
            <View style={styles.header}>
                <Image src={PRIImage} style={styles.logo} />
                <Text style={styles.title}>Material Type Quantity Report</Text>
                <Text style={styles.subtitle}>Generated by P.R.I.Rubber Carpet Manufacturing System</Text>
                <Text style={styles.subtitle}>{new Date().toLocaleDateString()}</Text>
            </View>

            <View style={styles.summarySection}>
                <Text style={styles.summaryTitle}>Summary</Text>
                <Text style={styles.summaryText}>Total Materials Supplied: {reportData.reduce((acc, item) => acc + item.quantity, 0)}</Text>
                <Text style={styles.summaryText}>Top Material: {reportData.length > 0 ? reportData[0].materialType : 'N/A'}</Text>
            </View>

            <View style={styles.tableSection}>
                <Text style={styles.sectionTitle}>Quantity Distribution by Material Type</Text>
                <View style={styles.table}>
                    <View style={styles.tableHeader}>
                        <Text style={styles.tableCell}>Material Type</Text>
                        <Text style={styles.tableCell}>Quantity</Text>
                    </View>
                    {reportData.map((item, index) => (
                        <View style={styles.tableRow} key={index}>
                            <Text style={styles.tableCell}>{item.materialType}</Text>
                            <Text style={styles.tableCell}>{item.quantity}</Text>
                        </View>
                    ))}
                </View>
            </View>

            <View style={styles.signatureSection}>
                <Text style={styles.signatureText}>Signature of Supplier Manager</Text>
                <View style={styles.signatureLine}></View>
            </View>
        </Page>
    </Document>
);

export default SupReport;
