import React from 'react';
import ReactDOM from 'react-dom/client';
import NaviBar from './components/NaviBar';
import SideBar from './components/SideBar';
import DashCustomerForm from './components/DashCustomerForm';
import OrderForm from './components/OrderForm';
import DashOrderForm from './components/DashOrderForm'
import PlaceAnOrderForm from './components/PlaceAnOrderForm'
import DashPlaceAnOrderForm from './components/DashPlaceAnOrderForm'
import FeedbackForm from './components/FeedbackForm'
import DashFeedbackForm from './components/DashFeedbackForm'
import OrderFormTable from './components/OrderFormTable';
import CusDash from './components/cusDash';
import FeedbackTable from './components/FTable';
import Osidebar from './components/SB2';
import Viewordertable from './components/OLT';
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import DashboardFormTable from './components/DashOrderFormTable';
import Dashcusdashboard from './components/Dashcusdsh';
import DashOLT from './components/DashOLT';
import DashFeed from './components/DashFeed';
import DashOpForm from './components/DashOpForm';
import OperatorFeeedTable from './components/OfeedT';
import SalesOrderForm from './components/CalFo';
import DashCalFo from './components/DashCalFo';
import CalTable from './components/CalTable';
import Dashcal from './components/Dashcal';
import RepTable from './components/Rep';
import DashRep from './components/DashRep';
import DashCReg from './components/DashCReg';






const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
    <Routes>
    <Route>
        <Route path = '/' element = {<App/>}/>
        <Route path = '/NaviBar' element = {<NaviBar/>}/>
        <Route path = '/SideBar' element = {<SideBar/>}/>
        <Route path = '/DashCustomerForm' element = {<DashCustomerForm/>}/>
        <Route path = '/OrderForm' element = {<OrderForm/>}/>
        <Route path = '/DashOrderForm' element = {<DashOrderForm/>}/>
        <Route path = '/PlaceAnOrderForm' element = {<PlaceAnOrderForm/>}/>
        <Route path = '/DashPlaceAnOrderForm' element = {<DashPlaceAnOrderForm/>}/>
        <Route path = '/FeedbackForm' element = {<FeedbackForm/>}/>
        <Route path = '/DashFeedbackForm' element = {<DashFeedbackForm/>}/>
        <Route path = '/OrderFormTable' element = {<OrderFormTable/>}/>
        <Route path = '/DashOrderFormTable' element = {<DashboardFormTable/>}/>
        <Route path = '/cusDash' element = {<CusDash/>}/>
        <Route path = '/Dashcusdsh' element = {<Dashcusdashboard/>}/>
        <Route path = '/FTable' element = {<FeedbackTable/>}/>
        <Route path = '/FTable' element = {<FeedbackTable/>}/>
        <Route path = '/SB2' element = {<Osidebar/>}/>
        <Route path = '/OLT' element = {<Viewordertable/>}/>
        <Route path = '/DashOLT' element = {<DashOLT/>}/>
        <Route path = '/DashFeed' element = {<DashFeed/>}/>
        <Route path = '/DashOpForm' element = {<DashOpForm/>}/>
        <Route path = '/OfeedT' element = {<OperatorFeeedTable/>}/>
        <Route path = '/CalFo' element = {<SalesOrderForm/>}/>
        <Route path = '/DashCalFo' element = {<DashCalFo/>}/>
        <Route path = '/CalTable' element = {<CalTable/>}/>
        <Route path = '/Dashcal' element = {<Dashcal/>}/>
        <Route path = '/Rep' element = {<RepTable/>}/>
        <Route path = '/DashRep' element = {<DashRep/>}/>
        <Route path = '/DashCReg' element = {<DashCReg/>}/>
      </Route>
    </Routes>
      
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
