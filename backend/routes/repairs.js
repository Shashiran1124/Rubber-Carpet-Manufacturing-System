const express = require("express");
const router = express.Router(); //////import express pacage with Router
let repair = require("../models/Repair") //should use machine model so import it (requir= import karana use karanva)

//front end idn backend call karannna URL ekak use karanva http:/Localhost:8070/machine/add execute venava *ekathami methana venne
router.route("/add").post((req,res)=>{  //router for create function  *router variable eke thiyenava function ekak ekata eka parametr ekak denna one
    
    const  machineID= req.body.machineID;
    const repairStartDate = new Date(req.body.repairStartDate);
    const partName = req.body.partName;
    const repairEndDate = Date(req.body.repairEndDate);
    const discription = req.body.discription;


    const newrepair = new repair({ // Create a new instance of the machine model
        machineID,
        repairStartDate,
        partName,
        repairEndDate,
        discription
    });
    
    newrepair.save()
        .then(() => {
            res.json("repair record Added"); // Send a JSON response if the save operation is successful
        })
        .catch((err) => {  // Make sure to include 'err' as the parameter in the catch block
            console.error(err); // Log the error for debugging
            res.status(500).json({ error: 'Failed to add repair record' }); // Optionally send a response with an error message
        });    
     
})


router .route("/").get((req,res)=>{ //all data display using slash   parameter = /   /disply thibboth ....machine/display
    //get - http request method  *data gannava kohenhari
    repair.find().then((repair)=>{ //machin table eken ganne // kohomada ganne machine model eka cl karala
        res.json(repair)          // find is a method(okkogema data ganna)  //findByIdAndDelete--document ekak delete karanna
   }).catch((err)=>{
       console.log(err)
   })

})

router .route("/:mid").get((req,res)=>{ //all data display using slash   parameter = /   /disply thibboth ....machine/display
    //get - http request method  *data gannava kohenhari
    let mid = req.params.mid;
    repair.find({machineID:mid}).then((repairs)=>{
        res.json(repairs)  
    })
    .catch((err)=>{
       console.log(err)
   })

})


router.route("/update/:id").put(async(req,res)=>{ 

    let rID = req.params.id;

    const{machineID,repairStartDate,partName,repairEndDate,discription} = req.body; 

    const updateRepair = {  

        machineID,
        repairStartDate,
        partName,
        repairEndDate,
        discription

    }
    const update = await repair.findByIdAndUpdate(rID,updateRepair).then(()=>{

        res.status(200).send({status: "repair update"})

    }).catch((err)=>{
        console.log(err)
    })
    
})


router.route("/delete/:id").delete(async(req,res)=>{
    let rId=req.params.id;

    await repair.findByIdAndDelete (rId).then(()=>{
        res.status(200).send({status:"repair record deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({Status:"delete Unsuccessfull",error:err.message});
    })
})

router.route("/:id").get((req, res) => {
    const { id } = req.params; // Get the ID from the URL parameter
    repair.findById(id)
        .then((repair) => {
            if (!repair) {
                return res.status(404).send("Record not found");
            }
            res.json(repair);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send("Server Error");
        });
});




module.exports = router;