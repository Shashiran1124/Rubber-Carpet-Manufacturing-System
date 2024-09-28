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
    useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once("open", ()=>{
    console.log("MongoDB Connection Success!");
});

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






app.listen(PORT, ()=>{
    console.log(`Server is up and running on PORT : ${PORT}`);
});