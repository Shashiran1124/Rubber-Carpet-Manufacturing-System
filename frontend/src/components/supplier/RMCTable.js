import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RMCTable() {
  const [rawmaterials, setRawMaterials] = useState([]);
  const [overallTotal, setOverallTotal] = useState(0);
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const navigate = useNavigate();

  // Fetch data from the server when the component mounts
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:8070/suptest2/');
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

  // Handle Update Functionality
  const handleUpdate = (item) => {
    navigate('/DashRawMaterialCostForm', { state: { rawMaterialCost: item } });
  };

  // Handle the Delete action
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this Record?')) {
      try {
        const response = await fetch(`http://localhost:8070/suptest2/delete/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          const updatedResponse = await fetch('http://localhost:8070/suptest2/');
          if (updatedResponse.ok) {
            const updatedData = await updatedResponse.json();
            setRawMaterials(updatedData);
            alert('Record deleted successfully');
          } else {
            console.error('Failed to fetch updated data after deletion');
          }
        } else {
          const errorData = await response.json();
          console.error('Failed to delete:', response.status, errorData);
          alert(`Failed to delete the Record: ${errorData.message || 'Unknown error'}`);
        }
      } catch (error) {
        console.error('Error deleting Record:', error);
        alert('An error occurred while deleting the Record.');
      }
    }
  };

  // Filter raw materials based on the search query
  const filteredRawMaterials = rawmaterials.filter((item) =>
    item.rawMaterialType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Raw Material Cost Table</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by Raw Material Type..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)} // Update search query on change
        style={{
          padding: '10px',
          width: '40%',
          marginBottom: '20px',
          border: '1px solid #ccc',
          borderRadius: '5px',
          marginLeft:'400px',
        }}
      />

      <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #000000' }}>
        <thead>
          <tr style={{ backgroundColor: '#f4f4f4', color: '#333' }}>
            <th style={{ padding: '12px', border: '1px solid #000000', backgroundColor: '#C7C7C7' }}>Date</th>
            <th style={{ padding: '12px', border: '1px solid #000000', backgroundColor: '#C7C7C7' }}>Raw Material Type</th>
            <th style={{ padding: '12px', border: '1px solid #000000', backgroundColor: '#C7C7C7' }}>Unit</th>
            <th style={{ padding: '12px', border: '1px solid #000000', backgroundColor: '#C7C7C7' }}>Price Per Unit (Rs)</th>
            <th style={{ padding: '12px', border: '1px solid #000000', backgroundColor: '#C7C7C7' }}>Quantity</th>
            <th style={{ padding: '12px', border: '1px solid #000000', backgroundColor: '#C7C7C7' }}>Total Cost (Rs)</th>
            <th style={{ padding: '12px', border: '1px solid #000000', backgroundColor: '#C7C7C7' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredRawMaterials.map((item) => (
            <tr key={item._id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ border: '1px solid #000000', padding: '12px' }}>
                {new Date(item.date).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}
              </td>
              <td style={{ padding: '12px', border: '1px solid #000000', textAlign: 'center' }}>{item.rawMaterialType}</td>
              <td style={{ padding: '12px', border: '1px solid #000000', textAlign: 'center' }}>{item.unit}</td>
              <td style={{ padding: '12px', border: '1px solid #000000', textAlign: 'center' }}>Rs. {item.pricePerUnit}.00</td>
              <td style={{ padding: '12px', border: '1px solid #000000', textAlign: 'center' }}>{item.quantity}</td>
              <td style={{ padding: '12px', border: '1px solid #000000', textAlign: 'center' }}>Rs. {item.totalCost}.00</td>
              <td style={{ padding: '12px', border: '1px solid #000000', textAlign: 'center' }}>
                <button
                  onClick={() => handleUpdate(item)}
                  style={{
                    marginRight: '10px',
                    padding: '5px 10px',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  style={{
                    padding: '5px 10px',
                    backgroundColor: '#dc3545',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                >
                  Delete
                </button>
              </td>
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
