import React, { useEffect, useState } from 'react';

export default function DashCReg() {
  const [users, setUsers] = useState([]);
  const [searchName, setSearchName] = useState(''); // Updated state to search by name

  // Function to fetch users
  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:8070/test5/');
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched data:', data);
        setUsers(data);
      } else {
        console.error('Failed to fetch users');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Function to filter users by name
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchName.toLowerCase()) // Case-insensitive search
  );

  return (
    <div style={{ padding: '20px,30px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f7f7f7', minHeight: '170vh', display: 'flex', flexDirection: 'column' }}>
      <h1 style={{ marginBottom: '40px', marginLeft: '380px', color: '#000000', fontSize: '22px' }}>Customer Registration Details</h1>
      
      {/* Search bar for filtering by name */}
      <input
        type="text"
        placeholder="Search by Name"
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)} // Update searchName state
        style={{ marginBottom: '20px', padding: '8px', width: '250px', fontSize: '16px', borderRadius: '8px', border: '1px solid #ccc', marginLeft: '390px' }}
      />

      {/* Table displaying filtered users */}
      <table style={{ width: '97%', borderCollapse: 'collapse', border: '1.5px solid #000000', fontSize: '14px', margin: '0 auto' }}>
        <thead>
          <tr style={{ backgroundColor: '#f4f4f4', color: '#333' }}>
            <th style={{ border: '1.5px solid #000000', padding: '8px', backgroundColor: '#C7C7C7' }}>Name</th>
            <th style={{ border: '1.5px solid #000000', padding: '8px', backgroundColor: '#C7C7C7' }}>Email</th>
            <th style={{ border: '1.5px solid #000000', padding: '8px', backgroundColor: '#C7C7C7' }}>Registration Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <tr key={user._id}>
                <td style={{ border: '1.5px solid #000000', padding: '8px' }}>{user.name}</td>
                <td style={{ border: '1.5px solid #000000', padding: '8px' }}>{user.email}</td>
                <td style={{ border: '1.5px solid #000000', padding: '8px' }}>
                  {new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" style={{ textAlign: 'center', padding: '20px' }}>No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
