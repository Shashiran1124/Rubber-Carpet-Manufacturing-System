import React, { useState } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Example of simple validation (replace with real authentication logic)
    if (username === 'customer' && password === 'customer123') {
      navigate('/customer-dashboard'); // Redirect to customer dashboard
    } else if (username === 'manager' && password === 'manager123') {
      navigate('/manager-dashboard'); // Redirect to manager dashboard
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className='App' style={{ minHeight: '600px', padding: '20px', }}>
      <h1>LOGIN</h1>
      <form onSubmit={handleLogin} style={{
        backgroundColor: '#F1F1F1',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '320px',
        boxSizing: 'border-box',
        height: '70vh',
        border: '2px solid #000000',
        margin: '0 auto',
      }}>
        
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="username" style={{ display: 'block', marginBottom: '5px' }}>Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #696767',
              borderRadius: '8px',
              boxSizing: 'border-box',
              fontSize: '14px'
            }}
          />
        </div>
        <div style={{ marginBottom: '5px' }}>
          <label htmlFor="password" style={{ display: 'block',  margin: '40px auto 0 auto' }}>Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #696767',
              borderRadius: '8px',
              boxSizing: 'border-box',
              fontSize: '14px'
              
            }}
          />
        </div>
        {error && (
          <div style={{ color: 'red', marginBottom: '10px', textAlign: 'center' }}>{error}</div>
        )}
        <button type="submit"
        onClick={() => navigate('/Dashcusdsh')}
        style={{
          width: '50%',
          padding: '10px',
          backgroundColor: '#051ED7',
          color: '#fff',
          border: 'none',
          borderRadius: '10px',
          cursor: 'pointer',
          fontSize: '16px',
          margin: '50px auto 0 auto'
        }}>Login</button>
      </form>

      {/* You can keep the submit button for other functionality if needed */}
      
    </div>
  );
}

export default App;
