import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import supplierImage from '../../images/11.png';

export default function OrderForm() {
  const navigate = useNavigate();
  const location = useLocation();

  const productOptions = [
    'Inventory rubber mats',
    'Gym rubber flooring',
    'Rubber runner mats',
    'Rubber playground mats',
    'Commercial rubber flooring',
    'Rubber carpet tile'
  ];

  const materialOptions = [
    'Used tires',
    'Hoses',
    'Rubber gasket',
    'Rubber mats',
    'Rubber belt'
  ];

  const sizeOptions = [
    'Small',
    'Medium',
    'Large'
  ];

  const [formData, setFormData] = useState({
    num: '',
    name: '',
    qty: '',
    size: '',
    material: '',
    materialQTY: ''
  });

  const [errors, setErrors] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [supplierId, setSupplierId] = useState(null);

  useEffect(() => {
    if (location.state && location.state.Order) {
      const Order = location.state.Order;
      setFormData({
        num: Order.num,
        name: Order.name,
        qty: Order.qty,
        size: Order.size,
        material: Order.material,
        materialQTY: Order.materialQTY,
      });
      setSupplierId(Order._id);
      setIsEditMode(true);
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let validValue = value;

    // Only allow integers for qty and materialQTY, exclude decimal mark
    if (name === 'qty' || name === 'materialQTY') {
      validValue = value.replace(/[^0-9]/g, ''); // Replace with only digits
      if (parseInt(validValue, 10) < 0) validValue = '0';
    }

    // Allow only alphanumeric characters for num and size
    if (name === 'num' || name === 'size') {
      validValue = value.replace(/[^A-Za-z0-9 ]/g, '');
    }

    setFormData({
      ...formData,
      [name]: validValue
    });

    // Clear the error for this field
    setErrors({
      ...errors,
      [name]: ''
    });
  };

  const handleKeyDown = (e) => {
    // Prevent typing of decimal point
    if (e.key === '.') {
      e.preventDefault();
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.num) {
      newErrors.num = 'Order Number is required';
    }
    if (!formData.name) {
      newErrors.name = 'Product Name is required';
    }
    if (!formData.qty || isNaN(formData.qty) || formData.qty <= 0) {
      newErrors.qty = 'Quantity should be a positive integer';
    }
    if (!formData.size) {
      newErrors.size = 'Size is required';
    }
    if (!formData.material) {
      newErrors.material = 'Material is required';
    }
    if (!formData.materialQTY || isNaN(formData.materialQTY) || formData.materialQTY <= 0) {
      newErrors.materialQTY = 'Material Quantity should be a positive integer';
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
        ? `http://localhost:8070/test/update/${supplierId}`
        : 'http://localhost:8070/test/add';
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
        navigate('/dashdrdertable');
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
        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Order Details Form</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="num" style={{ display: 'block', marginBottom: '5px', textAlign: 'left' }}>Order Name:</label>
            <input
              type="text"
              id="num"
              name="num"
              value={formData.num}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '10px',
                border: errors.num ? '1px solid red' : '1px solid #ccc',
                borderRadius: '5px',
                boxSizing: 'border-box'
              }}
            />
            {errors.num && <div style={{ color: 'red', fontSize: '12px' }}>{errors.num}</div>}
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="name" style={{ display: 'block', marginBottom: '5px', textAlign: 'left' }}>Product Name:</label>
            <select
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '10px',
                border: errors.name ? '1px solid red' : '1px solid #ccc',
                borderRadius: '5px',
                boxSizing: 'border-box',
                backgroundColor: '#fff'
              }}
            >
              <option value="" disabled>Select Product Name</option>
              {productOptions.map((product, index) => (
                <option key={index} value={product}>{product}</option>
              ))}
            </select>
            {errors.name && <div style={{ color: 'red', fontSize: '12px' }}>{errors.name}</div>}
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="qty" style={{ display: 'block', marginBottom: '5px', textAlign: 'left' }}>Quantity:</label>
            <input
              type="number"
              id="qty"
              name="qty"
              value={formData.qty}
              onChange={handleChange}
              onKeyDown={handleKeyDown} // Add the key down handler here
              required
              min="0"
              style={{
                width: '100%',
                padding: '10px',
                border: errors.qty ? '1px solid red' : '1px solid #ccc',
                borderRadius: '5px',
                boxSizing: 'border-box'
              }}
            />
            {errors.qty && <div style={{ color: 'red', fontSize: '12px' }}>{errors.qty}</div>}
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="size" style={{ display: 'block', marginBottom: '5px', textAlign: 'left' }}>Size:</label>
            <select
              id="size"
              name="size"
              value={formData.size}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '10px',
                border: errors.size ? '1px solid red' : '1px solid #ccc',
                borderRadius: '5px',
                boxSizing: 'border-box',
                backgroundColor: '#fff'
              }}
            >
              <option value="" disabled>Select Size</option>
              {sizeOptions.map((size, index) => (
                <option key={index} value={size}>{size}</option>
              ))}
            </select>
            {errors.size && <div style={{ color: 'red', fontSize: '12px' }}>{errors.size}</div>}
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="material" style={{ display: 'block', marginBottom: '5px', textAlign: 'left' }}>Material:</label>
            <select
              id="material"
              name="material"
              value={formData.material}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '10px',
                border: errors.material ? '1px solid red' : '1px solid #ccc',
                borderRadius: '5px',
                boxSizing: 'border-box',
                backgroundColor: '#fff'
              }}
            >
              <option value="" disabled>Select Material</option>
              {materialOptions.map((material, index) => (
                <option key={index} value={material}>{material}</option>
              ))}
            </select>
            {errors.material && <div style={{ color: 'red', fontSize: '12px' }}>{errors.material}</div>}
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="materialQTY" style={{ display: 'block', marginBottom: '5px', textAlign: 'left' }}>Material Quantity:</label>
            <input
              type="number"
              id="materialQTY"
              name="materialQTY"
              value={formData.materialQTY}
              onChange={handleChange}
              onKeyDown={handleKeyDown} // Add the key down handler here....
              required
              min="0"
              style={{
                width: '100%',
                padding: '10px',
                border: errors.materialQTY ? '1px solid red' : '1px solid #ccc',
                borderRadius: '5px',
                boxSizing: 'border-box'
              }}
            />
            {errors.materialQTY && <div style={{ color: 'red', fontSize: '12px' }}>{errors.materialQTY}</div>}
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
              {isEditMode ? 'Update Order' : 'Submit Order'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/dashdrdertable')}
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
              View Order
            </button>
            <button
              type="button"
              onClick={() => navigate('/dashstocklevel')}
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
              View Stock
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
