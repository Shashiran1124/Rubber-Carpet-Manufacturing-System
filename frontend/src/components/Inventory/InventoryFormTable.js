import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function InventoryFormTable() {
  const [salesOrder, setSalesOrder] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const navigate = useNavigate();

  // Fetch Sales Order function
  const fetchSalesOrder = async () => {
    try {
      const response = await fetch('http://localhost:8070/inventoryroute/');
      if (response.ok) {
        const data = await response.json();
        setSalesOrder(data);
      } else {
        console.error('Failed to fetch sales order');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchSalesOrder();
  }, []);

  // Function to handle updating a supplier
  const handleUpdate = (order) => {
    navigate('/DashInForm', { state: { order } });
  };

  // Function to handle deleting a sales order
  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this order?');
    if (!confirmed) return;

    try {
      const response = await fetch(`http://localhost:8070/inventoryroute/delete/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchSalesOrder(); // Refresh the sales order table after deletion
        alert('Sales order deleted successfully');
      } else {
        alert('Failed to delete sales order');
      }
    } catch (error) {
      console.error('Error deleting sales order:', error);
      alert('An error occurred while deleting the sales order.');
    }
  };

  // Filter sales orders based on the search term
  const filteredSalesOrder = salesOrder.filter((order) =>
    order.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ marginBottom: '20px', color: '#333' }}>Receive Final Goods Details</h1>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search product name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          padding: '8px',
          marginBottom: '20px',
          width: '90%',
          borderRadius: '8px',
          border: '1px solid #ddd',
          fontSize: '14px',
        }}
      />

      {filteredSalesOrder.length === 0 ? (
        <p>No sales orders available.</p>
      ) : (
        <table style={{ width: '90%', borderCollapse: 'collapse', border: '1px solid #ddd', fontSize: '14px', margin: '0 auto' }}>
          <thead>
            <tr style={{ backgroundColor: '#f4f4f4', color: '#333' }}>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Product ID</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Product Name</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Production Date</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Quantity</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Unit Price</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Total Price</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', width: '170px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSalesOrder.map((order) => (
              <tr key={order._id}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{order.productId}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{order.productName}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  {new Date(order.productionDate).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}
                </td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{order.quantity}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{order.unitPrice}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{order.totalPrice}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>
                  <button
                    onClick={() => handleUpdate(order)}
                    style={{
                      padding: '6px 10px',
                      backgroundColor: '#007bff',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      marginRight: '6px',
                      fontSize: '12px'
                    }}
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(order._id)}
                    style={{
                      padding: '6px 10px',
                      backgroundColor: '#dc3545',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      fontSize: '12px'
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
