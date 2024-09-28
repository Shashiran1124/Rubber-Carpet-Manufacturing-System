const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const MachiSchema = new Schema({
    mnum: {
        type: String,
        required: true
    },
    mdate: {
        type: Date,
        required: true
    },
    mstime: {
        type: String, // Assuming time is stored as a string, e.g., "08:00 AM"
        required: true
    },
    metime: {
        type: String, // Assuming time is stored as a string, e.g., "05:00 PM"
        required: true
    },
    mteam: {
        type: String,
        required: true
    }
});

// Ensure the model name is in PascalCase and matches the intended collection name
const Machi = mongoose.model("Machi2", MachiSchema); 

module.exports = Machi;
