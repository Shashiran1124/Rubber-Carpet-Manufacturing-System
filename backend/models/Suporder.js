const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const suporderSchema = new Schema({
    dateOfOrder: {
        type: Date,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true,
        maxLength: 10
    },
    materialType: {
        type: String,
        required: true
    },
    unit: {
        type: String,
        required: true
    },

    quantity: {
        type: Number,
        required: true
    }
});

// Ensure the model name is in PascalCase and matches the intended collection name
const Suporder = mongoose.model("Suporder", suporderSchema); 

module.exports = Suporder;
