import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // Correct import for useParams
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Box, Button, Divider, Grid, Paper, TextField, Typography } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar"; // Import Sidebar
import Head from "./Head"; // Import Head

const RepairForm = () => {
	const { id, mid } = useParams();
	const [formData, setFormData] = useState({
		machineID: mid,
		repairStartDate: dayjs(new Date().toString()),
		partName: "",
		repairEndDate: dayjs(new Date().toString()),
		discription: "",
	});
	const navigate = useNavigate();

	const [errors, setErrors] = useState({});

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

		// Regex patterns to prevent special characters
		const partNamePattern = /^[A-Za-z\s]*$/; // Only letters and spaces
		const descriptionPattern = /^[A-Za-z0-9\s]*$/; // Only letters, numbers, and spaces

		if (name === "partName") {
			if (partNamePattern.test(value)) {
				setFormData({ ...formData, [name]: value });
			}
		} else if (name === "discription") {
			if (descriptionPattern.test(value)) {
				setFormData({ ...formData, [name]: value });
			}
		} else {
			setFormData({ ...formData, [name]: value });
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			await axios.post("http://localhost:8070/repair/add", formData);
			toast.success("Repair record added successfully");
			setFormData({
				machineID: mid,
				repairStartDate: dayjs(new Date().toString()),
				partName: "",
				repairEndDate: dayjs(new Date().toString()),
				description: "",
			});
			setTimeout(() => {
				navigate("/machine/all");
			}, 2000); // 2000 milliseconds = 2 seconds
		} catch (err) {
			console.error("Error:", err);
			toast.error("Failed to add repair record");
		}
	};

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<Box display="flex" height="100vh">
				{/* Sidebar */}
				<Box sx={{ width: "15%", backgroundColor: "#b0bec5", height: "100vh", position: "fixed" }}>
					<Sidebar />
				</Box>

				{/* Main content area */}
				<Box sx={{ width: "85%", marginLeft: "15%", padding: "0px" }}>
					<Head />
					<ToastContainer />

					<Box sx={{ width: "100%", padding: "20px" }}>
						<Paper elevation={3} sx={{ padding: "20px" }}>
							<Grid container justifyContent="space-between">
								<Typography variant="h5" sx={{ fontWeight: "bold" }}>
									Add Repair Record
								</Typography>
							</Grid>
							<Divider sx={{ margin: "20px 0" }} />

							<Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
								{/* Repair Start Date */}
								<DatePicker
									label="Repair Start Date"
									value={formData.repairStartDate}
									disablePast
									onChange={(newValue) => setFormData({ ...formData, repairStartDate: newValue })}
									renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
								/>

								{/* Part Name */}
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

								{/* Repair End Date */}
								<DatePicker
									label="Repair End Date"
									value={formData.repairEndDate}
									disablePast
									onChange={(newValue) => setFormData({ ...formData, repairEndDate: newValue })}
									renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
								/>

								{/* Description */}
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

								{/* Submit Button */}
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
			</Box>
		</LocalizationProvider>
	);
};

export default RepairForm;
