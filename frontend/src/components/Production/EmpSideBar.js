import React, { useState } from 'react';
import { List, ListItem, ListItemText, Divider, Box } from "@mui/material";
import { Home as HomeIcon, Assessment as AssessmentIcon, ListAlt as ListAltIcon } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const EmpSidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [active, setActive] = useState(location.pathname);

    const handleNavigation = (path) => {
        setActive(path);
        navigate(path);
    };

    const isActive = (paths) => paths.includes(active);

    return (
        <Box sx={{ width: "250px", backgroundColor: "#d0d7df", height: "100vh", paddingTop: "10px" }}> {/* Background color changed */}
            <List sx={{ padding: 0 }}>
                
                {/* Home */}
                <ListItem 
                    button 
                    sx={{ 
                        justifyContent: 'center', 
                        padding: "20px 0", 
                        border: '2px solid #354a5f', // Add border/frame
                        borderRadius: '5px', // Optional: add border-radius to make the edges smoother
                        margin: "5px", // Add margin between buttons
                        backgroundColor: isActive(['/app']) ? '#354a5f' : 'inherit' // Add active color effect
                    }} 
                    onClick={() => handleNavigation('/app')}
                >
                    <HomeIcon sx={{ color: isActive(['/app']) ? '#ffffff' : '#2c3e50' }} />
                </ListItem>
                <Divider sx={{ backgroundColor: "#ffffff" }} />
                
                {/* Reports */}
                <ListItem 
                    button 
                    sx={{ 
                        padding: "15px 20px", 
                        border: '2px solid #354a5f', // Add border/frame
                        borderRadius: '5px', 
                        margin: "5px", 
                        backgroundColor: isActive(['/empdashreports']) ? '#354a5f' : 'inherit' 
                    }} 
                    onClick={() => handleNavigation('/empdashreports')}
                >
                    <AssessmentIcon sx={{ color: isActive(['/empdashreports']) ? '#ffffff' : '#2c3e50' }} />
                    <ListItemText primary="Reports" sx={{ paddingLeft: "10px", color: isActive(['/empdashreports']) ? '#ffffff' : '#2c3e50' }} />
                </ListItem>
                <Divider sx={{ backgroundColor: "#ffffff" }} />
                
                {/* Supplier and Raw Material Details */}
                <ListItem 
                    button 
                    sx={{ 
                        padding: "15px 20px", 
                        border: '2px solid #354a5f', // Add border/frame
                        borderRadius: '5px', 
                        margin: "5px", 
                        backgroundColor: isActive(['/empdashordertable']) ? '#354a5f' : 'inherit' 
                    }} 
                    onClick={() => handleNavigation('/empdashordertable')}
                >
                    <ListAltIcon sx={{ color: isActive(['/empdashordertable']) ? '#ffffff' : '#2c3e50' }} />
                    <ListItemText 
                        primary="Work Order" 
                        sx={{ paddingLeft: "10px", color: isActive(['/empdashordertable']) ? '#ffffff' : '#2c3e50' }} 
                    />
                </ListItem>
                <Divider sx={{ backgroundColor: "#ffffff" }} />
                
                {/* Create An Order */}
                <ListItem
                    button
                    sx={{ 
                    padding: "15px 20px", 
                    border: '2px solid #354a5f', // Add border/frame
                    borderRadius: '5px', 
                    margin: "5px", 
                    backgroundColor: isActive(['/empdashplantable']) ? '#354a5f' : 'inherit'
                    }}
                    onClick={() => handleNavigation('/empdashplantable')}
                >
                    <ListAltIcon sx={{ color: isActive(['/empdashplantable']) ? '#ffffff' : '#2c3e50' }} />
                    <ListItemText
                    primary="Production Plane"
                    sx={{ paddingLeft: "10px", color: isActive(['/empdashplantable']) ? '#ffffff' : '#2c3e50' }}
                    />
                </ListItem>
                 <Divider sx={{ backgroundColor: "#ffffff" }} />
                
                {/* View Order Details */}
                <ListItem 
                    button 
                    sx={{ 
                        padding: "15px 20px", 
                        border: '2px solid #354a5f', // Add border/frame
                        borderRadius: '5px', 
                        margin: "5px", 
                        backgroundColor: isActive(['/empdashmachitable']) ? '#354a5f' : 'inherit' 
                    }} 
                    onClick={() => handleNavigation('/empdashmachitable')}
                >
                    <ListItemText primary="Machine Allocation" sx={{ paddingLeft: "10px", color: isActive(['/empdashmachitable']) ? '#ffffff' : '#2c3e50' }} />
                </ListItem>
                <Divider sx={{ backgroundColor: "#ffffff" }} />
                
                {/* CalculateRawMaterialCosts */}
                <ListItem 
                    button 
                    sx={{ 
                        padding: "15px 20px", 
                        border: '2px solid #354a5f', // Add border/frame
                        borderRadius: '5px', 
                        margin: "5px", 
                        backgroundColor: isActive(['/empdashprotable']) ? '#354a5f' : 'inherit' 
                    }} 
                    onClick={() => handleNavigation('/empdashprotable')}
                >
                    <ListItemText primary="Production Progress" sx={{ paddingLeft: "10px", color: isActive(['/empdashprotable']) ? '#ffffff' : '#2c3e50' }} />
                </ListItem>


                    {/* CalculateRawMaterialCosts */}
                <ListItem 
                    button 
                    sx={{ 
                        padding: "15px 20px", 
                        border: '2px solid #354a5f', // Add border/frame
                        borderRadius: '5px', 
                        margin: "5px", 
                        backgroundColor: isActive(['/Feedback']) ? '#354a5f' : 'inherit' 
                    }} 
                    onClick={() => handleNavigation('/Feedback')}
                >
                    <ListItemText primary="Employee Feedback" sx={{ paddingLeft: "10px", color: isActive(['/Feedback']) ? '#ffffff' : '#2c3e50' }} />
                </ListItem>



            </List>
        </Box>
    );
};

export default EmpSidebar;
