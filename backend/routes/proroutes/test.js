const router = require("express").Router();
const Order = require("../../models/promodels/model1");  // Correct path to model

// Data insertion
router.route("/add").post((req, res) => {
    const { num, name, qty, size, material, materialQTY } = req.body;
    
    const newOrder = new Order({
        num,
        name,
        qty,
        size,
        material,
        materialQTY
    });
    
    newOrder.save()
        .then(() => {
            res.json("Supplier Added");
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Error adding supplier" });  // Send error response
        });
});

router.route("/").get((req, res) => {
    Order.find()
        .then((Orders) => {
            res.json(Orders);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Error fetching suppliers" });  // Send error response
        });
});

// Update a supplier by ID
router.route("/update/:id").put(async (req, res) => {
    const id = req.params.id;
    const { num, name, qty, size, material, materialQTY } = req.body;

    try {
        const updatedSupplier = await Order.findByIdAndUpdate(
            id,
            { num, name, qty, size, material, materialQTY },
            { new: true }  // Return the updated document
        );

        if (!updatedSupplier) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.json({ message: "Order updated successfully", updatedSupplier });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error updating Order" });
    }
});

router.route("/delete/:id").delete((req, res) => {
    const id = req.params.id;
    console.log(`Attempting to delete supplier with ID: ${id}`); // Log the ID

    Order.findByIdAndDelete(id)
        .then((deletedSupplier) => {
            if (!deletedSupplier) {
                return res.status(404).json({ message: "Order not found" });
            }
            res.json({ message: "Order deleted successfully" });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Error deleting supplier" });
        });
});

module.exports = router;
