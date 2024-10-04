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
connection.once("open", () => {
    console.log("MongoDB Connection Success!");
});

// Import routers
const testRouter = require("./routes/test.js");
const empFeedbackRouter = require("./routes/empfeedback"); // Adjust path if necessary
const empsalaryRouter = require("./routes/empsalary"); // Import the new empsalary router

// Use routers
app.use("/test", testRouter);
app.use("/feedback", empFeedbackRouter); // Use the feedback routes
app.use("/salary", empsalaryRouter); // Use the salary routes

app.listen(PORT, () => {
    console.log(`Server is up and running on PORT : ${PORT}`);
});
