const express = require("express");
const router = express.Router();
const Part = require("../models/Part");

// Add buy part
router.post("/add", async (req, res) => {
	try {
		const { date, description, amount } = req.body;
		const newEntry = new Part({
			date,
			description,
			amount,
		});

		const savedEntry = await newEntry.save();
		res.status(201).json("part enterd");
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

// Get All  Entries
router.get("/all", async (req, res) => {
	try {
		const listOfPartDetails = await Part.find({});

		let partContainer = [];
		let totalAmount = 0;

		for (var part of listOfPartDetails) {
			partContainer.push({
				date: part.date.toString(),
				description: part.description ?? "",
				amount: part.amount,
			});

			totalAmount = totalAmount + part.amount;
		}

		partContainer.push({
			date: "",
			description: "Total Amount",
			amount: totalAmount,
		});

		res.status(200).json(partContainer);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

module.exports = router;
