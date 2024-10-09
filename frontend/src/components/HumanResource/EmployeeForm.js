import { Button, Grid, TextField, Typography, MenuItem, Link } from "@mui/material";
import { useState, useEffect, useMemo } from "react";
import RegistrationImage from '../../images/Registration.jpg';
import { useNavigate, useLocation } from "react-router-dom";

const EmployeeForm = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const employee = useMemo(() => location.state?.employee || {}, [location.state]);
    const [id, setId] = useState(employee.id || '');
    const [firstName, setFirstName] = useState(employee.firstName || '');
    const [lastName, setLastName] = useState(employee.lastName || '');
    const [dob, setDob] = useState(employee.dob || '');
    const [gender, setGender] = useState(employee.gender || '');
    const [designation, setDesignation] = useState(employee.designation || ''); 
    const [nic, setNic] = useState(employee.nic || '');
    const [contact, setContact] = useState(employee.contact || '');
    const [address, setAddress] = useState(employee.address || '');

    useEffect(() => {
        if (employee) {
            setId(employee.id);
            setFirstName(employee.firstName);
            setLastName(employee.lastName);
            setDob(employee.dob ? employee.dob.split('T')[0] : ''); // Ensure dob is in YYYY-MM-DD format
            setGender(employee.gender || '');
            setDesignation(employee.designation || ''); // Set designation if available
            setNic(employee.nic);
            setContact(employee.contact);
            setAddress(employee.address);
        }
    }, [employee]);

    const handleNumericInput = (e, setter) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setter(value);
        }
    };

    const handleAlphaInput = (e, setter) => {
        const value = e.target.value;
        if (/^[a-zA-Z]*$/.test(value)) {
            setter(value);
        }
    };

    const handleContactInput = e => {
        const value = e.target.value;
        // Allow the contact number to be empty or match the pattern
        if (value === '' || /^0\d{0,9}$/.test(value)) {
            setContact(value);
        }
    };

    const handleNicInput = e => {
        const value = e.target.value.toUpperCase();
        // Allow the NIC to be empty or match the pattern
        if (value === '' || /^[1-9]\d{0,10}[V]?$/.test(value)) {
            setNic(value);
        }
    };

    const handleSubmit = async () => {
        const employeeData = {
            id,
            firstName,
            lastName,
            dob,
            gender,
            designation, 
            nic,
            contact,
            address,
        };

        try {
            const endpoint = employee._id 
                ? `http://localhost:8070/hrtest/update/${employee._id}` 
                : 'http://localhost:8070/hrtest/register';

            const method = employee._id ? 'PUT' : 'POST';

            const response = await fetch(endpoint, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(employeeData),
            });

            if (response.ok) {
                alert(employee._id ? 'Employee updated successfully!' : 'Employee added successfully!');
                navigate('/EmployeeTable');
                setId('');
                setFirstName('');
                setLastName('');
                setDob('');
                setGender('');
                setDesignation(''); 
                setNic('');
                setContact('');
                setAddress('');
            } else {
                alert(employee._id ? 'Failed to update employee. Please try again.' : 'Failed to add employee. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while processing the employee.');
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
                height: '100%',
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
                    {employee._id ? 'Update Employee' : 'Employee Registration'}
                </Typography>
            </Grid>

            <Grid item xs={12} sm={4} sx={{ textAlign: 'center', display: 'flex', alignItems: 'stretch' }}>
                <div style={{ flex: 1 }}>
                    <img
                        src={RegistrationImage}
                        alt="Employee"
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
                            Personal Information
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
                            label="First Name"
                            variant="outlined"
                            value={firstName}
                            onChange={e => handleAlphaInput(e, setFirstName)}
                            sx={{ marginBottom: '20px' }}
                            inputProps={{ maxLength: 20, inputMode: 'text' }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Last Name"
                            variant="outlined"
                            value={lastName}
                            onChange={e => handleAlphaInput(e, setLastName)}
                            sx={{ marginBottom: '20px' }}
                            inputProps={{ maxLength: 20, inputMode: 'text' }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Date of Birth"
                            type="date"
                            variant="outlined"
                            value={dob}
                            onChange={e => setDob(e.target.value)}
                            sx={{ marginBottom: '20px' }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                min: "1904-01-01",
                                max: "2006-12-31"
                            }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            select
                            label="Gender"
                            variant="outlined"
                            value={gender}
                            onChange={e => setGender(e.target.value)}
                            sx={{ marginBottom: '20px' }}
                        >
                            <MenuItem value="male">Male</MenuItem>
                            <MenuItem value="female">Female</MenuItem>
                            <MenuItem value="other">Other</MenuItem>
                        </TextField>
                    </Grid>

                    {/* Designation Field */}
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            select
                            label="Designation"
                            variant="outlined"
                            value={designation}
                            onChange={e => setDesignation(e.target.value)}
                            sx={{ marginBottom: '20px' }}
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
                        </TextField>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="NIC Number"
                            variant="outlined"
                            value={nic}
                            onChange={handleNicInput}
                            sx={{ marginBottom: '20px' }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Contact Number"
                            variant="outlined"
                            value={contact}
                            onChange={handleContactInput}
                            sx={{ marginBottom: '20px' }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Address"
                            variant="outlined"
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                            sx={{ marginBottom: '20px' }}
                            inputProps={{ maxLength: 50 }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                        >
                            {employee._id ? 'Update' : 'Submit'}
                        </Button>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={12} sx={{ textAlign: 'center', marginTop: '20px' }}>
                <Link href="/EmployeeTable" underline="hover">
                    Back to Employee Table
                </Link>
            </Grid>
        </Grid>
    );
};

export default EmployeeForm;
