import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, IconButton, InputBase, Typography, Avatar, Box, Popover, List, ListItem } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import ShareIcon from '@mui/icons-material/Share';
import PRIImage from '../../images/PRI.jpg'; 
import { format } from "date-fns"; // Import date-fns to format dates

const Navbar = () => {
    const [notifications, setNotifications] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
  
    // Fetch transport data and check for notifications
    const fetchTransports = async () => {
        try {
            const response = await fetch('http://localhost:8070/controller/trans');
            if (response.ok) {
                const data = await response.json();
                const currentDate = new Date();
                const upcomingNotifications = data.filter(transport => {
                    const dropOffDate = new Date(transport.Drop_off_Date_and_Time);
                    // Check if the drop-off date is today or in the future
                    return dropOffDate >= currentDate && dropOffDate.toDateString() === currentDate.toDateString();
                });
                setNotifications(upcomingNotifications);
            } else {
                console.error('Failed to fetch transports');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchTransports();
    }, []);

    // Function to handle the notification popover
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <AppBar position="static" sx={{ backgroundColor: "#ADB4BF", color: "#000000", boxShadow: "none", borderRadius: "5px", border: "1px solid #000000", height: "80px" }}>
            <Toolbar>
                <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: "bold", fontSize: "20px", marginLeft: "30px" }}>
                        P.R.I Rubber Industries
                    </Typography>
                </Box>
                <Box sx={{ position: "relative", display: "inline-block" }}>
                    <SearchIcon sx={{ position: "absolute", top: "8px", left: "20px", color: "#6a1b9a" }} />
                    <InputBase
                        placeholder="search"
                        sx={{ pl: 4, pr: 2, backgroundColor: "#ffffff", borderRadius: "15px", paddingLeft: "30px", fontSize: "14px" }}
                    />
                </Box>
                <IconButton edge="end" color="inherit" onClick={handleClick}>
                    <NotificationsIcon />
                </IconButton>
                <Popover
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >
                    <List sx={{ maxHeight: '300px', overflow: 'auto', width: '300px' }}>
                        {notifications.length > 0 ? (
                            notifications.map((transport) => (
                                <ListItem key={transport._id} sx={{ justifyContent: 'space-between' }}>
                                    <Typography>{`Transport Number: ${transport.Transport_Number}`}</Typography>
                                    <Typography>{`Drop-off Date: ${format(new Date(transport.Drop_off_Date_and_Time), 'MMM dd, yyyy')}`}</Typography>
                                </ListItem>
                            ))
                        ) : (
                            <ListItem>
                                <Typography>No upcoming drop-off dates today.</Typography>
                            </ListItem>
                        )}
                    </List>
                </Popover>
                <IconButton edge="end" color="inherit">
                    <ShareIcon />
                </IconButton>
                <IconButton edge="end" color="inherit">
                    <SettingsIcon />
                </IconButton>
                <Avatar alt="User" src={PRIImage} sx={{ marginLeft: 2, width: 50, height: 40 }} />
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
