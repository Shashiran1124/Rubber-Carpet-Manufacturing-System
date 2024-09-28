import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import supplierImage from '../../images/tracking.jpg';

export default function OrderTrackingForm() {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    Order_Number: '',
    Customer_Number: '',
    Order_Date: '',
    Product_Number: '',
    Production_Status: '',
    Expected_Delivery_Date: '',
    Actual_Delivery_Date: '',
    Tracking_URL: ''
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    if (location.state && location.state.order) {
      const order = location.state.order;
      setFormData({
        Order_Number: order.Order_Number,
        Customer_Number: order.Customer_Number,
        Order_Date: formatDateForInput(order.Order_Date),
        Product_Number: order.Product_Number,
        Production_Status: order.Production_Status,
        Expected_Delivery_Date: formatDateForInput(order.Expected_Delivery_Date),
        Actual_Delivery_Date: formatDateForInput(order.Actual_Delivery_Date),
        Tracking_URL: order.Tracking_URL
      });
      setOrderId(order._id);
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

    // Validate number fields
    if (['Order_Number', 'Customer_Number', 'Product_Number'].includes(name) && isNaN(value) && value !== '') {
      // Prevent invalid number input by returning early
      return;
    }

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isEditMode
        ? `http://localhost:8070/controller1/update/${orderId}`
        : 'http://localhost:8070/controller1/addorder';
      const method = isEditMode ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert(`Order ${isEditMode ? 'updated' : 'added'} successfully`);
        navigate('/dashordertable');
      } else {
        const errorMessage = await response.text();
        alert(`Failed to ${isEditMode ? 'update' : 'add'} order: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert(`An error occurred while ${isEditMode ? 'updating' : 'adding'} the order.`);
    }
  };

  const handleViewTable = () => {
    navigate('/dashordertable');
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
        <img src={supplierImage} alt="Order" style={{ width: '550px', height: '84vh', borderRadius: '10px' }} />
      </div>
      <div style={{
        backgroundColor: '#EDEDEE',
        padding: '15px 30px',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '450px',
        border: '2px solid #000000',
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '15px', color: '#333' }}>Order Tracking Form</h2>
        <form onSubmit={handleSubmit}>
          {Object.keys(formData).map((key) => (
            <div key={key} style={{ marginBottom: '10px' }}>
              <label htmlFor={key} style={{ display: 'block', marginBottom: '5px', textAlign: 'left' }}>{key.replace(/_/g, ' ')}:</label>
              <input
                type={key.includes('Date') ? 'date' : key.includes('URL') ? 'url' : 'text'}
                id={key}
                name={key}
                value={formData[key]}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  boxSizing: 'border-box'
                }}
              />
              {key === 'Tracking_URL' && formData.Tracking_URL && (
                <a href={formData.Tracking_URL} target="_blank" rel="noopener noreferrer" style={{ display: 'block', marginTop: '5px', color: '#007BFF' }}>
                  View Tracking Link
                </a>
              )}
            </div>
          ))}
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '8px',
              backgroundColor: '#007BFF',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            {isEditMode ? 'Update Order' : 'Add Order'}
          </button>
        </form>

        <button
          onClick={handleViewTable}
          style={{
            marginTop: '10px',
            width: '100%',
            padding: '8px',
            backgroundColor: '#28a745',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          View Table
        </button>
      </div>
    </div>
  );
}
