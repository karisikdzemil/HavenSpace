const User = require("../models/User");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

exports.getUser = (req, res, next) => {

};

exports.postUser = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Enter a valid data!");
    error.statusCode = 422;
    throw error;
  }
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  if (password !== confirmPassword) {
    const error = new Error("Passwords don't match!");
    error.statusCode = 422;
    throw error;
  }

  User.findOne({ email })
  .then((existingUser) => {
    if (existingUser) {
      const error = new Error("Email already exists!");
      error.statusCode = 409;
      throw error;
    }

    return bcrypt.hash(password, 12);
  })
  .then((hashedPassword) => {
    const user = new User({
      email,
      password: hashedPassword,
    });
    return user.save();
  })
  .then((result) => {
    res.status(201).json({
      message: "User created successfully!",
      userId: result._id,
    });
  })
  .catch(err => {
    if(!err.statusCode){
      err.statusCode = 500;
    }
    next(err);
  });
};

exports.editUser = (req, res, next) => {};

exports.deleteUser = (req, res, next) => {};
