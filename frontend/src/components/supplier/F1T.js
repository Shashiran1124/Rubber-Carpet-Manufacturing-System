import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function F1T() {
  const [suppliers, setSuppliers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Function to fetch suppliers from the server
  const fetchSuppliers = async () => {
    try {
      const response = await fetch('http://localhost:8070/suptest/');
      if (response.ok) {
        const data = await response.json();
        setSuppliers(data);
      } else {
        console.error('Failed to fetch suppliers');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Fetch suppliers when the component mounts
  useEffect(() => {
    fetchSuppliers();
  }, []);

  // Function to handle updating a supplier
  const handleUpdate = (supplier) => {
    navigate('/DashSupForm', { state: { supplier } });
  };

  // Function to handle deleting a supplier
  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this order?');
    if (!confirmed) return;
    try {
      const response = await fetch(`http://localhost:8070/suptest/delete/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchSuppliers(); // Refresh the table after deletion
      } else {
        alert('Failed to delete supplier');
      }
    } catch (error) {
      console.error('Error deleting supplier:', error);
      alert('An error occurred while deleting the supplier.');
    }
  };

  // Filter suppliers based on search query
  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.companyName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ marginBottom: '20px', color: '#000000', textAlign: 'center' }}>Supplier and Raw Material Details Table</h1>
      
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by Company Name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{
          padding: '10px',
          width: '40%',
          marginBottom: '20px',
          borderRadius: '5px',
          border: '1px solid #ccc',
          fontSize: '16px',
          marginLeft:'400px',
        }}
      />

      <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #000000' }}>
        <thead>
          <tr style={{ backgroundColor: '#f4f4f4', color: '#333' }}>
            <th style={{ border: '1px solid #000000', padding: '12px', backgroundColor: '#C7C7C7' }}>Company Name</th>
            <th style={{ border: '1px solid #000000', padding: '12px', backgroundColor: '#C7C7C7' }}>Address</th>
            <th style={{ border: '1px solid #000000', padding: '12px', backgroundColor: '#C7C7C7' }}>Contact Number</th>
            <th style={{ border: '1px solid #000000', padding: '12px', backgroundColor: '#C7C7C7' }}>Material Type</th>
            <th style={{ border: '1px solid #000000', padding: '12px', backgroundColor: '#C7C7C7' }}>Quantity</th>
            <th style={{ border: '1px solid #000000', padding: '12px', backgroundColor: '#C7C7C7' }}>Unit</th>
            <th style={{ border: '1px solid #000000', padding: '12px', backgroundColor: '#C7C7C7' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredSuppliers.map((supplier) => (
            <tr key={supplier._id}>
              <td style={{ border: '1px solid #000000', padding: '12px' }}>{supplier.companyName}</td>
              <td style={{ border: '1px solid #000000', padding: '12px' }}>{supplier.address}</td>
              <td style={{ border: '1px solid #000000', padding: '12px' }}>{supplier.contactNumber}</td>
              <td style={{ border: '1px solid #000000', padding: '12px' }}>{supplier.materialType}</td>
              <td style={{ border: '1px solid #000000', padding: '12px' }}>{supplier.quantity}</td>
              <td style={{ border: '1px solid #000000', padding: '12px' }}>{supplier.unit}</td>
              <td style={{ border: '1px solid #000000', padding: '12px', textAlign: 'center' }}>
                <button
                  onClick={() => handleUpdate(supplier)}
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
                  onClick={() => handleDelete(supplier._id)}
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
