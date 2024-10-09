import { AppBar, Toolbar, IconButton, InputBase, Typography, Avatar, Box, Badge, Popover, List, ListItem, ListItemText } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import ShareIcon from '@mui/icons-material/Share';
import PRIImage from '../../images/PRI.png'; 
import { useState } from 'react';

const Navbarhr = ({ notifications = [] }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleNotificationClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleNotificationClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'notification-popover' : undefined;

    return (
        <AppBar position="static" sx={{ backgroundColor: "#ADB4BF", color: "#000000", boxShadow: "none", borderRadius: "5px", border: "1px solid #000000", height: "85px" }}>
            <Toolbar>
                <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: "bold", fontSize: "20px", marginLeft: "30px" }}>
                        P.R.I Rubber Industries
                    </Typography>
                </Box>
                <IconButton edge="end" color="inherit" onClick={handleNotificationClick}>
                    <Badge badgeContent={notifications.length} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleNotificationClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    <List sx={{ width: '300px' }}>
                        {notifications.length > 0 ? (
                            notifications.map((notification, index) => (
                                <ListItem key={index}>
                                    <ListItemText primary={notification} />
                                </ListItem>
                            ))
                        ) : (
                            <ListItem>
                                <ListItemText primary="No new notifications" />
                            </ListItem>
                        )}
                    </List>
                </Popover>
                <IconButton edge="end" color="inherit">
                    <SettingsIcon />
                </IconButton>
                <Avatar alt="User" src={PRIImage} sx={{ marginLeft: 2, width: 70, height: 40 }} />
            </Toolbar>
        </AppBar>
    );
};

export default Navbarhr;
