const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const suppliersSchema = new Schema({
    companyName: {
        type: String,
        required: true
    },
    address: {
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
const Supplier = mongoose.model("Supplier", suppliersSchema); 

module.exports = Supplier;
