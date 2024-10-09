import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Box,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./Sidebar"; // Import Sidebar
import Heder from "./Heder";

export default function SalaryView() {
  const [salaryViewData, setSalaryView] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [filteredData, setFilteredData] = useState([]); // State for filtered data

  // Fetch salary data
  useEffect(() => {
    getSalaryView();
  }, []);

  function getSalaryView() {
    axios
      .get(`http://localhost:8070/salaryy/all`)//payroll
      .then((res) => {
        setSalaryView(res.data);
        setFilteredData(res.data); // Initially, show all data
      })
      .catch((error) => {
        alert("An error occurred while fetching the data.");
        console.error(error);
      });
  }

  // Delete function
  const handleDeleteClick = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this salary record?"
    );

    if (confirmDelete) {
      try {
        const response = await axios.delete(
          `http://localhost:8070/salaryy/delete/${id}`//
        );
        if (response.status === 200) {
          toast.success("Salary record deleted successfully!");

          getSalaryView();
        }
      } catch (error) {
        console.error("Error deleting the record:", error);
        toast.error("Failed to delete the salary record.");
      }
    }
  };

  // Handle search
  const handleSearchChange = (e) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);

    if (searchValue === "") {
      setFilteredData(salaryViewData); // If search is empty, show all data
    } else {
      const filtered = salaryViewData.filter(
        (item) =>
          item.employeID.toLowerCase().includes(searchValue.toLowerCase()) // Filter based on Employee ID
      );
      setFilteredData(filtered);
    }
  };

  return (
    <Box display="flex" height="100vh">
      {/* Sidebar */}
      <Box sx={{ width: "15%", backgroundColor: "#f0f0f0", height: "100vh" }}>
        <Sidebar />
      </Box>

      {/* Main content area */}
      <Box sx={{ flex: 1 }}>
        <Heder />

        {/* Search and Table Container */}
        <Box sx={{ p: 3, width: "90%", margin: "auto" }}>
          {/* Search bar */}
          <TextField
            label="Search by Employee ID"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ marginBottom: "20px", width: "100%" }}
          />

          <ToastContainer />

          {/* Salary Table */}
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{ backgroundColor: "#1976d2", color: "white" }}
                  >
                    Employee ID
                  </TableCell>
                  <TableCell
                    sx={{ backgroundColor: "#1976d2", color: "white" }}
                  >
                    Employee Name
                  </TableCell>
                  <TableCell
                    sx={{ backgroundColor: "#1976d2", color: "white" }}
                  >
                    Month
                  </TableCell>
                  <TableCell
                    sx={{ backgroundColor: "#1976d2", color: "white" }}
                  >
                    Basic Salary
                  </TableCell>
                  <TableCell
                    sx={{ backgroundColor: "#1976d2", color: "white" }}
                  >
                    ETF Amount
                  </TableCell>
                  <TableCell
                    sx={{ backgroundColor: "#1976d2", color: "white" }}
                  >
                    EPF Amount
                  </TableCell>
                  <TableCell
                    sx={{ backgroundColor: "#1976d2", color: "white" }}
                  >
                    OT Amount
                  </TableCell>
                  <TableCell
                    sx={{ backgroundColor: "#1976d2", color: "white" }}
                  >
                    Net Salary
                  </TableCell>
                  <TableCell
                    sx={{ backgroundColor: "#1976d2", color: "white" }}
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.map((rowData) => (
                  <TableRow key={rowData.id}>
                    <TableCell>{rowData.employeID}</TableCell>
                    <TableCell>{rowData.employeeName}</TableCell>
                    <TableCell>{rowData.month}</TableCell>
                    <TableCell>{rowData.basicSalary}</TableCell>
                    <TableCell>{rowData.etfAmount}</TableCell>
                    <TableCell>{rowData.epfAmount}</TableCell>
                    <TableCell>{rowData.ot}</TableCell>
                    <TableCell>{rowData.grossSalary}</TableCell>

                    <TableCell>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDeleteClick(rowData.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
}
