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
} from "@mui/material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

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

  const handleGetInconExpenseData = () => {
    fetchProfitAndLostView();
  };

  return (
    <div>
      <div>
        <h3>Income And Expense</h3>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div className="row">
            <div className="col-4">
              <DatePicker
                label="Start Date"
                value={startDate}
                onChange={handleStartDateChange}
              />
            </div>
            <div className="col-4">
              <DatePicker
                label="End Date"
                value={endDate}
                onChange={handleEndDateChange}
              />
            </div>
            <div className="col-4">
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "green",
                  color: "#fff",
                  marginTop: "10px",
                }}
                type="button"
                onClick={handleGetInconExpenseData}
              >
                Filter
              </Button>
            </div>
          </div>
        </LocalizationProvider>
      </div>
      <ToastContainer />

      <br />

      <TableContainer component={Paper}>
        <div className="row">
          <div className="col-6">
            <div className="p-2">
              <p style={{ color: "green" }}>
                <b>Income</b>
              </p>
            </div>

            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell> Description</TableCell>
                  <TableCell>Amount</TableCell>
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
          </div>
          <div className="col-6">
            <div className="p-2">
              <p style={{ color: "Red" }}>
                <b>Expenses</b>
              </p>
            </div>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell> Description</TableCell>
                  <TableCell>Amount</TableCell>
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
          </div>
        </div>
      </TableContainer>
    </div>
  );
}
