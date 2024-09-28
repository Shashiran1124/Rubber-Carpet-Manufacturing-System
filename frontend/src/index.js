import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import './index.css';

import DashSupForm from './components/DashSupForm';
import F1 from './components/F1';
import Navbar from './components/NavBar';
import Sidebar from './components/SideBar';
import F1T from './components/F1T';
import reportWebVitals from './reportWebVitals';

import RMCTable from './components/RMCTable';

import OFTable from './components/OFTable';
import DashOFTable from './components/DashOFTable';

import DashOrderForm from './components/DashOrderForm';
import RawMaterialCostForm from './components/RawMaterialCostForm';
import DashRawMaterialCostForm from './components/DashRawMaterialCostForm';
import OrderForm from './components/OrderForm';
import DashF1T from './components/DashF1T';

import DashRMCtable from './components/DashRMCTable';
import SupReport from './components/SupReport';

import DashReport from './components/DashReport';

import ReportTable from './components/ReportTable';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  
  <BrowserRouter>
    <Routes>
      
      <Route path='/DashSupForm' element={<DashSupForm/>}/>
      <Route path='/F1' element={<F1/>}/>
      <Route path='/F1T' element={<F1T/>}/>
      <Route path='/NavBar' element={<Navbar/>}/>
      <Route path='/SideBar' element={<Sidebar/>}/>
      <Route path='/F1T' element={<F1T/>}/>

      <Route path='/DashOFTable' element={<DashOFTable/>}/>
      
      <Route path='/OrderForm' element={<OrderForm/>}/>
      <Route path='/OFTable' element={<OFTable/>}/>
      <Route path='/DashOrderForm' element={<DashOrderForm/>}/>
      <Route path='/RawMaterialCostForm' element={<RawMaterialCostForm/>}/>
      
      <Route path='/DashRawMaterialCostForm' element={<DashRawMaterialCostForm/>}/>
      <Route path='/DashF1T' element={<DashF1T/>}/>

      <Route path='/RMCTable' element={<RMCTable/>}/>

      <Route path='/DashRMCtable' element={<DashRMCtable/>}/>

      <Route path='/SupReport' element={<SupReport/>}/>
      <Route path='/' element={<DashReport/>}/>

      <Route path='/ReportTable' element={<ReportTable/>}/>

      

      
    </Routes>
  </BrowserRouter>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
