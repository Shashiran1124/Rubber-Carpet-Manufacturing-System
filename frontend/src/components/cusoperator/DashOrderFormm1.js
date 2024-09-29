import { Box, Grid } from "@mui/material";
import Sidebar from "./SideBar";
import Navbar from "./NaviBar";
import OrderForm from "./OrderForm1";



const DashboardFormm1 = () => {
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
                        backgroundColor: "#e0e0e0", // This adds the gray background color
                        minHeight: "100vh" // Ensure it covers the entire height of the viewport
                    }}
                >
                    <OrderForm/>
                </Box>
            </Grid>
        </Grid>
    );
};



export default DashboardFormm1;