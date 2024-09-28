import React, { useEffect, useState } from 'react';

export default function EmpPlaneTable() {
  const [Plan, setPlans] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Function to fetch plans from the server
  const fetchPlans = async () => {
    try {
      const response = await fetch('http://localhost:8070/test2/plan');
      if (response.ok) {
        const data = await response.json();
        setPlans(data);
      } else {
        console.error('Failed to fetch plans');
      }
    } catch (error) {
      console.error('Error fetching plans:', error);
    }
  };

  // Fetch plans when the component mounts
  useEffect(() => {
    fetchPlans();
  }, []);

  // Filter plans based on search query
  const filteredPlans = Plan.filter(plan =>
    plan.pnum.toString().includes(searchQuery)
  );

  // Function to format date
  const formatDate = (dateString) => {
    return new Date(dateString).toISOString().split('T')[0];
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ marginBottom: '20px', color: '#000000', textAlign: 'center' }}>Plan List</h1>
      
      {/* Search Bar */}
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Search by Work Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            width: '300px',
            marginRight: '20px'
          }}
        />
      </div>
      
      <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #000000' }}>
        <thead>
          <tr style={{ backgroundColor: '#7D2CE0', color: '#fff' }}>
            <th style={{ border: '1px solid #000000', padding: '12px' }}>Work Name</th>
            <th style={{ border: '1px solid #000000', padding: '12px' }}>Start Date</th>
            <th style={{ border: '1px solid #000000', padding: '12px' }}>Start Time</th>
            <th style={{ border: '1px solid #000000', padding: '12px' }}>End Time</th>
            <th style={{ border: '1px solid #000000', padding: '12px' }}>Shift</th>
            <th style={{ border: '1px solid #000000', padding: '12px' }}>Team</th>
          </tr>
        </thead>
        <tbody>
          {filteredPlans.map((plan) => (
            <tr key={plan._id} style={{ backgroundColor: '#fff' }}>
              <td style={{ border: '1px solid #000000', padding: '12px' }}>{plan.pnum}</td>
              <td style={{ border: '1px solid #000000', padding: '12px' }}>{formatDate(plan.psdate)}</td>
              <td style={{ border: '1px solid #000000', padding: '12px' }}>{plan.pstime}</td>
              <td style={{ border: '1px solid #000000', padding: '12px' }}>{plan.petime}</td>
              <td style={{ border: '1px solid #000000', padding: '12px' }}>{plan.pshift}</td>
              <td style={{ border: '1px solid #000000', padding: '12px' }}>{plan.pteam}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
