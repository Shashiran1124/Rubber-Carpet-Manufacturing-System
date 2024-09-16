import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Corrected import

export default function SingleMachineView() {
	const [machineData, setMachineData] = useState([]);
	const [repairData, setRepairData] = useState([]);

	const { id, mid } = useParams(); // Fetch params from the URL

	useEffect(() => {
		// Fetch machine data by ID
		axios.get(`http://localhost:8070/machine/${id}`).then((res) => {
			setMachineData(res.data);
			console.log(res.data);
		});

		// Fetch repair data for the machine
		axios.get(`http://localhost:8070/repair/${mid}`).then((res) => {
			setRepairData(res.data);
			console.log(res.data);
		});
	}, [id, mid]);

	return (
		<>
			<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
				<div style={{ fontSize: "1.2rem", fontWeight: "bold" }}>Machine ID {mid}</div>
				<a href={`/repair/add/${mid}`}>
					<button className="btn btn-primary">Add New Record</button>
				</a>
			</div>
			<br />

			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Repair Start Date</TableCell>
							<TableCell>Part Name</TableCell>
							<TableCell>Status</TableCell>
							<TableCell>Repair End Date</TableCell>
							<TableCell>Description</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{repairData.map((rowData) => (
							<TableRow key={rowData._id}>
								<TableCell>{rowData.repairStartDate}</TableCell>
								<TableCell>{rowData.partName}</TableCell>
								<TableCell>{rowData.status}</TableCell> {/* Corrected status field */}
								<TableCell>{rowData.repairEndDate}</TableCell>
								<TableCell>{rowData.description}</TableCell> {/* Corrected typo from 'discription' */}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
}
