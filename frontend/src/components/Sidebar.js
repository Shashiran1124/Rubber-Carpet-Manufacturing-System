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
        <Box sx={{ width: "220px", backgroundColor: "#8D98A7", height: "230vh", paddingTop: "10px",borderRadius: "5px",border: "1.5px solid #000000" }}>
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
                
                {/* Machine add */}
                <ListItem 
                    button 
                    sx={{ padding: "15px 20px", backgroundColor: isActive(['/machine/add']) ? '#191919' : 'inherit', borderRadius: "6px",width: "200px",border: "2px solid #000000",marginBottom: "4px" }} 
                    onClick={() => handleNavigation('/machine/add')}
                >
                    <ListItemText primary="Add New Machine" sx={{ paddingLeft: "10px", color: isActive(['/machine/add']) ? '#FFF' : '#000' }} />
                </ListItem>
                <Divider sx={{ backgroundColor: "#FFF" }} />
                
                {/*machine all */}
                <ListItem 
                    button 
                    sx={{ padding: "15px 20px", backgroundColor: isActive(['/machine/all']) ? '#191919' : 'inherit', borderRadius: "6px",width: "200px",border: "2px solid #000000",marginBottom: "4px" }} 
                    onClick={() => handleNavigation('/machine/all')}
                >
                    <ListItemText primary="Machine and Record" sx={{ paddingLeft: "10px", color: isActive(['/machine/all']) ? '#FFF' : '#000' }} />
                </ListItem>
                <Divider sx={{ backgroundColor: "#FFF" }} />
                
                {/* machine parts*/}
                <ListItem 
                    button 
                    sx={{ padding: "15px 20px", backgroundColor: isActive(['/Part/add','/DashOpForm']) ? '#191919' : 'inherit', borderRadius: "6px",width: "200px",border: "2px solid #000000",marginBottom: "4px" }} 
                    onClick={() => handleNavigation('/Part/add')}
                >
                    <ListItemText primary="Machine part Buy" sx={{ paddingLeft: "10px", color: isActive(['/Part/add','/DashOpForm']) ? '#FFF' : '#000' }} />
                </ListItem>
                <Divider sx={{ backgroundColor: "#FFF" }} />
                
                
                {/* view machine parts */}
                <ListItem 
                    button 
                    sx={{ padding: "15px 20px", backgroundColor: isActive(['/Part/all']) ? '#191919' : 'inherit', borderRadius: "6px",width: "200px",border: "2px solid #000000",marginBottom: "4px" }} 
                    onClick={() => handleNavigation('/Part/all')}
                >
                    <ListItemText primary="All Machine parts" sx={{ paddingLeft: "10px", color: isActive(['/Part/all']) ? '#FFFFFF' : '#000' }} />
                </ListItem>
                
                {/* Cal 
                <ListItem 
                    button 
                    sx={{ padding: "15px 20px", backgroundColor: isActive(['/DashCalFo']) ? '#191919' : 'inherit', borderRadius: "6px",width: "200px",border: "2px solid #000000",marginBottom: "4px" }} 
                    onClick={() => handleNavigation('/DashCalFo')}
                >
                    <ListItemText primary=" Cal Monthly Sales Orders" sx={{ paddingLeft: "10px", color: isActive(['/DashCalFo']) ? '#FFF' : '#000' }} />
                </ListItem>
                <Divider sx={{ backgroundColor: "#FFF" }} /> */}

            </List>
        </Box>
    );
};

export default Sidebar;