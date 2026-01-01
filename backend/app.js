const express = require("express");
const mongoose = require("mongoose");
const path = require('path');
const propertyRoutes = require("./routes/property");
const authRoutes = require("./routes/auth");
const cors = require("cors");
const User = require("./models/User");

require("dotenv").config();
const db_key = process.env.MONGO_URI;

const app = express();


app.use(express.json());
app.use(cors());

app.use("/api", propertyRoutes);
app.use("/api", authRoutes);

app.use("/images", express.static(path.join(__dirname, "assets/images")));
app.use("/images", express.static(path.join(__dirname, "assets/avatar")));

app.use((error, req, res, next) => {
  const message = error.message || "Something went wrong!";
  const status = error.statusCode || 500;
  res.status(status).json({ message: message });
});

mongoose
  .connect(db_key)
  .then((result) => {
    app.listen(8080);
  })
  .catch((err) => console.log(err));
