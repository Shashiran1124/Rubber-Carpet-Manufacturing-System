import React from "react";
import { Box, Grid } from "@mui/material";
import CostForm from "./UserForm4"; // Assuming the new form component is named CostForm
import Sidebar from "./SideBar";
import Navbar from "./NavBar";

const Dashcost = () => {
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
                    <CostForm />  {/* Updated to use CostForm for the new data model */}
                </Box>
            </Grid>
        </Grid>
    );
};

export default Dashcost;
