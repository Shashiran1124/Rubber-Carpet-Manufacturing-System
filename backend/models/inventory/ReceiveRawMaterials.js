const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Define the Receive Raw Materials schema
const receiveRawMaterialsSchema = new Schema({
    stockNumber: { // Renamed field from productId to stockNumber
        type: String,
        required: true
    },
    stockType: { // Renamed field from productName to stockType
        type: String,
        required: true
    },
    receiveDate: { // Renamed field from productionDate to receiveDate
        type: Date,
        required: true
    },
    quantity: { // Retaining the quantity field
        type: Number,
        required: true
    },
    // Add any additional fields specific to receiving raw materials if needed
    // For example, you might want to add a description or supplier information
});

// Create the model for Receive Raw Materials
const ReceiveRawMaterials = mongoose.model("ReceiveRawMaterials", receiveRawMaterialsSchema);

module.exports = ReceiveRawMaterials;
