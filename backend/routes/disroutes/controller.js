const router = require("express").Router();
const Transport = require("../../models/dismodels/model");  // Correct path to model

// Data insertion
router.route("/addtrans").post((req, res) => {
    const {
        Transport_Number,
        Order_Number,
        Number_of_Packages,
        Drop_off_Location,
        Vehicle_Number,
        Pickup_Date_and_Time,
        Drop_off_Date_and_Time,
        Tracking_Number
    } = req.body;

    const newTransport = new Transport({
        Transport_Number,
        Order_Number,
        Number_of_Packages,
        Drop_off_Location,
        Vehicle_Number,
        Pickup_Date_and_Time,
        Drop_off_Date_and_Time,
        Tracking_Number
    });

    newTransport.save()
        .then(() => {
            res.json("Transport Record Added");
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Error adding transport record" });
        });
});

// Fetch all transport records
router.route("/trans").get((req, res) => {
    Transport.find()
        .then((transportRecords) => {
            res.json(transportRecords);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Error fetching transport records" });
        });

// Update a transport record by ID
router.route("/update/:id").put(async (req, res) => {
    const id = req.params.id;
    const {
        Transport_Number,
        Order_Number,
        Number_of_Packages,
        Drop_off_Location,
        Vehicle_Number,
        Pickup_Date_and_Time,
        Drop_off_Date_and_Time,
        Tracking_Number
    } = req.body;

    try {
        const updatedTransport = await Transport.findByIdAndUpdate(
            id,
            {
                Transport_Number,
                Order_Number,
                Number_of_Packages,
                Drop_off_Location,
                Vehicle_Number,
                Pickup_Date_and_Time,
                Drop_off_Date_and_Time,
                Tracking_Number
            },
            { new: true }  // Return the updated document
        );

        if (!updatedTransport) {
            return res.status(404).json({ message: "Transport record not found" });
        }

        res.json({ message: "Transport record updated successfully", updatedTransport });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error updating transport record" });
    }
});


});
// Delete a transport record by ID
router.route("/delete/:id").delete((req, res) => {
    const id = req.params.id;

    Transport.findByIdAndDelete(id)
        .then((deletedTransport) => {
            if (!deletedTransport) {
                return res.status(404).json({ message: "Transport record not found" });
            }
            res.json({ message: "Transport record deleted successfully" });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Error deleting transport record" });
        });
});



module.exports = router;
