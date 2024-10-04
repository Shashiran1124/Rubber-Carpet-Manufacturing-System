const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Define the Release Raw Materials schema
const releaseRawMaterialsSchema = new Schema({
    stockNumber: { // Stock number field
        type: String,
        required: true
    },
    stockType: { // Stock type field
        type: String,
        required: true
    },
    releaseDate: { // Release date field
        type: Date,
        required: true
    },
    quantity: { // Quantity field
        type: Number,
        required: true
    }
    // Add any additional fields specific to releasing raw materials if needed
});

// Create the model for Release Raw Materials
const ReleaseRawMaterials = mongoose.model("ReleaseRawMaterials", releaseRawMaterialsSchema);

module.exports = ReleaseRawMaterials;
