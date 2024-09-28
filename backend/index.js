// index.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

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
    console.log('MongoDB Connection Success!');
}).catch(err => {
    console.error('MongoDB Connection Error:', err);
});

const testRouter = require('./routes/test');
const test2Router = require('./routes/test2');
const test3Router = require('./routes/test3'); // Ensure this path is correct

app.use('/test', testRouter);
app.use('/feedback', test2Router);
app.use('/calculation', test3Router); // Adjust route path as needed

app.listen(PORT, () => {
    console.log(`Server is up and running on PORT : ${PORT}`);
});
