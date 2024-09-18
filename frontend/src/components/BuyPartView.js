import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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

        getBuyPartView(); // don't forget to call the function to fetch data
    }, []); // dependency array ensures useEffect runs once when the component is mounted

    return (
        <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                {/*  can add content here */}
            </div>
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
