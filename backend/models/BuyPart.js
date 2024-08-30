const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const buyPartSchema = new Schema ({

    date: {
        type: Date,
        required: true, // This makes the date field mandatory
        default: Date.now 
    },
    
    partName: {
        type : String,
        required : true,
         
    },
    amount:{
        type : Number,
        required : true

    },

    content: {
        type: [String], 
        required: true
    }

    
})

const machinePart = mongoose.model("MachinePartBuy", buyPartSchema);

module.exports = machinePart;