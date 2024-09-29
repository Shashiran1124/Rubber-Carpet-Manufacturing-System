// models/cal.js
const mongoose = require('mongoose');

const Schema = mongoose.Schema;



// Define the schema for sales calculations
const salesCalculationSchema = new Schema({
    month: {
        type: String,
        required: true
    },
    product: {
        type: String,
        required: true
    },
    totalQuantity: {
        type: Number,
        required: true
    },
    unitPrice: {
        type: Number,
        required: true
    },
    totalSales: {
        type: Number,
        required: true
    }
});

// Create and export the model
const SalesCalculation = mongoose.model('SalesCalculation', salesCalculationSchema);

module.exports = SalesCalculation;
