import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import CalImage from '../../images/Cal.jpg';

export default function SalesOrderForm() {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    month: '',
    product: '',
    totalQuantity: 0,
    unitPrice: 0,
    totalSales: 0,
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const productPrices = {
    'Industrial Rubber Mats': 1800.00,
    'Gym Rubber Flooring': 2000.00,
    'Rubber Runner Mats': 1200.00,
    'Rubber Playground Mats': 1750.00,
    'Commercial Rubber Flooring': 1300.00,
    'Rubber Carpet Tiles': 1500.00,
  };
  
  useEffect(() => {
    if (location.state && location.state.order) {
      const order = location.state.order;
      setFormData({
        month: order.month,
        product: order.product,
        totalQuantity: order.totalQuantity,
        unitPrice: order.unitPrice,
        totalSales: order.totalSales,
      });
      setOrderId(order._id);
      setIsEditMode(true);
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'product') {
      const selectedPrice = productPrices[value];
      setFormData({
        ...formData,
        product: value,
        unitPrice: selectedPrice,
        totalSales: selectedPrice * formData.totalQuantity,
      });
    } else if (name === 'totalQuantity') {
      setFormData({
        ...formData,
        totalQuantity: value,
        totalSales: formData.unitPrice * value,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const url = isEditMode
      ? `http://localhost:8070/cuscalculation/update/${orderId}`
      : 'http://localhost:8070/cuscalculation/add';
    const method = isEditMode ? 'PUT' : 'POST';

    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const responseData = await response.json();
    console.log(responseData); // Log the response data

    if (response.ok) {
      alert(`Sales order ${isEditMode ? 'updated' : 'added'} successfully`);
      navigate('/Dashcal');
    } else {
      alert(`Failed to ${isEditMode ? 'update' : 'add'} order`);
    }
  } catch (error) {
    console.error('Error:', error);
    alert(`An error occurred while ${isEditMode ? 'updating' : 'adding'} the order.`);
  }
};


  const handleViewTable = () => {
    navigate('/Dashcal'); // Navigate to the Dashcal table
  };

  // Restrict to year 2024 and months
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0'); // Month is zero-indexed
  const minMonth = `${currentYear}-${currentMonth}`;

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f7f7f7',
      padding: '10px',
    }}>
      <div style={{ marginRight: '20px' }}>
        <img src={CalImage} alt="Order" style={{ width: '300px', height: '90vh', borderRadius: '10px' }} />
      </div>

      <div style={{
        backgroundColor: '#F1F1F1',
        padding: '30px 40px',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '350px',
        boxSizing: 'border-box',
        border: '2px solid #000000',
      }}>
        <h2 style={{
          textAlign: 'center',
          marginBottom: '15px',
          color: '#000',
          fontSize: '20px',
        }}>
          Calculate Monthly Sales Orders
        </h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="month" style={{
              display: 'block',
              marginBottom: '2px',
              textAlign: 'left',
              color: '#000',
              fontSize: '12px',
              fontWeight: '600',
            }}>
              Month:
            </label>
            <input
              type="month"
              id="month"
              name="month"
              value={formData.month}
              onChange={handleChange}
              min={minMonth}

              required
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #696767',
                borderRadius: '8px',
                color: '#000',
                fontSize: '14px',
              }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="product" style={{
              display: 'block',
              marginBottom: '2px',
              textAlign: 'left',
              color: '#000',
              fontSize: '12px',
              fontWeight: '600',
            }}>
              Product Type:
            </label>
            <select
              id="product"
              name="product"
              value={formData.product}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #696767',
                borderRadius: '8px',
                color: '#000',
                fontSize: '14px',
              }}
            >
              <option value="">Select Product</option>
              {Object.keys(productPrices).map((product) => (
                <option key={product} value={product}>
                  {product}
                </option>
              ))}
            </select>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="totalQuantity" style={{
              display: 'block',
              marginBottom: '2px',
              textAlign: 'left',
              color: '#000',
              fontSize: '12px',
              fontWeight: '600',
            }}>
              Total Quantity:
            </label>
            <input
              type="number"
              id="totalQuantity"
              name="totalQuantity"
              value={formData.totalQuantity}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #696767',
                borderRadius: '8px',
                color: '#000',
                fontSize: '14px',
              }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="unitPrice" style={{
              display: 'block',
              marginBottom: '2px',
              textAlign: 'left',
              color: '#000',
              fontSize: '12px',
              fontWeight: '600',
            }}>
              Unit Price(Rs):
            </label>
            <input
              type="number"
              id="unitPrice"
              name="unitPrice"
              value={formData.unitPrice}
              readOnly
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #696767',
                borderRadius: '8px',
                color: '#000',
                fontSize: '14px',
              }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="totalSales" style={{
              display: 'block',
              marginBottom: '2px',
              textAlign: 'left',
              color: '#000',
              fontSize: '12px',
              fontWeight: '600',
            }}>
              Total Sales(Rs):
            </label>
            <input
              type="number"
              id="totalSales"
              name="totalSales"
              value={formData.totalSales}
              readOnly
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #696767',
                borderRadius: '8px',
                color: '#000',
                fontSize: '14px',
              }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
            <button
              type="submit"
              style={{
                backgroundColor: '#4CAF50',
                color: '#fff',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '14px',
              }}
            >
              {isEditMode ? 'Update' : 'Add'}
            </button>
            <button
              type="button"
              onClick={handleViewTable}
              style={{
                backgroundColor: '#007bff',
                color: '#fff',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '14px',
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
