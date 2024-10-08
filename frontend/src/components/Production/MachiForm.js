import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import supplierImage from '../../images/33.png';

export default function MachiForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    mnum: '', // This will now be the selected machine
    mdate: '',
    mstime: '',
    metime: '',
    mteam: ''
  });

  const [errors, setErrors] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [allocationId, setAllocationId] = useState(null);

  // List of machine options for the dropdown
  const machineOptions = ['M001', 'M002', 'M003', 'M004', 'M005'];

  useEffect(() => {
    if (location.state && location.state.allocations) {
      const allocations = location.state.allocations;

      // Convert the date to YYYY-MM-DD format
      const formattedDate = allocations.mdate ? new Date(allocations.mdate).toISOString().split('T')[0] : '';

      setFormData({
        mnum: allocations.mnum,
        mdate: formattedDate,
        mstime: allocations.mstime,
        metime: allocations.metime,
        mteam: allocations.mteam,
      });
      setAllocationId(allocations._id);
      setIsEditMode(true);
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const getMinEndTime = () => {
    return formData.mstime ? formData.mstime : null;
  };

  const validateForm = () => {
    const newErrors = {};
    const currentDate = new Date().toISOString().split('T')[0]; // Today's date in YYYY-MM-DD

    // Validate date
    if (!formData.mdate) {
      newErrors.mdate = 'Date is required';
    } else if (formData.mdate < currentDate) {
      newErrors.mdate = 'Date cannot be in the past';
    }

    // Validate time
    if (!formData.mstime) {
      newErrors.mstime = 'Start Time is required';
    }
    if (!formData.metime) {
      newErrors.metime = 'End Time is required';
    } else if (formData.mstime && formData.metime) {
      const startTime = new Date(`1970-01-01T${formData.mstime}`);
      const endTime = new Date(`1970-01-01T${formData.metime}`);
      if (endTime <= startTime) {
        newErrors.metime = 'End Time must be after Start Time';
      }
    }

    if (!formData.mteam) {
      newErrors.mteam = 'Team Name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const url = isEditMode
        ? `http://localhost:8070/test3/update/${allocationId}`
        : 'http://localhost:8070/test3/addmachi';
      const method = isEditMode ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert(`Allocation ${isEditMode ? 'updated' : 'added'} successfully`);
        navigate('/dashmachitable');
      } else {
        alert(`Failed to ${isEditMode ? 'update' : 'add'} allocation`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert(`An error occurred while ${isEditMode ? 'updating' : 'adding'} the allocation.`);
    }
  };

  const currentDate = new Date().toISOString().split('T')[0]; // Today's date in YYYY-MM-DD

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
        <img src={supplierImage} alt="Allocation" style={{ width: '450px', height: '74vh', borderRadius: '10px' }} />
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
        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Machine Allocation Form</h2>
        <form onSubmit={handleSubmit}>
          {/* Machine Name Dropdown */}
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="mnum" style={{ display: 'block', marginBottom: '5px', textAlign: 'left' }}>Machine Name:</label>
            <select
              id="mnum"
              name="mnum"
              value={formData.mnum}
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
              <option value="">Select Machine</option>
              {machineOptions.map((machine) => (
                <option key={machine} value={machine}>
                  {machine}
                </option>
              ))}
            </select>
          </div>

          {/* Date Input */}
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="mdate" style={{ display: 'block', marginBottom: '5px', textAlign: 'left' }}>Date:</label>
            <input
              type="date"
              id="mdate"
              name="mdate"
              value={formData.mdate}
              onChange={handleChange}
              required
              min={currentDate} // Prevent past dates
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                boxSizing: 'border-box'
              }}
            />
            {errors.mdate && <div style={{ color: 'red', fontSize: '12px' }}>{errors.mdate}</div>}
          </div>

          {/* Start Time Input */}
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="mstime" style={{ display: 'block', marginBottom: '5px', textAlign: 'left' }}>Start Time:</label>
            <input
              type="time"
              id="mstime"
              name="mstime"
              value={formData.mstime}
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
            {errors.mstime && <div style={{ color: 'red', fontSize: '12px' }}>{errors.mstime}</div>}
          </div>

          {/* End Time Input */}
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="metime" style={{ display: 'block', marginBottom: '5px', textAlign: 'left' }}>End Time:</label>
            <input
              type="time"
              id="metime"
              name="metime"
              value={formData.metime}
              onChange={handleChange}
              required
              min={getMinEndTime()} // Dynamically set the min attribute for endTime
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                boxSizing: 'border-box'
              }}
            />
            {errors.metime && <div style={{ color: 'red', fontSize: '12px' }}>{errors.metime}</div>}
          </div>

          {/* Team Name Input */}
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="mteam" style={{ display: 'block', marginBottom: '5px', textAlign: 'left' }}>Team Name:</label>
            <select
              id="mteam"
              name="mteam"
              value={formData.mteam}
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
              <option value="">Select Team</option>
              <option value="Team A">Team A</option>
              <option value="Team B">Team B</option>
              <option value="Team C">Team C</option>
            </select>
          </div>

          {/* Button container */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
            <button
              type="submit"
              style={{
                padding: '10px 20px',
                backgroundColor: '#007bff',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                marginRight: '10px'
              }}
            >
              {isEditMode ? 'Update' : 'Submit'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/dashmachitable')}
              style={{
                padding: '10px 20px',
                backgroundColor: '#28a745',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                marginRight: '10px'
              }}
            >
              Allocation Machine
            </button>
            
          </div>
        </form>
      </div>
    </div>
  );
}
