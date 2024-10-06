import React, { useState } from 'react';
import { TextField, Button, Grid, Box, Typography, Divider, Paper } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import axios from 'axios';  // Axios for making HTTP requests
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const BuyPartForm = () => {
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

    // Regex patterns to validate input
    const descriptionPattern = /^[A-Za-z0-9\s]*$/; // Only letters, numbers, and spaces allowed
    const amountPattern = /^\d*\.?\d{0,2}$/; // Allow digits with optional decimal point and up to 2 decimal places

    if (name === 'description') {
      if (descriptionPattern.test(value)) {
        setFormData({ ...formData, description: value });
        setErrors((prevErrors) => ({ ...prevErrors, description: '' }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          description: 'Description can only contain letters, numbers, and spaces.',
        }));
      }
    }

    if (name === 'amount') {
      if (amountPattern.test(value)) {
        setFormData({ ...formData, amount: value });
        setErrors((prevErrors) => ({ ...prevErrors, amount: '' }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          amount: 'Amount must be a positive number with up to two decimal places.',
        }));
      }
    }

    if (name !== 'description' && name !== 'amount') {
      setFormData({
        ...formData,
        [name]: value,
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
    if (formData.amount === '' || errors.amount || formData.description === '' || errors.description) {
      toast.error('Please fill in all fields correctly before submitting.');
      return;
    }

    try {
      // Post form data to backend
      const response = await axios.post('http://localhost:8070/Part/add', {
        date: formData.date ? formData.date.format('YYYY-MM-DD') : '',
        description: formData.description,
        amount: formData.amount,
      });

      // Log success message or show success notification
      console.log('Form submitted successfully:', response.data);
      toast.success('Part purchased successfully');
      setTimeout(() => {
        navigate("/Part/all");
      }, 2000); // 2-second delay
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
                Machine Part Purchase
              </Typography>
            </Grid>
            <Divider sx={{ margin: "20px 0" }} />

            {/* Form */}
            <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
              {/* Date Picker */}
              <DatePicker
                label="Date"
                value={formData.date}
                disableFuture//
                disablePast//
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

export default BuyPartForm;
