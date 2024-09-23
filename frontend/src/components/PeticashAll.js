import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PettycashAll() {
    const [pettycashData, setpettycashData] = useState([]); 

    useEffect(() => {
        function PettycashAll() {
            axios.get(`http://localhost:8070/pettyCash/all`)
                .then((res) => {
                    console.log(res);
                    setpettycashData(res.data); 
                })
                .catch((error) => {
                    toast.success("An error occurred while fetching the data."); 
                    console.error(error); 
                });
        }

        PettycashAll(); // don't forget to call the function to fetch data
    }, []); // dependency array ensures useEffect runs once when the component is mounted

    return (
        <>   
             <div><h3>Petty Cash</h3></div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                {/*  can add content here */}
            </div>
            <ToastContainer/>  


            <br />

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Amount</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {pettycashData.map((rowData) => (
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