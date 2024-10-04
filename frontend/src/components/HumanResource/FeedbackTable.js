import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TableSortLabel, Tooltip, Button, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    color: theme.palette.common.white,
    fontWeight: 'bold',
}));

const StyledTableRow = styled(TableRow)(({ theme, odd }) => ({
    backgroundColor: odd ? theme.palette.action.hover : theme.palette.background.paper,
}));

const FeedbackTablehr = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchFeedbacks = async () => {
        try {
            const response = await axios.get('http://localhost:8070/feedback/feedback');
            setFeedbacks(response.data);
        } catch (error) {
            console.error('Error fetching feedbacks:', error);
        }
    };

    useEffect(() => {
        fetchFeedbacks();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8070/feedback/feedback/${id}`);
            setFeedbacks(feedbacks.filter(feedback => feedback._id !== id));
        } catch (error) {
            console.error('Error deleting feedback:', error);
        }
    };

    // Filter feedbacks based on the search term
    const filteredFeedbacks = feedbacks.filter(feedback => 
        feedback.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        feedback.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        feedback.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        feedback.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        feedback.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
        feedback.issue.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Scroll to the first matching row
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        const matchingRow = filteredFeedbacks[0]; // Get the first matching feedback
        if (matchingRow) {
            const rowElement = document.getElementById(matchingRow._id); // Use the feedback ID for the row
            if (rowElement) {
                rowElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    };

    return (
        <TableContainer component={Paper} sx={{ marginTop: 4 }}>
            <Typography variant="h4" align="center" gutterBottom sx={{ marginBottom: 2 }}>
                Feedback List
            </Typography>
            <TextField
                label="Search Feedback"
                variant="outlined"
                value={searchTerm}
                onChange={handleSearch}
                sx={{ marginBottom: 2, width: '100%' }}
            />
            <Table>
                <TableHead>
                    <TableRow>
                        <StyledTableCell>
                            <TableSortLabel>First Name</TableSortLabel>
                        </StyledTableCell>
                        <StyledTableCell>
                            <TableSortLabel>Last Name</TableSortLabel>
                        </StyledTableCell>
                        <StyledTableCell>
                            <TableSortLabel>Employee ID</TableSortLabel>
                        </StyledTableCell>
                        <StyledTableCell>
                            <TableSortLabel>Email</TableSortLabel>
                        </StyledTableCell>
                        <StyledTableCell>
                            <TableSortLabel>Phone</TableSortLabel>
                        </StyledTableCell>
                        <StyledTableCell>
                            <TableSortLabel>Issue</TableSortLabel>
                        </StyledTableCell>
                        <StyledTableCell>
                            <TableSortLabel>Actions</TableSortLabel>
                        </StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredFeedbacks.map((feedback, index) => (
                        <StyledTableRow key={feedback._id} id={feedback._id} odd={index % 2 === 1} style={{ backgroundColor: searchTerm && (feedback.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || feedback.lastName.toLowerCase().includes(searchTerm.toLowerCase()) || feedback.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) || feedback.email.toLowerCase().includes(searchTerm.toLowerCase()) || feedback.phone.toLowerCase().includes(searchTerm.toLowerCase()) || feedback.issue.toLowerCase().includes(searchTerm.toLowerCase())) ? '#d1e7dd' : 'inherit' }}>
                            <TableCell>{feedback.firstName}</TableCell>
                            <TableCell>{feedback.lastName}</TableCell>
                            <TableCell>{feedback.employeeId}</TableCell>
                            <TableCell>{feedback.email}</TableCell>
                            <TableCell>{feedback.phone}</TableCell>
                            <TableCell>{feedback.issue}</TableCell>
                            <TableCell>
                                <Tooltip title="Delete">
                                    <Button 
                                        onClick={() => handleDelete(feedback._id)} 
                                        color="error" 
                                        variant="contained"
                                    >
                                        Delete
                                    </Button>
                                </Tooltip>
                            </TableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default FeedbackTablehr;
