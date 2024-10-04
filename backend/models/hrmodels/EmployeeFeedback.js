const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    employeeId: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        match: /.+\@.+\..+/ // Simple email validation regex
    },
    phone: {
        type: String,
        required: true,
        match: /^\d{10}$/ // Phone number must be exactly 10 digits
    },
    issue: {
        type: String,
        required: true
    }
});

// Ensure the model name is in PascalCase and matches the intended collection name
const EmployeeFeedback = mongoose.model('EmployeeFeedback', feedbackSchema);

module.exports = EmployeeFeedback;
