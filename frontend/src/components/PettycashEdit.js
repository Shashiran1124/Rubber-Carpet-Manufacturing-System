import React, { useEffect, useState } from 'react';
import { TextField, Button, Grid, Box, Typography, Divider, Paper } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";  // Get the ID from URL params
import dayjs from 'dayjs'; 

const PettycashEdit = () => {
  const { id } = useParams();  // Get the petty cash ID from the URL
  const [formData, setFormData] = useState({
    date: null,
    description: '',
    amount: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the petty cash data based on ID
    axios.get(`http://localhost:8070/pettyCash/${id}`)
      .then((res) => {
        const { date, description, amount } = res.data;
        setFormData({
          date: date ? dayjs(date) : null,  // Ensure date is in the right format for DatePicker
          description,
          amount
        });
      })
      .catch((error) => {
        toast.error("An error occurred while fetching the data.");
        console.error(error);
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateChange = (newValue) => {
    setFormData({
      ...formData,
      date: newValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      // Update the data via PUT request
      await axios.put(`http://localhost:8070/pettyCash/update/${id}`, formData);
      toast.success("Petty Cash updated successfully!");
      setTimeout(() => {
        navigate("/pettyCash/all");  // Redirect back to the list page after successful update
      }, 2000);
    } catch (error) {
      toast.error("An error occurred while updating the data.");
      console.error(error);
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
                Edit Petty Cash
              </Typography>
            </Grid>
            <Divider sx={{ margin: "20px 0" }} />

            <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
              <DatePicker
                label="Date"
                value={formData.date}
                onChange={handleDateChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    margin="normal"
                  />
                )}
              />

              <TextField
                fullWidth
                label="Description"
                variant="outlined"
                margin="normal"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />

              <TextField
                fullWidth
                label="Amount"
                variant="outlined"
                margin="normal"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                required
              />

              <Button
                variant="contained"
                sx={{ backgroundColor: "#7e57c2", color: "#fff", marginTop: "20px" }}
                fullWidth
                type="submit"
              >
                Update
              </Button>
            </Box>
          </Paper>
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default PettycashEdit;
