require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require('path');
const propertyRoutes = require("./routes/property");
const authRoutes = require("./routes/auth");
const aiRoutes = require('./routes/ai');
const inquiryRoutes = require('./routes/inquiry');
const cors = require("cors");
const User = require("./models/User");

const db_key = process.env.MONGO_URI;

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", propertyRoutes);
app.use("/api", authRoutes);
app.use("/api", aiRoutes);
app.use("/api", inquiryRoutes);

app.use("/images", express.static(path.join(__dirname, "assets/images")));
app.use("/images", express.static(path.join(__dirname, "assets/avatar")));
app.use("/assets", express.static(path.join(__dirname, "assets")));

app.use((error, req, res, next) => {
  const message = error.message || "Something went wrong!";
  const status = error.statusCode || 500;
  res.status(status).json({ message: message });
});

const PORT = process.env.PORT || 8080;

mongoose
  .connect(db_key)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.log(err));
