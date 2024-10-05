import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function UserTable() {
  const [transports, setTransports] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Function to fetch transports from the server
  const fetchTransports = async () => {
    try {
      const response = await fetch('http://localhost:8070/controller/trans');
      if (response.ok) {
        const data = await response.json();
        setTransports(data);
      } else {
        console.error('Failed to fetch transports');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Fetch transports when the component mounts
  useEffect(() => {
    fetchTransports();
  }, []);

  // Function to handle updating a transport
  const handleUpdate = (transport) => {
    navigate('/dashuser', { state: { transport } });
  };

  // Function to handle deleting a transport
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8070/controller/delete/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchTransports(); // Refresh the table after deletion
        alert('Transport deleted successfully');
      } else {
        alert('Failed to delete transport');
      }
    } catch (error) {
      console.error('Error deleting transport:', error);
      alert('An error occurred while deleting the transport.');
    }
  };

  // Function to handle search input change
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter transports based on the search term (exact match for transport number)
  const filteredTransports = transports.filter((transport) =>
    transport.Transport_Number.toLowerCase() === searchTerm.toLowerCase()
  );

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ marginBottom: '20px', color: '#000000', textAlign: 'center' }}>Transport List</h1>

      {/* Search Bar */}
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <input
          type="text"
          placeholder="Enter Transport Number"
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

      <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #000000' }}>
        <thead>
          <tr style={{ backgroundColor: '#f4f4f4', color: '#333' }}>
            <th style={{ border: '1px solid #000000', padding: '12px' }}>Transport Number</th>
            <th style={{ border: '1px solid #000000', padding: '12px' }}>Order Number</th>
            <th style={{ border: '1px solid #000000', padding: '12px' }}>Number of Packages</th>
            <th style={{ border: '1px solid #000000', padding: '12px' }}>Drop-off Location</th>
            <th style={{ border: '1px solid #000000', padding: '12px' }}>Vehicle Number</th>
            <th style={{ border: '1px solid #000000', padding: '12px' }}>Pickup Date</th>
            <th style={{ border: '1px solid #000000', padding: '12px' }}>Drop-off Date</th>
            <th style={{ border: '1px solid #000000', padding: '12px' }}>Tracking Number</th>
            <th style={{ border: '1px solid #000000', padding: '12px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransports.length > 0 ? (
            filteredTransports.map((transport) => (
              <tr key={transport._id}>
                <td style={{ border: '1px solid #000000', padding: '12px' }}>{transport.Transport_Number}</td>
                <td style={{ border: '1px solid #000000', padding: '12px' }}>{transport.Order_Number}</td>
                <td style={{ border: '1px solid #000000', padding: '12px' }}>{transport.Number_of_Packages}</td>
                <td style={{ border: '1px solid #000000', padding: '12px' }}>{transport.Drop_off_Location}</td>
                <td style={{ border: '1px solid #000000', padding: '12px' }}>{transport.Vehicle_Number}</td>
                <td style={{ border: '1px solid #000000', padding: '12px' }}>{new Date(transport.Pickup_Date_and_Time).toLocaleDateString()}</td>
                <td style={{ border: '1px solid #000000', padding: '12px' }}>{new Date(transport.Drop_off_Date_and_Time).toLocaleDateString()}</td>
                <td style={{ border: '1px solid #000000', padding: '12px' }}>{transport.Tracking_Number}</td>
                <td style={{ border: '1px solid #000000', padding: '12px', textAlign: 'center' }}>
                  <IconButton
                    onClick={() => handleUpdate(transport)}
                    style={{ color: '#28a745', marginRight: '8px' }} // Changed edit icon color to green
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(transport._id)}
                    style={{ color: '#dc3545' }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </td>
              </tr>
            ))
          ) : searchTerm ? (
            <tr>
              <td colSpan="9" style={{ padding: '12px', textAlign: 'center' }}>No transport found with the given number</td>
            </tr>
          ) : (
            transports.map((transport) => (
              <tr key={transport._id}>
                <td style={{ border: '1px solid #000000', padding: '12px' }}>{transport.Transport_Number}</td>
                <td style={{ border: '1px solid #000000', padding: '12px' }}>{transport.Order_Number}</td>
                <td style={{ border: '1px solid #000000', padding: '12px' }}>{transport.Number_of_Packages}</td>
                <td style={{ border: '1px solid #000000', padding: '12px' }}>{transport.Drop_off_Location}</td>
                <td style={{ border: '1px solid #000000', padding: '12px' }}>{transport.Vehicle_Number}</td>
                <td style={{ border: '1px solid #000000', padding: '12px' }}>{new Date(transport.Pickup_Date_and_Time).toLocaleDateString()}</td>
                <td style={{ border: '1px solid #000000', padding: '12px' }}>{new Date(transport.Drop_off_Date_and_Time).toLocaleDateString()}</td>
                <td style={{ border: '1px solid #000000', padding: '12px' }}>{transport.Tracking_Number}</td>
                <td style={{ border: '1px solid #000000', padding: '12px', textAlign: 'center' }}>
                  <IconButton
                    onClick={() => handleUpdate(transport)}
                    style={{ color: '#28a745', marginRight: '8px' }} // Changed edit icon color to green
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(transport._id)}
                    style={{ color: '#dc3545' }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
