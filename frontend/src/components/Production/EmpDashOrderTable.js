import React from "react";
import { Box, Grid } from "@mui/material";
import Navbar from "./NavBar";
import EmpOrderTable from "./EmpOrderTable";
import EmpSidebar from "./EmpSideBar";



const EmpDashOrderTable = () => {
    return (
        <Grid container>
            <Grid item>
                <EmpSidebar/>
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
                    <EmpOrderTable/>
                </Box>
            </Grid>
        </Grid>
    );
};

// Ensure the export statement matches the component name
export default EmpDashOrderTable;