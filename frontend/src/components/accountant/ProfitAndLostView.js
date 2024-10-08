import React, { useEffect, useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  Box,
  Typography,
} from "@mui/material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import Sidebar from "./Sidebar"; // Import the Sidebar component
import Heder from "./Heder";

export default function ProfitAndLost() {
  const [incomeData, setincomeData] = useState([]);
  const [expenseData, setexpenseData] = useState([]);

  const [startDate, setStartDate] = useState(dayjs(new Date().toString()));
  const [endDate, setEndDate] = useState(dayjs(new Date().toString()));

  const navigate = useNavigate(); // Initialize navigate function

  useEffect(() => {}, []);

  function fetchProfitAndLostView() {
    axios
      .post(`http://localhost:8070/ProfitAndLost/all`, {
        startDate: startDate,
        endDate: endDate,
      })
      .then((res) => {
        console.log(res);
        setincomeData(res.data.incomeContainer);
        setexpenseData(res.data.expensesContainer);
      })
      .catch((error) => {
        toast.error("An error occurred while fetching the data.");
        console.error(error);
      });
  }

  const handleStartDateChange = (newDate) => {
    setStartDate(newDate);
  };

  const handleEndDateChange = (newDate) => {
    setEndDate(newDate);
  };

  const handleGetIncomeExpenseData = () => {
    fetchProfitAndLostView();
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <Box sx={{ width: "15%", backgroundColor: "#f0f0f0", height: "100vh" }}>
        <Sidebar />
      </Box>

      {/* Main content */}
      <Box sx={{ flex: 1 }}>
        <Heder /> {/* Header */}
        <Box sx={{ p: 3 }}>
          <div>
            <h3>Income And Expense</h3>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Box display="flex" justifyContent="space-between" sx={{ mb: 3 }}>
                <DatePicker
                  label="Start Date"
                  value={startDate}
                  onChange={handleStartDateChange}
                  renderInput={(params) => (
                    <TextField {...params} fullWidth sx={{ mx: 1 }} />
                  )}
                />
                <DatePicker
                  label="End Date"
                  value={endDate}
                  onChange={handleEndDateChange}
                  renderInput={(params) => (
                    <TextField {...params} fullWidth sx={{ mx: 1 }} />
                  )}
                />
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "green",
                    color: "#fff",
                    marginTop: "10px",
                  }}
                  onClick={handleGetIncomeExpenseData}
                >
                  Filter
                </Button>
              </Box>
            </LocalizationProvider>
          </div>
          <ToastContainer />

          <TableContainer component={Paper}>
            <Box display="flex" justifyContent="space-between">
              <Box sx={{ width: "50%", p: 2 }}>
                <Typography variant="h6" color="green">
                  <b>Income</b>
                </Typography>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell
                        sx={{ backgroundColor: "#a5d6a7", color: "white" }}
                      >
                        Date
                      </TableCell>
                      <TableCell
                        sx={{ backgroundColor: "#a5d6a7", color: "white" }}
                      >
                        Description
                      </TableCell>
                      <TableCell
                        sx={{ backgroundColor: "#a5d6a7", color: "white" }}
                      >
                        Amount
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {incomeData.map((incomeRowData) => (
                      <TableRow key={incomeRowData._id}>
                        <TableCell>{incomeRowData.date}</TableCell>
                        <TableCell>{incomeRowData.description}</TableCell>
                        <TableCell>{incomeRowData.amount}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
              <Box sx={{ width: "50%", p: 2 }}>
                <Typography variant="h6" color="red">
                  <b>Expenses</b>
                </Typography>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell
                        sx={{ backgroundColor: "#f28b82", color: "white" }}
                      >
                        Date
                      </TableCell>
                      <TableCell
                        sx={{ backgroundColor: "#f28b82", color: "white" }}
                      >
                        Description
                      </TableCell>
                      <TableCell
                        sx={{ backgroundColor: "#f28b82", color: "white" }}
                      >
                        Amount
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {expenseData.map((expenseRowData) => (
                      <TableRow key={expenseRowData._id}>
                        <TableCell>{expenseRowData.date}</TableCell>
                        <TableCell>{expenseRowData.description}</TableCell>
                        <TableCell>{expenseRowData.amount}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Box>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
}
