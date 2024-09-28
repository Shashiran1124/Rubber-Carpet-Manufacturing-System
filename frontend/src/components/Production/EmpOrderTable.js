import React, { useEffect, useState } from 'react';

export default function EmpOrderTable() {
  const [Order, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Function to fetch orders from the server
  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:8070/test/');
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      } else {
        console.error('Failed to fetch orders');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Fetch orders when the component mounts
  useEffect(() => {
    fetchOrders();
  }, []);

  // Filter orders based on search query
  const filteredOrders = Order.filter(order =>
    order.num.toString().includes(searchQuery)
  );

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ marginBottom: '20px', color: '#000000', textAlign: 'center' }}>Order List</h1>
      
      {/* Search Bar */}
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Search by Order Number"
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
            <th style={{ border: '1px solid #000000', padding: '12px' }}>Order Name</th>
            <th style={{ border: '1px solid #000000', padding: '12px' }}>Name</th>
            <th style={{ border: '1px solid #000000', padding: '12px' }}>Product Quantity</th>
            <th style={{ border: '1px solid #000000', padding: '12px' }}>Size</th>
            <th style={{ border: '1px solid #000000', padding: '12px' }}>Material</th>
            <th style={{ border: '1px solid #000000', padding: '12px' }}>Material Quantity</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order) => (
            <tr key={order._id} style={{ backgroundColor: '#fff' }}>
              <td style={{ border: '1px solid #000000', padding: '12px' }}>{order.num}</td>
              <td style={{ border: '1px solid #000000', padding: '12px' }}>{order.name}</td>
              <td style={{ border: '1px solid #000000', padding: '12px' }}>{order.qty}</td>
              <td style={{ border: '1px solid #000000', padding: '12px' }}>{order.size}</td>
              <td style={{ border: '1px solid #000000', padding: '12px' }}>{order.material}</td>
              <td style={{ border: '1px solid #000000', padding: '12px' }}>{order.materialQTY}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
