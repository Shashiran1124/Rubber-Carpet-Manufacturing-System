const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const registrationSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    nic: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true,
        maxLength: 10
    },
    address: {
        type: String,
        required: true
    },
    designation: { 
        type: String,
        required: true 
    }
});

// Ensure the model name is in PascalCase and matches the intended collection name
const Registration = mongoose.model("Registration", registrationSchema); 

module.exports = Registration;
