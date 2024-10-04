import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ReleaseInventoryFormTable() {
  const [releaseOrders, setReleaseOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const [categorySums, setCategorySums] = useState({
    inventoryRubberMats: 0,
    gymRubberFlooring: 0,
    rubberRunnerMats: 0,
    rubberPlaygroundMats: 0,
    commercialRubberFlooring: 0,
    rubberCarpetTiles: 0
  });

  // Fetch Release Inventory function
  const fetchReleaseInventory = async () => {
    try {
      const response = await fetch('http://localhost:8070/releaseInventoryRoutes/release-inventory');
      if (response.ok) {
        const data = await response.json();
        setReleaseOrders(data);
        calculateCategorySums(data);
      } else {
        console.error('Failed to fetch release inventory');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Calculate sums for each category
  const calculateCategorySums = (orders) => {
    const sums = {
      inventoryRubberMats: 0,
      gymRubberFlooring: 0,
      rubberRunnerMats: 0,
      rubberPlaygroundMats: 0,
      commercialRubberFlooring: 0,
      rubberCarpetTiles: 0
    };

    orders.forEach((order) => {
      const { productName, quantity } = order;
      const qty = parseFloat(quantity) || 0;
      switch (productName) {
        case 'Inventory Rubber Mats':
          sums.inventoryRubberMats += qty;
          break;
        case 'Gym Rubber Flooring':
          sums.gymRubberFlooring += qty;
          break;
        case 'Rubber Runner Mats':
          sums.rubberRunnerMats += qty;
          break;
        case 'Rubber Playground Mats':
          sums.rubberPlaygroundMats += qty;
          break;
        case 'Commercial Rubber Flooring':
          sums.commercialRubberFlooring += qty;
          break;
        case 'Rubber Carpet Tiles':
          sums.rubberCarpetTiles += qty;
          break;
        default:
          break;
      }
    });

    setCategorySums(sums);
  };

  // Call fetchReleaseInventory on component mount
  useEffect(() => {
    fetchReleaseInventory();
  }, []);

  // Function to handle updating an order
  const handleUpdate = (order) => {
    navigate('/dashreinform', { state: { order } });
  };

  // Function to handle deleting an order
  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this order?');
    if (!confirmed) return;

    try {
      const response = await fetch(`http://localhost:8070/releaseInventoryRoutes/delete-release/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchReleaseInventory(); // Refresh the release inventory table after deletion
        alert('Release inventory item deleted successfully');
      } else {
        alert('Failed to delete release inventory item');
      }
    } catch (error) {
      console.error('Error deleting release inventory item:', error);
      alert('An error occurred while deleting the release inventory item.');
    }
  };

  // Function to filter orders by search query
  const filteredOrders = releaseOrders.filter((order) =>
    order.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ marginBottom: '20px', color: '#333' }}>Release Final Goods Details</h1>
      
      {/* Search bar */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search by product name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ padding: '8px', width: '1000px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
      </div>

      {filteredOrders.length === 0 ? (
        <p>No release inventory items available.</p>
      ) : (
        <table style={{ width: '90%', borderCollapse: 'collapse', border: '1px solid #ddd', fontSize: '14px', margin: '0 auto' }}>
          <thead>
            <tr style={{ backgroundColor: '#f4f4f4', color: '#333' }}>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Release Order Number</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Product Name</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Production Date</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Quantity</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Unit Price</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Total Price</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', width: '170px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order._id}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{order.productId}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{order.productName}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  {new Date(order.productionDate).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}
                </td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{order.quantity}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{order.unitPrice}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{order.totalPrice}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>
                  <button
                    onClick={() => handleUpdate(order)}
                    style={{
                      padding: '6px 10px',
                      backgroundColor: '#007bff',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      marginRight: '6px',
                      fontSize: '12px'
                    }}
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(order._id)}
                    style={{
                      padding: '6px 10px',
                      backgroundColor: '#dc3545',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
