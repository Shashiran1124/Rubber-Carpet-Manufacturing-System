import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import CostImage from '../images/Cost.jpg';

export default function RawMaterialCostForm() {
  const navigate = useNavigate();
  const location = useLocation(); // Access location to get passed data
  const [formData, setFormData] = useState({
    date: '',
    rawMaterialType: '',
    unit: '',
    pricePerUnit: '',
    quantity: '',
    totalCost: ''
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [itemId, setItemId] = useState(null); // Use itemId instead of supplierId
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (location.state && location.state.rawMaterialCost) {
      const item = location.state.rawMaterialCost;

      const formattedDate = item.date ? new Date(item.date).toISOString().split('T')[0]:'';

      setFormData({
        date: formattedDate,
        rawMaterialType: item.rawMaterialType,
        unit: item.unit,
        pricePerUnit: item.pricePerUnit,
        quantity: item.quantity,
        totalCost: item.totalCost
      });
      setItemId(item._id);
      setIsEditMode(true);
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let validValue = value;

    if (name === 'pricePerUnit' || name === 'quantity') {
      // Remove invalid characters
      validValue = value.replace(/[^0-9.]/g, '');

      if (name === 'quantity') {
        // Remove non-digit characters
        validValue = validValue.replace(/[^0-9]/g, '');
        // Ensure quantity is non-negative
        if (parseInt(validValue, 100) < 0) {
          validValue = '0';
        }
      } else if (name === 'pricePerUnit') {
        // Format to two decimal places if validValue is not empty
        validValue = validValue ? parseFloat(validValue).toFixed(2) : '';
      }
    }

    // Update the form data
    setFormData({
      ...formData,
      [name]: validValue
    });

    // Optionally update error state if you implement error handling
    setErrors({
      ...errors,
      [name]: ''
    });
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    // Calculate total cost
    const totalCost = formData.pricePerUnit * formData.quantity;
    setFormData({ ...formData, totalCost });

    try {
      const url = isEditMode
        ? `http://localhost:8070/test2/update/${itemId}`
        : 'http://localhost:8070/test2/add';
      const method = isEditMode ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, totalCost }), // Include totalCost in the request
      });

      if (response.ok) {
        alert(`Raw material cost ${isEditMode ? 'updated' : 'added'} successfully`);
        navigate('/DashRMCTable');
      } else {
        alert(`Failed to ${isEditMode ? 'update' : 'add'} raw material cost`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert(`An error occurred while ${isEditMode ? 'updating' : 'adding'} the raw material cost.`);
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
        <img src={CostImage} alt="Cost" style={{ width: '370px', height: '85vh', borderRadius: '10px' }} />
      </div>
      <div style={{
        backgroundColor: '#EDEDEE',
        padding: '20px 40px',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '350px',
        height: '79vh',
        border: '2px solid #000000',
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Raw Material Cost Calculator</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="date" style={{ display: 'block', marginBottom: '5px', textAlign: 'left' }}>Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
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
          </div>
          <div style={{ marginBottom: '15px' }}>
          <label htmlFor="rawMaterialType" style={{ display: 'block', marginBottom: '5px', textAlign: 'left' }}>Raw Material Type:</label>
            <select
              id="rawMaterialType"
              name="rawMaterialType"
              value={formData.rawMaterialType}
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
              <option value="">Select Raw Material Type</option>
              <option value="Used Tires">Used Tires</option>
              <option value="Hoses">Hoses</option>
              <option value="Rubber Gaskets">Rubber Gaskets</option>
              <option value="Rubber Mats">Rubber Mats</option>
              <option value="Belts">Belts</option>
            </select>
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
            {errors.unit && <p style={{ color: 'red', marginTop: '5px' }}>{errors.unit}</p>}
          </div>


          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="pricePerUnit" style={{ display: 'block', marginBottom: '5px', textAlign: 'left' }}>Price per Unit(Rs):</label>
            <input
              type="number"
              id="pricePerUnit"
              name="pricePerUnit"
              value={formData.pricePerUnit}
              onChange={handleChange}
              required
              step="0.01" // Allows decimal input
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                boxSizing: 'border-box'
              }}
            />
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
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="totalCost" style={{ display: 'block', marginBottom: '5px', textAlign: 'left' }}>Total Cost(Rs):</label>
            <input
              type="number"
              id="totalCost"
              name="totalCost"
              value={formData.totalCost}
              readOnly
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button
              type="submit"
              style={{
                padding: '10px 20px',
                marginTop:'20px',
                backgroundColor: '#007bff',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
              }}
            >
              {isEditMode ? 'Update' : 'Calculate'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/DashRMCTable')}
              style={{
                padding: '10px 20px',
                marginTop:'20px',
                backgroundColor: '#28a745',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
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
