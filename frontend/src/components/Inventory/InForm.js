import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import pic3 from '../../images/pic3.jpg';

export default function ProductForm() {
  const navigate = useNavigate();
  const location = useLocation();

  // Function to get the current date in yyyy-mm-dd format
  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const [formData, setFormData] = useState({
    productId: '',
    productName: '',
    productionDate: getCurrentDate(),
    quantity: '',
    unitPrice: '',
    totalPrice: '',
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (location.state && location.state.order) {
      const order = location.state.order;
      const formattedDate = order.productionDate
        ? new Date(order.productionDate).toISOString().split('T')[0]
        : getCurrentDate(); // Use current date if no date is provided
      setFormData({
        productId: order.productId,
        productName: order.productName,
        productionDate: formattedDate,
        quantity: order.quantity,
        unitPrice: order.unitPrice,
        totalPrice: order.totalPrice,
      });
      setOrderId(order._id);
      setIsEditMode(true);
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let errorMessage = '';

    if (name === 'productId') {
      const idRegex = /^[0-9]*$/; // Allow only digits
      if (!idRegex.test(value)) {
        return; // Prevent input if not a number
      }
    } else if (name === 'productName') {
      const nameRegex = /^[A-Za-z\s]+$/;
      if (!nameRegex.test(value)) {
        errorMessage = '';
      }
    } else if (name === 'quantity') {
      const quantityRegex = /^[1-9]\d*$/; // Allow only positive integers (no decimal numbers)
      if (!quantityRegex.test(value)) {
        errorMessage = '';
      }
    } else if (name === 'unitPrice') {
      const priceRegex = /^\d*(\.\d{0,2})?$/; // Allow valid numbers, only two decimal places
      if (!priceRegex.test(value)) {
        errorMessage = '';
        return; // Prevent the input from being updated if invalid
      }
    }

    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: errorMessage,
    });
  };

  useEffect(() => {
    const quantity = parseFloat(formData.quantity);
    const unitPrice = parseFloat(formData.unitPrice);
    if (!isNaN(quantity) && !isNaN(unitPrice)) {
      setFormData((prevData) => ({
        ...prevData,
        totalPrice: (quantity * unitPrice).toFixed(2),
      }));
    }
  }, [formData.quantity, formData.unitPrice]);

  const handleKeyDown = (e) => {
    // Prevent typing of decimal point and minus sign in "Quantity" field
    if (e.key === '.' || e.key === '-') {
      e.preventDefault();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(errors).some((err) => err)) {
      alert('Please fix the errors in the form.');
      return;
    }

    const url = isEditMode
      ? `http://localhost:8070/inventoryroute/update/${orderId}`
      : 'http://localhost:8070/inventoryroute/add';
    const method = isEditMode ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert`(Order ${isEditMode ? 'updated' : 'added'} successfully)`;
        navigate('/dashtable');
      } else {
        alert`(Failed to ${isEditMode ? 'update' : 'add'} the order.)`;
      }
    } catch (error) {
      console.error('Error:', error);
      alert`(An error occurred while ${isEditMode ? 'updating' : 'adding'} the order.)`;
    }
  };

  const handleViewTable = () => {
    navigate('/DashTable');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f7f7f7', padding: '10px' }}>
      <div style={{ maxWidth: '420px', width: '100%', marginRight: '20px' }}>
        <img
          src={pic3} 
          alt="Product"
          style={{
            width: '100%',
            height: '77vh',
            borderRadius: '6px',
            marginBottom: '2px',
          }}
        />
      </div>
      <div style={{
        backgroundColor: '#F1F1F1',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(29, 15, 15, 0.1)',
        border: '2px solid #000',
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '10px', color: '#000', fontSize: '22px' }}>
          {isEditMode ? 'Edit' : 'Add'} Receive Final Goods
        </h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '8px' }}>
            <label htmlFor="productId" style={{ display: 'block', marginBottom: '2px', color: '#000', fontSize: '12px', fontWeight: '600' }}>
              Product ID:
            </label>
            <input
              type="text"
              id="productId"
              name="productId"
              value={formData.productId}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '8px',
                boxSizing: 'border-box',
                color: '#000',
                fontSize: '14px',
              }}
            />
            {errors.productId && <div style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>{errors.productId}</div>}
          </div>
          <div style={{ marginBottom: '8px' }}>
            <label htmlFor="productName" style={{ display: 'block', marginBottom: '2px', color: '#000', fontSize: '12px', fontWeight: '600' }}>
              Product Name:
            </label>
            <select
              id="productName"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '8px',
                boxSizing: 'border-box',
                color: '#000',
                fontSize: '14px',
              }}
            >
              <option value="">Select Product</option>
              <option value="Inventory Rubber Mats">Inventory Rubber Mats</option>
              <option value="Gym Rubber Flooring">Gym Rubber Flooring</option>
              <option value="Rubber Runner Mats">Rubber Runner Mats</option>
              <option value="Rubber Playground Mats">Rubber Playground Mats</option>
              <option value="Commercial Rubber Flooring">Commercial Rubber Flooring</option>
              <option value="Rubber Carpet Tiles">Rubber Carpet Tiles</option>
            </select>
          </div>
          <div style={{ marginBottom: '8px' }}>
            <label htmlFor="productionDate" style={{ display: 'block', marginBottom: '2px', color: '#000', fontSize: '12px', fontWeight: '600' }}>
              Receive Date:
            </label>
            <input
              type="date"
              id="productionDate"
              name="productionDate"
              value={formData.productionDate}
              onChange={handleChange}
              min={getCurrentDate()}  // Setting min to the current date
              max={getCurrentDate()}  // Setting max to the current date
              required
              readOnly // Make the field read-only
              style={{
                width: '100%',
                padding: '4px',
                borderRadius: '8px',
                boxSizing: 'border-box',
                color: '#000',
                fontSize: '14px',
              }}
            />
          </div>
          <div style={{ marginBottom: '8px' }}>
            <label htmlFor="quantity" style={{ display: 'block', marginBottom: '2px', color: '#000', fontSize: '12px', fontWeight: '600' }}>
              Quantity:
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              onKeyDown={handleKeyDown} // Prevent decimal and minus sign
              required
              style={{
                width: '100%',
                padding: '6px',
                borderRadius: '8px',
                boxSizing: 'border-box',
                color: '#000',
                fontSize: '14px',
              }}
            />
            {errors.quantity && <div style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>{errors.quantity}</div>}
          </div>
          <div style={{ marginBottom: '8px' }}>
            <label htmlFor="unitPrice" style={{ display: 'block', marginBottom: '2px', color: '#000', fontSize: '12px', fontWeight: '600' }}>
              Unit Price:
            </label>
            <input
              type="text"
              id="unitPrice"
              name="unitPrice"
              value={formData.unitPrice}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '6px',
                borderRadius: '8px',
                boxSizing: 'border-box',
                color: '#000',
                fontSize: '14px',
              }}
            />
            {errors.unitPrice && <div style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>{errors.unitPrice}</div>}
          </div>
          <div style={{ marginBottom: '8px' }}>
            <label htmlFor="totalPrice" style={{ display: 'block', marginBottom: '2px', color: '#000', fontSize: '12px', fontWeight: '600' }}>
              Total Price:
            </label>
            <input
              type="text"
              id="totalPrice"
              name="totalPrice"
              value={formData.totalPrice}
              readOnly
              style={{
                width: '100%',
                padding: '6px',
                borderRadius: '8px',
                boxSizing: 'border-box',
                color: '#000',
                fontSize: '14px',
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              backgroundColor:'#6c757d', 
              color: 'white',
              padding: '10px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              width: '100%',
              fontSize: '16px',
            }}
          >
            {isEditMode ? 'Update' : 'Add'} Product
          </button>
        </form>
        <button
          onClick={handleViewTable}
          style={{
            backgroundColor: '#6c757d',
            color: 'white',
            padding: '10px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            width: '100%',
            fontSize: '16px',
            marginTop: '10px',
          }}
        >
          View Product Table
        </button>
      </div>
    </div>
  );
}
