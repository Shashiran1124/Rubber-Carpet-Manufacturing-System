import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

const UpdateMachine = () => {
    const { id } = useParams(); // Get ID from URL parameters
    const history = useHistory(); // For redirecting after update
    const [machine, setMachine] = useState({
        machineID: '',
        date: '',
        status: '',
        nextGeneralRepairDate: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        // Fetch current machine details
        axios.get(`http://localhost:8070/machine/${id}`)
            .then(response => {
                setMachine(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError('Error fetching machine details');
                setLoading(false);
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMachine(prevMachine => ({
            ...prevMachine,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8070/machine/update/${id}`, machine)
            .then(response => {
                setSuccess(response.data.status);
                setError(null);
                setTimeout(() => history.push('/'), 2000); // Redirect after 2 seconds
            })
            .catch(error => {
                setError('Error updating machine details');
                setSuccess(null);
            });
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <h1>Update Machine</h1>
            {success && <p style={{ color: 'green' }}>{success}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Machine ID:</label>
                    <input
                        type="text"
                        name="machineID"
                        value={machine.machineID}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Date:</label>
                    <input
                        type="date"
                        name="date"
                        value={machine.date.substring(0, 10)} // Format date for input
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Status:</label>
                    <input
                        type="text"
                        name="status"
                        value={machine.status}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Next General Repair Date:</label>
                    <input
                        type="date"
                        name="nextGeneralRepairDate"
                        value={machine.nextGeneralRepairDate.substring(0, 10)} // Format date for input
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Update Machine</button>
            </form>
        </div>
    );
};

export default UpdateMachine;
