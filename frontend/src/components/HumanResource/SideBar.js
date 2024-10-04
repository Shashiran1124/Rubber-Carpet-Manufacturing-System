import React, { useState } from 'react';
import { List, ListItem, ListItemText, Divider, Box } from "@mui/material";
import { Home as HomeIcon, Assessment as AssessmentIcon } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebarhr = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [active, setActive] = useState(location.pathname);

    const handleNavigation = (path) => {
        setActive(path);
        navigate(path);
    };

    const isActive = (paths) => paths.includes(active);

    return (
        <Box sx={{ width: "225px", backgroundColor: "#8D98A7", height: "230vh", paddingTop: "10px", borderRadius : "5px", border : "1.5px solid #000000" }}>
            <List sx={{ padding: 0 }}>
                
                {/* Home */}
                <ListItem 
                    button 
                    sx={{ justifyContent: 'center', padding: "20px",width: "220px", marginRight:"2px", borderRadius: "6px",marginBottom: "60px",border: "1.5px solid #000000"}} 
                    onClick={() => handleNavigation('/app')}
                >
                    <HomeIcon sx={{ color: isActive(['/app']) ? '#fff' : '#000', fontSize: "32px", marginRight: "2px" }} />
                </ListItem>
                <Divider sx={{ backgroundColor: "#fff" }} />
                
                {/* Reports */}
                <ListItem 
                    button 
                    sx={{ padding: "15px 20px", backgroundColor: isActive(['/Reporthr']) ? '#191919' : 'inherit', borderRadius: "6px",width: "220px",border: "1.5px solid #000000", marginTop: "8px", marginBottom: "8px" }} 
                    onClick={() => handleNavigation('/Reporthr')}
                >
                    <AssessmentIcon sx={{ color: isActive(['/Reporthr']) ? '#fff' : '#000' }} />
                    <ListItemText primary="Reports" sx={{ paddingLeft: "10px", color: isActive(['/Reporthr']) ? '#fff' : '#000' }} />
                </ListItem>
                <Divider sx={{ backgroundColor: "#fff" }} />
                
                {/* Employee Registration */}
                <ListItem 
                    button 
                    sx={{ padding: "15px 20px", backgroundColor: isActive(['/Employees']) ? '#191919' : 'inherit', borderRadius: "6px",width: "220px",border: "1.5px solid #000000",  marginTop: "8px", marginBottom: "8px" }} 
                    onClick={() => handleNavigation('/Employees')}
                >

                    <ListItemText 
                        primary="Employee Registration" 
                        sx={{ paddingLeft: "10px", color: isActive(['/Employees']) ? '#fff' : '#000' }} 
                    />
                </ListItem>
                <Divider sx={{ backgroundColor: "#fff" }} />
                
                {/* Employee  Feedback */}
                <ListItem 
                    button 
                    sx={{ padding: "15px 20px", backgroundColor: isActive(['/FeedbackTable']) ? '#191919' : 'inherit', borderRadius: "6px",width: "220px",border: "1.5px solid #000000",  marginTop: "8px", marginBottom: "8px"  }} 
                    onClick={() => handleNavigation('/FeedbackTable')}
                >
                    <ListItemText primary="Employee Feedback" sx={{ paddingLeft: "10px", color: isActive(['/FeedbackTable']) ? '#fff' : '#000' }} />
                </ListItem>
                <Divider sx={{ backgroundColor: "#fff" }} />
                
                
                {/* Salary Management */}
                <ListItem 
                    button 
                    sx={{ padding: "15px 20px", backgroundColor: isActive(['/Salary']) ? '#191919' : 'inherit', borderRadius: "6px",width: "220px",border: "1.5px solid #000000",  marginTop: "8px", marginBottom: "8px"  }} 
                    onClick={() => handleNavigation('/Salary')}
                >
                    <ListItemText primary="Salary Management" sx={{ paddingLeft: "10px", color: isActive(['/Salary']) ? '#fff' : '#000' }} />
                </ListItem>
                <Divider sx={{ backgroundColor: "#fff" }} />

                {/* Task Distribution Overview */}
                <ListItem 
                    button 
                    sx={{ padding: "15px 20px", backgroundColor: isActive(['/machine-allocation']) ? '#191919' : 'inherit', borderRadius: "6px",width: "220px",border: "1.5px solid #000000",  marginTop: "8px", marginBottom: "8px"  }} 
                    onClick={() => handleNavigation('/machine-allocation')}
                >
                    <ListItemText primary="Task Distribution Overview" sx={{ paddingLeft: "10px", color: isActive(['/machine-allocation']) ? '#fff' : '#000' }} />
                </ListItem>
                <Divider sx={{ backgroundColor: "#fff" }} />

            </List>
        </Box>
    );
};

export default Sidebarhr;