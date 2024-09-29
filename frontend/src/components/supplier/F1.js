import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import supplierImage from '../../images/supplier.jpg';

export default function SupplierForm() {
  
  const navigate = useNavigate();
  const location = useLocation(); // Access location to get passed supplier data
  const [formData, setFormData] = useState({
    companyName: '',
    address: '',
    contactNumber: '',
    materialType: '',
    unit: '',
    quantity: ''
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [supplierId, setSupplierId] = useState(null);
  const [errors, setErrors] = useState({}); // New state to track errors

  useEffect(() => {
    if (location.state && location.state.supplier) {
      const supplier = location.state.supplier;
      setFormData({
        companyName: supplier.companyName,
        address: supplier.address,
        contactNumber: supplier.contactNumber,
        materialType: supplier.materialType,
        unit: supplier.unit,
        quantity: supplier.quantity,
      });
      setSupplierId(supplier._id);
      setIsEditMode(true);
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let validValue = value;
    let error = '';

    if (name === 'contactNumber') {
      validValue = value.replace(/[^0-9]/g, '');
      if (validValue.length !== 10) {
        error = '';
      }
    }

    if (name === 'companyName') {
      validValue = value.replace(/[^A-Za-z ]/g, '');
      if (!validValue) {
        error = '';
      }
    }

    if (name === 'quantity') {
      validValue = value.replace(/[^0-9]/g, '');
      if (parseInt(validValue, 10) < 0) {
        validValue = '0'; // Prevent negative values
        error = '';
      }
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
        ? `http://localhost:8070/suptest/update/${supplierId}`
        : 'http://localhost:8070/suptest/add';
      const method = isEditMode ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert(`Supplier ${isEditMode ? 'updated' : 'added'} successfully`);
        navigate('/DashF1T');
      } else {
        alert(`Failed to ${isEditMode ? 'update' : 'add'} supplier`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert(`An error occurred while ${isEditMode ? 'updating' : 'adding'} the supplier.`);
    }
  };


  const handleViewTable = () => {
    navigate('/DashF1T'); // Navigate to the table view
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
        <img src={supplierImage} alt="Order" style={{ width: '370px', height: '94vh', borderRadius: '10px' }} />
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
        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Supplier & Raw Material Details Form</h2>
        <form onSubmit={handleSubmit}>
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
            {errors.companyName && <p style={{ color: 'red', marginTop: '5px' }}>{errors.companyName}</p>}
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="address" style={{ display: 'block', marginBottom: '5px', textAlign: 'left' }}>Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                boxSizing: 'border-box'
              }}
            />
            {errors.address && <p style={{ color: 'red', marginTop: '5px' }}>{errors.address}</p>}
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
              pattern="\d{10}"
              title="Contact number should be exactly 10 digits."
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                boxSizing: 'border-box'
              }}
            />
            {errors.contactNumber && <p style={{ color: 'red', marginTop: '5px' }}>{errors.contactNumber}</p>}
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
            {errors.materialType && <p style={{ color: 'red', marginTop: '5px' }}>{errors.materialType}</p>}
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
              step="1"
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                boxSizing: 'border-box'
              }}
            />
            {errors.quantity && <p style={{ color: 'red', marginTop: '5px' }}>{errors.quantity}</p>}
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
              <option value="Pounds">Pounds

              </option>

            </select>
            {errors.unit && <p style={{ color: 'red', marginTop: '5px' }}>{errors.unit}</p>}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button
              type="submit"
              style={{
                padding: '10px 20px',
                backgroundColor: '#007BFF',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              {isEditMode ? 'Update' : 'Submit'}
            </button>
            <button
              type="button"
              onClick={handleViewTable}
              style={{
                padding: '10px 20px',
                backgroundColor: '#12F212',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              View Table
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
