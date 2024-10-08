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

    if (name === 'Drop_off_Date_and_Time') {
      const pickupDate = new Date(formData.Pickup_Date_and_Time);
      const dropOffDate = new Date(value);
      if (dropOffDate < pickupDate) {
        alert("Drop-off date cannot be before Pickup date.");
        return; // Do not update the state if the drop-off date is invalid
      }
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
      <div style={{ marginRight: '10px' }}>
        <img src={supplierImage} alt="Order" style={{ width: '500px', height: '80vh', borderRadius: '8px' }} />
      </div>
      <div style={{
        backgroundColor: '#EDEDEE',
        padding: '15px 25px',
        borderRadius: '6px',
        boxShadow: '0 0 8px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '400px',
        border: '1px solid #000000',
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '15px', color: '#333', fontSize: '18px' }}>Transport & Order Details Form</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="Transport_Number" style={{ display: 'block', marginBottom: '3px', textAlign: 'left', fontSize: '14px' }}>Transport Number:</label>
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
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '14px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="Order_Number" style={{ display: 'block', marginBottom: '3px', textAlign: 'left', fontSize: '14px' }}>Order Number:</label>
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
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '14px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="Number_of_Packages" style={{ display: 'block', marginBottom: '3px', textAlign: 'left', fontSize: '14px' }}>Number of Packages:</label>
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
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '14px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="Drop_off_Location" style={{ display: 'block', marginBottom: '3px', textAlign: 'left', fontSize: '14px' }}>Drop-off Location:</label>
            <input
              type="text"
              id="Drop_off_Location"
              name="Drop_off_Location"
              value={formData.Drop_off_Location}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '14px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="Vehicle_Number" style={{ display: 'block', marginBottom: '3px', textAlign: 'left', fontSize: '14px' }}>Vehicle Number:</label>
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
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '14px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="Pickup_Date_and_Time" style={{ display: 'block', marginBottom: '3px', textAlign: 'left', fontSize: '14px' }}>Pickup Date:</label>
            <input
              type="date"
              id="Pickup_Date_and_Time"
              name="Pickup_Date_and_Time"
              value={formData.Pickup_Date_and_Time}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '14px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="Drop_off_Date_and_Time" style={{ display: 'block', marginBottom: '3px', textAlign: 'left', fontSize: '14px' }}>Drop-off Date:</label>
            <input
              type="date"
              id="Drop_off_Date_and_Time"
              name="Drop_off_Date_and_Time"
              value={formData.Drop_off_Date_and_Time}
              onChange={handleChange}
              required
              min={formData.Pickup_Date_and_Time} // Ensure it cannot be before pickup date
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '14px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="Tracking_Number" style={{ display: 'block', marginBottom: '3px', textAlign: 'left', fontSize: '14px' }}>Tracking Number:</label>
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
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '14px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <button type="submit" style={{
            width: '100%',
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '10px',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            cursor: 'pointer',
            marginBottom: '10px'
          }}>Submit</button>
          <button type="button" onClick={handleViewTable} style={{
            width: '100%',
            backgroundColor: '#f44336',
            color: 'white',
            padding: '10px',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            cursor: 'pointer'
          }}>View Table</button>
        </form>
      </div>
    </div>
  );
}
