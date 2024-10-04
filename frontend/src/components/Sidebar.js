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
                
                {/* Reports 
                <ListItem 
                    button 
                    sx={{ padding: "15px 20px", backgroundColor: isActive(['/DashRep']) ? '#191919' : 'inherit', borderRadius: "6px",width: "200px",border: "2px solid #000000",marginBottom: "4px" }} 
                    onClick={() => handleNavigation('/DashRep')}
                >
                    <ListItemText primary="Reports" sx={{ paddingLeft: "10px", color: isActive(['/DashRep']) ? '#FFF' : '#000' }} />
                </ListItem>
                <Divider sx={{ backgroundColor: "#FFF" }} />*/}
                
                {/* salary create*/}
                <ListItem 
                    button 
                    sx={{ padding: "15px 20px", backgroundColor: isActive(['/salaryCal/add']) ? '#191919' : 'inherit', borderRadius: "6px",width: "200px",border: "2px solid #000000",marginBottom: "4px" }} 
                    onClick={() => handleNavigation('/salaryCal/add')}
                >
                    <ListItemText primary="Create Salary" sx={{ paddingLeft: "10px", color: isActive(['/salaryCal/add']) ? '#FFF' : '#000' }} />
                </ListItem>
                <Divider sx={{ backgroundColor: "#FFF" }} />
                
                {/* View saalry*/}
                <ListItem 
                    button 
                    sx={{ padding: "15px 20px", backgroundColor: isActive(['/salaryCal/all','/DashOpForm']) ? '#191919' : 'inherit', borderRadius: "6px",width: "200px",border: "2px solid #000000",marginBottom: "4px" }} 
                    onClick={() => handleNavigation('/salaryCal/all')}
                >
                    <ListItemText primary="Salary view" sx={{ paddingLeft: "10px", color: isActive(['/salaryCal/all','/DashOpForm']) ? '#FFF' : '#000' }} />
                </ListItem>
                <Divider sx={{ backgroundColor: "#FFF" }} />
                
                
                {/* petty cash*/}
                <ListItem 
                    button 
                    sx={{ padding: "15px 20px", backgroundColor: isActive(['/pettyCash/add']) ? '#191919' : 'inherit', borderRadius: "6px",width: "200px",border: "2px solid #000000",marginBottom: "4px" }} 
                    onClick={() => handleNavigation('/pettyCash/add')}
                >
                    <ListItemText primary="Pettycash adding" sx={{ paddingLeft: "10px", color: isActive(['/pettyCash/add']) ? '#FFFFFF' : '#000' }} />
                </ListItem>
                
                {/* Cal */}
                <ListItem 
                    button 
                    sx={{ padding: "15px 20px", backgroundColor: isActive(['/pettyCash/all']) ? '#191919' : 'inherit', borderRadius: "6px",width: "200px",border: "2px solid #000000",marginBottom: "4px" }} 
                    onClick={() => handleNavigation('/pettyCash/all')}
                >
                    <ListItemText primary=" PettyCash View" sx={{ paddingLeft: "10px", color: isActive(['/pettyCash/all']) ? '#FFF' : '#000' }} />
                </ListItem>

                <ListItem 
                    button 
                    sx={{ padding: "15px 20px", backgroundColor: isActive(['/profitAndLosts/add']) ? '#191919' : 'inherit', borderRadius: "6px",width: "200px",border: "2px solid #000000",marginBottom: "4px" }} 
                    onClick={() => handleNavigation('/profitAndLosts/add')}
                >
                    <ListItemText primary="Income Expenses Form " sx={{ paddingLeft: "10px", color: isActive(['/profitAndLosts/add']) ? '#FFF' : '#000' }} />
                </ListItem>
                <Divider sx={{ backgroundColor: "#FFF" }} />

                <ListItem 
                    button 
                    sx={{ padding: "15px 20px", backgroundColor: isActive(['/profitAndLosts/all']) ? '#191919' : 'inherit', borderRadius: "6px",width: "200px",border: "2px solid #000000",marginBottom: "4px" }} 
                    onClick={() => handleNavigation('/profitAndLosts/all')}
                >
                    <ListItemText primary="Income Expenses " sx={{ paddingLeft: "10px", color: isActive(['/profitAndLosts/all']) ? '#FFF' : '#000' }} />
                </ListItem>
                <Divider sx={{ backgroundColor: "#FFF" }} />
                

                
                

            </List>
        </Box>
    );
};

export default Sidebar;