const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const supcalculatorSchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    rawMaterialType: {
        type: String,
        required: true
    },
    unit: {
        type: String,
        required: true,
        
    },
    pricePerUnit: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },

    totalCost: {
        type: Number,
        required: true
    }

});

// Ensure the model name is in PascalCase and matches the intended collection name
const Supcalculator = mongoose.model("Supcalculator", supcalculatorSchema); 

module.exports = Supcalculator;
