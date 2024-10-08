const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const salarySchema = new Schema({

    employeID : {
        type : String,
        required : true
    },

    employeName : {
        type : String,
        required : true
    },

    month : {
        type : String,
        required : true
    },

    basicSalary :{
        type : Number,
             
    },
    
    oTHours:{
        type:Number,
        
    },

    perHoureRate:{
        type:Number,
        
    }

})
const salary = mongoose.model("Payroll",salarySchema);

module.exports = salary;