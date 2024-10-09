import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useLocation
import FDcollectionImage from '../../images/FDcollection.jpg';

export default function FeedbackForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    ratingStars: 0,
    ratingNumeric: '',
    comments: '',
  });

  const [errors, setErrors] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [feedbackId, setFeedbackId] = useState(null);

  useEffect(() => {
    if (location.state && location.state.item) {
      const item = location.state.item;
      const formattedDate = item.date ? new Date(item.date).toISOString().split('T')[0]:'';
      setFormData({
        name: item.name || '',
        date: formattedDate || '',
        ratingStars: item.ratingStars || 0,
        ratingNumeric: item.ratingNumeric || '',
        comments: item.comments || '',
      });
      setFeedbackId(item._id);
      setIsEditMode(true);
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Validation for the name field (allow only English letters and spaces)
    if (name === 'name') {
      const nameRegex = /^[A-Za-z\s]*$/; // Only allow letters and spaces
      if (!nameRegex.test(value)) {
        // Ignore invalid input by returning early without updating the state
        return;
      }
    }
  
    // Restricting ratingNumeric to only allow numbers between 1 and 10
    if (name === 'ratingNumeric') {
      // Remove any non-numeric characters and ensure value is between 1 and 10
      let numericValue = value.replace(/[^0-9]/g, ''); // Allow only digits
  
      // If the number is greater than 10, set it to 10; if it's less than 1, set it to 1
      if (numericValue > 5) {
        numericValue = '5';
      } else if (numericValue < 1 && numericValue !== '') {
        numericValue = '1';
      }
  
      setFormData({
        ...formData,
        ratingNumeric: numericValue, // Set the validated numeric value
      });
  
      return; // Exit the function early for numeric validation
    }
  
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  

  const handleStarClick = (starValue) => {
    setFormData({
      ...formData,
      ratingStars: starValue,
    });

    if (starValue === 0) {
      setErrors({
        ...errors,
        ratingStars: 'Please select a star rating.',
      });
    } else {
      setErrors({
        ...errors,
        ratingStars: '',
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for errors before submitting
    if (errors.name || formData.ratingStars === 0) {
      alert('Please fix the errors before submitting.');
      return;
    }

    try {
      const url = isEditMode
        ? `http://localhost:8070/cusfeedback/update/${feedbackId}`
        : 'http://localhost:8070/cusfeedback/add';
      const method = isEditMode ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert(isEditMode ? 'Feedback updated successfully' : 'Feedback submitted successfully');
        navigate(''); // Adjust the path as needed
        // Reset form after successful submission
      } else {
        alert(`Failed to ${isEditMode ? 'update' : 'add'} feedback`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert(`An error occurred while ${isEditMode ? 'updating' : 'adding'} the feedback.`);
    }
  };

        
      

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f7f7f7',
      padding: '10px', // Reduced padding
    }}>
      <div style={{ marginRight: '20px' }}>
        <img src={FDcollectionImage} alt="Feedback" style={{ width: '300px', height: '90vh', borderRadius: '10px' }} />
      </div>
      <div style={{
        backgroundColor: '#F1F1F1',
        padding: '30px 40px', // Reduced padding
        borderRadius: '10px', // Reduced border radius
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '350px', // Reduced maxWidth
        boxSizing: 'border-box',
        border: '2px solid #000000',
      }}>
        <h2 style={{
          textAlign: 'center',
          marginBottom: '15px', // Reduced margin
          color: '#000',
          fontSize: '20px', // Reduced font size
        }}>
          {isEditMode ? 'Edit Feedback' : 'Feedback Form'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="name" style={{ display: 'block', marginBottom: '2px', textAlign: 'left', color: '#000', fontSize: '12px', fontWeight: '600' }}>Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '6px', // Reduced padding
                border: '1px solid #696767',
                borderRadius: '8px',
                boxSizing: 'border-box',
                color: '#000',
                fontSize: '14px', // Reduced font size
              }}
            />
            {errors.name && (
              <div style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                {errors.name}
              </div>
            )}
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="date" style={{ display: 'block', marginBottom: '2px', textAlign: 'left', color: '#000', fontSize: '12px', fontWeight: '600' }}>Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              min={new Date().toISOString().split('T')[0]}
              max={new Date().toISOString().split('T')[0]}
              style={{
                width: '100%',
                padding: '8px', // Reduced padding
                border: '1px solid #696767',
                borderRadius: '8px',
                boxSizing: 'border-box',
                color: '#000',
                fontSize: '14px', // Reduced font size
              }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="ratingStars" style={{ display: 'block', marginBottom: '2px', textAlign: 'left', color: '#000', fontSize: '12px', fontWeight: '600' }}>Rating (Stars):</label>
            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginBottom: '8px' }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => handleStarClick(star)}
                  style={{
                    fontSize: '24px', // Adjust the font size of the stars
                    cursor: 'pointer',
                    color: formData.ratingStars >= star ? '#FFD700' : '#4B4A4A',
                    marginRight: '3px', // Reduced spacing between stars
                  }}
                >
                  ★
                </span>
              ))}
            </div>
            {errors.ratingStars && (
              <div style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                {errors.ratingStars}
              </div>
            )}
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="ratingNumeric" style={{ display: 'block', marginBottom: '2px', textAlign: 'left', color: '#000', fontSize: '12px', fontWeight: '600' }}>Rating (Numeric):</label>
            <input
              type="number"
              id="ratingNumeric"
              name="ratingNumeric"
              value={formData.ratingNumeric}
              onChange={handleChange}
              min="1"
              max="10"
              required
              style={{
                width: '100%',
                padding: '8px', // Reduced padding
                border: '1px solid #696767',
                borderRadius: '8px',
                boxSizing: 'border-box',
                color: '#000',
                fontSize: '14px', // Reduced font size
              }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="comments" style={{ display: 'block', marginBottom: '2px', textAlign: 'left', color: '#000', fontSize: '12px', fontWeight: '600' }}>Comments:</label>
            <textarea
              id="comments"
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              rows="4"
              required
              style={{
                width: '100%',
                padding: '8px', // Reduced padding
                border: '1px solid #696767',
                borderRadius: '8px',
                boxSizing: 'border-box',
                color: '#000',
                fontSize: '14px', // Reduced font size
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              width: '60%',
              padding: '10px', // Reduced padding
              backgroundColor: '#051ED7',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px', // Reduced font size
              cursor: 'pointer',
              marginLeft: '55px',
            }}
          >
            {isEditMode ? 'Update Feedback' : 'Submit Feedback'}
          </button>
        </form>
      </div>
    </div>
  );
}
