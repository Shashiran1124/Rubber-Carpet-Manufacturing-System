import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import costImage from '../../images/Cost.jpg'; // Replace with your image path

export default function CostForm4() {
  const navigate = useNavigate();
  const location = useLocation(); // Access location to get passed cost data

  const [formData, setFormData] = useState({
    Month: '',
    Transport_Cost: '',
    Fuel_Cost: '',
    Vehicle_Repair_Cost: '',
    Food_Cost: '',
    Insurance_Cost: '',
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [costId, setCostId] = useState(null);

  useEffect(() => {
    if (location.state && location.state.cost) {
      const cost = location.state.cost;
      setFormData({
        Month: cost.Month || '',
        Transport_Cost: cost.Transport_Cost || '',
        Fuel_Cost: cost.Fuel_Cost || '',
        Vehicle_Repair_Cost: cost.Vehicle_Repair_Cost || '',
        Food_Cost: cost.Food_Cost || '',
        Insurance_Cost: cost.Insurance_Cost || '',
      });
      setCostId(cost._id);
      setIsEditMode(true);
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Prevent non-numeric input in cost-related fields
    if (
      ['Transport_Cost', 'Fuel_Cost', 'Vehicle_Repair_Cost', 'Food_Cost', 'Insurance_Cost'].includes(name) &&
      !/^\d*(\.\d{0,2})?$/.test(value)
    ) {
      return;
    }

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate numeric input
    if (!formData.Month) {
      alert('Month is required');
      return;
    }
    if (
      ['Transport_Cost', 'Fuel_Cost', 'Vehicle_Repair_Cost', 'Food_Cost', 'Insurance_Cost'].some(
        (field) => isNaN(parseFloat(formData[field])) || parseFloat(formData[field]) < 0
      )
    ) {
      alert('Please enter valid numeric values for all cost fields.');
      return;
    }

    try {
      const url = isEditMode
        ? `http://localhost:8070/controller3/update/${costId}`
        : 'http://localhost:8070/controller3/addcost';
      const method = isEditMode ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert(`Cost ${isEditMode ? 'updated' : 'added'} successfully`);
        navigate('/dashcosttable'); // Adjust the redirect route if necessary
      } else {
        const errorData = await response.json();
        alert(`Failed to ${isEditMode ? 'update' : 'add'} cost: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert(`An error occurred while ${isEditMode ? 'updating' : 'adding'} the cost.`);
    }
  };

  // Navigate to the cost table view
  const handleViewTable = () => {
    navigate('/dashcosttable'); // Change this path to the correct route for your cost table
  };

  // Generate an array of months for the dropdown
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

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
        <img src={costImage} alt="Cost" style={{ width: '500px', height: '80vh', borderRadius: '10px' }} />
      </div>
      <div style={{
        backgroundColor: '#EDEDEE',
        padding: '20px 40px',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '500px',
        border: '2px solid #000000',
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '15px', color: '#333' }}>Cost Form</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="Month" style={{ display: 'block', marginBottom: '3px', textAlign: 'left' }}>Month:</label>
            <select
              id="Month"
              name="Month"
              value={formData.Month}
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
              <option value="">Select a month</option>
              {months.map((month) => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
          </div>
          {[ 
            { label: 'Transport Cost', name: 'Transport_Cost', type: 'text' },
            { label: 'Fuel Cost', name: 'Fuel_Cost', type: 'text' },
            { label: 'Vehicle Repair Cost', name: 'Vehicle_Repair_Cost', type: 'text' },
            { label: 'Food Cost', name: 'Food_Cost', type: 'text' },
            { label: 'Insurance Cost', name: 'Insurance_Cost', type: 'text' }
          ].map(({ label, name, type }) => (
            <div key={name} style={{ marginBottom: '10px' }}>
              <label htmlFor={name} style={{ display: 'block', marginBottom: '3px', textAlign: 'left' }}>{label}:</label>
              <input
                type={type}
                id={name}
                name={name}
                value={formData[name]}
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
          ))}
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#4CAF50',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              fontSize: '16px',
              cursor: 'pointer'
            }}
          >
            {isEditMode ? 'Update Cost' : 'Add Cost'}
          </button>
        </form>
        <button
          onClick={handleViewTable}
          style={{
            width: '100%',
            marginTop: '10px',
            padding: '10px',
            backgroundColor: '#2196F3',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          View Table
        </button>
      </div>
    </div>
  );
}
