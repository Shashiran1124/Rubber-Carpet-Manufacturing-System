import React from 'react';
import { AppBar, Toolbar, IconButton, InputBase, Typography, Avatar, Box } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import ShareIcon from '@mui/icons-material/Share';


const Head = () => {
    return (
        <AppBar position="static" sx={{ backgroundColor: "#ADB4BF", color: "#000000", boxShadow: "none",borderRadius: "5px",border: "1px solid #000000",height: "80px" }}>
            <Toolbar>
                <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: "bold",fontSize:"20px",marginLeft:"30px" }}>
                        P.R.I Rubber Industries
                    </Typography>
                </Box>
               
                
                <IconButton edge="end" color="inherit">
                    <NotificationsIcon />
                </IconButton>
                
            </Toolbar>
        </AppBar>
    );
};

export default Head;