import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import progressImage from '../../images/44.png';

export default function ProForm() {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    lname: '',  // Change this to a dropdown later
    lmaterial: '',
    lcutting: '',
    lmolding: '',
    lVulcanization: '',
    lgoodunit: '',
    lDefectiveunit: ''
  });

  const [errors, setErrors] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [progressId, setProgressId] = useState(null);

  useEffect(() => {
    if (location.state && location.state.progress) {
      const progress = location.state.progress;
      console.log("Loaded progress data:", progress); // Debugging line
      setFormData({
        lname: progress.lname || '',
        lmaterial: progress.lmaterial || '',
        lcutting: progress.lcutting || '',
        lmolding: progress.lmolding || '',
        lVulcanization: progress.lVulcanization || '',
        lgoodunit: progress.lgoodunit || '',
        lDefectiveunit: progress.lDefectiveunit || '',
      });
      setProgressId(progress._id);
      setIsEditMode(true);
    } else {
      console.log("No progress data found in location state.");
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate input for good units and defective units
    let validValue = value;
    if (name === 'lgoodunit' || name === 'lDefectiveunit') {
      validValue = value.replace(/[^0-9]/g, ''); // Only allow positive integers
    }

    setFormData({
      ...formData,
      [name]: validValue
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.lgoodunit || parseInt(formData.lgoodunit, 10) < 0) {
      newErrors.lgoodunit = 'Good Units must be a non-negative integer';
    }

    if (!formData.lDefectiveunit || parseInt(formData.lDefectiveunit, 10) < 0) {
      newErrors.lDefectiveunit = 'Defective Units must be a non-negative integer';
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
        ? `http://localhost:8070/test4/update/${progressId}`
        : 'http://localhost:8070/test4/addProgress';
      const method = isEditMode ? 'PUT' : 'POST';

      console.log("Submitting form data:", formData); // Debugging line

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert(`Progress ${isEditMode ? 'updated' : 'added'} successfully`);
        navigate('/dashprotable'); // Adjust route to your progress list page
      } else {
        alert(`Failed to ${isEditMode ? 'update' : 'add'} progress`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert(`An error occurred while ${isEditMode ? 'updating' : 'adding'} the progress.`);
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
        <img src={progressImage} alt="Progress" style={{ width: '450px', height: '87vh', borderRadius: '10px' }} />
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
        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Production Progress Form</h2>
        <form onSubmit={handleSubmit}>
          
          {/* Line Name Dropdown */}
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="lname" style={{ display: 'block', marginBottom: '5px', textAlign: 'left' }}>Line Name:</label>
            <select
              id="lname"
              name="lname"
              value={formData.lname}
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
              <option value="">Select Line Name</option>
              <option value="Line 1">Line 1</option>
              <option value="Line 2">Line 2</option>
              <option value="Line 3">Line 3</option>
              <option value="Line 4">Line 4</option>
              <option value="Line 5">Line 5</option>
              <option value="Line 6">Line 6</option>
            </select>
          </div>

          {/* Other form fields */}
          {['lmaterial', 'lcutting', 'lmolding', 'lVulcanization'].map((field) => (
            <div key={field} style={{ marginBottom: '15px' }}>
              <label htmlFor={field} style={{ display: 'block', marginBottom: '5px', textAlign: 'left' }}>{field.replace('l', '')}:</label>
              <select
                id={field}
                name={field}
                value={formData[field]}
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
                <option value="">Select Percentage</option>
                <option value="0%">0%</option>
                <option value="25%">25%</option>
                <option value="50%">50%</option>
                <option value="75%">75%</option>
                <option value="100%">100%</option>
              </select>
            </div>
          ))}

          {/* Good Units */}
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="lgoodunit" style={{ display: 'block', marginBottom: '5px', textAlign: 'left' }}>Good Units:</label>
            <input
              type="number"
              id="lgoodunit"
              name="lgoodunit"
              value={formData.lgoodunit}
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
            {errors.lgoodunit && <div style={{ color: 'red', fontSize: '12px' }}>{errors.lgoodunit}</div>}
          </div>

          {/* Defective Units */}
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="lDefectiveunit" style={{ display: 'block', marginBottom: '5px', textAlign: 'left' }}>Defective Units:</label>
            <input
              type="number"
              id="lDefectiveunit"
              name="lDefectiveunit"
              value={formData.lDefectiveunit}
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
            {errors.lDefectiveunit && <div style={{ color: 'red', fontSize: '12px' }}>{errors.lDefectiveunit}</div>}
          </div>

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
              Submit
            </button>
            <button
              type="button"
              onClick={() => navigate('/dashprotable')}
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
              View Progress List
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
