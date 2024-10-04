import React from "react";
import { Box, Grid } from "@mui/material";
import EmployeeForm from "./EmployeeForm";
import Sidebar from "./SideBar";
import Navbar from "./NavBar";
const Employees = () => {
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
                    <EmployeeForm />

                </Box>
            </Grid>
        </Grid>
    );
};

// Ensure the export statement matches the component name
export default Employees;