import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import kpiImage from '../../images/kpi.jpeg'; // Replace with your image path

export default function KPIForm() {
  const navigate = useNavigate();
  const location = useLocation(); // Access location to get passed KPI data

  const [formData, setFormData] = useState({
    KPI_Number: '',
    KPI_Name: '',
    Measurement_Period: '',
    Target_Value: '',
    Actual_Value: '',
    Status: '',
    Last_Updated: '',
    Responsible_Department: '',
    Comments: ''
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [kpiId, setKpiId] = useState(null);

  useEffect(() => {
    if (location.state && location.state.kpi) {
      const kpi = location.state.kpi;
      setFormData({
        KPI_Number: kpi.KPI_Number,
        KPI_Name: kpi.KPI_Name,
        Measurement_Period: kpi.Measurement_Period,
        Target_Value: kpi.Target_Value,
        Actual_Value: kpi.Actual_Value,
        Status: kpi.Status,
        Last_Updated: formatDateForInput(kpi.Last_Updated),
        Responsible_Department: kpi.Responsible_Department,
        Comments: kpi.Comments
      });
      setKpiId(kpi._id);
      setIsEditMode(true);
    }
  }, [location.state]);

  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Prevent non-numeric input in KPI Number
    if (name === 'KPI_Number' && !/^\d*$/.test(value)) {
      return;
    }

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for valid number input for KPI Number only
    if (!/^\d+$/.test(formData.KPI_Number)) {
      alert('KPI Number must be numeric');
      return;
    }

    try {
      const url = isEditMode
        ? `http://localhost:8070/controller2/update/${kpiId}`
        : 'http://localhost:8070/controller2/addkpi';
      const method = isEditMode ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert(`KPI ${isEditMode ? 'updated' : 'added'} successfully`);
        navigate('/dashkpitable');
      } else {
        const errorData = await response.json();
        alert(`Failed to ${isEditMode ? 'update' : 'add'} KPI: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert(`An error occurred while ${isEditMode ? 'updating' : 'adding'} the KPI.`);
    }
  };

  const handleViewTable = () => {
    navigate('/dashkpitable');
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
        <img src={kpiImage} alt="KPI" style={{ width: '500px', height: '80vh', borderRadius: '10px' }} />
      </div>
      <div style={{
        backgroundColor: '#EDEDEE',
        padding: '10px 20px', // Further reduced padding
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '500px',
        border: '2px solid #000000',
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '10px', color: '#333' }}>KPI Form</h2>
        <form onSubmit={handleSubmit}>
          {[
            { label: 'KPI Number', name: 'KPI_Number', type: 'text', pattern: '\\d*' },
            { label: 'KPI Name', name: 'KPI_Name', type: 'text' },
            { label: 'Measurement Period', name: 'Measurement_Period', type: 'text' },
            { label: 'Target Value', name: 'Target_Value', type: 'text' },
            { label: 'Actual Value', name: 'Actual_Value', type: 'text' },
            { label: 'Status', name: 'Status', type: 'text' },
            { label: 'Last Updated', name: 'Last_Updated', type: 'date' },
            { label: 'Responsible Department', name: 'Responsible_Department', type: 'text' }
          ].map(({ label, name, type, pattern }) => (
            <div key={name} style={{ marginBottom: '8px' }}> {/* Reduced margin */}
              <label htmlFor={name} style={{ display: 'block', marginBottom: '2px', textAlign: 'left' }}>{label}:</label>
              <input
                type={type}
                id={name}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                required
                pattern={pattern}
                style={{
                  width: '100%',
                  padding: '6px', // Further reduced padding
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          ))}
          <div style={{ marginBottom: '8px' }}>
            <label htmlFor="Comments" style={{ display: 'block', marginBottom: '2px', textAlign: 'left' }}>Comments:</label>
            <textarea
              id="Comments"
              name="Comments"
              value={formData.Comments}
              onChange={handleChange}
              rows="2" // Reduced rows
              style={{
                width: '100%',
                padding: '6px', // Further reduced padding
                border: '1px solid #ccc',
                borderRadius: '5px',
                boxSizing: 'border-box'
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '8px', // Reduced padding
              backgroundColor: '#4CAF50',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              fontSize: '16px',
              cursor: 'pointer'
            }}
          >
            {isEditMode ? 'Update KPI' : 'Add KPI'}
          </button>
        </form>

        {/* New View Table Button */}
        <button
          onClick={handleViewTable}
          style={{
            marginTop: '10px', // Reduced margin
            width: '100%',
            padding: '8px', // Reduced padding
            backgroundColor: '#007bff',
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
