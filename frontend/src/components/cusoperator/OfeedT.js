import React, { useEffect, useState } from 'react';

export default function OperatorFeeedTable() {
  const [feedback, setFeedback] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchFeedback = async () => {
    try {
      const response = await fetch('http://localhost:8070/cusfeedback/');
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched data:', data);
        setFeedback(data);
      } else {
        console.error('Failed to fetch feedback');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this feedback?');
    if (!confirmed) return;
    try {
      const response = await fetch(`http://localhost:8070/cusfeedback/delete/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setFeedback(feedback.filter(item => item._id !== id));
        console.log('Feedback deleted');
      } else {
        console.error('Failed to delete feedback');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Filter feedback based on the search term for Name
  const filteredFeedback = feedback.filter((item) => {
    return item.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div style={{ padding: '20px,30px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f7f7f7', minHeight: '170vh', display: 'flex', flexDirection: 'column' }}>
      <h1 style={{ marginBottom: '40px', marginLeft: '440px', color: '#000000', fontSize: '22px' }}>List of Feedbacks</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by Name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          margin: '0 auto 20px',
          padding: '10px',
          width: '300px',
          borderRadius: '5px',
          border: '1px solid #ccc',
        }}
      />

      <table style={{ width: '80%', borderCollapse: 'collapse', border: '1.5px solid #000000', fontSize: '14px', margin: '0 auto' }}>
        <thead>
          <tr style={{ backgroundColor: '#f4f4f4', color: '#333' }}>
            <th style={{ border: '1.5px solid #000000', padding: '8px', backgroundColor: '#C7C7C7' }}>Name</th>
            <th style={{ border: '1.5px solid #000000', padding: '8px', backgroundColor: '#C7C7C7' }}>Date</th>
            <th style={{ border: '1.5px solid #000000', padding: '8px', backgroundColor: '#C7C7C7' }}>Rating (Stars)</th>
            <th style={{ border: '1.5px solid #000000', padding: '8px', backgroundColor: '#C7C7C7' }}>Rating (Numeric)</th>
            <th style={{ border: '1.5px solid #000000', padding: '8px', backgroundColor: '#C7C7C7' }}>Comments</th>
            <th style={{ border: '1.5px solid #000000', padding: '8px', width: '170px', backgroundColor: '#C7C7C7' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredFeedback.map((item) => (
            <tr key={item._id}>
              <td style={{ border: '1.5px solid #000000', padding: '8px' }}>{item.name}</td>
              <td style={{ border: '1.5px solid #000000', padding: '8px' }}>
  {new Date(item.date).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'UTC' })}
</td>

              <td style={{ border: '1.5px solid #000000', padding: '8px' }}>{item.ratingStars}</td>
              <td style={{ border: '1.5px solid #000000', padding: '8px' }}>{item.ratingNumeric}</td>
              <td style={{ border: '1.5px solid #000000', padding: '8px' }}>{item.comments}</td>
              <td style={{ border: '1.5px solid #000000', padding: '8px', textAlign: 'center' }}>
                <button
                  onClick={() => handleDelete(item._id)}
                  style={{
                    padding: '6px 10px',
                    backgroundColor: '#dc3545',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    fontSize: '12px',
                    marginLeft: '10px',
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
