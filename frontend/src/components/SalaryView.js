import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      .get(`http://localhost:8070/salary/all`)
      .then((res) => {
        console.log(res);
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
    console.log(id);
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (confirmDelete) {
      try {
        const response = await axios.delete(
          `http://localhost:8070/salary/delete/${id}`
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
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TextField
          label="Search by Employee ID"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ marginBottom: "20px", width: "1000px" }}
        />
      </div>
      <ToastContainer />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Employee ID</TableCell>
              <TableCell>Employee Name</TableCell>
              <TableCell>Month</TableCell>
              <TableCell>Basic Salary</TableCell>
              <TableCell>ETF Amount</TableCell>
              <TableCell>EPF Amount</TableCell>
              <TableCell>OT Amount</TableCell>
              <TableCell>Net Salary</TableCell>
              <TableCell>Action</TableCell>
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
    </>
  );
}
