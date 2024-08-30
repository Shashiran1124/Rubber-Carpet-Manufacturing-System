const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const repairSchema = new Schema ({

    machineID:{
        type:String,
        required:true
    },

    repairStartDate : {
        type : Date,
        required : true
    },

    partName: {
        type: String,
      
      
    },
    repairEndDate : {
        type : Date,
    },

    discription : {
        type : String,
        required : true
       
    }

})

const repair = mongoose.model("Repair",repairSchema);

module.exports = repair;
