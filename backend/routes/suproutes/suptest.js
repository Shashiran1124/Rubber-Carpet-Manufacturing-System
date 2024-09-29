const router = require("express").Router();
const Supplier = require("../../models/supmodels/Suppliers");  // Correct path to model

// Data insertion
router.route("/add").post((req, res) => {
    const { companyName, address, contactNumber, materialType,unit, quantity } = req.body;
    
    const newSupplier = new Supplier({
        companyName,
        address,
        contactNumber,
        materialType,
        unit,
        quantity
    });
    
    newSupplier.save()
        .then(() => {
            res.json("Supplier Added");
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Error adding supplier" });  // Send error response
        });
});

router.route("/").get((req, res) => {
    Supplier.find()
        .then((suppliers) => {
            res.json(suppliers);
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
        const updatedSupplier = await Supplier.findByIdAndUpdate(
            id,
            { companyName, address, contactNumber, materialType,unit, quantity },
            { new: true }  // Return the updated document
        );

        if (!updatedSupplier) {
            return res.status(404).json({ message: "Supplier not found" });
        }

        res.json({ message: "Supplier updated successfully", updatedSupplier });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error updating supplier" });
    }
});





// Delete a supplier by ID
router.route("/delete/:id").delete((req, res) => {
    const id = req.params.id;

    Supplier.findByIdAndDelete(id)
        .then((deletedSupplier) => {
            if (!deletedSupplier) {
                return res.status(404).json({ message: "Supplier not found" });
            }
            res.json({ message: "Supplier deleted successfully" });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Error deleting supplier" });  // Send error response
        });
});

module.exports = router;
