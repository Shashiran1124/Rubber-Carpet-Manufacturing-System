const router = require("express").Router();
const ReleaseInventory = require("../../models/inventory/ReleaseInventory"); // Import the ReleaseInventory model

// Data insertion into ReleaseInventory
router.route("/add-release").post((req, res) => {
    const { productId, productName, productionDate, quantity, unitPrice, totalPrice, releaseDate } = req.body;

    // Check if all fields are present
    if (!productId || !productName || !productionDate || !quantity || !unitPrice || !totalPrice) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const newReleaseInventory = new ReleaseInventory({
        productId,
        productName,
        productionDate,
        quantity,
        unitPrice,
        totalPrice,
        releaseDate // Include releaseDate or any additional fields if needed
    });

    newReleaseInventory.save()
        .then(() => {
            res.json("Release Inventory Added");
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Error adding release inventory", details: err.message });
        });
});

// Fetch all records from ReleaseInventory
router.route("/release-inventory").get((req, res) => {
    ReleaseInventory.find()
        .then((inventory) => {
            res.json(inventory);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Error fetching release inventory", details: err.message });
        });
});

// Update a release inventory item by ID
router.route("/update-release/:id").put(async (req, res) => {
    const id = req.params.id;
    const { productId, productName, productionDate, quantity, unitPrice, totalPrice, releaseDate } = req.body;

    try {
        const updatedReleaseInventory = await ReleaseInventory.findByIdAndUpdate(
            id,
            { productId, productName, productionDate, quantity, unitPrice, totalPrice, releaseDate },
            { new: true }  // Return the updated document
        );

        if (!updatedReleaseInventory) {
            return res.status(404).json({ message: "Not found" });
        }

        res.json({ message: "Release Inventory updated successfully", updatedReleaseInventory });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error while updating release inventory" });
    }
});

/// Delete a release inventory item by ID
router.route("/delete-release/:id").delete((req, res) => {
    const id = req.params.id;

    ReleaseInventory.findByIdAndDelete(id)
        .then((deletedReleaseInventory) => {
            if (!deletedReleaseInventory) {
                return res.status(404).json({ message: "Release inventory item not found" });
            }
            res.json({ message: "Release inventory item deleted successfully" });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Error deleting release inventory item", details: err.message });
        });
});

module.exports = router;
