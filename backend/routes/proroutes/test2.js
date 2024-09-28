const router = require("express").Router();
const Plan = require("../../models/promodels/model2");  // Correct path to model

// Data insertion
router.route("/addplan").post((req, res) => {
    const { pnum, psdate, pstime, petime, pshift, pteam } = req.body;
    
    const newPlan = new Plan({
        pnum,
        psdate,
        pstime,
        petime,
        pshift,
        pteam
    });
    
    newPlan.save()
        .then(() => {
            res.json("Plan Added");
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Error adding plan" });  // Send error response
        });
});

// Fetch all plans
router.route("/plan").get((req, res) => {
    Plan.find()
        .then((plans) => {
            res.json(plans);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Error fetching plans" });  // Send error response
        });
});

// Update a plan by ID
router.route("/update/:id").put(async (req, res) => {
    const id = req.params.id;
    const { pnum, psdate, pstime, petime, pshift, pteam } = req.body;

    console.log(`Updating plan with ID: ${id}`); // Log the ID
    console.log("Update data:", { pnum, psdate, pstime, petime, pshift, pteam }); // Log the data being updated

    try {
        const updatedPlan = await Plan.findByIdAndUpdate(
            id,
            { pnum, psdate, pstime, petime, pshift, pteam },
            { new: true }  // Return the updated document
        );

        if (!updatedPlan) {
            return res.status(404).json({ message: "Plan not found" });
        }

        res.json({ message: "Plan updated successfully", updatedPlan });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error updating plan" });
    }
});

// Delete a plan by ID
router.route("/delete/:id").delete((req, res) => {
    const id = req.params.id;
    console.log(`Attempting to delete plan with ID: ${id}`); // Log the ID

    Plan.findByIdAndDelete(id)
        .then((deletedPlan) => {
            if (!deletedPlan) {
                return res.status(404).json({ message: "Plan not found" });
            }
            res.json({ message: "Plan deleted successfully" });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Error deleting plan" });
        });
});

module.exports = router;
