const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const salarySchema = new Schema({
    id: {
        type: String,
        required: true
    },
    employeeName: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    department: {
        type: String, // New field for department
        required: true
    },
    month: {
        type: String, // New field for month
        required: true
    },
    otRates: {
        type: Number,
        required: true
    },
    otHours: {
        type: Number,
        required: true
    },
    hourlyRate: {
        type: Number,
        required: true
    },
    dailyHours: {
        type: Number,
        required: true
    },
    monthlyAttendance: {
        type: Number,
        required: true
    },
    monthlyBasic: {
        type: Number,
        required: true
    }
});

// Ensure the model name is in PascalCase and matches the intended collection name
const EmployeeSalary = mongoose.model('EmployeeSalary', salarySchema);

module.exports = EmployeeSalary;
