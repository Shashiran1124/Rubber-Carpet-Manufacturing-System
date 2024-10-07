const express = require("express");
const router = express.Router(); //////import express pacage with Router
let Machine = require("../../models/machinerepair/machine"); //should use machine model so import it (requir= import karana use karanva)
const momentController = require("moment");
//front end idn backend call karannna URL ekak use karanva http:/Localhost:8070/machine/add execute venava *ekathami methana venne
router.route("/add").post(async (request, response) => {
	try {
		const { machineID, date, status, nextGeneralRepairDate } = request.body;
		let query = {};
		query.machineID = machineID;

		const exsistingMachine = await Machine.find(query);

		if (Object.keys(exsistingMachine).length > 0) {
			return response.json({
				isSuccess: false,
				message: `Machine id (${machineID}) ready exsist, please enter valid machine Id`,
			});
		}

		const newMachine = new Machine({
			machineID,
			date: new Date(date),
			status,
			nextGeneralRepairDate: new Date(nextGeneralRepairDate),
		});

		await newMachine.save();

		return response.json({ isSuccess: true, message: "Machine added successfully" });
	} catch (error) {
		return response.json({ isSuccess: false, message: "Failed to add machine" });
	}
});
//http:/Localhost:8070/machine
router.route("/").post(async (request, response) => {
	try {
		const { searchText, pageNumber, pageSize } = request.body;

		let listOfMachineDTOs = [];
		let query = {};

		if (searchText) {
			query.machineID = { $regex: new RegExp(searchText, "i") };
		}

		const totalRecordCount = await Machine.countDocuments(query);

		let listOfMachines = await Machine.find(query)
			.skip((pageNumber - 1) * pageSize)
			.limit(pageSize)
			.exec();

		for (let item of listOfMachines) {
			listOfMachineDTOs.push({
				_id: item._id,
				machineID: item.machineID,
				date: momentController(item.createdOn).format("MMMM Do YYYY"),
				status: item.status,
				nextGeneralRepairDate: momentController(item.nextGeneralRepairDate).format("MMMM Do YYYY"),
			});
		}

		response.json({
			items: listOfMachineDTOs,
			currentPage: pageNumber,
			totalPages: Math.ceil(totalRecordCount / pageSize),
			totalRecordCount: totalRecordCount,
		});
	} catch (error) {
		console.log(error);
	}
});
//http:Localhost:8070/update/:id
router.route("/update/:id").put(async (req, res) => {
	let mID = req.params.id;

	const { machineID, date, status, nextGeneralRepairDate } = req.body;

	const updateMachine = {
		machineID,
		date,
		status,
		nextGeneralRepairDate,
	};
	const update = await Machine.findByIdAndUpdate(mID, updateMachine)
		.then(() => {
			res.status(200).send({ status: "machine update" });
		})
		.catch((err) => {
			console.log(err);
		});
});

//Delete
router.route("/delete/:id").delete(async (req, res) => {
	let mId = req.params.id;

	await Machine.findByIdAndDelete(mId)
		.then(() => {
			res.status(200).send({ status: "machine deleted" });
		})
		.catch((err) => {
			console.log(err.message);
			res.status(500).send({ Status: "delete not completed", error: err.message });
		});
});

router.route("/:id").get((req, res) => {
	const { id } = req.params; // Get the ID from the URL parameter
	Machine.findById(id)
		.then((machine) => {
			if (!machine) {
				return res.status(404).send("Machine not found");
			}
			res.json(machine);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).send("Server Error");
		});
});

module.exports = router;
