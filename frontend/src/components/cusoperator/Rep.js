import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import PRIImage from '../../images/PRI.png'; 

// Register components to use with Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const PDFContent = ({ summary, totalSalesByMonth }) => {
  return (
    <div style={{ padding: '20px 30px', fontFamily: 'Arial, sans-serif', backgroundColor: '#FFFFFF', minHeight: '130vh', width:'90%', border: '3.5px solid black',fontFamily: 'Italic' }}>
     
      <p style={{ margin: 0,fontSize: '20px',fontWeight: 'bold' }}>PRI Rubber Industry </p>
      <p style={{ margin: 0,fontSize: '15px' }}>Biyagama  </p>
      <p style={{ margin: 0 ,fontSize: '15px'}}>Sri Lanka </p>
      <p style={{ margin: 0 ,fontSize: '15px'}}>Tell: +94 xxxxxxxx </p>
      <p style={{ margin: 0 ,fontSize: '15px'}}>Email:
      <a href="mailto:PRIrubberindustry@gmail.com" style={{ textDecoration: 'none', color: 'blue' }}>
      PRIrubberindustry@gmail.com
      </a>
      </p>
    
      <div style={{ marginLeft: '850px' }}>
      <img src={PRIImage} alt="PRI" style={{ width: '113px', height: '15vh', borderRadius: '10px',marginTop:'-200px' }} />
      </div>
     
      

      <h1 style={{ marginBottom: '10px', textAlign: 'center', color: '#000000', fontSize: '24px',  fontFamily: 'Italic',fontWeight: 'bold' }}>
        Monthly Income Report (2024)
      </h1>
      
      <div style={{ marginBottom: '40px',marginLeft: '165px' , textAlign: 'center', backgroundColor: '#EFEFFC', padding: '20px', borderRadius: '20px',width: '65%', }}>
        <h2 style={{ color: '#FF0000', fontSize: '20px',}}>Summary</h2>
        <p style={{ color: '#000000' }}><strong>Total Sales:</strong> Rs {summary.totalSales.toFixed(2)}</p>
        <p style={{ color: '#000000' }}><strong>Total Quantity Sold:</strong> {summary.totalQuantity}</p>
        <p style={{ color: '#000000' }}><strong>Average Sales per Month:</strong> Rs {summary.averageSalesPerMonth}</p>
        <p><strong>Number of Months with Sales Data:</strong> {summary.uniqueMonthsCount}</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '40px' }}>
        <div style={{ width: '68%', marginTop: '-20px' }}>
          <h2 style={{ marginBottom: '20px', color: '#FF0000', fontSize: '18px', textAlign: 'center',marginLeft:'290px' }}>Sales Orders by Month</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', border: '1.5px solid #000000', fontSize: '16px',marginLeft:'150px' , backgroundColor: '#EFEFFC'}}>
            <thead>
              <tr style={{ backgroundColor: '#0000FF', color: '#FFFFFF' }}>
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

        
      </div>

      
      <div style={{ height: '50px',width: '15%', marginTop: '80px', borderTop: '2.3px dotted black', textAlign: 'left', paddingTop: '10px',fontSize: '14px',fontWeight: 'bold' }}>
      <p style={{ margin: 0 }}>Malindu Nethmina </p>
        <p style={{ margin: 0 }}>Customer Manager </p>
        <p style={{ margin: 0 }}>Date:{new Date().toLocaleDateString()}</p>
        

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
          
          
        />
        
      </div>

      <div></div>

      {/* Download button visible only on frontend */}
      <button 
        onClick={handleDownload} 
        style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#0000FF', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginLeft:'85%' }}
        
      >
        
        Download PDF
        
      </button>
    </div>
  );
}
