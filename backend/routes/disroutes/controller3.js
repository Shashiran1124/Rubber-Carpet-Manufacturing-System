const router = require("express").Router();
const Cost = require("../../models/dismodels/model4");  // Correct path to Cost model

// Data insertion
router.route("/addcost").post((req, res) => {
    const {
        Month,
        Transport_Cost,
        Fuel_Cost,
        Vehicle_Repair_Cost,
        Food_Cost,
        Insurance_Cost,
        
    } = req.body;

    const newCost = new Cost({
        Month,
        Transport_Cost,
        Fuel_Cost,
        Vehicle_Repair_Cost,
        Food_Cost,
        Insurance_Cost,
        
    });

    newCost.save()
        .then(() => {
            res.json("Cost Record Added");
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: "Error adding cost record" });
        });
});

// Fetch all cost records
router.route("/costs").get((req, res) => {
    Cost.find()
        .then((costRecords) => {
            res.json(costRecords);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: "Error fetching cost records" });
        });
});

// Update a cost record by ID
router.route("/update/:id").put(async (req, res) => {
    const id = req.params.id;
    const {
        Month,
        Transport_Cost,
        Fuel_Cost,
        Vehicle_Repair_Cost,
        Food_Cost,
        Insurance_Cost,
        
    } = req.body;

    try {
        const updatedCost = await Cost.findByIdAndUpdate(
            id,
            {
                Month,
                Transport_Cost,
                Fuel_Cost,
                Vehicle_Repair_Cost,
                Food_Cost,
                Insurance_Cost,
                
            },
            { new: true }  // Return the updated document
        );

        if (!updatedCost) {
            return res.status(404).json({ message: "Cost record not found" });
        }

        res.json({ message: "Cost record updated successfully", updatedCost });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error updating cost record" });
    }
});

// Delete a cost record by ID
router.route("/delete/:id").delete((req, res) => {
    const id = req.params.id;

    Cost.findByIdAndDelete(id)
        .then((deletedCost) => {
            if (!deletedCost) {
                return res.status(404).json({ message: "Cost record not found" });
            }
            res.json({ message: "Cost record deleted successfully" });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: "Error deleting cost record" });
        });
});

module.exports = router;
