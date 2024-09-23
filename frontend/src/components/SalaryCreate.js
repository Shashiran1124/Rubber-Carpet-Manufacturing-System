import React, { useState } from 'react';
import { TextField, Button, MenuItem, Grid, Box, Typography } from '@mui/material';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//import { Navigate, useNavigate } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const SalaryForm = () => {
  const [formData, setFormData] = useState({
    employeID: '',
    employeName: '',
    month: '',
    basicSalary: '',
    oTHours: '',
    perHoureRate: ''
  });

  const navigate =useNavigate();


  const [error, setError] = useState({
    employeName: false,
    basicSalary: false,
    oTHours: false,
    perHoureRate: false
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateFields = () => {
    const isNameValid = /^[A-Za-z\s]+$/.test(formData.employeName); // Alphabets and spaces only
    const isBasicSalaryValid = /^\d+(\.\d{1,2})?$/.test(formData.basicSalary); // Numbers with optional 2 decimal points
    const isOTHoursValid = /^\d+$/.test(formData.oTHours); // Only digits for OT Hours
    const isPerHoureRateValid = /^\d+(\.\d{1,2})?$/.test(formData.perHoureRate); // Numbers with optional 2 decimal points

    setError({
      employeName: !isNameValid,
      basicSalary: !isBasicSalaryValid,
      oTHours: !isOTHoursValid,
      perHoureRate: !isPerHoureRateValid
    });

    return isNameValid && isBasicSalaryValid && isOTHoursValid && isPerHoureRateValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateFields()) {
      return;
    }

    try {
      await axios.post("http://localhost:8070/salary/add", formData);
      toast.success('Salary record added successfully!');
      //employeID("");
      //employeName("");
      //month("");
      //basicSalary("");
      //oTHours("");
      //perHoureRate("")
      setTimeout(()=>{
        navigate(`/salaryCal/all`);

      },2000);
      
    } catch (err) {
      console.error(err);
      toast.error('Failed to add salary record');
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Add Employee Salary Record
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Employee ID"
              name="employeID"
              value={formData.employeID}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Employee Name"
              name="employeName"
              value={formData.employeName}
              onChange={handleInputChange}
              fullWidth
              required
              error={error.employeName}
              helperText={error.employeName ? 'Name cannot contain numbers or special characters' : ''}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Month"
              name="month"
              value={formData.month}
              onChange={handleInputChange}
              fullWidth
              required
            >
              {months.map((month) => (
                <MenuItem key={month} value={month}>
                  {month}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Basic Salary"
              name="basicSalary"
              value={formData.basicSalary}
              onChange={handleInputChange}
              fullWidth
              required
              error={error.basicSalary}
              helperText={error.basicSalary ? 'Invalid basic salary (numbers only)' : ''}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="OT Hours"
              name="oTHours"
              value={formData.oTHours}
              onChange={handleInputChange}
              fullWidth
              required
              error={error.oTHours}
              helperText={error.oTHours ? 'Invalid OT Hours (numbers only)' : ''}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Per Hour Rate"
              name="perHoureRate"
              value={formData.perHoureRate}
              onChange={handleInputChange}
              fullWidth
              required
              error={error.perHoureRate}
              helperText={error.perHoureRate ? 'Invalid rate (numbers only)' : ''}
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 4 }}>
          <Button type="submit" variant="contained" color="primary">
            Submit Salary Record
          </Button>
        </Box>
      </form>
    <ToastContainer/>  
    </Box>
  );
};

export default SalaryForm;
