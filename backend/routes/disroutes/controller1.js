const router = require("express").Router();
const OrderTracking = require("../../models/dismodels/model2");  // Correct path to model

// Data insertion
router.route("/addorder").post((req, res) => {
    const {
        Order_Number,
        Customer_Number,
        Order_Date,
        Product_Number,
        Production_Status,
        Expected_Delivery_Date,
        Actual_Delivery_Date,
        Tracking_URL
    } = req.body;

    const newOrderTracking = new OrderTracking({
        Order_Number,
        Customer_Number,
        Order_Date,
        Product_Number,
        Production_Status,
        Expected_Delivery_Date,
        Actual_Delivery_Date,
        Tracking_URL
    });

    newOrderTracking.save()
        .then(() => {
            res.json("Order Tracking Record Added");
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: "Error adding order tracking record" });
        });
});

// Fetch all order tracking records
router.route("/order").get((req, res) => {
    OrderTracking.find()
        .then((orderRecords) => {
            res.json(orderRecords);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: "Error fetching order tracking records" });
        });
});

// Update an order tracking record by ID
router.route("/update/:id").put(async (req, res) => {
    const id = req.params.id;
    const {
        Order_Number,
        Customer_Number,
        Order_Date,
        Product_Number,
        Production_Status,
        Expected_Delivery_Date,
        Actual_Delivery_Date,
        Tracking_URL
    } = req.body;

    try {
        const updatedOrderTracking = await OrderTracking.findByIdAndUpdate(
            id,
            {
                Order_Number,
                Customer_Number,
                Order_Date,
                Product_Number,
                Production_Status,
                Expected_Delivery_Date,
                Actual_Delivery_Date,
                Tracking_URL
            },
            { new: true }  // Return the updated document
        );

        if (!updatedOrderTracking) {
            return res.status(404).json({ message: "Order tracking record not found" });
        }

        res.json({ message: "Order tracking record updated successfully", updatedOrderTracking });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error updating order tracking record" });
    }
});

// Delete an order tracking record by ID
router.route("/delete/:id").delete((req, res) => {
    const id = req.params.id;

    OrderTracking.findByIdAndDelete(id)
        .then((deletedOrderTracking) => {
            if (!deletedOrderTracking) {
                return res.status(404).json({ message: "Order tracking record not found" });
            }
            res.json({ message: "Order tracking record deleted successfully" });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: "Error deleting order tracking record" });
        });
});

module.exports = router;
