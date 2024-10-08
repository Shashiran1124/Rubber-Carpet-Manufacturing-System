import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import pic1 from '../../images/pic1.jpeg';

export default function ReceiveRawMaterialsForm() {
  const navigate = useNavigate();
  const location = useLocation();

  // Get the current date in the format yyyy-mm-dd
  const currentDate = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    stockNumber: '',
    stockType: '',
    receiveDate: currentDate,  // Set default to current date
    quantity: ''
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [orderId, setOrderId] = useState(false);

  useEffect(() => {
    if (location.state && location.state.material) {
      const material = location.state.material;
      const formattedReceiveDate = material.receiveDate ? new Date(material.receiveDate).toISOString().split('T')[0] : "";
      setFormData({
        stockNumber: material.stockNumber,
        stockType: material.stockType,
        receiveDate: formattedReceiveDate,
        quantity: material.quantity
      });
      setOrderId(material._id);
      setIsEditMode(true);
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Restrict stockNumber to numbers only
    if (name === 'stockNumber') {
      const onlyNumbers = value.replace(/[^0-9]/g, '');
      setFormData({
        ...formData,
        [name]: onlyNumbers
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isEditMode
        ? `http://localhost:8070/receiveRawMaterialsRoutes/update-receive/${orderId}`
        : 'http://localhost:8070/receiveRawMaterialsRoutes/add-receive';
      const method = isEditMode ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert(`Raw Materials ${isEditMode ? 'updated' : 'added'} successfully`);
        navigate('/dashrecerawtable');
      } else {
        alert(`Failed to ${isEditMode ? 'update' : 'add'} raw materials`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert(`An error occurred while ${isEditMode ? 'updating' : 'adding'} the raw materials.`);
    }
  };

  const handleViewTable = () => {
    navigate('/dashrecerawtable');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f7f7f7', padding: '10px' }}>
      <div style={{ backgroundColor: '#F1F1F1', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', width: '100%', maxWidth: '420px', border: '2px solid #000' }}>
      <img
          src={pic1} 
          alt="Product"
          style={{
            width: '100%',
            height: 'vh',
            borderRadius: '4px',
            marginBottom: '1px',
          }}
        />
        </div>
        <div style={{
          backgroundColor: '#F1F1F1',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
          border: '2px solid #000',
        }}>
        <h2 style={{ textAlign: 'center', marginBottom: '10px', color: '#000', fontSize: '22px' }}>{isEditMode ? 'Edit Raw Materials' : 'Add Receive Raw Materials'}</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '8px' }}>
            <label htmlFor="stockNumber" style={{ display: 'block', marginBottom: '2px', color: '#000', fontSize: '12px', fontWeight: '600' }}>Stock Number:</label>
            <input
              type="text"
              id="stockNumber"
              name="stockNumber"
              value={formData.stockNumber}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '8px', borderRadius: '8px', boxSizing: 'border-box', color: '#000', fontSize: '14px' }}
            />
          </div>
          <div style={{ marginBottom: '8px' }}>
            <label htmlFor="stockType" style={{ display: 'block', marginBottom: '2px', color: '#000', fontSize: '12px', fontWeight: '600' }}>Stock Type:</label>
            <select
            id="stockType"
            name="stockType"
            value={formData.stockType}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', borderRadius: '8px', boxSizing: 'border-box', color: '#000', fontSize: '14px' }}
          >
            <option value="" disabled>Select Stock Type</option>
            <option value="Used Tires">Used Tires</option>
            <option value="Hoses">Hoses</option>
            <option value="Rubber Gaskets">Rubber Gaskets</option>
            <option value="Rubber Mats">Rubber Mats</option>
            <option value="Belts">Belts</option>
            </select>
          </div>

          <div style={{ marginBottom: '8px' }}>
            <label htmlFor="receiveDate" style={{ display: 'block', marginBottom: '2px', color: '#000', fontSize: '12px', fontWeight: '600' }}>Receive Date:</label>
            <input
              type="date"
              id="receiveDate"
              name="receiveDate"
              value={formData.receiveDate}
              min={currentDate}  // Restrict to current date
              max={currentDate}  // Restrict to current date
              readOnly // Make the field read-only
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '4px', borderRadius: '8px', boxSizing: 'border-box', color: '#000', fontSize: '14px' }}
            />
          </div>
          <div style={{ marginBottom: '8px' }}>
            <label htmlFor="quantity" style={{ display: 'block', marginBottom: '2px', color: '#000', fontSize: '12px', fontWeight: '600' }}>Quantity:</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '6px', borderRadius: '8px', boxSizing: 'border-box', color: '#000', fontSize: '14px' }}
            />
          </div>
          <div style={{ textAlign: 'center' }}>
          <button
              type="submit"
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '8px',
                backgroundColor: '#6c757d',
                color: '#fff',
                fontSize: '16px',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {isEditMode ? 'Update' : 'Add'} Product
            </button>
          </div>
        </form>
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
        <button
            onClick={handleViewTable}
            style={{
              marginTop: '10px',
              width: '100%',
              padding: '10px',
              borderRadius: '8px',
              backgroundColor: '#6c757d',
              color: '#fff',
              fontSize: '16px',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            View Product Table
          </button>
        </div>
      </div>
    </div>
  );
}
