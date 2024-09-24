import React, { useState } from 'react';
import { TextField, Button, MenuItem, Grid, Box, Typography } from '@mui/material';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

  const [errors, setErrors] = useState({
    employeID: '',
    employeName: '',
    basicSalary: '',
    oTHours: '',
    perHoureRate: ''
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Prevent unwanted characters from being typed
    let cleanValue = value;

    switch (name) {
      case 'employeID':
        cleanValue = cleanValue.replace(/[^a-zA-Z0-9]/g, ''); // Only letters and numbers
        break;
      case 'employeName':
        cleanValue = cleanValue.replace(/[^a-zA-Z\s]/g, ''); // Only letters and spaces
        break;
      case 'basicSalary':
      case 'perHoureRate':
        cleanValue = cleanValue.replace(/[^0-9.]/g, ''); // Only numbers and decimal point
        break;
      case 'oTHours':
        cleanValue = cleanValue.replace(/[^0-9]/g, ''); // Only numbers
        break;
      default:
        break;
    }

    // Update formData with cleaned input
    setFormData((prevData) => ({
      ...prevData,
      [name]: cleanValue
    }));

    // Validate after setting the state
    switch (name) {
      case 'employeID':
        const idPattern = /^[A-Za-z0-9]*$/; // No special characters
        if (!idPattern.test(cleanValue)) {
          setErrors((prevErrors) => ({ ...prevErrors, employeID: 'Employee ID can only contain letters and numbers.' }));
        } else {
          setErrors((prevErrors) => ({ ...prevErrors, employeID: '' }));
        }
        break;

      case 'employeName':
        const namePattern = /^[A-Za-z\s]*$/; // Alphabets and spaces only, no numbers or special characters
        if (!namePattern.test(cleanValue)) {
          setErrors((prevErrors) => ({ ...prevErrors, employeName: 'Name can only contain letters and spaces.' }));
        } else {
          setErrors((prevErrors) => ({ ...prevErrors, employeName: '' }));
        }
        break;

      case 'basicSalary':
        const salaryPattern = /^\d*\.?\d{0,2}$/; // Numbers with optional 2 decimal places
        if (!salaryPattern.test(cleanValue)) {
          setErrors((prevErrors) => ({ ...prevErrors, basicSalary: 'Invalid salary (e.g., 100 or 100.50).' }));
        } else {
          setErrors((prevErrors) => ({ ...prevErrors, basicSalary: '' }));
        }
        break;

      case 'oTHours':
        const otHoursPattern = /^\d*$/; // Only digits (no letters or special characters)
        if (!otHoursPattern.test(cleanValue)) {
          setErrors((prevErrors) => ({ ...prevErrors, oTHours: 'Invalid OT hours (numbers only).' }));
        } else {
          setErrors((prevErrors) => ({ ...prevErrors, oTHours: '' }));
        }
        break;

      case 'perHoureRate':
        const perHourPattern = /^\d*\.?\d{0,2}$/; // Numbers with optional 2 decimal places
        if (!perHourPattern.test(cleanValue)) {
          setErrors((prevErrors) => ({ ...prevErrors, perHoureRate: 'Invalid rate (e.g., 10 or 10.50).' }));
        } else {
          setErrors((prevErrors) => ({ ...prevErrors, perHoureRate: '' }));
        }
        break;

      default:
        setFormData((prevData) => ({ ...prevData, [name]: cleanValue }));
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // If there are errors, prevent submission
    if (Object.values(errors).some((error) => error !== '')) {
      toast.error('Please fix the validation errors before submitting.');
      return;
    }

    try {
      await axios.post("http://localhost:8070/salary/add", formData);
      toast.success('Salary record added successfully!');
      setTimeout(() => {
        navigate(`/salaryCal/all`);
      }, 2000);
    } catch (err) {
      console.error(err);
      toast.error('Failed to add salary record');
    }
  };

  return (
    <Box sx={{ mt: 4, p: 4, borderRadius: 2, boxShadow: 3, maxWidth: '800px', mx: 'auto' }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4, color: 'primary.main' }}>
        Add Employee Salary Record
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Employee ID"
              name="employeID"
              value={formData.employeID}
              onChange={handleInputChange}
              fullWidth
              required
              error={Boolean(errors.employeID)}
              helperText={errors.employeID}
              sx={{ bgcolor: 'background.paper' }}
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
              error={Boolean(errors.employeName)}
              helperText={errors.employeName}
              sx={{ bgcolor: 'background.paper' }}
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
              sx={{ bgcolor: 'background.paper' }}
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
              error={Boolean(errors.basicSalary)}
              helperText={errors.basicSalary}
              sx={{ bgcolor: 'background.paper' }}
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
              error={Boolean(errors.oTHours)}
              helperText={errors.oTHours}
              sx={{ bgcolor: 'background.paper' }}
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
              error={Boolean(errors.perHoureRate)}
              helperText={errors.perHoureRate}
              sx={{ bgcolor: 'background.paper' }}
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Button type="submit" variant="contained" color="primary" sx={{ width: '50%' }}>
            Submit Salary Record
          </Button>
        </Box>
      </form>
      <ToastContainer />
    </Box>
  );
};

export default SalaryForm;
