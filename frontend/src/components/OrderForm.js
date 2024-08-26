import React, { useState } from 'react';
import orderhereImage from '../images/orderhere.jpg';


export default function OrderForm() {
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

  const handleChange = (e) => {
    const { name, value } = e.target;

    let errorMessage = '';

    if (name === 'customerName') {
      // Validation for customerName to only allow English letters and spaces
      const nameRegex = /^[A-Za-z\s]*$/;
      if (!nameRegex.test(value)) {
        errorMessage = 'Customer Name can only contain English letters and spaces.';
      }
    } else if (name === 'contactNumber') {
      // Validation for contactNumber to only allow exactly 10 digits
      const contactNumberRegex = /^\d{0,10}$/;
      if (!contactNumberRegex.test(value)) {
        errorMessage = 'Contact Number can only contain digits and must be exactly 10 digits.';
      }
      if (value.length > 10) {
        errorMessage = 'Contact Number must be exactly 10 digits.';
      }
    } else if (name === 'quantity') {
      // Validation for quantity to only allow numbers
      const quantityRegex = /^\d*$/;
      if (!quantityRegex.test(value)) {
        errorMessage = 'Quantity must be a number.';
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
      padding: '10px'
    }}>
   
<div style={{ marginRight: '20px' }}> {/* Step 3: Add margin between image and form */}
        <img src={orderhereImage} alt="Order" style={{ width: '300px', height: '96vh',borderRadius: '10px' }} /> {/* Step 2: Add the image */}
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
                border: '1px solid #ccc',
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
                border: '1px solid #ccc',
                borderRadius: '8px',
                boxSizing: 'border-box',
                color: '#000',
                fontSize: '14px'
              }}
            />
          </div>
          <div style={{ marginBottom: '8px' }}>
            <label htmlFor="contactNumber" style={{ display: 'block', marginBottom: '2px', textAlign: 'left', color: '#000', fontSize: '12px',fontWeight: '600' }}>Contact Number:</label>
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
                border: '1px solid #ccc',
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
            <label htmlFor="productCatalog" style={{ display: 'block', marginBottom: '2px', textAlign: 'left', color: '#000', fontSize: '12px',fontWeight: '600' }}>Product Catalog:</label>
            <select
              id="productCatalog"
              name="productCatalog"
              value={formData.productCatalog}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '8px',
                boxSizing: 'border-box',
                color: '#000',
                fontSize: '10px'
              }}
            >
              <option value="">Select a product</option>
              <option value="Product1">Product 1</option>
              <option value="Product2">Product 2</option>
              <option value="Product3">Product 3</option>
              {/* Add more product options here */}
            </select>
          </div>
          <div style={{ marginBottom: '8px' }}>
            <label htmlFor="address" style={{ display: 'block', marginBottom: '2px', textAlign: 'left', color: '#000', fontSize: '12px',fontWeight: '600' }}>Address:</label>
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
                border: '1px solid #ccc',
                borderRadius: '8px',
                boxSizing: 'border-box',
                color: '#000',
                fontSize: '16px'
              }}
            />
          </div>
          <div style={{ marginBottom: '8px' }}>
            <label htmlFor="quantity" style={{ display: 'block', marginBottom: '2px', textAlign: 'left', color: '#000', fontSize: '12px',fontWeight: '600' }}>Quantity:</label>
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
                border: '1px solid #ccc',
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
            <label htmlFor="purchasingReason" style={{ display: 'block', marginBottom: '2px', textAlign: 'left', color: '#000', fontSize: '12px',fontWeight: '600' }}>Purchasing Reason:</label>
            <textarea
              id="purchasingReason"
              name="purchasingReason"
              value={formData.purchasingReason}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '4px',
                border: '1px solid #ccc',
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
