import React, { useState } from "react";
import axios from "axios";
import {
    Box,
    TextField,
    Button,
    Typography,
    Divider,
    Grid,
    Paper,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Head from "./Head"; // Import the Head component
import Sidebar from "./Sidebar";

const AddMachine = () => {
    const [machineID, setMachineID] = useState("");
    const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));
    const [status, setStatus] = useState("");
    const [nextGeneralRepairDate, setNextGeneralRepairDate] = useState(null);
    const [error, setError] = useState("");
    const [machineIDError, setMachineIDError] = useState("");

    const navigate = useNavigate();

    const handleMachineIDChange = (e) => {
        const value = e.target.value;
        const regex = /^[a-zA-Z0-9]*$/;
        if (regex.test(value)) {
            setMachineID(value);
            setMachineIDError("");
        } else {
            setMachineIDError("");
        }
    };

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

        if (machineIDError) {
            toast.error("Please fix the validation errors before submitting.");
            return;
        }

        const machineData = {
            machineID,
            date,
            status,
            nextGeneralRepairDate: nextGeneralRepairDate?.format("YYYY-MM-DD"),
        };

        try {
            const response = await axios.post("http://localhost:8070/machine/add", machineData);

            if (response.data.isSuccess) {
                toast.success(response.data.message);
                setMachineID("");
                setStatus("");
                setNextGeneralRepairDate(null);
                setError("");
                setTimeout(() => {
                    navigate("/machine/all");
                }, 2000);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("There was an error adding the machine!", error);
            toast.error("Failed to add machine");
        }
    };

    return (
        <>
            <Head />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Box
                    display="flex"
                    height="100vh"
                    sx={{
                        width: "100vw", // Full width
                        margin: "0", // No margins
                        padding: "0", // No padding
                        overflow: "hidden", // Prevent scrollbars
                    }}
                >
                    {/* Sidebar */}
                    <Box sx={{ width: "15%",  height: "100vh" }}>
                        <Sidebar />
                    </Box>

                    {/* Main content area */}
                    <Box sx={{ width: "85%", padding: "20px", overflow: "auto" }}>
                        <ToastContainer />
                        <Paper elevation={3} sx={{ padding: "20px", height: "100%" }}>
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
                                    onChange={handleMachineIDChange}
                                    required
                                    error={!!machineIDError}
                                    helperText={machineIDError}
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

                                <FormControl fullWidth margin="normal">
                                    <InputLabel>Status</InputLabel>
                                    <Select value={status} label="Status" onChange={(e) => setStatus(e.target.value)} required>
                                        <MenuItem value="Active">Active</MenuItem>
                                        <MenuItem value="InActive">InActive</MenuItem>
                                    </Select>
                                </FormControl>

                                <DatePicker
                                    label="Next General Repair Date"
                                    value={nextGeneralRepairDate}
                                    disablePast
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
        </>
    );
};

export default AddMachine;
