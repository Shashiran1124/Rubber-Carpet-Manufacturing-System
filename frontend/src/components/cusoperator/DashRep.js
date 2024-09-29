import { Box, Grid } from "@mui/material";
import Navbar from "./NaviBar";
import Osidebar from "./SB2";
import RepTable from "./Rep";




const DashRep = () => {
    return (
        <Grid container>
            <Grid item>
                <Osidebar/>
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
                    <RepTable/>
                </Box>
            </Grid>
        </Grid>
    );
};



export default DashRep;