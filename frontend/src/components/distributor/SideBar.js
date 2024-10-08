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
        <Box sx={{ width: "220px", backgroundColor: "#8D98A7", height: "300vh", paddingTop: "10px", borderRadius: "5px", border: "1.5px solid #000000" }}>
            <List sx={{ padding: 0 }}>
                
                {/* Home */}
                <ListItem 
                    button 
                    sx={{ justifyContent: 'center', padding: "20px", width: "220px", marginRight: "2px", borderRadius: "6px", marginBottom: "60px" }} 
                    onClick={() => handleNavigation('/app')}
                >
                    <HomeIcon sx={{ color: isActive(['/app']) ? '#FFF' : '#000', fontSize: "32px", marginRight: "2px" }} />
                </ListItem>
                <Divider sx={{ backgroundColor: "#fff" }} />
                
                {/* Reports */}
                <ListItem 
                    button 
                    sx={{ padding: "15px 20px", backgroundColor: isActive(['/dashreport']) ? '#191919' : 'inherit', borderRadius: "6px", width: "220px", border: "2px solid #000000", marginBottom: "4px" }} 
                    onClick={() => handleNavigation('/dashreport')}
                >
                    <AssessmentIcon sx={{ color: isActive(['/dashreport']) ? '#FFF' : '#000', marginRight: "10px" }} />
                    <ListItemText primary="Reports" sx={{ color: isActive(['/dashreport']) ? '#FFF' : '#000' }} />
                </ListItem>
                <Divider sx={{ backgroundColor: "#FFF" }} />
                
                {/* Transportation Service */}
                <ListItem 
                    button 
                    sx={{ padding: "15px 20px", backgroundColor: isActive(['/dashuser']) ? '#191919' : 'inherit', borderRadius: "6px", width: "220px", border: "2px solid #000000", marginBottom: "4px" }} 
                    onClick={() => handleNavigation('/dashuser')}
                >
                    <ListAltIcon sx={{ color: isActive(['/dashuser']) ? '#FFF' : '#000', marginRight: "10px" }} />
                    <ListItemText primary="Transportation Service" sx={{ color: isActive(['/dashuser']) ? '#FFF' : '#000' }} />
                </ListItem>
                <Divider sx={{ backgroundColor: "#FFF" }} />
                
                {/* Order Tracking Service */}
                <ListItem 
                    button 
                    sx={{ padding: "15px 20px", backgroundColor: isActive(['/dashorder']) ? '#191919' : 'inherit', borderRadius: "6px", width: "220px", border: "2px solid #000000", marginBottom: "4px" }} 
                    onClick={() => handleNavigation('/dashorder')}
                >
                    <ListItemText primary="Order Tracking Service" sx={{ color: isActive(['/dashorder']) ? '#FFF' : '#000' }} />
                </ListItem>
                <Divider sx={{ backgroundColor: "#FFF" }} />
                
                {/* Performance Monitoring */}
                <ListItem 
                    button 
                    sx={{ padding: "15px 20px", backgroundColor: isActive(['/dashkpi']) ? '#191919' : 'inherit', borderRadius: "6px", width: "220px", border: "2px solid #000000", marginBottom: "4px" }} 
                    onClick={() => handleNavigation('/dashkpi')}
                >
                    <ListItemText primary="Performance Monitoring" sx={{ color: isActive(['/dashkpi']) ? '#FFF' : '#000' }} />
                </ListItem>
                <Divider sx={{ backgroundColor: "#FFF" }} />

                {/* Cost Category */}
                <ListItem 
                    button 
                    sx={{ padding: "15px 20px", backgroundColor: isActive(['/dashcost']) ? '#191919' : 'inherit', borderRadius: "6px", width: "220px", border: "2px solid #000000", marginBottom: "4px" }} 
                    onClick={() => handleNavigation('/dashcost')}
                >
                    <ListItemText primary="Cost Category" sx={{ color: isActive(['/dashcost']) ? '#FFF' : '#000' }} />
                </ListItem>
                <Divider sx={{ backgroundColor: "#FFF" }} />


                {/* View Order */}
                <ListItem 
                    button 
                    sx={{ padding: "15px 20px", backgroundColor: isActive(['/dashordertabledis']) ? '#191919' : 'inherit', borderRadius: "6px", width: "220px", border: "2px solid #000000", marginBottom: "4px" }} 
                    onClick={() => handleNavigation('/dashordertabledis')}
                >
                    <ListAltIcon sx={{ color: isActive(['/dashordertabledis']) ? '#FFF' : '#000', marginRight: "10px" }} />
                    <ListItemText primary="View Order" sx={{ color: isActive(['/dashordertabledis']) ? '#FFF' : '#000' }} />
                </ListItem>
                <Divider sx={{ backgroundColor: "#FFF" }} />
                
            </List>
        </Box>
    );
};

export default Sidebar;
