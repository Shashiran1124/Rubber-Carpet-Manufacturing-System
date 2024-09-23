const express = require('express');
const router = express.Router();
const PettyCash = require("../models/PettyCash");

// Add Petty Cash
router.post('/add', async (req, res) => {
    try {
        const { date, description, amount } = req.body;
        const newEntry = new PettyCash({
            date,
            description,
            amount
        });

        const savedEntry = await newEntry.save();
        res.status(201).json('data enterd');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get All Petty Cash Entries
router.get('/all', async (req, res) => {
    try {
        const listOfPettyCashDetails = await PettyCash.find({});

        let pettyCashContainer = [];
        let totalAmount = 0;    


        for(var pettyCash of listOfPettyCashDetails){
            pettyCashContainer.push({
                date : pettyCash.date.toString(),
                description : pettyCash.description ?? "",
                amount : pettyCash.amount,
            });

            totalAmount = totalAmount + pettyCash.amount
        }

        pettyCashContainer.push({
            date :"",
            description : "Total Amount",
            amount : totalAmount,
        })


        res.status(200).json(pettyCashContainer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Update Petty Cash
router.put('/update/:id', async (req, res) => {
    try {
        const { date, description, payment } = req.body;
        const updatedEntry = await PettyCash.findByIdAndUpdate(req.params.id, {
            date,
            description,
            payment
        }, { new: true });

        if (!updatedEntry) {
            return res.status(404).json({ message: "Entry not found" });
        }

        res.status(200).json(updatedEntry);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



module.exports = router;
