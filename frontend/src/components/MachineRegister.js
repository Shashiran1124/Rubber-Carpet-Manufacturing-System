import React, { useState } from 'react';
import axios from 'axios';
import { Box, TextField, Button, Typography, Divider, Grid, Paper } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const AddMachine = () => {
    const [machineID, setMachineID] = useState('');
    const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'));
    const [status, setStatus] = useState('');
    const [nextGeneralRepairDate, setNextGeneralRepairDate] = useState(null);
    const [error, setError] = useState('');
    const [statusError, setStatusError] = useState('');

    const handleDateChange = (date) => {
        const today = dayjs().startOf('day'); // Start of today
        const selectedDate = dayjs(date).startOf('day'); // Start of the selected date
    
        if (selectedDate.isSame(today) || selectedDate.isBefore(today)) {
            setError('Next General Repair Date must be a future date.');
            setNextGeneralRepairDate(null); // Reset the selected date
        } else {
            setNextGeneralRepairDate(date);
            setError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate the status field
        if (status !== 'Active' && status !== 'Inactive') {
            setStatusError('Status must be either "Active" or "Inactive".');
            return;
        } else {
            setStatusError('');
        }

        const machineData = {
            machineID,
            date,
            status,
            nextGeneralRepairDate: nextGeneralRepairDate?.format('YYYY-MM-DD'),
        };

        try {
            const response = await axios.post('http://localhost:8070/machine/add', machineData);
            alert('Machine Added Successfully!');
        } catch (error) {
            console.error('There was an error adding the machine!', error);
            alert('Failed to add machine');
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box display="flex" height="100vh">
                {/* Sidebar */}
                <Box
                    sx={{
                        width: '20%',
                        backgroundColor: '#e0c7f3',
                        padding: '10px',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Button
                        startIcon={<HomeIcon />}
                        sx={{
                            backgroundColor: '#000',
                            color: '#fff',
                            marginBottom: '20px',
                            ':hover': { backgroundColor: '#333' },
                        }}
                    />
                    <Typography sx={{ padding: '10px 0' }}>Machine Overview</Typography>
                    <Typography sx={{ padding: '10px 0' }}>Machine Registration</Typography>
                    <Typography sx={{ padding: '10px 0' }}>Invoice Upload</Typography>
                    <Typography sx={{ padding: '10px 0' }}>Download Report</Typography>
                </Box>

                {/* Main Content */}
                <Box sx={{ width: '80%', padding: '20px' }}>
                    <Paper elevation={3} sx={{ padding: '20px' }}>
                        <Grid container justifyContent="space-between">
                            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                                Mechanical Inspector
                            </Typography>
                            <Paper
                                elevation={1}
                                sx={{
                                    padding: '5px 10px',
                                    backgroundColor: '#e0f2f1',
                                    display: 'inline-block',
                                }}
                            >
                                {date}
                            </Paper>
                        </Grid>
                        <Divider sx={{ margin: '20px 0' }} />

                        <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
                            <TextField
                                fullWidth
                                label="New Machine ID"
                                variant="outlined"
                                margin="normal"
                                value={machineID}
                                onChange={(e) => setMachineID(e.target.value)}
                                required
                            />
                            <TextField
                                fullWidth
                                label="Date"
                                variant="outlined"
                                margin="normal"
                                value={date}
                                InputProps={{
                                    readOnly: true,
                                }}
                                required
                            />
                            <TextField
                                fullWidth
                                label="Working Condition"
                                variant="outlined"
                                margin="normal"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                error={!!statusError}
                                helperText={statusError}
                                required
                            />
                            <DatePicker
                                label="Next General Repair Date"
                                value={nextGeneralRepairDate}
                                onChange={handleDateChange}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        fullWidth
                                        margin="normal"
                                        error={!!error}
                                        helperText={error}
                                        required
                                    />
                                )}
                            />
                            <Button
                                variant="contained"
                                sx={{ backgroundColor: '#7e57c2', color: '#fff', marginTop: '20px'}}
                                fullWidth
                                type="submit"
                            >
                                Submit
                            </Button>
                        </Box>
                    </Paper>
                </Box>
            </Box>
        </LocalizationProvider>
    );
};

export default AddMachine;
