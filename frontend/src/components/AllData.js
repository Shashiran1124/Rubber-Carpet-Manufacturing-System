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
		fetchMachines();
	}, [page, rowsPerPage, searchText]);

	const fetchMachines = async () => {
		try {
			const response = await axios.post("http://localhost:8070/machine/", {
				searchText: searchText,
				pageNumber: page === 0 ? 1 : page,
				pageSize: rowsPerPage,
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

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	return (
		<div className="container py-4">
			<div className="row">
				<div className="col">
					<h4 className="mb-3">Machine List</h4>
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
							/>
						</div>
					</div>

					<div className="row mt-4">
						<div className="col">
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
