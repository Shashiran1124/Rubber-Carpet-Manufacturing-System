const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const salesOrderSchema = new Schema({
    customerName: {
        type: String,
        required: true
    },
   
    orderDate: {
        type: Date,
        required: true
    },
    contactNumber: {
        type: String,
        required: true,
        maxLength: 10
    },

    email: {
        type: String,
        required: true
    },    

    productCatalog: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    
});

// Ensure the model name is in PascalCase and matches the intended collection name
const SalesOrder = mongoose.model("SalesOrder", salesOrderSchema);

module.exports = SalesOrder;
