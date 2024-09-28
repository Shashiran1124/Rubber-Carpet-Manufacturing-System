import React from "react";
import { Box, Grid } from "@mui/material";
import UserTable4 from "./UserTable4"; // Updated table component for costs
import Sidebar from "./SideBar";
import Navbar from "./NavBar";

const DashCostTable = () => {
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
          <UserTable4 /> {/* Updated component to handle cost data */}
        </Box>
      </Grid>
    </Grid>
  );
};

export default DashCostTable;
