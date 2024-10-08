import React, { useState } from 'react';
import { List, ListItem, ListItemText, Divider, Box } from "@mui/material";
import { Home as HomeIcon, Assessment as AssessmentIcon, ListAlt as ListAltIcon } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebarin = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [active, setActive] = useState(location.pathname);

    const handleNavigation = (path) => {
        setActive(path);
        navigate(path);
    };

    const isActive = (paths) => paths.includes(active);

    return (
        <Box sx={{ width: "220px", backgroundColor: "#8D98A7", height: "239vh", paddingTop: "10px",borderRadius: "5px",border: "1.5px solid #000000" }}>
            <List sx={{ padding: 0 }}>
                
                {/* Home */}
                <ListItem 
                    button 
                    sx={{ justifyContent: 'center', padding: "20px ",width: "200px", marginRight:"2px", borderRadius: "6px",marginBottom: "60px"}} 
                    onClick={() => handleNavigation('/app')}
                >
                    <HomeIcon sx={{ color: isActive(['/app']) ? '#FFF' : '#000' ,fontSize: "32px", marginRight: "2px" }} />
                </ListItem>
                <Divider sx={{ backgroundColor: "#fff" }} />
                
                {/* Reports */}
                <ListItem 
                    button 
                    sx={{ padding: "15px 20px", backgroundColor: isActive(['/Dashreportin']) ? '#191919' : 'inherit', borderRadius: "6px",width: "200px",border: "2px solid #000000",marginBottom: "4px" }} 
                    onClick={() => handleNavigation('/Dashreportin')}
                >
                    <AssessmentIcon sx={{ color: isActive(['/Dashreportin']) ? '#fff' : '#000' }} />
                    <ListItemText primary="Reports" sx={{ paddingLeft: "10px", color: isActive(['/Dashreportin']) ? '#fff' : '#000' }} />
                </ListItem>
                <Divider sx={{ backgroundColor: "#fff" }} />
                
                {/* Supplier and Raw Material Details */}
                <ListItem 
                    button 
                    sx={{ padding: "15px 20px", backgroundColor: isActive(['/DashInForm', '/dashtable']) ? '#191919' : 'inherit', borderRadius: "6px",width: "200px",border: "2px solid #000000",marginBottom: "4px" }} 
                    onClick={() => handleNavigation('/DashInForm')}
                >
                    <ListAltIcon sx={{ color: isActive(['/DashInForm', '/dashtable']) ? '#fff' : '#000' }} />
                    <ListItemText 
                        primary="Receive Final Goods" 
                        sx={{ paddingLeft: "10px", color: isActive(['/DashInForm', '/dashtable']) ? '#fff' : '#000' }} 
                    />
                </ListItem>
                <Divider sx={{ backgroundColor: "#fff" }} />
                
                {/* Create An Order */}
                <ListItem
        button
        sx={{
          padding: "15px 20px",backgroundColor: isActive(['/dashreinform']) ? '#191919' : 'inherit', borderRadius: "6px",width: "200px",border: "2px solid #000000",marginBottom: "4px"}}
        onClick={() => handleNavigation('/dashreinform')}
      >
        <ListAltIcon sx={{ color: isActive(['/dashdecerawform', '/dashrecerawtable']) ? '#fff' : '#000' }} />
        <ListItemText
          primary="Release Final Goods"
          sx={{
            paddingLeft: "10px",
            color: isActive(['/dashreinform']) ? '#fff' : '#000'
          }}
        />
      </ListItem>
      <Divider sx={{ backgroundColor: "#fff" }} />



          {/* Supplier and Raw Material Details */}
          <ListItem 
                    button 
                    sx={{ padding: "15px 20px", backgroundColor: isActive(['/dashdecerawform', '/dashrecerawtable']) ? '#191919' : 'inherit', borderRadius: "6px",width: "200px",border: "2px solid #000000",marginBottom: "4px" }} 
                    onClick={() => handleNavigation('/dashdecerawform')}
                >
                    <ListAltIcon sx={{ color: isActive(['/dashdecerawform', '/dashrecerawtable']) ? '#fff' : '#000' }} />
                    <ListItemText 
                        primary="Receive Raw Materials" 
                        sx={{ paddingLeft: "10px", color: isActive(['/dashdecerawform', '/dashrecerawtable']) ? '#fff' : '#000' }} 
                    />
                </ListItem>
                <Divider sx={{ backgroundColor: "#fff" }} />
                
                <ListItem 
                    button 
                    sx={{ padding: "15px 20px", backgroundColor: isActive(['/dashrelerawform', '/dashrelerawtable']) ? '#191919' : 'inherit', borderRadius: "6px",width: "200px",border: "2px solid #000000",marginBottom: "4px" }} 
                    onClick={() => handleNavigation('/dashrelerawform')}
                >
                    <ListAltIcon sx={{ color: isActive(['/dashrelerawform', '/dashrelerawtable']) ? '#fff' : '#000' }} />
                    <ListItemText 
                        primary="Release Raw Materials" 
                        sx={{ paddingLeft: "10px", color: isActive(['/dashrelerawform', '/dashrelerawtable']) ? '#fff' : '#000' }} 
                    />
                </ListItem>
                <Divider sx={{ backgroundColor: "#fff" }} />



                
                {/* View Order Details*/}
                <ListItem 
                    button 
                    sx={{ padding: "15px 20px", backgroundColor: isActive(['/dashordertableinin']) ? '#191919' : 'inherit', borderRadius: "6px",width: "200px",border: "2px solid #000000",marginBottom: "4px" }} 
                    onClick={() => handleNavigation('/dashordertableinin')}
                >
                    <ListItemText primary="View Order Details" sx={{ paddingLeft: "10px", color: isActive(['/dashordertableinin']) ? '#fff' : '#000' }} />
                </ListItem>
                <Divider sx={{ backgroundColor: "#fff" }} />
                
              
            </List>
        </Box>
    );
};

export default Sidebarin;