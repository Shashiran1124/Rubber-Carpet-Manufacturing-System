const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const kpiSchema = new Schema({
    KPI_Number: {
        type: String,
        required: true
    },
    KPI_Name: {
        type: String,
        required: true
    },
    Measurement_Period: {
        type: String,
        required: true
    },
    Target_Value: {
        type: String,
        required: true
    },
    Actual_Value: {
        type: String,
        required: true
    },
    Status: {
        type: String,
        required: true
    },
    Last_Updated: {
        type: Date,
        required: true
    },
    Responsible_Department: {
        type: String,
        required: true
    },
    Comments: {
        type: String
    }
});

// Ensure the model name is in PascalCase and matches the intended collection name
const KPI = mongoose.model("KPI", kpiSchema);

module.exports = KPI;
