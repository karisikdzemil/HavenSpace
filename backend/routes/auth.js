const express = require("express");
const { body } = require("express-validator");
const userRoutes = require("../controllers/user");

const router = express.Router();

router.get("/user", userRoutes.getUser);

router.post(
  "/create-user",
  [
    body("email")
      .notEmpty()
      .withMessage("Email is required!")
      .isEmail.withMessage("Please enter a valid email!")
      .normalizeEmail(),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long!")
      .matches("[0-9]")
      .withMessage("Password must contain a number!")
      .matches("[A-Z]")
      .withMessage("Password must containt an uppercase letter!")
      .matches("[a-z]")
      .withMessage("Password must contant a lowercase letter!"),
  ],
  userRoutes.createUser
);

router.delete("/delete-user", userRoutes.deleteUser);

router.put(
  "/edit-user",
  [
    body("email")
      .notEmpty()
      .withMessage("Email is required!")
      .isEmail.withMessage("Please enter a valid email!")
      .normalizeEmail(),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long!")
      .matches("[0-9]")
      .withMessage("Password must contain a number!")
      .matches("[A-Z]")
      .withMessage("Password must containt an uppercase letter!")
      .matches("[a-z]")
      .withMessage("Password must contant a lowercase letter!"),
  ],
  userRoutes.editUser
);
