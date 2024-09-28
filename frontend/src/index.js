import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import './index.css';
import Navbar from './components/Production/NavBar';
import Sidebar from './components/Production/SideBar';
import reportWebVitals from './reportWebVitals';
import OrderForm from './components/Production/OrderForm';
import OrderTable from './components/Production/OrderTable';
import DashOrderTable from './components/Production/DsahOrderTable';
import DashOrderForm from './components/Production/DashOrderForm';
import Footer from './components/Production/Footer';
import Sidebar2 from './components/Production/Sidebar2';
import Reports from './components/Production/Reports';
import Dashreports from './components/Production/Dsahreports';
import PlanForm from './components/Production/PlaneForm';
import DashPlanForm from './components/Production/DashPlanForm';
import PlaneTable from './components/Production/PlanTable';
import DashPlanTable from './components/Production/DashPlanTable';
import DashMachiForm from './components/Production/DashMachiForm';
import DashMachiTable from './components/Production/DashMachiTable';
import DashProForm from './components/Production/DashProForm';
import DashProTable from './components/Production/DashProTable';
import EmpDashOrderTable from './components/Production/EmpDashOrderTable';
import EmpDashPlanTable from './components/Production/EmpDashPlanTable';
import EmpDashMachiTable from './components/Production/EmpDashMachiTable';
import EmpDashProTable from './components/Production/EmpDashProTable';
import EmpDashreports from './components/Production/EmpDashreports';
import StartupPage from './components/Production/StartupPage';
import LoginPage from './components/Production/LoginPage';
import RegisterPage from './components/Production/RegisterPage';
import { AuthProvider } from './context/AuthContext';
import Home from './components/Production/Home';



//Nishan
import Navbarr from './components/distributor/NavBar';
import Sidebarr from './components/distributor/SideBar';
import Dashuser from './components/distributor/user';
import Dashorder from './components/distributor/user2';
import Dashkpi from './components/distributor/user3';
import DashTransTable from './components/distributor/DashTransTable';
import DashOrderTablee from './components/distributor/DashOrderTable';
import DashKpiTable from './components/distributor/DashKpiTable';
import DashCostTable from './components/distributor/DashCostTable';
import Dashcost from './components/distributor/user4';
import DashReport from './components/distributor/DashReport';








const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  
  <BrowserRouter>
  <AuthProvider>
    <Routes>
    
      
      <Route path='/NavBar' element={<Navbar/>}/>
      <Route path='/SideBar' element={<Sidebar/>}/> 
      <Route path='/OrderForm' element={<OrderForm/>}/> 
      <Route path='/OrderTable' element={<OrderTable/>}/> 
      <Route path='/dashdrdertable' element={<DashOrderTable/>}/> 
      <Route path='/footer' element={<Footer/>}/> 
      <Route path='/sidebar2' element={<Sidebar2/>}/> 
      <Route path='/app' element={<Home/>}/> 
      <Route path='/dashdrderform' element={<DashOrderForm/>}/> 
      <Route path='/reports' element={<Reports/>}/> 
      <Route path='/dashreports' element={<Dashreports/>}/> 
      <Route path='/planform' element={<PlanForm/>}/> 
      <Route path='/dashplanform' element={<DashPlanForm/>}/> 
      <Route path='/plantable' element={<PlaneTable/>}/> 
      <Route path='/dashplantable' element={<DashPlanTable/>}/> 
      <Route path='/dashmachiform' element={<DashMachiForm/>}/> 
      <Route path='/dashmachitable' element={<DashMachiTable/>}/> 
      <Route path='/dashproform' element={<DashProForm/>}/> 
      <Route path='/dashprotable' element={<DashProTable/>}/> 
      <Route path='/empdashordertable' element={<EmpDashOrderTable/>}/> 
      <Route path='/empdashplantable' element={<EmpDashPlanTable/>}/> 
      <Route path='/empdashmachitable' element={<EmpDashMachiTable/>}/> 
      <Route path='/empdashprotable' element={<EmpDashProTable/>}/> 
      <Route path='/empdashreports' element={<EmpDashreports/>}/> 
      <Route path='/' element={<StartupPage/>}/> 
      <Route path="/login" element={<LoginPage />} /> {/* Login page */}
      <Route path="/register" element={<RegisterPage />} /> {/* Registration page */}






      <Route path='/NavBar' element={<Navbarr/>}/>
      <Route path='/SideBar' element={<Sidebarr/>}/>
      <Route path='/dashuser' element={<Dashuser/>}/>
      <Route path='/dashtranstable' element={<DashTransTable/>}/>
      <Route path='/dashorder' element={<Dashorder/>}/>
      <Route path='/dashkpi' element={<Dashkpi/>}/>
      <Route path='/dashordertable' element={<DashOrderTablee/>}/>
      <Route path='/dashkpitable' element={<DashKpiTable/>}/>
      <Route path='/dashcosttable' element={<DashCostTable/>}/>
      <Route path='/dashcost' element={<Dashcost/>}/>
      <Route path='/dashcosttable' element={<DashCostTable/>}/>
      <Route path='/dashreport' element={<DashReport/>}/>




      
   


     

    </Routes>
    </AuthProvider>
  </BrowserRouter>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

