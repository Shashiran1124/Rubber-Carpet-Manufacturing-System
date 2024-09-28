const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const PlanSchema = new Schema({
    pnum: {
        type: String,
        required: true
    },
    psdate: {
        type: Date,
        required: true
    },
    pstime: {
        type: String,
        required: true
    },
    petime: {
        type: String,
        required: true
    },
    pshift: {
        type: String,
        required: true
    },
    pteam: {
        type: String,
        required: true
    }
});

// Ensure the model name is in PascalCase and matches the intended collection name
const Plan = mongoose.model("Plan2", PlanSchema); 

module.exports = Plan;
