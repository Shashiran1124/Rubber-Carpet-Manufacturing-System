import React, { useState, useEffect } from "react";
import axios from "axios";
import {
	Box,
	Typography,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	CircularProgress,
} from "@mui/material";
import { useHistory } from "react-router-dom";
import Button from "@mui/material/Button";

const MachineList = () => {
	const [machines, setMachines] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const history = useHistory(); // Correct usage of useHistory

	useEffect(() => {
		const fetchMachines = async () => {
			try {
				const response = await axios.get("http://localhost:8070/machine/");
				setMachines(response.data);
			} catch (error) {
				setError("Failed to fetch machines.");
				console.error("Error fetching machines:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchMachines();
	}, []);

	const handleEditClick = (mID) => {
		// Navigate to the update page with the machine ID
		history.push(`/machine/update/${mID}`);
	};

	const handleDeleteClick = async (mID) => {
		try {
			await axios.delete(`http://localhost:8070/machine/delete/${mID}`);
			setMachines(machines.filter((machine) => machine._id !== mID));
			alert("Machine deleted successfully.");
		} catch (error) {
			console.error("Error deleting machine:", error);
			alert("Failed to delete machine.");
		}
	};

	return (
		<Box padding={2}>
			<Typography variant="h4" gutterBottom>
				Machine List
			</Typography>
			{loading ? (
				<Box display="flex" justifyContent="center" alignItems="center" height="100vh">
					<CircularProgress />
				</Box>
			) : error ? (
				<Typography color="error">{error}</Typography>
			) : (
				<TableContainer component={Paper}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>Machine ID</TableCell>
								<TableCell>Date</TableCell>
								<TableCell>Status</TableCell>
								<TableCell>Next General Repair Date</TableCell>
								<TableCell>Actions</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{machines.map((machine) => (
								<TableRow key={machine._id}>
									<TableCell>
										<a href={`/machine/view/${machine._id}/${machine.machineID}`}>{machine.machineID}</a>
									</TableCell>
									<TableCell>{machine.date}</TableCell>
									<TableCell>{machine.status}</TableCell>
									<TableCell>{machine.nextGeneralRepairDate}</TableCell>
									<TableCell>
										<Button
											variant="contained"
											color="primary"
											onClick={() => handleEditClick(machine._id)}
											style={{ marginRight: "10px" }}
										>
											Edit
										</Button>
										<Button variant="contained" color="error" onClick={() => handleDeleteClick(machine._id)}>
											Delete
										</Button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			)}
		</Box>
	);
};

export default MachineList;
