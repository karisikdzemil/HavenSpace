const express = require('express');
const mongoose = require('mongoose');
const propertyRoutes = require('./routes/property');
const cors = require('cors');

const db_key = "mongodb+srv://karisikdzemil:Dzemil123@cluster0.ldrhrp1.mongodb.net/havenspace?retryWrites=true&w=majority&appName=Cluster0";

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', propertyRoutes);

mongoose.connect(db_key).then(result => {
    console.log('Connected with mongodb!');
    app.listen(8080);
}).catch(err => console.log(err))