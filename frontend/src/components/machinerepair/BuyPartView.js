import React, { useEffect, useState } from "react";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Box ,TextField} from "@mui/material";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable"; // Import the autotable plugin
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import Sidebar from "./Sidebar"; // Import Sidebar
import Head from "./Head"; // Import Head component

export default function BuyPartView() {
    const [buyPartData, setBuyPartData] = useState([]);

    const [startDate, setStartDate] = useState(dayjs(new Date().toString()));
    const [endDate, setEndDate] = useState(dayjs(new Date().toString()));

    const navigate = useNavigate(); // Initialize navigate function

    useEffect(() => {}, []);

    function getBuyPartView() {
        axios
            .post(`http://localhost:8070/Part/all`, {
                startDate: startDate,
                endDate: endDate,
            })
            .then((res) => {
                console.log(res.data);
                setBuyPartData(res.data);
            })
            .catch((error) => {
                console.error("Error Response Status:", error.response.status);
                alert("An error occurred while fetching the data.");
                console.error(error);
            });
    }

    const handleStartDateChange = (newDate) => {
        setStartDate(newDate);
    };

    const handleEndDateChange = (newDate) => {
        setEndDate(newDate);
    };

    const handleBuyPar = () => {
        getBuyPartView();
    };

    const downloadPdf = () => { //pdf download
        const doc = new jsPDF();
        
        const logo=  "../images/11.png";
        doc.addImage(logo, 'PNG', 130, 0, 80, 80);

        doc.setFontSize(18);
        doc.text("PRI Rubber Industry", 14, 10);
        doc.setFontSize(15);
        doc.text("Brought Machine Parts", 138, 32);

        // Company information at the top of the document
        doc.setFontSize(10);
        doc.text("PRI Rubber Industry", 14, 16);
        doc.text("Biyagama,", 14, 20);
        doc.text("Sri Lanka.", 14, 24);
        doc.text('Tell: +94 22233322', 14, 28); // Phone number
        doc.text('Email:', 14, 32); // Email label
        doc.setTextColor(0, 0, 255); // RGB for blue
        doc.text('prirubberindustry@gmail.com', 24, 32); // Email address
        doc.setTextColor(0, 0, 0); // Reset to black

        const tableColumn = ["Date", "Description", "Amount"];
        const tableRows = [];

        buyPartData.forEach((rowData) => {
            const row = [
                rowData.date,
                rowData.description,
                rowData.amount,
            ];
            tableRows.push(row);
        });

        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 40, // Adjusts where the table starts
            headStyles: {
                fillColor: [0, 0, 255],  // Blue background color for header
                textColor: [255, 255, 255], // White text color for header
                fontSize: 12,  // Font size for header
            },
        });

        const finalY = doc.autoTable.previous.finalY + 20;
        doc.text('...............................................', 14, finalY);
        doc.setFontSize(12);
        doc.text('Mechanical Inspector', 14, finalY + 10); // Placeholder for position

        // Date and signature line at the bottom
        doc.setFontSize(10);
        const currentDate = new Date().toLocaleDateString();
        doc.text(`Date: ${currentDate}`, 14, finalY + 15); // Display current date

        doc.save("buy_part_data.pdf");
    };

    return (
        <Box display="flex" height="100vh">
            {/* Sidebar */}
            <Box sx={{ width: "15%", backgroundColor: "#ffffff", height: "100vh" }}>
                <Sidebar />
            </Box>

            {/* Main content area */}
            <Box sx={{ width: "100%", padding: "0px" }}>
                <Head />  {/* Ensure the Head component takes full width */}
                
                {/* Main Section */}
                <Box sx={{ marginTop: "20px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                        <h3>Machine Part Purchases</h3>

                        {/* Date Pickers and Filter Button */}
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <div style={{ display: "flex", gap: "10px" }}>
                                <DatePicker
                                    label="Start Date"
                                    value={startDate}
                                    onChange={handleStartDateChange}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                                <DatePicker
                                    label="End Date"
                                    value={endDate}
                                    onChange={handleEndDateChange}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                                <Button
                                    variant="contained"
                                    sx={{
                                        backgroundColor: "yellow",
                                        color: "#000",
                                        marginTop: "10px",
                                    }}
                                    onClick={handleBuyPar}
                                >
                                    Filter
                                </Button>
                            </div>
                        </LocalizationProvider>

                        <Button variant="contained" color="primary" onClick={downloadPdf}>
                            Download as PDF
                        </Button>
                    </div>

                    {/* Table */}
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ backgroundColor: '#1976d2', color: 'white' }}>Date</TableCell>
                                    <TableCell sx={{ backgroundColor: '#1976d2', color: 'white' }}>Description</TableCell>
                                    <TableCell sx={{ backgroundColor: '#1976d2', color: 'white' }}>Amount</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {buyPartData.map((rowData) => (
                                    <TableRow key={rowData._id}>
                                        <TableCell>{rowData.date}</TableCell>
                                        <TableCell>{rowData.description}</TableCell>
                                        <TableCell>{rowData.amount}</TableCell>
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
