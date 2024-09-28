const router = require("express").Router();
const CusFeedback = require("../models/CusFeedback");  // Correct path to model

// Data insertion
router.route("/add").post((req, res) => {
    const { name, date, ratingStars, ratingNumeric, comments } = req.body;
    
    const newCusFeedback = new CusFeedback({
        name,
        date,
        ratingStars,
        ratingNumeric,
        comments
    });
    
    newCusFeedback.save()
        .then(() => {
            res.json("Customer Feedback Added");
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Error adding customer feedback" });
        });
});

// Fetch all customer feedback
router.route("/").get((req, res) => {
    CusFeedback.find()
        .then((feedbacks) => {
            res.json(feedbacks);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Error fetching customer feedback" });
        });
});





//Delete a customer feedback by ID
router.route("/delete/:id").delete((req, res) => {
    const feedbackId = req.params.id;

    CusFeedback.findByIdAndDelete(feedbackId)
        .then(() => {
            res.json("Customer Feedback Deleted");
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Error deleting customer feedback" });
        });
});

module.exports = router;

/* Update a customer feedback by ID
router.route("/update/:id").put(async (req, res) => {
    const id = req.params.id;
    const { name, date, ratingStars, ratingNumeric, comments } = req.body;

    try {
        const updatedFeedback = await CusFeedback.findByIdAndUpdate(
            id,
            { name, date, ratingStars, ratingNumeric, comments },
            { new: true }  // Return the updated document
        );

        if (!updatedFeedback) {
            return res.status(404).json({ message: "Customer feedback not found" });
        }

        res.json({ message: "Customer feedback updated successfully", updatedFeedback });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error updating customer feedback" });
    }
});*/


