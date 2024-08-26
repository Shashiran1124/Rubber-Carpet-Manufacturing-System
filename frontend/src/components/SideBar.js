import React, { useState } from 'react';
import { List, ListItem, ListItemText, Divider, Box } from "@mui/material";
import { Home as HomeIcon, Assessment as AssessmentIcon, ListAlt as ListAltIcon } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [active, setActive] = useState(location.pathname);

    const handleNavigation = (path) => {
        setActive(path);
        navigate(path);
    };

    const isActive = (paths) => paths.includes(active);

    return (
        <Box sx={{ width: "250px", backgroundColor: "#d7c2f4", height: "113vh", paddingTop: "10px" }}>
            <List sx={{ padding: 0 }}>
                
                {/* Home */}
                <ListItem 
                    button 
                    sx={{ justifyContent: 'center', padding: "20px 0" }} 
                    onClick={() => handleNavigation('/')}
                >
                    <HomeIcon sx={{ color: isActive(['/']) ? '#7540a7' : '#000' }} />
                </ListItem>
                <Divider sx={{ backgroundColor: "#fff" }} />
                
                {/* Reports */}
                <ListItem 
                    button 
                    sx={{ padding: "15px 20px", backgroundColor: isActive(['/reports']) ? '#7540a7' : 'inherit' }} 
                    onClick={() => handleNavigation('/reports')}
                >
                    <AssessmentIcon sx={{ color: isActive(['/reports']) ? '#fff' : '#000' }} />
                    <ListItemText primary="Reports" sx={{ paddingLeft: "10px", color: isActive(['/reports']) ? '#fff' : '#000' }} />
                </ListItem>
                <Divider sx={{ backgroundColor: "#fff" }} />
                
                {/* Customer Registration*/}
                <ListItem 
                    button 
                    sx={{ padding: "15px 20px", backgroundColor: isActive(['/dashboardform', '/dashordertable']) ? '#7540a7' : 'inherit' }} 
                    onClick={() => handleNavigation('/dashordertable')}
                >
                    <ListAltIcon sx={{ color: isActive(['/dashboardform', '/dashordertable']) ? '#fff' : '#000' }} />
                    <ListItemText 
                        primary="Customer Registration" 
                        sx={{ paddingLeft: "10px", color: isActive(['/dashboardform', '/dashordertable']) ? '#fff' : '#000' }} 
                    />
                </ListItem>
                <Divider sx={{ backgroundColor: "#fff" }} />
                
                {/* View and Update Orders */}
                <ListItem 
                    button 
                    sx={{ padding: "15px 20px", backgroundColor: isActive(['/DashOrderForm']) ? '#7540a7' : 'inherit' }} 
                    onClick={() => handleNavigation('/DashOrderForm')}
                >
                    <ListItemText primary="View and Update Orders" sx={{ paddingLeft: "10px", color: isActive(['/DashOrderForm']) ? '#fff' : '#000' }} />
                </ListItem>
                <Divider sx={{ backgroundColor: "#fff" }} />
                
                {/* Order Item Handling */}
                <ListItem 
                    button 
                    sx={{ padding: "15px 20px", backgroundColor: isActive(['/DashPlaceAnOrderForm']) ? '#7540a7' : 'inherit' }} 
                    onClick={() => handleNavigation('/DashPlaceAnOrderForm')}
                >
                    <ListItemText primary="Order Item Handling" sx={{ paddingLeft: "10px", color: isActive(['/DashPlaceAnOrderForm']) ? '#fff' : '#000' }} />
                </ListItem>
                <Divider sx={{ backgroundColor: "#fff" }} />
                
                {/* Feedback Collection */}
                <ListItem 
                    button 
                    sx={{ padding: "15px 20px", backgroundColor: isActive(['/DashFeedbackForm']) ? '#7540a7' : 'inherit' }} 
                    onClick={() => handleNavigation('/DashFeedbackForm')}
                >
                    <ListItemText primary="Feedcback Collection" sx={{ paddingLeft: "10px", color: isActive(['/DashFeedbackForm']) ? '#fff' : '#000' }} />
                </ListItem>
            </List>
        </Box>
    );
};

export default Sidebar;