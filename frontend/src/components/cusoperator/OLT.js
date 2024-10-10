import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ViewOrderTable() {
  const [salesOrder, setSalesOrder] = useState([]);
  const [searchName, setSearchName] = useState('');
  const navigate = useNavigate();
  const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });

  const fetchSalesOrder = async () => {
    try {
      const response = await fetch('http://localhost:8070/custest/');
      if (response.ok) {
        const data = await response.json();
        setSalesOrder(data);

        // Check for orders that match the current date
        const matchingOrders = data.filter(order => {
          const orderDate = new Date(new Date(order.orderDate).getTime() + new Date(order.orderDate).getTimezoneOffset() * 60000)
            .toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
          return orderDate === currentDate;
        });

        // Dispatch custom event to notify Navbar
        const notificationEvent = new CustomEvent('orderNotification', {
          detail: `There are ${matchingOrders.length} orders today`, // Send notification message
        });
        window.dispatchEvent(notificationEvent);
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

  const handleUpdate = (order) => {
    navigate('/DashOpForm', { state: { order } });
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this order?');
    if (!confirmed) return;
    try {
      const response = await fetch(`http://localhost:8070/custest/delete/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setSalesOrder(salesOrder.filter(order => order._id !== id));
        console.log('Order deleted');
      } else {
        console.error('Failed to delete order');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchName(e.target.value);
  };

  // Filter orders based on customer name
  const filteredOrders = salesOrder.filter(order =>
    order.customerName.toLowerCase().includes(searchName.toLowerCase())
  );

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#ffffff', minHeight: '170vh', display: 'flex', flexDirection: 'column' }}>
      <h1 style={{ marginBottom: '40px', marginLeft: '420px', color: '#000000', fontSize: '22px' }}>List of the Orders</h1>

      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <input
          type="text"
          placeholder="Search by Customer Name"
          value={searchName}
          onChange={handleSearchChange}
          style={{
            padding: '8px',
            width: '250px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            fontSize: '14px',
          }}
        />
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', border: '1.5px solid #000000', fontSize: '11px', margin: '0 auto' }}>
        <thead>
          <tr style={{ backgroundColor: '#f4f4f4', color: '#333' }}>
            <th style={{ border: '1.5px solid #000000', padding: '8px', backgroundColor: '#C7C7C7' }}>Order Number</th>
            <th style={{ border: '1.5px solid #000000', padding: '8px', backgroundColor: '#C7C7C7' }}>Customer Name</th>
            <th style={{ border: '1.5px solid #000000', padding: '8px', backgroundColor: '#C7C7C7' }}>Order Date</th>
            <th style={{ border: '1.5px solid #000000', padding: '8px', backgroundColor: '#C7C7C7' }}>Contact Number</th>
            <th style={{ border: '1.5px solid #000000', padding: '8px', backgroundColor: '#C7C7C7' }}>E-mail</th>
            <th style={{ border: '1.5px solid #000000', padding: '8px', backgroundColor: '#C7C7C7' }}>Product Catalog</th>
            <th style={{ border: '1.5px solid #000000', padding: '8px', backgroundColor: '#C7C7C7' }}>Address</th>
            <th style={{ border: '1.5px solid #000000', padding: '8px', backgroundColor: '#C7C7C7' }}>Quantity</th>
            
            <th style={{ border: '1.5px solid #000000', padding: '8px', backgroundColor: '#C7C7C7' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
  {filteredOrders.map((order) => {
    const orderIndex = salesOrder.findIndex(o => o._id === order._id); // Find the original index
    const orderNumber = 101 + orderIndex; // Calculate the order number based on the original index

    return (
      <tr key={order._id}>
        <td style={{ border: '1.5px solid #000000', padding: '8px' }}>{orderNumber}</td>
        <td style={{ border: '1.5px solid #000000', padding: '8px' }}>{order.customerName}</td>
        <td style={{ border: '1.5px solid #000000', padding: '8px' }}>
          {new Date(new Date(order.orderDate).getTime() + new Date(order.orderDate).getTimezoneOffset() * 60000).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}
        </td>
        <td style={{ border: '1.5px solid #000000', padding: '8px' }}>{order.contactNumber}</td>
        <td style={{ border: '1.5px solid #000000', padding: '8px' }}>{order.email}</td>
        <td style={{ border: '1.5px solid #000000', padding: '8px' }}>{order.productCatalog}</td>
        <td style={{ border: '1.5px solid #000000', padding: '8px' }}>{order.address}</td>
        <td style={{ border: '1.5px solid #000000', padding: '8px' }}>{order.quantity}</td>
        
        <td style={{ border: '1.5px solid #000000', padding: '8px', textAlign: 'center' }}>
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
              fontSize: '10px'
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
              fontSize: '10px',
              marginLeft: '10px',
            }}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  })}
</tbody>

      </table>
    </div>
  );
}
