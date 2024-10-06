const express = require("express");
const router = express.Router();
const Part = require("../../models/machinerepair/Part");
const momentController = require("moment");

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
router.post("/all", async (req, res) => {
	try {
		console.log("Incoming request body:", req.body);

		const { startDate, endDate } = req.body;

		console.log("Start Date:", startDate);
		console.log("End Date:", endDate);

		const start = new Date(startDate);
		const end = new Date(endDate);

		console.log("Converted Start Date:", start);
		console.log("Converted End Date:", end);

		const listOfPartDetails = await Part.find({
			date: {
				$gte: start,
				$lte: end,
			},
		});

		let partContainer = [];
		let totalAmount = 0;

		for (var part of listOfPartDetails) {
			partContainer.push({
				date: momentController(part.date).format("MMMM Do YYYY"),
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
		console.log("Final partContainer:", partContainer);

		res.status(200).json(partContainer);
	} catch (error) {
		console.error("An error occurred while fetching part details:", error);
		res.status(500).json({ message: error.message });
	}
});

module.exports = router;
