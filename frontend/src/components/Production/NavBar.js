import { AppBar, Toolbar, IconButton, InputBase, Typography, Avatar, Box, Badge, Menu, MenuItem } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import ShareIcon from '@mui/icons-material/Share';
import PRIImage from '../../images/PRI.jpg'; 
import { useEffect, useState } from 'react';

const Navbar = () => {
    const [plans, setPlans] = useState([]);
    const [notificationCount, setNotificationCount] = useState(0);
    const [anchorEl, setAnchorEl] = useState(null);
    const [upcomingPlans, setUpcomingPlans] = useState([]);

    const open = Boolean(anchorEl);

    // Fetch the plans data
    const fetchPlans = async () => {
        try {
            const response = await fetch('http://localhost:8070/test2/plan');
            if (response.ok) {
                const data = await response.json();
                console.log("Fetched plans:", data); // Debugging: output fetched plans
                setPlans(data);
            } else {
                console.error('Failed to fetch plans');
            }
        } catch (error) {
            console.error('Error fetching plans:', error);
        }
    };

    // Check for upcoming plans and update the notification count
    useEffect(() => {
        fetchPlans();
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            const now = new Date();
            console.log("Current time:", now); // Debugging: output current time

            const upcoming = plans.filter(plan => {
                // Attempt to parse the date and time fields into a valid date object
                const planStartTime = parseDateAndTime(plan.psdate, plan.pstime);
                
                if (isNaN(planStartTime)) {
                    console.error("Invalid Date for plan", plan);  // Debugging: output invalid plans
                    return false;
                }

                console.log("Checking plan start time:", planStartTime); // Debugging: output plan start time

                // Check if the plan start time is within the next minute
                return planStartTime > now && planStartTime <= new Date(now.getTime() + 60000); // Check within 1-minute window
            });

            console.log("Upcoming plans:", upcoming.length); // Debugging: output the count of upcoming plans

            setNotificationCount(upcoming.length);
            setUpcomingPlans(upcoming);  // Update the upcoming plans to display when the notification is clicked
        }, 10000); // Check every 10 seconds for testing

        return () => clearInterval(intervalId);
    }, [plans]);

    // Function to parse date and time into a valid JavaScript Date object
    const parseDateAndTime = (date, time) => {
        // First, ensure date is in ISO format YYYY-MM-DD
        const dateParts = date.split("-");
        if (dateParts.length !== 3) {
            console.error("Invalid date format", date);
            return NaN;
        }

        // Ensure time is in HH:MM format
        const timeParts = time.split(":");
        if (timeParts.length !== 2) {
            console.error("Invalid time format", time);
            return NaN;
        }

        const [year, month, day] = dateParts.map(part => parseInt(part, 10));
        const [hours, minutes] = timeParts.map(part => parseInt(part, 10));

        // Create and return the JavaScript Date object
        return new Date(year, month - 1, day, hours, minutes);
    };

    // Handle notification click
    const handleNotificationClick = (event) => {
        setAnchorEl(event.currentTarget); // Open the notification menu
    };

    // Close notification menu
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: "#ADB4BF", color: "#000000", boxShadow: "none", borderRadius: "5px", border: "1px solid #000000", height: "80px" }}>
            <Toolbar>
                <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="div" sx={{ fontWeight: "bold", fontSize: "20px", marginLeft: "30px" }}>
                        P.R.I Rubber Industries
                    </Typography>
                </Box>

               

              

                {/* Notification icon with badge for unread notifications */}
                <IconButton edge="end" color="inherit" onClick={handleNotificationClick}>
                    <Badge badgeContent={notificationCount} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>

                

                <Avatar alt="User" src={PRIImage} sx={{ marginLeft: 2, width: 70, height: 40 }} />

                {/* Notification dropdown menu */}
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                        style: {
                            maxHeight: 400,
                            width: '300px',
                        },
                    }}
                >
                    {upcomingPlans.length === 0 ? (
                        <MenuItem onClick={handleClose}>No upcoming plans</MenuItem>
                    ) : (
                        upcomingPlans.map((plan) => (
                            <MenuItem key={plan._id} onClick={handleClose}>
                                <Typography variant="body2">
                                    <strong>Work Name:</strong> {plan.pnum}<br />
                                    <strong>Start Time:</strong> {plan.pstime}<br />
                                    <strong>Team:</strong> {plan.pteam}
                                </Typography>
                            </MenuItem>
                        ))
                    )}
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
