const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Define the feedback schema based on the feedback form inputs
const cusFeedbackSchema = new Schema({
    name: {
        type: String,
        required: true,
        match: /^[A-Za-z\s]+$/ // Validate to only allow English letters and spaces
    },
    date: {
        type: Date,
        required: true
    },
    ratingStars: {
        type: Number,
        required: true,
        min: 1,
        max: 5 // Assuming a 5-star rating system
    },
    ratingNumeric: {
        type: Number,
        required: true,
        min: 1,
        max: 10 // Assuming a numeric rating between 1 and 10
    },
    comments: {
        type: String,
        required: true
    }
});

// Ensure the model name is in PascalCase and matches the intended collection name
const CusFeedback = mongoose.model("CusFeedback", cusFeedbackSchema);

module.exports = CusFeedback;
