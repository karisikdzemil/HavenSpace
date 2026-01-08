const express = require("express");
const { body } = require("express-validator");
const userRoutes = require("../controllers/user");
const multer = require('multer');
const { uploadAvatar } = require("../middleware/upload");
const isAuth = require('../middleware/is-auth');

const router = express.Router();

const postUserValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required.")
    .isLength({ min: 2 })
    .withMessage("Name must have at least 2 characters."),

  body("surname")
    .trim()
    .notEmpty()
    .withMessage("Surname is required.")
    .isLength({ min: 2 })
    .withMessage("Surname must have at least 2 characters."),

  body("email")
    .isEmail()
    .withMessage("Please enter a valid email.")
    .normalizeEmail(),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long."),

  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match.");
    }
    return true;
  }),

  body("position").trim().notEmpty().withMessage("Position is required."),

  body("description")
    .trim()
    .isLength({ min: 10 })
    .withMessage("Description must be at least 10 characters."),

  body("role").optional().isIn(["agent", "admin"]).withMessage("Invalid role."),

  body("isTopAgent")
    .optional()
    .isBoolean()
    .withMessage("isTopAgent must be boolean."),

  body("soldProperties")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Sold properties must be a positive number."),

  body("totalSales")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Total sales must be a positive number."),

  body("yearsExperience")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Years of experience must be a positive number."),

  body("phone").trim().notEmpty().withMessage("Phone number is required."),

  body("location").trim().notEmpty().withMessage("Location is required."),

  body("linkedin")
    .optional()
    .isURL()
    .withMessage("LinkedIn must be a valid URL."),

  // body("facebook")
  //   .optional()
  //   .isURL()
  //   .withMessage("Facebook must be a valid URL."),

  // body("instagram")
  //   .optional()
  //   .isURL()
  //   .withMessage("Instagram must be a valid URL."),

  // body("languages")
  //   .optional()
  //   .isArray()
  //   .withMessage("Languages must be an array."),
];

router.post(
  "/login",
  [
    body("email")
      .notEmpty()
      .withMessage("Email is required!")
      .isEmail()
      .withMessage("Please enter a valid email!")
      .normalizeEmail(),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long!")
      .matches(/[0-9]/)
      .withMessage("Password must contain a number!")
      .matches(/[A-Z]/)
      .withMessage("Password must containt an uppercase letter!")
      .matches(/[a-z]/)
      .withMessage("Password must contant a lowercase letter!"),
  ],
  userRoutes.login
);

router.post(
  "/create-user",
  uploadAvatar,
  postUserValidation,
  userRoutes.postUser
);

router.get('/agents', userRoutes.getAgents);

router.get('/get-user/:id', userRoutes.getUser);

router.delete("/delete-user", userRoutes.deleteUser);

router.put(
  "/edit-user",
  // [
  //   body("email")
  //     .notEmpty()
  //     .withMessage("Email is required!")
  //     .isEmail()
  //     .withMessage("Please enter a valid email!")
  //     .normalizeEmail(),
  //   body("password")
  //     .isLength({ min: 8 })
  //     .withMessage("Password must be at least 8 characters long!")
  //     .matches(/[0-9]/)
  //     .withMessage("Password must contain a number!")
  //     .matches(/[A-Z]/)
  //     .withMessage("Password must containt an uppercase letter!")
  //     .matches(/[a-z]/)
  //     .withMessage("Password must contant a lowercase letter!"),
  // ],
  userRoutes.editUser
);

module.exports = router;
