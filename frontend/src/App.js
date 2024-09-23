import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Switch is now Routes
//import Head from "./components/Head";// nave bar
import Sidebar from "./components/Sidebar";
import TestComponent from "./components/TestComponent";
import MachineRegister from "./components/MachineRegister";
import AllData from "./components/AllData";
import UpdateMachine from "./components/UpdateMachine";
import SingleMachineView from "./components/SingleMachineView";
import RepairForm from "./components/RepairForm";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BuyFormPart from "./components/BuyPartForm";
import BuyPartView from "./components/BuyPartView";

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
						<Route path="/Part/add" element={<BuyFormPart />} />
						<Route path="/Part/all" element={<BuyPartView />} />


						


					</Routes>
				</div>
			</div>
		</Router>
	);
}

export default App;
