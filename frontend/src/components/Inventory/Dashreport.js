import React from "react";
import { Box, Grid, Button } from "@mui/material";
import Sidebar from "./SideBar";
import Navbar from "./NavBar";
import Report from "./report";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Dashreport = () => {
    const downloadPDF = () => {
        const reportElement = document.getElementById("report-content");

        // Use html2canvas to capture the Report component as an image
        html2canvas(reportElement).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");

            const pdf = new jsPDF();
            pdf.addImage(imgData, "PNG", 10, 10, 190, 0); // Positioning the image
            pdf.save("report.pdf"); // Save the PDF with the name "report.pdf"
        });
    };

    return (
        <Grid container>
            <Grid item>
                <Sidebar />
            </Grid>
            <Grid item xs>
                <Navbar />
                <Box 
                    sx={{ 
                        padding: "20px", 
                        backgroundColor: "#e0e0e0", 
                        minHeight: "100vh" 
                    }}
                >
                    {/* Adding an ID to the Box wrapping the Report for easy reference */}
                    <Box id="report-content">
                        <Report />
                    </Box>

                    {/* Add a Button to download the report as PDF */}
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={downloadPDF}
                        sx={{ marginTop: "20px" }}
                    >
                        Download PDF
                    </Button>
                </Box>
            </Grid>
        </Grid>
    );
};

// Ensure the export statement matches the component name
export default Dashreport;
