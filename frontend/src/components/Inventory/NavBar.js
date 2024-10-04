import React from 'react';
import { AppBar, Toolbar, IconButton, InputBase, Typography, Avatar, Box } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import ShareIcon from '@mui/icons-material/Share';
import PRIImage from '../../images/PRIImage.jpg';

const Navbarin = () => {
    return (
        <AppBar position="static" sx={{ backgroundColor: "#ADB4BF", color: "#000000", boxShadow: "none",borderRadius: "5px",border: "1px solid #000000",height: "80px" }}>
            <Toolbar>
                <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: "bold",fontSize:"20px",marginLeft:"30px" }}>
                        P.R.I Rubber Industries
                    </Typography>
                </Box>
                <Box sx={{ position: "relative", display: "inline-block" }}>
                    <SearchIcon sx={{ position: "absolute", top: "8px", left: "20px", color: "#6a1b9a" }} />
                    <InputBase
                        placeholder="Search…"
                        sx={{ pl: 4, pr: 2, backgroundColor: "#FFF", borderRadius: "15px", paddingLeft: "30px",fontSize:"14px" }}
                    />
                </Box>
                <IconButton edge="end" color="inherit">
                    <ShareIcon />
                </IconButton>
                <IconButton edge="end" color="inherit">
                    <NotificationsIcon />
                </IconButton>
                <IconButton edge="end" color="inherit">
                    <SettingsIcon />
                </IconButton>
                <Avatar alt="User" src={PRIImage} sx={{ marginLeft: 2,width: 70, height: 40 }} />
            </Toolbar>
        </AppBar>
    );
};

export default Navbarin;