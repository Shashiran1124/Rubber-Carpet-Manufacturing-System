//import logo from './logo.svg';
import React from "react";
import './App.css';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TestComponent from './components/TestComponent';
import Heder from "./components/Heder";
import Sidebar from "./components/Sidebar";
import SalaryCreate from "./components/SalaryCreate";
import SalaryView from "./components/SalaryView";
import PettyCash from "./components/PettyCash";
import PeticashAll from "./components/PeticashAll";
import ProfitLostForm from "./components/ProfitLostForm";
import PettycashEdit from "./components/PettycashEdit";
import ProfitAndLostView from "./components/ProfitAndLostView";





function App() {
  return (
    <Router>
        <Heder />
      <div style={{display: "flex"}}>
        <Sidebar/>

        <div style={{flex:1, padding:"20px"}}>

            <Routes>

             <Route path = "/" element= {<TestComponent/>}/>   
             <Route path = "/salaryCal/add" element= {<SalaryCreate/>}/>   
             <Route path = "/salaryCal/all" element= {<SalaryView/>}/>   
             <Route path = "/pettyCash/add" element= {<PettyCash/>}/> 
             <Route path = "/pettyCash/all" element= {<PeticashAll/>}/>   
             <Route path = "/pettyCash/update/:id" element= {<PettycashEdit/>}/>   
             <Route path = "/profitAndLosts/add" element= {<ProfitLostForm/>}/>  
             <Route path = "/profitAndLosts/all" element= {<ProfitAndLostView/>}/>   
 

  




             

            </Routes>  

        </div>

      </div>
    </Router>
  );
}

export default App;
