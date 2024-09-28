import React from "react";
import { Box, Grid } from "@mui/material";
import Sidebar from "./SideBar";
import Navbar from "./NavBar";
import Report from "./report";

const DashReport = () => {
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
          <Report /> {/* Updated component to handle cost data */}
        </Box>
      </Grid>
    </Grid>
  );
};

export default DashReport;
