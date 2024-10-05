import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import supplierImage from '../../images/trans.png';

export default function TransportForm() {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    Transport_Number: '',
    Order_Number: '',
    Number_of_Packages: '',
    Drop_off_Location: '',
    Vehicle_Number: '',
    Pickup_Date_and_Time: '',
    Drop_off_Date_and_Time: '',
    Tracking_Number: ''
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [transportId, setTransportId] = useState(null);

  useEffect(() => {
    if (location.state && location.state.transport) {
      const transport = location.state.transport;
      setFormData({
        Transport_Number: transport.Transport_Number || '',
        Order_Number: transport.Order_Number || '',
        Number_of_Packages: transport.Number_of_Packages || '',
        Drop_off_Location: transport.Drop_off_Location || '',
        Vehicle_Number: transport.Vehicle_Number || '',
        Pickup_Date_and_Time: formatDateForInput(transport.Pickup_Date_and_Time) || '',
        Drop_off_Date_and_Time: formatDateForInput(transport.Drop_off_Date_and_Time) || '',
        Tracking_Number: transport.Tracking_Number || ''
      });
      setTransportId(transport._id);
      setIsEditMode(true);
    }
  }, [location.state]);

  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().slice(0, 10); // Format: YYYY-MM-DD
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    let validValue = value;

    if (name === 'Transport_Number' || name === 'Order_Number' || name === 'Tracking_Number' || name === 'Vehicle_Number') {
      validValue = value.replace(/[^0-9]/g, '');
    }

    if (name === 'Number_of_Packages') {
      validValue = value.replace(/[^0-9]/g, '');
      if (parseInt(validValue, 10) < 0) validValue = '0'; // Prevent negative values
    }

    setFormData({
      ...formData,
      [name]: validValue
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isEditMode
        ? `http://localhost:8070/controller/update/${transportId}`
        : 'http://localhost:8070/controller/addtrans';
      const method = isEditMode ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert(`Transport ${isEditMode ? 'updated' : 'added'} successfully`);
        navigate('/dashtranstable');
      } else {
        alert(`Failed to ${isEditMode ? 'update' : 'add'} transport`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert(`An error occurred while ${isEditMode ? 'updating' : 'adding'} the transport.`);
    }
  };

  // New function to handle 'View Table' button click
  const handleViewTable = () => {
    navigate('/dashtranstable');
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
        <img src={supplierImage} alt="Order" style={{ width: '550px', height: '84vh', borderRadius: '10px' }} />
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
        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Transport & Order Details Form</h2>
        <form onSubmit={handleSubmit}>
          {/* Transport Number Field */}
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="Transport_Number" style={{ display: 'block', marginBottom: '5px', textAlign: 'left' }}>Transport Number:</label>
            <input
              type="text"
              id="Transport_Number"
              name="Transport_Number"
              value={formData.Transport_Number}
              onChange={handleChange}
              required
              pattern="\d+"
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Order Number Field */}
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="Order_Number" style={{ display: 'block', marginBottom: '5px', textAlign: 'left' }}>Order Number:</label>
            <input
              type="text"
              id="Order_Number"
              name="Order_Number"
              value={formData.Order_Number}
              onChange={handleChange}
              required
              pattern="\d+"
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Number of Packages Field */}
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="Number_of_Packages" style={{ display: 'block', marginBottom: '5px', textAlign: 'left' }}>Number of Packages:</label>
            <input
              type="number"
              id="Number_of_Packages"
              name="Number_of_Packages"
              value={formData.Number_of_Packages}
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

          {/* Drop-off Location Field */}
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="Drop_off_Location" style={{ display: 'block', marginBottom: '5px', textAlign: 'left' }}>Drop-off Location:</label>
            <input
              type="text"
              id="Drop_off_Location"
              name="Drop_off_Location"
              value={formData.Drop_off_Location}
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

          {/* Vehicle Number Field */}
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="Vehicle_Number" style={{ display: 'block', marginBottom: '5px', textAlign: 'left' }}>Vehicle Number:</label>
            <input
              type="text"
              id="Vehicle_Number"
              name="Vehicle_Number"
              value={formData.Vehicle_Number}
              onChange={handleChange}
              required
              pattern="\d+"
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Pickup Date Field */}
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="Pickup_Date_and_Time" style={{ display: 'block', marginBottom: '5px', textAlign: 'left' }}>Pickup Date:</label>
            <input
              type="date"
              id="Pickup_Date_and_Time"
              name="Pickup_Date_and_Time"
              value={formData.Pickup_Date_and_Time}
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

          {/* Drop-off Date Field */}
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="Drop_off_Date_and_Time" style={{ display: 'block', marginBottom: '5px', textAlign: 'left' }}>Drop-off Date:</label>
            <input
              type="date"
              id="Drop_off_Date_and_Time"
              name="Drop_off_Date_and_Time"
              value={formData.Drop_off_Date_and_Time}
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

          {/* Tracking Number Field */}
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="Tracking_Number" style={{ display: 'block', marginBottom: '5px', textAlign: 'left' }}>Tracking Number:</label>
            <input
              type="text"
              id="Tracking_Number"
              name="Tracking_Number"
              value={formData.Tracking_Number}
              onChange={handleChange}
              required
              pattern="\d+"
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Submit Button */}
          <button type="submit" style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '10px 15px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            width: '100%',
            fontSize: '16px'
          }}>
            {isEditMode ? 'Update Transport' : 'Add Transport'}
          </button>

          {/* View Table Button */}
          <button type="button" onClick={handleViewTable} style={{
            backgroundColor: '#2196F3',
            color: 'white',
            padding: '10px 15px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            width: '100%',
            fontSize: '16px',
            marginTop: '10px'
          }}>
            View Transport Table
          </button>
        </form>
      </div>
    </div>
  );
}
