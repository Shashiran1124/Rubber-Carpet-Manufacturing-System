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
        <Box sx={{ width: "220px", backgroundColor: "#8D98A7", height: "120vh", paddingTop: "10px",borderRadius: "5px",border: "1.5px solid #000000" }}>
            <List sx={{ padding: 0 }}>
                
                {/* Home */}
                <ListItem 
                    button 
                    sx={{ justifyContent: 'center', padding: "20px ",width: "200px", marginRight:"2px", borderRadius: "6px",marginBottom: "60px"}} 
                    onClick={() => handleNavigation('/')}
                >
                    <HomeIcon sx={{ color: isActive(['/']) ? '#FFF' : '#000',fontSize: "32px", marginRight: "2px" }} />
                </ListItem>
                <Divider sx={{ backgroundColor: "#fff" }} />
                
                
                
                {/* View and Update Orders */}
                <ListItem 
                    button 
                    sx={{ padding: "15px 20px", backgroundColor: isActive(['/DashOrderFormm1']) ? '#191919' : 'inherit', borderRadius: "6px",width: "200px",border: "2px solid #000000",marginBottom: "4px" }} 
                    onClick={() => handleNavigation('/DashOrderFormm1')}
                >
                    <ListItemText primary="Create an Order" sx={{ paddingLeft: "10px", color: isActive(['/DashOrderFormm1']) ? '#FFF' : '#000' }} />
                </ListItem>
                <Divider sx={{ backgroundColor: "#FFF" }} />
                
                
                {/* Feedback Collection */}
                <ListItem 
                    button 
                    sx={{ padding: "15px 20px", backgroundColor: isActive(['/DashFeedbackForm']) ? '#191919' : 'inherit', borderRadius: "6px",width: "200px",border: "2px solid #000000",marginBottom: "4px" }} 
                    onClick={() => handleNavigation('/DashFeedbackForm')}
                >
                    <ListItemText primary="Give Feedback" sx={{ paddingLeft: "10px", color: isActive(['/DashFeedbackForm']) ? '#FFFFFF' : '#000' }} />
                </ListItem>
            </List>
        </Box>
    );
};

export default Sidebar;