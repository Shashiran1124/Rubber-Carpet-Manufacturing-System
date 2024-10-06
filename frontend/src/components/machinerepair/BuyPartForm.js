import React, { useState } from 'react';
import { TextField, Button, Grid, Box, Typography, Divider, Paper } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import axios from 'axios';  // Axios for making HTTP requests
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Head from './Head'; // Importing the Head component
import Sidebar from './Sidebar'; // Importing the Sidebar component

const BuyPartForm = () => {
  const [formData, setFormData] = useState({
    date: null,
    description: '',
    amount: ''
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const descriptionPattern = /^[A-Za-z0-9\s]*$/; 
    const amountPattern = /^\d*\.?\d{0,2}$/; 

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

  const handleDateChange = (name, newValue) => {
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    if (formData.amount === '' || errors.amount || formData.description === '' || errors.description) {
      toast.error('Please fill in all fields correctly before submitting.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8070/Part/add', {
        date: formData.date ? formData.date.format('YYYY-MM-DD') : '',
        description: formData.description,
        amount: formData.amount,
      });

      console.log('Form submitted successfully:', response.data);
      toast.success('Part purchased successfully');
      setTimeout(() => {
        navigate("/Part/all");
      }, 2000);
    } catch (error) {
      console.error('There was an error submitting the form:', error);
      toast.error('Failed to submit form');
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {/* Flexbox layout to arrange Sidebar and content */}
      <Box display="flex" height="100vh">
        {/* Sidebar on the left */}
        <Box sx={{ width: "15%", backgroundColor: "#b0bec5", height: "100vh" }}>
          <Sidebar />
        </Box>

        {/* Main content area */}
        <Box sx={{ width: "85%" }}>
          {/* Head component */}
          <Head />
          <Box display="flex" justifyContent="center" alignItems="center" height="calc(100vh - 64px)"> {/* Adjust height after the head */}
            <ToastContainer />
            <Box sx={{ width: "60%", padding: "20px" }}>
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
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default BuyPartForm;
