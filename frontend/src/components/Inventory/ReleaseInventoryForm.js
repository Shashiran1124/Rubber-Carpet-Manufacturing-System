import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import pic4 from '../../images/pic4.jpeg';

export default function ReleaseInventoryForm() {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    productId: '',
    productName: '',
    productionDate: '',
    quantity: '',
    unitPrice: '',
    totalPrice: '',
    releaseDate: ''
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [orderId, setOrderId] = useState(false);

  useEffect(() => {
    if (location.state && location.state.order) {
      const order = location.state.order;
      const formattedProductionDate = order.productionDate ? new Date(order.productionDate).toISOString().split('T')[0] : "";
      const formattedReleaseDate = order.releaseDate ? new Date(order.releaseDate).toISOString().split('T')[0] : "";
      setFormData({
        productId: order.productId,
        productName: order.productName,
        productionDate: formattedProductionDate,
        quantity: order.quantity,
        unitPrice: order.unitPrice,
        totalPrice: order.totalPrice,
        releaseDate: formattedReleaseDate
      });
      setOrderId(order._id);
      setIsEditMode(true);
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Restrict productId to numbers only
    if (name === 'productId') {
      const onlyNumbers = value.replace(/[^0-9]/g, '');
      setFormData({
        ...formData,
        [name]: onlyNumbers
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  useEffect(() => {
    const quantity = parseFloat(formData.quantity);
    const unitPrice = parseFloat(formData.unitPrice);
    if (!isNaN(quantity) && !isNaN(unitPrice)) {
      setFormData((prevData) => ({
        ...prevData,
        totalPrice: (quantity * unitPrice).toFixed(2)
      }));
    }
  }, [formData.quantity, formData.unitPrice]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isEditMode
        ? `http://localhost:8070/releaseInventoryRoutes/update-release/${orderId}`
        : 'http://localhost:8070/releaseInventoryRoutes/add-release';
      const method = isEditMode ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert(`Release Inventory ${isEditMode ? 'updated' : 'added'} successfully`);
        navigate('/dashreinTable');
      } else {
        alert(`Failed to ${isEditMode ? 'update' : 'add'} release inventory`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert(`An error occurred while ${isEditMode ? 'updating' : 'adding'} the Release Inventory.`);
    }
  };

  const handleViewTable = () => {
    navigate('/dashreinTable');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f7f7f7', padding: '10px' }}>
      <div style={{ backgroundColor: '#F1F1F1', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', width: '100%', maxWidth: '420px', border: '2px solid #000' }}>
      <img
          src={pic4} 
          alt="Product"
          style={{
            width: '100%',
            height: '80vh',
            borderRadius: '4px',
            marginBottom: '1px',
          }}
        />
        </div>
        <div style={{
          backgroundColor: '#F1F1F1',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
          border: '2px solid #000',
        }}>
        <h2 style={{ textAlign: 'center', marginBottom: '10px', color: '#000', fontSize: '22px' }}>{isEditMode ? 'Edit Release Inventory' : 'Add Release Final Goods'}</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '8px' }}>
            <label htmlFor="productId" style={{ display: 'block', marginBottom: '2px', color: '#000', fontSize: '12px', fontWeight: '600' }}>release order number:</label>
            <input
              type="text"
              id="productId"
              name="productId"
              value={formData.productId}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '8px', borderRadius: '8px', boxSizing: 'border-box', color: '#000', fontSize: '14px' }}
            />
          </div>
          <div style={{ marginBottom: '8px' }}>
            <label htmlFor="productName" style={{ display: 'block', marginBottom: '2px', color: '#000', fontSize: '12px', fontWeight: '600' }}>Product Name:</label>
            <select
              id="productName"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '8px', borderRadius: '8px', boxSizing: 'border-box', color: '#000', fontSize: '14px' }}
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
            <label htmlFor="productionDate" style={{ display: 'block', marginBottom: '2px', color: '#000', fontSize: '12px', fontWeight: '600' }}>Production Date:</label>
            <input
              type="date"
              id="productionDate"
              name="productionDate"
              value={formData.productionDate}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '4px', borderRadius: '8px', boxSizing: 'border-box', color: '#000', fontSize: '14px' }}
            />
          </div>
          <div style={{ marginBottom: '8px' }}>
            <label htmlFor="quantity" style={{ display: 'block', marginBottom: '2px', color: '#000', fontSize: '12px', fontWeight: '600' }}>Quantity:</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '6px', borderRadius: '8px', boxSizing: 'border-box', color: '#000', fontSize: '14px' }}
            />
          </div>
          <div style={{ marginBottom: '8px' }}>
            <label htmlFor="unitPrice" style={{ display: 'block', marginBottom: '2px', color: '#000', fontSize: '12px', fontWeight: '600' }}>Unit Price:</label>
            <input
              type="number"
              step="0.01"
              id="unitPrice"
              name="unitPrice"
              value={formData.unitPrice}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '6px', borderRadius: '8px', boxSizing: 'border-box', color: '#000', fontSize: '14px' }}
            />
          </div>
          <div style={{ marginBottom: '8px' }}>
            <label htmlFor="totalPrice" style={{ display: 'block', marginBottom: '2px', color: '#000', fontSize: '12px', fontWeight: '600' }}>Total Price:</label>
            <input
              type="text"
              id="totalPrice"
              name="totalPrice"
              value={formData.totalPrice}
              readOnly
              style={{ width: '100%', padding: '6px', borderRadius: '8px', boxSizing: 'border-box', color: '#000', fontSize: '14px', backgroundColor: '#e9e9e9' }}
            />
          </div>
          <div style={{ marginBottom: '8px' }}>
            <label htmlFor="releaseDate" style={{ display: 'block', marginBottom: '2px', color: '#000', fontSize: '12px', fontWeight: '600' }}>Release Date:</label>
            <input
              type="date"
              id="releaseDate"
              name="releaseDate"
              value={formData.releaseDate}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '4px', borderRadius: '8px', boxSizing: 'border-box', color: '#000', fontSize: '14px' }}
            />
          </div>
          <div style={{ textAlign: 'center' }}>
          <button
              type="submit"
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '8px',
                backgroundColor: '#6c757d',
                color: '#fff',
                fontSize: '16px',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {isEditMode ? 'Update' : 'Add'} Product
            </button>
          </div>
        </form>
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
        <button
            onClick={handleViewTable}
            style={{
              marginTop: '10px',
              width: '100%',
              padding: '10px',
              borderRadius: '8px',
              backgroundColor: '#6c757d',
              color: '#fff',
              fontSize: '16px',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            View Product Table
          </button>
        </div>
      </div>
    </div>
  );
}

