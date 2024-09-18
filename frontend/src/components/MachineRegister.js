import React, { useState } from "react";
import axios from "axios";
import { Box, TextField, Button, Typography, Divider, Grid, Paper } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";//


const AddMachine = () => {
	const [machineID, setMachineID] = useState("");
	const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));
	const [status, setStatus] = useState("");
	const [nextGeneralRepairDate, setNextGeneralRepairDate] = useState(null);
	const [error, setError] = useState("");
	const [statusError, setStatusError] = useState("");

	const navigate = useNavigate();


	const handleDateChange = (date) => {
		const today = dayjs().startOf("day"); // Start of today
		const selectedDate = dayjs(date).startOf("day"); // Start of the selected date

		if (selectedDate.isSame(today) || selectedDate.isBefore(today)) {
			setError("Next General Repair Date must be a future date.");
			setNextGeneralRepairDate(null); // Reset the selected date
		} else {
			setNextGeneralRepairDate(date);
			setError("");
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Validate the status field
		if (status !== "Active" && status !== "InActive") {
			setStatusError('Status must be either "Active" or "InActive".');
			return;
		} else {
			setStatusError("");
		}

		const machineData = {
			machineID,
			date,
			status,
			nextGeneralRepairDate: nextGeneralRepairDate?.format("YYYY-MM-DD"),
		};

		try {
			const response = await axios.post("http://localhost:8070/machine/add", machineData);
			toast.success("Machine added successfully!"); // Success toast message
			// Clear the form fields after success
			setMachineID("");
			setStatus("");
			setNextGeneralRepairDate(null);
			setError("");
			setStatusError("");
            
			 // Delay navigation to allow the toast message to be seen
			setTimeout(() => {
			navigate("/machine/all");
		    }, 2000); // 2000 milliseconds = 2 seconds
			
		} catch (error) {
			console.error("There was an error adding the machine!", error);
			toast.error("Failed to add machine"); // Error toast message
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
								Machine Registration
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
								label="New Machine ID"
								variant="outlined"
								margin="normal"
								value={machineID}
								onChange={(e) => setMachineID(e.target.value)}
								required
							/>
							<TextField
								fullWidth
								label="Date"
								variant="outlined"
								margin="normal"
								value={date}
								InputProps={{
									readOnly: true,
								}}
								required
							/>
							<TextField
								fullWidth
								label="Working Condition"
								variant="outlined"
								margin="normal"
								value={status}
								onChange={(e) => setStatus(e.target.value)}
								error={!!statusError}
								helperText={statusError}
								required
							/>
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
								Submit
							</Button>
						</Box>
					</Paper>
				</Box>
			</Box>
		</LocalizationProvider>
	);
};

export default AddMachine;
