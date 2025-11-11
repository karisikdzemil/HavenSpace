const express = require('express');
const mongoose = require('mongoose');

const db_key = "mongodb+srv://karisikdzemil:Dzemil123@cluster0.ldrhrp1.mongodb.net/havenspace?retryWrites=true&w=majority&appName=Cluster0";

const app = express();

mongoose.connect(db_key).then(result => {

    app.listen(8080);
}).catch(err => console.log(err))
