const express = require('express');
const router = express.Router();
const EmployeeFeedback = require('../../models/hrmodels/EmployeeFeedback'); // Adjust path if necessary

// POST route to submit feedback
router.post('/feedback', async (req, res) => {
    try {
        const newFeedback = new EmployeeFeedback(req.body);
        await newFeedback.save();
        res.status(201).send('Feedback submitted successfully!');
    } catch (error) {
        console.error('Error submitting feedback:', error);
        res.status(500).send('Error submitting feedback');
    }
});

// GET route to fetch all feedback
router.get('/feedback', async (req, res) => {
    try {
        const feedbacks = await EmployeeFeedback.find(); // Fetch all documents from 'employeefeedbacks' collection
        res.json(feedbacks); // Send the data as JSON response
    } catch (error) {
        console.error('Error fetching feedback data:', error);
        res.status(500).json({ message: 'Error fetching feedbacks' });
    }
});

// DELETE route to delete feedback by ID
router.delete('/feedback/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await EmployeeFeedback.findByIdAndDelete(id);
        res.status(200).send('Feedback deleted successfully!');
    } catch (error) {
        console.error('Error deleting feedback:', error);
        res.status(500).send('Error deleting feedback');
    }
});

module.exports = router;
