const express = require("express");
const router = express.Router();
const PettyCash = require("../../models/accountant/PettyCash");

// Add Petty Cash
router.post("/add", async (req, res) => {
  try {
    const { date, description, amount } = req.body;
    const newEntry = new PettyCash({
      date,
      description,
      amount,
    });

    const savedEntry = await newEntry.save();
    res.status(201).json("data enterd");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get All Petty Cash Entries
router.get("/all", async (req, res) => {
  try {
    const listOfPettyCashDetails = await PettyCash.find({});

    let pettyCashContainer = [];
    let totalAmount = 0;

    for (var pettyCash of listOfPettyCashDetails) {
      pettyCashContainer.push({
        _id: pettyCash._id,
        date: pettyCash.date.toString(),
        description: pettyCash.description ?? "",
        amount: pettyCash.amount,
      });

      totalAmount = totalAmount + pettyCash.amount;
    }

    pettyCashContainer.push({
      date: "",
      description: "Total Amount",
      amount: totalAmount,
    });

    res.status(200).json(pettyCashContainer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update petty cash record by ID
router.put("/update/:id", async (req, res) => {
  try {
    const { date, description, amount } = req.body;

    // Find the petty cash record by ID and update it
    const updatedPettyCash = await PettyCash.findByIdAndUpdate(
      req.params.id,
      { date, description, amount }, // Updating the fields
      { new: true } // This option returns the updated document
    );

    if (!updatedPettyCash) {
      return res.status(404).json({ message: "Petty Cash record not found" });
    }

    // Return the updated petty cash record
    res.status(200).json(updatedPettyCash);
  } catch (error) {
    console.error("Error updating petty cash entry:", error);
    res
      .status(500)
      .json({ message: "Failed to update petty cash entry", error });
  }
});

// Get petty cash record by ID
router.get("/:id", async (req, res) => {
  try {
    const pettyCash = await PettyCash.findById(req.params.id);
    if (!pettyCash) {
      return res.status(404).json({ message: "Petty Cash record not found" });
    }
    res.status(200).json(pettyCash);
  } catch (error) {
    res.status(500).json({ message: "Error fetching petty cash entry", error });
  }
});

module.exports = router;
