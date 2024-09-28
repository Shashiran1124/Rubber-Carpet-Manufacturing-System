import React, { useState } from 'react';
import TrackingImage from '../images/Tracking.jpg';

export default function OrderForm() {
  const [formData, setFormData] = useState({
    productType: '',
    customerName: '',
    orderDate: '',
    deliveryAddress: '',
    specialInstructions: '',
  });

  const [errors, setErrors] = useState({
    customerName: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let errorMessage = '';

    if (name === 'customerName') {
      // Validation for customerName to only allow English letters and spaces
      const nameRegex = /^[A-Za-z\s]*$/;
      if (!nameRegex.test(value)) {
        errorMessage = 'Customer Name can only contain English letters and spaces.';
      }
    }

    setErrors({
      ...errors,
      [name]: errorMessage,
    });

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for errors before submitting
    if (Object.values(errors).some((error) => error)) {
      alert('Please fix the errors before submitting.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Form submitted successfully');
      } else {
        alert('Form submission failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f7f7f7',
      padding: '10px',
      width: '100%',
    }}>
      <div style={{ marginRight: '20px' }}> 
        <img src={TrackingImage} alt="Order" style={{ width: '315px', height: '95vh',borderRadius: '10px' }} /> {/* Step 2: Add the image */}
      </div>
      <div style={{
        backgroundColor: '#F1F1F1', 
        padding: '30px 40px',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '350px',
        boxSizing: 'border-box',
        border: '2px solid #000000',
      }}>
        <h2 style={{
          textAlign: 'center',
          marginBottom: '50px',
          color: '#000',
          fontSize: '20px'
        }}>Place an Order</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '8px' }}>
            <label htmlFor="productType" style={{ display: 'block', marginBottom: '2px', textAlign: 'left', color: '#000', fontSize: '12px',fontWeight: '600' }}>Product Type:</label>
            <input
              type="text"
              id="productType"
              name="productType"
              value={formData.productType}
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
          </div>
          <div style={{ marginBottom: '8px' }}>
            <label htmlFor="customerName" style={{ display: 'block', marginBottom: '2px', textAlign: 'left', color: '#000', fontSize: '12px',fontWeight: '600' }}>Customer Name:</label>
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
            <label htmlFor="orderDate" style={{ display: 'block', marginBottom: '2px', textAlign: 'left', color: '#000', fontSize: '12px',fontWeight: '600' }}>Order Date:</label>
            <input
              type="date"
              id="orderDate"
              name="orderDate"
              value={formData.orderDate}
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
          </div>
          <div style={{ marginBottom: '8px' }}>
            <label htmlFor="deliveryAddress" style={{ display: 'block', marginBottom: '2px', textAlign: 'left', color: '#000', fontSize: '12px',fontWeight: '600' }}>Delivery Address:</label>
            <input
              type="text"
              id="deliveryAddress"
              name="deliveryAddress"
              value={formData.deliveryAddress}
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
          </div>
          <div style={{ marginBottom: '12px' }}>
            <label htmlFor="specialInstructions" style={{ display: 'block', marginBottom: '2px', textAlign: 'left', color: '#000', fontSize: '12px',fontWeight: '600' }}>Special Instructions:</label>
            <textarea
              id="specialInstructions"
              name="specialInstructions"
              value={formData.specialInstructions}
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
                minHeight: '80px'
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              width: '30%',
              padding: '6px',
              backgroundColor: '#051ED7',
              color: '#fff',
              border: 'none',
              display: 'block',
              borderRadius: '8px',
              margin: 'auto',
              cursor: 'pointer',
              fontSize: '12px'
            }}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
