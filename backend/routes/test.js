const router = require("express").Router();
const SalesOrder = require("../models/SalesOrder");  // Correct path to model

// Data insertion
router.route("/add").post((req, res) => {
    const { customerName, orderDate, contactNumber, productCatalog, address, quantity, purchasingReason } = req.body;
    
    const newSalesOrder = new SalesOrder({
        customerName,
        orderDate,
        contactNumber,
        productCatalog,
        address,
        quantity,
        purchasingReason
    });
    
    newSalesOrder.save()
        .then(() => {
            res.json("Sales Order Added");
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Error adding sales order" });  // Send error response
        });
});

// Fetch all sales orders
router.route("/").get((req, res) => {
    SalesOrder.find()
        .then((salesOrders) => {
            res.json(salesOrders);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Error fetching sales orders" });  // Send error response
        });
});
// Delete a sales order
router.route("/delete/:id").delete((req, res) => {
    const salesOrderId = req.params.id;

    SalesOrder.findByIdAndDelete(salesOrderId)
        .then(() => {
            res.json("Sales Order Deleted");
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Error deleting sales order" });  // Send error response
        });
});
// Update a by ID
router.route("/update/:id").put(async (req, res) => {
    const id = req.params.id;
    const { customerName, orderDate, contactNumber, productCatalog, address,quantity,purchasingReason} = req.body;

    try {
        const updatedSalesOrder = await SalesOrder.findByIdAndUpdate(
            id,
            { customerName, orderDate, contactNumber, productCatalog, address,quantity,purchasingReason },
            { new: true }  // Return the updated document
        );

        if (!updatedSalesOrder) {
            return res.status(404).json({ message: "sales order not found" });
        }

        res.json({ message: "sales order updated successfully", updatedSalesOrder });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error updating sales orders" });
    }
});




module.exports = router;
