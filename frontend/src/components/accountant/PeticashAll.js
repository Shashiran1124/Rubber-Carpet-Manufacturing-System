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
  Box,
  Typography,
} from "@mui/material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import Sidebar from "./Sidebar"; // Import Sidebar
import Heder from "./Heder";

export default function PettycashAll() {
  const [pettycashData, setpettycashData] = useState([]);
  const navigate = useNavigate(); // Initialize navigate function

  useEffect(() => {
    function fetchPettycashAll() {
      axios
        .get(`http://localhost:8070/pettyCash/all`)
        .then((res) => {
          setpettycashData(res.data);
        })
        .catch((error) => {
          toast.error("An error occurred while fetching the data.");
          console.error(error);
        });
    }

    fetchPettycashAll();
  }, []);

  const downloadPDF = () => {
    const doc = new jsPDF();
  
    doc.setFontSize(18);
    doc.text("PRI Rubber Industry", 14, 10);
    doc.setFontSize(15);
    doc.text("Petty Cash", 170, 32);

    // Company information at the top of the document
    doc.setFontSize(10);
    doc.text("PRI Rubber Industry,", 14, 16);
    doc.text("Biyagama,", 14, 20);
    doc.text("Sri Lanka.", 14, 24);
    doc.text("Tell: +94 235689235", 14, 28); // Phone number
    doc.text("Email:", 14, 32);
    doc.setTextColor(0, 0, 255);
    doc.text("prirubberindustry@gmail.com", 24, 32);
    doc.setTextColor(0, 0, 0);


    const tableColumn = ["Date", "Description", "Amount"];
    const tableRows = [];

    pettycashData.forEach((rowData) => {
      const row = [rowData.date, rowData.description, rowData.amount];
      tableRows.push(row);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 39,
      headStyles: {
        fillColor: [0, 0, 255],
        textColor: [255, 255, 255],
        fontSize: 12,
      },
    });

    const finalY = doc.autoTable.previous.finalY + 20;
    doc.text("...............................................", 14, finalY);
    doc.setFontSize(12);
    doc.text("Finance Manager", 14, finalY + 10);

    const currentDate = new Date().toLocaleDateString();
    doc.setFontSize(10);
    doc.text(`Date: ${currentDate}`, 14, finalY + 15);

    doc.save("pettycash_data.pdf");
  };

  const handleEdit = (id) => {
    navigate(`/pettyCash/update/${id}`); // Navigate to the edit page with the selected ID
  };

  return (
    <Box display="flex" height="100vh">
      {/* Sidebar */}
      <Box sx={{ width: "15%", backgroundColor: "#f0f0f0", height: "100vh" }}>
        <Sidebar />
      </Box>

      {/* Main Content Area */}
      <Box sx={{ flex: 1 }}>
        <Heder /> {/* Header */}
        {/* Page Content */}
        <Box sx={{ p: 3 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Petty Cash Records
            </Typography>
            <Button variant="contained" color="primary" onClick={downloadPDF}>
              Download PDF
            </Button>
          </Box>
          <ToastContainer />

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{ backgroundColor: "#1976d2", color: "white" }}
                  >
                    Date
                  </TableCell>
                  <TableCell
                    sx={{ backgroundColor: "#1976d2", color: "white" }}
                  >
                    Description
                  </TableCell>
                  <TableCell
                    sx={{ backgroundColor: "#1976d2", color: "white" }}
                  >
                    Amount
                  </TableCell>
                  <TableCell
                    sx={{ backgroundColor: "#1976d2", color: "white" }}
                  >
                    Actions
                  </TableCell>{" "}
                  {/* Actions column */}
                </TableRow>
              </TableHead>
              <TableBody>
                {pettycashData.map((rowData) => (
                  <TableRow key={rowData._id}>
                    <TableCell>{rowData.date}</TableCell>
                    <TableCell>{rowData.description}</TableCell>
                    <TableCell>{rowData.amount}</TableCell>
                    <TableCell>
                      {/* Edit Button */}
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleEdit(rowData._id)} // Pass ID to handleEdit
                      >
                        Edit
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
