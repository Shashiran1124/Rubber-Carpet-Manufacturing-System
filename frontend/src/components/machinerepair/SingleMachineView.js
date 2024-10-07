import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Correct import
import Sidebar from "./Sidebar"; // Import Sidebar component
import Head from "./Head"; // Import Head component

export default function SingleMachineView() {
    const [machineData, setMachineData] = useState([]);
    const [repairData, setRepairData] = useState([]);

    const { id, mid } = useParams(); // Fetch params from the URL

    useEffect(() => {
        // Fetch machine data by ID
        axios.get(`http://localhost:8070/machine/${id}`).then((res) => {
            setMachineData(res.data);
            console.log(res.data);
        });

        // Fetch repair data for the machine
        axios.get(`http://localhost:8070/repair/${mid}`).then((res) => {
            setRepairData(res.data);
            console.log(res.data);
        });
    }, [id, mid]);

    return (
        <Box display="flex" height="100vh">
            {/* Sidebar */}
            <Box sx={{ width: "15%", backgroundColor: "#b0bec5", height: "100vh" }}>
                <Sidebar />
            </Box>

            {/* Main content area */}
            <Box sx={{ width: "85%", padding: "20px" }}>
                <Head />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "20px" }}>
                    <div style={{ fontSize: "1.2rem", fontWeight: "bold" }}>Machine ID {mid}</div>
                    <Button
                        variant="contained"
                        color="primary"
                        href={`/repair/add/${mid}`}
                    >
                        Add New Record
                    </Button>
                </div>
                <br />

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ backgroundColor: '#1976d2', color: 'white' }}>Repair Start Date</TableCell>
                                <TableCell sx={{ backgroundColor: '#1976d2', color: 'white' }}>Part Name</TableCell>
                                <TableCell sx={{ backgroundColor: '#1976d2', color: 'white' }}>Repair End Date</TableCell>
                                <TableCell sx={{ backgroundColor: '#1976d2', color: 'white' }}>Description</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {repairData.map((rowData) => (
                                <TableRow key={rowData._id}>
                                    <TableCell>{rowData.repairStartDate}</TableCell>
                                    <TableCell>{rowData.partName}</TableCell>
                                    <TableCell>{rowData.repairEndDate}</TableCell>
                                    <TableCell>{rowData.description}</TableCell> {/* Fixed typo from 'discription' */}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
}
