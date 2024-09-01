import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

const RepairForm = () => {
    const {mid} = useParams();
    const [formData, setFormData] = useState({
        machineID: mid,
        repairStartDate: '',
        partName: '',
        repairEndDate: '',
        discription: ''
    });

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        const partNamePattern = /^[A-Za-z\s]+$/; // Only letters and spaces allowed
        
        if (!formData.repairStartDate) newErrors.repairStartDate = 'Repair start date is required';
        if (!formData.partName) {
            newErrors.partName = 'Part name is required';
        } else if (!partNamePattern.test(formData.partName)) {
            newErrors.partName = 'Part name can only contain letters and spaces';
        }
        if (!formData.repairEndDate) newErrors.repairEndDate = 'Repair end date is required';
        if (!formData.discription) newErrors.discription = 'Description is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            console.log(formData)
            await axios.post('http://localhost:8070/repair/add',formData);
            alert('Repair record added successfully');
            setFormData({
                repairStartDate: '',
                partName: '',
                repairEndDate: '',
                discription: ''
            });
        } catch (err) {
            console.error(err);
            alert('Failed to add repair record');
        }
    };

    return (
        <div className="container">
            <h2>Add Repair Record</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="repairStartDate" className="form-label">Repair Start Date</label>
                    <input
                        type="date"
                        id="repairStartDate"
                        name="repairStartDate"
                        className="form-control"
                        value={formData.repairStartDate}
                        onChange={handleChange}
                    />
                    {errors.repairStartDate && <div className="text-danger">{errors.repairStartDate}</div>}
                </div>

                <div className="mb-3">
                    <label htmlFor="partName" className="form-label">Part Name</label>
                    <input
                        type="text"
                        id="partName"
                        name="partName"
                        className="form-control"
                        value={formData.partName}
                        onChange={handleChange}
                    />
                    {errors.partName && <div className="text-danger">{errors.partName}</div>}
                </div>

                <div className="mb-3">
                    <label htmlFor="repairEndDate" className="form-label">Repair End Date</label>
                    <input
                        type="date"
                        id="repairEndDate"
                        name="repairEndDate"
                        className="form-control"
                        value={formData.repairEndDate}
                        onChange={handleChange}
                    />
                    {errors.repairEndDate && <div className="text-danger">{errors.repairEndDate}</div>}
                </div>

                <div className="mb-3">
                    <label htmlFor="discription" className="form-label">Description</label>
                    <textarea
                        id="discription"
                        name="discription"
                        className="form-control"
                        rows="3"
                        value={formData.discription}
                        onChange={handleChange}
                    />
                    {errors.discription && <div className="text-danger">{errors.discription}</div>}
                </div>

                <button type="submit" className="btn btn-primary">Add Repair Record</button>
            </form>
        </div>
    );
};

export default RepairForm;
