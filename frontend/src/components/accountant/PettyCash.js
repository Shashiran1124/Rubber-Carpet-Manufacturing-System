import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Box,
  Typography,
  Paper,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"; // Make sure you're using correct adapter
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar"; // Import Sidebar component
import Heder from "./Heder";

const PettyCash = () => {
  const [formData, setFormData] = useState({
    date: null,
    description: "",
    amount: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "description") {
      const cleanValue = value.replace(/[^a-zA-Z0-9\s]/g, ""); // Only letters, numbers, and spaces
      setFormData({ ...formData, [name]: cleanValue });
      setErrors((prevErrors) => ({ ...prevErrors, description: "" }));
    } else if (name === "amount") {
      const cleanValue = value.match(/^\d*\.?\d{0,2}$/) ? value : formData.amount; // Allows digits and up to two decimal points
      setFormData({ ...formData, [name]: cleanValue });
      setErrors((prevErrors) => ({ ...prevErrors, amount: "" }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleDateChange = (name, newValue) => {
    setFormData({ ...formData, [name]: newValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    if (formData.amount === "" || errors.amount) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        amount: "Amount is required and must be valid.",
      }));
      return;
    }

    try {
      const response = await axios.post("http://localhost:8070/PettyCash/add", {
        date: formData.date ? formData.date.format("YYYY-MM-DD") : "",
        description: formData.description,
        amount: formData.amount,
      });

      toast.success("Petty cash entry added successfully");
      setTimeout(() => {
        navigate("/pettyCash/all");
      }, 2000);

      setFormData({
        date: null,
        description: "",
        amount: "",
      });
    } catch (error) {
      console.error("Error submitting the form:", error);
      toast.error("Failed to submit form");
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box display="flex" height="100vh">
        {/* Sidebar */}
        <Box sx={{ width: "15%", backgroundColor: "#f0f0f0", height: "100vh" }}>
          <Sidebar />
        </Box>

        {/* Main content area */}
        <Box sx={{ flex: 1 }}>
          <Heder /> {/* Header component */}
          {/* Form container */}
          <Box sx={{ p: 3, width: "80%", margin: "auto" }}>
            <Paper sx={{ padding: "30px" }} elevation={3}>
              <Typography
                variant="h5"
                gutterBottom
                align="center"
                sx={{ mb: 4, color: "primary.main" }}
              >
                Petty Cash
              </Typography>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    {/* Date Picker */}
                    <DatePicker
                      label="Date"
                      value={formData.date}
                      disablePast
                      disableFuture
                      onChange={(newValue) =>
                        handleDateChange("date", newValue)
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          margin="normal"
                          error={!!errors.date}
                          helperText={errors.date}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    {/* Description */}
                    <TextField
                      fullWidth
                      label="Description"
                      variant="outlined"
                      margin="normal"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      error={!!errors.description}
                      helperText={errors.description}
                      required
                    />
                  </Grid>

                  <Grid item xs={12}>
                    {/* Amount */}
                    <TextField
                      fullWidth
                      label="Amount (SL Rupees)"
                      variant="outlined"
                      margin="normal"
                      name="amount"
                      value={formData.amount}
                      onChange={handleChange}
                      error={!!errors.amount}
                      helperText={errors.amount}
                      required
                    />
                  </Grid>
                </Grid>

                <Box sx={{ mt: 4, textAlign: "center" }}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ width: "50%" }}
                  >
                    Submit
                  </Button>
                </Box>
              </form>
            </Paper>
          </Box>
        </Box>

        <ToastContainer />
      </Box>
    </LocalizationProvider>
  );
};

export default PettyCash;
