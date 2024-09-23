const router = require("express").Router();
const Suporder = require("../models/Suporder");
const Supplier = require("../models/Suporder");  // Correct path to model

// Data insertion
router.route("/addorder").post((req, res) => {
    const { dateOfOrder,companyName, contactNumber, materialType,unit, quantity } = req.body;
    
    const newSuporder = new Suporder({
        dateOfOrder,
        companyName,
        contactNumber,
        materialType,
        unit,
        quantity
    });
    
    newSuporder.save()
        .then(() => {
            res.json("Raw Material Order Added");
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Error adding Order" });  // Send error response
        });
});




router.route("/").get((req, res) => {
    Suporder.find()
        .then((suporders) => {
            res.json(suporders);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Error fetching suppliers" });  // Send error response
        });

});





// Update a supplier by ID
router.route("/update/:id").put(async (req, res) => {
    const id = req.params.id;
    const { companyName, address, contactNumber, materialType,unit, quantity } = req.body;

    try {
        const updatedSuporder = await Suporder.findByIdAndUpdate(
            id,
            { companyName, address, contactNumber, materialType,unit, quantity },
            { new: true }  // Return the updated document
        );

        if (!updatedSuporder) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.json({ message: "Order updated successfully", updatedSuporder });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error updating supplier" });
    }
});





// Delete a supplier by ID
router.route("/delete/:id").delete((req, res) => {
    const id = req.params.id;

    Supplier.findByIdAndDelete(id)
        .then((deletedSuporder) => {
            if (!deletedSuporder) {
                return res.status(404).json({ message: "Order not found" });
            }
           
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Error deleting order" });  // Send error response
        });
});


module.exports = router;


