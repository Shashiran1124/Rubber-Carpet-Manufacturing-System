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
	TablePagination,
	TextField,
	Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom"; // useNavigate replaces useHistory
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "./Head";
import Sidebar from "./Sidebar";

const MachineList = () => {
	const [machines, setMachines] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [searchText, setSearchText] = useState("");
	const [totalRecords, setTotalRecords] = useState(0);

	useEffect(() => {
		fetchMachines(page + 1, rowsPerPage);
	}, [page, rowsPerPage, searchText]);

	const fetchMachines = async (pageNumber = 1, pageSize = rowsPerPage) => {
		try {
			const response = await axios.post("http://localhost:8070/machine/", {
				searchText,
				pageNumber,
				pageSize,
			});
			const { items, totalRecordCount } = response.data;
			setMachines(items);
			setTotalRecords(totalRecordCount);
			setLoading(false);
		} catch (error) {
			setError("Failed to fetch machines.");
			toast.error("Error has occurred, please try again.");
		} finally {
			setLoading(false);
		}
	};

	const handleEditClick = (mID) => {
		navigate(`/machine/update/${mID}`);
	};

	const handleDeleteClick = async (mID) => {
		try {
			await axios.delete(`http://localhost:8070/machine/delete/${mID}`);
			setMachines(machines.filter((machine) => machine._id !== mID));
			toast.success("Machine deleted successfully.");
		} catch (error) {
			toast.error("Failed to delete machine.");
		}
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const handleSearchChange = (event) => {
		setSearchText(event.target.value);
		setPage(0);
	};

	const handleRouteMachineRepairList = (rowData) => {
		navigate(`/machine/view/${rowData._id}/${rowData.machineID}`);
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	return (
		<>
			{/* Head should be at the top, spanning full width */}
			<Head />

			{/* Sidebar and Content */}
			<Box display="flex" height="100vh">
				{/* Sidebar */}
				<Box sx={{ width: "15%" }}>
					<Sidebar />
				</Box>

				{/* Main content area */}
				<Box sx={{ flex: 1, padding: "20px" }}>
					<ToastContainer />
					<Typography variant="h4" sx={{ marginBottom: "20px" }}>
						Machine List
					</Typography>

					{/* Search Bar */}
					<Box sx={{ marginBottom: "20px" }}>
						<TextField
							label="Search"
							variant="outlined"
							fullWidth
							margin="normal"
							value={searchText}
							onChange={handleSearchChange}
							placeholder="Search machine ID..."
						/>
					</Box>

					{/* Table */}
					<Paper elevation={3}>
						{loading ? (
							<Box display="flex" justifyContent="center" alignItems="center" height="400px">
								<CircularProgress />
							</Box>
						) : error ? (
							<Box display="flex" justifyContent="center" alignItems="center" height="400px">
								<Typography color="error">{error}</Typography>
							</Box>
						) : (
							<TableContainer component={Paper}>
								<Table>
									<TableHead>
										<TableRow>
											<TableCell sx={{ backgroundColor: "#1976d2", color: "white" }}>Machine ID</TableCell>
											<TableCell sx={{ backgroundColor: "#1976d2", color: "white" }}>Date</TableCell>
											<TableCell sx={{ backgroundColor: "#1976d2", color: "white" }}>Status</TableCell>
											<TableCell sx={{ backgroundColor: "#1976d2", color: "white" }}>Next General Repair Date</TableCell>
											<TableCell sx={{ backgroundColor: "#1976d2", color: "white" }}>Actions</TableCell>
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
													<Button
														variant="contained"
														color="error"
														onClick={() => handleDeleteClick(machine._id)}
													>
														Delete
													</Button>
													<Button
														variant="contained"
														style={{ backgroundColor: "orange", marginLeft: "10px" }}
														onClick={() => handleRouteMachineRepairList(machine)}
													>
														View Repair Details
													</Button>
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>

								{/* Pagination */}
								<Box sx={{ display: "flex", justifyContent: "flex-end", padding: "16px" }}>
									<TablePagination
										rowsPerPageOptions={[5, 10, 25]}
										component="div"
										count={totalRecords}
										rowsPerPage={rowsPerPage}
										page={page}
										onPageChange={handleChangePage}
										onRowsPerPageChange={handleChangeRowsPerPage}
									/>
								</Box>
							</TableContainer>
						)}
					</Paper>
				</Box>
			</Box>
		</>
	);
};

export default MachineList;
