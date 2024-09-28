import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UserTable4() {
  const [costs, setCosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Function to fetch cost data from the server
  const fetchCosts = async () => {
    try {
      const response = await fetch('http://localhost:8070/controller3/costs');
      if (response.ok) {
        const data = await response.json();
        setCosts(data);
      } else {
        console.error('Failed to fetch costs');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Fetch cost data when the component mounts
  useEffect(() => {
    fetchCosts();
  }, []);

  // Function to handle updating a cost entry
  const handleUpdate = (cost) => {
    navigate('/dashcost', { state: { cost } });
  };

  // Function to handle deleting a cost entry
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8070/controller3/delete/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchCosts(); // Refresh the table after deletion
        alert('Cost entry deleted successfully');
      } else {
        alert('Failed to delete cost entry');
      }
    } catch (error) {
      console.error('Error deleting cost entry:', error);
      alert('An error occurred while deleting the cost entry.');
    }
  };

  // Function to handle search input change
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter cost data based on the search term (exact match for Month)
  const filteredCosts = costs.filter((cost) =>
    cost.Month.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ marginBottom: '20px', color: '#000000', textAlign: 'center' }}>Cost Entries List</h1>

      {/* Search Bar */}
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <input
          type="text"
          placeholder="Search by Month"
          value={searchTerm}
          onChange={handleSearch}
          style={{
            padding: '10px',
            width: '50%',
            border: '1px solid #ccc',
            borderRadius: '5px',
            fontSize: '16px',
          }}
        />
      </div>

      {/* Cost Table */}
      <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #000000' }}>
        <thead>
          <tr style={{ backgroundColor: '#f4f4f4', color: '#333' }}>
            <th style={{ border: '1px solid #000000', padding: '12px' }}>Month</th>
            <th style={{ border: '1px solid #000000', padding: '12px' }}>Transport Cost</th>
            <th style={{ border: '1px solid #000000', padding: '12px' }}>Fuel Cost</th>
            <th style={{ border: '1px solid #000000', padding: '12px' }}>Vehicle Repair Cost</th>
            <th style={{ border: '1px solid #000000', padding: '12px' }}>Food Cost</th>
            <th style={{ border: '1px solid #000000', padding: '12px' }}>Insurance Cost</th>
            <th style={{ border: '1px solid #000000', padding: '12px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCosts.length > 0 ? (
            filteredCosts.map((cost) => (
              <tr key={cost._id}>
                <td style={{ border: '1px solid #000000', padding: '12px' }}>{cost.Month}</td>
                <td style={{ border: '1px solid #000000', padding: '12px' }}>{cost.Transport_Cost}</td>
                <td style={{ border: '1px solid #000000', padding: '12px' }}>{cost.Fuel_Cost}</td>
                <td style={{ border: '1px solid #000000', padding: '12px' }}>{cost.Vehicle_Repair_Cost}</td>
                <td style={{ border: '1px solid #000000', padding: '12px' }}>{cost.Food_Cost}</td>
                <td style={{ border: '1px solid #000000', padding: '12px' }}>{cost.Insurance_Cost}</td>
                <td style={{ border: '1px solid #000000', padding: '12px', textAlign: 'center' }}>
                  <button
                    onClick={() => handleUpdate(cost)}
                    style={{
                      padding: '8px 12px',
                      backgroundColor: '#007bff',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      marginRight: '8px',
                      marginBottom: '8px'
                    }}
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(cost._id)}
                    style={{
                      padding: '8px 12px',
                      backgroundColor: '#dc3545',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer'
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ padding: '12px', textAlign: 'center' }}>No cost entries found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
