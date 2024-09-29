import { Box, Grid } from "@mui/material";
import Navbar from "./NaviBar";
import CusDash from "./cusDash";



const Dashcusdashboard = () => {
    return (
        <Grid container>
            <Grid item>
                
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
                    <CusDash/>
                </Box>
            </Grid>
        </Grid>
    );
};



export default Dashcusdashboard;