import React, { useState } from 'react';
import { TextField, Button, Grid, Box, Typography, Divider, Paper } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import axios from 'axios';  // Axios for making HTTP requests
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const PettyCash = () => {
  // State to manage form data
  const [formData, setFormData] = useState({
    date: null,
    description: '',
    amount: ''
  });

  // State for errors
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle the description field to prevent special characters
    if (name === 'description') {
      const cleanValue = value.replace(/[^a-zA-Z0-9\s]/g, ''); // Only allows letters, numbers, and spaces
      setFormData({
        ...formData,
        [name]: cleanValue
      });
      setErrors((prevErrors) => ({ ...prevErrors, description: '' })); // Reset any previous errors for description
    }

    // Handle the amount field to prevent letters and special characters
    else if (name === 'amount') {
      const cleanValue = value.replace(/[^0-9]/g, ''); // Only allows digits (no letters or special characters)
      setFormData({
        ...formData,
        [name]: cleanValue
      });
      setErrors((prevErrors) => ({ ...prevErrors, amount: '' })); // Reset any previous errors for amount
    }

    // Default case for other fields (if any)
    else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  // Handle date picker change
  const handleDateChange = (name, newValue) => {
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    // Check if there are any validation errors before submitting
    if (formData.amount === '' || errors.amount) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        amount: 'Amount is required and must be valid.',
      }));
      return;
    }

    try {
      // Post form data to backend
      const response = await axios.post('http://localhost:8070/PettyCash/add', {
        date: formData.date ? formData.date.format('YYYY-MM-DD') : '',
        description: formData.description,
        amount: formData.amount,
      });

      // Log success message or show success notification
      console.log('Form submitted successfully:', response.data);
      toast.success('Petty cash entry added successfully');
      setTimeout(() => {
        navigate("/pettyCash/all");
      }, 2000); //2 second delay
      setFormData({
        date: null,
        description: '',
        amount: ''
      });

    } catch (error) {
      console.error('There was an error submitting the form:', error);
      toast.error('Failed to submit form');
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box display="flex" height="100vh" justifyContent="center" alignItems="center">
        <ToastContainer />
        <Box sx={{ width: "80%", padding: "20px" }}>
          <Paper elevation={3} sx={{ padding: "20px" }}>
            <Grid container justifyContent="space-between">
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                Petty Cash
              </Typography>
            </Grid>
            <Divider sx={{ margin: "20px 0" }} />

            {/* Form */}
            <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
              {/* Date Picker */}
              <DatePicker
                label="Date"
                value={formData.date}
                disablePast//pat date cant enter
                onChange={(newValue) => handleDateChange('date', newValue)}
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
    </LocalizationProvider>
  );
};

export default PettyCash;
