const express = require("express");
const router = express.Router();
const ProfitAndLost = require("../../models/accountant/ProfitAndLost");
const momentController = require("moment");
// Add route
router.post("/add", async (req, res) => {
  console.log(req.body);
  try {
    const { date, type, description, amount } = req.body;

    if (!date || !description || !amount || !type) {
      return res
        .status(400)
        .json({ error: "All fields are required (description, amount, type)" });
    }

    const newEntry = new ProfitAndLost({
      date: date || Date.now(),
      type,
      description,
      amount,
    });

    const saveEntry = await newEntry.save();
    res.status(201).json("added");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/all", async (request, response) => {
  try {
    const { startDate, endDate } = request.body;

    const start = new Date(startDate);
    const end = new Date(endDate);

    const listOfProfitAndLost = await ProfitAndLost.find({
      date: {
        $gte: start,
        $lte: end,
      },
    });

    const listOfIncomeRecords = listOfProfitAndLost.filter(
      (x) => x.type === "income"
    );
    const listOfExpensesRecords = listOfProfitAndLost.filter(
      (x) => x.type === "expense"
    );

    let incomeContainer = [];
    let totalIncomeAmount = 0;
    let expensesContainer = [];
    let totalExpeneAmount = 0;

    for (var income of listOfIncomeRecords) {
      incomeContainer.push({
        date: momentController(income.date).format("MMMM Do YYYY"),
        description: income.description ?? "",
        amount: income.amount,
      });

      totalIncomeAmount = totalIncomeAmount + income.amount;
    }

    for (var expense of listOfExpensesRecords) {
      expensesContainer.push({
        date: momentController(income.expense).format("MMMM Do YYYY"),
        description: expense.description ?? "",
        amount: expense.amount,
      });

      totalExpeneAmount = totalExpeneAmount + expense.amount;
    }

    incomeContainer.push({
      date: "",
      description: "Total Amount",
      amount: totalIncomeAmount,
    });

    expensesContainer.push({
      date: "",
      description: "Total Amount",
      amount: totalExpeneAmount,
    });

    response.status(200).json({
      incomeContainer: incomeContainer,
      expensesContainer: expensesContainer,
    });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});
module.exports = router;
