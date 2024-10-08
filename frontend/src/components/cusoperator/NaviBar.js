import { AppBar, Toolbar, IconButton, Typography, Avatar, Box, Badge, Menu, MenuItem, List, ListItemText } from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';
import PRIImage from '../../images/PRI.png'; 
import { useEffect, useState } from 'react';

const Navbar = () => {
    const [notifications, setNotifications] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);

    // Listen for custom event from ViewOrderTable.js
    useEffect(() => {
        const handleNotification = (event) => {
            setNotifications(event.detail); // Set notifications message
        };

        window.addEventListener("orderNotification", handleNotification);

        return () => {
            window.removeEventListener("orderNotification", handleNotification);
        };
    }, []);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static" style={{ backgroundColor: "#ADB4BF", color: "#000000", boxShadow: "none", borderRadius: "5px", border: "1px solid #000000", height: "80px" }}>
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    Rubber Carpet Manufacturing System
                </Typography>
                <Box style={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton color="inherit" onClick={handleClick}>
                        <Badge badgeContent={notifications ? 1 : 0} color="error">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    <IconButton color="inherit" edge="end">
                        <Avatar alt="Profile Image" src={PRIImage} />
                    </IconButton>
                </Box>
            </Toolbar>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                style={{ marginTop: '45px' }} // Adjust margin to position the menu
            >
                <List>
                    {notifications ? (
                        <MenuItem onClick={handleClose}>
                            <ListItemText primary={notifications} />
                        </MenuItem>
                    ) : (
                        <MenuItem onClick={handleClose}>
                            <ListItemText primary="No new orders today." />
                        </MenuItem>
                    )}
                </List>
            </Menu>
        </AppBar>
    );
};

export default Navbar;
