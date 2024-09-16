import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Box, Button, Divider, Grid, Paper, styled, TextField, Typography } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import dayjs from "dayjs";

const RepairForm = () => {
	const { id, mid } = useParams();
	const [formData, setFormData] = useState({
		machineID: mid,
		repairStartDate: "",
		partName: "",
		repairEndDate: "",
		discription: "",
	});

	const [machineID, setMachineID] = useState("");
	const [repairStartDate, setRepairStartDate] = useState(dayjs(new Date().toString()));
	const [partName, setPartName] = useState("");
	const [repairEndDate, setRepairEndDate] = useState(dayjs(new Date().toString()));
	const [discription, setDiscription] = useState("");
	const [errors, setErrors] = useState({});
	//const [statusError, setStatusError] = useState("");

	const validateForm = () => {
		const newErrors = {};
		const partNamePattern = /^[A-Za-z\s]+$/; // Only letters and spaces allowed

		if (!formData.repairStartDate) newErrors.repairStartDate = "";
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
		/* 	if (!validateForm()) {
			alert("Validation Faild");
			return;
		}
 */
		const repairData = {
			machineID: mid,
			repairStartDate: repairStartDate,
			partName: partName,
			repairEndDate: repairEndDate,
			discription: discription,
		};

		try {
			await axios.post("http://localhost:8070/repair/add", repairData);
			alert("Repair record added successfully");
			setRepairStartDate(dayjs(new Date().toString()));
			setPartName("");
			setRepairEndDate(dayjs(new Date().toString()));
			setDiscription("");
		} catch (err) {
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
								value={repairStartDate}
								onChange={(newValue) => setRepairStartDate(newValue)}
							/>
							<TextField
								fullWidth
								label="Part Name"
								variant="outlined"
								margin="normal"
								value={partName}
								onChange={(event) => setPartName(event.target.value)}
								required
							/>
							<DatePicker
								label="Repair End Date"
								value={repairEndDate}
								onChange={(newValue) => setRepairEndDate(newValue)}
							/>

							<TextField
								fullWidth
								label="Description"
								variant="outlined"
								margin="normal"
								value={discription}
								onChange={(event) => setDiscription(event.target.value)}
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
