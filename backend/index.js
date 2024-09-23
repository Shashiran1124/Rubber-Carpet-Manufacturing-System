const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB Connection Success!");
}).catch(err => {
    console.error("MongoDB Connection Error:", err);
});

const testRouter = require("./routes/test"); // Ensure this path is correct
app.use("/test", testRouter);

const testRouter1 = require("./routes/test1"); // Ensure this path is correct
app.use("/test1", testRouter1);

const testRouter2 = require("./routes/test2"); // Ensure this path is correct
app.use("/test2", testRouter2);



app.listen(PORT, () => {
    console.log(`Server is up and running on PORT : ${PORT}`);
});
