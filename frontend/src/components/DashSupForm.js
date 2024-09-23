import React from "react";
import { Box, Grid } from "@mui/material";
import F1 from "./F1";
import Sidebar from "./SideBar";
import Navbar from "./NavBar";



const DashSupForm = () => {
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
                    <F1 />
                </Box>
            </Grid>
        </Grid>
    );
};

// Ensure the export statement matches the component name
export default DashSupForm;
