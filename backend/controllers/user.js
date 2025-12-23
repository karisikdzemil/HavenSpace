const User = require("../models/User");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

exports.getUser = (req, res, next) => {};

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

  bcrypt
  .hash(password, 12)
  .then((hash) => {
    const user = new User({ email, password: hash });
    return user.save();
  })
  .then((result) => {
 if (!result) {
        const error = new Error("Something went wrong!");
        error.statusCode = 500;
        throw error;
      }

    res.status(201).json({
      message: "User created successfully!",
      user: result,
    });
  })
  .catch((err) => {
    next(err);
  });
};

exports.editUser = (req, res, next) => {};

exports.deleteUser = (req, res, next) => {};
