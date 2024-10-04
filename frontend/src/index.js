import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Employees from './components/Employees';
import EmployeeForm from './components/EmployeeForm';
import EmployeeTable from './components/EmployeeTable';
import Navbar from './components/NavBar';
import Sidebar from './components/SideBar';
import FeedbackForm from './components/FeedbackForm';
import Feedback from './components/Feedback';
import FeedbackTable from './components/FeedbackTable';
import SalaryManagementForm from './components/SalaryManagementForm'; 
import Salary from './components/Salary';
import SalaryManagementTable from './components/SalaryManagementTable';
import Report from './components/Report';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='/Employees' element={<Employees />} />
      <Route path='/EmployeeForm' element={<EmployeeForm />} />
      <Route path='/EmployeeTable' element={<EmployeeTable />} />
      <Route path='/NavBar' element={<Navbar />} />
      <Route path='/SideBar' element={<Sidebar />} />
      <Route path='/Feedback' element={<Feedback />} />
      <Route path='/FeedbackForm' element={<FeedbackForm />} />
      <Route path='/FeedbackTable' element={<FeedbackTable />} />
      <Route path='/SalaryManagementForm' element={<SalaryManagementForm />} />
      <Route path='/SalaryManagementTable' element={<SalaryManagementTable />} />
      <Route path='/Salary' element={<Salary />} />
      <Route path='/Report' element={<Report />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
