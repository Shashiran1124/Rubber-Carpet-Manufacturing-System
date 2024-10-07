import { Button, Grid, TextField, Typography, Link, Select, MenuItem, InputLabel, FormControl } from "@mui/material"; // Import necessary components
import { useState, useEffect } from "react";
import SalaryImage from '../../images/Salary.jpg';
import { useNavigate, useLocation } from "react-router-dom";

const SalaryManagementForm = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const employee = location.state?.salary || {};
    const [id, setId] = useState(employee.id || '');
    const [employeeName, setEmployeeName] = useState(employee.employeeName || '');
    const [designation, setDesignation] = useState(employee.designation || '');
    const [department, setDepartment] = useState(employee.department || ''); // Set initial value for Department
    const [month, setMonth] = useState(employee.month || ''); // Set initial value for Month
    const [otRates, setOtRates] = useState(employee.otRates || '');
    const [otHours, setOtHours] = useState(employee.otHours || '');
    const [hourlyRate, setHourlyRate] = useState(employee.hourlyRate || '');
    const [dailyHours, setDailyHours] = useState(employee.dailyHours || '');
    const [monthlyAttendance, setMonthlyAttendance] = useState(employee.monthlyAttendance || '');
    const [monthlyBasic, setMonthlyBasic] = useState(0);

    // Calculate Monthly Basic when relevant inputs change
    useEffect(() => {
        const basic = (parseFloat(hourlyRate) || 0) * (parseFloat(dailyHours) || 0) * (parseFloat(monthlyAttendance) || 0);
        setMonthlyBasic(basic);
    }, [hourlyRate, dailyHours, monthlyAttendance]);

    const handleNumericInput = (e, setter) => {
        const value = e.target.value;
        if (/^\d*\.?\d*$/.test(value)) {
            setter(value);
        }
    };

    const handleTextInput = (e, setter) => {
        const value = e.target.value;
        if (/^[A-Za-z\s]*$/.test(value)) {
            setter(value);
        }
    };

    const handleSubmit = async () => {
        const salaryData = {
            id,
            employeeName,
            designation,
            department, // Add department to payload
            month, // Add month to payload
            otRates,
            otHours,
            hourlyRate,
            dailyHours,
            monthlyAttendance,
            monthlyBasic
        };
    
        try {
            const endpoint = employee._id 
                ? `http://localhost:8070/salary/update/${employee._id}` 
                : 'http://localhost:8070/salary/register';
    
            const method = employee._id ? 'PUT' : 'POST';
    
            const response = await fetch(endpoint, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(salaryData),
            });
    
            if (response.ok) {
                alert(employee._id ? 'Salary updated successfully!' : 'Salary added successfully!');
                navigate('/SalaryManagementTable');
            } else {
                alert('Failed to process salary. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while processing the salary.');
        }
    };
    
    return (
        <Grid
            container
            spacing={2}
            sx={{
                backgroundColor: '#f7f7f7',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                maxWidth: '800px',
                margin: 'auto',
                marginTop: '30px',
                paddingBottom: '1in',
            }}
        >
            <Grid item xs={12} sx={{ textAlign: 'center', marginBottom: '20px' }}>
                <Typography
                    component={'h1'}
                    sx={{
                        color: '#333333',
                        fontWeight: 'bold',
                        fontSize: '24px',
                    }}
                >
                    {employee._id ? 'Update Salary' : 'Salary Management'}
                </Typography>
            </Grid>

            <Grid item xs={12} sm={4} sx={{ textAlign: 'center', display: 'flex', alignItems: 'stretch' }}>
                <div style={{ flex: 1 }}>
                    <img
                        src={SalaryImage}
                        alt="Salary"
                        style={{
                            borderRadius: '10px',
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                        }}
                    />
                </div>
            </Grid>

            <Grid item xs={12} sm={8}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography
                            component={'h2'}
                            sx={{
                                color: '#555555',
                                textAlign: 'left',
                                fontSize: '20px',
                                marginBottom: '10px',
                            }}
                        >
                            Salary Information
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Employee ID"
                            variant="outlined"
                            value={id}
                            onChange={e => handleNumericInput(e, setId)}
                            sx={{ marginBottom: '20px' }}
                            inputProps={{ maxLength: 10, inputMode: 'numeric' }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Employee Name"
                            variant="outlined"
                            value={employeeName}
                            onChange={e => handleTextInput(e, setEmployeeName)}
                            sx={{ marginBottom: '20px' }}
                        />
                    </Grid>

                    {/* Designation dropdown */}
                    <Grid item xs={12}>
                        <FormControl fullWidth sx={{ marginBottom: '20px' }}>
                            <InputLabel>Designation</InputLabel>
                            <Select
                                value={designation}
                                onChange={e => setDesignation(e.target.value)}
                                label="Designation"
                            >
                                <MenuItem value="Production Manager">Production Manager</MenuItem>
                                <MenuItem value="Inventory Manager">Inventory Manager</MenuItem>
                                <MenuItem value="Human Resource Manager">Human Resource Manager</MenuItem>
                                <MenuItem value="Supervisor">Supervisor</MenuItem>
                                <MenuItem value="Machine Operator">Machine Operator</MenuItem>
                                <MenuItem value="Customer Service Operator">Customer Service Operator</MenuItem>
                                <MenuItem value="Distributor">Distributor</MenuItem>
                                <MenuItem value="Transportation Planner">Transportation Planner</MenuItem>
                                <MenuItem value="Supplier Manager">Supplier Manager</MenuItem>
                                <MenuItem value="Mechanical Inspector">Mechanical Inspector</MenuItem>
                                <MenuItem value="Accountant">Accountant</MenuItem>
                                <MenuItem value="Financial Manager">Financial Manager</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* Department dropdown */}
                    <Grid item xs={12}>
                        <FormControl fullWidth sx={{ marginBottom: '20px' }}>
                            <InputLabel>Department</InputLabel>
                            <Select
                                value={department}
                                onChange={e => setDepartment(e.target.value)}
                                label="Department"
                            >
                                <MenuItem value="Supplier Handling">Supplier Handling</MenuItem>
                                <MenuItem value="Inventory Department">Inventory Department</MenuItem>
                                <MenuItem value="Production Department">Production Department</MenuItem>
                                <MenuItem value="Human Resource Department">Human Resource Department</MenuItem>
                                <MenuItem value="Financial Department">Financial Department</MenuItem>
                                <MenuItem value="Customer Service">Customer Service</MenuItem>
                                <MenuItem value="Distribution Department">Distribution Department</MenuItem>
                                <MenuItem value="Machine Repair Department">Machine Repaire Department</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* Month dropdown */}
                    <Grid item xs={12}>
                        <FormControl fullWidth sx={{ marginBottom: '20px' }}>
                            <InputLabel>Month</InputLabel>
                            <Select
                                value={month}
                                onChange={e => setMonth(e.target.value)}
                                label="Month"
                            >
                                <MenuItem value="January">January</MenuItem>
                                <MenuItem value="February">February</MenuItem>
                                <MenuItem value="March">March</MenuItem>
                                <MenuItem value="April">April</MenuItem>
                                <MenuItem value="May">May</MenuItem>
                                <MenuItem value="June">June</MenuItem>
                                <MenuItem value="July">July</MenuItem>
                                <MenuItem value="August">August</MenuItem>
                                <MenuItem value="September">September</MenuItem>
                                <MenuItem value="October">October</MenuItem>
                                <MenuItem value="November">November</MenuItem>
                                <MenuItem value="December">December</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="OT Rate"
                            variant="outlined"
                            value={otRates}
                            onChange={e => handleNumericInput(e, setOtRates)}
                            sx={{ marginBottom: '20px' }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="No. of OT Hours per Month"
                            variant="outlined"
                            value={otHours}
                            onChange={e => handleNumericInput(e, setOtHours)}
                            sx={{ marginBottom: '20px' }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Normal Hourly Rate - Rupees"
                            variant="outlined"
                            value={hourlyRate}
                            onChange={e => handleNumericInput(e, setHourlyRate)}
                            sx={{ marginBottom: '20px' }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Daily Hours"
                            variant="outlined"
                            value={dailyHours}
                            onChange={e => handleNumericInput(e, setDailyHours)}
                            sx={{ marginBottom: '20px' }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Attendance (Monthly)"
                            variant="outlined"
                            value={monthlyAttendance}
                            onChange={e => handleNumericInput(e, setMonthlyAttendance)}
                            sx={{ marginBottom: '20px' }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="h6" sx={{ textAlign: 'left' }}>
                            Monthly Basic: {monthlyBasic.toFixed(2)} Rupees
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{
                                backgroundColor: '#00bfa5',
                                color: '#fff',
                                '&:hover': {
                                    backgroundColor: '#009688',
                                },
                            }}
                            onClick={handleSubmit}
                        >
                            {employee._id ? 'Update Salary' : 'Submit Salary'}
                        </Button>
                    </Grid>

                    <Grid item xs={12}>
                        <Link href="/SalaryManagementTable" underline="none" sx={{ display: 'block', textAlign: 'center', marginTop: '10px' }}>
                            Go Back to Table
                        </Link>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default SalaryManagementForm;
