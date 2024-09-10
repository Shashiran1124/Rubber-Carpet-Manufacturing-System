import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import TestComponent from "./components/TestComponent";
import MachineRegister from "./components/MachineRegister";
import AllData from "./components/AllData";
import UpdateMachine from "./components/UpdateMachine";
import SingleMachineView from "./components/SingleMachineView";
import RepairForm from "./components/RepairForm";
import "./App.css";

function App() {
	return (
		<Router>
			<div style={{ display: "flex" }}>
				<Sidebar />

				<div style={{ flex: 1, padding: "20px" }}>
					<Switch>
						<Route path="/" exact component={TestComponent} />
						<Route path="/machine/add" exact component={MachineRegister} />
						<Route path="/machine/all" exact component={AllData} />
						<Route path="/machine/update/:id" exact component={UpdateMachine} />
						<Route path="/machine/view/:id/:mid" exact component={SingleMachineView} />
						<Route path="/repair/add/:mid" exact component={RepairForm} />
					</Switch>
				</div>
			</div>
		</Router>
	);
}

export default App;
