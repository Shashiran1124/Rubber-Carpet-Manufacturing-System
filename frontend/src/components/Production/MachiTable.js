import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MachiTable() {
  const [allocations, setAllocations] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // State for the search query
  const navigate = useNavigate();

  // Function to fetch allocations from the server
  const fetchAllocations = async () => {
    try {
      const response = await fetch('http://localhost:8070/test3/machi');
      if (response.ok) {
        const data = await response.json();
        setAllocations(data);
      } else {
        console.error('Failed to fetch allocations');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Fetch allocations when the component mounts
  useEffect(() => {
    fetchAllocations();
  }, []);

  // Function to handle updating an allocation
  const handleUpdate = (allocations) => {
    navigate('/dashmachiform', { state: { allocations } });
  };

  // Function to handle deleting an allocation
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8070/test3/delete/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchAllocations(); // Refresh the table after deletion
        alert('Allocation deleted successfully');
      } else {
        alert('Failed to delete allocation');
      }
    } catch (error) {
      console.error('Error deleting allocation:', error);
      alert('An error occurred while deleting the allocation.');
    }
  };

  // Filter the allocations based on the search query
  const filteredAllocations = allocations.filter((allocation) =>
    allocation.mnum.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ marginBottom: '20px', color: '#000000', textAlign: 'center' }}>Machine Allocation List</h1>

      {/* Search bar */}
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <input
          type="text"
          placeholder="Search by Machine Number"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: '10px',
            width: '300px',
            borderRadius: '5px',
            border: '1px solid #ccc'
          }}
        />
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #000000', backgroundColor: '#FFFFFF' }}>
        <thead>
          <tr style={{ backgroundColor: '#7D2CE0', color: '#FFFFFF' }}>
            <th style={{ border: '1px solid #000000', padding: '12px' }}>Machine Number</th>
            <th style={{ border: '1px solid #000000', padding: '12px' }}>Date</th>
            <th style={{ border: '1px solid #000000', padding: '12px' }}>Start Time</th>
            <th style={{ border: '1px solid #000000', padding: '12px' }}>End Time</th>
            <th style={{ border: '1px solid #000000', padding: '12px' }}>Team Name</th>
            <th style={{ border: '1px solid #000000', padding: '12px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredAllocations.map((allocation) => (
            <tr key={allocation._id}>
              <td style={{ border: '1px solid #000000', padding: '12px' }}>{allocation.mnum}</td>
              <td style={{ border: '1px solid #000000', padding: '12px' }}>{new Date(allocation.mdate).toLocaleDateString()}</td>
              <td style={{ border: '1px solid #000000', padding: '12px' }}>{allocation.mstime}</td>
              <td style={{ border: '1px solid #000000', padding: '12px' }}>{allocation.metime}</td>
              <td style={{ border: '1px solid #000000', padding: '12px' }}>{allocation.mteam}</td>
              <td style={{ border: '1px solid #000000', padding: '12px', textAlign: 'center' }}>
                <button
                  onClick={() => handleUpdate(allocation)}
                  style={{
                    padding: '8px 12px',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    marginRight: '8px'
                  }}
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(allocation._id)}
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
          ))}
        </tbody>
      </table>
    </div>
  );
}
