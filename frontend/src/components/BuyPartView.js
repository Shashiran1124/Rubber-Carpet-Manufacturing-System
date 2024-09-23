import React, { useEffect, useState } from "react";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from "@mui/material";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable"; // Import the autotable plugin

export default function BuyPartView() {
    const [buyPartData, setBuyPartData] = useState([]);

    useEffect(() => {
        function getBuyPartView() {
            axios.get(`http://localhost:8070/Part/all`)
                .then((res) => {
                    console.log(res);
                    setBuyPartData(res.data);
                })
                .catch((error) => {
                    alert("An error occurred while fetching the data.");
                    console.error(error);
                });
        }

        getBuyPartView(); // Fetch the data when component is mounted
    }, []);

    const downloadPdf = () => {
        const doc = new jsPDF();
        doc.text("Current Month Bought Parts", 14, 10);

        // AutoTable expects an array of rows and an array of headers
        const tableColumn = ["Date", "Description", "Amount"];
        const tableRows = [];

        buyPartData.forEach(rowData => {
            const row = [
                rowData.date,
                rowData.description,
                rowData.amount
            ];
            tableRows.push(row);
        });

        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 20, // Adjusts where the table starts
            headStyles: {
                fillColor: [0, 0, 255],  // Blue background color for header
                textColor: [255, 255, 255], // White text color for header
                fontSize: 12,  // Font size for header
            }
        });

        doc.save("buy_part_data.pdf");
    };

    return (
        <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3>Machine Part Purchases</h3>
                <Button variant="contained" color="primary" onClick={downloadPdf}>
                    Download as PDF
                </Button>
            </div>
            <br />

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
        </>
    );
}
