import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useNavigate
import OrdernewImage from '../images/Ordernew.jpg';

export default function OrderForm() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    customerName: '',
    orderDate: '',
    contactNumber: '',
    productCatalog: '',
    address: '',
    quantity: '',
    purchasingReason: '',
  });
  const [errors, setErrors] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    if (location.state && location.state.order) {
      const order = location.state.order;
      const formattedDate = order.orderDate ? new Date(order.orderDate).toISOString().split('T')[0] : '';

      setFormData({
        customerName: order.customerName,
        orderDate: formattedDate,
        contactNumber: order.contactNumber,
        productCatalog: order.productCatalog,
        address: order.address,
        quantity: order.quantity,
        purchasingReason: order.purchasingReason,

      });
      setOrderId(order._id);
      setIsEditMode(true);
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Validations
    if (name === 'customerName') {
      // Allow only English letters (uppercase and lowercase) and prevent typing numbers or symbols
      const filteredValue = value.replace(/[^a-zA-Z]/g, '');
      setFormData({
        ...formData,
        [name]: filteredValue,
      });
    } else if (name === 'contactNumber') {
      // Allow only digits and limit to 10 digits
      const filteredValue = value.replace(/\D/g, '').slice(0, 10);
      setFormData({
        ...formData,
        [name]: filteredValue,
      });
    } else if (name === 'quantity') {
      // Ensure only positive integers are accepted, no minus sign allowed
      const filteredValue = value.replace(/[^0-9]/g, ''); // Remove all non-numeric characters
      if (filteredValue === '' || parseInt(filteredValue) > 0) {
        setFormData({
          ...formData,
          [name]: filteredValue,
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  
    setErrors({
      ...errors,
      [name]: '',
    });
  };
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = isEditMode
        ? `http://localhost:8070/test/update/${orderId}`
        : 'http://localhost:8070/test/add';
      const method = isEditMode ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert(`SalesOrder ${isEditMode ? 'updated' : 'added'} successfully`);
        navigate('');
      } else {
        alert(`Failed to ${isEditMode ? 'update' : 'add'} order`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert(`An error occurred while ${isEditMode ? 'updating' : 'adding'} the order.`);
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f7f7f7',
      padding: '10px'
      
    }}>
      <div style={{ marginRight: '20px' }}>
        <img src={OrdernewImage} alt="Order" style={{ width: '300px', height: '94vh', borderRadius: '10px' }} />
      </div>

      <div style={{
        backgroundColor: '#F1F1F1',
        padding: '10px 15px',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '420px',
        boxSizing: 'border-box',
        border: '2px solid #000000',
        
      }}>
        <h2 style={{
          textAlign: 'center',
          marginBottom: '10px',
          color: '#000',
          fontSize: '22px'
        }}>Create an Order</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '8px' }}>
            <label htmlFor="customerName" style={{ display: 'block', marginBottom: '2px', textAlign: 'left', color: '#000', fontSize: '12px', fontWeight: '600' }}>Customer Name:</label>
            <input
              type="text"
              id="customerName"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #696767',
                borderRadius: '8px',
                boxSizing: 'border-box',
                color: '#000',
                fontSize: '14px'
              }}
            />
            {errors.customerName && (
              <div style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                {errors.customerName}
              </div>
            )}
          </div>
          <div style={{ marginBottom: '8px' }}>
            <label htmlFor="orderDate" style={{ display: 'block', marginBottom: '2px', textAlign: 'left', color: '#000', fontSize: '12px', fontWeight: '600' }}>Order Date:</label>
            <input
              type="date"
              id="orderDate"
              name="orderDate"
              value={formData.orderDate}
              onChange={handleChange}
              required
              min={new Date().toISOString().split('T')[0]}
              style={{
                width: '100%',
                padding: '4px',
                border: '1px solid #696767',
                borderRadius: '8px',
                boxSizing: 'border-box',
                color: '#000',
                fontSize: '14px'
              }}
            />
          </div>
          <div style={{ marginBottom: '8px' }}>
            <label htmlFor="contactNumber" style={{ display: 'block', marginBottom: '2px', textAlign: 'left', color: '#000', fontSize: '12px', fontWeight: '600' }}>Contact Number:</label>
            <input
              type="text"
              id="contactNumber"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '4px',
                border: '1px solid #696767',
                borderRadius: '8px',
                boxSizing: 'border-box',
                color: '#000',
                fontSize: '14px'
              }}
            />
            {errors.contactNumber && (
              <div style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                {errors.contactNumber}
              </div>
            )}
          </div>
          <div style={{ marginBottom: '8px' }}>
            <label htmlFor="productCatalog" style={{ display: 'block', marginBottom: '2px', textAlign: 'left', color: '#000', fontSize: '12px', fontWeight: '600' }}>Product Catalog:</label>
            <select
              id="productCatalog"
              name="productCatalog"
              value={formData.productCatalog}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #696767',
                borderRadius: '8px',
                boxSizing: 'border-box',
                color: '#000',
                fontSize: '12px'
              }}
            >
              <option value="">Select Product</option>
              <option value="Industrial Rubber Mats">Industrial Rubber Mats</option>
              <option value="Gym Rubber Flooring">Gym Rubber Flooring</option>
              <option value="Rubber Runner Mats">Rubber Runner Mats</option>
              <option value="Rubber Playground Mats">Rubber Playground Mats</option>
              <option value="Commercial Rubber Flooring">Commercial Rubber Flooring </option>
              <option value="Rubber Carpet Tiles">Rubber Carpet Tiles</option>
              {/* Add more product options here */}
            </select>
          </div>
          <div style={{ marginBottom: '8px' }}>
            <label htmlFor="address" style={{ display: 'block', marginBottom: '2px', textAlign: 'left', color: '#000', fontSize: '12px', fontWeight: '600' }}>Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #696767',
                borderRadius: '8px',
                boxSizing: 'border-box',
                color: '#000',
                fontSize: '12px'
              }}
            />
          </div>
          <div style={{ marginBottom: '8px' }}>
            <label htmlFor="quantity" style={{ display: 'block', marginBottom: '2px', textAlign: 'left', color: '#000', fontSize: '12px', fontWeight: '600' }}>Quantity:</label>
            <input
  type="number"
  id="quantity"
  name="quantity"
  value={formData.quantity}
  onChange={handleChange}
  onKeyPress={(e) => {
    // Prevent typing '-' character
    if (e.key === '-') {
      e.preventDefault();
    }
  }}
  required
  style={{
    width: '100%',
    padding: '6px',
    border: '1px solid #696767',
    borderRadius: '8px',
    boxSizing: 'border-box',
    color: '#000',
    fontSize: '14px'
  }}
/>

            {errors.quantity && (
              <div style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                {errors.quantity}
              </div>
            )}
          </div>
          <div style={{ marginBottom: '12px' }}>
            <label htmlFor="purchasingReason" style={{ display: 'block', marginBottom: '2px', textAlign: 'left', color: '#000', fontSize: '12px', fontWeight: '600' }}>Purchasing Reason:</label>
            <textarea
              id="purchasingReason"
              name="purchasingReason"
              value={formData.purchasingReason}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '4px',
                border: '1px solid #696767',
                borderRadius: '8px',
                boxSizing: 'border-box',
                color: '#000',
                fontSize: '12px',
                minHeight: '50px'
              }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginTop: '12px' }}>
          <button
            type="submit"
            style={{
              width: '25%',
              padding: '8px',
              backgroundColor: '#051ED7',
              color: '#fff',
              border: 'none',
              display: 'block',
              borderRadius: '10px',
              margin: 'auto',
              cursor: 'pointer',
              fontSize: '12px',
              marginRight:'2px',
              marginLeft:'10px',
            }}>
            {isEditMode ? 'Update' : 'Submit'}
          </button>
         
          </div>
        </form>
        
      </div>
    </div>
  );
}
