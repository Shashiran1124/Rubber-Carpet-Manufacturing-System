import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useNavigate
import OrdernewImage from '../../images/Ordernew.jpg';

export default function CusOpForm() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    customerName: '',
    orderDate: '',
    contactNumber: '',
    email: '',
    productCatalog: '',
    address: '',
    quantity: '',
    
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
        email: order.email,
        productCatalog: order.productCatalog,
        address: order.address,
        quantity: order.quantity,
       

      });
      setOrderId(order._id);
      setIsEditMode(true);
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name === 'customerName') {
      const filteredValue = value.replace(/[^a-zA-Z]/g, ''); // Allow only English letters
      setFormData({
        ...formData,
        [name]: filteredValue,
      });
    } else if (name === 'contactNumber') {
      let filteredValue = value.replace(/\D/g, ''); // Remove all non-numeric characters
  
      // Ensure the number starts with "07"
      if (filteredValue.length === 1) {
        if (filteredValue !== '0') {
          filteredValue = ''; // Reset if the first digit is not "0"
        }
      } else if (filteredValue.length === 2) {
        if (filteredValue !== '07') {
          filteredValue = '0'; // Reset to '0' if the first two digits are not '07'
        }
      } else if (filteredValue.length >= 3) {
        // Check the first three digits to allow only valid prefixes
        const validPrefixes = ['070', '071', '072', '074', '075', '076', '077', '078'];
        const prefix = filteredValue.slice(0, 3);
  
        if (!validPrefixes.includes(prefix)) {
          filteredValue = filteredValue.slice(0, 2); // Keep only the first two digits if the prefix is invalid
        }
      }
  
      // Limit the contact number to 10 digits
      filteredValue = filteredValue.slice(0, 10);
  
      setFormData({
        ...formData,
        [name]: filteredValue,
      });
    } else if (name === 'quantity') {
      const filteredValue = value.replace(/[^0-9]/g, ''); // Ensure only positive integers
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
  

  const handleKeyDown = (e) => {
    // Prevent typing of decimal point and minus sign
    if (e.key === '.' || e.key === '-') {
      e.preventDefault();
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = isEditMode
        ? `http://localhost:8070/custest/update/${orderId}`
        : 'http://localhost:8070/custest/add';
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
        navigate('/DashOLT');
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
           {/* New Order Number input field */}
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
              max={new Date().toISOString().split('T')[0]}
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
            <label htmlFor="email" style={{ display: 'block', marginBottom: '2px', textAlign: 'left', color: '#000', fontSize: '12px', fontWeight: '600' }}>E-mail:</label> {/* New Email Field */}
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
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
            {errors.email && (
              <div style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                {errors.email}
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
            }}>
            {isEditMode ? 'Update' : 'Submit'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/DashOLT')}
            style={{
              width: '20%',
              padding: '8px',
              backgroundColor: '#289820',
              color: '#fff',
              border: 'none',
              display: 'block',
              borderRadius: '10px',
              margin: 'auto',
              cursor: 'pointer',
              fontSize: '10px',
              marginRight: '2px',
              
            }}>
            View Table
          </button>
          </div>
        </form>
        
      </div>
    </div>
  );
}
