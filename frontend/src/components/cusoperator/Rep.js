import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Register components to use with Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const PDFContent = ({ summary, totalSalesByMonth, getBarChartData, getProductQuantityBarChartData }) => {
  return (
    <div style={{ padding: '20px 30px', fontFamily: 'Arial, sans-serif', backgroundColor: '#F5F5F5', minHeight: '80vh', width:'90%' }}>
      <h1 style={{ marginBottom: '40px', textAlign: 'center', color: '#000000', fontSize: '32px', fontFamily: 'Dancing Script, cursive' }}>
        PRI Rubber Industries
      </h1>
      <h1 style={{ marginBottom: '40px', textAlign: 'center', color: '#696969', fontSize: '26px',  }}>
        Monthly Income Report (2024)
      </h1>
      
      <div style={{ marginBottom: '40px', textAlign: 'center', backgroundColor: '#E6E6FA', padding: '20px', borderRadius: '26px', }}>
        <h2 style={{ color: '#8A2BE2', fontSize: '20px' }}>Summary</h2>
        <p style={{ color: '#FF0000' }}><strong>Total Sales:</strong> Rs {summary.totalSales.toFixed(2)}</p>
        <p style={{ color: '#FF0000' }}><strong>Total Quantity Sold:</strong> {summary.totalQuantity}</p>
        <p style={{ color: '#FF0000' }}><strong>Average Sales per Month:</strong> Rs {summary.averageSalesPerMonth}</p>
        <p><strong>Number of Months with Sales Data:</strong> {summary.uniqueMonthsCount}</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '40px' }}>
        <div style={{ width: '65%', marginBottom: '20px' }}>
          <h2 style={{ marginBottom: '20px', color: '#8A2BE2', fontSize: '18px', textAlign: 'center',marginLeft:'290px' }}>Sales Data by Month</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', border: '1.5px solid #000000', fontSize: '14px',marginLeft:'150px' }}>
            <thead>
              <tr style={{ backgroundColor: '#8A2BE2', color: '#FFFFFF' }}>
                <th style={{ padding: '10px', border: '1px solid #000000' }}>Month</th>
                <th style={{ padding: '10px', border: '1px solid #000000', }}>Total Sales</th>
                <th style={{ padding: '10px', border: '1px solid #000000',width:'80px' }}>Total Quantity</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(totalSalesByMonth).map((month) => (
                <tr key={month}>
                  <td style={{ padding: '10px', border: '1px solid #000000' }}>{month}</td>
                  <td style={{ padding: '10px', border: '1px solid #000000' }}>Rs {totalSalesByMonth[month].sales.toFixed(2)}</td>
                  <td style={{ padding: '10px', border: '1px solid #000000' }}>{totalSalesByMonth[month].quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ width: '76%',marginLeft:'100px' }}>
          <h2 style={{ marginBottom: '20px', color: '#8A2BE2', fontSize: '18px', textAlign: 'center',marginLeft:'10px' }}>Monthly Sales Chart</h2>
          <Bar data={getBarChartData()} options={{
            responsive: true,
            plugins: { legend: { position: 'top' }, title: { display: true, text: 'Monthly Total Sales', font: { size: 16, weight: 'bold' }, color: '#000000' }},
            layout: { padding: { top: 30 }},
            scales: { x: { ticks: { color: 'rgba(0, 0, 0, 1)' }, grid: { color: 'rgba(0, 0, 0, 0.2)' }},
                      y: { ticks: { color: 'rgba(0, 0, 0, 1)' }, grid: { color: 'rgba(0, 0, 0, 0.2)' }, beginAtZero: true }},
          }} />
        </div>
      </div>

      <div style={{ width: '80%',marginLeft:'90px' }}>
        <h2 style={{ marginBottom: '20px', color: '#8A2BE2', fontSize: '18px', textAlign: 'center' }}>Product Quantity Chart</h2>
        <Bar data={getProductQuantityBarChartData()} options={{
            responsive: true,
            plugins: { legend: { position: 'top' }, title: { display: true, text: 'Product Quantity by Month', font: { size: 16, weight: 'bold' }, color: '#000000' }},
            layout: { padding: { top: 30 }},
            scales: { x: { ticks: { color: 'rgba(0, 0, 0, 1)' }, grid: { color: 'rgba(0, 0, 0, 0.2)' }},
                      y: { ticks: { color: 'rgba(0, 0, 0, 1)' }, grid: { color: 'rgba(0, 0, 0, 0.2)' }, beginAtZero: true }},
          }} />
      </div>
    </div>
  );
};

export default function CalTableWithBarChart() {
  const [salesOrders, setSalesOrders] = useState([]);

  const fetchSalesOrders = async () => {
    try {
      const response = await fetch('http://localhost:8070/cuscalculation/');
      if (response.ok) {
        const data = await response.json();
        setSalesOrders(data);
      } else {
        console.error('Failed to fetch sales orders');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchSalesOrders();
  }, []);

  const getMonthName = (monthNumber) => {
    const date = new Date();
    date.setMonth(monthNumber);
    return date.toLocaleString('default', { month: 'long' });
  };

  const getBarChartData = () => {
    const salesByMonth = {};
    salesOrders.forEach(order => {
      const month = getMonthName(new Date(order.month).getMonth() + 1);
      salesByMonth[month] = (salesByMonth[month] || 0) + order.totalSales;
    });

    return {
      labels: Object.keys(salesByMonth),
      datasets: [{
        label: 'Total Sales',
        data: Object.values(salesByMonth),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(0, 0, 0, 1)',
        borderWidth: 1.2,
      }],
    };
  };

  const getProductQuantityBarChartData = () => {
    const products = [
      'Industrial Rubber Mats',
      'Gym Rubber Flooring',
      'Rubber Runner Mats',
      'Rubber Playground Mats',
      'Commercial Rubber Flooring',
      'Rubber Carpet Tiles'
    ];

    const months = [...new Set(salesOrders.map(order => getMonthName(new Date(order.month).getMonth() + 1)))];

    const dataByMonth = months.map(month => {
      const monthlyData = salesOrders.filter(order => getMonthName(new Date(order.month).getMonth() + 1) === month);
      return products.map(product => {
        return monthlyData
          .filter(order => order.product === product)
          .reduce((sum, order) => sum + order.totalQuantity, 0);
      });
    });

    return {
      labels: months,
      datasets: products.map((product, index) => ({
        label: product,
        data: dataByMonth.map(data => data[index]),
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'
        ][index],
        borderColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'
        ][index],
        borderWidth: 1,
      })),
    };
  };

  const handleDownload = () => {
    const pdf = new jsPDF();
    const input = document.getElementById('pdfContent');
    
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 190; // A4 width in mm
      const pageHeight = pdf.internal.pageSize.height;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      pdf.save('Monthly_Report.pdf');
    });
  };

  return (
    <div>
      <div id="pdfContent" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <PDFContent
          summary={{
            totalSales: salesOrders.reduce((total, order) => total + order.totalSales, 0),
            totalQuantity: salesOrders.reduce((total, order) => total + order.totalQuantity, 0),
            averageSalesPerMonth: (salesOrders.reduce((total, order) => total + order.totalSales, 0) / 12).toFixed(2),
            uniqueMonthsCount: new Set(salesOrders.map(order => getMonthName(new Date(order.month).getMonth() + 1))).size
          }}
          totalSalesByMonth={salesOrders.reduce((acc, order) => {
            const month = getMonthName(new Date(order.month).getMonth() + 1);
            acc[month] = acc[month] || { sales: 0, quantity: 0 };
            acc[month].sales += order.totalSales;
            acc[month].quantity += order.totalQuantity;
            return acc;
          }, {})}
          getBarChartData={getBarChartData}
          getProductQuantityBarChartData={getProductQuantityBarChartData}
        />
      </div>

      {/* Download button visible only on frontend */}
      <button 
        onClick={handleDownload} 
        style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginLeft:'85%' }}
      >
        Download PDF
      </button>
    </div>
  );
}
