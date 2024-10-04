const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Define the Registration model
const Registration = mongoose.model('Registration', new mongoose.Schema({
    id: String,
    firstName: String,
    lastName: String,
    dob: Date,
    gender: String,
    nic: String,
    contact: String,
    address: String,
}));

// POST route to register an employee
router.post('/register', async (req, res) => {
    try {
        const newEmployee = new Registration(req.body);
        await newEmployee.save();
        res.status(201).send('Employee added successfully!');
    } catch (error) {
        console.error('Error adding employee:', error);
        res.status(500).send('Error adding employee');
    }
});

// GET route to fetch all employees
router.get('/', async (req, res) => {
    try {
        const registrations = await Registration.find(); // Fetch all documents from 'registrations' collection
        res.json(registrations); // Send the data as JSON response
    } catch (error) {
        console.error('Error fetching employee data:', error);
        res.status(500).json({ message: 'Error fetching employees' });
    }
});

// DELETE route to delete an employee by ID
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await Registration.findByIdAndDelete(id);
        res.status(200).send('Employee deleted successfully!');
    } catch (error) {
        console.error('Error deleting employee:', error);
        res.status(500).send('Error deleting employee');
    }
});

// PUT route to update an employee by ID
router.put('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedEmployee = await Registration.findByIdAndUpdate(id, req.body, { new: true });
        if (updatedEmployee) {
            res.status(200).send('Employee updated successfully!');
        } else {
            res.status(404).send('Employee not found');
        }
    } catch (error) {
        console.error('Error updating employee:', error);
        res.status(500).send('Error updating employee');
    }
});

module.exports = router;
