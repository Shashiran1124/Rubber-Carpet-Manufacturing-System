import React, { useEffect, useState } from "react";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from "@mui/material";
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
        });

        doc.save("pettycash_data.pdf");
    };

    // Handle Edit button click, navigate to the update form with selected row data
    const handleEdit = (id) => {
        navigate(`/pettyCash/update/${id}`);  // Pass the ID to the edit page
    };

    return (
        <>
            <div>
                <h3>Petty Cash</h3>
                <Button variant="contained" color="primary" onClick={downloadPDF}>
                    Download PDF
                </Button>
            </div>
            <ToastContainer />

            <br />

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Actions</TableCell> {/* Add a column for actions */}
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
