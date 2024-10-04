import { Button, Grid, TextField, Typography, MenuItem, Link } from "@mui/material"; // Import Link
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
        if (/^\d*$/.test(value) && value.length <= 10) {
            setContact(value);
        }
    };

    const handleSubmit = async () => {
        const employeeData = {
            id,
            firstName,
            lastName,
            dob,
            gender,
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

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="NIC Number"
                            variant="outlined"
                            value={nic}
                            onChange={e => setNic(e.target.value)}
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
                            inputProps={{
                                maxLength: 10,
                                inputMode: 'numeric',
                                pattern: "[0-9]{10}"
                            }}
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
                        />
                    </Grid>

                    <Grid item xs={12} sx={{ textAlign: 'center' }}>
                        <Button
                            onClick={handleSubmit}
                            sx={{
                                backgroundColor: '#00c6e6',
                                color: '#ffffff',
                                padding: '10px 20px',
                                borderRadius: '5px',
                                '&:hover': {
                                    backgroundColor: '#00a6c6'
                                }
                            }}
                        >
                            {employee._id ? 'Update' : 'Submit'}
                        </Button>
                    </Grid>

                    {/* Add the hyperlink at the bottom-right corner */}
                    <Grid item xs={12}>
                        <Link href="/EmployeeTable" underline="none" sx={{ display: 'block', textAlign: 'center', marginTop: '10px' }}>
                            Go Back to Table
                        </Link>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default EmployeeForm;
