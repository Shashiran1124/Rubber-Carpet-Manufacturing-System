const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Define the Salary model
const SalarySchema = new mongoose.Schema({
    id: { type: String, required: true },
    employeeName: { type: String, required: true },
    designation: { type: String, required: true },
    department: { type: String, required: true }, // New field for department
    month: { type: String, required: true }, // New field for month
    otRates: { type: Number, required: true },
    otHours: { type: Number, required: true },
    hourlyRate: { type: Number, required: true },
    dailyHours: { type: Number, required: true },
    monthlyAttendance: { type: Number, required: true },
    monthlyBasic: { type: Number, required: true },
});

const Salary = mongoose.model('Salary', SalarySchema);

// POST route to register a salary
router.post('/register', async (req, res) => {
    try {
        const newSalary = new Salary(req.body);
        await newSalary.save();
        res.status(201).json({ message: 'Salary added successfully!', salary: newSalary });
    } catch (error) {
        console.error('Error adding salary:', error);
        res.status(500).json({ message: 'Error adding salary', error: error.message });
    }
});

// GET route to fetch all salaries
router.get('/', async (req, res) => {
    try {
        const salaries = await Salary.find(); // Fetch all documents from 'salaries' collection
        res.status(200).json(salaries); // Send the data as JSON response
    } catch (error) {
        console.error('Error fetching salary data:', error);
        res.status(500).json({ message: 'Error fetching salaries', error: error.message });
    }
});

// DELETE route to delete a salary by ID
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deletedSalary = await Salary.findByIdAndDelete(id);
        if (deletedSalary) {
            res.status(200).json({ message: 'Salary deleted successfully!' });
        } else {
            res.status(404).json({ message: 'Salary not found' });
        }
    } catch (error) {
        console.error('Error deleting salary:', error);
        res.status(500).json({ message: 'Error deleting salary', error: error.message });
    }
});

// PUT route to update a salary by ID
router.put('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedSalary = await Salary.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (updatedSalary) {
            res.status(200).json({ message: 'Salary updated successfully!', salary: updatedSalary });
        } else {
            res.status(404).json({ message: 'Salary not found' });
        }
    } catch (error) {
        console.error('Error updating salary:', error);
        res.status(500).json({ message: 'Error updating salary', error: error.message });
    }
});

module.exports = router;
