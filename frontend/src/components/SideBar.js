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
        <Box sx={{ width: "250px", backgroundColor: "#8D98A7", height: "250vh", paddingTop: "10px",borderRadius:"5px",border:"2px solid #000000" }}>
            <List sx={{ padding: 0 }}>
                
                {/* Home */}
                <ListItem 
                    button 
                    sx={{ justifyContent: 'center', padding: "20px 0",width:"244px",marginRight:"2px",borderRadius:"6px",border:"1px solid #7540a7",marginBottom:"60px" }} 
                    onClick={() => handleNavigation('/')}
                >
                    <HomeIcon sx={{ color: isActive(['/']) ? '#000' : '#000' }} />
                </ListItem>
                <Divider sx={{ backgroundColor: "#fff" }} />
                
                {/* Reports */}
                <ListItem 
                    button 
                    sx={{ padding: "15px 20px",width:"244px",marginRight:"2px",borderRadius:"6px",border:"2px solid #000000",marginBottom:"4px", backgroundColor: isActive(['/', '/']) ? '#3498db' : 'inherit' }} 
                    onClick={() => handleNavigation('/')}
                >
                    <AssessmentIcon sx={{ color: isActive(['/DashReport', '/DashReport']) ? '#fff' : '#000' }} />
                    <ListItemText 
                        primary="Reports" 
                        sx={{ paddingLeft: "10px", color: isActive(['/DashReport', '/DashReport']) ? '#fff' : '#000' }} 
                    />
                </ListItem>
                <Divider sx={{ backgroundColor: "#fff" }} />
                
                {/* Supplier and Raw Material Details */}
                <ListItem 
                    button 
                    sx={{ padding: "15px 20px",width:"244px",marginRight:"2px",borderRadius:"6px",border:"2px solid #000000",marginBottom:"4px", backgroundColor: isActive(['/DashSupForm', '/DashSupForm']) ? '#191919' : 'inherit' }} 
                    onClick={() => handleNavigation('/DashSupForm')}
                >
                    <ListAltIcon sx={{ color: isActive(['/DashSupForm', '/DashSupForm']) ? '#fff' : '#000' }} />
                    <ListItemText 
                        primary="Supplier and Raw Material Details" 
                        sx={{ paddingLeft: "10px", color: isActive(['/DashSupForm', '/DashSupForm']) ? '#fff' : '#000' }} 
                    />
                </ListItem>
                <Divider sx={{ backgroundColor: "#fff" }} />
                
                {/* Create An Order */}
                <ListItem
        button
        sx={{
          padding: "15px 20px",width:"244px",marginRight:"2px",borderRadius:"6px",border:"2px solid #000000",marginBottom:"4px",backgroundColor: isActive(['/DashOrderForm']) ? '#191919' : 'inherit'
        }}
        onClick={() => handleNavigation('/DashOrderForm')}
      >
        <ListItemText
          primary="Create An Order"
          sx={{
            paddingLeft: "10px",
            color: isActive(['/DashOrderForm']) ? '#fff' : '#000'
          }}
        />
      </ListItem>
      <Divider sx={{ backgroundColor: "#fff" }} />
                
                {/* View Order Details*/}
                <ListItem 
                    button 
                    sx={{ padding: "15px 20px",width:"244px",marginRight:"2px",borderRadius:"6px",border:"2px solid #000000",marginBottom:"4px", backgroundColor: isActive(['/DashOFTable']) ? '#3498db' : 'inherit' }} 
                    onClick={() => handleNavigation('/DashOFTable')}
                >
                    <ListItemText primary="View Order Details" sx={{ paddingLeft: "10px", color: isActive(['/machine-allocation']) ? '#fff' : '#000' }} />
                </ListItem>
                <Divider sx={{ backgroundColor: "#fff" }} />
                
                {/* CalculateRawMaterialCosts */}
                <ListItem 
                    button 
                    sx={{ padding: "15px 20px",width:"244px",marginRight:"2px",borderRadius:"6px",border:"2px solid #000000",marginBottom:"4px", backgroundColor: isActive(['/DashRawMaterialCostForm']) ? '#191919' : 'inherit' }} 
                    onClick={() => handleNavigation('/DashRawMaterialCostForm')}
                >
                    <ListItemText primary="Calculate Raw Material Costs" sx={{ paddingLeft: "10px", color: isActive(['/DashRawMaterialCostForm']) ? '#fff' : '#000' }} />
                </ListItem>
            </List>
        </Box>
    );
};

export default Sidebar;
