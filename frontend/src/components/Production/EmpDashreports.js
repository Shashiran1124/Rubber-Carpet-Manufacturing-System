import React from "react";
import { Box, Grid } from "@mui/material";
import Sidebar from "./SideBar";
import Navbar from "./NavBar";
import Reports from "./Reports";
import Reports2 from "./Report2";
import EmpSidebar from "./EmpSideBar";

const EmpDashreports = () => {
    return (
        <Grid container>
            <Grid item xs={12} sm={3} md={2}>
                <EmpSidebar/>
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
                        <Grid item xs={12} md={8}>
                            <Reports />
                        </Grid>

                        {/* Smaller Pie Chart section */}
                        <Grid item xs={12} md={4}>
                            <Reports2 />
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
        </Grid>
    );
};

// Ensure the export statement matches the component name
export default EmpDashreports;
