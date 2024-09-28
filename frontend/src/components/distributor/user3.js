import React from "react";
import { Box, Grid } from "@mui/material";
import Sidebar from "./SideBar";
import Navbar from "./NavBar";
import KPIForm from "./UserForm3";  // Changed to KPIForm to match your new form

const Dashkpi = () => {
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
                    <KPIForm />  {/* Updated to use KPIForm */}
                </Box>
            </Grid>
        </Grid>
    );
};

export default Dashkpi;
