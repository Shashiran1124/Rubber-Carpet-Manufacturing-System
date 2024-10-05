import React, { useRef } from "react";
import { Box, Grid, Button, Typography } from "@mui/material";
import Sidebar from "./SideBar";
import Navbar from "./NavBar";
import Reports from "./Reports"; // Report1
import Reports2 from "./Report2"; // Report2
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import headerImage from "../../images/PRI.png"; 

const Dashreports = () => {
    const reportRef = useRef(); // Use ref to capture both Reports components
  
    // Function to download the reports as a PDF
    const handleDownloadPdf = async () => {
      const input = reportRef.current; // The div that contains both Reports
      const canvas = await html2canvas(input, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
  
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [canvas.width, canvas.height],
      });
  
      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save("combined_reports.pdf"); // Save the generated PDF
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
              backgroundColor: "#f5f5f5", // Light background color
              minHeight: "100vh",
              marginTop: "64px",
            }}
          >
            <Grid container spacing={2}>
              {/* Wrap both reports in a single div to capture together */}
              <Grid item xs={12} ref={reportRef}>
                <Box
                  sx={{
                    backgroundColor: "#D0D7DF", // Light box background
                    padding: "20px",
                    borderRadius: "10px",
                    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                    marginBottom: "20px",
                  }}
                >
                  <Grid container alignItems="center" spacing={2}>
                    {/* Image Section */}
                    <Grid item xs={12} sm={3}>
                      <Box
                        component="img"
                        src={headerImage} // Replace with your image
                        alt="Report Header"
                        sx={{
                          borderRadius: "50%",
                          width: "150px",
                          height: "150px",
                          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                        }}
                      />
                    </Grid>
                    {/* Text Section */}
                    <Grid item xs={12} sm={9}>
                      <Typography
                        variant="h4"
                        sx={{
                          color: "#333333", // Darker text for better visibility
                          fontWeight: "bold",
                          marginBottom: "10px",
                        }}
                      >
                        Rubber Carpet Factory Production Handling Performance Reports
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          color: "#666666", // Medium gray text
                        }}
                      >
                          This Report depicts a performance summary for the Rubber Carpet Factory's production handling process. 
                          It includes key metrics such as machine allocation, production progress, work orders, and employee performance. 
                          Additionally, it provides insights on production efficiency, material usage, and overall factory output.
                      </Typography>
                    </Grid>
                  </Grid>

                  {/* Report1 */}
                  <Box sx={{ marginBottom: "10px" }}>
                    <Reports />
                  </Box>
                  {/* Report2 */}
                  <Box sx={{ marginTop: "0px" }}>
                    <Reports2 />
                  </Box>
                </Box>
              </Grid>
            </Grid>
  
            {/* Button to download PDF */}
            <Box mt={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleDownloadPdf}
                sx={{
                  backgroundColor: "#007bff", // Light button color
                  '&:hover': {
                    backgroundColor: "#0056b3", // Darker shade on hover
                  },
                }}
              >
                Download Combined PDF
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    );
};
  
export default Dashreports;
