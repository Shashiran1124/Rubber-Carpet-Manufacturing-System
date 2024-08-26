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

import { BrowserRouter, Route,Routes } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


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
      </Route>
    </Routes>
      
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
