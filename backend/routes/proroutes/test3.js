const router = require("express").Router();
const allocations = require("../../models/promodels/model3");  // Correct path to model

// Data insertion
router.route("/addmachi").post((req, res) => {
    const { mnum, mdate, mstime, metime, mteam } = req.body;
    
    const newOrder = new allocations({
        mnum,
        mdate,
        mstime,
        metime,
        mteam
    });
    
    newOrder.save()
        .then(() => {
            res.json("Order Added");
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Error adding order" });  // Send error response
        });
});

router.route("/machi").get((req, res) => {
    allocations.find()
        .then((machis) => {
            res.json(machis);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Error fetching orders" });  // Send error response
        });
});

// Update an order by ID
router.route("/update/:id").put(async (req, res) => {
    const id = req.params.id;
    const { mnum, mdate, mstime, metime, mteam } = req.body;

    try {
        const updatedOrder = await allocations.findByIdAndUpdate(
            id,
            { mnum, mdate, mstime, metime, mteam },
            { new: true }  // Return the updated document
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.json({ message: "Order updated successfully", updatedOrder });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error updating order" });
    }
});






router.route("/delete/:id").delete((req, res) => {
    const id = req.params.id;
    console.log(`Attempting to delete order with ID: ${id}`); // Log the ID

    allocations.findByIdAndDelete(id)
        .then((deletedOrder) => {
            if (!deletedOrder) {
                return res.status(404).json({ message: "Order not found" });
            }
            res.json({ message: "Order deleted successfully" });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Error deleting order" });
        });
});



module.exports = router;
