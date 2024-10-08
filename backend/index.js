const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB Connection Success!");
});

//Hashan
const testRouter = require("./routes/proroutes/test.js");
app.use("/test", testRouter);

const testRouter2 = require("./routes/proroutes/test2.js");
app.use("/test2", testRouter2);

const testRouter3 = require("./routes/proroutes/test3.js");
app.use("/test3", testRouter3);

const testRouter4 = require("./routes/proroutes/test4.js");
app.use("/test4", testRouter4);

const testRouter5 = require("./routes/proroutes/test5.js");
app.use("/test5", testRouter5);

//Nishan
const controller = require("./routes/disroutes/controller.js");
app.use("/controller", controller);

const controller1 = require("./routes/disroutes/controller1.js");
app.use("/controller1", controller1);

const controller2 = require("./routes/disroutes/controller2.js");
app.use("/controller2", controller2);

const controller3 = require("./routes/disroutes/controller3.js");
app.use("/controller3", controller3);

//Shashiran
const suptestRouter = require("./routes/suproutes/suptest"); // Ensure this path is correct
app.use("/suptest", suptestRouter);

const suptestRouter1 = require("./routes/suproutes/suptest1"); // Ensure this path is correct
app.use("/suptest1", suptestRouter1);

const suptestRouter2 = require("./routes/suproutes/suptest2"); // Ensure this path is correct
app.use("/suptest2", suptestRouter2);

//Malindu
const custestRouter = require("./routes/cusroutes/custest");
const custest2Router = require("./routes/cusroutes/custest2");
const custest3Router = require("./routes/cusroutes/custest3"); // Ensure this path is correct

app.use("/custest", custestRouter);
app.use("/cusfeedback", custest2Router);
app.use("/cuscalculation", custest3Router); // Adjust route path as needed

//nishitha
const testRouterin = require("./routes/inventory/inventoryroute.js");
app.use("/inventoryroute", testRouterin);

const testRouter2in = require("./routes/inventory/releaseInventoryRoutes.js");
app.use("/releaseInventoryRoutes", testRouter2in);

const testRouter3in = require("./routes/inventory/receiveRawMaterialsRoutes.js");
app.use("/receiveRawMaterialsRoutes", testRouter3in);

const testRouter4in = require("./routes/inventory/releaseRawMaterialsRoutes.js");
app.use("/releaseRawMaterialsRoutes", testRouter4in);

//siyumi
// Import routers
const testRouterhr = require("./routes/hrroutes/hrtest.js");
const empFeedbackRouter = require("./routes/hrroutes/empfeedback.js"); 
const empsalaryRouter = require("./routes/hrroutes/empsalary.js"); 

// Use routers
app.use("/hrtest", testRouterhr);
app.use("/feedback", empFeedbackRouter); 
app.use("/salary", empsalaryRouter); 

//nawodya
const machineRouter = require("./routes/machineroute/machines.js"); //machine
app.use("/machine", machineRouter); //machines,js file eka lord venna denna oona url eka machines

const repairRouter = require("./routes/machineroute/repairs.js"); //repair
app.use("/repair", repairRouter); //repairs,js file eka lord venna denna oona url eka machines

const PartRouter = require("./routes/machineroute/parts.js"); //repair
app.use("/Part", PartRouter); //repairs,js file eka lord venna denna oona url eka machines

//hasini
const salaryRouter = require("./routes/accountantroute/salaryCal.js");
app.use("/salaryy", salaryRouter);//salary

const pettytRouter = require("./routes/accountantroute/pettyCash.js");
app.use("/PettyCash", pettytRouter);

const profitAndLostRouter = require("./routes/accountantroute/profitAndLosts.js");
app.use("/ProfitAndLost", profitAndLostRouter);

app.listen(PORT, () => {
  console.log(`Server is up and running on PORT : ${PORT}`);
});
