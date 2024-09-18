import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // Correct import for useParams
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Box, Button, Divider, Grid, Paper, TextField, Typography } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const RepairForm = () => {
	const { id, mid } = useParams();
	const [formData, setFormData] = useState({
		machineID: mid,
		repairStartDate: dayjs(new Date().toString()),
		partName: "",
		repairEndDate: dayjs(new Date().toString()),
		discription: "", // Fixed typo: changed 'discription' to 'description'
	});

	const [errors, setErrors] = useState({});
	const [discription, setDiscription] = useState("");
	const validateForm = () => {
		const newErrors = {};
		const partNamePattern = /^[A-Za-z\s]+$/; // Only letters and spaces allowed

		if (!formData.repairStartDate) newErrors.repairStartDate = "Repair start date is required";
		if (!formData.partName) {
			newErrors.partName = "Part name is required";
		} else if (!partNamePattern.test(formData.partName)) {
			newErrors.partName = "Part name can only contain letters and spaces";
		}
		if (!formData.repairEndDate) newErrors.repairEndDate = "Repair end date is required";
		if (!formData.discription) newErrors.discription = "Description is required";

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		/*if (!validateForm()) {
			alert("Validation failed");
			return;
		}*/

		try {
			await axios.post("http://localhost:8070/repair/add", formData);
			alert("Repair record added successfully");
			setFormData({
				machineID: mid,
				repairStartDate: dayjs(new Date().toString()),
				partName: "",
				repairEndDate: dayjs(new Date().toString()),
				description: "",
			});
		} catch (err) {
			console.error("Error:", err);
			alert("Failed to add repair record");
		}
	};

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<Box display="flex" height="100vh">
				<Box sx={{ width: "80%", padding: "20px" }}>
					<Paper elevation={3} sx={{ padding: "20px" }}>
						<Grid container justifyContent="space-between">
							<Typography variant="h5" sx={{ fontWeight: "bold" }}>
								Add Repair Record
							</Typography>
						</Grid>
						<Divider sx={{ margin: "20px 0" }} />

						<Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
							<DatePicker
								label="Repair Start Date"
								value={formData.repairStartDate}
								onChange={(newValue) => setFormData({ ...formData, repairStartDate: newValue })}
								renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
							/>

							<TextField
								fullWidth
								label="Part Name"
								variant="outlined"
								margin="normal"
								name="partName"
								value={formData.partName}
								onChange={handleChange}
								error={!!errors.partName}
								helperText={errors.partName}
								required
							/>

							<DatePicker
								label="Repair End Date"
								value={formData.repairEndDate}
								onChange={(newValue) => setFormData({ ...formData, repairEndDate: newValue })}
								renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
							/>

							<TextField
								fullWidth
								label="Description"
								variant="outlined"
								margin="normal"
								name="discription"
								value={formData.discription}
								onChange={handleChange}
								error={!!errors.discription}
								helperText={errors.discription}
								required
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

export default RepairForm;
