import React, { useEffect, useState } from 'react';

export default function ReportTable() {
  const [rawmaterials, setRawMaterials] = useState([]);
  const [overallTotal, setOverallTotal] = useState(0); // State to hold the overall total cost

  // Fetch data from the server when the component mounts
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:8070/test2/');
        if (response.ok) {
          const data = await response.json();
          setRawMaterials(data);
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  // Calculate overall total cost whenever rawmaterials state changes
  useEffect(() => {
    const total = rawmaterials.reduce((sum, item) => sum + parseFloat(item.totalCost || 0), 0);
    setOverallTotal(total);
  }, [rawmaterials]);

  return (
    <div style={{ padding: '20px',minHeight: '1vh' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Raw Material Cost Table</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #000000' }}>
        <thead>
          <tr style={{ backgroundColor: '#f4f4f4', color: '#333' }}>
            <th style={{ padding: '12px', border: '1px solid #000000', backgroundColor: '#C7C7C7' }}>Date</th>
            <th style={{ padding: '12px', border: '1px solid #000000', backgroundColor: '#C7C7C7' }}>Raw Material Type</th>
            <th style={{ padding: '12px', border: '1px solid #000000', backgroundColor: '#C7C7C7' }}>Unit</th>
            <th style={{ padding: '12px', border: '1px solid #000000', backgroundColor: '#C7C7C7' }}>Price Per Unit (Rs)</th>
            <th style={{ padding: '12px', border: '1px solid #000000', backgroundColor: '#C7C7C7' }}>Quantity</th>
            <th style={{ padding: '12px', border: '1px solid #000000', backgroundColor: '#C7C7C7' }}>Total Cost (Rs)</th>
          </tr>
        </thead>
        <tbody>
          {rawmaterials.map((item) => (
            <tr key={item._id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ border: '1px solid #000000', padding: '12px' }}>
                {new Date(item.date).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}
              </td>
              <td style={{ padding: '12px', border: '1px solid #000000', textAlign: 'center' }}>{item.rawMaterialType}</td>
              <td style={{ padding: '12px', border: '1px solid #000000', textAlign: 'center' }}>{item.unit}</td>
              <td style={{ padding: '12px', border: '1px solid #000000', textAlign: 'center' }}>Rs. {item.pricePerUnit}.00</td>
              <td style={{ padding: '12px', border: '1px solid #000000', textAlign: 'center' }}>{item.quantity}</td>
              <td style={{ padding: '12px', border: '1px solid #000000', textAlign: 'center' }}>Rs. {item.totalCost}.00</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: '20px', textAlign: 'center', fontWeight: 'bold', fontSize: '20px', color: '#FF0000' }}>
        Overall Total: Rs. {overallTotal.toFixed(2)}
      </div>
    </div>
  );
}
