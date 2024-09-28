import React, { useRef } from "react";
import { Box, Grid, Button } from "@mui/material";
import Sidebar from "./SideBar";
import Navbar from "./NavBar";
import Reports from "./Reports";
import Reports2 from "./Report2";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Dashreports = () => {
    const reportRef = useRef(); // Use ref to capture the Reports component

    // Function to download the report as a PDF
    const handleDownloadPdf = async () => {
        const input = reportRef.current; // The Reports component we want to capture
        const canvas = await html2canvas(input, { scale: 2 });
        const imgData = canvas.toDataURL('image/png');

        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'px',
            format: [canvas.width, canvas.height],
        });
        
        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
        pdf.save('report.pdf'); // Save the generated PDF
    };

    return (
        <Grid container>
            <Grid item xs={12} sm={3} md={2}>
                <Sidebar />
            </Grid>
            <Grid item xs={12} sm={9} md={10}>
                <Navbar />
                <Box 
                    sx={{ 
                        padding: "20px", 
                        backgroundColor: "#e0e0e0", 
                        minHeight: "100vh",
                        marginTop: "64px",  // Adjust if Navbar has a fixed position
                    }}
                >
                    <Grid container spacing={2}>
                        {/* Main Reports section */}
                        <Grid item xs={12} md={8} ref={reportRef}>
                            <Reports />
                        </Grid>

                        {/* Smaller Pie Chart section */}
                        <Grid item xs={12} md={4}>
                            <Reports2 />
                        </Grid>
                    </Grid>

                    {/* Button to download PDF */}
                    <Box mt={2}>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            onClick={handleDownloadPdf}
                        >
                            Download PDF
                        </Button>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
};

// Ensure the export statement matches the component name
export default Dashreports;
