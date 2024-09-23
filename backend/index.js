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
    //useNewUrlParser: true,
    //useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once("open", ()=>{
    console.log("MongoDB Connection Success!");
});

const testRouter = require("./routes/test.js");
app.use("/test", testRouter);

const salaryRouter = require("./routes/salaryCal.js");
app.use("/salary", salaryRouter);

const pettytRouter = require("./routes/pettyCash.js");
app.use("/PettyCash", pettytRouter);

const profitAndLostRouter = require("./routes/profitAndLosts.js");
app.use("/ProfitAndLost", profitAndLostRouter);


app.listen(PORT, ()=>{
    console.log(`Server is up and running on PORT : ${PORT}`);
});