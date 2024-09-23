import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, TextField, Button, Typography, Divider, Grid, Paper, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";

const UpdateMachine = () => {
	const [machineID, setMachineID] = useState("");
	const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));
	const [status, setStatus] = useState(""); // State dropdown (Active or InActive)
	const [nextGeneralRepairDate, setNextGeneralRepairDate] = useState(null);
	const [error, setError] = useState("");

	const navigate = useNavigate();
	const { id } = useParams(); // Get the machine ID from the URL params

	useEffect(() => {
		// Fetch existing machine data based on ID
		const fetchMachineData = async () => {
			try {
				const response = await axios.get(`http://localhost:8070/machine/${id}`);
				const machine = response.data;

				setMachineID(machine.machineID);
				setDate(machine.date);
				setStatus(machine.status);
				setNextGeneralRepairDate(dayjs(machine.nextGeneralRepairDate));
			} catch (error) {
				console.error("Error fetching machine data!", error);
			}
		};

		fetchMachineData();
	}, [id]);

	const handleDateChange = (date) => {
		const today = dayjs().startOf("day");
		const selectedDate = dayjs(date).startOf("day");

		if (selectedDate.isSame(today) || selectedDate.isBefore(today)) {
			setError("Next General Repair Date must be a future date.");
			setNextGeneralRepairDate(null);
		} else {
			setNextGeneralRepairDate(date);
			setError("");
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const updatedMachineData = {
			machineID,
			date,
			status,
			nextGeneralRepairDate: nextGeneralRepairDate?.format("YYYY-MM-DD"),
		};

		try {
			await axios.put(`http://localhost:8070/machine/update/${id}`, updatedMachineData);
			toast.success("Machine updated successfully!");

			setTimeout(() => {
				navigate("/machine/all"); // Navigate to the machine list after success
			}, 2000);
		} catch (error) {
			console.error("Error updating machine!", error);
			toast.error("Failed to update machine");
		}
	};

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<Box display="flex" height="100vh">
				<ToastContainer />
				<Box sx={{ width: "80%", padding: "20px" }}>
					<Paper elevation={3} sx={{ padding: "20px" }}>
						<Grid container justifyContent="space-between">
							<Typography variant="h5" sx={{ fontWeight: "bold" }}>
								Update Machine Information
							</Typography>
							<Paper
								elevation={1}
								sx={{
									padding: "5px 10px",
									backgroundColor: "#e0f2f1",
									display: "inline-block",
								}}
							>
								{date}
							</Paper>
						</Grid>
						<Divider sx={{ margin: "20px 0" }} />

						<Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
							<TextField
								fullWidth
								label="Machine ID"
								variant="outlined"
								margin="normal"
								value={machineID}
								onChange={(e) => setMachineID(e.target.value)}
								InputProps={{
									readOnly: true, // Disable editing of Machine ID
								}}
								required
							/>

							<TextField
								fullWidth
								label="Date"
								variant="outlined"
								margin="normal"
								value={date}
								InputProps={{
									readOnly: true, // Disable editing of date
								}}
								required
							/>

							{/* Dropdown for Status */}
							<FormControl fullWidth margin="normal">
								<InputLabel>Status</InputLabel>
								<Select
									value={status}
									label="Status"
									onChange={(e) => setStatus(e.target.value)}
									required
								>
									<MenuItem value="Active">Active</MenuItem>
									<MenuItem value="InActive">InActive</MenuItem>
								</Select>
							</FormControl>

							<DatePicker
								label="Next General Repair Date"
								value={nextGeneralRepairDate}
								onChange={handleDateChange}
								renderInput={(params) => (
									<TextField {...params} fullWidth margin="normal" error={!!error} helperText={error} required />
								)}
							/>
							<Button
								variant="contained"
								sx={{ backgroundColor: "#7e57c2", color: "#fff", marginTop: "20px" }}
								fullWidth
								type="submit"
							>
								Update Machine
							</Button>
						</Box>
					</Paper>
				</Box>
			</Box>
		</LocalizationProvider>
	);
};

export default UpdateMachine;
