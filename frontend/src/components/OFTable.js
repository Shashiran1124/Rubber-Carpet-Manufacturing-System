import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function OFTable() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:8070/test1/');
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const handleUpdate = (order) => {
    navigate('/OrderForm', { state: { order } });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        const response = await fetch(`http://localhost:8070/test1/delete/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          alert('Order deleted successfully');
          setOrders(orders.filter(order => order._id !== id));
        } else {
          alert('Failed to delete the order');
        }
      } catch (error) {
        console.error('Error deleting order:', error);
        alert('An error occurred while deleting the order.');
      }
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ marginBottom: '20px', color: '#000000', textAlign: 'center' }}>Raw Material Orders List</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #000000' }}>
        <thead>
          <tr style={{ backgroundColor: '#f4f4f4', color: '#333' }}>
            <th style={{ border: '1px solid #000000', padding: '12px', backgroundColor: '#C7C7C7' }}>Date of Order</th>
            <th style={{ border: '1px solid #000000', padding: '12px', backgroundColor: '#C7C7C7' }}>Company Name</th>
            <th style={{ border: '1px solid #000000', padding: '12px', backgroundColor: '#C7C7C7' }}>Contact Number</th>
            <th style={{ border: '1px solid #000000', padding: '12px', backgroundColor: '#C7C7C7' }}>Material Type</th>
            <th style={{ border: '1px solid #000000', padding: '12px', backgroundColor: '#C7C7C7' }}>Quantity</th>
            <th style={{ border: '1px solid #000000', padding: '12px', backgroundColor: '#C7C7C7' }}>Unit</th>
            <th style={{ border: '1px solid #000000', padding: '12px', backgroundColor: '#C7C7C7' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <td style={{ border: '1px solid #000000', padding: '12px' }}>
                {new Date(order.dateOfOrder).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}
              </td>
              <td style={{ border: '1px solid #000000', padding: '12px' }}>{order.companyName}</td>
              <td style={{ border: '1px solid #000000', padding: '12px' }}>{order.contactNumber}</td>
              <td style={{ border: '1px solid #000000', padding: '12px' }}>{order.materialType}</td>
              <td style={{ border: '1px solid #000000', padding: '12px' }}>{order.quantity}</td>
              <td style={{ border: '1px solid #000000', padding: '12px' }}>{order.unit}</td>
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
          ))}
        </tbody>
      </table>
    </div>
  );
}
