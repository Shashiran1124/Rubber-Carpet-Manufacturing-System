const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const inventorySchema = new Schema({
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
    }
});

const Inventory = mongoose.model("Inventory", inventorySchema);

module.exports = Inventory;
