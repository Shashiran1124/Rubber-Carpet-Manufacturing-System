const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const transportSchema = new Schema({
    Transport_Number: {
        type: String,
        required: true
    },
    Order_Number: {
        type: String,
        required: true
    },
    Number_of_Packages: {
        type: Number,
        required: true
    },
    Drop_off_Location: {
        type: String,
        required: true
    },
    Vehicle_Number: {
        type: String,
        required: true
    },
    Pickup_Date_and_Time: {
        type: Date,
        required: true
    },
    Drop_off_Date_and_Time: {
        type: Date,
        required: true
    },
    Tracking_Number: {
        type: String,
        required: true
    }
});

// Ensure the model name is in PascalCase and matches the intended collection name
const Transport = mongoose.model("Transport", transportSchema);

module.exports = Transport;
