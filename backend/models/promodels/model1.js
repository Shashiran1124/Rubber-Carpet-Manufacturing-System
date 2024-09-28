const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const OrderSchema = new Schema({
    num: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    qty: {
        type: Number,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    material: {
        type: String,
        required: true
    },
    materialQTY: {
        type: Number,
        required: true
    }
});

// Ensure the model name is in PascalCase and matches the intended collection name
const Order = mongoose.model("Order2", OrderSchema); 

module.exports = Order;
