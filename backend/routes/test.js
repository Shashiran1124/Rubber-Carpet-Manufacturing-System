const router=require("express").Router();
const {request}=require("express");
let Test=require("../models/Test");

//Data insertion
router.route("/add").post((req,res)=>{

    const name=req.body.name;
    const password = req.body.password;
    
    const newTest = new Test({
        name,password
    })
    
    newTest.save().then(()=>{
        res.json("Test Added")
    }).catch((err)=>{
        console.log(err);
        })
    })

    router.route("/").get((req,res)=>{
        Test.find().then((test)=>{
            res.json(test)
        }).catch((err)=>{
            console.log(err)
        })
    })

    module.exports=router;