import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from 'chart.js';
import Sidebar from "./SideBar";              
import Navbar from "./NavBar";  
import html2canvas from 'html2canvas'; // For capturing DOM elements as canvas
import jsPDF from 'jspdf'; // For generating PDFs
import PRIImage from '../../images/PRI.png'; // Import company logo



// Register components to use with Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

export default function SalaryReportWithBarChart() {
  const [salaryData, setSalaryData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  

  // Fetch salary data
  const fetchSalaryData = async () => {
    try {
      const response = await fetch('http://localhost:8070/salary');
      if (response.ok) {
        const data = await response.json();
        setSalaryData(data);
      } else {
        console.error('Failed to fetch salary data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchSalaryData();
  }, []);

  const filteredSalaryData = selectedMonth
    ? salaryData.filter(salary => salary.month === selectedMonth)
    : salaryData;

  const getDepartmentSalaryTotals = () => {
    const departmentTotals = {};
    filteredSalaryData.forEach(({ department, monthlyBasic }) => {
      if (!departmentTotals[department]) {
        departmentTotals[department] = 0;
      }
      departmentTotals[department] += monthlyBasic;
    });
    return departmentTotals;
  };

  const departmentTotals = getDepartmentSalaryTotals();

  const getBarChartData = () => {
    const departments = Object.keys(departmentTotals);
    const totalMonthlySalaries = Object.values(departmentTotals);

    return {
      labels: departments,
      datasets: [
        {
          label: 'Total Monthly Basic Salary',
          data: totalMonthlySalaries,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1.5,
        },
      ],
    };
  };

  const getPieChartData = () => {
    const departments = Object.keys(departmentTotals);
    const totalMonthlySalaries = Object.values(departmentTotals);
    const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];

    return {
      labels: departments,
      datasets: [
        {
          data: totalMonthlySalaries,
          backgroundColor: colors,
          hoverBackgroundColor: colors.map(color => color + 'B3'),
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Total Monthly Basic Salary by Department',
        font: {
          size: 20,
          weight: 'bold',
        },
        color: '#000',
      },
    },
    layout: {
      padding: {
        top: 30,
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#333',
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
      y: {
        ticks: {
          color: '#333',
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        beginAtZero: true,
        min: 0,
      },
    },
  };

  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
        align: 'center', 
        labels: {
          padding: 20,
          color: '#333',
        },
      },
      title: {
        display: true,
        text: 'Salary Distribution by Department',
        font: {
          size: 20,
          weight: 'bold',
        },
        color: '#000',
      },
    },
  };

  const downloadPDF = () => {
    const input = document.getElementById('salary-report');
    html2canvas(input).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Add company name and logo
      pdf.addImage(PRIImage, 'PNG', 10, 10, 30, 30); // Add logo
      pdf.setFontSize(18);
      pdf.text('PRI Rubber Industries', 50, 20); // Add company name
      pdf.setFontSize(14);
      pdf.text(`Salary Report (${selectedMonth || 'All Months'})`, 50, 30);

      pdf.addImage(imgData, 'PNG', 0, 40, imgWidth, imgHeight);
      pdf.save(`Salary_Report_${selectedMonth || 'All_Months'}.pdf`);
    });
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
      {/* Sidebar */}
      <Sidebar />

      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Navbar */}
        <Navbar />

        {/* Main content */}
        <div id="salary-report" style={{ padding: '20px 30px', backgroundColor: '#F5F5F5', flexGrow: 1 }}>
          <h1 style={{ marginBottom: '40px', color: '#333', fontSize: '36px', fontFamily: 'Dancing Script, cursive', textAlign: 'center' }}>Salary Report (2024)</h1>

          {/* Month dropdown */}
          <div style={{ display: 'flex', justifyContent: 'left', marginBottom: '20px' }}>
            <label htmlFor="month-select" style={{ marginRight: '10px', fontWeight: 'bold', color: '#555' }}>Select Month:</label>
            <select
              id="month-select"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc', fontSize: '14px' }}
            >
              <option value="">All</option>
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </select>
          </div>

          {/* Salary Table */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
            <div style={{ width: '65%', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
              <h2 style={{ marginBottom: '20px', color: '#8A2BE2', fontSize: '20px', textAlign: 'center' }}>Departmental Salary Data</h2>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', backgroundColor: '#fff' }}>
                <thead>
                  <tr style={{ backgroundColor: '#F2F2F2', color: '#333' }}>
                    <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'center', borderRadius: '5px' }}>Department</th>
                    <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'center', borderRadius: '5px' }}>Total Monthly Basic Salary</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(departmentTotals).map((department, index) => (
                    <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#F9F9F9' : '#FFF' }}>
                      <td style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'center' }}>{department}</td>
                      <td style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'center' }}>{departmentTotals[department]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bar chart */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '60px' }}>
            <div style={{ width: '65%', borderRadius: '10px', padding: '20px', backgroundColor: '#fff', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
              <Bar data={getBarChartData()} options={chartOptions} />
            </div>
          </div>

          {/* Pie chart */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
            <div style={{ width: '50%', padding: '20px', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
              <Pie data={getPieChartData()} options={pieChartOptions} />
            </div>
          </div>

          {/* Download PDF button */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
            <button
              onClick={downloadPDF}
              style={{ padding: '12px 30px', borderRadius: '25px', backgroundColor: '#008CBA', color: '#fff', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', border: 'none', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', transition: 'background-color 0.3s' }}
              onMouseOver={(e) => (e.target.style.backgroundColor = '#005F73')}
              onMouseOut={(e) => (e.target.style.backgroundColor = '#008CBA')}
            >
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
