const router = require("express").Router();
const ProductionProgress = require("../../models/promodels/model4");  // Correct path to model

// Data insertion
router.route("/addProgress").post((req, res) => {
    const { lname, lmaterial, lcutting, lmolding, lVulcanization, lgoodunit, lDefectiveunit } = req.body;
    
    const newProgress = new ProductionProgress({
        lname,
        lmaterial,
        lcutting,
        lmolding,
        lVulcanization,
        lgoodunit,
        lDefectiveunit
    });
    
    newProgress.save()
        .then(() => {
            res.json("Progress Added");
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Error adding progress" });  // Send error response
        });
});

router.route("/progress").get((req, res) => {
    ProductionProgress.find()
        .then((progresses) => {
            res.json(progresses);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Error fetching progress data" });  // Send error response
        });
});

// Update a progress entry by ID
router.route("/update/:id").put(async (req, res) => {
    const id = req.params.id;
    const { lname, lmaterial, lcutting, lmolding, lVulcanization, lgoodunit, lDefectiveunit } = req.body;

    try {
        const updatedProgress = await ProductionProgress.findByIdAndUpdate(
            id,
            { lname, lmaterial, lcutting, lmolding, lVulcanization, lgoodunit, lDefectiveunit },
            { new: true }  // Return the updated document
        );

        if (!updatedProgress) {
            return res.status(404).json({ message: "Progress not found" });
        }

        res.json({ message: "Progress updated successfully", updatedProgress });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error updating progress" });
    }
});

// Delete a progress entry by ID
router.route("/delete/:id").delete((req, res) => {
    const id = req.params.id;
    console.log(`Attempting to delete progress with ID: ${id}`); // Log the ID

    ProductionProgress.findByIdAndDelete(id)
        .then((deletedProgress) => {
            if (!deletedProgress) {
                return res.status(404).json({ message: "Progress not found" });
            }
            res.json({ message: "Progress deleted successfully" });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Error deleting progress" });
        });
});

module.exports = router;
