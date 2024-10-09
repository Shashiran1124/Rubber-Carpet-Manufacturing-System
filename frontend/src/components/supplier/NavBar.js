import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, IconButton, Typography, Avatar, Box, Badge, Popover, List, ListItem, ListItemText } from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';
import PRIImage from '../../images/PRI.png'; 

const Navbarr1 = () => {
    const [notificationCount, setNotificationCount] = useState(0);
    const [notifications, setNotifications] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);

    // Function to fetch orders and check for notifications
    const checkForNotifications = async () => {
        try {
            const response = await fetch('http://localhost:8070/suptest1/');
            const orders = await response.json();
            const today = new Date().toLocaleDateString('en-US');

            // Count orders that match today's date
            const todayOrdersCount = orders.filter(order => 
                new Date(order.dateOfOrder).toLocaleDateString('en-US') === today
            ).length;

            setNotificationCount(todayOrdersCount);

            // Set notifications for display (you can customize the messages as needed)
            setNotifications(orders.filter(order => 
                new Date(order.dateOfOrder).toLocaleDateString('en-US') === today
            ));
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    // Check for notifications every minute
    useEffect(() => {
        const interval = setInterval(checkForNotifications, 60000); // Check every 60 seconds
        checkForNotifications(); // Initial check
        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    const handleNotificationClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'notification-popover' : undefined;

    return (
        <AppBar position="static" sx={{ backgroundColor: "#ADB4BF", color: "#000000", boxShadow: "none", borderRadius: "5px", border: "2px solid #000000" }}>
            <Toolbar>
                <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: "bold", fontSize: "28px", marginLeft: "380px" }}>
                        P.R.I Rubber Industries
                    </Typography>
                </Box>
                
                
                <IconButton edge="end" color="inherit" onClick={handleNotificationClick}>
                    <Badge badgeContent={notificationCount} color="error">
                        <NotificationsIcon />
                    </Badge>
                
                </IconButton>
                <Avatar alt="User" src={PRIImage} sx={{ marginLeft: 2, width: 75, height: 43 }} />
            </Toolbar>
            <Popover
                id={id}
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
                <List>
                    {notifications.length === 0 ? (
                        <ListItem>
                            <ListItemText primary="No notifications" />
                        </ListItem>
                    ) : (
                        notifications.map((order, index) => (
                            <ListItem key={index}>
                                <ListItemText primary={`REMINDER : You have placed an Order to  ${order.companyName} due on Today(${new Date(order.dateOfOrder).toLocaleDateString()})`} />
                            </ListItem>
                        ))
                    )}
                </List>
            </Popover>
        </AppBar>
    );
};

export default Navbarr1;
