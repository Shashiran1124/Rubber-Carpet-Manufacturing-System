import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

import industrialRubberMats from '../../images/industrial-rubber-mats.jpg';
import gymRubberFlooring from '../../images/gym-rubber-flooring.jpg';
import rubberRunnerMats from '../../images/rubber-runner-mats.jpg';
import rubberPlaygroundMats from '../../images/rubber-playground-mats.jpg';
import commercialRubberFlooring from '../../images/commercial-rubber-flooring.jpg';
import rubberCarpetTiles from '../../images/rubber-carpet-tiles.jpg';

const products = [
  { id: 1, name: 'Industrial Rubber Mats', image: industrialRubberMats },
  { id: 2, name: 'Gym Rubber Flooring', image: gymRubberFlooring },
  { id: 3, name: 'Rubber Runner Mats', image: rubberRunnerMats },
  { id: 4, name: 'Rubber Playground Mats', image: rubberPlaygroundMats },
  { id: 5, name: 'Commercial Rubber Flooring', image: commercialRubberFlooring },
  { id: 6, name: 'Rubber Carpet Tiles', image: rubberCarpetTiles },
];

function CusDash() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <div style={{ display: 'flex', height: '130vh' }}>
      {/* Sidebar */}
      <div style={{
        width: '230px',
        backgroundColor: '#000',
        padding: '20px',
        color: '#FFFFFF',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <h2 style={{ margin: '0', fontSize: '44px',fontFamily: 'Dancing Script, cursive', }}>Welcome to Rubber Solutions</h2>
        <p style={{ fontSize: '18px', marginTop: '10px',fontFamily: 'Dancing Script, cursive', }}>
          High-Quality Mats and Flooring for Every Need
        </p>
      </div>
      
      {/* Main Content */}
      <div style={{ padding: '20px', backgroundColor: '#fff', flex: 1 }}>
        <h1 style={{ marginLeft: '350px', fontSize: '30px' }}>Products Catalog</h1>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '15px',
          justifyContent: 'space-around',
        }}>
          {products.map((product) => (
            <div key={product.id} style={{
              backgroundColor: '#FFFFFF',
              padding: '10px',
              borderRadius: '8px',
              border: '2px solid black',
              boxShadow: '0 0 8px rgba(0, 0, 0, 1)',
              textAlign: 'center',
              width: 'calc(30% - 20px)',
              boxSizing: 'border-box',
            }}>
              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: '70%',
                  height: 'auto',
                  borderRadius: '8px',
                  marginBottom: '10px',
                }}
              />
              <h2 style={{
                margin: '10px 0',
                fontSize: '16px',
                color: '#000',
              }}>{product.name}</h2>
              <button
                onClick={() => navigate('/DashOrderFormm1')}
                style={{
                  backgroundColor: '#051ED7',
                  color: '#fff',
                  border: 'none',
                  padding: '5px 8px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontSize: '13px',
                }}
              >
                Order Now
              </button>
            </div>
          ))}
        </div>
        <div style={{ marginTop: '20px' }}>
          <ul style={{ listStyle: 'none', padding: '0' }}>
            {cart.map((item, index) => (
              <li key={index} style={{ margin: '5px 0', fontSize: '14px' }}>{item.name}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* "Give Feedback" Button */}
      <button
        onClick={() => navigate('/DashFeedbackForm')}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          backgroundColor: '#FFA500',
          color: '#000000',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '8px',
          fontSize: '13px',
          cursor: 'pointer',
          fontWeight: 'bold',
          
        }}
      >
        Give Feedback &rarr;
      </button>
    </div>
  );
}

export default CusDash;
