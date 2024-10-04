const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Define the Release Inventory schema
const releaseInventorySchema = new Schema({
    productId: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    productionDate: {
        type: Date,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    unitPrice: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    // Add any additional fields specific to Release Inventory if needed
    releaseDate: { // Example of an additional field
        type: Date,
        required: false
    }
});

// Create the model for Release Inventory
const ReleaseInventory = mongoose.model("ReleaseInventory", releaseInventorySchema);

module.exports = ReleaseInventory;
