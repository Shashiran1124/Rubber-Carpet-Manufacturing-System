import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ReleaseRawMaterialsTable() {
  const [rawMaterials, setRawMaterials] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const navigate = useNavigate();

  // Fetch Release Raw Materials function
  const fetchRawMaterials = async () => {
    try {
      const response = await fetch('http://localhost:8070/releaseRawMaterialsRoutes/release-raw-materials');
      if (response.ok) {
        const data = await response.json();
        setRawMaterials(data);
      } else {
        console.error('Failed to fetch release raw materials');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Call fetchRawMaterials on component mount
  useEffect(() => {
    fetchRawMaterials();
  }, []);

  // Function to handle updating a raw material entry
  const handleUpdate = (material) => {
    navigate('/dashrelerawform', { state: { material } });
  };

  // Function to handle deleting a raw material entry
  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this entry?');
    if (!confirmed) return;

    try {
      const response = await fetch(`http://localhost:8070/releaseRawMaterialsRoutes/delete-release/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchRawMaterials(); // Refresh the table after deletion
        alert('Release raw material entry deleted successfully');
      } else {
        alert('Failed to delete release raw material entry');
      }
    } catch (error) {
      console.error('Error deleting release raw material entry:', error);
      alert('An error occurred while deleting the entry.');
    }
  };

  // Filter raw materials based on the search term
  const filteredRawMaterials = rawMaterials.filter((material) =>
    material.stockType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ marginBottom: '20px', color: '#333' }}>Released Raw Materials Details</h1>

      {/* Search bar for filtering stock type */}
      <input
        type="text"
        placeholder="Search by Stock Type"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          padding: '8px',
          marginBottom: '20px',
          width: '50%',
          borderRadius: '5px',
          border: '1px solid #ddd',
        }}
      />

      {filteredRawMaterials.length === 0 ? (
        <p>No raw materials available.</p>
      ) : (
        <table style={{ width: '90%', borderCollapse: 'collapse', border: '1px solid #ddd', fontSize: '14px', margin: '0 auto' }}>
          <thead>
            <tr style={{ backgroundColor: '#f4f4f4', color: '#333' }}>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Stock Number</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Stock Type</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Release Date</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Quantity</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', width: '170px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRawMaterials.map((material) => (
              <tr key={material._id}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{material.stockNumber}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{material.stockType}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  {new Date(material.releaseDate).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}
                </td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{material.quantity}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>
                  <button
                    onClick={() => handleUpdate(material)}
                    style={{
                      padding: '6px 10px',
                      backgroundColor: '#007bff',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      marginRight: '6px',
                      fontSize: '12px',
                    }}
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(material._id)}
                    style={{
                      padding: '6px 10px',
                      backgroundColor: '#dc3545',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      fontSize: '12px',
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
