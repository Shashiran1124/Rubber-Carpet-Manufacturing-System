import { AppBar, Toolbar, IconButton, Typography, Avatar, Box, Badge } from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';
import PRIImage from '../../images/PRI.png'; 
import { useEffect, useState } from 'react';

const Navbar = () => {
    const [notifications, setNotifications] = useState(0);

    // Listen for custom event from ViewOrderTable.js
    useEffect(() => {
        const handleNotification = (event) => {
            setNotifications(event.detail); // Set notifications to the total count of today's orders
        };

        window.addEventListener("orderNotification", handleNotification);

        return () => {
            window.removeEventListener("orderNotification", handleNotification);
        };
    }, []);

    return (
        <AppBar position="static" style={{backgroundColor: "#ADB4BF", color: "#000000", boxShadow: "none", borderRadius: "5px", border: "1px solid #000000", height: "80px" }}>
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    Rubber Carpet Manufacturing System
                </Typography>
                <Box style={{ display: 'flex', alignItems: 'center' }}>
                    <Badge badgeContent={notifications} color="secondary">
                        <NotificationsIcon />
                    </Badge>
                    <IconButton color="inherit" edge="end">
                        <Avatar alt="Profile Image" src={PRIImage} />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
