import React, { useEffect, useState } from "react";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Box } from "@mui/material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useNavigate } from "react-router-dom";  // Import useNavigate from react-router-dom

export default function PettycashAll() {
    const [pettycashData, setpettycashData] = useState([]);
    const navigate = useNavigate();  // Initialize navigate function

    useEffect(() => {
        function fetchPettycashAll() {
            axios.get(`http://localhost:8070/pettyCash/all`)
                .then((res) => {
                    console.log(res);
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

        doc.setFontSize(18);  // Set font size for the title
        doc.text("Petty Cash", 14, 22);  // Add title at x: 14, y: 22 (position coordinates)

        doc.setFontSize(18);  // Set a smaller font size for the company name
        doc.text("PRI Rubber Indrustry", 138, 22);  // Add company name at x: 120 (adjust as necessary), y: 22
    

        const tableColumn = ["Date", "Description", "Amount"];
        const tableRows = [];

        pettycashData.forEach((rowData) => {
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
            startY:30,
            handleStyle:{
                fillColor:[0,0,255],
                textCollor:[255,255,255],
                fontSize:12,
            }

        });

        doc.save("pettycash_data.pdf");
    };

    // Handle Edit button click, navigate to the update form with selected row data
    const handleEdit = (id) => {
        navigate(`/pettyCash/update/${id}`);  // Pass the ID to the edit page
    };

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <h3>Petty Cash</h3>
                <Button variant="contained" color="primary" onClick={downloadPDF}>
                    Download PDF
                </Button>
            </Box>
            <ToastContainer />

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ backgroundColor: '#1976d2', color: 'white' }}>Date</TableCell>
                            <TableCell sx={{ backgroundColor: '#1976d2', color: 'white' }}>Description</TableCell>
                            <TableCell sx={{ backgroundColor: '#1976d2', color: 'white' }}>Amount</TableCell>
                            <TableCell sx={{ backgroundColor: '#1976d2', color: 'white' }}>Actions</TableCell> {/* Add a column for actions */}
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
                                        onClick={() => handleEdit(rowData._id)}  // Passing the ID to handleEdit
                                    >
                                        Edit
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
