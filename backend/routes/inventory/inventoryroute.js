const router = require("express").Router();
const Inventory = require("../../models/inventory/Inventory");

// Data insertion
router.route("/add").post((req, res) => {
    const { productId, productName, productionDate, quantity, unitPrice, totalPrice } = req.body;

    // Check if all fields are present
    if (!productId || !productName || !productionDate || !quantity || !unitPrice || !totalPrice) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const newInventory = new Inventory({
        productId,
        productName,
        productionDate,
        quantity,
        unitPrice,
        totalPrice
    });

    newInventory.save()
        .then(() => {
            res.json("Inventory Added");
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Error adding inventory", details: err.message });
        });
});

// Fetch all inventory records
router.route("/").get((req, res) => {
    Inventory.find()
        .then((inventory) => {
            res.json(inventory);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Error fetching inventory", details: err.message });
        });
});


// Update a supplier by ID
router.route("/update/:id").put(async (req, res) => {
    const id = req.params.id;
    const { productId, productName, productionDate, quantity, unitPrice, totalPrice } = req.body;

    try {
        const updatedInventory = await Inventory.findByIdAndUpdate(
            id,
            { productId, productName, productionDate, quantity, unitPrice, totalPrice },
            { new: true }  // Return the updated document
        );

        if (!updatedInventory) {
            return res.status(404).json({ message: "Not found" });
        }

        res.json({ message: " Updated successfully", updatedInventory });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error while Updating " });
    }
});


 /// Delete an inventory item by ID
router.route("/delete/:id").delete((req, res) => {
    const id = req.params.id;

    Inventory.findByIdAndDelete(id)
        .then((deletedInventory) => {
            if (!deletedInventory) {
                return res.status(404).json({ message: "Inventory item not found" });
            }
            res.json({ message: "Inventory item deleted successfully" });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Error deleting inventory item", details: err.message });
        });
});


module.exports = router;
