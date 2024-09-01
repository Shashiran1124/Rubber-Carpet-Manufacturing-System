const express = require("express");
const router = express.Router(); //////import express pacage with Router
let machine = require("../models/machine") //should use machine model so import it (requir= import karana use karanva)

//front end idn backend call karannna URL ekak use karanva http:/Localhost:8070/machine/add execute venava *ekathami methana venne
router .route("/add").post((req,res)=>{  //router for create function  *router variable eke thiyenava function ekak ekata eka parametr ekak denna one

    const machineID = req.body.machineID;
    const date = Date(req.body.date);
    const status = req.body.status;
    const nextGeneralRepairDate = Date(req.body.nextGeneralRepairDate);
    


    const newmachine = new machine({ // Create a new instance of the machine model
        machineID,
        date,
        status,
        nextGeneralRepairDate
    });
    
    newmachine.save()
        .then(() => {
            res.json("Machine Added"); // Send a JSON response if the save operation is successful
        })
        .catch((err) => {  // Make sure to include 'err' as the parameter in the catch block
            console.error(err); // Log the error for debugging
            res.status(500).json({ error: 'Failed to add machine' }); // Optionally send a response with an error message
        });    
     
})
//http:/Localhost:8070/machine  
router .route("/").get((req,res)=>{ //all data display using slash   parameter = /   /disply thibboth ....machine/display
     //get - http request method  *data gannava kohenhari
    machine.find().then((machine)=>{ //machin table eken ganne // kohomada ganne machine model eka cl karala
         res.json(machine)          // find is a method(okkogema data ganna)  //findByIdAndDelete--document ekak delete karanna
    }).catch((err)=>{
        console.log(err)
    })

})
//http:Localhost:8070/update/:id
router.route("/update/:id").put(async(req,res)=>{ 

    let mID = req.params.id;

    const{machineID,date,status,nextGeneralRepairDate} = req.body; 

    const updateMachine = {  
        machineID,
        date,
        status,
        nextGeneralRepairDate

    }
    const update = await machine.findByIdAndUpdate(mID,updateMachine).then(()=>{

        res.status(200).send({status: "machine update"})

    }).catch((err)=>{
        console.log(err)
    })
    
})

//Delete
router.route("/delete/:id").delete(async(req,res)=>{
    let mId=req.params.id;

    await machine.findByIdAndDelete (mId).then(()=>{
        res.status(200).send({status:"machine deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({Status:"delete not completed",error:err.message});
    })
})


router.route("/:id").get((req, res) => {
    const { id } = req.params; // Get the ID from the URL parameter
    machine.findById(id)
        .then((machine) => {
            if (!machine) {
                return res.status(404).send("Machine not found");
            }
            res.json(machine);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send("Server Error");
        });
});


module.exports = router;
