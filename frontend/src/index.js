import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import './index.css';
import App from './App';
import DashSupForm from './components/DashSupForm';
import F1 from './components/F1';
import Navbar from './components/NavBar';
import Sidebar from './components/SideBar';
import F1T from './components/F1T';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App/>}/>
      <Route path='/DashSupForm' element={<DashSupForm/>}/>
      <Route path='/F1' element={<F1/>}/>
      <Route path='/F1T' element={<F1T/>}/>
      <Route path='/NavBar' element={<Navbar/>}/>
      <Route path='/SideBar' element={<Sidebar/>}/>
      <Route path='/F1T' element={<F1T/>}/>
      
    </Routes>
  </BrowserRouter>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
