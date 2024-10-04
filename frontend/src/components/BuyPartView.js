import React, { useEffect, useState } from "react";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from "@mui/material";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable"; // Import the autotable plugin
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

export default function BuyPartView() {
    const [buyPartData, setBuyPartData] = useState([]);

    const [startDate, setStartDate] = useState(dayjs(new Date().toString()));
    const [endDate, setEndDate] = useState(dayjs(new Date().toString()));
  
    const navigate = useNavigate(); // Initialize navigate function

    useEffect(() => {}, []);

    
    function getBuyPartView() {
        axios
            .post(`http://localhost:8070/Part/all`,{
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
      }
    

    const downloadPdf = () => {//pdf download
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text("PRI Rubber Indrustry", 14, 10);
        doc.setFontSize(15);
        doc.text("Brought Machine Parts", 138, 10);
        // Company information at the top of the document
        doc.setFontSize(10);
        doc.text("PRI Rubber Indrustry", 14, 16);
        doc.text("Biyagama", 14, 20);
        doc.text("Sri Lanka", 14, 24);
        doc.text('Tell: +94 235689235', 14,28); // Phone number
        doc.text('Email:', 14,32); // Email label
        // Set text color to black for the email address
        doc.setTextColor(0, 0, 255); // RGB for blue
        doc.text('prirubberindrustry@gmail.com', 24, 32); // Email address
        // Reset text color to black for subsequent text
        doc.setTextColor(0, 0, 0); // Reset to black

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
            startY: 35, // Adjusts where the table starts
            headStyles: {
                fillColor: [0, 0, 255],  // Blue background color for header
                textColor: [255, 255, 255], // White text color for header
                fontSize: 12,  // Font size for header
            }
        });
        const finalY = doc.autoTable.previous.finalY + 20;

        
        doc.text('...............................................', 14, finalY ); 
        doc.setFontSize(12);
        doc.text('Mechanical Inspector', 14, finalY + 10); // Placeholder for position
    
        // Date and signature line at the bottom
        doc.setFontSize(10);
        const currentDate = new Date().toLocaleDateString();
        doc.text(`Date: ${currentDate}`, 14, finalY + 15); // Display current date

        doc.save("buy_part_data.pdf");
    };

    return (
        <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3>Machine Part Purchases</h3>
                {/*//////////////////*/}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className="row">
                  <div className="col-4">
                     <DatePicker
                        label="Start Date"
                        value={startDate}
                        onChange={handleStartDateChange}
                    />
                    </div>
                    <div className="col-4">
                      <DatePicker
                        label="End Date"
                        value={endDate}
                        onChange={handleEndDateChange}
                    />
                    </div>
                    <div className="col-4">
                       <Button
                         variant="contained"
                          sx={{
                            backgroundColor: "yellow",
                            color: "#fff",
                            marginTop: "10px",
                          }}
                         type="button"
                         onClick={handleBuyPar}
                        >
                          Filter
                        </Button>
                    </div>
                </div>
            </LocalizationProvider>

                {/*//////////////////*/}

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
