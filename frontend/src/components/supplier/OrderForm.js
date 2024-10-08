import React, { useState, useEffect } from 'react';
import TiersImage from '../../images/Tiers.jpg';
import { useNavigate, useLocation } from 'react-router-dom';

export default function OrderFormm() {
  const navigate = useNavigate();
  const location = useLocation(); // Access location to get passed order data
  const [formData, setFormData] = useState({
    dateOfOrder: '',
    companyName: '',
    contactNumber: '',
    materialType: '',
    quantity: '',
    unit: ''
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [errors, setErrors] = useState({}); // New state to track errors

  useEffect(() => {
    if (location.state && location.state.order) {
      const order = location.state.order;

      // Format date to 'YYYY-MM-DD' for the input field
      const formattedDate = order.dateOfOrder ? new Date(order.dateOfOrder).toISOString().split('T')[0] : '';

      setFormData({
        dateOfOrder: formattedDate,
        companyName: order.companyName,
        contactNumber: order.contactNumber,
        materialType: order.materialType,
        quantity: order.quantity,
        unit: order.unit,
      });
      setOrderId(order._id);
      setIsEditMode(true);
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let validValue = value;
    let error = '';

    if (name === 'contactNumber') {
      // Prevent any non-numeric input
      validValue = value.replace(/[^0-9]/g, '');
  
      // Ensure the contact number starts with "07" and third digit can only be 1, 2, 4, 5, 6, 7, 8, 0
      if (validValue.length === 1 && validValue !== '0') {
        // If the first digit is not "0", block input
        validValue = '';
        error = '';
      }
      
      if (validValue.length === 2 && validValue !== '07') {
        // If the first two digits are not "07", block input
        validValue = validValue.slice(0, 1); // Remove the invalid second digit
        error = '';
      }
  
      if (validValue.length === 3 && !/[12456780]/.test(validValue[2])) {
        // If the third digit is not in the allowed range, block input
        validValue = validValue.slice(0, 2); // Remove the invalid third digit
        error = '';
      }
  
      // Limit the number of digits to 10
      if (validValue.length > 10) {
        validValue = validValue.slice(0, 10);
      }
  
      // Check if the number is complete and valid (exactly 10 digits)
      if (validValue.length === 10 && !/^07[12456780][0-9]{7}$/.test(validValue)) {
        error = '';
      }
    }

    if (name === 'quantity') {
      validValue = value.replace(/[^0-9]/g, '');
      if (parseInt(validValue, 10) < 0) validValue = '0'; // Prevent negative values
    }

    if (name === 'companyName' || name === 'materialType') {
      validValue = value.replace(/[^A-Za-z ]/g, '');
    }

    setFormData({
      ...formData,
      [name]: validValue
    });

    setErrors({
      ...errors,
      [name]: error
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isEditMode
        ? `http://localhost:8070/suptest1/update/${orderId}`
        : 'http://localhost:8070/suptest1/addorder';
      const method = isEditMode ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert(`Order ${isEditMode ? 'updated' : 'submitted'} successfully`);
        navigate('/DashOFTable');
      } else {
        alert(`Failed to ${isEditMode ? 'update' : 'submit'} order`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert(`An error occurred while ${isEditMode ? 'updating' : 'submitting'} the order.`);
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
        <img src={TiersImage} alt="Order" style={{ width: '360px', height: '84vh', borderRadius: '10px' }} />
      </div>

      <div style={{
        backgroundColor: '#EDEDEE',
        padding: '20px 40px',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '450px',
        border: '2px solid #000000',
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Raw Material Order Form</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="dateOfOrder" style={{ display: 'block', marginBottom: '5px', textAlign: 'left' }}>Date of Order:</label>
            <input
              type="date"
              id="dateOfOrder"
              name="dateOfOrder"
              value={formData.dateOfOrder}
              onChange={handleChange}
              required
              min={new Date().toISOString().split('T')[0]}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                boxSizing: 'border-box'
              }}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="companyName" style={{ display: 'block', marginBottom: '5px', textAlign: 'left' }}>Company Name:</label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              required
              pattern="[A-Za-z ]+"
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                boxSizing: 'border-box'
              }}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="contactNumber" style={{ display: 'block', marginBottom: '5px', textAlign: 'left' }}>Contact Number:</label>
            <input
              type="text"
              id="contactNumber"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              required
              maxLength="10"
              pattern="\d*"
              title="Contact number should be numeric and up to 10 digits only."
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                boxSizing: 'border-box'
              }}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="materialType" style={{ display: 'block', marginBottom: '5px', textAlign: 'left' }}>Material Type:</label>
            <select
              id="materialType"
              name="materialType"
              value={formData.materialType}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                boxSizing: 'border-box'
              }}
            >
              <option value="">Select Material Type</option>
              <option value="Used Tires">Used Tires</option>
              <option value="Hoses">Hoses</option>
              <option value="Rubber Gaskets">Rubber Gaskets</option>
              <option value="Rubber Mats">Rubber Mats</option>
              <option value="Belts">Belts</option>
            </select>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="quantity" style={{ display: 'block', marginBottom: '5px', textAlign: 'left' }}>Quantity:</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
              min="0"
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                boxSizing: 'border-box'
              }}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="unit" style={{ display: 'block', marginBottom: '5px', textAlign: 'left' }}>Unit:</label>
            <select
              id="unit"
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                boxSizing: 'border-box'
              }}
            >
              <option value="">Select Unit</option>
              <option value="Kilograms">Kilograms</option>
              <option value="Tons">Tons</option>
              <option value="Pounds">Pounds</option>

            </select>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '20px'
          }}>
            <button type="submit" style={{
              backgroundColor: '#4CAF50',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              width: '100px'
            }}>
              {isEditMode ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
