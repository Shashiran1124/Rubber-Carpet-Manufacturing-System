// routes/test3.js
const express = require('express');
const router = express.Router();
const SalesCalculation = require("../models/Cal");

// Route to add a new calculation
router.post('/add', async (req, res) => {
    try {
        const { month, product, totalQuantity, unitPrice, totalSales } = req.body;
        const newCalculation = new SalesCalculation({ month, product, totalQuantity, unitPrice, totalSales });
        await newCalculation.save();
        res.status(201).json(newCalculation);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Route to get all calculations
router.get('/', async (req, res) => {
    try {
        const calculations = await SalesCalculation.find();
        res.status(200).json(calculations);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Route to get a specific calculation by ID
router.get('/:id', async (req, res) => {
    try {
        const calculation = await SalesCalculation.findById(req.params.id);
        if (!calculation) {
            return res.status(404).json({ error: 'Calculation not found' });
        }
        res.status(200).json(calculation);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Route to update a calculation by ID
router.put('/update/:id', async (req, res) => {
    try {
        const updatedCalculation = await SalesCalculation.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCalculation) {
            return res.status(404).json({ error: 'Calculation not found' });
        }
        res.status(200).json(updatedCalculation);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Route to delete a calculation by ID
router.delete('/delete/:id', async (req, res) => {
    try {
        const deletedCalculation = await SalesCalculation.findByIdAndDelete(req.params.id);
        if (!deletedCalculation) {
            return res.status(404).json({ error: 'Calculation not found' });
        }
        res.status(200).json({ message: 'Calculation deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
