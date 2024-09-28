import React from "react";
import { Box, Grid } from "@mui/material";
import Sidebar from "./SideBar";
import Navbar from "./NavBar";
import UserTable3 from "./UserTable3"; // Updated table component for KPI

const DashKpiTable = () => {
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
            minHeight: "100vh",
          }}
        >
          <UserTable3 /> {/* Updated component to handle KPI */}
        </Box>
      </Grid>
    </Grid>
  );
};

export default DashKpiTable;
