const express = require('express');
const mongoose = require('mongoose');
const Property = require('./models/Property');  
const propertyRoutes = require('./routes/property');

const db_key = "mongodb+srv://karisikdzemil:Dzemil123@cluster0.ldrhrp1.mongodb.net/havenspace?retryWrites=true&w=majority&appName=Cluster0";

const app = express();

app.use('/api/properties', propertyRoutes);

mongoose.connect(db_key).then(result => {
    const p = new Property({title: 'djemsi'});
    p.save()
    app.listen(8080);
}).catch(err => console.log(err))