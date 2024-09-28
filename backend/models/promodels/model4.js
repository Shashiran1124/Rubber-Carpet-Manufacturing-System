const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ProductionProgressSchema = new Schema({
    lname: {
        type: String,
        required: true
    },
    lmaterial: {
        type: String,
        required: true
    },
    lcutting: {
        type: String, // Assuming time is stored as a string, e.g., "08:00 AM"
        required: true
    },
    lmolding: {
        type: String, // Assuming time is stored as a string, e.g., "10:00 AM"
        required: true
    },
    lVulcanization: {
        type: String, // Assuming time is stored as a string, e.g., "12:00 PM"
        required: true
    },
    lgoodunit: {
        type: Number, // Assuming unit count is stored as a number
        required: true
    },
    lDefectiveunit: {
        type: Number, // Assuming defective unit count is stored as a number
        required: true
    }
});

// Ensure the model name is in PascalCase and matches the intended collection name
const ProductionProgress = mongoose.model("ProductionProgress", ProductionProgressSchema); 

module.exports = ProductionProgress;
