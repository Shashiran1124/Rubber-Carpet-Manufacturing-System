import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CalTable() {
  const [salesOrders, setSalesOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const fetchSalesOrders = async () => {
    try {
      const response = await fetch('http://localhost:8070/calculation/');
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched data:', data);
        setSalesOrders(data);
      } else {
        console.error('Failed to fetch sales orders');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchSalesOrders();
  }, []);

  const handleUpdate = (order) => {
    navigate('/DashCalFo', { state: { order } });
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this order?');
    if (!confirmed) return;
    try {
      const response = await fetch(`http://localhost:8070/calculation/delete/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setSalesOrders(salesOrders.filter(order => order._id !== id));
        console.log('Order deleted');
      } else {
        console.error('Failed to delete order');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const getMonthName = (monthNumber) => {
    const date = new Date();
    date.setMonth(monthNumber); // Correcting the month to 0-indexed
    return date.toLocaleString('default', { month: 'long' });
  };

  // Filter sales orders based on the search term (by month name)
  const filteredOrders = salesOrders.filter((order) => {
    const orderMonthName = getMonthName(new Date(order.month).getMonth() + 1).toLowerCase();
    return orderMonthName.includes(searchTerm.toLowerCase()); // Check if the search term matches the month name
  });

  

  return (
    <div style={{ padding: '20px 30px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f7f7f7', minHeight: '110vh', display: 'flex', flexDirection: 'column' }}>
      
      <h1 style={{ marginBottom: '40px', marginLeft: '350px', color: '#000000', fontSize: '22px' }}>List of the Sales Orders</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by Month"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          margin: '0 auto 20px',
          padding: '10px',
          width: '300px',
          borderRadius: '5px',
          border: '1px solid #ccc',
        }}
      />

      <table style={{ width: '85%', borderCollapse: 'collapse', border: '1.5px solid #000000', fontSize: '14px', margin: '0 auto' }}>
        <thead>
          <tr style={{ backgroundColor: '#f4f4f4', color: '#333' }}>
            <th style={{ border: '1.5px solid #000000', padding: '8px', backgroundColor: '#C7C7C7' }}>Month</th>
            <th style={{ border: '1.5px solid #000000', padding: '8px', backgroundColor: '#C7C7C7' }}>Product</th>
            <th style={{ border: '1.5px solid #000000', padding: '8px', backgroundColor: '#C7C7C7' }}>Total Quantity</th>
            <th style={{ border: '1.5px solid #000000', padding: '8px', backgroundColor: '#C7C7C7' }}>Unit Price</th>
            <th style={{ border: '1.5px solid #000000', padding: '8px', backgroundColor: '#C7C7C7' }}>Total Sales</th>
            <th style={{ border: '1.5px solid #000000', padding: '8px', width: '180px', backgroundColor: '#C7C7C7' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order, index) => (
            <tr key={order._id}>
              <td style={{ border: '1.5px solid #000000', padding: '8px' }}>{getMonthName(new Date(order.month).getMonth() + 1)}</td>
              <td style={{ border: '1.5px solid #000000', padding: '8px' }}>{order.product}</td>
              <td style={{ border: '1.5px solid #000000', padding: '8px' }}>{order.totalQuantity}</td>
              <td style={{ border: '1.5px solid #000000', padding: '8px' }}>{order.unitPrice}</td>
              <td style={{ border: '1.5px solid #000000', padding: '8px' }}>{order.totalSales}</td>
              <td style={{ border: '1.5px solid #000000', padding: '8px', width: '180px', textAlign: 'center' }}>
                <button
                  onClick={() => handleUpdate(order)}
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
                  onClick={() => handleDelete(order._id)}
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

      {/* Go to Report Page Button */}
      <button
        onClick={() => navigate('/DashRep')}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#8A2BE2',
          color: '#FFFFFF',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          display: 'block',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        Go to Report Page
      </button>
    </div>
  );
}
