import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UserTable2() {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Function to fetch orders from the server
  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:8070/controller1/order');
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      } else {
        console.error('Failed to fetch Orders');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Fetch orders when the component mounts
  useEffect(() => {
    fetchOrders();
  }, []);

  // Function to handle updating an order
  const handleUpdate = (order) => {
    navigate('/dashorder', { state: { order } });
  };

  // Function to handle deleting an order
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8070/controller1/delete/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchOrders(); // Refresh the table after deletion
        alert('Order deleted successfully');
      } else {
        alert('Failed to delete Order');
      }
    } catch (error) {
      console.error('Error deleting Order:', error);
      alert('An error occurred while deleting the Order.');
    }
  };

  // Function to handle search input change
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter orders based on the search term (exact match for order number)
  const filteredOrders = orders.filter((order) =>
    order.Order_Number.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ marginBottom: '20px', color: '#000000', textAlign: 'center' }}>Orders List</h1>

      {/* Search Bar */}
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <input
          type="text"
          placeholder="Search by Order Number"
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

      {/* Orders Table */}
      <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #000000' }}>
        <thead>
          <tr style={{ backgroundColor: '#f4f4f4', color: '#333' }}>
            <th style={{ border: '1px solid #000000', padding: '12px' }}>Order Number</th>
            <th style={{ border: '1px solid #000000', padding: '12px' }}>Customer Number</th>
            <th style={{ border: '1px solid #000000', padding: '12px' }}>Order Date</th>
            <th style={{ border: '1px solid #000000', padding: '12px' }}>Product Number</th>
            <th style={{ border: '1px solid #000000', padding: '12px' }}>Production Status</th>
            <th style={{ border: '1px solid #000000', padding: '12px' }}>Expected Delivery Date</th>
            <th style={{ border: '1px solid #000000', padding: '12px' }}>Actual Delivery Date</th>
            <th style={{ border: '1px solid #000000', padding: '12px' }}>Tracking URL</th>
            <th style={{ border: '1px solid #000000', padding: '12px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <tr key={order._id}>
                <td style={{ border: '1px solid #000000', padding: '12px' }}>{order.Order_Number}</td>
                <td style={{ border: '1px solid #000000', padding: '12px' }}>{order.Customer_Number}</td>
                <td style={{ border: '1px solid #000000', padding: '12px' }}>{new Date(order.Order_Date).toLocaleDateString()}</td>
                <td style={{ border: '1px solid #000000', padding: '12px' }}>{order.Product_Number}</td>
                <td style={{ border: '1px solid #000000', padding: '12px' }}>{order.Production_Status}</td>
                <td style={{ border: '1px solid #000000', padding: '12px' }}>{new Date(order.Expected_Delivery_Date).toLocaleDateString()}</td>
                <td style={{ border: '1px solid #000000', padding: '12px' }}>{new Date(order.Actual_Delivery_Date).toLocaleDateString()}</td>
                <td style={{ border: '1px solid #000000', padding: '12px' }}>
                  <a href={order.Tracking_URL} target="_blank" rel="noopener noreferrer" style={{ color: '#007bff' }}>
                    {order.Tracking_URL}
                  </a>
                </td>
                <td style={{ border: '1px solid #000000', padding: '12px', textAlign: 'center' }}>
                  <button
                    onClick={() => handleUpdate(order)}
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
                    onClick={() => handleDelete(order._id)}
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
              <td colSpan="9" style={{ padding: '12px', textAlign: 'center' }}>No orders found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
