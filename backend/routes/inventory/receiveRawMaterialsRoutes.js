const router = require("express").Router();
const ReceiveRawMaterials = require("../../models/inventory/ReceiveRawMaterials"); // Import the ReceiveRawMaterials model

// Data insertion into ReceiveRawMaterials
router.route("/add-receive").post((req, res) => {
    const { stockNumber, stockType, receiveDate, quantity } = req.body; // Updated fields for ReceiveRawMaterials

    // Check if all fields are present
    if (!stockNumber || !stockType || !receiveDate || !quantity) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const newReceiveRawMaterials = new ReceiveRawMaterials({
        stockNumber,
        stockType,
        receiveDate,
        quantity
    });

    newReceiveRawMaterials.save()
        .then(() => {
            res.json("Receive Raw Materials Added");
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Error adding receive raw materials", details: err.message });
        });
});

// Fetch all records from ReceiveRawMaterials
router.route("/receive-raw-materials").get((req, res) => {
    ReceiveRawMaterials.find()
        .then((inventory) => {
            res.json(inventory);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Error fetching receive raw materials", details: err.message });
        });
});

// Update a receive raw materials item by ID
router.route("/update-receive/:id").put(async (req, res) => {
    const id = req.params.id;
    const { stockNumber, stockType, receiveDate, quantity } = req.body;

    try {
        const updatedReceiveRawMaterials = await ReceiveRawMaterials.findByIdAndUpdate(
            id,
            { stockNumber, stockType, receiveDate, quantity },
            { new: true }  // Return the updated document
        );

        if (!updatedReceiveRawMaterials) {
            return res.status(404).json({ message: "Not found" });
        }

        res.json({ message: "Receive Raw Materials updated successfully", updatedReceiveRawMaterials });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error while updating receive raw materials" });
    }
});

/// Delete a receive raw materials item by ID
router.route("/delete-receive/:id").delete((req, res) => {
    const id = req.params.id;

    ReceiveRawMaterials.findByIdAndDelete(id)
        .then((deletedReceiveRawMaterials) => {
            if (!deletedReceiveRawMaterials) {
                return res.status(404).json({ message: "Receive raw materials item not found" });
            }
            res.json({ message: "Receive raw materials item deleted successfully" });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Error deleting receive raw materials item", details: err.message });
        });
});

module.exports = router;
