const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const machineSchema = new Schema ({

    machineID : {
        type : String,
        required : true
    },

    date: {
        type: Date,
        required: true, // This makes the date field mandatory
        default: Date.now // This sets a default value of the current date and time
    },
    status : {
        type : String,
    },

    nextGeneralRepairDate : {
        type : Date,
    }

})

const machine = mongoose.model("Machine",machineSchema);

module.exports = machine;
