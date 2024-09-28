const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const costSchema = new Schema({
    Month: {
        type: String,  // Store as a string to represent months (e.g., "January", "February")
        required: true
    },
    Transport_Cost: {
        type: Number,
        required: true
    },
    Fuel_Cost: {
        type: Number,
        required: true
    },
    Vehicle_Repair_Cost: {
        type: Number,
        required: true
    },
    Food_Cost: {
        type: Number,
        required: true
    },
    Insurance_Cost: {
        type: Number,
        required: true
    },
    /*Date: {
        type: Date,
        required: true
    },
    */
    
    
});

// Ensure the model name is in PascalCase and matches the intended collection name
const Cost = mongoose.model("Cost", costSchema);

module.exports = Cost;
