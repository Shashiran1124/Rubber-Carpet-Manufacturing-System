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
} from "@mui/material";
import { useNavigate } from "react-router-dom"; // useNavigate replaces useHistory
import Button from "@mui/material/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MachineList = () => {
	const [machines, setMachines] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const navigate = useNavigate(); // useNavigate instead of useHistory

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
				searchText: searchText,
				pageNumber: pageNumber,
				pageSize: pageSize,
			});
			const { items, totalRecordCount } = response.data;
			setMachines(items);
			setTotalRecords(totalRecordCount);
			setLoading(false);
		} catch (error) {
			setError("Failed to fetch machines.");

			toast.error("Error has been occurred please try again");
		} finally {
			setLoading(false);
		}
	};

	const handleEditClick = (mID) => {
		// Navigate to the update page with the machine ID
		navigate(`/machine/update/${mID}`); // use navigate instead of history.push
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

	const handleRouteMachineRepirList = (rowData) => {
		try {
			navigate(`/machine/view/${rowData._id}/${rowData.machineID}`);
		} catch (error) {}
	};

	const handleChangePage = (event, newPage) => {
		console.log(newPage);
		setPage(newPage);
	};

	return (
		<div className="container py-4">
			<div className="row">
				<div className="col">
					<h2 className="mb-3">Machines</h2>
				</div>
			</div>
			{loading ? (
				<div className="row justify-content-center align-items-center" style={{ height: "100vh" }}>
					<CircularProgress />
				</div>
			) : error ? (
				<div className="row">
					<div className="col">
						<div className="alert alert-danger">{error}</div>
					</div>
				</div>
			) : (
				<>
					<div className="row">
						<div className="col-md-6">
							<TextField
								label="Search"
								variant="outlined"
								fullWidth
								margin="normal"
								value={searchText}
								onChange={handleSearchChange}
								placeholder="Search machine ID..."
							/>
						</div>
					</div>

					<div className="row mt-4">
						<div className="col">
							<TableContainer component={Paper}>
								<Table>
									<TableHead>
										<TableRow>
											<TableCell sx={{ backgroundColor: "#1976d2", color: "white" }}>Machine ID</TableCell>
											<TableCell sx={{ backgroundColor: "#1976d2", color: "white" }}>Date</TableCell>
											<TableCell sx={{ backgroundColor: "#1976d2", color: "white" }}>Status</TableCell>
											<TableCell sx={{ backgroundColor: "#1976d2", color: "white" }}>
												Next General Repair Date
											</TableCell>
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
														className="me-2"
														onClick={() => handleDeleteClick(machine._id)}
													>
														Delete
													</Button>
													<Button
														variant="contained"
														style={{ backgroundColor: "orange" }}
														onClick={() => handleRouteMachineRepirList(machine)}
													>
														View Repair Details
													</Button>
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
								<div className="d-flex justify-content-end mt-3">
									<TablePagination
										rowsPerPageOptions={[5, 10, 25]}
										component="div"
										count={totalRecords}
										rowsPerPage={rowsPerPage}
										page={page}
										onPageChange={handleChangePage}
										onRowsPerPageChange={handleChangeRowsPerPage}
									/>
								</div>
							</TableContainer>
							<ToastContainer />
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default MachineList;
