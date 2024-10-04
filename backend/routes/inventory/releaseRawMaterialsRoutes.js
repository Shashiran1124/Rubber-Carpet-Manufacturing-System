const router = require("express").Router();
const ReleaseRawMaterials = require("../../models/inventory/releaseRawMaterials"); // Import the ReleaseRawMaterials model

// Data insertion into ReleaseRawMaterials
router.route("/add-release").post((req, res) => {
    const { stockNumber, stockType, releaseDate, quantity } = req.body; // Updated fields for ReleaseRawMaterials

    // Check if all fields are present
    if (!stockNumber || !stockType || !releaseDate || !quantity) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const newReleaseRawMaterials = new ReleaseRawMaterials({
        stockNumber,
        stockType,
        releaseDate,
        quantity
    });

    newReleaseRawMaterials.save()
        .then(() => {
            res.json("Release Raw Materials Added");
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Error adding release raw materials", details: err.message });
        });
});

// Fetch all records from ReleaseRawMaterials
router.route("/release-raw-materials").get((req, res) => {
    ReleaseRawMaterials.find()
        .then((inventory) => {
            res.json(inventory);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Error fetching release raw materials", details: err.message });
        });
});

// Update a release raw materials item by ID
router.route("/update-release/:id").put(async (req, res) => {
    const id = req.params.id;
    const { stockNumber, stockType, releaseDate, quantity } = req.body;

    try {
        const updatedReleaseRawMaterials = await ReleaseRawMaterials.findByIdAndUpdate(
            id,
            { stockNumber, stockType, releaseDate, quantity },
            { new: true }  // Return the updated document
        );

        if (!updatedReleaseRawMaterials) {
            return res.status(404).json({ message: "Not found" });
        }

        res.json({ message: "Release Raw Materials updated successfully", updatedReleaseRawMaterials });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error while updating release raw materials" });
    }
});

/// Delete a release raw materials item by ID
router.route("/delete-release/:id").delete((req, res) => {
    const id = req.params.id;

    ReleaseRawMaterials.findByIdAndDelete(id)
        .then((deletedReleaseRawMaterials) => {
            if (!deletedReleaseRawMaterials) {
                return res.status(404).json({ message: "Release raw materials item not found" });
            }
            res.json({ message: "Release raw materials item deleted successfully" });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Error deleting release raw materials item", details: err.message });
        });
});

module.exports = router;
