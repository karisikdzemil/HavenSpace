const express = require('express');
const mongoose = require('mongoose');
const propertyRoutes = require('./routes/property');
const cors = require('cors');

require('dotenv').config();
const db_key = process.env.MONGO_URI;

const app = express();

app.use(express.json());
app.use(cors());

app.use((error, req, res, next) => {
    const message = error.message || 'Something went wrong!';
    const status = error.statusCode || 500;
    res.status(status).json({message: message});
})
app.use('/api', propertyRoutes);

mongoose.connect(db_key).then(result => {
    console.log('Connected with mongodb!');
    app.listen(8080);
}).catch(err => console.log(err))