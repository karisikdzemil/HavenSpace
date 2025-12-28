const User = require("../models/User");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ message: "Validation failed.", errors: errors.array() });
  }

  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        const error = new Error("User doesn't exist!");
        error.statusCode = 422;
        throw error;
      }

      return bcrypt.compare(password, user.password).then((isMatch) => {
        if (!isMatch) {
          const error = new Error("Passwords don't match!");
          error.statusCode = 422;
          throw error;
        }
        const token = jwt.sign(
          { email: user.email, userId: user._id },
          process.env.JWT_SECRET,
          { expiresIn: "2h" }
        );
        res.status(200).json({
          message: "Login successful!",
          userId: user._id,
          token: token,
        });
      });
    })
    .catch(next);
};

exports.postUser = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ message: "Validation failed.", errors: errors.array() });
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
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.editUser = (req, res, next) => {};

exports.deleteUser = (req, res, next) => {};
