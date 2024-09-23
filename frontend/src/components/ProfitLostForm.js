import React, { useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Typography,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"; // Use Day.js adapter
import dayjs from "dayjs"; // Import Day.js
import axios from "axios"; // Import Axios
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProfitLostForm = () => {
  const [formData, setFormData] = useState({
    date: dayjs(), // Initialize with Day.js instead of new Date()
    type: "",
    description: "",
    amount: "",
  });

  const [errors, setErrors] = useState({ amount: "" }); // To handle validation errors
  const [serverResponse, setServerResponse] = useState(""); // To handle server responses (success or error)

  // Handle input changes with validation for amount
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validation for 'amount' field to allow only numbers and up to 2 decimal places
    if (name === "amount") {
      const amountPattern = /^\d*\.?\d{0,2}$/; // Allow only numbers with up to 2 decimal places

      // If the value is valid according to the pattern, update the state
      if (amountPattern.test(value)) {
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));

        // Clear any previous error if the input is valid
        setErrors((prevErrors) => ({
          ...prevErrors,
          amount: "",
        }));
      } else {
        // Set error if the input is invalid
        setErrors({
          amount: "Amount must be a valid number (e.g., 100 or 100.50)",
        });
      }
    }
  };

  // Handle date change
  const handleDateChange = (newDate) => {
    setFormData({
      ...formData,
      date: newDate, // Day.js object
    });
  };

  // Submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (errors.amount) {
      toast.error("Please fix the amount error before submitting.");
      return;
    }

    // Axios POST request to backend
    try {
      const response = await axios.post(
        "http://localhost:8070/ProfitAndLost/add",
        formData
      );

      // If successful, handle success response
      if (response.status === 201) {
        toast.success("Entry added successfully");
        console.log("Form submitted:", formData);
      }
    } catch (error) {
      // If there's an error, handle the error response
      toast.error("Entry submission failed. Try again!");
      console.error("Error during form submission:", error);
    }
  };

  return (
    <Grid container justifyContent="center" sx={{ mt: 5 }}>
      <ToastContainer />
      <Grid item xs={12} md={6}>
        <Card elevation={3} sx={{ padding: 2 }}>
          <CardContent>
            <Typography variant="h4" align="center" gutterBottom>
              Income and Expense
            </Typography>

            <form onSubmit={handleSubmit}>
              {/* Date Picker */}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date"
                  value={formData.date}
                  onChange={handleDateChange}
                  renderInput={(params) => (
                    <TextField {...params} fullWidth margin="normal" />
                  )}
                />
              </LocalizationProvider>

              {/* Type (Dropdown) */}
              <TextField
                select
                label="Type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              >
                <MenuItem value="income">Income</MenuItem>
                <MenuItem value="expense">Expense</MenuItem>
              </TextField>

              {/* Description */}
              <TextField
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />

              {/* Amount with validation */}
              <TextField
                label="Amount"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                error={!!errors.amount}
                helperText={errors.amount}
                fullWidth
                margin="normal"
                required
                inputProps={{ inputMode: "decimal" }} // Allow numeric input with decimal
              />

              {/* Submit Button */}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
              >
                Add Entry
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ProfitLostForm;
