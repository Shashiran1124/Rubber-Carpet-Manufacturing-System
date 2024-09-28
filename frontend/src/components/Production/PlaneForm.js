import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import supplierImage from '../../images/22.png';

export default function OrderForm() {

  const navigate = useNavigate();
  const location = useLocation();

  const shiftOptions = [
    'Day',
    'Night',
    'Swing'
  ];

  const teamOptions = [
    'Team A',
    'Team B',
    'Team C'
  ];

  const [formData, setFormData] = useState({
    pnum: '',
    psdate: '',
    pstime: '',
    petime: '',
    pshift: '',
    pteam: ''
  });

  const [errors, setErrors] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [supplierId, setSupplierId] = useState(null);

  useEffect(() => {
    if (location.state && location.state.Plan) {
      const Plan = location.state.Plan;
      const formattedDate = new Date(Plan.psdate).toISOString().split('T')[0]; // Convert to YYYY-MM-DD

    setFormData({
      pnum: Plan.pnum,
      psdate: formattedDate,  // Use formatted date
      pstime: Plan.pstime,
      petime: Plan.petime,
      pshift: Plan.pshift,
      pteam: Plan.pteam,
    });
      setSupplierId(Plan._id);
      setIsEditMode(true);
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

    // Clear the error for this field
    setErrors({
      ...errors,
      [name]: ''
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.pnum) {
      newErrors.pnum = 'Order Number is required';
    }
    if (!formData.psdate) {
      newErrors.psdate = 'Start Date is required';
    }
    if (!formData.pstime) {
      newErrors.pstime = 'Start Time is required';
    }
    if (!formData.petime) {
      newErrors.petime = 'End Time is required';
    }
    if (!formData.pshift) {
      newErrors.pshift = 'Shift is required';
    }
    if (!formData.pteam) {
      newErrors.pteam = 'Team is required';
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
        ? `http://localhost:8070/test2/update/${supplierId}`
        : 'http://localhost:8070/test2/addplan';
      const method = isEditMode ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert(`Plan ${isEditMode ? 'updated' : 'added'} successfully`);
        navigate('/dashplantable');
      } else {
        alert(`Failed to ${isEditMode ? 'update' : 'add'} order`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert(`An error occurred while ${isEditMode ? 'updating' : 'adding'} the order.`);
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
        <img src={supplierImage} alt="Order" style={{ width: '450px', height: '80vh', borderRadius: '10px' }} />
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
        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Plan Details Form</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="pnum" style={{ display: 'block', marginBottom: '5px', textAlign: 'left' }}>Plane Name:</label>
            <input
              type="text"
              id="pnum"
              name="pnum"
              value={formData.pnum}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '10px',
                border: errors.pnum ? '1px solid red' : '1px solid #ccc',
                borderRadius: '5px',
                boxSizing: 'border-box'
              }}
            />
            {errors.pnum && <div style={{ color: 'red', fontSize: '12px' }}>{errors.pnum}</div>}
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="psdate" style={{ display: 'block', marginBottom: '5px', textAlign: 'left' }}> Date:</label>
            <input
              type="date"
              id="psdate"
              name="psdate"
              value={formData.psdate}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '10px',
                border: errors.psdate ? '1px solid red' : '1px solid #ccc',
                borderRadius: '5px',
                boxSizing: 'border-box'
              }}
            />
            {errors.psdate && <div style={{ color: 'red', fontSize: '12px' }}>{errors.psdate}</div>}
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="pstime" style={{ display: 'block', marginBottom: '5px', textAlign: 'left' }}>Start Time:</label>
            <input
              type="time"
              id="pstime"
              name="pstime"
              value={formData.pstime}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '10px',
                border: errors.pstime ? '1px solid red' : '1px solid #ccc',
                borderRadius: '5px',
                boxSizing: 'border-box'
              }}
            />
            {errors.pstime && <div style={{ color: 'red', fontSize: '12px' }}>{errors.pstime}</div>}
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="petime" style={{ display: 'block', marginBottom: '5px', textAlign: 'left' }}>End Time:</label>
            <input
              type="time"
              id="petime"
              name="petime"
              value={formData.petime}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '10px',
                border: errors.petime ? '1px solid red' : '1px solid #ccc',
                borderRadius: '5px',
                boxSizing: 'border-box'
              }}
            />
            {errors.petime && <div style={{ color: 'red', fontSize: '12px' }}>{errors.petime}</div>}
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="pshift" style={{ display: 'block', marginBottom: '5px', textAlign: 'left' }}>Shift:</label>
            <select
              id="pshift"
              name="pshift"
              value={formData.pshift}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '10px',
                border: errors.pshift ? '1px solid red' : '1px solid #ccc',
                borderRadius: '5px',
                boxSizing: 'border-box',
                backgroundColor: '#fff'
              }}
            >
              <option value="" disabled>Select Shift</option>
              {shiftOptions.map((shift, index) => (
                <option key={index} value={shift}>{shift}</option>
              ))}
            </select>
            {errors.pshift && <div style={{ color: 'red', fontSize: '12px' }}>{errors.pshift}</div>}
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="pteam" style={{ display: 'block', marginBottom: '5px', textAlign: 'left' }}>Team:</label>
            <select
              id="pteam"
              name="pteam"
              value={formData.pteam}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '10px',
                border: errors.pteam ? '1px solid red' : '1px solid #ccc',
                borderRadius: '5px',
                boxSizing: 'border-box',
                backgroundColor: '#fff'
              }}
            >
              <option value="" disabled>Select Team</option>
              {teamOptions.map((team, index) => (
                <option key={index} value={team}>{team}</option>
              ))}
            </select>
            {errors.pteam && <div style={{ color: 'red', fontSize: '12px' }}>{errors.pteam}</div>}
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
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
              }}
            >
              {isEditMode ? 'Update Order' : 'Submit Order'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/dashplantable')}
              style={{
                padding: '10px 20px',
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
