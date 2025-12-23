const express = require("express");
const mongoose = require("mongoose");
const propertyRoutes = require("./routes/property");
const authRoutes = require('./routes/auth');
const cors = require("cors");
const User = require('./models/User');

require("dotenv").config();
const db_key = process.env.MONGO_URI;

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", propertyRoutes);
app.use("/api", authRoutes);


app.use((error, req, res, next) => {
  const message = error.message || "Something went wrong!";
  const status = error.statusCode || 500;
  res.status(status).json({ message: message });
});

mongoose
  .connect(db_key)
  .then((result) => {
    console.log("Connected with mongodb!");
    User.find()
      .then((users) => {
        console.log(users)
        if (users.length === 0) {
          const user = new User({
            email: "karisikdzemil@gmail.com",
            password: "ljuljaska!2",
          });
          user
            .save()
            .then((user) => {
              console.log(user);
              app.listen(8080);
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
    app.listen(8080);
  })
  .catch((err) => console.log(err));
