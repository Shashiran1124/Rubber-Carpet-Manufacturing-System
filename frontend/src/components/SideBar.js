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
                
                {/* Work Order */}
                <ListItem 
                    button 
                    sx={{ padding: "15px 20px", backgroundColor: isActive(['/DashSupForm', '/DashSupForm']) ? '#A020F0' : 'inherit' }} 
                    onClick={() => handleNavigation('/dashordertable')}
                >
                    <ListAltIcon sx={{ color: isActive(['/dashboardform', '/dashordertable']) ? '#fff' : '#000' }} />
                    <ListItemText 
                        primary="Work Order" 
                        sx={{ paddingLeft: "10px", color: isActive(['/dashboardform', '/dashordertable']) ? '#fff' : '#000' }} 
                    />
                </ListItem>
                <Divider sx={{ backgroundColor: "#fff" }} />
                
                {/* Production Planning */}
                <ListItem 
                    button 
                    sx={{ padding: "15px 20px", backgroundColor: isActive(['/dashplanform']) ? '#7540a7' : 'inherit' }} 
                    onClick={() => handleNavigation('/dashplanform')}
                >
                    <ListItemText primary="Production Planning" sx={{ paddingLeft: "10px", color: isActive(['/dashplanform']) ? '#fff' : '#000' }} />
                </ListItem>
                <Divider sx={{ backgroundColor: "#fff" }} />
                
                {/* Machine Allocation */}
                <ListItem 
                    button 
                    sx={{ padding: "15px 20px", backgroundColor: isActive(['/machine-allocation']) ? '#7540a7' : 'inherit' }} 
                    onClick={() => handleNavigation('/machine-allocation')}
                >
                    <ListItemText primary="Machine Allocation" sx={{ paddingLeft: "10px", color: isActive(['/machine-allocation']) ? '#fff' : '#000' }} />
                </ListItem>
                <Divider sx={{ backgroundColor: "#fff" }} />
                
                {/* Production Progress */}
                <ListItem 
                    button 
                    sx={{ padding: "15px 20px", backgroundColor: isActive(['/production-progress']) ? '#7540a7' : 'inherit' }} 
                    onClick={() => handleNavigation('/production-progress')}
                >
                    <ListItemText primary="Production Progress" sx={{ paddingLeft: "10px", color: isActive(['/production-progress']) ? '#fff' : '#000' }} />
                </ListItem>
            </List>
        </Box>
    );
};

export default Sidebar;
