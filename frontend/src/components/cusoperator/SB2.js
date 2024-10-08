import React, { useState } from 'react';
import { List, ListItem, ListItemText, Divider, Box } from "@mui/material";
import { Home as HomeIcon, Assessment as AssessmentIcon, ListAlt as ListAltIcon } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const Osidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [active, setActive] = useState(location.pathname);

    const handleNavigation = (path) => {
        setActive(path);
        navigate(path);
    };

    const isActive = (paths) => paths.includes(active);

    return (
        <Box sx={{ width: "220px", backgroundColor: "#8D98A7", height: "224vh", paddingTop: "10px",borderRadius: "5px",border: "1.5px solid #000000" }}>
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
                
                {/* Reports */}
                <ListItem 
                    button 
                    sx={{ padding: "15px 20px", backgroundColor: isActive(['/DashRep']) ? '#191919' : 'inherit', borderRadius: "6px",width: "200px",border: "2px solid #000000",marginBottom: "4px" }} 
                    onClick={() => handleNavigation('/DashRep')}
                >
                    <ListItemText primary="Reports" sx={{ paddingLeft: "10px", color: isActive(['/DashRep']) ? '#FFF' : '#000' }} />
                </ListItem>
                <Divider sx={{ backgroundColor: "#FFF" }} />
                
                {/* Registration */}
                <ListItem 
                    button 
                    sx={{ padding: "15px 20px", backgroundColor: isActive(['/DashCReg']) ? '#191919' : 'inherit', borderRadius: "6px",width: "200px",border: "2px solid #000000",marginBottom: "4px" }} 
                    onClick={() => handleNavigation('/DashCReg')}
                >
                    <ListItemText primary="Customer Details" sx={{ paddingLeft: "10px", color: isActive(['/DashCReg']) ? '#FFF' : '#000' }} />
                </ListItem>
                <Divider sx={{ backgroundColor: "#FFF" }} />
                
                {/* View Orders */}
                <ListItem 
                    button 
                    sx={{ padding: "15px 20px", backgroundColor: isActive(['/DashOLT','/DashOpForm']) ? '#191919' : 'inherit', borderRadius: "6px",width: "200px",border: "2px solid #000000",marginBottom: "4px" }} 
                    onClick={() => handleNavigation('/DashOLT')}
                >
                    <ListItemText primary=" Order Lists" sx={{ paddingLeft: "10px", color: isActive(['/DashOLT','/DashOpForm']) ? '#FFF' : '#000' }} />
                </ListItem>
                <Divider sx={{ backgroundColor: "#FFF" }} />
                
                
                {/* Feedback Collection */}
                <ListItem 
                    button 
                    sx={{ padding: "15px 20px", backgroundColor: isActive(['/DashFeed']) ? '#191919' : 'inherit', borderRadius: "6px",width: "200px",border: "2px solid #000000",marginBottom: "4px" }} 
                    onClick={() => handleNavigation('/DashFeed')}
                >
                    <ListItemText primary="Feedback Collection" sx={{ paddingLeft: "10px", color: isActive(['/DashFeed']) ? '#FFFFFF' : '#000' }} />
                </ListItem>
                
                {/* Cal */}
                <ListItem 
                    button 
                    sx={{ padding: "15px 20px", backgroundColor: isActive(['/DashCalFo']) ? '#191919' : 'inherit', borderRadius: "6px",width: "200px",border: "2px solid #000000",marginBottom: "4px" }} 
                    onClick={() => handleNavigation('/DashCalFo')}
                >
                    <ListItemText primary=" Cal Monthly Sales Orders" sx={{ paddingLeft: "10px", color: isActive(['/DashCalFo']) ? '#FFF' : '#000' }} />
                </ListItem>
                <Divider sx={{ backgroundColor: "#FFF" }} />

            </List>
        </Box>
    );
};

export default Osidebar;