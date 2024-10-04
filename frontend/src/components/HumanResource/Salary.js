import React from "react";
import { Box, Grid } from "@mui/material";
import SalaryManagementForm from "./SalaryManagementForm";  // Import your SalaryManagementForm component
import Sidebar from "./SideBar";              // Import the Sidebar component
import Navbar from "./NavBar";                // Import the Navbar component

const Salary = () => {
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
                    <SalaryManagementForm />  {/* Use the SalaryManagementForm component */}
                </Box>
            </Grid>
        </Grid>
    );
};

// Ensure the export statement matches the component name
export default Salary;
