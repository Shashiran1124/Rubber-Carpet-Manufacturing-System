import React, { useEffect, useState } from 'react';

export default function EmpMachiTable() {
  const [allocations, setAllocations] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // State for the search query

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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
