const express = require("express");
const router = express.Router(); //////import express pacage with Router
let Salary = require("../../models/accountant/SalaryCal"); //should use machine model so import it (requir= import karana use karanva
const dotenv = require("dotenv");
const salary = require("../../models/accountant/SalaryCal");
require("dotenv").config();

//front end idn backend call karannna URL ekak use karanva http:/Localhost:8070/machine/add execute venava *ekathami methana venne
router.route("/add").post((req, res) => {
  const employeID = req.body.employeID;
  const employeName = req.body.employeName;
  const month = req.body.month;
  const basicSalary = Number(req.body.basicSalary);
  const oTHours = Number(req.body.oTHours);
  const perHoureRate = Number(req.body.perHoureRate);

  const newsalary = new Salary({
    // Create a new instance of the machine model
    employeID,
    employeName,
    month,
    basicSalary,
    oTHours,
    perHoureRate,
  });

  newsalary
    .save()
    .then(() => {
      res.json("salary record Added"); // Send a JSON response if the save operation is successful
    })
    .catch((err) => {
      // Make sure to include 'err' as the parameter in the catch block
      console.error(err); // Log the error for debugging
      res.status(500).json({ error: "Failed to add salary record" }); // Optionally send a response with an error message
    });
});
router.get("/all", async (req, res) => {
  try {
    const listOfSalaryDetail = await Salary.find({});

    const epfRate = parseFloat(process.env.EPF_RATE);
    const etfRate = parseFloat(process.env.ETF_RATE);

    let litOfSalaryViewModel = [];

    for (var salary of listOfSalaryDetail) {
      let etfAmount = salary.basicSalary * etfRate;
      let epfAmount = salary.basicSalary * epfRate;
      let ot = salary.oTHours * salary.perHoureRate;

      litOfSalaryViewModel.push({
        id: salary._id,
        employeID: salary.employeID, //new add
        employeeName: salary.employeName,
        month: salary.month, //new add
        basicSalary: salary.basicSalary,
        etfAmount: etfAmount,
        epfAmount: epfAmount,
        ot: ot,
        grossSalary: salary.basicSalary - (etfAmount + epfAmount) + ot,
      });
    }

    res.status(200).json(litOfSalaryViewModel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  //
  const sId = req.params.id;

  try {
    await Salary.findByIdAndDelete(sId);
    res.status(200).send({ status: "Salary deleted" });
    // console.log("Deleted record:" deletedSalary);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ status: "Delete not complete", error: err.message });
  }
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  PayRoll.findById(id)
    .then((salary) => {
      if (!salary) {
        return res.status(404).send("Salary not Found");
      }
      res.json(salary);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Service error");
    });
});

module.exports = router;
