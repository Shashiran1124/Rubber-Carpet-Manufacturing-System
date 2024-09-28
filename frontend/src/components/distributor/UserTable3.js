import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UserTable3() {
  const [kpis, setKPIs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Function to fetch KPIs from the server
  const fetchKPIs = async () => {
    try {
      const response = await fetch('http://localhost:8070/controller2/kpi');
      if (response.ok) {
        const data = await response.json();
        setKPIs(data);
      } else {
        console.error('Failed to fetch KPIs');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Fetch KPIs when the component mounts
  useEffect(() => {
    fetchKPIs();
  }, []);

  // Function to handle updating a KPI
  const handleUpdate = (kpi) => {
    navigate('/dashkpi', { state: { kpi } });
  };

  // Function to handle deleting a KPI
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8070/controller2/delete/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchKPIs(); // Refresh the table after deletion
        alert('KPI deleted successfully');
      } else {
        alert('Failed to delete KPI');
      }
    } catch (error) {
      console.error('Error deleting KPI:', error);
      alert('An error occurred while deleting the KPI.');
    }
  };

  // Function to handle search input change
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter KPIs based on the search term (exact match for KPI number)
  const filteredKPIs = kpis.filter((kpi) =>
    kpi.KPI_Number.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ marginBottom: '20px', color: '#000000', textAlign: 'center' }}>KPI List</h1>

      {/* Search Bar */}
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <input
          type="text"
          placeholder="Search by KPI Number"
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

      {/* KPI Table */}
      <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #000000' }}>
        <thead>
          <tr style={{ backgroundColor: '#f4f4f4', color: '#333' }}>
            <th style={{ border: '1px solid #000000', padding: '12px' }}>KPI Number</th>
            <th style={{ border: '1px solid #000000', padding: '12px' }}>KPI Name</th>
            <th style={{ border: '1px solid #000000', padding: '12px' }}>Measurement Period</th>
            <th style={{ border: '1px solid #000000', padding: '12px' }}>Target Value</th>
            <th style={{ border: '1px solid #000000', padding: '12px' }}>Actual Value</th>
            <th style={{ border: '1px solid #000000', padding: '12px' }}>Status</th>
            <th style={{ border: '1px solid #000000', padding: '12px' }}>Last Updated</th>
            <th style={{ border: '1px solid #000000', padding: '12px' }}>Responsible Department</th>
            <th style={{ border: '1px solid #000000', padding: '12px' }}>Comments</th>
            <th style={{ border: '1px solid #000000', padding: '12px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredKPIs.length > 0 ? (
            filteredKPIs.map((kpi) => (
              <tr key={kpi._id}>
                <td style={{ border: '1px solid #000000', padding: '12px' }}>{kpi.KPI_Number}</td>
                <td style={{ border: '1px solid #000000', padding: '12px' }}>{kpi.KPI_Name}</td>
                <td style={{ border: '1px solid #000000', padding: '12px' }}>{kpi.Measurement_Period}</td>
                <td style={{ border: '1px solid #000000', padding: '12px' }}>{kpi.Target_Value}</td>
                <td style={{ border: '1px solid #000000', padding: '12px' }}>{kpi.Actual_Value}</td>
                <td style={{ border: '1px solid #000000', padding: '12px' }}>{kpi.Status}</td>
                <td style={{ border: '1px solid #000000', padding: '12px' }}>{new Date(kpi.Last_Updated).toLocaleDateString()}</td>
                <td style={{ border: '1px solid #000000', padding: '12px' }}>{kpi.Responsible_Department}</td>
                <td style={{ border: '1px solid #000000', padding: '12px' }}>{kpi.Comments}</td>
                <td style={{ border: '1px solid #000000', padding: '12px', textAlign: 'center' }}>
                  <button
                    onClick={() => handleUpdate(kpi)}
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
                    onClick={() => handleDelete(kpi._id)}
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
              <td colSpan="10" style={{ padding: '12px', textAlign: 'center' }}>No KPIs found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
