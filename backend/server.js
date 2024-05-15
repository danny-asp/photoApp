const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const photoRoutes = require('./routes/routes');
const cors = require('cors');


const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb+srv://dannyASP:dannyasparuhov@cluster0.vs0csbm.mongodb.net/buildableBuddies?retryWrites=true&w=majority")
        console.log("Mongo is connected")
    } catch (error) {
        console.log("error while connecting to Mongo")
        process.exit(1)
    }
}

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Connect to MongoDB
connectDB()
app.use('/uploads', express.static('uploads'));
app.use('/api/photos', photoRoutes);


const port = 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
