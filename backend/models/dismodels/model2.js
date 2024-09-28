const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderTrackingSchema = new Schema({
    Order_Number: {
        type: String,
        required: true
    },
    Customer_Number: {
        type: String,
        required: true
    },
    Order_Date: {
        type: Date,
        required: true
    },
    Product_Number: {
        type: String,
        required: true
    },
    Production_Status: {
        type: String,
        required: true
    },
    Expected_Delivery_Date: {
        type: Date,
        required: true
    },
    Actual_Delivery_Date: {
        type: Date,
        required: true
    },
    Tracking_URL: {
        type: String,
        required: true
    }
});

// Ensure the model name is in PascalCase and matches the intended collection name
const OrderTracking = mongoose.model("OrderTracking", orderTrackingSchema);

module.exports = OrderTracking;
