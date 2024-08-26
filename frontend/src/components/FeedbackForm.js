import React, { useState } from 'react';
import FeedbackImage from '../images/Feedback.jpg';

export default function OrderForm() {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    ratingStars: 0,
    ratingNumeric: '',
    comments: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validation for the name field
    if (name === 'name') {
      const nameRegex = /^[A-Za-z\s]+$/;
      if (!nameRegex.test(value)) {
        setErrors({
          ...errors,
          name: 'Name can only contain English letters and spaces.',
        });
      } else {
        setErrors({
          ...errors,
          name: '',
        });
      }
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
      const response = await fetch('http://localhost:5000/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Form submitted successfully');
      } else {
        alert('Form submission failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '90vh',
      backgroundColor: '#f7f7f7',
      padding: '10px' // Reduced padding
    }}>
       <div style={{ marginRight: '20px' }}> 
        <img src={FeedbackImage} alt="Order" style={{ width: '300px', height: '87vh',borderRadius: '10px' }} /> {/* Step 2: Add the image */}
      </div>
      <div style={{
        backgroundColor: '#F1F1F1',
        padding: '15px 20px', // Reduced padding
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
          fontSize: '20px' // Reduced font size
        }}>Feedback Form</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '10px' }}> {/* Reduced margin */}
            <label htmlFor="name" style={{ display: 'block', marginBottom: '2px', textAlign: 'left', color: '#000', fontSize: '12px',fontWeight: '600' }}>Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '8px', // Reduced padding
                border: '1px solid #ccc',
                borderRadius: '8px',
                boxSizing: 'border-box',
                color: '#000',
                fontSize: '14px' // Reduced font size
              }}
            />
            {errors.name && (
              <div style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                {errors.name}
              </div>
            )}
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="date" style={{ display: 'block', marginBottom: '2px', textAlign: 'left', color: '#000', fontSize: '12px',fontWeight: '600' }}>Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '8px', // Reduced padding
                border: '1px solid #ccc',
                borderRadius: '8px',
                boxSizing: 'border-box',
                color: '#000',
                fontSize: '14px' // Reduced font size
              }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="ratingStars" style={{ display: 'block', marginBottom: '2px', textAlign: 'left', color: '#000', fontSize: '12px',fontWeight: '600' }}>Rating (Stars):</label>
            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginBottom: '8px' }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => handleStarClick(star)}
                  style={{
                    fontSize: '24px', // Adjust the font size of the stars
                    cursor: 'pointer',
                    color: formData.ratingStars >= star ? '#FFD700' : '#ccc',
                    marginRight: '2px' // Reduced spacing between stars
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
            <label htmlFor="ratingNumeric" style={{ display: 'block', marginBottom: '2px', textAlign: 'left', color: '#000', fontSize: '12px',fontWeight: '600' }}>Rating (Numeric):</label>
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
                border: '1px solid #ccc',
                borderRadius: '8px',
                boxSizing: 'border-box',
                color: '#000',
                fontSize: '14px' // Reduced font size
              }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="comments" style={{ display: 'block', marginBottom: '2px', textAlign: 'left', color: '#000', fontSize: '12px',fontWeight: '600' }}>Comments:</label>
            <textarea
              id="comments"
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '8px', // Reduced padding
                border: '1px solid #ccc',
                borderRadius: '8px',
                boxSizing: 'border-box',
                color: '#000',
                fontSize: '14px', // Reduced font size
                minHeight: '80px' // Reduced minHeight
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              width: '30%',
              padding: '8px', // Reduced padding
              backgroundColor: '#051ED7',
              color: '#fff',
              border: 'none',
              display: 'block',
              borderRadius: '8px',
              margin: 'auto',
              cursor: 'pointer',
              fontSize: '14px' 
            }}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
