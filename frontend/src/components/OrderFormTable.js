import React, { useEffect, useState } from 'react';

export default function OrderFormTable() {
  const [salesOrder, setSalesOrder] = useState([]);

  const fetchSalesOrder = async () => {
    try {
      const response = await fetch('http://localhost:8070/test/');
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched data:', data);
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

  return (
    <div style={{ padding: '20px,30px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f7f7f7', minHeight: '170vh', display: 'flex', flexDirection: 'column' }}>
      <h1 style={{ marginBottom: '40px', marginLeft: '550px', color: '#000000', fontSize: '22px' }}>Sales Order List</h1>
      <table style={{ width: '90%', borderCollapse: 'collapse', border: '1.5px solid #000000', fontSize: '14px', margin: '0 auto' }}>
        <thead>
          <tr style={{ backgroundColor: '#f4f4f4', color: '#333' }}>
            <th style={{ border: '1.5px solid #000000', padding: '8px', backgroundColor: '#C7C7C7' }}>Customer Name</th>
            <th style={{ border: '1.5px solid #000000', padding: '8px', width: '20px', backgroundColor: '#C7C7C7' }}>Order Date</th>
            <th style={{ border: '1.5px solid #000000', padding: '8px', backgroundColor: '#C7C7C7' }}>Contact Number</th>
            <th style={{ border: '1.5px solid #000000', padding: '8px', width: '170px', backgroundColor: '#C7C7C7' }}>Product Catalog</th>
            <th style={{ border: '1.5px solid #000000', padding: '8px', width: '170px', backgroundColor: '#C7C7C7' }}>Address</th>
            <th style={{ border: '1.5px solid #000000', padding: '8px', backgroundColor: '#C7C7C7' }}>Quantity</th>
            <th style={{ border: '1.5px solid #000000', padding: '8px', width: '180px', backgroundColor: '#C7C7C7' }}>Purchasing Reason</th>
          </tr>
        </thead>
        <tbody>
          {salesOrder.map((order) => (
            <tr key={order._id}>
              <td style={{ border: '1.5px solid #000000', padding: '8px' }}>{order.customerName}</td>
              <td style={{ border: '1.5px solid #000000', padding: '8px' }}>
                {new Date(order.orderDate).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}
              </td>
              <td style={{ border: '1.5px solid #000000', padding: '8px' }}>{order.contactNumber}</td>
              <td style={{ border: '1.5px solid #000000', padding: '8px', width: '170px' }}>{order.productCatalog}</td>
              <td style={{ border: '1.5px solid #000000', padding: '8px', width: '170px' }}>{order.address}</td>
              <td style={{ border: '1.5px solid #000000', padding: '8px' }}>{order.quantity}</td>
              <td style={{ border: '1.5px solid #000000', padding: '8px', width: '180px' }}>{order.purchasingReason}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
