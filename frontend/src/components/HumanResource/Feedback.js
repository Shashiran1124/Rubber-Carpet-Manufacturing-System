import React from "react";
import { Box, Grid } from "@mui/material";
import FeedbackForm from "./FeedbackForm";  
import Navbar from "./NavBar";              
import EmpSidebar from "../Production/EmpSideBar";

const Feedback = () => {
    return (
        <Grid container>
            <Grid item>
                <EmpSidebar />
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
                    <FeedbackForm />   {/* Use the FeedbackForm component */}
                </Box>
            </Grid>
        </Grid>
    );
};

// Ensure the export statement matches the component name
export default Feedback;
