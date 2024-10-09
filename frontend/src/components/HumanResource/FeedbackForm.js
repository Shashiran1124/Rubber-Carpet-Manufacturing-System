import React, { useState } from 'react';
import { Button, Grid, TextField, Typography, Alert } from '@mui/material';
import axios from 'axios';
import QuestionImage from '../../images/Question.jpg';
import { useNavigate } from 'react-router-dom';

const FeedbackFormhr = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        employeeId: '',
        email: '',
        phone: '',
        issue: ''
    });

    const [errors, setErrors] = useState({
        formIncomplete: false
    });

    const [success, setSuccess] = useState('');
    const [submissionError, setSubmissionError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Restrict input for firstName and lastName to letters only
        if ((name === 'firstName' || name === 'lastName') && !/^[A-Za-z]*$/.test(value)) {
            return;
        }

        // Restrict input for employeeId to numbers only
        if (name === 'employeeId' && !/^\d*$/.test(value)) {
            return;
        }

        setFormData({ ...formData, [name]: value });
    };

    const handleContactInput = (e) => {
        const value = e.target.value;

        // Allow any numeric input including backspace
        if (/^[0-9]*$/.test(value) && value.length <= 10) {
            // Validate to ensure it starts with '0' if not empty
            if (value.length === 0 || (value[0] === '0' && value.length <= 10)) {
                setFormData({ ...formData, phone: value });
            }
        }
    };

    const validate = () => {
        let valid = true;
        let errors = {
            formIncomplete: false
        };

        // Check if any field is empty
        if (!formData.firstName || !formData.lastName || !formData.employeeId || !formData.email || !formData.phone || !formData.issue) {
            errors.formIncomplete = true;
            valid = false;
        }

        setErrors(errors);
        return valid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                await axios.post('http://localhost:8070/feedback/feedback', formData);
                setSuccess('Feedback submitted successfully');
                setSubmissionError('');
                navigate('/FeedbackTable');
                // Clear the form
                setFormData({
                    firstName: '',
                    lastName: '',
                    employeeId: '',
                    email: '',
                    phone: '',
                    issue: ''
                });
            } catch (error) {
                console.error('Error submitting feedback:', error);
                setSubmissionError('Error submitting feedback');
                setSuccess('');
            }
        } else {
            setSuccess('');
        }
    };

    return (
        <Grid
            container
            spacing={2}
            sx={{
                backgroundColor: '#f5f5f5',
                padding: '20px',
                borderRadius: '15px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                maxWidth: '800px',
                margin: 'auto',
                alignItems: 'stretch',
            }}
        >
            <Grid 
                item 
                xs={12} 
                sm={4} 
                sx={{ 
                    textAlign: 'center', 
                    display: 'flex', 
                    alignItems: 'stretch' 
                }}
            >
                <div style={{ flex: 1, display: 'flex', alignItems: 'stretch' }}>
                    <img
                        src={QuestionImage}
                        alt="Feedback"
                        style={{
                            borderRadius: '10px',
                            width: '100%',
                            objectFit: 'cover',
                            height: 'auto',
                        }}
                    />
                </div>
            </Grid>

            <Grid item xs={12} sm={8} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Typography variant="h4" gutterBottom>
                    Let’s Hear You
                </Typography>
                <Typography 
                    variant="subtitle1" 
                    gutterBottom 
                    sx={{ fontSize: '0.875rem' }}
                >
                    24/7 We will answer your Questions and Problems
                </Typography>

                {errors.formIncomplete && <Alert severity="error">Please fill out all fields.</Alert>}
                {success && <Alert severity="success">{success}</Alert>}
                {submissionError && <Alert severity="error">{submissionError}</Alert>}
                
                <form onSubmit={handleSubmit} style={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="First Name"
                                variant="outlined"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                sx={{
                                    marginBottom: '15px',
                                    backgroundColor: '#fff',
                                    borderRadius: '5px',
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Last Name"
                                variant="outlined"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                sx={{
                                    marginBottom: '15px',
                                    backgroundColor: '#fff',
                                    borderRadius: '5px',
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Employee ID Number"
                                variant="outlined"
                                name="employeeId"
                                value={formData.employeeId}
                                onChange={handleChange}
                                sx={{
                                    marginBottom: '15px',
                                    backgroundColor: '#fff',
                                    borderRadius: '5px',
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Email"
                                variant="outlined"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                sx={{
                                    marginBottom: '15px',
                                    backgroundColor: '#fff',
                                    borderRadius: '5px',
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Phone"
                                variant="outlined"
                                name="phone"
                                value={formData.phone}
                                onChange={handleContactInput}
                                sx={{
                                    marginBottom: '15px',
                                    backgroundColor: '#fff',
                                    borderRadius: '5px',
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Describe your issue"
                                variant="outlined"
                                multiline
                                rows={4}
                                name="issue"
                                value={formData.issue}
                                onChange={handleChange}
                                sx={{
                                    marginBottom: '15px',
                                    backgroundColor: '#fff',
                                    borderRadius: '5px',
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{
                                    marginTop: '15px',
                                    backgroundColor: '#3f51b5',
                                    color: '#fff',
                                    '&:hover': {
                                        backgroundColor: '#2c3e9f',
                                    },
                                }}
                            >
                                Send Message
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        </Grid>
    );
};

export default FeedbackFormhr;
