const router = require("express").Router();
const KPI = require("../../models/dismodels/model3");  // Correct path to KPI model

// Data insertion
router.route("/addkpi").post((req, res) => {
    const {
        KPI_Number,
        KPI_Name,
        Measurement_Period,
        Target_Value,
        Actual_Value,
        Status,
        Last_Updated,
        Responsible_Department,
        Comments
    } = req.body;

    const newKPI = new KPI({
        KPI_Number,
        KPI_Name,
        Measurement_Period,
        Target_Value,
        Actual_Value,
        Status,
        Last_Updated,
        Responsible_Department,
        Comments
    });

    newKPI.save()
        .then(() => {
            res.json("KPI Record Added");
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: "Error adding KPI record" });
        });
});

// Fetch all KPI records
router.route("/kpi").get((req, res) => {
    KPI.find()
        .then((kpiRecords) => {
            res.json(kpiRecords);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: "Error fetching KPI records" });
        });
});

// Update a KPI record by ID
router.route("/update/:id").put(async (req, res) => {
    const id = req.params.id;
    const {
        KPI_Number,
        KPI_Name,
        Measurement_Period,
        Target_Value,
        Actual_Value,
        Status,
        Last_Updated,
        Responsible_Department,
        Comments
    } = req.body;

    try {
        const updatedKPI = await KPI.findByIdAndUpdate(
            id,
            {
                KPI_Number,
                KPI_Name,
                Measurement_Period,
                Target_Value,
                Actual_Value,
                Status,
                Last_Updated,
                Responsible_Department,
                Comments
            },
            { new: true }  // Return the updated document
        );

        if (!updatedKPI) {
            return res.status(404).json({ message: "KPI record not found" });
        }

        res.json({ message: "KPI record updated successfully", updatedKPI });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error updating KPI record" });
    }
});

// Delete a KPI record by ID
router.route("/delete/:id").delete((req, res) => {
    const id = req.params.id;

    KPI.findByIdAndDelete(id)
        .then((deletedKPI) => {
            if (!deletedKPI) {
                return res.status(404).json({ message: "KPI record not found" });
            }
            res.json({ message: "KPI record deleted successfully" });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: "Error deleting KPI record" });
        });
});

module.exports = router;
