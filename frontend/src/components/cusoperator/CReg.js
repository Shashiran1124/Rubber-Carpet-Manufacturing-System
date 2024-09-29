import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CustomerRegistrationTable() {
  const [customers, setCustomers] = useState([]);
  const [searchId, setSearchId] = useState('');
  const navigate = useNavigate();

  const fetchCustomers = async () => {
    try {
      const response = await fetch('http://localhost:8070/customers/'); // Adjust the URL to match your API
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched data:', data);
        setCustomers(data);
      } else {
        console.error('Failed to fetch customers');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleUpdate = (customer) => {
    navigate('/CustomerForm', { state: { customer } }); // Adjust the route as needed
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this customer?');
    if (!confirmed) return;
    try {
      const response = await fetch(`http://localhost:8070/customers/delete/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setCustomers(customers.filter(customer => customer._id !== id));
        console.log('Customer deleted');
      } else {
        console.error('Failed to delete customer');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div style={{ padding: '20px,30px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f7f7f7', minHeight: '170vh', display: 'flex', flexDirection: 'column' }}>
      <h1 style={{ marginBottom: '40px', marginLeft: '380px', color: '#000000', fontSize: '22px' }}>Customer Registration Details</h1>
      <input
        type="text"
        placeholder="Search by ID"
        value={searchId}
        onChange={(e) => setSearchId(e.target.value)}
        style={{ marginBottom: '20px', padding: '8px', width: '250px', fontSize: '16px',borderRadius: '8px',border: '1px solid #ccc', marginLeft: '390px' }}
      />
      <table style={{ width: '97%', borderCollapse: 'collapse', border: '1.5px solid #000000', fontSize: '14px', margin: '0 auto' }}>
        <thead>
          <tr style={{ backgroundColor: '#f4f4f4', color: '#333' }}>
            <th style={{ border: '1.5px solid #000000', padding: '8px', backgroundColor: '#C7C7C7' }}>First Name</th>
            <th style={{ border: '1.5px solid #000000', padding: '8px', backgroundColor: '#C7C7C7' }}>Last Name</th>
            <th style={{ border: '1.5px solid #000000', padding: '8px', backgroundColor: '#C7C7C7' }}>Registration Date</th>
            <th style={{ border: '1.5px solid #000000', padding: '8px', backgroundColor: '#C7C7C7' }}>Contact Number</th>
            <th style={{ border: '1.5px solid #000000', padding: '8px', backgroundColor: '#C7C7C7' }}>Address</th>
            <th style={{ border: '1.5px solid #000000', padding: '8px', backgroundColor: '#C7C7C7', width: '170px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer._id} style={{ backgroundColor: searchId === customer._id ? '#d3d3d3' : 'transparent' }}>
              <td style={{ border: '1.5px solid #000000', padding: '8px' }}>{customer.firstName}</td>
              <td style={{ border: '1.5px solid #000000', padding: '8px' }}>{customer.lastName}</td>
              <td style={{ border: '1.5px solid #000000', padding: '8px' }}>
                {new Date(customer.date).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}
              </td>
              <td style={{ border: '1.5px solid #000000', padding: '8px' }}>{customer.contactNumber}</td>
              <td style={{ border: '1.5px solid #000000', padding: '8px' }}>{customer.address}</td>
              <td style={{ border: '1.5px solid #000000', padding: '8px', textAlign: 'center' }}>
                <button
                  onClick={() => handleUpdate(customer)}
                  style={{
                    padding: '6px 10px',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    marginRight: '10px',
                    fontSize: '12px'
                  }}
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(customer._id)}
                  style={{
                    padding: '6px 10px',
                    backgroundColor: '#dc3545',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    fontSize: '12px',
                    marginLeft: '10px',
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
