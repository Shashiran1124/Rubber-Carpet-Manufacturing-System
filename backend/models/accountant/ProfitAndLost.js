const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profitAndLostSchema = new Schema({
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  type: {
    type: String,
    enum: ['income', 'expense'],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  }
});

const ProfitAndLost = mongoose.model("ProfitAndLost", profitAndLostSchema);
module.exports = ProfitAndLost;
