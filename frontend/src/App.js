import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, } from "react-router-dom";
import TestComponent from './components/TestComponent';
import MachineRegister from './components/MachineRegister';
import AllData from './components/AllData'
import UpdateMachine from './components/UpdateMachine';
import SingleMachineView from './components/SingleMachineView';
import RepairForm from './components/RepairForm';



function App() {
  return (
    <Router>
      <Route path = "/" exact component = {TestComponent}/>
      <Route path = "/machine/add" exact component = {MachineRegister}/>
      <Route path = "/machine/all" exact component = {AllData}/>
      <Route path="/machine/update/:id" exact component={UpdateMachine} />
      <Route path="/machine/view/:id/:mid" exact component={SingleMachineView} />
      <Route path="/repair/add/:mid" exact component={RepairForm} />
      </Router>
  );
}

export default App;
