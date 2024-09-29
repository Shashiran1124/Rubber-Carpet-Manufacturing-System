const router = require("express").Router();
const Supcalculator = require("../../models/supmodels/Supcalculator");


// Data insertion
router.route("/add").post((req, res) => {
    const { date, rawMaterialType, unit, pricePerUnit, quantity, totalCost } = req.body;
    
    const newSupcalculator = new Supcalculator({
        date,
        rawMaterialType,
        unit,
        pricePerUnit,
        quantity,
        totalCost
    });
    
    newSupcalculator.save()
        .then(() => {
            res.json("Calculated Successfully");
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Error while calculating" });  // Send error response
        });
});

router.route("/").get((req, res) => {
    Supcalculator.find()
        .then((supcalculators) => {
            res.json(supcalculators);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Error fetching Data" });  // Send error response
        });

});


router.route("/update/:id").put(async (req, res) => {
    const id = req.params.id;
    const { date, rawMaterialType, unit, pricePerUnit, quantity, totalCost } = req.body;

    try {
        const updatedSupcalculator = await Supcalculator.findByIdAndUpdate(
            id,
            { date, rawMaterialType, unit, pricePerUnit, quantity, totalCost },
            { new: true }  // Return the updated document
        );

        if (!updatedSupcalculator) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.json({ message: "Order updated successfully", updatedSupcalculator });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error updating supplier" });
    }
});


router.route("/delete/:id").delete((req, res) => {
    const id = req.params.id;

    Supcalculator.findByIdAndDelete(id)
        .then((deletedSupcalculator) => {
            if (!deletedSupcalculator) {
                return res.status(404).json({ message: "Record not found" });
            }
            res.json({ message: "Record deleted successfully" });  // Send a success response
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Error deleting the record" });  // Send error response
        });
});


module.exports = router;