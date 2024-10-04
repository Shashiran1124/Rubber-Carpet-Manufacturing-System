import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IconButton, TextField, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const SalaryManagementTable = () => {
    const [salaries, setSalaries] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate(); // Use for navigation to the update form

    // Function to fetch salaries from the server
    const fetchSalaries = async () => {
        try {
            const response = await axios.get('http://localhost:8070/salary');
            setSalaries(response.data);
        } catch (error) {
            console.error('Error fetching salary data:', error);
        }
    };

    // Fetch salaries when the component mounts
    useEffect(() => {
        fetchSalaries();
    }, []);

    // Function to handle updating a salary record
    const handleUpdate = (salary) => {
        navigate('/SalaryManagementForm', { state: { salary } }); // Navigate to the update form with salary data
    };

    // Function to handle deleting a salary record
    const handleDelete = async (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this salary record?');
        if (confirmed) {
            try {
                await axios.delete(`http://localhost:8070/salary/delete/${id}`);
                setSalaries(salaries.filter(salary => salary._id !== id));
                alert('Salary record deleted successfully!');
            } catch (error) {
                console.error('Error deleting salary record:', error);
                alert('Failed to delete salary record');
            }
        }
    };

    // Function to highlight searched text
    const highlightText = (text) => {
        if (!searchTerm) return text; // No search term, return original text
        const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'));
        return parts.map((part, index) => 
            part.toLowerCase() === searchTerm.toLowerCase() 
                ? <span key={index} style={{ backgroundColor: '#ffff99' }}>{part}</span> // Highlight matched text
                : part
        );
    };

    // Filter salaries based on search term
    const filteredSalaries = salaries.filter(salary => {
        return (
            salary.id.toString().includes(searchTerm) ||
            salary.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            salary.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
            salary.department.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', position: 'relative' }}>
            <h1 style={{ marginBottom: '20px', color: '#333' }}>Salary Management List</h1>
            <TextField
                variant="outlined"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ marginBottom: '20px', width: '100%' }}
            />
            <Button 
                variant="contained" 
                color="primary" 
                onClick={() => navigate('/Salary')} 
                style={{ position: 'absolute', top: '20px', right: '20px' }} // Positioning the button
            >
                Add Salary
            </Button>
            <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f4f4f4', color: '#333' }}>
                        <th style={{ border: '1px solid #ddd', padding: '12px' }}>Employee ID</th>
                        <th style={{ border: '1px solid #ddd', padding: '12px' }}>Employee Name</th>
                        <th style={{ border: '1px solid #ddd', padding: '12px' }}>Designation</th>
                        <th style={{ border: '1px solid #ddd', padding: '12px' }}>Department</th>
                        <th style={{ border: '1px solid #ddd', padding: '12px' }}>Month</th>
                        <th style={{ border: '1px solid #ddd', padding: '12px' }}>OT Rates</th>
                        <th style={{ border: '1px solid #ddd', padding: '12px' }}>Overtime Hours</th>
                        <th style={{ border: '1px solid #ddd', padding: '12px' }}>Hourly Rate</th>
                        <th style={{ border: '1px solid #ddd', padding: '12px' }}>Daily Hours</th>
                        <th style={{ border: '1px solid #ddd', padding: '12px' }}>Monthly Attendance</th>
                        <th style={{ border: '1px solid #ddd', padding: '12px' }}>Monthly Basic Salary(Rs.)</th>
                        <th style={{ border: '1px solid #ddd', padding: '12px' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredSalaries.map((salary, index) => (
                        <tr key={salary._id} style={{ backgroundColor: index % 2 === 1 ? '#f9f9f9' : '#fff' }}>
                            <td style={{ border: '1px solid #ddd', padding: '12px' }}>{highlightText(salary.id.toString())}</td>
                            <td style={{ border: '1px solid #ddd', padding: '12px' }}>{highlightText(salary.employeeName)}</td>
                            <td style={{ border: '1px solid #ddd', padding: '12px' }}>{highlightText(salary.designation)}</td>
                            <td style={{ border: '1px solid #ddd', padding: '12px' }}>{highlightText(salary.department)}</td>
                            <td style={{ border: '1px solid #ddd', padding: '12px' }}>{salary.month}</td>
                            <td style={{ border: '1px solid #ddd', padding: '12px' }}>{salary.otRates}</td>
                            <td style={{ border: '1px solid #ddd', padding: '12px' }}>{salary.otHours}</td>
                            <td style={{ border: '1px solid #ddd', padding: '12px' }}>{salary.hourlyRate}</td>
                            <td style={{ border: '1px solid #ddd', padding: '12px' }}>{salary.dailyHours}</td>
                            <td style={{ border: '1px solid #ddd', padding: '12px' }}>{salary.monthlyAttendance}</td>
                            <td style={{ border: '1px solid #ddd', padding: '12px' }}>{salary.monthlyBasic}</td>
                            <td style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'center' }}>
                                <IconButton 
                                    onClick={() => handleUpdate(salary)} 
                                    sx={{ color: 'green' }} // Set edit icon color to green
                                    aria-label="update"
                                >
                                    <EditIcon />
                                </IconButton>
                                <IconButton 
                                    onClick={() => handleDelete(salary._id)} 
                                    sx={{ color: 'red' }} // Set delete icon color to red
                                    aria-label="delete"
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SalaryManagementTable;
