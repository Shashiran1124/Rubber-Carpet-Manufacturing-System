import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Switch is now Routes
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
					<Routes>
						<Route path="/" element={<TestComponent />} />
						<Route path="/machine/add" element={<MachineRegister />} />
						<Route path="/machine/all" element={<AllData />} />
						<Route path="/machine/update/:id" element={<UpdateMachine />} />
						<Route path="/machine/view/:id/:mid" element={<SingleMachineView />} />
						<Route path="/repair/add/:mid" element={<RepairForm />} />
					</Routes>
				</div>
			</div>
		</Router>
	);
}

export default App;
