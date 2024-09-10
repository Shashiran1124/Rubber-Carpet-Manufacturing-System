import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Box, Button, Divider, Grid, Paper, TextField, Typography } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const UpdateMachine = () => {
	const { id } = useParams(); // Get ID from URL parameters
	const history = useHistory(); // For redirecting after update
	const [machine, setMachine] = useState({
		machineID: "",
		date: "",
		status: "",
		nextGeneralRepairDate: "",
	});
	const [recordId, setRecordId] = useState("");
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(null);
	const [nextGeneralRepairDate, setNextGeneralRepairDate] = useState(dayjs("2022-04-17"));
	const [machineID, setMachineID] = useState("");
	const [statusError, setStatusError] = useState("");
	const [status, setStatus] = useState("");
	const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));

	useEffect(() => {
		// Fetch current machine details
		axios
			.get(`http://localhost:8070/machine/${id}`)
			.then((response) => {
				setRecordId(response.data._id);
				setMachine(response.data);
				setMachineID(response.data.machineID);
				setStatus(response.data.status);
				setNextGeneralRepairDate(dayjs(response.data.nextGeneralRepairDate.toString()));
				setLoading(false);
			})
			.catch((error) => {
				setError("Error fetching machine details");
				setLoading(false);
			});
	}, [id]);

	const handleChange = (event) => {
		const { name, value } = event.target;
		setMachine((prevMachine) => ({
			...prevMachine,
			[name]: value,
		}));
	};

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

	const handleSubmit = (event) => {
		event.preventDefault();

		const updatedMachine = {
			machineID: machineID,
			date: date,
			status: status,
			nextGeneralRepairDate: nextGeneralRepairDate,
		};

		axios
			.put(`http://localhost:8070/machine/update/${id}`, updatedMachine)
			.then((response) => {
				setSuccess(response.data.status);
				setError(null);
				setTimeout(() => history.push("/"), 2000); // Redirect after 2 seconds
			})
			.catch((error) => {
				setError("Error updating machine details");
				setSuccess(null);
			});
	};

	if (loading) return <p>Loading...</p>;

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<Box display="flex" height="100vh">
				<Box sx={{ width: "80%", padding: "20px" }}>
					<Paper elevation={3} sx={{ padding: "20px" }}>
						<Grid container justifyContent="space-between">
							<Typography variant="h5" sx={{ fontWeight: "bold" }}>
								Machin Update
							</Typography>
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
								onChange={(newValue) => setNextGeneralRepairDate(newValue)}
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

export default UpdateMachine;
